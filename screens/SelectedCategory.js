import React, { Component } from 'react';
import { Container, Content, Header, Item, Input, Icon, Button, Card, Left, CardItem, Body } from 'native-base';
import { StyleSheet, FlatList, View, Image, Text, ImageBackground, ActivityIndicator, TouchableOpacity } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import styles from '../Styles'
import networking from '../utils/networking'



class SelectedCategory extends React.Component {

    static navigationOptions = ({navigation}) => ({
        title: navigation.getParam('name'),
     });
   
     state = {
         catList: [],
         searchList: [],
         loading: true
     }
   
    componentDidMount(){
        const { navigation } = this.props;
        const category = navigation.getParam('id')
        this.getSources(category)
     }
   
     async getSources(category){
       const list = await networking.fetchSources(category)
       this.setState({
           catList: list,
           loading: false
       })
     }
   
     filterList = async (searchTerm) => {
           const data = this.state.catList
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
             style = {styles.whitesmokeBg}
             activeOpacity = { 0.4 }
             onPress={() => {this.props.navigation.navigate('SourceView', { id: item.id, name: item.name, category: item.category })}}>
           <Card transparent
             style={{flex: 1}}>
             <CardItem style={{backgroundColor: 'transparent'}}>
               <Body>
               <Icon style={{fontSize:18, color:'gray'}} name={this.props.navigation.getParam('icon')} />
                 <Text style={styles.titleSmall}>{item.name}</Text>
                 <Text numberOfLines = {4} style={styles.subtitle}>{item.description}</Text>
               </Body>
             </CardItem>
           </Card>
           </TouchableOpacity>
         )
       }
   
     render() {
       const listToDisplay =
       this.state.searchList.length > 0
       ? this.state.searchList
       : this.state.catList;
   
       // ActivityIndicator  ====================================================
       if(this.state.loading){
          return(
              <ActivityIndicator style={styles.activityInd} size="large" color="#000"/>
          )
        }
   
       return (
         <Container>
           <Content searchBar rounded>
             <View searchBar rounded style={styles.searchView}>
               <Item style={{borderColor:'whitesmoke'}}>
                 <Icon name="ios-search" />
                 <Input placeholder="Search" onChangeText={this.filterList} />
               </Item>
             </View>
             <FlatList
               data={listToDisplay}
               renderItem={this.renderItem}
               style={{padding:5}}
               numColumns={2}
              />
           </Content>
         </Container>
       );
     }
   }

export default SelectedCategory;
