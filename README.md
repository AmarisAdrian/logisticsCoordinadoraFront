
---

## 🌐 Frontend – `logisticsCoordinadoraFront`

```markdown
# 🌐 Logistics Coordinadora – Frontend

Este es el frontend del proyecto **Logistics Coordinadora**, desarrollado en **Angular 19**, utilizando una arquitectura modular basada en **Feature Modules**, con **Lazy Loading**, **Core Module**, y principios **SOLID** inspirados en Clean Architecture.

---

## 🚀 Tecnologías

- Angular v19
- TypeScript
- RxJS
- Angular Router
- Docker & Docker Compose
- Nginx (como servidor)

---

## 📂 Estructura de Carpetas
src/
├── app/
│ ├── core/ # Servicios e interceptores globales
│ ├── layout/ # Componentes de layout
│ ├── modules/ # Módulos por funcionalidad: auth, shipping, users
│ ├── enviroments/ # Variables de entorno
│ └── app.routes.ts # Rutas principales


---

## ⚙️ Instalación y ejecución con Docker

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/AmarisAdrian/logisticsCoordinadoraFront.git
   cd logisticsCoordinadoraFront

2. Ejecutar los contenedores: docker-compose down && docker-compose build --no-cache --quiet && docker-compose up -d
3. Acceder a la aplicación: http://localhost:4200/login

🔐 Credenciales de prueba
  - Email: admin@admin.com
  - Password: 123456

🧱 Arquitectura

- Modularización por características (Feature Modules)
- Lazy Loading para carga eficiente de módulos
- Interceptors, Guards y Services centralizados en core/
- Separa responsabilidades según Clean Architecture

