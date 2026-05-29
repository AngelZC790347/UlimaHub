import { createBrowserRouter } from 'react-router';
import NotFound from '@/pages/NotFound';
import DashBoardPage from '@/pages/dashboard';
import TasksPage from '@/pages/tasks';
import CoursesPage from '@/pages/courses';
import AppLayout from '@/app/layouts/AppLayout';

export default createBrowserRouter([
  {
    Component: AppLayout,
    children: [
      {
        index: true,
        Component: DashBoardPage,
      },
      {
        path: 'tasks',
        Component: TasksPage,
      },
      {
        path: 'courses',
        Component: CoursesPage,
      },
    ],
  },
  {
    path: '*',
    Component: NotFound,
  },
]);
