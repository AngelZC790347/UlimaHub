# 📘 ULima Hub — Frontend

ULima Hub es una plataforma académica moderna para estudiantes de la Universidad de Lima.  
Centraliza cursos, tareas, calendario, notas, chat y herramientas de productividad en un solo sistema.

---

# 🚀 Stack tecnológico

- [React-Vite-Ts-template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts)
- [React Router (Data APIs)](https://reactrouter.com/start/data/routing)
- [Mantine UI](https://mantine.dev/)

---

# 🧱 Arquitectura del proyecto

Este proyecto sigue una arquitectura modular basada en **separación por responsabilidades + features**.

> ⚠️ **IMPORTANTE**
> Leer especificaion de la arquitectura [Arhitecture.md](./Architecture.md).

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
