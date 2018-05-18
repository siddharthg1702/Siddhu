import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import RegisterForm from './RegisterForm';

export default class NextScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <RegisterForm />
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
  text: {
    color: 'white',
  }
});
