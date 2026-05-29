# Informe de Contribución — ULima Hub

**Autor:** rasec100  
**Rama:** `paginas-cesar`  
**Pull Request:** #2  
**Fecha:** Mayo 2026

---

## 1. Descripción general

Se creó la rama `paginas-cesar` a partir de `main` para desarrollar nuevas interfaces de usuario sin afectar el trabajo existente del equipo. Los cambios se subieron mediante un Pull Request para revisión antes de integrarse a la rama principal.

El objetivo fue construir las páginas que faltaban en la aplicación (Tareas y Cursos), mejorar el Dashboard que solo tenía un placeholder, y corregir dos errores que afectaban a todo el equipo.

---

## 2. Archivos modificados y creados

| Archivo                         | Tipo       | Descripción                                   |
| ------------------------------- | ---------- | --------------------------------------------- |
| `src/pages/dashboard/index.tsx` | Modificado | Dashboard rediseñado con cards y estadísticas |
| `src/pages/tasks/index.tsx`     | Creado     | Página de tareas con filtros                  |
| `src/pages/courses/index.tsx`   | Creado     | Página de cursos en grid                      |
| `src/app/router.ts`             | Modificado | Registro de rutas nuevas                      |
| `.husky/pre-commit`             | Modificado | Fix del hook roto                             |

---

## 3. Cambios en detalle

### 3.1 Dashboard (`/`)

**Problema:** La página del dashboard contenía únicamente un contador con un botón de Mantine, sin ningún contenido relevante para la aplicación.

**Solución:** Se reemplazó el contenido por una UI con dos secciones:

**Sección de estadísticas rápidas**

Se usó el componente `Grid` de Mantine con `Grid.Col` y la prop `span` con breakpoints responsivos:

```tsx
<Grid.Col span={{ base: 12, sm: 4 }}>
```

Esto hace que en pantallas pequeñas (`base`) cada card ocupe el 100% del ancho (12 de 12 columnas), y en pantallas medianas en adelante (`sm`) ocupe un tercio (4 de 12). Las tres cards muestran:

- Total de cursos activos
- Número de tareas pendientes (calculado con `.filter()`)
- Número de tareas atrasadas (también con `.filter()`, con color rojo para llamar la atención)

**Sección de próximas entregas**

Lista de cards con el título de la tarea, el curso al que pertenece, y un `Badge` de color que varía según el estado. El color se calcula con una función auxiliar `getColorEstado`:

```tsx
function getColorEstado(estado: string) {
  if (estado === 'pendiente') return 'yellow';
  if (estado === 'atrasado') return 'red';
  return 'green';
}
```

Los datos son mock (hardcodeados en arrays) ya que el backend aún no está implementado, pero la estructura está lista para reemplazarlos por llamadas a la API cuando esté disponible.

---

### 3.2 Página de Tareas (`/tasks`)

**Archivo:** `src/pages/tasks/index.tsx`

**Descripción:** Página nueva que muestra todas las tareas del usuario con la posibilidad de filtrarlas por estado.

**Tipado con TypeScript**

Se definió un tipo union para los estados posibles de una tarea:

```tsx
type EstadoTarea = 'pendiente' | 'entregado' | 'atrasado';
```

Y una interfaz para el objeto completo:

```tsx
interface Tarea {
  id: number;
  titulo: string;
  curso: string;
  fecha: string;
  estado: EstadoTarea;
}
```

Esto permite que TypeScript detecte en tiempo de compilación si se usa un estado inválido, evitando bugs difíciles de encontrar en runtime.

**Filtrado con estado local**

El filtro activo se maneja con `useState`:

```tsx
const [filtroActivo, setFiltroActivo] = useState<EstadoTarea | 'todos'>(
  'todos'
);
```

La lista filtrada se deriva del estado sin necesidad de almacenarla por separado:

```tsx
const tareasFiltradas =
  filtroActivo === 'todos'
    ? todasLasTareas
    : todasLasTareas.filter((t) => t.estado === filtroActivo);
```

Este patrón evita tener dos arrays en estado (el original y el filtrado) que podrían desincronizarse.

**Feedback visual en los botones**

Los botones de filtro cambian entre `variant="filled"` y `variant="outline"` según cuál está activo:

