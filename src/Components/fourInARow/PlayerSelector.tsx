import React, { useState } from 'react';

interface Props {
  defaultName: string;
}

const PlayerSelector = ({ defaultName }: Props) => {
  const [playerName, setPlayerName] = useState(defaultName);

  return (
    <div>
      <span style={{ color: 'white' }}>{playerName}</span>
    </div>
  );
};

export default PlayerSelector;
