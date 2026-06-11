# An Interpretable Machine Learning Pipeline for Deforestation Risk Prediction in Vietnam at 1 km Resolution

[![DOI](https://img.shields.io/badge/DOI-pending_Zenodo_archive-lightgrey)](https://doi.org/10.5281/zenodo.18491114)
[![Open In Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/Borino88/deforestation-risk-gialai/blob/main/notebooks/run_in_colab.ipynb)

This repository provides the reproducible code, data architecture, and documentation for the research paper: **"An Interpretable Machine Learning Pipeline for Deforestation Risk Prediction in Vietnam at 1 km Resolution."** 

## Research Summary
Deforestation remains a critical environmental challenge in Vietnam. This project presents a proactive monitoring framework that predicts forest loss risk at a 1 km grid-cell resolution. By integrating multi-source satellite data with interpretable machine learning models, the pipeline identifies high-pressure zones before loss occurs, supporting more effective conservation prioritization.

## Study Area
The pilot implementation focuses on two ecologically significant districts in **Gia Lai Province, Vietnam**:
- **K’Bang District**
- **Mang Yang District**

## Data Sources
The pipeline leverages publicly available environmental and infrastructure datasets:
- **Hansen Global Forest Change (UMD/GEE):** Historical forest cover and loss labels (2001–2023).
- **Global Forest Watch (GFW):** Near-real-time integrated alerts.
- **Sentinel-2 (ESA):** Multispectral imagery for vegetation indices (NDVI, NBR).
- **SRTM (NASA):** Topographic features including elevation and slope.
- **OpenStreetMap (OSM):** Human-accessibility features (distance to roads).

## Methodology Overview
We evaluate and compare three distinct modeling approaches:
1. **Baseline Risk Score:** A proximity-weighted heuristic for initial benchmarking.
2. **Logistic Regression:** Used for scientific interpretability of risk drivers (coefficients).
3. **Random Forest:** Capable of capturing complex, non-linear interactions for high discriminative performance (AUC = 0.89).

## Repository Structure
```text
├── data/                   # Master CSV tables for training and evaluation
├── notebooks/              # Google Colab one-click reproduction workflow
├── src/                    # Core Python pipeline scripts
├── results/                # Reference model outputs and research figures
├── participation_evidence/ # Internal records of research team contributions
└── requirements.txt        # Python package dependencies
```

## Reproducible Run (One-Click)
The easiest way to reproduce the research findings is through Google Colab:
1. Open the [notebooks/run_in_colab.ipynb](https://colab.research.google.com/github/Borino88/deforestation-risk-gialai/blob/main/notebooks/run_in_colab.ipynb).
2. Follow the "Run All" command. The notebook automatically synchronizes with this repository, installs dependencies, and executes the full model pipeline.

## Local Installation
To run the pipeline in a local Python environment:
```bash
# Clone the repository
git clone https://github.com/Borino88/deforestation-risk-gialai.git
cd deforestation-risk-gialai

# Install dependencies
pip install -r requirements.txt

# Execute the pipeline
python -c "from src.pipeline import run_pipeline; run_pipeline('data/KBang_TRAIN_master_rain_elev_lossyear.csv', 'data/KBang_TEST_master_rain_elev_lossyear.csv', 'data/MangYang_TRAIN_master_rain_elev_lossyear.csv', 'data/MangYang_TEST_master_rain_elev_lossyear.csv', 'outputs')"
```

## Expected Outputs
The pipeline generates a standardized set of research outputs in the `outputs/` directory:
- **Spatial Predictions:** `Model_predictions_and_warning_zones.csv` (1 km resolution risk scores).
- **Validation Figures:** ROC curves and Feature Importance bar charts.
- **Performance Tables:** Summaries of AUC, AP, and F1 scores across multiple scenarios.

## Research Team & Contributions
This project was developed by a team of student researchers with supervision from FPT University:
- **Pham Duy Long:** Project coordination and lead author.
- **Nguyen Vu Huy:** Data preparation and reproducibility engineering.
- **Nguyen Duc Anh:** Data validation and metric evaluation.
- **Do Nhat Quang:** Geospatial visualization and figure organization.
- **Tran Dang An:** Methodology validation and project supervision.
- **Dam Anh Thu:** Statistical data analysis and validation support.

For detailed contribution records, see [CONTRIBUTORS.md](./CONTRIBUTORS.md).

## Citation & DOI
**DOI: pending Zenodo archive**
*A permanent DOI will be added after the repository is archived on Zenodo.*

### Instructions for Generating a Permanent DOI:
1. Connect this GitHub repository to your [Zenodo](https://zenodo.org/) account.
2. Enable the repository in Zenodo's settings.
3. Create a **GitHub Release** (e.g., `v1.0.0`).
4. Zenodo will automatically archive the release and generate a permanent DOI.
5. Update this README with the resulting badge and link.

## Contact
For inquiries regarding the data or methodology, please contact **info@deforestation.xyz**.
