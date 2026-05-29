import { useState } from 'react';
import { Badge, Card, Grid, Stack, Text, Title } from '@mantine/core';
import { Calendar } from '@mantine/dates';
import dayjs from 'dayjs';
import '@mantine/dates/styles.css';

// eventos de ejemplo, despues vendria del backend
const eventosDelMes = [
  { fecha: '2026-06-02', titulo: 'Entrega proyecto PW', tipo: 'tarea' },
  { fecha: '2026-06-05', titulo: 'Examen parcial BD', tipo: 'examen' },
  { fecha: '2026-06-10', titulo: 'Sustentacion grupal', tipo: 'tarea' },
  { fecha: '2026-06-12', titulo: 'Quiz Calculo', tipo: 'examen' },
  { fecha: '2026-06-18', titulo: 'Practica lab 4', tipo: 'tarea' },
  { fecha: '2026-06-25', titulo: 'Examen final Economia', tipo: 'examen' },
];

function colorTipo(tipo: string) {
  return tipo === 'examen' ? 'red' : 'brand';
}

const CalendarPage = () => {
  const [diaSeleccionado, setDiaSeleccionado] = useState<Date | null>(null);

  // filtra los eventos del dia que se clickeo
  const eventosDelDia = diaSeleccionado
    ? eventosDelMes.filter((e) =>
        dayjs(e.fecha).isSame(dayjs(diaSeleccionado), 'day')
      )
    : [];

  // dias que tienen eventos para remarcarlos en el calendario
  const diasConEventos = eventosDelMes.map((e) => e.fecha);

  return (
    <div style={{ padding: '20px' }}>
      <Title order={2} mb="md">
        Calendario
      </Title>

      <Grid>
        <Grid.Col span={{ base: 12, md: 6 }} style={{ minWidth: 0 }}>
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Calendar
              getDayProps={(date) => {
                const tieneEvento = diasConEventos.some((f) =>
                  dayjs(f).isSame(dayjs(date), 'day')
                );
                return {
                  selected: diaSeleccionado
                    ? dayjs(date).isSame(dayjs(diaSeleccionado), 'day')
                    : false,
                  onClick: () => setDiaSeleccionado(date),
                  style: tieneEvento
                    ? { fontWeight: 700, textDecoration: 'underline' }
                    : {},
                };
              }}
            />
          </Card>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 6 }} style={{ minWidth: 0 }}>
          <Card shadow="sm" padding="lg" radius="md" withBorder h="100%">
            {diaSeleccionado ? (
              <>
                <Text fw={600} mb="sm">
                  {dayjs(diaSeleccionado).format('D [de] MMMM')}
                </Text>
                {eventosDelDia.length > 0 ? (
                  <Stack gap="xs">
                    {eventosDelDia.map((ev, i) => (
                      <Card key={i} padding="sm" radius="sm" withBorder>
                        <Badge color={colorTipo(ev.tipo)} size="xs" mb={4}>
                          {ev.tipo}
                        </Badge>
                        <Text size="sm">{ev.titulo}</Text>
                      </Card>
                    ))}
                  </Stack>
                ) : (
                  <Text c="dimmed" size="sm">
                    No hay eventos este dia
                  </Text>
                )}
              </>
            ) : (
              <Text c="dimmed" size="sm">
                Selecciona un dia para ver los eventos
              </Text>
            )}

            {/* lista completa de proximos eventos */}
            <Text fw={600} mt="lg" mb="sm">
              Proximos eventos
            </Text>
            <Stack gap="xs">
              {eventosDelMes.map((ev, i) => (
                <Card key={i} padding="xs" radius="sm" withBorder>
                  <Badge color={colorTipo(ev.tipo)} size="xs" mb={2}>
                    {ev.tipo}
                  </Badge>
                  <Text size="sm">{ev.titulo}</Text>
                  <Text size="xs" c="dimmed">
                    {dayjs(ev.fecha).format('D MMM')}
                  </Text>
                </Card>
              ))}
            </Stack>
          </Card>
        </Grid.Col>
      </Grid>
    </div>
  );
};

export default CalendarPage;
