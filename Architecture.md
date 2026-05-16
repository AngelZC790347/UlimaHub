# 📘 ULima Hub — Frontend Architecture

## 🧠 Objetivo

Este documento define la arquitectura del frontend de ULima Hub y cómo fluye la información dentro de la aplicación.

El objetivo es mantener:

- separación clara de responsabilidades
- escalabilidad
- consistencia entre desarrolladores

---

# 🚀 Stack

- React + TypeScript
- Vite
- React Router (Data APIs)
- Mantine UI

---

# 🧱 Arquitectura general

La aplicación está dividida en 5 capas principales:

UI (pages)
↓
Hooks (lógica React)
↓
Features (lógica de dominio)
↓
Services (infraestructura)
↓
Backend

---

# 📁 Estructura por capas

## 1. pages/

Representa pantallas completas de la aplicación.

### Responsabilidad:

- UI final
- composición de componentes
- consumo de hooks

### NO debe contener:

- lógica de negocio
- llamadas directas a backend

### Ejemplo:

pages/dashboard/index.tsx  
pages/tasks/index.tsx

---

## 2. hooks/

Conectan React con la lógica del dominio.

### Responsabilidad:

- manejar estado UI
- exponer datos a la vista
- consumir features

### Ejemplo:

useCourses()  
useTasks()

---

## 3. features/

Núcleo de la lógica de negocio por dominio.

Cada feature es independiente.

### Estructura:

features/tasks/
├── api.ts
├── hooks.ts
├── types.ts
├── utils.ts

### Responsabilidad:

- comunicación con backend
- lógica de dominio
- transformación de datos

---

### api.ts

Funciones que llaman al backend:

getTasks()  
createTask()  
deleteTask()

---

### hooks.ts

Adaptación de datos para React:

useTasks()

---

### types.ts

Tipos del dominio:

Task  
TaskStatus

---

### utils.ts

Funciones puras del dominio:

sortTasks()  
filterTasks()

---

## 4. services/

Infraestructura global de la app:

- cliente HTTP
- websocket
- auth/session
- integraciones externas

Ejemplo:
services/api/client.ts  
services/websocket/socket.ts

---

## 5. components/

Componentes reutilizables globales.

### Tipos:

- UI Components (Button, Input, Modal)
- Shared Components (Navbar, Sidebar)

---

## 6. types/

Tipos globales compartidos:

- usados en múltiples features
- no pertenecen a un dominio específico

---

## 7. utils/

Funciones puras reutilizables:

- formatDate
- validators
- helpers

---

## 8. app/

Configuración global de la aplicación:

- router
- layouts
- theme
- config

---

# 🧭 Flujo de datos

Ejemplo: lista de cursos

Page (Dashboard)
↓
useCourses()
↓
features/courses/hooks.ts
↓
features/courses/api.ts
↓
services/api/client.ts
↓
Backend

---

# 🧠 Reglas importantes

## ❌ NO hacer

- fetch directo en pages
- lógica de negocio en components
- hooks llamando backend directamente
- duplicar estado innecesariamente

## ✔ SÍ hacer

- pages solo UI
- hooks como puente React
- features como dominio
- services como infraestructura

---

# 🧩 Convención del equipo

- Cada feature es independiente
- No compartir lógica entre features directamente
- Si se comparte → mover a utils o services

---

# 🚀 Objetivo final

Esta arquitectura busca:

- evitar acoplamiento
- permitir escalar equipo
- mantener orden en crecimiento del proyecto
- facilitar migración a TanStack Query o backend real

---

# 📌 Regla final

Si algo no encaja en esta estructura:

👉 probablemente está en la capa incorrecta
