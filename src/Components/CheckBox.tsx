import React from 'react';
import '../App.css';

type CheckBoxProps = {
  isChecked: boolean;
  label: string;
  onChange: () => void;
};

function CheckBox({ isChecked, label, onChange }: CheckBoxProps) {
  return (
    <div className="checkBox">
      <input
        style={{
          height: '15px',
          width: '15px',
          marginRight: '8px',
        }}
        name="isGoing"
        type="checkbox"
        checked={isChecked}
        onChange={onChange}
      />
      {label}
    </div>
  );
}

export default CheckBox;
