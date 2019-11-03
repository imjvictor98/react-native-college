import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { Icon } from 'react-native-vector-icons/Ionicons';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Settings from './pages/Settings';
import Semestre from './pages/Semestre';
import Disciplinas from './pages/Disciplinas';
import { presetSignConfig } from './navigationConfig/SignConfig';
import { presetAppConfig } from './navigationConfig/AppConfig';
import { CustomDrawerComponent } from './pages/Drawer/index';

const Sign = createMaterialTopTabNavigator(
  {
    Login,
    Signup,
  },
  presetSignConfig
);
const App = createDrawerNavigator(
  {
    Dashboard,
    Settings,
  },
  {
    contentComponent: CustomDrawerComponent,
    drawerBackgroundColor: 'white',
    drawerType: 'slide',
    keyboardDismissMode: 'none',
    overlayColor: 'white',
    minSwipeDistance: 0.5,
    swipeVelocityThreshold: 0.5,
    drawerWidth: 300,
    initialRouteName: 'Dashboard',
  }
);

const SemestreNavigator = createSwitchNavigator(
  {
    Semestre,
  },
  {
    headerBackTitleVisible: true,
    defaultNavigationOptions: {
      title: 'Semestre',
      disableKeyboardHandling: false,
    },
    headerLayoutPreset: 'center',
    initialRouteName: 'Semestre',
  }
);

const DisciplinaNavigator = createSwitchNavigator(
  {
    Disciplinas,
  },
  {
    headerBackTitleVisible: true,
    defaultNavigationOptions: {
      title: 'Disciplinas',
      disableKeyboardHandling: false,
    },
    headerLayoutPreset: 'center',
    initialRouteName: 'Disciplinas',
    backBehavior: 'history',
  }
);

const ProfileNavigator = createSwitchNavigator(
  {
    Settings,
  },
  {
    defaultNavigationOptions: {
      title: 'Perfil',
    },
  }
);

const Routes = createAppContainer(
  createSwitchNavigator(
    {
      Sign,
      App,
      SemestreNavigator,
      DisciplinaNavigator,
      ProfileNavigator,
    },
    {
      initialRouteName: 'Sign',
    }
  )
);

export default Routes;
