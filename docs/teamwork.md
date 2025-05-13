# 📘 AI Real Estate Assistant – Team Work Allocation & Timeline

## 🧑‍💻 Team Member Roles & Responsibilities

| Member        | Module                               | Responsibility                                                 |
| ------------- | ------------------------------------ | -------------------------------------------------------------- |
| Xiaochen      | User & Preference Management         | Auth, login, user profiles, session handling                   |
| Xiaochen      | Property Search & Filtering          | UI filters, DB queries, search results display                 |
| Nicole        | Recommendation System                | Feature vectors, collaborative filtering logic, API endpoints  |
| Nicole & Jing | Evaluation Module (Prediction / ROI) | Regression model, ROI logic, price prediction, API integration |
| Vitamin C     | Chat Assistant                       | Rule-based NLP, intent parsing, optional Mistral integration   |
| Dora & Dee    | Visualization + Admin Panel          | Chart.js graphs, Leaflet maps, admin dashboard + data insights |

---

## 📁 File Directory Expectations

### Xiaochen
- `api/auth.py`, `api/search.py`
- `services/auth_service.py`, `property_service.py`
- `models/user.py`, `models/preferences.py`, `models/property.py`
- `db/schemas.py`, `db/database.py`

### Nicole
- `ai_modules/recommender/engine.py`, `utils.py`
- `api/recommendation.py`
- `services/user_service.py`

### Jing
- `ai_modules/prediction/model.py`, `features.py`
- `ai_modules/roi/calculator.py`, `formulas.py`
- `api/evaluation.py`

### Vitamin C
- `ai_modules/chat_assistant/rule_based.py`, `mistral_api.py`
- `api/chat.py`

### Dora & Dee
- `api/visualization.py`
- `frontend/scripts/visualization.js`
- `frontend/scripts/admin.js`
- `frontend/dashboard.html`

---

## 📅 10-Week Timeline with Milestones & Deadlines

### ✅ Week 1: Project Setup
- [All] Agree on tools: FastAPI + Vanilla JS + PostgreSQL
- Setup repo and folder structure
- Deliverable: `docs/file_structure.md`, shared GitHub repo

---

### ✅ Week 2: Static Frontend & Schema
- [Xiaochen] Create `login.html`, `index.html`, and basic `schemas.py`
- [Dora/Dee] Add basic `dashboard.html` layout, `main.css`
- Deadline: End of Week 2
- ✅ Output: Working static pages + DB schema draft

---

### ✅ Week 3: API Scaffold
- [All] Create route scaffolds in `api/*.py`
- [Xiaochen] Implement `auth.py` login endpoint with mock auth
- Deadline: End of Week 3
- ✅ Output: Testable FastAPI routes with `uvicorn`

---

### ✅ Week 4: Auth & Search Integration
- [Xiaochen] Finish `/login`, `/register` + `property_service.py` filtering logic
- [Nicole] Setup dummy user preference vector file
- Deadline: End of Week 4
- ✅ Output: Working login + filter UI connected to backend

---

### ✅ Week 5: Recommendation & Prediction Module
- [Nicole] Implement `engine.py` for content-based recommender
- [Jing] Start linear regression in `model.py` with test data
- Deadline: End of Week 5
- ✅ Output: Static recommendation + prediction results

---

### ✅ Week 6: ROI Analysis & Integration
- [Jing] Implement `roi/calculator.py` formulas
- [Nicole] Integrate recommender output into `recommendation.py`
- [Xiaochen] Hook `/search` + `/recommendation` to frontend
- Deadline: End of Week 6
- ✅ Output: Combined recommender + ROI REST API

---

### ✅ Week 7: Chat Assistant (Static)
- [Vitamin C] Rule-based command triggers in `rule_based.py`
- [Dora] Add `chat.js` and text-based output logic in HTML
- Deadline: End of Week 7
- ✅ Output: Frontend text box triggering backend dummy replies

---

### ✅ Week 8: Interactive Charts & Maps
- [Dora/Dee] Link `visualization.py` → `Chart.js` bar/pie/line charts
- [Xiaochen] Enable map coordinates and Leaflet pin setup
- Deadline: End of Week 8
- ✅ Output: Charts and map working with test data

---

### ✅ Week 9: Admin Dashboard + Logging
- [Dee] Add log table to `schemas.py`, and `/admin/stats` endpoint
- [Dora] Render admin graphs from backend stats
- Deadline: End of Week 9
- ✅ Output: Admin panel showing usage stats

---

### ✅ Week 10: Final Testing & Polish
- [All] Test endpoints, fix UI/UX issues
- [Vitamin C] Write README + setup instructions
- [All] Prepare demo video or presentation
- Deadline: End of Week 10
- ✅ Output: Fully testable MVP

---

## 📌 Tips

- Use `PostgreSQL` for all data storage
- Use `fetch()` in JS for all API requests (when ready)
- Keep model training modular inside `ai_modules/`
- Communicate using GitHub Issues + Notion board

---

🎯 **Goal**: Deliver a complete, testable AI Real Estate Assistant MVP in 10 weeks with shared contributions and clean code modularity.