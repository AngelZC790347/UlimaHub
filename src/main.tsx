import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@/index.css';
import '@mantine/core/styles.css';
import router from '@/app/router';
import { MantineProvider } from '@mantine/core';
import { RouterProvider } from 'react-router';
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MantineProvider defaultColorScheme="auto">
      <RouterProvider router={router}></RouterProvider>
    </MantineProvider>
  </StrictMode>,
);
