import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FlatList, Button, View, Text, Image, ImageBackground, ActivityIndicator, TouchableOpacity } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { Container, Header, Content, Card, CardItem, Thumbnail, Icon, Left, Body } from 'native-base';
import Moment from 'moment';
import networking from '../networking'
import Web from './Webview'



class HomeScreen extends React.Component {

  static navigationOptions = ({navigation}) => ({
	 title: 'NEWS HEADLINES',
   headerStyle: {
      backgroundColor: '#fff',
    },
    headerTintColor: '#000',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
    headerRight: (
      <Icon style={{fontSize: 25, marginRight: 15}}
        onPress={navigation.getParam('reload')}
        name="refresh"
      />

    ),
 });

  state = {
      newsList: [],
      loading: true
  }

   componentDidMount(){
    this.fetchNews()
    this.props.navigation.setParams({ reload: this.reload});
  }

  async fetchNews(){
    const list = await networking.fetchHeadlines()
    console.log(list)
    this.setState({
        newsList: list,
        loading: false
    })
  }

  reload = () => {
    console.log("Reloading")
    this.setState({
        loading: true
    })
    this.fetchNews()
  }

  formatDate (date) {
    Moment.locale('en')
    const dat = date;
    const formattedDate = Moment(dat).startOf('hour').fromNow();
		return formattedDate
	}

  render() {
    if(this.state.loading){
       return(
         <View style={{flex: 1, justifyContent: "center"}}>
           <ActivityIndicator size="large" color="#000"/>
         </View>
       )
     }
    return (
      <Container>
        <Content>
        <FlatList data={this.state.newsList}
          renderItem={({item}) =>
          <TouchableOpacity style = {{flex: 1}} activeOpacity = { 0.4 } onPress={() => {this.props.navigation.navigate('Details', { url: item.url })}}>
          <Card style={{flex: 1}}>
            <CardItem>
              <Body>
                <ImageBackground source={{uri: item.urlToImage}} resizeMode='cover' imageStyle={{ borderRadius: 5 }} style={{width: '100%', flex: 1}}>
                   <View style={{height: 250, borderRadius: 10}}/>
                </ImageBackground>
                <Text style={{marginBottom: 10, marginTop: 10}}>{item.source}</Text>
                <Text style={{fontSize: 18, fontWeight: 'bold'}}>{item.title}</Text>
                <Text style={{marginBottom: 10, marginTop: 10, color: 'gray'}}>{this.formatDate(item.publishedAt)}</Text>
              </Body>
            </CardItem>
          </Card>
          </TouchableOpacity>
            }>
         </FlatList>
        </Content>
      </Container>
    );
  }
}


export default HomeScreen;
