import styled from 'styled-components/native';
import { CheckBox, Button } from 'react-native-elements';

export const Container = styled.KeyboardAvoidingView`
  flex: 1;
  padding: 30px;
  background-color: #e2e8eb;
`;

export const Form = styled.View`
  flex-direction: column;
  align-content: space-between;
  margin: 50px 0;
  justify-content: center;
  align-items: center;
`;

export const InputText = styled.TextInput.attrs({
  placeholderTextColor: '#919594',
  autoCorrect: false,
  autoCapitalize: 'none',
  autoCompleteType: 'username',
  placeholder: 'Matrícula',
  returnKeyType: 'next',
})`
  font-size: 15px;
  height: 50px;
  width: 100%;
  background: #fff;
  border-radius: 10px;
  padding: 0 25px;
  border: 1px solid #e2e8eb;
  margin-bottom: 45px;
`;

export const InputPasssword = styled.TextInput.attrs({
  placeholderTextColor: '#919594',
  autoCorrect: false,
  autoCapitalize: 'none',
  autoCompleteType: 'password',
  placeholder: 'Senha',
  secureTextEntry: true,
  returnKeyType: 'default',
})`
  font-size: 15px;
  height: 50px;
  width: 100%;
  background: #fff;
  border-radius: 10px;
  padding: 0 25px;
  border: 1px solid #e2e8eb;
  margin-bottom: 45px;
`;

export const ForgotPassword = styled.Text`
  color: #525c65;
  font-size: 16px;
  font-weight: bold;
  margin-top: 50px;
  align-self: center;
`;

export const SubmitButton = styled(Button).attrs({
  title: 'Entrar',
  type: 'solid',
  buttonStyle: {
    backgroundColor: '#3e444f',
    borderRadius: 8,
  },
  titleStyle: {
    color: '#fafafa',
  },
})`
  width: 100%;
  border-radius: 25px;
  margin-top: 50px;
`;

export const CheckBoxLogin = styled(CheckBox).attrs({
  checkedIcon: 'check-circle',
  uncheckedIcon: 'circle-o',
  checkedColor: '#298bd9',
  containerStyle: {
    backgroundColor: '#e2e8eb',
    borderWidth: 0,
  },
})``;
