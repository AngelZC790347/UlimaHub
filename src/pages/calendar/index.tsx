import { useState } from 'react';
import {
  ActionIcon,
  Badge,
  Card,
  Grid,
  Group,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';

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

// genera las celdas del mes (null = espacio vacio al inicio de la semana)
function getCeldas(mes: Dayjs): (number | null)[] {
  const primero = mes.startOf('month');
  const dow = primero.day(); // 0=dom, 1=lun...
  const offset = dow === 0 ? 6 : dow - 1; // ajuste para que empiece en lunes
  const celdas: (number | null)[] = [];
  for (let i = 0; i < offset; i++) celdas.push(null);
  for (let d = 1; d <= primero.daysInMonth(); d++) celdas.push(d);
  return celdas;
}

const DIAS_SEMANA = ['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa', 'Do'];

const CalendarPage = () => {
  const hoy = dayjs();
  const [mesViendo, setMesViendo] = useState(() => dayjs());
  const [diaSeleccionado, setDiaSeleccionado] = useState<string | null>(null);

  const celdas = getCeldas(mesViendo);

  const eventosDelDia = diaSeleccionado
    ? eventosDelMes.filter((e) => e.fecha === diaSeleccionado)
    : [];

  return (
    <div style={{ padding: '20px' }}>
      <Title order={2} mb="md">
        Calendario
      </Title>

      <Grid>
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            {/* navegacion mes */}
            <Group justify="space-between" mb="sm">
              <ActionIcon
                variant="subtle"
                onClick={() => setMesViendo((m) => m.subtract(1, 'month'))}
              >
                {'<'}
              </ActionIcon>
              <Text fw={600} size="sm">
                {mesViendo.format('MMMM YYYY')}
              </Text>
              <ActionIcon
                variant="subtle"
                onClick={() => setMesViendo((m) => m.add(1, 'month'))}
              >
                {'>'}
              </ActionIcon>
            </Group>

            {/* cabecera dias de la semana */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(7, 1fr)',
                marginBottom: 4,
              }}
            >
              {DIAS_SEMANA.map((d) => (
                <Text key={d} size="xs" ta="center" c="dimmed" fw={600}>
                  {d}
                </Text>
              ))}
            </div>

            {/* grid de dias - columnas fijas, no cambia con el contenido */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(7, 1fr)',
                gap: 2,
              }}
            >
              {celdas.map((dia, i) => {
                if (!dia) return <div key={i} />;
                const fechaStr = mesViendo.date(dia).format('YYYY-MM-DD');
                const tieneEvento = eventosDelMes.some(
                  (e) => e.fecha === fechaStr
                );
                const seleccionado = fechaStr === diaSeleccionado;
                const esHoy = mesViendo.date(dia).isSame(hoy, 'day');
                return (
                  <button
                    key={i}
                    onClick={() =>
                      setDiaSeleccionado(seleccionado ? null : fechaStr)
                    }
                    style={{
                      aspectRatio: '1',
                      border: 'none',
                      borderRadius: 6,
                      cursor: 'pointer',
                      fontWeight: tieneEvento ? 700 : 400,
                      textDecoration: tieneEvento ? 'underline' : 'none',
                      background: seleccionado
                        ? 'var(--mantine-primary-color-filled)'
                        : esHoy
                          ? 'var(--mantine-color-default-border)'
                          : 'transparent',
                      color: seleccionado
                        ? '#fff'
                        : 'var(--mantine-color-text)',
                      fontSize: 13,
                    }}
                  >
                    {dia}
                  </button>
                );
              })}
            </div>
          </Card>
        </Grid.Col>

        {/* panel derecho: detalle del dia + lista de proximos */}
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Card shadow="sm" padding="lg" radius="md" withBorder h="100%">
            {diaSeleccionado ? (
              <>
                <Text fw={600} mb="sm">
                  {dayjs(diaSeleccionado).format('D [de] MMMM')}
                </Text>
                {eventosDelDia.length > 0 ? (
                  <Stack gap="xs" mb="md">
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
                  <Text c="dimmed" size="sm" mb="md">
                    No hay eventos este dia
                  </Text>
                )}
              </>
            ) : (
              <Text c="dimmed" size="sm" mb="md">
                Selecciona un dia para ver los eventos
              </Text>
            )}

            <Text fw={600} mb="sm">
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
