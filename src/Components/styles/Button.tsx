import styled from 'styled-components';
import { color } from './colors';

const Button = styled.button`
  border-radius: 4px;
  background: ${color.button};
  white-space: nowrap;
  color: #fff;
  outline: none;
  border: none;
  cursor: pointer;
  padding: 10px 14px 10px 14px;
  font-size: 1.2rem;

  &:hover {
    transition: all 0.3s ease-out;
    background: #fff;
    background-color: ${color.buttonHover};
  }
`;

export default Button;
