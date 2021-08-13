import styled from 'styled-components';
import { device } from './deviceSizes';

type Props = {
  color: string;
  onClick: () => void;
};

const CircleButton = styled.button<Props>`
  background: ${(props) => props.color};
  float: left;
  height: 50px;
  width: 50px;
  border-radius: 25px;
  border: none;
  margin: 2px;

  @media ${device.tablet} {
    height: 34px;
    width: 34px;
    border-radius: 17px;
  }
  @media ${device.mobileL} {
    height: 30px;
    width: 30px;
    border-radius: 15px;
  }
`;

export default CircleButton;
