import { Link } from '@/components/shared/Link';
import { AppShell, Burger, em, Flex } from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { Outlet } from 'react-router';
import './AppLayout.css';
import Logo from '@/components/ui/Logo';
const AppLayout = () => {
  const [opened, { toggle }] = useDisclosure();
  const isMobile = useMediaQuery(`(max-width: ${em(750)})`);
  return (
    <AppShell
      layout={isMobile ? 'default' : 'alt'}
      header={{
        height: 30,
      }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      withBorder={false}
    >
      <AppShell.Header>
        <Flex
          direction={{
            base: 'column-reverse',
            sm: 'row',
          }}
          align={'center'}
          gap={'sm'}
          px={10}
          h={'100%'}
        >
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" />
          <div style={{ flex: 1, width: 50 }}>
            <h2>Ulima Hub</h2>
          </div>
        </Flex>
      </AppShell.Header>
      <AppShell.Navbar pt={'md'} withBorder={true}>
        <Logo style={{ margin: '0 auto' }}></Logo>
        <ul>
          <Link to="/" label="Dashboard"></Link>
          <Link to="/teams" label="Teams"></Link>
        </ul>
      </AppShell.Navbar>
      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
};

export default AppLayout;
