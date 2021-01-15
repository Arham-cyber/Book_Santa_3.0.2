import React, { Component } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity,TextInput, Alert, KeyboardAvoidingView,header } from 'react-native';
import db from '../config';
import firebase from 'firebase';
import MyHeader from '../Component/MyHeader'

export default class WelcomeScreen extends Component{
    constructor(){
        super();
        this.state={
        BookName:"",
        reason:"",
        userId : firebase.auth().currentUser.email,
        requestStatus:"",
        activebook_name: "",
        activereason_to_request: "",
        activeRequest_id : "",
        activedoc_id : "",
        userDocId:'',
        activeBookRequest :'',
        docId:''
        }
    }
    createUniqueId(){
        return Math.random().toString(36).substring(7);
    }

    addRequest = async (BookName, reason)=>{
        var userId = this.state.userId
        var randomRequestId = this.createUniqueId();
         db.collection('requested_books').add({
            "book_name" : BookName,
            "user_id" : userId,
            "reason_to_request" : reason,
            "request_id" : randomRequestId,
            "requestStatus" : true,
            "date" : firebase.firestore.FieldValue.serverTimestamp()
           
        })
        
        await this.getBookRequest()
        db.collection('users').where('email_id','==',this.state.userId).get().then((snapshot)=>{
            snapshot.forEach((doc)=>{
                db.collection('users').doc(doc.id).update({
                    'activeBookRequest': true,
                })
            })
        })                   
        this.setState({
            BookName:"",
            reason:"",            
        })
        return alert("Book Requested Successfully")
    }


getBookRequest(){
    var bookRequest = db.collection('requested_books').where('"user_id','==',this.state.userId)
    .get().then((snapshot)=>{
        snapshot.forEach((doc)=>{
            if(doc.data().requestStatus !== false){
                this.setState({
                    request_id:doc.data().request_id,
                    activebook_name : doc.data().book_name,
                    requestStatus : doc.data().requestStatus,
                    docId : doc.id
                })
            }
        })
    })
}

resetRequestStatus = () =>{
    //this.setState ({  requestStatus: "false", })
     db.collection('requested_books').doc(this.state.docId).update({
         "requestStatus" : false
     })
     db.collection('users').where('email_id','==',this.state.userId).get().then((snapshot)=>{
         snapshot.forEach((doc)=>{
             db.collection('users').doc(doc.id).update({ "activeBookRequest" : false})
     })       
    })
}

checkActiveBookRequest= () => {
    db.collection("users").where("email_id","==",this.state.userId).get().then((snapshot)=>{
        snapshot.forEach((doc)=>{        
                this.setState ({
                    activeBookRequest:doc.data().activeBookRequest,
                    userDocId : doc.id
                  })                      
        })
    })
}

componentDidMount(){
    this.getBookRequest();
    this.checkActiveBookRequest();
}
//if requestStatus is false =>show request form
//if requestStatus is true =>show the requested book details

 
    render(){
        if(this.state.activeBookRequest === true){
        return(
            <View style={{flex:1, justifyContent:'center',alignItems:'center'}}>
            <Text> Book Request </Text>  
                <View style={{flex:1, justifyContent:'center', marginLeft :60, margin:10}}>
                <Text style={{fontSize:18}}>Name of book </Text><Text> {this.state.activebook_name}</Text>
                <Text style={{fontSize:18}}>reason_to_request </Text><Text>{this.state.activereason_to_request}</Text>
                <Text style={{fontSize:18}}>Document ID </Text><Text> {this.state.activedoc_id}</Text>
                <Text style={{fontSize:18}}>Request ID</Text><Text>{this.state.activeRequest_id}</Text>
                <TouchableOpacity style = {styles.button} onPress = {()=>{this.resetRequestStatus()}}>
                    <Text style={{fontSize:18}}>Book Recieved</Text>
                </TouchableOpacity>
            </View>
            </View>
        )}
        else {
            return(
                <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                <MyHeader title = "Request Book" />    
                <KeyboardAvoidingView style = {{flex:1, justifyContent:'center', alignItems:'center'}}>
                <TextInput 
                style = {styles.formTextInput}
                placeholder="Name of book"
                 onChangeText ={(text)=> { this.setState({BookName:text})}}
                 value = {this.state.BookName}
                 />
          
                
                <TextInput 
                style = {[styles.formTextInput, {height:200}]}
                placeholder = "Reason of request" 
                onChangeText ={(text)=> { this.setState({reason:text})}}
                value = {this.state.reason}
                />
          <TouchableOpacity 
                style = {styles.button}
                onPress={()=>{this.addRequest(this.state.BookName,this.state.reason)}}>
              <Text style = {{color:'#fff'}}>  Request   </Text>
          </TouchableOpacity>
                
                </KeyboardAvoidingView>
            </View>
            )
        }
    }

}
const styles = StyleSheet.create({
    formTextInput:{
        width:"75%",
        height:35,
        alignSelf:'center',
        borderColor:'#ffab91',
        borderRadius:10,
        borderWidth:1,
        marginTop:20,
        padding:10,
      },
      button:{
        width:"75%",
        height:50,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:10,
        backgroundColor:"#ff5722",
        marginTop:20
      }
})