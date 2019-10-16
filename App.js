import React from 'react';
import { Button, View, Text } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from './screens/HomeScreen';
import Web from './screens/Webview';




const RootStack = createStackNavigator({
  Home: HomeScreen,
  Details: Web,
});

export default createAppContainer(RootStack);
