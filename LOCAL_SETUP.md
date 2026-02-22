# Configuración de Desarrollo Local (Local Setup)

Esta guía te ayudará a configurar y ejecutar todo el ecosistema CRONOS (Backend, Frontend y App Móvil) en tu máquina local.

## Requisitos Previos

Asegúrate de tener instalado lo siguiente:

1.  **Node.js**: Versión 22 LTS (Requerido).
2.  **Docker & Docker Compose**: Para la base de datos (y opcionalmente correr todo el stack).
3.  **Flutter SDK**: Última versión estable (para la app móvil).
4.  **Git**: Para clonar el repositorio.
5.  **Editor**: VS Code (recomendado).

---

## Paso 1: Clonar y Preparar

1.  **Clonar el repositorio:**
    ```bash
    git clone <tu-repositorio> cronos
    cd cronos
    ```

2.  **Instalar dependencias:**
    Usamos `npm` con workspaces para gestionar el monorepo.
    ```bash
    npm install
    ```

3.  **Configurar Variables de Entorno:**

    *   **Backend (API):**
        Copia el archivo de ejemplo y ajústalo si es necesario.
        ```bash
        cp apps/api/.env.example apps/api/.env
        ```
        *Nota: Asegúrate de configurar `DB_PASSWORD` y `JWT_SECRET`.*

    *   **Frontend (Web):**
        ```bash
        cp apps/web/.env.example apps/web/.env
        ```

---

## Paso 2: Base de Datos

Puedes correr PostgreSQL localmente o usar Docker. Recomendamos Docker para facilitar la configuración.

1.  **Levantar solo la base de datos con Docker:**
    ```bash
    docker-compose up -d db
    ```
    Esto iniciará PostgreSQL en el puerto `5432`.

2.  **Ejecutar Migraciones:**
    Es CRUCIAL correr las migraciones para crear las tablas (Usuarios, Horas Extras, etc.).
    ```bash
    cd apps/api
    npm run migration:run
    cd ../..
    ```
    *Si ves un error de conexión, verifica que el archivo `apps/api/.env` tenga los datos correctos (`DB_HOST=localhost`, `DB_PORT=5432`, `DB_USERNAME=cronos_user`, `DB_PASSWORD=cronos_password`).*

---

## Paso 3: Ejecutar Backend y Frontend

Desde la raíz del proyecto, puedes abrir dos terminales:

**Terminal 1: Backend (NestJS)**
```bash
npm run dev:api
# O manualmente: npm run dev --workspace=apps/api
```
*   El servidor iniciará en: `http://localhost:4000`
*   Documentación Swagger: `http://localhost:4000/api/docs`

**Terminal 2: Frontend (Next.js)**
```bash
npm run dev:web
# O manualmente: npm run dev --workspace=apps/web
```
*   El panel web iniciará en: `http://localhost:3000`
*   Credenciales por defecto (si corriste seeds): `admin@cronos.com` / `admin123` (o regístrate si no hay seeds).

---

## Paso 4: Ejecutar App Móvil (Flutter)

1.  **Preparar entorno móvil:**
    ```bash
    cd mobile
    flutter pub get
    ```

2.  **Ejecutar en Emulador/Dispositivo:**
    *   Asegúrate de tener un emulador Android abierto o un dispositivo conectado.
    *   **Importante para Android:** El `api_client.dart` está configurado para apuntar a `10.0.2.2:4000` (el localhost de la máquina anfitriona desde el emulador). Si usas un dispositivo físico, cambia esto por la IP local de tu PC (ej. `192.168.1.50`).

    ```bash
    flutter run
    ```

---

## Solución de Problemas Comunes

*   **Error de Base de Datos:** "Connection refused". Asegúrate que el contenedor de Docker `cronos_db` esté corriendo (`docker ps`).
*   **Next.js no conecta:** Verifica que `API_URL_INTERNAL` en `apps/web/.env` apunte a `http://localhost:4000/api/v1`.
*   **Flutter no conecta:** Revisa `mobile/lib/core/api_client.dart` y ajusta `baseUrl` según tu entorno (Emulador vs Dispositivo físico).
*   **Mapa no carga:** Necesitas una API Key de Google Maps válida en `apps/web/.env` (`NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`) y en el `AndroidManifest.xml` de Flutter.
