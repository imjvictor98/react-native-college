import styled from 'styled-components/native';
import { Header } from 'native-base';
import { Button } from 'react-native-elements';

export const ProfileHeader = styled(Header).attrs({
  androidStatusBarColor: '#e6ebef',
})`
  background-color: #e6ebef;
`;

export const ProfileContainer = styled.View`
  display: flex;
`;
export const ProfilePhotoContainer = styled.View`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #e6ebef;
`;

export const ProfilePic = styled.Image`
  width: 120;
  height: 120;
  border-radius: 80;
  margin-top: 15;
`;

export const TextDataContainer = styled.View`
  margin-top: 30;
  display: flex;
`;
export const TextDataContent = styled.View`
  flex-direction: column;
  justify-content: flex-start;
  margin-left: 10;
  margin-right: 10;
`;

export const LabelProfile = styled.Text`
  color: #3f444d;
  font-size: 15px;
`;

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
  width: 100%;
  border-radius: 25px;
  margin-bottom: 15;
`;
