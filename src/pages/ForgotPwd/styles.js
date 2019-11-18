import styled from 'styled-components/native';
import { Button } from 'react-native-elements';

export const InputText = styled.TextInput.attrs({
  placeholderTextColor: '#919594',
  autoCorrect: false,
})`
  font-size: 15px;
  background: #fff;
  border-radius: 10px;
  border: 1px solid #e2e8eb;
  padding: 10px 25px;
  padding-top: 15px;
  margin-left: 10px;
  margin-right: 15px;
  margin-top: 30px;
`;

export const InputPasssword = styled.TextInput.attrs({
  placeholderTextColor: '#919594',
  autoCorrect: false,
  autoCapitalize: 'none',
  autoCompleteType: 'password',
  secureTextEntry: true,
  returnKeyType: 'default',
})`
  font-size: 15px;
  background: #fff;
  border-radius: 10px;
  padding: 10px 25px;
  padding-top: 15px;
  border: 1px solid #e2e8eb;
  margin-left: 10px;
  margin-right: 15px;
  margin-top: 30px;
`;

export const SubmitButton = styled(Button).attrs({
  title: 'Recuperar',
  type: 'solid',
  buttonStyle: {
    backgroundColor: '#3e444f',
    borderRadius: 8,
  },
  titleStyle: {
    color: '#fafafa',
  },
})`
  border-radius: 25px;
  margin-left: 10px;
  margin-right: 15px;
  margin-top: 50px;
`;
