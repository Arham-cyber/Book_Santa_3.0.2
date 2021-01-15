import React, { Component } from 'react';
import { View ,TouchableOpacity,Text} from 'react-native';
import {DrawerItems} from 'react-navigation-drawer';
import firebase from 'firebase';



export default class SideDrawer extends Component {
    render(){
        return(
            <View style={{flex:1}}>
                <View>
                <DrawerItems 
                {...this.props}
                />
                </View>
                <View>
                    <TouchableOpacity style  = {{backgroundcolor:'#B3330C'}} onPress = {()=>{
                        this.props.navigation.navigate('WelcomeScreen')
                        firebase.auth().signOut()}}>
                        <Text style={{marginLeft:20, paddingBottom:50}}>Log Out</Text>
                    </TouchableOpacity>
                </View>
            </View>
            
        )
    }
}