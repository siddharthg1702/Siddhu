import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import Dimensions from 'Dimensions';
import {Actions, ActionConst} from 'react-native-router-flux';

import UserInput from './UserInput';

import emailImg from './Images/email.png';
import usernameImg from './Images/Username.png';
import passwordImg from './Images/password.png';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
const MARGIN = 40;

export default class Register extends React.Component {

  completeRegistration() {
    Actions.nextScreen();
  }

  render() {
    return (
      <View style={styles.container}>
        <UserInput source={emailImg}
            placeholder="Email"
            autoCapitalize={'none'}
            returnKeyType={'done'}
            autoCorrect={false}
        />
        <UserInput source={usernameImg}
            placeholder="Name"
            autoCapitalize={'none'}
            returnKeyType={'done'}
            autoCorrect={false}
        />
        <UserInput source={passwordImg}
            placeholder="Password"
            autoCapitalize={'none'}
            returnKeyType={'done'}
            autoCorrect={false}
            secureTextEntry={true}
        />
        <UserInput source={passwordImg}
            placeholder="Confirm Password"
            autoCapitalize={'none'}
            returnKeyType={'done'}
            autoCorrect={false}
            secureTextEntry={true}
        />
        <TouchableOpacity
        style={styles.button}
        onPress={this._onPressRegister}
        activeOpacity={1}>
            <Text style={styles.text}>REGISTER</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    height: MARGIN,
    width: (DEVICE_WIDTH-90)/2,
    borderRadius: 10,
    zIndex: 100,
  },
  text: {
    color: 'black',
  }
});