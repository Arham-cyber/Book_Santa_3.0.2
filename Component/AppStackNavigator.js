import React, { Component } from 'react';
import  { createStackNavigator } from 'react-navigation-stack';
import donateScreen from '../Screens/donateScreen'
import receiverDetails from '../Screens/receiverDetailsScreen'


export const AppStackNavigator = createStackNavigator({
    donateScreenList:{screen:donateScreen},
    receiverDetails:{screen:receiverDetails},
    
},
{initialRouteName:'donateScreenList'}
)

