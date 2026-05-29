import { Badge, Card, Grid, Group, Stack, Text, Title } from '@mantine/core';

// cursos de ejemplo, despues esto vendria del backend
const listaCursos = [
  {
    id: 1,
    nombre: 'Programación Web',
    profe: 'Ing. Ramirez',
    creditos: 4,
    horario: 'Lun / Mie 10:00am',
    ciclo: 7,
  },
  {
    id: 2,
    nombre: 'Base de Datos',
    profe: 'Ing. Torres',
    creditos: 3,
    horario: 'Mar / Jue 8:00am',
    ciclo: 6,
  },
  {
    id: 3,
    nombre: 'Calculo 2',
    profe: 'Dr. Mendoza',
    creditos: 4,
    horario: 'Lun / Mie / Vie 7:00am',
    ciclo: 3,
  },
  {
    id: 4,
    nombre: 'Economía',
    profe: 'Lic. Flores',
    creditos: 3,
    horario: 'Mar / Jue 2:00pm',
    ciclo: 4,
  },
  {
    id: 5,
    nombre: 'Comunicación',
    profe: 'Lic. Vargas',
    creditos: 2,
    horario: 'Vie 10:00am',
    ciclo: 2,
  },
];

const CoursesPage = () => {
  return (
    <div style={{ padding: '20px' }}>
      <Title order={2} mb="md">
        Mis Cursos
      </Title>

      <Grid>
        {listaCursos.map((curso) => (
          <Grid.Col key={curso.id} span={{ base: 12, sm: 6, md: 4 }}>
            <Card
              shadow="sm"
              padding="lg"
              radius="md"
              withBorder
              h="100%"
              style={{ display: 'flex', flexDirection: 'column' }}
            >
              <Stack gap="xs" style={{ flex: 1 }}>
                <Text fw={700} size="lg">
                  {curso.nombre}
                </Text>

                <Text size="sm" c="dimmed">
                  {curso.profe}
                </Text>

                <Text size="sm">{curso.horario}</Text>

                {/* creditos y ciclo */}
                <Group gap="xs" mt="auto">
                  <Badge variant="light" color="brand" size="sm">
                    {curso.creditos} créditos
                  </Badge>
                  <Badge variant="light" color="neutral" size="sm">
                    Ciclo {curso.ciclo}
                  </Badge>
                </Group>
              </Stack>
            </Card>
          </Grid.Col>
        ))}
      </Grid>
    </div>
  );
};

export default CoursesPage;
