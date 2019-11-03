import styled from 'styled-components/native';
import { DrawerItems } from 'react-navigation-drawer';
import { Image } from 'react-native-elements';

export const Sidebar = styled.View`
  height: 150px;
  align-items: flex-start;
  justify-content: center;
  padding-left: 5px;
`;

export const ProfilePhoto = styled(Image)`
  height: 80;
  width: 80;
  border-radius: 80;
`;

export const SidebarList = styled(DrawerItems).attrs({
  activeTintColor: '#fafafa',
  inactiveTintColor: '#fafafa',
  activeBackgroundColor: '#3b434e',
  inactiveBackgroundColor: '#3b434e',
})``;
