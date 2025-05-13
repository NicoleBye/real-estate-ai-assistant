# Technical Solution for AI-Powered Real Estate Assistant System

## 🟧 Part 1: Technology Stack, AI Models, and Dataset Choices

### 🔹 Frontend Technologies

| Technology | Purpose                                                        |
| ---------- | -------------------------------------------------------------- |
| HTML / CSS | Page structure, styling, responsive layout                     |
| JavaScript | Interactive elements, dynamic content updates, API integration |
| Chart.js   | Display graphs such as ROI, average price comparisons          |
| Leaflet.js | Render interactive maps showing property locations             |

*This stack is lightweight and beginner-friendly, ideal for building an interactive property listing and analysis dashboard with integrated charts and maps.*

### 🔹 Backend Technologies

| Technology              | Purpose                                                           |
| ----------------------- | ----------------------------------------------------------------- |
| Python                  | Core backend language, used for algorithm logic and data handling |
| FastAPI                 | Web framework to expose API endpoints for frontend interaction    |
| JSON                    | Data format for communicating between modules and frontend        |
| Optional: JWT / Session | For handling user authentication securely                         |

*FastAPI is highly recommended for its modern syntax, built-in documentation (Swagger), and excellent support for modular API development.*

### 🔹 Databases

| Database   | Data Stored                                  | Reason for Use                            |
| ---------- | -------------------------------------------- | ----------------------------------------- |
| PostgreSQL | User profiles, preferences, browsing history | Structure allows flexibility in user data |

### 🔹 AI Models & Datasets

| Module                | Model Used                                                            | Data Source                                                |
| --------------------- | --------------------------------------------------------------------- | ---------------------------------------------------------- |
| Recommendation System | Content-based filtering (cosine similarity) + Collaborative filtering | Simulated user interaction + property feature dataset      |
| Price Prediction      | Linear Regression → Random Forest (optional)                          | Kaggle Housing Dataset or synthetic property data          |
| ROI Analysis          | Static financial formulas: ROI, rent-to-price ratio, payback period   | User input + prediction outputs                            |
| Chat Assistant        | Rule-based NLP (spaCy/NLTK) + optional Mistral 7B                     | Custom keyword-based intent templates and few-shot prompts |
| Visualization         | No ML model, transforms module outputs into graph-ready data          | Used by Chart.js and Leaflet.js on frontend                |

---

## 🟧 Part 2: Module Implementation Plan

### 1️⃣ User & Preference Management Module (Dee)

- **Description**: Handles registration, login, storing user preferences, and tracking interactions.
- **Tech Used**: HTML forms → FastAPI → PostgreDB
- **Schema**:
  - `users`: id, email, password
  - `preferences`: mode, price range, location(s), type
  - `logs`: user_id, listing_clicked, timestamp

### 2️⃣ Property Search & Filtering Module (Vitamin C)

- **Description**: Processes user queries via keyword or filters like price, suburb, and property type.
- **Backend**: PostgreSQL queries with logical filters
- **Frontend**: Filters, drop-downs, paginated results

### 3️⃣ Personalized Recommendation System (Nicole)

- **Description**: Suggests properties based on profiles and behaviors.
- **Logic**:
  - Convert user preferences into vectors
  - Similarity to property vectors
  - Collaborative filtering
- **Tools**: scikit-learn, numpy, pandas

### 4️⃣ AI Property Evaluation Module (Jing)

- **Description**: Estimates prices/rent and calculates ROI.
- **Models**: Regression + Random forest
- **Formulas**:
  - ROI = rent ÷ price
  - Payback = price ÷ annual net income

### 5️⃣ AI Chat Assistant Module (Dora)

- **Description**: NLP query parsing and routing.
- **Logic**:
  - Basic: spaCy or regex
  - Advanced: Mistral 7B (Hugging Face API)

### 6️⃣ Visualization & Map Display Module (Xiaochen)

- **Description**: Displays charts and maps.
- **Tools**:
  - Chart.js
  - Leaflet.js
- **Feature**: Automatic zoom-in to reduce marker overlap

### 7️⃣ Admin Website Module (Xiaochen)

- **Description**: Admin backend (details TBD)

---

## 🟧 Part 3: System Component Interactions (Functional Flow)

### Functional Text-Based Flow

- Frontend sends requests to FastAPI backend
- Routing to appropriate modules:
  - Search → Property Filtering → PostgreSQL
  - Recommend → PostgreSQL behavior logs
  - Evaluation → ML prediction + financial calculations
  - Chat → Intent parser → trigger relevant module
- Output sent back to frontend for visualization

### 🧭 User Behavior → Module Mapping

| User Action        | Primary Module           | Related Modules | System Response                  |
| ------------------ | ------------------------ | --------------- | -------------------------------- |
| Register / Login   | User Management          | -               | Creates/verifies account         |
| Set Preferences    | User Management          | Recommendation  | Stores preferences in PostgreSQL |
| Keyword Search     | Property Search          | Visualization   | Query + filter + display charts  |
| View Property      | Logging                  | Recommendation  | Updates behavior history         |
| Save/Favorite      | Logging + Recommendation | -               | Updates collaborative filtering  |
| Ask a question     | Chat Assistant           | Dispatcher      | Routes to proper module          |
| Request prediction | Chat → Evaluation        | Visualization   | Shows value estimate             |
| View map/chart     | Visualization            | -               | Presents module output visually  |

### 🔁 Inter-Module Logic

- Recommendation needs: user preferences + logs
- Prediction feeds into ROI analysis
- All outputs visualized
- User actions logged for continuous improvement
- Chat module parses and routes semantic intent

---

## 🟧 Part 4: Data Collection Strategy

### ✅ 1. Required Data Types

| Module              | Data Type                       | Purpose                    |
| ------------------- | ------------------------------- | -------------------------- |
| Search              | Property data                   | Filtering & display        |
| Recommendation      | Property + user preference      | Feature vector matching    |
| Price Prediction    | Historical sales + features     | Model training             |
| Investment Analysis | Property price + estimated rent | ROI calculations           |
| Chat Assistant      | Keywords + intents              | NLP routing                |
| Visualization       | Regional stats                  | Charts, geospatial display |

### ✅ 2. Data Sources

#### 🏘️ Property Data

| Source             | Type                       | Rating | Notes                      |
| ------------------ | -------------------------- | ------ | -------------------------- |
| Kaggle (Melbourne) | Suburb, price, rooms, type | ⭐⭐⭐⭐⭐  | Ideal for all modules      |
| Kaggle (Ames)      | Advanced features          | ⭐⭐⭐⭐   | Great for price prediction |
| Domain API         | Real AU data               | ⭐⭐⭐    | Needs approval             |
| RealEstate.com.au  | Scraped listings           | ⭐⭐     | Legally risky              |

#### 👤 User Data

- Best option: **Simulate behavior** (user_id, preferences, clicked/saved listings)

#### 📈 Price Prediction Data

- Kaggle datasets
- Estimated rent = price × 0.05

#### 🌍 Geographic Mapping

- OpenStreetMap Nominatim API  
  https://nominatim.openstreetmap.org/search?q=Burwood+NSW&format=json

### 📝 Practical Tips

- Download Melbourne Housing Dataset for:
  - Database population
  - Model training
  - Recommendation vectors
  - Mapping suburbs

- Simulate 10–20 users
- Estimate rents using 5% price rule
- Extract 3–5 listings manually for demo (avoid scraping)