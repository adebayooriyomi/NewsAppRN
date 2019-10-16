import React, { Component } from 'react';
import { Button, View, Text, Image, ImageBackground, ActivityIndicator } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { Container, Header, Content, Card, CardItem, Thumbnail, List, ListItem, Icon, Left, Body } from 'native-base';
import Moment from 'moment';
import networking from '../networking'



class HomeScreen extends React.Component {

  static navigationOptions = ({navigation}) => ({
	 title: 'TOP HEADLINES',
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
        <List dataArray={this.state.newsList}
          renderRow={(item) =>
          <ListItem noBorder>
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
          </ListItem>
            }>
         </List>
        </Content>
      </Container>
    );
  }
}


export default HomeScreen;
