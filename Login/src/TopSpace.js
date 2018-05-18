import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Dimensions from 'Dimensions';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

export default class NextScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
      height: 3*DEVICE_HEIGHT/7,
  },
  text: {
    color: 'white',
  }
});