import styled from 'styled-components/native';
import { Header, Icon } from 'native-base';

export const Container = styled.View`
  background-color: #3b434e;
  width: 100%;
  height: 100%;
`;

export const DashboardHeader = styled(Header).attrs({
  iosBarStyle: 'dark-content',
  transparent: true,
  androidStatusBarColor: '#3b434e',
})`
  background-color: #3b434e;
`;

export const Painel = styled.View`
  display: flex;
  background-color: #e6ebef;
  border: 2px solid #e6ebef;
  border-radius: 30px;
  padding: 20px;
  height: 100%;
  margin-top: 40%;
`;

export const OptionContainer = styled.View`
  display: flex;
  background-color: #fafafa;
  border: 1px solid #fafafa;
  border-radius: 8px;
  margin-top: 25%;
`;

export const OptionContent = styled.View`
  flex-direction: row;
  justify-content: space-around;
  align-items: baseline;
`;

export const BlockContent = styled.View`
  flex-direction: column;
  justify-content: space-between;
  margin-right: 15;
`;

export const LeftIcon = styled(Icon).attrs({
  name: 'md-menu',
})`
  color: #f4f2f7;
`;
export const RightIcon = styled(Icon).attrs({
  name: 'md-exit',
})`
  color: #f4f2f7;
`;
export const ProfilePhoto = styled.Image`
  width: 120;
  height: 120;
  border-radius: 80;
  margin-right: 20;
`;

export const PersonalContainer = styled.View`
  display: flex;
`;

export const PersonalContent = styled.View`
  flex-direction: column;
  margin-top: 10px;
`;

export const TextName = styled.Text`
  font-size: 30;
  color: #3f444d;
  font-weight: bold;
  margin-top: 20;
  flex-shrink: 1;
`;

export const TextBold = styled.Text`
  font-size: 20;
  font-weight: bold;
  color: #3f4459;
`;

export const TextMatricula = styled.Text`
  font-size: 20;
  color: #3f444d;
  align-content: center;
`;

export const TextTelefone = styled.Text`
  font-size: 20;
  color: #3f444d;
  justify-content: center;
  align-content: flex-end;
`;

export const BoxCodigo = styled.View`
  flex-direction: row;
  margin-top: 30;
`;

export const BoxTelefone = styled.View`
  flex-direction: row;
  margin-top: 5;
`;
