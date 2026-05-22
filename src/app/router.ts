import { createBrowserRouter } from 'react-router';
import NotFound from '@/pages/NotFound';
import DashBoardPage from '@/pages/dashboard/inde';
import AppLayout from '@/app/layouts/AppLayout';
export default createBrowserRouter([
  {
    Component: AppLayout,
    children: [
      {
        index: true,
        Component: DashBoardPage,
      },
    ],
  },
  {
    path: '*',
    Component: NotFound,
  },
]);
