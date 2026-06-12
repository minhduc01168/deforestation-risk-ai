import pandas as pd
import json
import os
import math

data_dir = "/Users/minhduc168/Documents/deforestation-risk-ai/data"
output_path = "/Users/minhduc168/Documents/deforestation-risk-ai/web-gis/frontend/public/data/grid_data.geojson"

csv_files = [
    "KBang_TRAIN_master_rain_elev_lossyear.csv",
    "KBang_TEST_master_rain_elev_lossyear.csv",
    "MangYang_TRAIN_master_rain_elev_lossyear.csv",
    "MangYang_TEST_master_rain_elev_lossyear.csv"
]

features = []

for file in csv_files:
    file_path = os.path.join(data_dir, file)
    if not os.path.exists(file_path):
        print(f"Skipping {file_path}, not found.")
        continue
    
    print(f"Processing {file}...")
    df = pd.read_csv(file_path)
    
    # We only care about points that actually have deforestation (loss_first_year > 0)
    # This keeps the GeoJSON file size small and fast to load.
    df = df[df['loss_first_year'] > 0]
    
    for _, row in df.iterrows():
        def clean_val(val, default=0):
            if pd.isna(val) or (isinstance(val, float) and math.isnan(val)):
                return default
            return val
            
        lon = clean_val(row.get('lon'), None)
        lat = clean_val(row.get('lat'), None)
        
        if lon is None or lat is None:
            continue
            
        district = row.get('district')
        if pd.isna(district):
            district = 'KBang' if 'KBang' in file else 'Mang Yang'
        else:
            # Normalize MangYang string from CSV
            district = str(district)
            if district == 'MangYang':
                district = 'Mang Yang'
            
        feature = {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [lon, lat]
            },
            "properties": {
                "district": district,
                "loss_first_year": clean_val(row.get('loss_first_year'), 0),
                "mean_elevation_m": clean_val(row.get('mean_elevation_m', row.get('elev')), 0), # Fallback to elev
                "mean_slope_deg": clean_val(row.get('mean_slope_deg', row.get('slope')), 0),
                "rain_mean_annual_2000_2024_mm": clean_val(row.get('rain_mean_annual_2000_2024_mm'), 0),
                "treecover2000": clean_val(row.get('treecover2000'), 0)
            }
        }
        features.append(feature)

geojson = {
    "type": "FeatureCollection",
    "features": features
}

os.makedirs(os.path.dirname(output_path), exist_ok=True)
with open(output_path, 'w') as f:
    json.dump(geojson, f)

print(f"Successfully generated {output_path} with {len(features)} loss points.")
