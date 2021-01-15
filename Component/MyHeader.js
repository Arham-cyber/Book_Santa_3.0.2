import React, { Component } from 'react';
import {View} from 'react-native'
import {Header,Icon, Badge} from 'react-native-elements'
import firebase from 'firebase';
import db from '../config'
import notificationScreen from '../Screens/notificationScreen';


export default class MyHeader extends Component{
    constructor(props){
        super(props)
        this.state ={ 
            value : ''
        }
    }

    getNumberOfNotifications = () => {
        db.collection('notifications').where('notificationStatus','==','Unread')
        .where('reciever_id','==',firebase.auth().currentUser.email).onSnapshot((Snapshot)=>{
            var unreadNotifications = Snapshot.docs.map((doc)=>doc.data)
            this.setState ({
                value : unreadNotifications.length,
            })

            
        })
    }
    componentDidMount(){
        this.getNumberOfNotifications();
    }

    BellIcon =()=>{
        return (
            <View>
                 < Badge value = {this.state.value} 
            style = {{position : 'relative', top : -4, right : -4}}/>
                <Icon name = 'bell' type = 'font-awesome' size = {25} color = '#fff'
            onPress = {()=>this.props.navigation.navigate("Notification")}/>
           
            </View>
        )

    }
    render(){
    return(
        <Header 
        leftComponent ={<Icon name ='bars' type='font-awesome' color ='#fff' onPress={()=>this.props.navigation.toggleDrawer()}/> }
        centerComponent ={{text : this.props.title, style:{color: '#fff',fontSize: 24,height : 50,}}}
       
        rightComponent ={< this.BellIcon {...this.props}/>}
        backgroundColor="#ff5722"
        />
    )
    }
}
    