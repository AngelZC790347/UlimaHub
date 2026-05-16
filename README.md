# 📘 ULima Hub — Frontend

ULima Hub es una plataforma académica moderna para estudiantes de la Universidad de Lima.  
Centraliza cursos, tareas, calendario, notas, chat y herramientas de productividad en un solo sistema.

---

# 🚀 Stack tecnológico

- React
- TypeScript
- Vite
- React Router (Data APIs)
- Mantine UI

---

# 🧱 Arquitectura del proyecto

Este proyecto sigue una arquitectura modular basada en **separación por responsabilidades + features**.

## Principios clave

- Separación clara entre UI y lógica de negocio
- Arquitectura basada en features (dominio)
- React Router Data para manejo de rutas y datos
- Backend desacoplado (API externa)
- Componentes reutilizables y escalables

---

# 📁 Estructura de carpetas

```txt
src/
│
├── main.tsx
│
├── app/
│   ├── router/
│   ├── layouts/
│   ├── providers/
│   ├── theme/
│   └── config/
│
├── routes/
│   ├── auth/
│   ├── dashboard/
│   ├── courses/
│   ├── tasks/
│   ├── calendar/
│   ├── chat/
│   ├── notes/
│   ├── files/
│   ├── ai/
│   └── settings/
│
├── features/
│   ├── auth/
│   ├── courses/
│   ├── tasks/
│   ├── chat/
│   ├── notes/
│   └── ai/
│
├── services/
│   ├── api/
│   ├── websocket/
│   └── auth/
│
├── components/
│   ├── ui/
│   └── shared/
│
├── hooks/
│
├── types/
│
├── utils/
│
└── assets/
```
