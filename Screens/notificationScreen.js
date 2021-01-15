import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  FlatList,
  StyleSheet,
} from "react-native";
import { Card, Icon, ListItem } from "react-native-elements";
import MyHeader from '../Component/MyHeader'
import firebase from "firebase";
import db from "../config.js";
import SwipeableFlatlist from '../Component/SwipeList'


export default class notificationScreen extends Component{
constructor(){
    super()
    this.state = {
      current_Id : firebase.auth().currentUser.email,
      all_notifications : [],
    }

    this.notificationRef = null
}

getNotifications = () => {
  this.notificationRef = db.collection("notifications").where("reciever_id", "==", this.state.current_Id)
    .where('notificationStatus','==','Unread')
    .onSnapshot((snapshot) => {
        var all_notifications = [];
        snapshot.docs.map((doc) => {
          var notification = doc.data();
          notification["doc_id"] = doc.id;
          all_notifications.push(notification);
        });
        this.setState({
          all_notifications : all_notifications,
        });
      });
}

keyExtractor = (item, index) => index.toString();

renderItem = ({ item, i }) => (
  <ListItem
    key={i}
    title={item.book_name}
    subtitle={
     item.request_status
    }
    leftElement={<Icon name="book" type="font-awesome" color="#696969" />}
    titleStyle={{ color: "black", fontWeight: "bold" }}
    />
);

componentDidMount() {
  this.getNotifications();
}

componentWillUnmount(){
  this.notificationRef();
}

render(){
    return(
        <View style={{ flex: 1 }}>
        <MyHeader navigation={this.props.navigation} title="My Notifications" />
        <View style={{ flex: 1 }}>
          {this.state.all_notifications.length === 0 ? (
            <View style={styles.subtitle}>
              <Text style={{ fontSize: 20 }}>If someone shows interest in donating a book to you, it will show up here!</Text>
            </View>
          ) : (
            <SwipeableFlatlist
              all_notifications={this.state.all_notifications}
             
            />
          )}
        </View>
      </View>

    )
    }

}

const styles = StyleSheet.create({
    subtitle: {
        flex: 1,
        fontSize: 20,
        justifyContent: "center",
        alignItems: "center",
      },
})