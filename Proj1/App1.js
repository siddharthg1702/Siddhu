

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  ScrollView,
  Alert,
  Image,
  Button
} from 'react-native';
import { DeviceEventEmitter } from 'react-native';

import Sockets from 'react-native-sockets';

import IMAGENAME from './src/image';

import RNFS from 'react-native-fs';

import Server from 'socket.io';
//import { Server } from 'net';

export default class example extends Component {
  clientAddr;
  messagecount = 1;
  port = 8080;
  constructor() {
    super();

    this.state = {
      clientStatus: 'Disconnected',
      serverStatus: 'Disconnected',
      serverMessage: '',
      clientMessage: '',
      serverError: '',
      clientError: '',
      ipAddress: '',
      image:IMAGENAME,
      isClient:false,
      image1:require('./src/image/Sample.jpg')
    };    
    this.sendImage = this.sendImage.bind(this);
    Sockets.getIpAddress(ip => {
      this.setState({ ipAddress: ip[0] });
    }, err => {
      console.log('getIpAddress_error', err);
    })

    //server events
    DeviceEventEmitter.addListener('socketServer_connected', (d) => {
      console.log('socketServer_connected', d);
      this.setState({ serverStatus: 'Connected' });
    });
    DeviceEventEmitter.addListener('socketServer_error', (d) => {
      console.log('socketServer_error', d);
      this.setState({ serverError: d.error });
    });
    DeviceEventEmitter.addListener('socketServer_clientConnected', (d) => {
      console.log('socketServer_clientConnected', d);
      this.setState({clientStatus:'Connected'});
      this.setState({isClient:true});
      this.clientAddr = d.id;
    });
    DeviceEventEmitter.addListener('socketServer_data', (d) => {
      console.log('socketServer_data', d);
      this.setState({ serverMessage: d.data });
    });
    DeviceEventEmitter.addListener('socketServer_closed', (d) => {
      console.log('socketServer_closed', d);
      this.setState({ serverStatus: 'Disconnected' });
    });
    DeviceEventEmitter.addListener('socketServer_clientDisconnected', (d) => {
      console.log('socketServer_clientDisconnected', d);
    });


    
  }

  startServer() {
    Sockets.startServer(this.port);
  }

  startSocket(){
    const io = new Server();

    const server = require('http').createServer();

    io.attach(server,{
      pingInterval:10000,
      pingTimeout: 5000,
      cookie:false
    });

    server.listen(3000);

    alert("Server listening on Port 3000");
    
  }

  connectClient() {
    Sockets.startClient({
      address: this.state.ipAddress,
      port: this.port,
      reconnect: true
    });
  }

  
  sendImage(){

    RNFS.readFileAssets('Sample.jpg', 'base64').then((data)=>{
        //alert(" From send Image " +data);
        Sockets.emit(data, this.clientAddr);
        //Sockets.emit("Hii",this.clientAddr);
        alert('Image SENT');
    });
    
  }

  render() {
    return (
      <ScrollView>
        <Text style={styles.text}>IP: {this.state.ipAddress}</Text>
        <TouchableHighlight style={styles.button} onPress={() => { this.pingServer() }}>
          <Text style={styles.buttonText}>Ping {this.state.ipAddress}</Text>
        </TouchableHighlight>
        <TouchableHighlight style={styles.button} onPress={() => { this.serverAvailable() }}>
          <Text style={styles.buttonText}>Check server available</Text>
        </TouchableHighlight>

        <Text style={styles.text}>Status: {this.state.serverStatus}</Text>

        <TouchableHighlight style={styles.button} onPress={() => { this.startSocket() }}>
          <Text style={styles.buttonText}>Start</Text>
        </TouchableHighlight>

        
        <Image
          style={{width:200,height:200}}
          //source={require('./src/image/Sample.png')}
          source={this.state.image1}
        />
        

        {
          this.state.isClient &&
          <Button title="Send data to Client"
            onPress={()=>{
              alert("Will send data to Client now");
              this.sendImage();
            }} 
          />
        }





      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    flexDirection: 'row'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    margin: 10,
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

AppRegistry.registerComponent('example', () => example);
