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
      layout="default"
      header={{
        height: 30,
      }}
      navbar={{
        width: opened ? 260 : 80,
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
          <Burger opened={opened} onClick={toggle} />
          <div style={{ flex: 1, width: 50 }}>
            <h2>Ulima Hub</h2>
          </div>
        </Flex>
      </AppShell.Header>
      <AppShell.Navbar 
        pt={'md'}  
        withBorder={false}
        className="sidebar">
        <Logo style={{ margin: '0 auto' }}></Logo>
        <ul className="menu-list">
          <Link to="/" label={opened ? 'Dashboard' : ''} className="menu-item"></Link>
          <Link to="/teams" label={opened ? 'Teams' : ''} className="menu-item"></Link>
        </ul>
      </AppShell.Navbar>
      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
};

export default AppLayout;
