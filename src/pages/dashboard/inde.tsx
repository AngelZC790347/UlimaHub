import { Button } from '@mantine/core';
import { useState } from 'react';

const DashBoardPage = () => {
  const [counter, setCounter] = useState(0);
  return (
    <div className="dashboard">
      <h1 style={{ color: 'var(--mantine-primary-color-light-color)' }}>
        Dashboard
      </h1>
      <Button onClick={() => setCounter(counter + 1)}>{counter}</Button>
    </div>
  );
};

export default DashBoardPage;
