import React, { Component } from 'react';
import { Container, Content, Header, Item, Input, Icon, Button, Card, Right, CardItem, Body } from 'native-base';
import { StyleSheet, FlatList, View, Image, Text, ImageBackground, ActivityIndicator, TouchableOpacity } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import styles from '../Styles'
import networking from '../utils/networking'
import SafeAreaView from 'react-native-safe-area-view';


class Sources extends React.Component {

  static navigationOptions = ({navigation}) => ({
	 title: 'Publishers',
  });


  state = {
      sourcesList: [],
      searchList: [],
      loading: true
  }

   componentDidMount(){
    this.getSources()
  }

  async getSources(){
    const list = await networking.fetchSources()
    this.setState({
        sourcesList: list,
        loading: false
    })
  }

  reload = () => {
    console.log("Reloading")
    this.setState({
        loading: true
    })
    this.getSources()
  }


  filterList = async (searchTerm) => {
        const data = this.state.sourcesList
        const updatedList = data.filter((item) => {
            const searchName = item.name.toLowerCase()
            return searchName.indexOf(searchTerm.toLowerCase()) > -1
        })
    this.setState({ searchList: updatedList })
  }

  // FlatList Row  ====================================================
     renderItem = ({ item }) => {
      return(
        <TouchableOpacity
          style = {{flex: 1}}
          activeOpacity = { 0.4 }
          onPress={() => {this.props.navigation.navigate('Details', { id: item.id, name: item.name, category: item.category })}}>
        <Card transparent
          style={{flex: 1}}>
          <CardItem bordered>
            <Body>
              <Text style={styles.titleSmall}>{item.name}</Text>
            </Body>
            <Right>
              <Icon name="md-star-half" />
            </Right>
          </CardItem>
        </Card>
        </TouchableOpacity>
      )
    }

  render() {
    const listToDisplay =
    this.state.searchList.length > 0
    ? this.state.searchList
    : this.state.sourcesList;

    // ActivityIndicator  ====================================================
    if(this.state.loading){
       return(
           <ActivityIndicator style={styles.activityInd} size="large" color="#000"/>
       )
     }

    return (
      <SafeAreaView>
          <View searchBar rounded style={styles.searchView}>
            <Item style={{borderColor:'whitesmoke'}}>
              <Icon name="ios-search" />
              <Input placeholder="Search" onChangeText={this.filterList} />
            </Item>
          </View>
          <FlatList
            data={listToDisplay}
            renderItem={this.renderItem}
            style={{padding:10}}
           />
       </SafeAreaView>
    );
  }
}

export default Sources;
