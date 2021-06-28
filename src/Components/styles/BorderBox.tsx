import styled from 'styled-components';

type Props = {
  borderColor: string;
};

const BorderBox = styled.div<Props>`
  display: flex;
  margin: 20px;
  border-radius: 20px;
  border: 1px solid ${(props) => props.borderColor};
  flex-direction: column;
  padding: 16px;
`;

export default BorderBox;
