# 🏡 AI Real Estate Assistant

An AI-powered assistant for real estate analysis, property recommendations, and investment insights, built with FastAPI and a frontend in vanilla JS/HTML/CSS.

---

## 📁 Project Structure

[File Structure](docs/file_structure.md)

---

## 🚀 Quick Start with Docker (Recommended)

### 🧪 Step 1: Prerequisites
- Install [Docker](https://www.docker.com/products/docker-desktop/)
- Clone the repo

### ▶ Step 2: Build & Run
```bash
docker-compose up --build
```

This will launch the backend, database, and mock API services.

---

## ⚙️ Why Docker?

- Ensures consistent dev environments
- Eases onboarding and deployment
- Handles multiple services (backend, DB, mock API)

---

## 🧬 Docker Files

### `backend/Dockerfile`
```Dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY app/ ./app
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

---

### `mock_api/Dockerfile`
```Dockerfile
FROM node:18-alpine
WORKDIR /mock
COPY package.json ./
RUN npm install
COPY . .
CMD ["node", "server.js"]
```

---

### `docker-compose.yml`
```yaml
version: "3.9"
services:
  backend:
    build: ./backend
    ports:
      - "8000:8000"
    depends_on:
      - db
  db:
    image: postgres:15
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
  mock_api:
    build: ./mock_api
    ports:
      - "3000:3000"
```

---
