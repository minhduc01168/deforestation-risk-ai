
import os, math
import numpy as np
import pandas as pd

from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import Pipeline
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import (
    roc_auc_score, average_precision_score,
    precision_score, recall_score, f1_score,
    precision_recall_curve, roc_curve
)

import matplotlib.pyplot as plt

def _rename_ci(df, targets):
    lower = {c.lower(): c for c in df.columns}
    for t in targets:
        if t not in df.columns and t.lower() in lower:
            df = df.rename(columns={lower[t.lower()]: t})
    return df

def _best_f1_threshold(y_true, scores):
    prec, rec, thr = precision_recall_curve(y_true, scores)
    f1 = (2*prec*rec)/(prec+rec+1e-12)
    i = int(np.nanargmax(f1))
    if i == 0 or i-1 >= len(thr):
        return 0.5
    return float(thr[i-1])

def _capture_rate(y_true, scores, top_frac):
    y_true = np.asarray(y_true)
    scores = np.asarray(scores)
    k = max(1, int(math.ceil(top_frac * len(y_true))))
    idx = np.argsort(-scores)[:k]
    return float(y_true[idx].sum() / max(1, y_true.sum()))

def _save_roc(y_true, score_dict, out_path, title):
    plt.figure(figsize=(7,5))
    for name, sc in score_dict.items():
        fpr, tpr, _ = roc_curve(y_true, sc)
        plt.plot(fpr, tpr, label=name)
    plt.plot([0,1],[0,1], linestyle="--")
    plt.xlabel("False Positive Rate")
    plt.ylabel("True Positive Rate")
    plt.title(title)
    plt.legend()
    plt.tight_layout()
    plt.savefig(out_path, dpi=200)
    plt.close()

