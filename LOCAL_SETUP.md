# Local Development Setup

## Prerequisites

- **Node.js:** v22 LTS
- **Package Manager:** pnpm or npm
- **Database:** PostgreSQL 16
- **Mobile SDK:** Flutter (Latest Stable)
- **IDE:** VS Code (recommended)

## Quick Start

1. **Clone the repository**
   ```bash
   git clone <repository_url>
   cd cronos
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**

   - Copy `apps/api/.env.example` to `apps/api/.env`.
   - Copy `apps/web/.env.example` to `apps/web/.env`.
   - Update database credentials and JWT secrets.

4. **Start Database**
   - Ensure PostgreSQL is running locally on port 5432.
   - Create database `cronos`.

5. **Run Migrations & Seeds**
   ```bash
   cd apps/api
   npm run migration:run
   # (Optional) Seed data script
   ```

6. **Start Development Servers**

   - **Backend (API):**
     ```bash
     npm run dev --workspace=apps/api
     ```
     Access Swagger at: http://localhost:4000/api/docs

   - **Frontend (Web):**
     ```bash
     npm run dev --workspace=apps/web
     ```
     Access Web Panel at: http://localhost:3000

   - **Mobile (Flutter):**
     ```bash
     cd mobile
     flutter pub get
     flutter run
     ```

## Troubleshooting

- **Port Conflicts:** Ensure ports 3000 (Web) and 4000 (API) are free.
- **Database Connection:** Check `DB_HOST`, `DB_PORT`, `DB_USERNAME`, `DB_PASSWORD` in `.env`.
