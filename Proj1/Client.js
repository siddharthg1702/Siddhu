import React, {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Sockets from 'react-native-sockets';

import { DeviceEventEmitter } from 'react-native';

export default class App extends Component {

  clientAddr;
  messagecount = 1;

  constructor()
  {
    super();

    this.state = {
      clientStatus: 'Disconnected',
      serverStatus: 'Disconnected',
      serverMessage: '',
      clientMessage: '',
      serverError: '',
      clientError: '',
      ipAddress: ''
    };

 /*   Sockets.getIpAddress(ip => {
      this.setState({ ipAddress: ip[0] });
      console.log('IP Address : ' + this.state.ipAddress);
    }, err => {
      console.log('getIpAddress_error', err);
    })
*/
 /*   Sockets.startClient({
        address: this.state.ipAddress,
        port: this.port,
        reconnect: true
    });
*/
    DeviceEventEmitter.addListener('socketClient_error', (d) => {
        console.log('socketClient_error', d);
        this.setState({ clientError: d.error });
    });
    DeviceEventEmitter.addListener('socketClient_connected', (d) => {
        console.log('socketClient_connected', d);
        this.setState({ clientStatus: 'Connected' })
    });
    DeviceEventEmitter.addListener('socketClient_closed', (d) => {
        console.log('socketClient_closed', d);
        this.setState({ clientStatus: 'Disconnected' })
    });
    DeviceEventEmitter.addListener('socketClient_data', (d) => {
        console.log('socketClient_data', d);
        this.setState({ clientMessage: d.data });
    });
  
  }

  sendMessage() {
    Sockets.emit("message to client: " + this.messagecount++, this.clientAddr);
  }

  render() {

    return (
      <View style={styles.container}>
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


      </View>
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