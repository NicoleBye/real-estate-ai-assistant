import pandas as pd
import numpy as np
# 1. read data
df = pd.read_csv("cleaned_dataset.csv")

# 2. delete specified columns
cols_to_drop = ["method", "distance", "seller", "sale_date"]
df = df.drop(columns=cols_to_drop, errors="ignore")

# 3. fill missing values with 0
df = df.fillna(0)

# 4. ensure these columns are integer type
int_cols = ["buy_price", "bedrooms", "bathrooms", "carspaces", "landsize", "year_built"]
for col in int_cols:
    df[col] = pd.to_numeric(df[col], errors="coerce").fillna(0).astype(int)

# 5. delete rows with 0 in these key columns
df = df[(df[int_cols] != 0).all(axis=1)]
property_map = {"h": "house", "u": "apartment", "t": "townhouse"}
df["property_type"] = df["property_type"].map(property_map).fillna(df["property_type"])
df = df.drop_duplicates(subset=["address"], keep="first")
# 2. 定义清洗条件
conditions = {
    "house": {
        "bedrooms": (1, 7),
        "bathrooms": (1, 5),
        "carspaces": (1, 6),
        "landsize": (100, 2000),
        "year_built": (1900, 2025),
    },
    "townhouse": {
        "bedrooms": (2, 5),
        "bathrooms": (1, 4),
        "carspaces": (1, 4),
        "landsize": (50, 400),
        "year_built": (1900, 2025),
    },
    "apartment": {  # unit 已经改成 apartment
        "bedrooms": (1, 4),
        "bathrooms": (1, 3),
        "carspaces": (1, 2),
        "landsize": (50, 150),
        "year_built": (1960, 2025),
    }
}

# 3. 按 property_type 分组清洗
cleaned_parts = []

for ptype, rules in conditions.items():
    subset = df[df["property_type"] == ptype].copy()
    for col, (low, high) in rules.items():
        subset = subset[(subset[col] >= low) & (subset[col] <= high)]
    cleaned_parts.append(subset)

# 4. 合并清洗后的数据
df = pd.concat(cleaned_parts, ignore_index=True)

# 7. random sample 1200 rows
df = df.sample(n=1200, random_state=42).reset_index(drop=True)

# 8. add listing_type column
df["listing_type"] = ["buy"] * 600 + ["rent"] * 600

# 9. add rent_price 列
df["rent_price"] = df.apply(
    lambda row: int(row["buy_price"] * 0.0015) if row["listing_type"] == "rent" else 0,
    axis=1
)

# 定义每种 property_type 对应的 features
features_map = {
    "house": ["Backyard", "Driveway", "Garden", "Heating", "Swimming pool"],
    "apartment": ["Secure parking", "Balcony", "Lift", "Shared gym", "NBN ready", "Secure access"],
    "townhouse": ["Garage", "Balcony", "Heating", "City view", "Air conditioning"]
}

# 新增 features 列（转成字符串存）
df["features"] = df["property_type"].map(features_map).apply(lambda x: str(x))

# 10. ajust columns order
columns_order = [
    "suburb", "address", "listing_type", "property_type", "postcode", 
    "buy_price", "rent_price", "bedrooms", "bathrooms", "carspaces", 
    "landsize", "year_built", "latitude", "longitude", "features"
]
df = df[columns_order]
df["postcode"] = df["postcode"].astype(str)
df.to_csv("property_r0.csv", index=False)
df_rnull = df.copy()
df_rnull["rent_price"] = df_rnull.apply(
    lambda row: int(row["buy_price"] * 0.0015) if row["listing_type"] == "rent" else pd.NA,
    axis=1
).astype('Int64')
df_rnull = df_rnull[columns_order]
df_rnull.to_csv("property_rnull.csv", index=False)

