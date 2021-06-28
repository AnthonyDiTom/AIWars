import styled from 'styled-components';

type Props = {
  color: string;
  onClick: () => void;
};

const CircleButton = styled.button<Props>`
  background: ${(props) => props.color};
  float: left;
  height: 34px;
  width: 34px;
  border-radius: 17px;
  border: none;
  margin: 2px;
`;

export default CircleButton;
