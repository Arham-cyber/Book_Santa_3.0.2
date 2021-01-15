import React, { Component } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity,TextInput, Alert, FlatList, KeyboardAvoidingView } from 'react-native';
import firebase from 'firebase';
import db from '../config'
import MyHeader from '../Component/MyHeader'

export default class ProfileSettings extends Component{
    constructor(){
        super()
        this.state ={
            email_id: '',
            firstName: '',
            lastName:'',
            address:'',
            contact:'',
            doc_id:'',
    }
    }

    getUserDetails = ()=>{
        var email = firebase.auth().currentUser.email
    db.collection('users').where('email_id','==',email).get().then(Snapshot=>{
        Snapshot.forEach(doc=>{
            var data = doc.data()
            this.setState({
                email_id : data.email_id,
                firstName: data.first_name,
                lastName: data.last_name,
                address: data.address,
                contact: data.contact,
                doc_id: doc.id,
            })
        })
    })
    }

    componentDidMount(){
        this.getUserDetails()
    }

    updateUserDetails=()=>{
        db.collection('users').doc(this.state.email_id).update({
            first_name: this.state.firstName,
            last_name: this.state.lastName,
            address:this.state.address,
            contact: this.state.contact,
        })
        Alert.alert("Information Updated!")
    }

    render(){
        return(
            <View style = {{flex:1}}>
                 <MyHeader title = "Profile" />   
            <View style = {{ justifyContent:'center', alignItems:'center'}}>
                

              <TextInput  style={styles.loginBox}  maxLength = {15}  onChangeText={(text)=>{this.setState({firstName: text})}} value = {this.state.firstName} />
                <TextInput  style={styles.loginBox}  maxLength = {25} onChangeText={(text)=>{this.setState({lastName: text})}} value = {this.state.lastName} />
                <TextInput  style={styles.loginBox}  maxLength = {10} keyboardType = {'numeric'} onChangeText={(text)=>{this.setState({contact: text})}} value = {this.state.contact}/>
                <TextInput  style={styles.loginBox}  multiline = {true} onChangeText={(text)=>{this.setState({address: text})}} value = {this.state.address} />

                <TouchableOpacity  style ={styles.loginButton} onPress = {()=>{this.updateUserDetails()}}>
                    <Text style = {{color : 'white'}}>Update</Text>
                </TouchableOpacity>
            </View>
        </View>
        )
    }
}
const styles = StyleSheet.create({
    loginBox:{
    width: 300,
    height: 40,
    borderBottomWidth: 1.5,
    borderColor : '#ff8a65',
    fontSize: 20,
    margin:10,
    paddingLeft:10
    },
    loginButton : {
    height: 40,
    width: 300,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor: '#ff8a65',
    margin: 10,
    borderRadius: 10,
    },
})