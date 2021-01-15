import React, { Component } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity,TextInput, Alert,Modal,ScrollView,KeyboardAvoidingView } from 'react-native';
import db from '../config';
import firebase from 'firebase';


export default class WelcomeScreen extends Component{
    constructor(){
        super();
        this.state={
            emailId:'',
            password:'',
            firstName:'',
            lastName:'',
            Address:'',
            contactInfo:'',
            confirmPassword:'',
            isModalVisible:false,
        }
    }

    showModal=()=>{
        return(
            <Modal animationType="fade"
            transparent={true}
            visible={this.state.isModalVisible}>
                <View style={styles.modalContainer}>
                <ScrollView>   
                <KeyboardAvoidingView>
                <Text style={styles.registerHeader}>REGISTER</Text>
              
                <TextInput  style={styles.loginBox} placeholder = "First Name"  placeholderTextColor = "#000" maxLength = {15}  onChangeText={(text)=>{this.setState({firstName: text})}}/>
                <TextInput  style={styles.loginBox} placeholder = "Last Name"  placeholderTextColor = "#000" maxLength = {25} onChangeText={(text)=>{this.setState({lastName: text})}}/>
                <TextInput  style={styles.loginBox} placeholder = "Contact Information"  placeholderTextColor = "#000" maxLength = {10} keyboardType = {'numeric'} onChangeText={(text)=>{this.setState({contactInfo: text})}}/>
                <TextInput  style={styles.loginBox} placeholder = "Address"  placeholderTextColor = "#000" multiline = {true} onChangeText={(text)=>{this.setState({Address: text})}}/>
                <TextInput  style={styles.loginBox} placeholder = "E-mail"  placeholderTextColor = "#000" keyboardType = {'email-address'} onChangeText={(text)=>{this.setState({emailId: text})}}/>
                <TextInput  style={styles.loginBox} placeholder = "Password"  placeholderTextColor = "#000"   secureTextEntry = {true} onChangeText={(text)=>{this.setState({password: text})}}/>
                <TextInput  style={styles.loginBox} placeholder = "Confirm Password"  placeholderTextColor = "#000"  secureTextEntry = {true} onChangeText={(text)=>{this.setState({confirmPassword: text})}}/>
                <TouchableOpacity style = {styles.loginButton} onPress={()=>this.setState({"isModalVisible":false})} >
                      <Text style= {{color : "#fff"}}> Cancel </Text>
                      </TouchableOpacity>

                      <TouchableOpacity style = {styles.loginButton} onPress = {()=>this.signUp(this.state.emailId,this.state.password,this.state.confirmPassword)}>
                      <Text style= {{color : "#fff"}}> Register </Text>
                      </TouchableOpacity>   
                      </KeyboardAvoidingView>  
                 </ScrollView>
                </View>              
            </Modal>
        )
    }
    userLogin = (emailId,password)=>{
        firebase.auth().signInWithEmailAndPassword(emailId,password).
        then(()=>{this.props.navigation.navigate('bookDonate')})
        .catch((error)=> {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            return Alert.alert(errorMessage)
          });
    }

    signUp  = (email, password, confirmPassword)=>{
        if(password!= confirmPassword)
        {
        Alert.alert("The password does not match!")    
        }
        else{
            firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(()=>{
                db.collection('users').add({
                first_name:this.state.firstName,
                last_name:this.state.lastName,
                contact:this.state.contactInfo,
                email_id:this.state.emailId,
                address:this.state.Address
                })
                return  Alert.alert(
                    'User Added Successfully',
                    '',
                    [
                      {text: 'OK', onPress: () => this.setState({"isModalVisible" : false})},
                    ]
                );
            })
            .catch((error)=> {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                return Alert.alert(errorMessage)
              });
        }
    }

    render(){
        return(
            <View style={{flex:1, justifyContent:'center',alignItems:'center'}}>
               <View>
                   {this.showModal()}
                <Text style={{color:'#ff3d00', fontSize:40,fontWeight:'200',paddingBottom:10,marginTop: 10}}>
                   Book Santa
                </Text>
                </View>
                <View style={{ justifyContent:'center'}}>
                    <TextInput 
                     style={styles.loginBox}
                    placeholder='abc@xyz.com'
                    placeholderTextColor = "#000"
                    keyboardType ='email-address'
                    onChangeText={(text)=>{
                    this.setState({
                    emailId: text
                    })
                } }
                />

                    <TextInput
                    style={styles.loginBox}
                    secureTextEntry = {true}
                    placeholder="password"
                    placeholderTextColor = "#000"
                    onChangeText={(text)=>{
                      this.setState({
                        password: text
                      })
                    }}
                  />
                  <TouchableOpacity style = {styles.loginButton} onPress ={()=>{this.userLogin(this.state.emailId,this.state.password)}} >
                      <Text style= {{color : "#fff"}}> Login </Text>
                      </TouchableOpacity>

                      <TouchableOpacity style = {styles.loginButton} onPress ={()=>this.setState({isModalVisible:true})}>
                      <Text style= {{color : "#fff"}}> SIGN UP </Text>
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
    modalContainer:{
        flex:1,
        backgroundColor:'#fff',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:20,
        marginTop:80,
        marginBottom:80,
    },
    registerHeader:{
        justifyContent:'center',
        alignSelf:'center',
        fontSize:30,
        color:'#ff5722',
        margin:50
    }   
})