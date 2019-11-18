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
import Notas from './pages/Notas';
import ForgotPwd from './pages/ForgotPwd';
import Welcome from './pages/Welcome';
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
    Welcome,
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

const NotasNavigator = createSwitchNavigator(
  {
    Notas,
  },
  {
    headerBackTitleVisible: true,
    defaultNavigationOptions: {
      title: 'Lançar notas',
      disableKeyboardHandling: false,
    },
    headerLayoutPreset: 'center',
    initialRouteName: 'Notas',
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

const ForgotPwdNavigator = createSwitchNavigator(
  {
    ForgotPwd,
  },
  {
    headerBackTitleVisible: true,
    defaultNavigationOptions: {
      title: 'Recuperar senha',
      disableKeyboardHandling: false,
    },
    headerLayoutPreset: 'center',
    initialRouteName: 'ForgotPwd',
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
      NotasNavigator,
      ForgotPwdNavigator,
    },
    {
      initialRouteName: 'Sign',
    }
  )
);

export default Routes;
