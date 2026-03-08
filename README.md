# Finance Tracker — Frontend

> Aplicación web para gestión de finanzas personales construida con Angular y Angular Material.

---

## 🇲🇽 Español

### Descripción
Interfaz web desarrollada con Angular para gestionar ingresos y egresos personales. Se conecta a una API REST en Spring Boot con autenticación JWT y está desplegada en AWS S3.

### Tecnologías
- Angular 19
- TypeScript
- Angular Material
- AWS S3 (hosting)

### Características
- Registro e inicio de sesión
- Crear, editar y eliminar transacciones
- Dashboard con resumen del mes (ingresos, egresos y balance)
- Rutas protegidas con guards
- Interceptor HTTP que agrega el token JWT automáticamente
- Environments configurados para desarrollo y producción

### Demo en vivo
[finance-tracker-frontend-ricardo.s3-website.us-east-2.amazonaws.com](http://finance-tracker-frontend-ricardo.s3-website.us-east-2.amazonaws.com)

### Instalación local

**Requisitos:**
- Node.js
- Angular CLI
- Backend corriendo en localhost:8080

**Pasos:**
```bash
# 1. Clonar el repositorio
git clone https://github.com/Chiripi0rca/finance-tracker-frontend.git
cd finance-tracker-frontend

# 2. Instalar dependencias
npm install

# 3. Correr en desarrollo
ng serve
```

Abre `http://localhost:4200` en tu navegador.

### Variables de entorno
```typescript
// src/environments/environment.development.ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080'
};

// src/environments/environment.ts
export const environment = {
  production: true,
  apiUrl: 'http://18.189.43.78:8080'
};
```

### Backend relacionado
[finance-tracker-backend](https://github.com/Chiripi0rca/finance-tracker-backend)

### Autor
Ricardo Ramos Puga— [GitHub](https://github.com/Chiripi0rca)

---

## 🇺🇸 English

### Description
Web interface built with Angular for managing personal finances (income and expenses). Connects to a Spring Boot REST API with JWT authentication and is hosted on AWS S3.

### Tech Stack
- Angular 19
- TypeScript
- Angular Material
- AWS S3 (hosting)

### Features
- User registration and login
- Create, edit and delete transactions
- Monthly dashboard with income, expenses and balance
- Route guards for protected pages
- HTTP interceptor that automatically attaches JWT token
- Environments configured for development and production

### Live Demo
[finance-tracker-frontend-ricardo.s3-website.us-east-2.amazonaws.com](http://finance-tracker-frontend-ricardo.s3-website.us-east-2.amazonaws.com)

### Local Setup

**Requirements:**
- Node.js
- Angular CLI
- Backend running on localhost:8080

**Steps:**
```bash
# 1. Clone the repository
git clone https://github.com/Chiripi0rca/finance-tracker-frontend.git
cd finance-tracker-frontend

# 2. Install dependencies
npm install

# 3. Run in development
ng serve
```

Open `http://localhost:4200` in your browser.

### Related Backend
[finance-tracker-backend](https://github.com/Chiripi0rca/finance-tracker-backend)

### Author
Ricardo Ramos Puga — [GitHub](https://github.com/Chiripi0rca)