def run_pipeline(
    kbang_train_path,
    kbang_test_path,
    mang_train_path,
    mang_test_path,
    out_dir
):
    os.makedirs(out_dir, exist_ok=True)
    tables_dir = os.path.join(out_dir, "tables")
    figs_dir = os.path.join(out_dir, "figures")
    preds_dir = os.path.join(out_dir, "predictions")
    for p in [tables_dir, figs_dir, preds_dir]:
        os.makedirs(p, exist_ok=True)

    # 1) Load
    dfs = {
        "KBang_train": pd.read_csv(kbang_train_path),
        "KBang_test": pd.read_csv(kbang_test_path),
        "MangYang_train": pd.read_csv(mang_train_path),
        "MangYang_test": pd.read_csv(mang_test_path),
    }
    for k in dfs:
        dfs[k].columns = [c.strip() for c in dfs[k].columns]

    def add_required(df, district, split):
        df = df.copy()
        df["district"] = district
        df["split"] = split

        # lon/lat normalization
        for c in ["lon","lat"]:
            if c not in df.columns and c.upper() in df.columns:
                df = df.rename(columns={c.upper(): c})

        # label_std fallback
        if "label_std" not in df.columns:
            if "label" in df.columns:
                df["label_std"] = df["label"]
            elif "defo" in df.columns:
                df["label_std"] = df["defo"]
            elif "loss_any_2001_2024" in df.columns:
                df["label_std"] = df["loss_any_2001_2024"]
            else:
                df["label_std"] = np.nan

        df["label_std"] = pd.to_numeric(df["label_std"], errors="coerce").fillna(0).astype(int)
        return df

    combined = pd.concat([
        add_required(dfs["KBang_train"], "KBang", "train"),
        add_required(dfs["KBang_test"], "KBang", "test"),
        add_required(dfs["MangYang_train"], "MangYang", "train"),
        add_required(dfs["MangYang_test"], "MangYang", "test"),
    ], ignore_index=True)

    targets = [
        "lon","lat","treecover2000","mean_elevation_m","mean_slope_deg",
        "rain_last12m_total_mm","rain_mean_annual_2000_2024_mm",
        "loss_any_2001_2024","loss_first_year"
    ]
    combined = _rename_ci(combined, targets)

    # 2) QC Summary
    qc = {
        "rows": int(len(combined)),
        "cols": int(combined.shape[1]),
        "district_counts": combined["district"].value_counts().to_dict(),
        "split_counts": combined["split"].value_counts().to_dict(),
        "pos_rate_label_std": float(combined["label_std"].mean()),
    }
    core_cols = [c for c in targets if c in combined.columns]
    qc["missing_core"] = {c: int(combined[c].isna().sum()) for c in core_cols}
    if "lon" in combined.columns and "lat" in combined.columns:
        qc["duplicate_lonlat_rows"] = int(combined.duplicated(subset=["lon","lat"]).sum())
    pd.DataFrame([qc]).to_csv(os.path.join(out_dir, "QC_summary.csv"), index=False)

    # Save final master
    combined.to_csv(os.path.join(out_dir, "ALL_master_FINAL.csv"), index=False)

    # 3) Table 1 (Datasets)
    table1 = pd.DataFrame([
        ["Hansen Global Forest Change", "treecover2000 + lossyear-derived labels", "30 m", "2000 baseline; loss 2001–2024", "Forest baseline + historical loss label"],
        ["SRTM", "mean_elevation_m + mean_slope_deg", "30–90 m", "Static", "Terrain predictors"],
        ["CHIRPS", "rain_last12m_total_mm + rain_mean_annual_2000_2024_mm", "~5 km", "2000–2025", "Rainfall predictors"],
    ], columns=["Dataset","Layers/Variables","Native resolution","Time span","Role"])
    table1.to_csv(os.path.join(tables_dir, "Table1_datasets.csv"), index=False)

    # 4) Table 2 (Dataset Summary by district)
    def summarize(group):
        out = {
            "n_samples": len(group),
            "n_train": int((group["split"]=="train").sum()),
            "n_test": int((group["split"]=="test").sum()),
            "pos_rate_label_std": float(group["label_std"].mean()),
        }
        for col in ["treecover2000","mean_elevation_m","mean_slope_deg","rain_last12m_total_mm","rain_mean_annual_2000_2024_mm","loss_first_year"]:
            if col in group.columns:
                out[f"{col}_mean"] = float(group[col].mean())
                out[f"{col}_std"] = float(group[col].std())
        return pd.Series(out)

    table2 = combined.groupby("district").apply(summarize).reset_index()
    table2.to_csv(os.path.join(tables_dir, "Table2_dataset_summary.csv"), index=False)

    # 5) Modeling
    meta = {"district","split","lon","lat","label_std","label","defo"}
    label_related = {"loss_any_2001_2024","loss_first_year"}
    feature_cols = [
        c for c in combined.columns
        if c not in meta and c not in label_related and pd.api.types.is_numeric_dtype(combined[c])
    ]
    X = combined[feature_cols].copy().apply(lambda s: s.fillna(s.median()), axis=0)
    y = combined["label_std"].astype(int)

    # Baseline score (simple)
    baseline_cols = [c for c in ["treecover2000","mean_elevation_m","mean_slope_deg","rain_last12m_total_mm"] if c in X.columns]
    baseX = X[baseline_cols].copy()
    if "mean_elevation_m" in baseX.columns: baseX["mean_elevation_m"] = -baseX["mean_elevation_m"]
    if "mean_slope_deg" in baseX.columns: baseX["mean_slope_deg"] = -baseX["mean_slope_deg"]
    baseline_prob = 1/(1+np.exp(-StandardScaler().fit_transform(baseX).mean(axis=1)))

    logreg = Pipeline([
        ("scaler", StandardScaler()),
        ("clf", LogisticRegression(max_iter=2000, class_weight="balanced"))
    ])

    rf = RandomForestClassifier(
        n_estimators=400,
        random_state=42,
        class_weight="balanced_subsample",
        max_features="sqrt",
        max_depth=22,
        min_samples_leaf=2,
        n_jobs=-1
    )

    def eval_scenario(train_idx, test_idx, scenario_name):
        y_tr, y_te = y.iloc[train_idx].values, y.iloc[test_idx].values
        X_tr, X_te = X.iloc[train_idx], X.iloc[test_idx]

        logreg.fit(X_tr, y_tr)
        rf.fit(X_tr, y_tr)

        base_tr, base_te = baseline_prob[train_idx], baseline_prob[test_idx]
        lr_tr, lr_te = logreg.predict_proba(X_tr)[:,1], logreg.predict_proba(X_te)[:,1]
        rf_tr, rf_te = rf.predict_proba(X_tr)[:,1], rf.predict_proba(X_te)[:,1]

        thr_base = _best_f1_threshold(y_tr, base_tr)
        thr_lr   = _best_f1_threshold(y_tr, lr_tr)
        thr_rf   = _best_f1_threshold(y_tr, rf_tr)

        rows = []
        for model_name, sc, thr in [
            ("Baseline", base_te, thr_base),
            ("LogReg", lr_te, thr_lr),
            ("RF", rf_te, thr_rf),
        ]:
            rows.append([
                scenario_name,
                model_name,
                roc_auc_score(y_te, sc),
                average_precision_score(y_te, sc),
                precision_score(y_te, (sc>=thr).astype(int), zero_division=0),
                recall_score(y_te, (sc>=thr).astype(int), zero_division=0),
                f1_score(y_te, (sc>=thr).astype(int), zero_division=0),
                _capture_rate(y_te, sc, 0.05),
                _capture_rate(y_te, sc, 0.10),
                thr,
                len(y_te),
                int(y_te.sum())
            ])

        perf = pd.DataFrame(rows, columns=[
            "Scenario","Model","AUC","AP","Precision","Recall","F1",
            "Capture@5%","Capture@10%","Threshold(F1-train)","N_test","N_pos_test"
        ])
        scores = {"Baseline": base_te, "LogReg": lr_te, "RF": rf_te}
        return perf, y_te, scores

    # A) provided split
    train_idx = combined.index[combined["split"]=="train"].to_numpy()
    test_idx  = combined.index[combined["split"]=="test"].to_numpy()
    t3_split, y_split, scores_split = eval_scenario(train_idx, test_idx, "Split (provided)")

    # B) area transfer KBang -> MangYang
    kbang_idx = combined.index[combined["district"]=="KBang"].to_numpy()
    mang_idx  = combined.index[combined["district"]=="MangYang"].to_numpy()
    t3_k2m, y_k2m, scores_k2m = eval_scenario(kbang_idx, mang_idx, "Area transfer (KBang->MangYang)")

    table3 = pd.concat([t3_split, t3_k2m], ignore_index=True)
    table3.to_csv(os.path.join(tables_dir, "Table3_model_performance.csv"), index=False)

    # ROC figures
    _save_roc(y_split, scores_split, os.path.join(figs_dir, "Figure_ROC_split.png"), "ROC (provided split)")
    _save_roc(y_k2m, scores_k2m, os.path.join(figs_dir, "Figure_ROC_KBang_to_MangYang.png"), "ROC (KBang->MangYang)")

    # 6) Explainability figures (train on provided split)
    logreg.fit(X.iloc[train_idx], y.iloc[train_idx].values)
    rf.fit(X.iloc[train_idx], y.iloc[train_idx].values)

    importances = pd.Series(rf.feature_importances_, index=feature_cols).sort_values(ascending=False).head(12)
    plt.figure(figsize=(7,5))
    plt.barh(list(reversed(importances.index)), list(reversed(importances.values)))
    plt.title("RF feature importance (top 12)")
    plt.tight_layout()
    plt.savefig(os.path.join(figs_dir, "Figure_RF_importance.png"), dpi=200)
    plt.close()

    coef = pd.Series(logreg.named_steps["clf"].coef_[0], index=feature_cols).sort_values()
    coef_plot = pd.concat([coef.head(8), coef.tail(8)])
    plt.figure(figsize=(7,5))
    plt.barh(coef_plot.index, coef_plot.values)
    plt.title("LogReg coefficients (most negative/positive)")
    plt.tight_layout()
    plt.savefig(os.path.join(figs_dir, "Figure_LogReg_coefficients.png"), dpi=200)
    plt.close()

    # 7) Predictions + warning zones
    logreg.fit(X, y.values)
    rf.fit(X, y.values)

    pred = combined.copy()
    pred["risk_baseline"] = baseline_prob
    pred["risk_logreg"] = logreg.predict_proba(X)[:,1]
    pred["risk_rf"] = rf.predict_proba(X)[:,1]

    pred["warn_top5_rf"] = 0
    pred["warn_top10_rf"] = 0
    for d in pred["district"].unique():
        sub = pred[pred["district"] == d]
        thr5 = np.quantile(sub["risk_rf"], 0.95)
        thr10 = np.quantile(sub["risk_rf"], 0.90)
        pred.loc[(pred["district"]==d) & (pred["risk_rf"]>=thr5), "warn_top5_rf"] = 1
        pred.loc[(pred["district"]==d) & (pred["risk_rf"]>=thr10), "warn_top10_rf"] = 1

    pred.to_csv(os.path.join(preds_dir, "Model_predictions_and_warning_zones.csv"), index=False)

    # Run log
    with open(os.path.join(out_dir, "README_run_log.txt"), "w") as f:
        f.write("Pipeline run complete.\n")
        f.write(f"Rows: {len(combined)}\n")
        f.write(f"Features used: {len(feature_cols)}\n")

    return {
        "out_dir": out_dir,
        "feature_cols": feature_cols,
        "baseline_cols": baseline_cols
    }
