import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import WelcomeScreen from './Screens/WelcomeScreen.js'
import {AppDrawerNavigator} from './Component/AppDrawerNavigator'

export default class App extends React.Component {
  render(){
    
  return (

   <AppContainer/> 
  );
}
}



const switchNavigator = createSwitchNavigator({
  WelcomeScreen: {screen: WelcomeScreen},
  bottomTab: {screen: AppDrawerNavigator},
})
const AppContainer = createAppContainer(switchNavigator);