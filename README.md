# CRONOS

Sistema integral de registro y gestión de horas extras con rastreo GPS en tiempo real para Copower Energy Solutions.

## Arquitectura

El sistema es un Monorepo compuesto por:

- **Backend:** NestJS (Node.js) + PostgreSQL + TypeORM
- **Frontend:** Next.js (Panel Web de Administración)
- **Mobile:** Flutter (App para empleados iOS/Android)
- **Infraestructura:** Docker, Nginx

## Empezando (Getting Started)

### Requisitos Previos

- Node.js 22 LTS
- Docker & Docker Compose
- Flutter SDK (para móvil)

### Configuración Local

Para instrucciones detalladas sobre cómo correr el proyecto en tu máquina, consulta:
👉 **[LOCAL_SETUP.md](./LOCAL_SETUP.md)**

### Despliegue en Servidor

Para instrucciones sobre cómo desplegar en un VPS (Ubuntu) para producción, consulta:
👉 **[DEPLOYMENT.md](./DEPLOYMENT.md)**

## Tecnologías Clave

*   **Autenticación:** JWT con Cookies HttpOnly (Seguridad máxima).
*   **Tiempo Real:** Server-Sent Events (SSE) para el mapa "Ojo de Dios".
*   **Mapas:** Google Maps API.
*   **Reportes:** Generación automática de PDF y Excel.

## Licencia

Propiedad de Copower Energy Solutions.
