import { Badge, Card, Grid, Group, Stack, Text, Title } from '@mantine/core';
import dayjs from 'dayjs';
import { Badge, Card, Grid, Group, Text, Title } from '@mantine/core';

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

const eventosCalendario = [
  { fecha: '2026-06-02', titulo: 'Entrega proyecto PW', tipo: 'tarea' },
  { fecha: '2026-06-05', titulo: 'Examen parcial BD', tipo: 'examen' },
  { fecha: '2026-06-10', titulo: 'Sustentacion grupal', tipo: 'tarea' },
  { fecha: '2026-06-12', titulo: 'Quiz Calculo', tipo: 'examen' },
  { fecha: '2026-06-18', titulo: 'Practica lab 4', tipo: 'tarea' },
  { fecha: '2026-06-25', titulo: 'Examen final Economia', tipo: 'examen' },
];

// devuelve el color segun el estado de la tarea
function getColorEstado(estado: string) {
  if (estado === 'pendiente') return 'yellow';
  if (estado === 'atrasado') return 'red';
  return 'green';
}

function colorTipo(tipo: string) {
  return tipo === 'examen' ? 'red' : 'brand';
}

// los 4 proximos eventos desde hoy
const proximosCuatro = eventosCalendario
  .filter((e) => !dayjs(e.fecha).isBefore(dayjs(), 'day'))
  .sort((a, b) => dayjs(a.fecha).diff(dayjs(b.fecha)))
  .slice(0, 4);

const DashBoardPage = () => {
  return (
    <div style={{ padding: '20px' }}>
      <Title order={2} mb="md">
        Dashboard
      </Title>

      {/* stats rapidos */}
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
        {/* proximas entregas */}
        <Grid.Col span={{ base: 12, md: 7 }}>
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

        {/* feed de proximos eventos del calendario */}
        <Grid.Col span={{ base: 12, md: 5 }}>
          <Title order={4} mb="sm">
            Proximos eventos
          </Title>
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Stack gap="sm">
              {proximosCuatro.map((ev, i) => (
                <Card key={i} shadow="xs" padding="sm" radius="sm" withBorder>
                  <Group justify="space-between">
                    <div>
                      <Badge
                        color={colorTipo(ev.tipo)}
                        size="xs"
                        variant="light"
                        mb={4}
                      >
                        {ev.tipo}
                      </Badge>
                      <Text size="sm" fw={500}>
                        {ev.titulo}
                      </Text>
                    </div>
                    <Text size="xs" c="dimmed" style={{ whiteSpace: 'nowrap' }}>
                      {dayjs(ev.fecha).format('D MMM')}
                    </Text>
                  </Group>
                </Card>
              ))}
            </Stack>
          </Card>
        </Grid.Col>
      {/* lista de tareas proximas */}
      <Title order={4} mb="sm">
        Proximas entregas
      </Title>
      <Grid>
        {tareasProximas.map((tarea) => (
          <Grid.Col key={tarea.id} span={{ base: 12, sm: 6, md: 4 }}>
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
    </div>
  );
};

export default DashBoardPage;
