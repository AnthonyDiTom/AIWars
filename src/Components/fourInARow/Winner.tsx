import React from 'react';
// import '../App.css';

type WinnerProps = {
  name: string;
  onClick: () => void;
};

function Winner({ name, onClick }: WinnerProps) {
  return (
    <>
      <div>
        {name} wins !
        <button
          type="button"
          style={{
            marginLeft: '8px',
          }}
          onClick={onClick}
        >
          Restart
        </button>
      </div>
    </>
  );
}

export default Winner;
