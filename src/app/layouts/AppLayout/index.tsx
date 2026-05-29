import { Link } from 'react-router';
import { AppShell, Burger, Flex } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Outlet } from 'react-router';
import './AppLayout.css';
import Logo from '@/components/ui/Logo';
import { House, BookOpen, SquareCheck, UsersRound } from 'lucide-react';

const AppLayout = () => {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 50 }}
      navbar={{
        width: opened ? 220 : 70,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      withBorder={false}
    >
      <AppShell.Header style={{ background: '#1e1e1e' }}>
        <Flex align="center" gap="sm" px={10} h="100%">
          <Burger opened={opened} onClick={toggle} color="white" />
          <h2 style={{ color: 'white', margin: 0, fontSize: 18 }}>Ulima Hub</h2>
        </Flex>
      </AppShell.Header>

      <AppShell.Navbar
        className={`sidebar ${opened ? 'expanded' : 'collapsed'}`}
      >
        <div className="logo-container">
          <Logo />
        </div>
        <ul className="menu-list">
          <Link to="/" className="menu-item" title="Dashboard">
            <House size={20} className="menu-icon" />
            <span className="menu-label">Dashboard</span>
          </Link>
          <Link to="/courses" className="menu-item" title="Courses">
            <BookOpen size={20} className="menu-icon" />
            <span className="menu-label">Courses</span>
          </Link>
          <Link to="/tasks" className="menu-item" title="Tasks">
            <SquareCheck size={20} className="menu-icon" />
            <span className="menu-label">Tasks</span>
          </Link>
          <Link to="/teams" className="menu-item" title="Teams">
            <UsersRound size={20} className="menu-icon" />
            <span className="menu-label">Teams</span>
          </Link>
        </ul>
      </AppShell.Navbar>

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
};

export default AppLayout;
