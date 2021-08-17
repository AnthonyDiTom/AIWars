import React from 'react';
import Button from '../styles/Button';

type WinnerProps = {
  name: string;
  onClick: () => void;
};

function Winner({ name, onClick }: WinnerProps) {
  return (
    <>
      <div>
        <span style={{ marginRight: '16px' }}>{name} wins !</span>
        <Button onClick={onClick}>Restart</Button>
      </div>
    </>
  );
}

export default Winner;
