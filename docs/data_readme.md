# Connection to database
We will use https://supabase.com/ as database server. Please register and send me your email used for registration so I can invite you. 
After that, you will be able to access the database and all the settings.
## Connect your VScode to Supabase
1. Install the plugin in VScode: 
* Click on the Extensions icon (four squares) in the left menu
* Search for and install "SQLTools" 
* After installation, install its plugin: SQLTools PostgreSQL/Cockroach Driver
2. Configure the connection
* Once the plugin is installed, open SQLTools on the left
* Click Add New Connection
* Select the PostgreSQL driver
* Change the "Connect using*" field to "Connection String"
* There are two types of connection that work, the backend members need to choose one between them:
   Type 1 : 
   Transaction pooler: postgresql://postgres.dvxmpvzsbbalwfxwvhis:keepgoing@aws-0-ap-southeast-2.pooler.supabase.com:5432/postgres
   Type 2 :
   Session pooler: postgresql://postgres.dvxmpvzsbbalwfxwvhis:keepgoing@aws-0-ap-southeast-2.pooler.supabase.com:6543/postgres
* Click on "Test Connection" and click on "Save" when successful. Now you can connect and run SQL queries in VS Code.
# Data readme
Dataset link: https://www.kaggle.com/datasets/dansbecker/melbourne-housing-snapshot/data  
Please refer to this link if you have any questions regarding data values.

ai_real_estate_assistant/
│
├── data/
│   ├── processed/
│   │   ├── cleaned_dataset.csv                 # the result from clean_data.py
│   │   └── test_properties.csv                 # the result from sample.py
│   ├── raw/
│   │   └── melb_data.csv          # raw dataset
│   ├── scripts/                   
│   │   ├── clean_data.py                   # the script used to clean raw dataset
│   │   ├── create_table.sql                 # the create and alter table sql statement
│   │   └── sample.py                    # the script used to extract 200 test property records which have been inserted into the db

# Important
Please pay attention to the alter table statement. There has been modifications on the original table structures.
In table preferences, property_type is an array.
Some attributes in table properties such as sale_date, seller, method are only for model training. Do not display these attributes.
## For model training:
There are some values of landsize and year_built missing in the cleaned dataset. Some suggestions are as follow:
* Delete rows with too many missing fields (such as both 'landsize' and 'year-built' being empty); 
* Or retain and add "missing" as a feature in the model;
* Or You can then fill landsize based on the median of the suburb (the effect is more realistic than the global average); For year_built, this field is often missing in Australian real estate (especially second-hand houses). You can fill it using suburb group median or the global median.