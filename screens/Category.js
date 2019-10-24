import React, { Component } from 'react';
import { FlatList, Button, View, Text, Image, ImageBackground, ActivityIndicator, TouchableOpacity } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { Container, Header, Content, Card, CardItem, Thumbnail, Icon, Left, Body } from 'native-base';
import styles from '../Styles'
import networking from '../utils/networking'
import Web from './Webview'
import { placeholder } from '@babel/types';



class Category extends React.Component {

  static navigationOptions = ({navigation, navigationOptions}) => ({
	 title: 'Category',
  });

  state = {
      newsList: [
      {
        id: 'business',
        title: 'Business',
        image: require('../images/business.jpg'),
        icon: 'logo-usd'
      },
      {
        id: 'entertainment',
        title: 'Entertainment',
        image: require('../images/entertainment.jpg'),
        icon: 'ios-film'
      },
      {
        id: 'general',
        title: 'General',
        image: require('../images/general.jpg'),
        icon: 'ios-globe'
      },
      {
        id: 'health',
        title: 'Health',
        image: require('../images/health.jpg'),
        icon: 'ios-medkit'
      },
      {
        id: 'science',
        title: 'Science',
        image: require('../images/science.jpg'),
        icon: 'md-flask'
      },
      {
        id: 'sports',
        title: 'Sports',
        image: require('../images/sports.jpg'),
        icon: 'md-football'
      },
      {
        id: 'technology',
        title: 'Technology',
        image: require('../images/technology.jpg'),
        icon: 'ios-phone-portrait'
      },
    ]
  }

  
// FlatList Row  ====================================================
   renderItem = ({ item }) => { 
    return(
      <TouchableOpacity
        style = {{flex: 1}}
        activeOpacity = { 0.4 }
        onPress={() => {this.props.navigation.navigate('SelectedCategory', { id: item.id, name: item.title, icon: item.icon })}}>
      <Card transparent
        style={{flex: 1}}>
        <CardItem>
          <Body>
            <ImageBackground
              source={item.image}
              backgroundColor='whitesmoke'
              resizeMode='cover'
              imageStyle={{ borderRadius: 5 }}
              style={styles.container}>
               <View style={{height: 140, borderRadius: 10}}/>
            </ImageBackground>
            <Text style={styles.titleSmall}>{item.title}</Text>
          </Body>
        </CardItem>
      </Card>
      </TouchableOpacity>
    )
  }


  render() {
     // FlatList  ====================================================
    return (
      <Container>
        <Content>
        <FlatList
          data={this.state.newsList}
          renderItem={this.renderItem}
          numColumns={2}
         />
        </Content>
      </Container>
    );
  }
}

export default Category;
