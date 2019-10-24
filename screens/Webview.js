import React, { Component } from 'react';
import { Button, View, Text, ActivityIndicator } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import styles from '../Styles';
import { WebView } from 'react-native-webview';


class Web extends React.Component {

      activityIndicatorLoad() {
        return (
            <ActivityIndicator style={styles.activityInd} size="large" color="#000"/>
        );
      }
  
    render() {
      const { navigation } = this.props;
      return (
          <WebView
            source={{uri: navigation.getParam('url')}}
            scalesPageToFit={true}
            style={{flex: 1, marginTop: 0}}
            renderLoading={this.activityIndicatorLoad} 
            startInLoadingState={true}  
          />
      );
    }
  }

export default Web;
