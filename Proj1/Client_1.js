
import React, {Component} from 'react';
import {View, Image, Text, AppRegistry, StyleSheet, ScrollView, Button} from 'react-native';

import RNFS from 'react-native-fs';

var net = require('net');

var serverPort = 8080;

var ourServer = null;
var ourClient = null;

var packetNo = 1;

export default class App extends Component {

  constructor() {
    super();

    this.state = {
      chatter: [],
      image:require('./src/image/Sample.jpg'),
      dataNo: 0,
      currentData: -1
    };

    this.sendMessagetoServer = this.sendMessagetoServer.bind(this);
  }

  updateChatter(msg) {
    this.setState({
        chatter: this.state.chatter.concat([msg]),
    });
  }

  componentDidMount() {

    let client = net.createConnection(serverPort, '192.168.1.2', () => {
      this.updateChatter('opened client on ' + JSON.stringify(client.address()));
      //client.write('Hello, server! Love, Client.');
    });

    client.on('data', (data) => {
      this.updateChatter('Client Received: ' + data);
    });

    client.on('error', (error) => {
      this.updateChatter('client error ' + error);
    });

    client.on('close', () => {
      this.updateChatter('client close');
    });

    ourClient = client;
  }

  sendMessagetoServer() {
//    ourClient.write('SID 2');

    RNFS.readFileAssets('Sample.jpg', 'base64').then((data)=>{
      //ourClient.write(data);
      var len = data.length;

      ourClient.write((1+(len/5000)).toString());

      var i=0;
      for(i=0; i+5000<len; i+=5000)
      {
        ourClient.write(data.slice(i, i+5000));
      }
      ourClient.write(data.slice(i, len));      
    });
  }

  render() {
    return (
      <ScrollView>
        <Text>Hello World</Text>

        <Text>{this.state.chatter}</Text>

        <Button title='Send Hello'
                onPress={this.sendMessagetoServer}
        />
      </ScrollView>
    )
  }
}