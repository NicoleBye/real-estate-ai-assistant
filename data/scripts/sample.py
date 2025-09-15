import pandas as pd
df = pd.read_csv('cleaned_dataset.csv')
sampled_df = df.sample(n=200, random_state=42).reset_index(drop=True)
sampled_df['listing_type'] = ['buy'] * 100 + ['rent'] * 100
sampled_df['rent_price'] = sampled_df.apply(
    lambda row: int(row['buy_price'] * 0.0015) if row['listing_type'] == 'rent' else None, axis=1
)
int_cols = ['year_built', 'carspaces', 'rent_price', 'landsize']
for col in int_cols:
    sampled_df[col] = pd.to_numeric(sampled_df[col], errors='coerce').astype('Int64')
columns_order = [
    'suburb', 'address', 'listing_type', 'property_type', 'method', 'seller', 'distance',
    'postcode', 'sale_date', 'buy_price', 'rent_price', 'bedrooms', 'bathrooms',
    'carspaces', 'landsize', 'year_built', 'latitude', 'longitude'
]
sampled_df = sampled_df[columns_order]
sampled_df.to_csv('test_properties.csv', index=False)