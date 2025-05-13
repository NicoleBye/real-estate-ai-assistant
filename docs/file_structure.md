# Project Structure: AI Real Estate Assistant

```
ai_real_estate_assistant/
│
├── docs/
|   ├── file_structure.md             #Basic file structure of the application
├── backend/
│   ├── app/
│   │   ├── main.py                   # FastAPI entry point
│   │   ├── config.py                 # Env configs
│   │   ├── db/
│   │   │   ├── database.py           # SQLAlchemy engine/session
│   │   │   └── schemas.py            # Pydantic schemas
│   │   ├── models/                   # ORM models
│   │   │   ├── user.py
│   │   │   ├── preferences.py
│   │   │   └── property.py
│   │   ├── api/                      # API routers
│   │   │   ├── auth.py
│   │   │   ├── search.py
│   │   │   ├── recommendation.py
│   │   │   ├── evaluation.py
│   │   │   ├── chat.py
│   │   │   └── visualization.py
│   │   ├── ai_modules/               # AI logic separated by domain
│   │   │   ├── recommender/
│   │   │   │   ├── engine.py
│   │   │   │   └── utils.py
│   │   │   ├── prediction/
│   │   │   │   ├── model.py
│   │   │   │   └── features.py
│   │   │   ├── roi/
│   │   │   │   ├── calculator.py
│   │   │   │   └── formulas.py
│   │   │   └── chat_assistant/
│   │   │       ├── rule_based.py
│   │   │       └── mistral_api.py
│   │   ├── services/                 # API logic interface
│   │   │   ├── auth_service.py
│   │   │   ├── property_service.py
│   │   │   └── user_service.py
│   │   ├── utils/                    # Token, parsers, helpers
│   │   │   ├── auth.py
│   │   │   └── nlp.py
│   └── requirements.txt              # Python dependencies
│
├── mock_api/                         # Mocks for frontend development
│   ├── README.md
│   ├── server.js                     # Node.js/Express mock server
│   ├── routes/
│   │   ├── auth.js
│   │   ├── search.js
│   │   ├── recommendation.js
│   │   ├── evaluation.js
│   │   ├── chat.js
│   │   └── visualization.js
│   └── package.json
│
├── frontend/
│   ├── index.html
│   ├── login.html
│   ├── dashboard.html
│   ├── styles/
│   │   └── main.css
│   ├── scripts/
│   │   ├── auth.js
│   │   ├── search.js
│   │   ├── recommend.js
│   │   ├── evaluate.js
│   │   ├── chat.js
│   │   └── visualization.js
│   └── assets/
│
├── data/
│   ├── raw/
│   ├── processed/
│   └── models/
│
├── README.md
└── .gitignore
```