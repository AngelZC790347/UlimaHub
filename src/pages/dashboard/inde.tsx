import color from '@/app/theme/color';
import { Button } from '@mantine/core';
import { useState } from 'react';

const DashBoardPage = () => {
  const [counter, setCounter] = useState(0);
  return (
    <div className="dashboard">
      <h1 style={color:''}>Dashboard</h1>
      <Button onClick={() => setCounter(counter + 1)}>{counter}</Button>
    </div>
  );
};

export default DashBoardPage;
