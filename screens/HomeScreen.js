import React, { Component } from 'react';
import { FlatList, Button, View, Text, Image, ImageBackground, ActivityIndicator, TouchableOpacity } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { Container, Header, Content, Card, CardItem, Thumbnail, Icon, Left, Body } from 'native-base';
import styles from '../Styles'
import networking from '../utils/networking'
import Web from './Webview'



class HomeScreen extends React.Component {

  static navigationOptions = ({navigation, navigationOptions}) => ({
	 title: 'Top Stories',
    headerRight: (
      <Icon style={styles.icon}
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

// FlatList Row  ====================================================
   renderItem = ({ item }) => {
    return(
      <TouchableOpacity
        style = {{flex: 1}}
        activeOpacity = { 0.4 }
        onPress={() => {this.props.navigation.navigate('Details', { url: item.url })}}>
      <Card
        style={{flex: 1}}>
        <CardItem>
          <Body>
            <ImageBackground
              source={{uri: item.urlToImage}}
              backgroundColor='whitesmoke'
              resizeMode='cover'
              imageStyle={{ borderRadius: 5 }}
              style={styles.container}>
               <View style={{height: 250, borderRadius: 10}}/>
            </ImageBackground>
            <Text style={styles.subtitle}>{item.source}</Text>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.subtitle}>{item.publishedAt}</Text>
          </Body>
        </CardItem>
      </Card>
      </TouchableOpacity>
    )
  }


  render() {
    // ActivityIndicator  ====================================================
    if(this.state.loading){
       return(
         <View style={{flex: 1, justifyContent: "center"}}>
           <ActivityIndicator size="large" color="#000"/>
         </View>
       )
     }
     // FlatList  ====================================================
    return (
      <Container>
        <Content>
        <FlatList
          data={this.state.newsList}
          renderItem={this.renderItem}
         />
        </Content>
      </Container>
    );
  }
}

export default HomeScreen;
