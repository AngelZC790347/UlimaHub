import { useState } from 'react';
import {
  ActionIcon,
  Badge,
  Card,
  Group,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';

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

// devuelve array de dias del mes con null para los huecos del inicio
function getCeldas(mes: Dayjs): (number | null)[] {
  const primero = mes.startOf('month');
  const dow = primero.day(); // 0=dom en js
  const offset = dow === 0 ? 6 : dow - 1; // ajuste a lunes
  const celdas: (number | null)[] = [];
  for (let i = 0; i < offset; i++) celdas.push(null);
  for (let d = 1; d <= primero.daysInMonth(); d++) celdas.push(d);
  return celdas;
}

const DIAS = ['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa', 'Do'];

// estilo base de cada boton de dia
const estiloBoton = (
  seleccionado: boolean,
  esHoy: boolean,
  tieneEvento: boolean
): React.CSSProperties => ({
  display: 'block',
  width: '100%',
  height: 32,
  padding: 0,
  margin: 0,
  textAlign: 'center',
  lineHeight: '32px',
  border: 'none',
  borderRadius: 6,
  cursor: 'pointer',
  fontSize: 13,
  fontWeight: tieneEvento ? 700 : 400,
  textDecoration: tieneEvento ? 'underline' : 'none',
  background: seleccionado
    ? 'var(--mantine-primary-color-filled)'
    : esHoy
      ? 'var(--mantine-color-default-border)'
      : 'transparent',
  color: seleccionado ? '#fff' : 'var(--mantine-color-text)',
});

const CalendarPage = () => {
  const hoy = dayjs();
  const [mesViendo, setMesViendo] = useState(() => dayjs());
  const [diaSeleccionado, setDiaSeleccionado] = useState<string | null>(null);

  const celdas = getCeldas(mesViendo);

  const eventosDelDia = diaSeleccionado
    ? eventosDelMes.filter((e) => e.fecha === diaSeleccionado)
    : [];

  return (
    <div style={{ padding: 20 }}>
      <Title order={2} mb="md">
        Calendario
      </Title>

      {/*
        repeat(auto-fit, minmax(280px, 1fr)):
        - cada columna tiene minimo 280px y maximo 1fr
        - si no caben 2 columnas se apilan (responsive sin media queries)
        - minmax(0, 1fr) en vez de solo 1fr previene que el contenido expanda las columnas
      */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 16,
          alignItems: 'start',
        }}
      >
        {/* panel izquierdo: calendario */}
        <Card shadow="sm" padding="lg" radius="md" withBorder>
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
            {DIAS.map((d) => (
              <Text key={d} size="xs" ta="center" c="dimmed" fw={600}>
                {d}
              </Text>
            ))}
          </div>

          {/* grid de dias, columnas con minmax(0,1fr) para que no se expandan */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(7, minmax(0, 1fr))',
              gap: 2,
            }}
          >
            {celdas.map((dia, i) => {
              if (!dia) return <div key={i} style={{ height: 32 }} />;
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
                  style={estiloBoton(seleccionado, esHoy, tieneEvento)}
                >
                  {dia}
                </button>
              );
            })}
          </div>
        </Card>

        {/* panel derecho: detalle y lista de proximos */}
        <Card shadow="sm" padding="lg" radius="md" withBorder>
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
      </div>
    </div>
  );
};

export default CalendarPage;
