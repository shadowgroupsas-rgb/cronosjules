# Guía de Despliegue en VPS (Deployment Guide)

Esta guía detalla cómo desplegar CRONOS en un servidor VPS (Virtual Private Server) usando Ubuntu 24.04 LTS y Docker.

## Requisitos del Servidor

*   **Sistema Operativo:** Ubuntu 24.04 LTS (Recomendado)
*   **CPU:** Mínimo 2 vCPUs
*   **RAM:** Mínimo 4GB
*   **Almacenamiento:** 40GB+ SSD
*   **Puertos Abiertos:** 80 (HTTP), 443 (HTTPS), 22 (SSH)

---

## Pasos de Instalación

### 1. Actualizar el Sistema
Conéctate a tu VPS vía SSH y actualiza los paquetes:
```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y curl git ufw
```

### 2. Instalar Docker y Docker Compose
Sigue la documentación oficial o usa el script de conveniencia:
```bash
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER
# Cierra sesión y vuelve a entrar para aplicar cambios de grupo
```

### 3. Clonar el Proyecto
```bash
git clone <url-de-tu-repo> cronos
cd cronos
```

### 4. Configuración de Entorno (Producción)
Crea los archivos `.env` basándote en los ejemplos, pero usa contraseñas seguras.

**Backend (.env):**
```bash
cp apps/api/.env.example apps/api/.env
nano apps/api/.env
```
*   Cambia `DB_HOST` a `db` (nombre del servicio en docker-compose).
*   Establece `NODE_ENV=production`.
*   Genera un `JWT_SECRET` largo y seguro.

**Frontend (.env):**
```bash
cp apps/web/.env.example apps/web/.env
nano apps/web/.env
```
*   Ajusta `API_URL_INTERNAL` a `http://api:4000/api/v1` (comunicación interna Docker).
*   Ajusta `NEXT_PUBLIC_API_URL` a `https://api.tudominio.com/api/v1` (acceso público).

### 5. Construir y Ejecutar Contenedores
Usaremos `docker-compose` para levantar la Base de Datos, API y Web simultáneamente.

```bash
docker compose up -d --build
```
*Esto puede tardar unos minutos mientras compila las aplicaciones.*

### 6. Ejecutar Migraciones (Primera Vez)
Una vez que los contenedores estén corriendo, ejecuta las migraciones dentro del contenedor de la API:

```bash
docker compose exec api npm run migration:run
```

---

## Configuración de Dominio y SSL (Nginx)

Recomendamos usar Nginx como Proxy Inverso para manejar SSL y redirigir tráfico.

### 1. Instalar Nginx y Certbot
```bash
sudo apt install -y nginx certbot python3-certbot-nginx
```

### 2. Configurar Bloques de Servidor
Crea un archivo `/etc/nginx/sites-available/cronos`:

```nginx
server {
    server_name cronos.tudominio.com;

    location / {
        proxy_pass http://localhost:3000; # Frontend Next.js
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}

server {
    server_name api.cronos.tudominio.com;

    location / {
        proxy_pass http://localhost:4000; # Backend NestJS
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Activa el sitio:
```bash
sudo ln -s /etc/nginx/sites-available/cronos /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### 3. Obtener Certificado SSL (HTTPS)
```bash
sudo certbot --nginx -d cronos.tudominio.com -d api.cronos.tudominio.com
```

¡Listo! Tu sistema CRONOS debería estar accesible en `https://cronos.tudominio.com`.

---

## Mantenimiento

*   **Ver logs:** `docker compose logs -f`
*   **Reiniciar servicios:** `docker compose restart`
*   **Actualizar código:**
    ```bash
    git pull
    docker compose up -d --build
    ```
