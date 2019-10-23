import React, { Component } from 'react';
import { StyleSheet, FlatList, Button, View, Text, Image, ImageBackground, ActivityIndicator, TouchableOpacity } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { Container, Header, Content, Card, CardItem, Thumbnail, Icon, Left, Body } from 'native-base';
import styles from '../Styles'
import networking from '../utils/networking'
import Web from './Webview'



class SourceView extends React.Component {

  static navigationOptions = ({navigation}) => ({
	 title: navigation.getParam('title'),
    headerRight: (
      <Icon style={styles.icon}
        onPress={navigation.getParam('reload')}
        name="refresh"
      />

    ),
 });

  state = {
      newsList: [],
      loading: true,
      newsId: ""
  }

   componentDidMount(){
    const { navigation } = this.props;
    const newsId = navigation.getParam('id')
    const newsName = navigation.getParam('name')
    this.setState({
        newsId: newsId,
    })
    this.fetchNews(newsId)
    navigation.setParams({ reload: this.reload, title: newsName})
  }

  async fetchNews(newsId){
    const list = await networking.fetchHeadlines(newsId)
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
    this.fetchNews(this.state.newsId)
  }

// FlatList Row  ====================================================
   renderItem = ({ item }) => {
    return(
      <TouchableOpacity
        style = {{flex: 1}}
        activeOpacity = { 0.4 }
        onPress={() => {this.props.navigation.navigate('WebView', { url: item.url })}}>
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
               <View style={{height: 150, borderRadius: 10}}/>
            </ImageBackground>
            <Text numberOfLines = {4} style={styles.titleSmall}>{item.title}</Text>
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
          numColumns={2}
         />
        </Content>
      </Container>
    );
  }
}

export default SourceView;
