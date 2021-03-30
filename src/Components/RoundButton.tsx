import React from 'react';
import '../App.css';

type RoundButtonProps = {
  color: string;
  onclick: () => void;
};

function RoundButton({ color, onclick }: RoundButtonProps) {
  return (
    <div
      tabIndex={0}
      style={{ backgroundColor: color }}
      role="button"
      className="square"
      aria-label="square"
      onClick={onclick}
      onKeyPress={onclick}
    />
  );
}

export default RoundButton;
