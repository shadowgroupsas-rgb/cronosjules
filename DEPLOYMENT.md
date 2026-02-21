# Deployment Guide

## Server Requirements (VPS)

- **OS:** Ubuntu 24.04 LTS (recommended)
- **CPU:** 2+ vCPUs
- **RAM:** 4GB+
- **Storage:** 40GB+ SSD

## Installation Steps

1. **Update System**
   ```bash
   sudo apt update && sudo apt upgrade -y
   sudo apt install -y curl git ufw
   ```

2. **Install Node.js 22**
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
   sudo apt install -y nodejs
   ```

3. **Install Docker & Docker Compose**
   ```bash
   # Follow official Docker documentation
   ```

4. **Install PostgreSQL 16** (If running locally instead of Docker)
   ```bash
   # Add PostgreSQL repository and install
   ```

5. **Clone Repository**
   ```bash
   git clone <repository_url> cronos
   cd cronos
   npm install
   ```

6. **Configure Environment**
   - Copy `.env.example` to `apps/api/.env` and `apps/web/.env`.
   - Update variables (Database credentials, JWT secrets, API Keys).

7. **Build & Run (Using Docker)**
   ```bash
   docker-compose up -d --build
   ```

8. **Nginx Reverse Proxy**
   - Install Nginx: `sudo apt install nginx`
   - Configure sites (see `nginx.conf.example`).
   - Obtain SSL with Certbot: `sudo apt install certbot python3-certbot-nginx`.

## Maintenance

- **Logs:** `docker logs -f cronos_api`
- **Backup:** Periodically backup PostgreSQL data volume.
