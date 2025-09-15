CREATE TABLE users (
    user_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(100) UNIQUE NOT NULL,
    phone  VARCHAR(20),
    password_hash TEXT NOT NULL,
    name VARCHAR(100) NOT NULL,
    status ENUM('active', 'inactive') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE agents (
    agent_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(100) UNIQUE NOT NULL,
    phone  VARCHAR(20) NOT NULL,
    password_hash TEXT NOT NULL,
    name VARCHAR(100) NOT NULL,
    company VARCHAR(100),
    status ENUM('active', 'inactive') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE admin (
    admin_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(100) UNIQUE,
    phone  VARCHAR(20),
    password_hash TEXT,
    name VARCHAR(100),
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE properties (
    property_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    agent_id UUID REFERENCES agents(agent_id) ON DELETE CASCADE,
    suburb VARCHAR(100),
    address VARCHAR(200),
    listing_type VARCHAR(10) NOT NULL CHECK (listing_type IN ('buy', 'rent')),
    property_type VARCHAR(50),
    postcode VARCHAR(10),
    buy_price INTEGER,
    rent_price INTEGER,
    bedrooms INTEGER,
    bathrooms INTEGER,
    carspaces INTEGER,
    landsize INTEGER,
    year_built INTEGER,
    latitude NUMERIC,
    longitude NUMERIC,
    status ENUM('Pending', 'Published', 'Rejected') DEFAULT 'Pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE property_types (
  type_name VARCHAR(50) PRIMARY KEY,
  image_urls TEXT[]
);

CREATE TABLE property_stats (
    property_id UUID PRIMARY KEY REFERENCES properties(property_id) ON DELETE CASCADE,
    click_count INTEGER DEFAULT 0,
);

CREATE TABLE user_saved_properties (
    user_id UUID NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    property_id UUID NOT NULL REFERENCES properties(property_id) ON DELETE CASCADE,
    saved_at TIMESTAMP DEFAULT NOW(),
    PRIMARY KEY (user_id, property_id)
);

CREATE TABLE inspections (
    inspection_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    property_id UUID NOT NULL,
    agent_id UUID NOT NULL,
    user_id UUID NOT NULL,
    inspection_date DATE NOT NULL,
    inspection_time TIME NOT NULL,
    status ENUM('pending', 'confirmed') DEFAULT 'pending',
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (property_id) REFERENCES properties(property_id) ON DELETE CASCADE,
    FOREIGN KEY (agent_id) REFERENCES agents(agent_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    INDEX idx_agent_date (agent_id, inspection_date),
    INDEX idx_property_status (property_id, status)
);

CREATE TABLE preferences (
    preference_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    listing_type VARCHAR(10) NOT NULL CHECK (listing_type IN ('buy', 'rent')),
    property_type VARCHAR(50)[],
    buy_price_min INTEGER,
    buy_price_max INTEGER,
    rent_pw_min INTEGER,
    rent_pw_max INTEGER,
    bedrooms_min INTEGER,
    bedrooms_max INTEGER,
    bathrooms_min INTEGER,
    bathrooms_max INTEGER,
    carspaces INTEGER,
    landsize_min INTEGER,
    landsize_max INTEGER,
    address VARCHAR(200),
    suburb VARCHAR(100),
    postcode VARCHAR(10),
    state VARCHAR(50),
    latitude NUMERIC,
    longitude NUMERIC,
    created_at TIMESTAMP DEFAULT NOW(),
);

CREATE TABLE user_logs (
    log_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(user_id) ON DELETE CASCADE,
    action VARCHAR(100) NOT NULL,
    property_id UUID REFERENCES properties(property_id) ON DELETE SET NULL,
    timestamp TIMESTAMP DEFAULT NOW(),
    details JSONB
);

CREATE TABLE agent_logs (
    log_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    agent_id UUID REFERENCES agents(agent_id) ON DELETE CASCADE,
    action VARCHAR(100) NOT NULL,
    target_table VARCHAR(50), 
    target_id UUID,
    timestamp TIMESTAMP DEFAULT NOW(),
    details JSONB
);

CREATE TABLE admin_logs (
    log_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    admin_id UUID REFERENCES admin(admin_id) ON DELETE CASCADE,
    action VARCHAR(100) NOT NULL, 
    target_table VARCHAR(50), 
    target_id UUID,
    timestamp TIMESTAMP DEFAULT NOW(),
    details JSONB
);
