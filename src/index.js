/* eslint-disable no-console */
import React from 'react';
import { StatusBar } from 'react-native';
import FlashMessage from 'react-native-flash-message';

import './config/ReactotronConfig';

import Routes from './routes';

console.disableYellowBox = true;

export default function App() {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#646566" />
      <Routes />
      <FlashMessage position="top" />
    </>
  );
}
