import React from 'react';
import { Button, View, Text, Icons } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer, TabBarBottom } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Icon } from 'native-base';
import HomeScreen from './screens/HomeScreen';
import Web from './screens/Webview';
import Sources from './screens/Sources';
import SourceView from './screens/SourceView';


console.disableYellowBox = true;

const HomeStack = createStackNavigator({
  Home: HomeScreen,
  Details: Web,
});

const SourcesStack = createStackNavigator({
  Sources: Sources,
  Details: SourceView,
  WebView: Web,
});


export default createAppContainer(createBottomTabNavigator(
  {
    Home: { screen: HomeStack,
      navigationOptions: {
        tabBarLabel: 'Top Stories',
        tabBarIcon: ({ tintColor, focused }) => (
          <Icon name={focused ? 'star' : 'ios-star-outline'} size={18} style={{color:tintColor}} />
        ),
      },
    },
    Sources: { screen: SourcesStack,
      navigationOptions: {
        tabBarLabel: 'Publishers',
        tabBarIcon: ({ tintColor, focused }) => (
          <Icon name={focused ? 'md-paper' : 'md-paper'} size={18} style={{color:tintColor}} />
        ),
      },
    },
  },
  {
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    tabBarOptions: {
      activeTintColor: 'black',
      inactiveTintColor: 'gray',
    },
    animationEnabled: false,
    swipeEnabled: false,
  }
));
