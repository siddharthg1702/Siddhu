import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import UserInput from './UserInput';
import Dimensions from 'Dimensions';

import usernameImg from './Images/Username.png';
import passwordImg from './Images/password.png';

//const DEVICE_WIDTH = Dimensions.get('window').width;
//const DEVICE_HEIGHT = Dimensions.get('window').height;

export default class Form extends React.Component {

  constructor() {
    super();

    this.state = {
      showPass: true,
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <UserInput
          source={usernameImg}
          placeholder="Username"
          autoCapitalize={'none'}
          returnKeyType={'done'}
          autoCorrect={false}
        />
        <UserInput
          source={passwordImg}
          secureTextEntry={this.state.showPass}
          placeholder="Password"
          returnKeyType={'done'}
          autoCapitalize={'none'}
          autoCorrect={false}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
    },
    text: {
        color: 'white',
    }
});