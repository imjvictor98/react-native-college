import styled from 'styled-components/native';
import { Button } from 'react-native-elements';

export const SubmitButton = styled(Button).attrs({
  type: 'solid',
  buttonStyle: {
    backgroundColor: '#3f444d',
    borderRadius: 8,
  },
  titleStyle: {
    color: '#fafafa',
  },
})`
  border-radius: 25px;
  margin-bottom: 13;
  margin-left: 15;
  margin-right: 15;
  margin-top: 30;
`;

export const InputText = styled.TextInput.attrs({
  keyboardType: 'numeric',
  returnKeyType: 'done',
})`
  width: 35;
  border-color: gray;
  border-width: 1;
  padding-left: 10;
`;

export const TextLabel = styled.Text.attrs({
  numberOfLines: 1,
})`
  font-size: 16;
  color: #333;
`;

export const Container = styled.View`
  background-color: #e6ebef;
  height: 100%;
`;

export const DataContainer = styled.View`
  display: flex;
`;

export const DataContent = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
`;

export const ButtonContent = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const DataText = styled.Text`
  margin-left: 15;
  margin-top: 12;
  color: #3e444d;
  font-weight: bold;
  font-size: 18;
`;
