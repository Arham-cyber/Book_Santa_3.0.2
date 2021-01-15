import React, { Component } from 'react';
import {createBottomTabNavigator} from 'react-navigation-tabs'
import {AppStackNavigator} from './AppStackNavigator';
import requestScreen from '../Screens/requestScreen'

export const AppTabNavigator = createBottomTabNavigator({
  bookDonate: {screen: AppStackNavigator},
    requestScreen  : {screen: requestScreen},
  
  }
  )