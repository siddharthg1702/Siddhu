import React, {Component} from 'react';
import { StyleSheet, Text, View,Button, TouchableHighlight, Alert, Image } from 'react-native';

import SocketIO from 'react-native-socketio';

export default class App extends Component{


    constructor(){
        this.socket = new SocketIO('192.168.1.2:3000',{});
    }

    connectToServer=()=>{
        alert("Will Connect to Server");
    }

    render(){
        return(
            <ScrollView style={styles.container}>
                <Text>Client App</Text>
                <Button title="Connect to Server" onPress={this.connectToServer}/>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      paddingTop:10
    },
    buttonText: {
      fontSize: 16,
      textAlign: 'center',
      margin: 10,
    },
    button: {
      margin: 5,
      borderWidth: 1
    },
  });
  