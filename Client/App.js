import React, {Component} from 'react';
import { ScrollView, StyleSheet, Text, View,Button, TouchableHighlight, Alert, Image } from 'react-native';

import Sockets from 'react-native-sockets';

import { DeviceEventEmitter } from 'react-native';

import io from 'socket.io-client';

export default class App extends Component {

  clientAddr;
  messagecount = 1;

  

  constructor()
  {
    super();
    //this.connectClient = this.connectClient.bind(this);
    this.checkServer = this.checkServer.bind(this);
    this.state = {
      clientStatus: 'Disconnected',
      serverStatus: 'Disconnected',
      serverMessage: '',
      clientMessage: '',
      serverError: '',
      clientError: '',
      ipAddress: '192.168.200.2',
      port:8080,
      isServer:false,
      image:null
    };

/*    DeviceEventEmitter.addListener('socketClient_error', (d) => {
        console.log('socketClient_error', d);
        this.setState({ clientError: d.error });
    });
*/
    DeviceEventEmitter.addListener('socketClient_connected', (d) => {
        console.log('socketClient_connected', d);
        this.setState({ clientStatus: 'Connected' })
    });
    DeviceEventEmitter.addListener('socketClient_closed', (d) => {
        console.log('socketClient_closed', d);
        this.setState({ clientStatus: 'Disconnected' })
    });
    DeviceEventEmitter.addListener('socketClient_data', (d) => {
        
        alert("D ");
        console.log('socketClient_data', d);

        alert("In Device event emitter listener");
        this.setState({image:d.data});
        //this.setState({ clientMessage: d.data });
        //alert("DATA obtained: "+d.data);
        this.setState({ clientMessage: 'Message Recieved' });
    });


    DeviceEventEmitter.addListener('socketClient_error', (data) => {
      alert("Error Occurred"+data.error);
      console.log('socketClient_error',data.error);
    });
/*    DeviceEventEmitter.addListener('imageConversionByServer',(d)=>{
      alert("Image received by listener");
      this.setState({image:d});
    }); */
  }

 
  checkServer(){
    Sockets.isServerAvailable(this.state.ipAddress, this.state.port, 1000, success => {
      Alert.alert("Socket server is available");
      //this.connectClient;
      Sockets.startClient({
        address: this.state.ipAddress,
        port: this.state.port,
        reconnect: true
      });
      alert("connected successfully");
      this.setState({isServer:true});  
    }, err => {
      Alert.alert("Socket server is not available");
    });
  }

/*  connectClient=()=>
  {
    Alert.alert('Inside Connect Client');
    Sockets.startClient({
      address: '192.168.1.2',
      port: '8080',
      reconnect: true
    });
    Alert.alert('Connected');
  }
*/

  render() {

    return (
      <ScrollView /*style={styles.container}*/>
        <Button onPress={this.checkServer}
              title="Check and connect Server"/>
        <Text>{this.state.clientMessage}</Text>
        <Text>{this.state.isServer}</Text>

        {
          this.state.isServer &&
          <View>
            <Text>Image recevied from server</Text>
            
            <Image
              style={{width:400,height:400}}
              source={{uri:`data:image/jpg;base64,${this.state.image}`}}
            />
          </View>
        }
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



/*

<Text>Open up App.js to start working on your app!</Text>
        <Text>Changes you make will automatically reload.</Text>
        <Text>Shake your phone to open the developer menu.</Text>
        <Text>Hello World</Text>
        <Text> Server Started </Text>
        <Text>{'\n\n\nclientStatus  : ' + this.state.clientStatus}</Text>
        <Text>{'serverStatus  : ' + this.state.serverStatus}</Text>
        <Text>{'serverMessage : ' + this.state.serverMessage}</Text>
        <Text>{'serverError   : ' + this.state.serverError}</Text>
        <Text>{'clientError   : ' + this.state.clientError}</Text>
        <Text>{'ipAddress     : ' + this.state.ipAddress}</Text>

        <TouchableHighlight style={styles.button} onPress={() => { this.sendMessage() }}>
              <Text style={styles.buttonText}>Message server</Text>
        </TouchableHighlight>





*/