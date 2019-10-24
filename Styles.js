import React, { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    width: '100%'
  },
  icon:{
    fontSize: 25,
    marginRight: 15,
    color: '#ed4b5f'
  },

  title:{
    fontSize: 18,
    fontWeight: 'bold'
  },

  titleSmall:{
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
  },

  subtitle:{
    marginBottom: 10,
    marginTop: 10,
    color: 'gray'
  },

  searchView:{
    backgroundColor: '#eff0f1',
    margin: 10,
    paddingRight: 10,
    paddingLeft:10,
    borderRadius: 10,
    borderColor: '#eff0f1',
    borderWidth: 2
  },
  whitesmokeBg: {
    flex: 1, 
    margin:5, 
    backgroundColor: 'whitesmoke', 
    borderRadius:10
  },

  activityBg: {
    flex: 1, 
    justifyContent: "center"
  },

  activityInd: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
});
