import { useState } from 'react';
import { Badge, Button, Card, Group, Stack, Text, Title } from '@mantine/core';

// tipos posibles de estado
type EstadoTarea = 'pendiente' | 'entregado' | 'atrasado';

interface Tarea {
  id: number;
  titulo: string;
  curso: string;
  fecha: string;
  estado: EstadoTarea;
}

// info de prueba
const todasLasTareas: Tarea[] = [
  {
    id: 1,
    titulo: 'Entrega final proyecto web',
    curso: 'Programación Web',
    fecha: '2026-06-10',
    estado: 'pendiente',
  },
  {
    id: 2,
    titulo: 'Practica laboratorio 3',
    curso: 'Base de Datos',
    fecha: '2026-05-28',
    estado: 'atrasado',
  },
  {
    id: 3,
    titulo: 'Trabajo grupal economia',
    curso: 'Economía',
    fecha: '2026-06-15',
    estado: 'pendiente',
  },
  {
    id: 4,
    titulo: 'Quiz semana 8',
    curso: 'Calculo 2',
    fecha: '2026-05-20',
    estado: 'entregado',
  },
  {
    id: 5,
    titulo: 'Informe de lectura',
    curso: 'Comunicación',
    fecha: '2026-05-25',
    estado: 'entregado',
  },
  {
    id: 6,
    titulo: 'Ejercicios cap 5',
    curso: 'Calculo 2',
    fecha: '2026-06-01',
    estado: 'pendiente',
  },
];

function colorPorEstado(estado: EstadoTarea) {
  const colores = {
    pendiente: 'yellow',
    entregado: 'green',
    atrasado: 'red',
  };
  return colores[estado];
}

const TasksPage = () => {
  // filtro activo, por defecto muestra todo
  const [filtroActivo, setFiltroActivo] = useState<EstadoTarea | 'todos'>(
    'todos'
  );

  const tareasFiltradas =
    filtroActivo === 'todos'
      ? todasLasTareas
      : todasLasTareas.filter((t) => t.estado === filtroActivo);

  return (
    <div style={{ padding: '20px' }}>
      <Title order={2} mb="md">
        Mis Tareas
      </Title>

      {/* botones para filtrar */}
      <Group mb="lg">
        <Button
          variant={filtroActivo === 'todos' ? 'filled' : 'outline'}
          size="xs"
          onClick={() => setFiltroActivo('todos')}
        >
          Todas
        </Button>
        <Button
          variant={filtroActivo === 'pendiente' ? 'filled' : 'outline'}
          color="yellow"
          size="xs"
          onClick={() => setFiltroActivo('pendiente')}
        >
          Pendientes
        </Button>
        <Button
          variant={filtroActivo === 'atrasado' ? 'filled' : 'outline'}
          color="red"
          size="xs"
          onClick={() => setFiltroActivo('atrasado')}
        >
          Atrasadas
        </Button>
        <Button
          variant={filtroActivo === 'entregado' ? 'filled' : 'outline'}
          color="green"
          size="xs"
          onClick={() => setFiltroActivo('entregado')}
        >
          Entregadas
        </Button>
      </Group>

      <Stack gap="sm">
        {tareasFiltradas.map((tarea) => (
          <Card key={tarea.id} shadow="xs" padding="md" radius="md" withBorder>
            <Group justify="space-between">
              <div>
                <Text fw={600}>{tarea.titulo}</Text>
                <Text size="xs" c="dimmed">
                  {tarea.curso} · vence {tarea.fecha}
                </Text>
              </div>
              <Badge color={colorPorEstado(tarea.estado)}>{tarea.estado}</Badge>
            </Group>
          </Card>
        ))}

        {/* si no hay resultados con ese filtro */}
        {tareasFiltradas.length === 0 && (
          <Text c="dimmed" ta="center" mt="xl">
            No hay tareas en esta categoria
          </Text>
        )}
      </Stack>
    </div>
  );
};

export default TasksPage;
