CREATE TABLE users (
    user_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    name VARCHAR(100) NOT NULL,
    role VARCHAR(20) NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'admin')),
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE properties (
    property_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    suburb VARCHAR(100) NOT NULL,
    address VARCHAR(200),
    listing_type VARCHAR(10) NOT NULL CHECK (listing_type IN ('buy', 'rent')),
    property_type VARCHAR(50) NOT NULL,
    method  VARCHAR(50) NOT NULL,
    seller  VARCHAR(50) NOT NULL,
    distance  INTEGER NOT NULL,
    postcode INTEGER NOT NULL,
    sale_date DATE NOT NULL,
    buy_price INTEGER NOT NULL,
    rent_price INTEGER,
    bedrooms INTEGER NOT NULL,
    bathrooms INTEGER NOT NULL,
    carspaces INTEGER NOT NULL,
    landsize INTEGER,
    year_built INTEGER,
    latitude NUMERIC,
    longitude NUMERIC,
    image_url TEXT, 
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE preferences (
    preference_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    listing_type VARCHAR(10) NOT NULL CHECK (listing_type IN ('buy', 'rent')),
    property_type VARCHAR(50)[] NOT NULL,
    buy_price_min INTEGER,
    buy_price_max INTEGER,
    rent_pw_min INTEGER,
    rent_pw_max INTEGER,
    bedrooms_min INTEGER NOT NULL,
    bedrooms_max INTEGER NOT NULL,
    bathrooms_min INTEGER NOT NULL,
    bathrooms_max INTEGER NOT NULL,
    carspaces INTEGER NOT NULL,
    landsize_min INTEGER,
    landsize_max INTEGER,
    address VARCHAR(200),
    suburb VARCHAR(100),
    postcode INTEGER,
    state VARCHAR(50),
    latitude NUMERIC,
    longitude NUMERIC,
    created_at TIMESTAMP DEFAULT NOW(),
    CHECK (
        (listing_type = 'buy' AND buy_price_min IS NOT NULL AND buy_price_max IS NOT NULL AND rent_pw_min IS NULL AND rent_pw_max IS NULL)
        OR
        (listing_type = 'rent' AND rent_pw_min IS NOT NULL AND rent_pw_max IS NOT NULL AND buy_price_min IS NULL AND buy_price_max IS NULL)
    ),
    CHECK (
        (listing_type != 'buy')
        OR (landsize_min IS NOT NULL AND landsize_max IS NOT NULL)
    )
);

CREATE TABLE user_logs (
    log_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(user_id) ON DELETE CASCADE,
    action VARCHAR(100) NOT NULL,
    property_id UUID REFERENCES properties(property_id) ON DELETE SET NULL,
    timestamp TIMESTAMP DEFAULT NOW(),
    details JSONB
);

CREATE TABLE admin_logs (
    log_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    admin_id UUID REFERENCES users(user_id) ON DELETE CASCADE,
    action VARCHAR(100) NOT NULL, 
    target_table VARCHAR(50), 
    target_id UUID,
    timestamp TIMESTAMP DEFAULT NOW(),
    details JSONB
);

ALTER TABLE properties 
ALTER COLUMN distance TYPE NUMERIC(10,1); 
ALTER TABLE properties
ALTER COLUMN carspaces DROP NOT NULL;
ALTER TABLE properties 
ALTER COLUMN postcode TYPE VARCHAR(10); 
ALTER TABLE preferences 
ALTER COLUMN postcode TYPE VARCHAR(10); 
