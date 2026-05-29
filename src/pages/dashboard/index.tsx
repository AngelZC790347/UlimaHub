import { useState } from 'react';
import {
  Badge,
  Card,
  Divider,
  Grid,
  Group,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { Calendar } from '@mantine/dates';
import dayjs from 'dayjs';
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

// eventos del calendario con fecha
const eventosCalendario = [
  { fecha: '2026-06-02', titulo: 'Entrega proyecto PW', tipo: 'tarea' },
  { fecha: '2026-06-05', titulo: 'Examen parcial BD', tipo: 'examen' },
  { fecha: '2026-06-10', titulo: 'Sustentacion grupal', tipo: 'tarea' },
  { fecha: '2026-06-12', titulo: 'Quiz Calculo', tipo: 'examen' },
  { fecha: '2026-06-18', titulo: 'Practica lab 4', tipo: 'tarea' },
  { fecha: '2026-06-25', titulo: 'Examen final Economia', tipo: 'examen' },
];

function getColorEstado(estado: string) {
  if (estado === 'pendiente') return 'yellow';
  if (estado === 'atrasado') return 'red';
  return 'green';
}

function colorTipo(tipo: string) {
  return tipo === 'examen' ? 'red' : 'brand';
}

const DashBoardPage = () => {
  const [diaSeleccionado, setDiaSeleccionado] = useState<Date | null>(null);

  // eventos del dia que se clickeo
  const eventosDelDia = diaSeleccionado
    ? eventosCalendario.filter((e) =>
        dayjs(e.fecha).isSame(dayjs(diaSeleccionado), 'day')
      )
    : [];

  // los 4 proximos eventos desde hoy
  const proximosCuatro = eventosCalendario
    .filter((e) => !dayjs(e.fecha).isBefore(dayjs(), 'day'))
    .sort((a, b) => dayjs(a.fecha).diff(dayjs(b.fecha)))
    .slice(0, 4);

  return (
    <div style={{ padding: '20px' }}>
      <Title order={2} mb="md">
        Dashboard
      </Title>

      {/* stats rapidos */}
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

        {/* columna derecha: calendario + feed */}
        <Grid.Col span={{ base: 12, md: 5 }}>
          <Card shadow="xs" padding="md" radius="md" withBorder>
            <Title order={4} mb="sm">
              Este mes
            </Title>

            <Calendar
              size="sm"
              getDayProps={(date) => {
                const tieneEvento = eventosCalendario.some((e) =>
                  dayjs(e.fecha).isSame(dayjs(date), 'day')
                );
                const estaSeleccionado = diaSeleccionado
                  ? dayjs(date).isSame(dayjs(diaSeleccionado), 'day')
                  : false;
                return {
                  selected: estaSeleccionado,
                  onClick: () =>
                    setDiaSeleccionado(estaSeleccionado ? null : date),
                  style: tieneEvento
                    ? { fontWeight: 700, textDecoration: 'underline' }
                    : {},
                };
              }}
            />

            {/* muestra eventos del dia si hay algo */}
            {diaSeleccionado && (
              <>
                <Divider my="sm" />
                <Text size="xs" fw={600} mb={6}>
                  {dayjs(diaSeleccionado).format('D [de] MMMM')}
                </Text>
                {eventosDelDia.length > 0 ? (
                  <Stack gap={4}>
                    {eventosDelDia.map((ev, i) => (
                      <Group key={i} gap="xs">
                        <Badge
                          color={colorTipo(ev.tipo)}
                          size="xs"
                          variant="light"
                        >
                          {ev.tipo}
                        </Badge>
                        <Text size="xs">{ev.titulo}</Text>
                      </Group>
                    ))}
                  </Stack>
                ) : (
                  <Text size="xs" c="dimmed">
                    Sin eventos este dia
                  </Text>
                )}
              </>
            )}

            <Divider my="sm" />

            {/* feed de los 4 proximos eventos */}
            <Title order={6} mb="xs">
              Proximos eventos
            </Title>
            <Stack gap={6}>
              {proximosCuatro.map((ev, i) => (
                <Group key={i} justify="space-between">
                  <Group gap="xs">
                    <Badge color={colorTipo(ev.tipo)} size="xs" variant="light">
                      {ev.tipo}
                    </Badge>
                    <Text size="xs">{ev.titulo}</Text>
                  </Group>
                  <Text size="xs" c="dimmed">
                    {dayjs(ev.fecha).format('D MMM')}
                  </Text>
                </Group>
              ))}
            </Stack>
          </Card>
        </Grid.Col>
      </Grid>
    </div>
  );
};

export default DashBoardPage;
