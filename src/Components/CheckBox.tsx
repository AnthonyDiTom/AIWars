import React from 'react';
import styled from 'styled-components';

type CheckBoxProps = {
  isChecked: boolean;
  label: string;
  onChange: () => void;
};

const CheckBoxContainer = styled.div`
  border-radius: 20px;
  border: 1px solid #fff;
  flex-direction: row;
  padding: 8px;
  margin: 20px;
`;

function CheckBox({ isChecked, label, onChange }: CheckBoxProps) {
  return (
    <CheckBoxContainer>
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
    </CheckBoxContainer>
  );
}

export default CheckBox;
