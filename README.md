# Finance Tracker — Frontend
> Aplicación web para gestión de finanzas personales construida con Angular y Angular Material.

---

## 🇲🇽 Español

### Descripción
Frontend desarrollado con Angular 21 que consume la API REST de Finance Tracker. Permite a los usuarios registrar y visualizar sus movimientos financieros con dashboard mensual, gráficas interactivas, filtros y exportación de datos.

### Tecnologías
- Angular 21
- Angular Material
- Chart.js
- TypeScript
- RxJS

### Características
- Registro e inicio de sesión con JWT
- Refresh Token automático — el usuario no necesita volver a iniciar sesión cuando el token expira
- Interceptor HTTP que agrega el token automáticamente en cada petición
- Guard de rutas — redirige al login si no hay sesión activa
- Dashboard mensual con total de ingresos, egresos y balance
- Gráfica de barras comparativa (ingresos vs egresos vs balance)
- Gráfica de dona con distribución de gastos
- CRUD completo de transacciones
- Categorías predefinidas con enum (COMIDA, RENTA, ENTRETENIMIENTO, SALUD, NOMINA, TRANSPORTE, OTROS)
- Filtros opcionales por categoría y mes
- Paginación con navegación entre páginas
- Exportación de transacciones a CSV

### Instalación local
**Requisitos:**
- Node.js 18+
- Angular CLI 21

**Pasos:**
```bash
# 1. Clonar el repositorio
git clone https://github.com/Chiripi0rca/finance-tracker-frontend.git
cd finance-tracker-frontend

# 2. Instalar dependencias
npm install

# 3. Correr el proyecto
ng serve
```

Abrir en `http://localhost:4200`

> El backend debe estar corriendo en `http://localhost:8080`

### Páginas
| Ruta | Descripción | Auth |
|------|-------------|------|
| /login | Inicio de sesión | No |
| /register | Registro de usuario | No |
| /dashboard | Resumen mensual con gráficas | Sí |
| /transactions | CRUD + filtros + paginación + exportar CSV | Sí |

### Backend relacionado
[finance-tracker-backend](https://github.com/Chiripi0rca/finance-tracker-backend)

### Autor
Ricardo Ramos Puga — [GitHub](https://github.com/Chiripi0rca)

---

## 🇺🇸 English

### Description
Frontend built with Angular 21 that consumes the Finance Tracker REST API. Allows users to register and visualize their financial transactions with a monthly dashboard, interactive charts, filters, and data export.

### Tech Stack
- Angular 21
- Angular Material
- Chart.js
- TypeScript
- RxJS

### Features
- User registration and login with JWT
- Automatic Refresh Token — user stays logged in when access token expires
- HTTP Interceptor that automatically attaches the token to every request
- Route Guard — redirects to login if no active session
- Monthly dashboard with total income, expenses and balance
- Bar chart comparing income vs expenses vs balance
- Doughnut chart with expense distribution
- Full CRUD for transactions
- Predefined category enum (COMIDA, RENTA, ENTRETENIMIENTO, SALUD, NOMIDA, TRANSPORTE, OTROS)
- Optional filters by category and month
- Pagination with page navigation
- CSV export for all transactions

### Local Setup
**Requirements:**
- Node.js 18+
- Angular CLI 21

**Steps:**
```bash
# 1. Clone the repository
git clone https://github.com/Chiripi0rca/finance-tracker-frontend.git
cd finance-tracker-frontend

# 2. Install dependencies
npm install

# 3. Run the project
ng serve
```

Open at `http://localhost:4200`

> The backend must be running at `http://localhost:8080`

### Pages
| Route | Description | Auth |
|-------|-------------|------|
| /login | Login | No |
| /register | Register | No |
| /dashboard | Monthly summary with charts | Yes |
| /transactions | CRUD + filters + pagination + CSV export | Yes |

### Related Backend
[finance-tracker-backend](https://github.com/Chiripi0rca/finance-tracker-backend)

### Author
Ricardo Ramos Puga — [GitHub](https://github.com/Chiripi0rca)