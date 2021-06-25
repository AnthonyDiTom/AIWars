import React from 'react';

type RoundButtonProps = {
  color: string;
  onclick: () => void;
};

function CircleButton({ color, onclick }: RoundButtonProps) {
  return (
    <div
      tabIndex={0}
      style={{ backgroundColor: color }}
      role="button"
      className="circle"
      aria-label="circle"
      onClick={onclick}
      onKeyPress={onclick}
    />
  );
}

export default CircleButton;
