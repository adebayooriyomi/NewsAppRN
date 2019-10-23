import React, { Component } from 'react';
import { Button, View, Text } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { WebView } from 'react-native-webview';


class Web extends React.Component {

    render() {
      const { navigation } = this.props;
      return (
          <WebView
            source={{uri: navigation.getParam('url')}}
            scalesPageToFit={true}
            style={{flex: 1, marginTop: 0}}
          />
      );
    }
  }

export default Web;
