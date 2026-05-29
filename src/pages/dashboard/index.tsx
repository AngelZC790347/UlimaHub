import { Badge, Card, Grid, Group, Text, Title } from '@mantine/core';
import { Calendar } from '@mantine/dates';
import '@mantine/dates/styles.css';

// datos de prueba mientras no hay backend
const listaCursos = [
  { id: 1, nombre: 'Programación Web', creditos: 4 },
  { id: 2, nombre: 'Base de Datos', creditos: 3 },
  { id: 3, nombre: 'Calculo 2', creditos: 4 },
];

const tareasProximas = [
  {
    id: 1,
    titulo: 'Entrega final PW',
    curso: 'Programación Web',
    estado: 'pendiente',
  },
  { id: 2, titulo: 'Practica 3', curso: 'Base de Datos', estado: 'atrasado' },
  { id: 3, titulo: 'Examen parcial', curso: 'Calculo 2', estado: 'pendiente' },
];

// devuelve el color segun el estado de la tarea
function getColorEstado(estado: string) {
  if (estado === 'pendiente') return 'yellow';
  if (estado === 'atrasado') return 'red';
  return 'green';
}

const DashBoardPage = () => {
  return (
    <div style={{ padding: '20px' }}>
      <Title order={2} mb="md">
        Dashboard
      </Title>

      {/* resumen rapido arriba */}
      <Grid mb="xl">
        <Grid.Col span={{ base: 12, sm: 4 }}>
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Text fw={700} size="xl">
              {listaCursos.length}
            </Text>
            <Text c="dimmed" size="sm">
              Cursos activos
            </Text>
          </Card>
        </Grid.Col>

        <Grid.Col span={{ base: 12, sm: 4 }}>
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Text fw={700} size="xl">
              {tareasProximas.filter((t) => t.estado === 'pendiente').length}
            </Text>
            <Text c="dimmed" size="sm">
              Tareas pendientes
            </Text>
          </Card>
        </Grid.Col>

        <Grid.Col span={{ base: 12, sm: 4 }}>
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Text fw={700} size="xl" c="red">
              {tareasProximas.filter((t) => t.estado === 'atrasado').length}
            </Text>
            <Text c="dimmed" size="sm">
              Atrasadas
            </Text>
          </Card>
        </Grid.Col>
      </Grid>

      <Grid>
        {/* lista de tareas proximas */}
        <Grid.Col span={{ base: 12, md: 8 }}>
          <Title order={4} mb="sm">
            Proximas entregas
          </Title>
          <Grid>
            {tareasProximas.map((tarea) => (
              <Grid.Col key={tarea.id} span={{ base: 12, sm: 6 }}>
                <Card shadow="xs" padding="md" radius="md" withBorder>
                  <Group justify="space-between" mb={4}>
                    <Text fw={600} size="sm">
                      {tarea.titulo}
                    </Text>
                    <Badge color={getColorEstado(tarea.estado)} size="sm">
                      {tarea.estado}
                    </Badge>
                  </Group>
                  <Text c="dimmed" size="xs">
                    {tarea.curso}
                  </Text>
                </Card>
              </Grid.Col>
            ))}
          </Grid>
        </Grid.Col>

        {/* mini calendario al costado */}
        <Grid.Col span={{ base: 12, md: 4 }}>
          <Title order={4} mb="sm">
            Este mes
          </Title>
          <Card shadow="xs" padding="md" radius="md" withBorder>
            <Calendar size="sm" />
          </Card>
        </Grid.Col>
      </Grid>
    </div>
  );
};

export default DashBoardPage;
