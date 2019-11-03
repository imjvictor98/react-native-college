import styled from 'styled-components/native';
import { CheckBox, Button } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';

export const Container = styled.KeyboardAvoidingView.attrs({
  enabled: true,
})`
  flex: 1;
  padding: 30px;
  background-color: #e2e8eb;
`;

export const Form = styled.View`
  flex-direction: column;
  align-content: space-between;
  margin: 50px 0;
  justify-content: center;
`;

export const InputText = styled.TextInput.attrs({
  placeholderTextColor: '#646566',
  autoCorrect: false,
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

export const InputPassword = styled.TextInput.attrs({
  placeholderTextColor: '#646566',
  placeholder: 'Senha',
  autoCorrect: false,
  autoCapitalize: 'none',
  autoCompleteType: 'password',
  secureTextEntry: true,
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

export const SubmitButton = styled(Button).attrs({
  title: 'Registrar',
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

export const Scrollable = styled(ScrollView).attrs({
  showsVerticalScrollIndicator: false,
  alwaysBounceVertical: true,
  automaticallyAdjustContentInsets: true,
  bounces: true,
})`
  height: 100%;
  width: 100%;
  flex-grow: 1;
`;

export const CheckBoxSignUp = styled(CheckBox).attrs({
  checkedIcon: 'check-circle',
  uncheckedIcon: 'circle-o',
  containerStyle: {
    backgroundColor: '#e2e8eb',
    borderWidth: 0,
  },
})``;
