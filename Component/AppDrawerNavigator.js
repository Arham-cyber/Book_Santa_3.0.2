import React from 'react';
import {createDrawerNavigator} from 'react-navigation-drawer';
import WelcomeScreen from '../Screens/WelcomeScreen';
import {AppTabNavigator} from './AppTabNavigator';
import SideDrawer from './SideDrawer'
import ProfileSettings from '../Screens/ProfileSettings'
import myDonations from '../Screens/myDonations'
import notificationScreen from '../Screens/notificationScreen'


export const AppDrawerNavigator = createDrawerNavigator({
    Home :{screen : AppTabNavigator},
    Profile :{screen : ProfileSettings},
    myDonations:{screen: myDonations},
    Notification:{screen: notificationScreen}

},
{
    contentComponent : SideDrawer
},
{
        initialRouteName : "Home"
}
)