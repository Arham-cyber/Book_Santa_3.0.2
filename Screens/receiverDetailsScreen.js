import React, { Component } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity,TextInput,ScrollView, Alert} from 'react-native';
import db from '../config';
import firebase from 'firebase';
import MyHeader from '../Component/MyHeader'
import {Card} from 'react-native-elements'
import myDonations from './myDonations';

export default class receiverDetailsScreen extends Component{
    constructor(props){
        super(props);
        this.state = {
           user_id: firebase.auth().currentUser.email,
           reason: this.props.navigation.getParam("details")["reason_to_request"],
           bookName: this.props.navigation.getParam("details")["book_name"],
           reciever_id : this.props.navigation.getParam("details")["user_id"],
           request_id : this.props.navigation.getParam("details")["request_id"],       
           firstName : '',
           lastName: '',
           address: '',
           contact: '',   
        }
    }
getRecieverDetails = () => {
    var requester = this.state.reciever_id
    db.collection('users').where('email_id','==',requester).get().then(Snapshot=>{
        Snapshot.forEach(doc=>{
            var data = doc.data()
            this.setState({
                firstName: data.first_name,
                lastName: data.last_name,
                address: data.address,
                contact: data.contact,
            })
        })
    })
}

InterestCollection = () => {

    db.collection("InterestedDonors").add({
        book_name: this.state.bookName,
        request_id: this.state.request_id,
        donor_id: this.state.user_id,
        reciever_id: this.state.reciever_id,
        reciever_name: this.state.firstName + " " + this.state.lastName,
        request_status: "Donor Interested"
        
    })
}
componentDidMount(){
    this.getRecieverDetails();
}

notificationCollection = () => {
    db.collection('notifications').add({
        book_name:this.state.bookName,
        donor_id: this.state.user_id,
        request_status: "Donor Interested",
        request_id:this.state.request_id,
        reciever_id: this.state.reciever_id,
        date: firebase.firestore.FieldValue.serverTimestamp(),
        notificationStatus:"Unread",
    })
}
    render(){
        return(
            <ScrollView>
            <View style= {{flex:1}}>
                <View style= {{flex:0.13}}>
                    <MyHeader title = "Request Details" />
                </View>
        
                <View style= {{flex:0.2}}>
                    <Card title={"Book Details"} titleStyle={{color:'darkblue', fontSize:15}}>
                        <Card>
                            <Text>
                                Name : {this.state.bookName}
                            </Text>
                            </Card>
                            <Card>
                            <Text>
                                Reason : {this.state.reason}
                            </Text>
                       
                        </Card>
                    </Card>
                    
                </View>
                <View style= {{flex:0.3}}>
                    <Card title={"User Details"} titleStyle={{color:'darkblue', fontSize:15}}>
                        <Card>
                            <Text>
                                Name : {this.state.firstName + " " + this.state.lastName}
                            </Text>
                            </Card>
                            <Card>
                            <Text>
                               Contact Info : {this.state.contact}
                            </Text>
                       
                        </Card>
                        <Card>
                            <Text>
                               Address : {this.state.address}
                            </Text>
                       
                        </Card>
                    </Card>
                    
                </View>
                <View alignItems ="center">
                    { this.state.user_id !== this.state.reciever_id ? (
                <TouchableOpacity style = {{
                     height: 40,
                     width: 300,
                     alignItems:'center',
                     justifyContent:'center',
                     backgroundColor: '#ff8a65',
                     margin: 10,
                     borderRadius: 10,
                }} onPress = {()=>{
                    this.InterestCollection() 
                    this.notificationCollection()
                    this.props.navigation.navigate("myDonations")}}>
                    <Text style={{color:'white'}}>I want to Donate</Text>
                    </TouchableOpacity>
                    ) : Alert.alert("You cannot donate a book to yourself!")
                    }
                    </View>

            </View>
            </ScrollView>
        )
    }
}