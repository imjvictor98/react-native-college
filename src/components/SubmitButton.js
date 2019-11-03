import styled from 'styled-components';
import { Button } from 'react-native-elements';

const SubmitButton = styled(Button).attrs({
  type: 'solid',
  buttonStyle: {
    backgroundColor: '#3f444d',
    borderRadius: 8,
  },
  titleStyle: {
    color: '#fafafa',
  },
})`
  width: 100%;
  border-radius: 25px;
  margin-bottom: 15;
`;

export default SubmitButton;
