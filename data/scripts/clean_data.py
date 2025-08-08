import pandas as pd

df = pd.read_csv('melb_data.csv')

df.drop(columns=['Bedroom2', 'Propertycount', 'Regionname', 'CouncilArea', 'BuildingArea'], inplace=True)
df['Postcode'] = df['Postcode'].astype(str).str.replace(r'\.0$', '', regex=True)
df.loc[df['Landsize'] == 0, 'Landsize'] = None
df['Date'] = pd.to_datetime(df['Date'], dayfirst=True).dt.strftime('%Y-%m-%d')
int_cols = ['YearBuilt', 'Car', 'Bathroom', 'Price', 'Landsize']
for col in int_cols:
    df[col] = pd.to_numeric(df[col], errors='coerce').astype('Int64')

df = df.rename(columns={
    'Suburb': 'suburb',
    'Address': 'address',
    'Rooms': 'bedrooms',
    'Type': 'property_type',
    'Price': 'buy_price',
    'Method': 'method',
    'SellerG': 'seller',
    'Date': 'sale_date',
    'Distance': 'distance',
    'Postcode': 'postcode',
    'Bathroom': 'bathrooms',
    'Car': 'carspaces',
    'Landsize': 'landsize',
    'YearBuilt': 'year_built',
    'Lattitude': 'latitude',
    'Longtitude': 'longitude'
})

columns_order = [
    'suburb', 'address', 'property_type', 'method', 'seller', 'distance',
    'postcode', 'sale_date', 'buy_price', 'bedrooms', 'bathrooms',
    'carspaces', 'landsize', 'year_built', 'latitude', 'longitude'
]

df = df[columns_order]
df.to_csv('cleaned_dataset.csv', index=False)