import React, { Component } from 'react';
import {Text,View, StyleSheet, Animated,Dimensions,TouchableHighlight} from 'react-native'
import {ListItem, Icon} from 'react-native-elements'
import {SwipeListView} from 'react-native-swipe-list-view'
import db from '../config'

export default class SwipeableFlatlist extends Component{
    constructor(props){
        super(props)
        this.state = {
            allnotifications : this.props.all_notifications
        }
    }

    renderItem = data => (
            <ListItem 
            leftElement={<Icon name="book" type="font-awesome" color ='#696969'/>}
            title = {data.item.book_name}
            titleStyle={{ color: 'black', fontWeight: 'bold' }}
            subtitle = {data.item.message}
            bottomDivider
            />       
    )

    renderHiddenItem = () => {
        <View style = {{flex:1, flexDirection:'row', paddingLeft:15, alignItems:'center', justifyContent:'center', backgroundColor:'#2077de'}}>
            <View style ={[{justifyContent:'center', alignItems:'center', position:'absolute', width:100, top:0, bottom:0}, {backgroundColor:'#2077de',right:0}]}>
                <Text style = {{color:'#ffffff',fontWeight:'bold'}}></Text>
            </View>
        </View>     
    }


    changeNotificationStatus = notification => {
         
        db.collection('notifications').doc(notification.doc_id).update({'notificationStatus': "Read"})

    }

    onSwipeValueChange = swipeData => {
        var allnotifications = this.state.allnotifications
        const {key,value} = swipeData

        if(value < -Dimensions.get('window').width){
            const newData = [...allnotifications]
            const previousIndex = allnotifications.findIndex(item => item.key === key)
            this.changeNotificationStatus(allnotifications[previousIndex])
            newData.splice(previousIndex,1)
            this.setState({allnotifications : newData})
        }

    }



    render(){
        return(
            <View style ={{flex:1, backgroundColor :'#ffffff'}}>
                   <SwipeListView 

                    disableRightSwipe
                    data = {this.state.allnotifications}
                    renderItem = {this.renderItem}
                    renderHiddenItem = {this.renderHiddenItem}
                    rightOpenValue = {-Dimensions.get('window').width}
                    
                    previewRowKey  = {'0'}
                    previewOpenValue = {-40}
                    previewOpenDelay = {3000}
                    onSwipeValueChange = {this.onSwipeValueChange}
                   /> 


            </View>
        )
        }
}