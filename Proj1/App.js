/*
import React, {Component} from 'react';
import {View, Text, AppRegistry, StyleSheet} from 'react-native';

export default class App extends Component {
    render(){
        return (
            <View>
                <Text>Hii !!!</Text>
                <Text>Hello World</Text>
            </View>
        )
    }
}
*/

import React, {Component} from 'react';
import {View, Image, Text, AppRegistry, StyleSheet, ScrollView, Button} from 'react-native';

import RNFS from 'react-native-fs';

var net = require('net');

var serverPort = 8080;

var ourServer = null;
var ourClient = null;

export default class App extends Component {

  constructor() {
    super();

    this.state = {
      image1:require('./src/image/Sample.jpg'),
      image2:null,
      chatter: []
    };

    RNFS.readFileAssets('Sample.jpg', 'base64').then((d)=>{
      this.setState({image2:d});
      //alert('Image 2 : '+this.state.image2);
    });

/*    var server = net.createServer(function(socket) {
      socket.write('excellent!');

      alert('Server Created');
    }).listen(12345);

    var client = net.createConnection(12345);

    client.on('error', function(error) {
      console.log(error)
      alert('ERROR : ' + error);
    });

    client.on('data', function(data) {
      console.log('message was received', data)
      alert('Data : ' + data);
    });
*/
  }

  updateChatter(msg) {
    this.setState({
        chatter: this.state.chatter.concat([msg])
    });
  }

  componentDidMount() {
    let server = net.createServer((socket) => {
      this.updateChatter('server connected on ' + JSON.stringify(socket.address()));

      socket.on('data', (data) => {
        this.updateChatter('Server Received: ' + data);
        socket.write('Echo server\r\n');
      });

      socket.on('error', (error) => {
        this.updateChatter('error ' + error);
      });

      socket.on('close', (error) => {
        this.updateChatter('server client closed ' + (error ? error : ''));
      });
    }).listen(serverPort, () => {
      this.updateChatter('opened server on ' + JSON.stringify(server.address()));
    });

    server.on('error', (error) => {
      this.updateChatter('error ' + error);
    });

    server.on('close', () => {
      this.updateChatter('server close');
    });

    let client = net.createConnection(serverPort, () => {
      this.updateChatter('opened client on ' + JSON.stringify(client.address()));
      client.write('Hello, server! Love, Client.');
    });

    client.on('data', (data) => {
      this.updateChatter('Client Received: ' + data);
      //this.client.write('SID');

      //this.client.destroy(); // kill client after server's response
      //this.server.close();
    });

    client.on('error', (error) => {
      this.updateChatter('client error ' + error);
    });

    client.on('close', () => {
      this.updateChatter('client close');
    });

    ourClient = client;
    ourServer = server;

    this.server = server;
    this.client = client;

    this.client.write('SID 1');
    this.client.write('SID 1');
    this.client.write('SID 1');
    this.client.write('SID 1');
    this.client.write('SID 1');
    this.client.write('SID 1');
    this.client.write('SID 1');
    this.client.write('SID 1');
    alert('End of DidMount');
  }

  sendMessagetoServer() {
    ourClient.write('SID 2');
  }

  render() {
    return (
      <ScrollView>
        <Text>Hello World</Text>

        <Text>{this.state.chatter}</Text>

        <Button title='Send Hello'
                onPress={this.sendMessagetoServer}
        />
        
        <Image source={this.state.image1}></Image>
        <Image
          style={{width:400,height:400}}
          source={{uri:`data:image/jpg;base64,${this.state.image2}`}} />
      </ScrollView>
    )
  }
}




/*
<Button title = 'Send Hello'
                onPress = {}
        />
*/