```tsx
variant={filtroActivo === 'pendiente' ? 'filled' : 'outline'}
```

**Estado vacío**

Si el filtro no devuelve resultados se muestra un mensaje en lugar de una lista vacía sin explicación:

```tsx
{
  tareasFiltradas.length === 0 && (
    <Text c="dimmed" ta="center" mt="xl">
      No hay tareas en esta categoria
    </Text>
  );
}
```

---

### 3.3 Página de Cursos (`/courses`)

**Archivo:** `src/pages/courses/index.tsx`

**Descripción:** Página nueva que muestra los cursos del ciclo actual en formato de cards dentro de un grid responsivo.

Cada card contiene:

- Nombre del curso
- Nombre del docente
- Horario de clases
- Créditos del curso (con `Badge`)
- Número de ciclo (con `Badge`)

Se usó la prop `h="100%"` en las cards para que todas tengan la misma altura dentro de cada fila del grid, evitando que las más cortas queden visualmente desalineadas. Dentro de cada card se usa `Stack` con `mt="auto"` en los badges para empujarlos siempre al fondo de la card independientemente del contenido.

Los badges usan `variant="light"` para que tengan presencia visual sin competir con el texto principal de la card.

---

### 3.4 Router (`src/app/router.ts`)

Se registraron las dos nuevas rutas como hijas del `AppLayout` existente:

```tsx
{
  Component: AppLayout,
  children: [
    { index: true, Component: DashBoardPage },
    { path: 'tasks', Component: TasksPage },
    { path: 'courses', Component: CoursesPage },
  ],
}
```

Al ser hijas de `AppLayout`, heredan automáticamente el navbar y el sidebar sin necesidad de incluirlos en cada página. Esto sigue el patrón de layouts anidados de React Router v7.

También se corrigió el import del dashboard:

```tsx
// antes
import DashBoardPage from '@/pages/dashboard/inde';
// despues
import DashBoardPage from '@/pages/dashboard';
```

Al renombrar el archivo a `index.tsx`, el módulo puede importarse directamente desde la carpeta sin especificar el nombre del archivo.

---

### 3.5 Fix: typo `inde.tsx` → `index.tsx`

El archivo principal del dashboard estaba nombrado `inde.tsx` en lugar de `index.tsx`. Esto rompía la convención del proyecto (todos los demás archivos de página usan `index.tsx`) y hacía que el import fuera inconsistente.

Se usó `git mv` para renombrar el archivo de forma que git registre el cambio como un rename y no como un archivo eliminado y uno nuevo, preservando el historial del archivo.

---

### 3.6 Fix: hook de Husky roto

**Archivo:** `.husky/pre-commit`

El hook de pre-commit ejecutaba `npm test` antes de cada commit:

```sh
npm test        # <-- esta linea
npx lint-staged
```

El problema es que no existe un script `test` en el `package.json` del proyecto, por lo que cualquier intento de commit fallaba con:

```
npm error Missing script: "test"
husky - pre-commit script failed (code 1)
```

Esto afectaba a todos los colaboradores del repositorio. Se eliminó la línea de `npm test` dejando solo `npx lint-staged`, que sí está correctamente configurado en el `package.json` para correr ESLint y Prettier sobre los archivos modificados antes de cada commit.

---

## 4. Decisiones técnicas

| Decisión                           | Razón                                                                                       |
| ---------------------------------- | ------------------------------------------------------------------------------------------- |
| Datos mock en arrays               | No hay backend todavía, pero la estructura de los datos ya refleja lo que vendría de la API |
| `useState` para el filtro en Tasks | Es estado local de UI, no necesita estar en un contexto global ni en el router              |
| Grid con breakpoints responsivos   | La app debe funcionar en mobile y desktop según los requisitos del proyecto                 |
| Tipado estricto con TypeScript     | Detecta errores en compilación en lugar de en runtime, más fácil de mantener                |
| Rama separada + PR                 | Permite revisión del equipo antes de integrar y evita romper `main`                         |

---

## 5. Commits

```
2776f9c  agregando paginas de tareas y cursos + mejora dashboard
8fce445  fix typo en nombre de archivo inde.tsx -> index.tsx
```
