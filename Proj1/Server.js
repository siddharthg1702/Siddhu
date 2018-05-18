
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
      chatter: [],
      image:null,
      newImg: -1,
      packNo: 0,
    };
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

        this.updateChatter('Message Recieved : ' + data);
        socket.write('Echo server\r\n');
        if(this.state.newImg == -1)
        {
          this.setState({packNo: parseInt(data, 10)});
          this.setState({newImg: 0});
          this.setState({image: null});
        }
        else if(this.state.newImg == 0)
        {
          this.setState({image: data});
          this.setState({newImg: 1});
          this.setState({packNo: this.state.packNo - 1});
        }
        else
        {
          this.setState({packNo: this.state.packNo - 1});
          this.setState({image: this.state.image + data});
        }

        if(this.state.packNo == 0)
        {
          this.setState({newImg: -1});
        }
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



    ourServer = server;
    this.server = server;
  }

  sendImage()
  {
    //ourServer.write('Hello');
    net.createServer(function(socket) {
      socket.write('Hello !');
    }).listen(8080);
  }

  render() {
    return (
      <ScrollView>
        <Text>Hello World</Text>

        <Text>{/*this.state.chatter*/}</Text>

        <Image
          style={{width:200,height:200}}
          source={{uri:`data:image/jpg;base64,${this.state.image}`}}
        />

      </ScrollView>
    )
  }
}