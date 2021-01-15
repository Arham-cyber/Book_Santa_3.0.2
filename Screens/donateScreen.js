import React, { Component } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity,TextInput, Alert, FlatList, KeyboardAvoidingView } from 'react-native';
import { ListItem } from 'react-native-elements';
import MyHeader from '../Component/MyHeader'
import db from '../config'

export default class donateScreen extends Component{
   constructor(){
       super(),
       this.state = {
           requestedBooks: [],
       }
       this.requestRef = null
   }

   extractInfo=()=>{
        this.requestRef = db.collection('requested_books').onSnapshot((snapshot)=>{
            var bookList = snapshot.docs.map(document=>document.data())
            this.setState({requestedBooks:bookList})
        })
   }

componentDidMount(){
    this.extractInfo();
}
componentWillUnmount(){
    this.requestRef();
}   

    keyExtractor = (item,index)=>toString()

    renderItem=({item, i})=>{
return(
    <ListItem
key = {i}
title = {item.book_name}
subtitle = {item.reason_to_request}
titleStyle={{ color: 'black', fontWeight: 'bold' }}

rightElement = {<TouchableOpacity style = {{backgroundColor : '#00B383',height: 70,width : 120,justifyContent:'center',alignItems:'center', borderRadius:10}}
onPress={()=>{this.props.navigation.navigate("receiverDetails", {"details": item})}}
>
<Text style= {{ color :'#fff', fontSize: 16,}}>View Details</Text>
            </TouchableOpacity>}
bottomDivider
    />
)
    }

        render(){
        return(
            <View>
           <MyHeader title = "Donate Book" />  

           <View>  
           {
               this.state.requestedBooks.length === 0 
               ?(
                   <View>
                       <Text> No Books requested </Text>
                    </View>   
               )
               :(
               <FlatList
           keyExtractor = {this.keyExtractor}
            data = {this.state.requestedBooks}
            renderItem = {this.renderItem}
/>
)}
            </View>
            </View>
        )
    }

}