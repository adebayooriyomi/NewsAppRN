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
import Category from './screens/Category';
import SelectedCategory from './screens/SelectedCategory';


console.disableYellowBox = true;

const HomeStack = createStackNavigator({
  Home: HomeScreen,
  Details: Web,
},
{
defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#fff',
      },
      headerTintColor: '#ed4b5f',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }
  }
);

const SourcesStack = createStackNavigator({
  Sources: Sources,
  Details: SourceView,
  WebView: Web,
},
{
defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#fff',
      },
      headerTintColor: '#ed4b5f',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }
  }
);

const CategoryStack = createStackNavigator({
  Category: Category,
  SelectedCategory: SelectedCategory,
  SourceView: SourceView,
  WebView: Web,
},
{
defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#fff',
      },
      headerTintColor: '#ed4b5f',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }
  }
);


export default createAppContainer(createBottomTabNavigator(
  {
    Home: { screen: HomeStack,
      navigationOptions: {
        tabBarLabel: 'Top Stories',
        tabBarIcon: ({ tintColor, focused }) => (
          <Icon name={focused ? 'md-globe' : 'md-globe'} size={18} style={{color:tintColor}} />
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
    Category: { screen: CategoryStack,
      navigationOptions: {
        tabBarLabel: 'Category',
        tabBarIcon: ({ tintColor, focused }) => (
          <Icon name={focused ? 'ios-keypad' : 'ios-keypad'} size={18} style={{color:tintColor}} />
        ),
      },
    },
  },
  {
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    tabBarOptions: {
      activeTintColor: '#ed4b5f',
      inactiveTintColor: 'gray',
    },
    animationEnabled: false,
    swipeEnabled: false,
  }
));
