import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

import Form from './Form';
import Wallpaper from './Wallpaper';
import TopSpace from './TopSpace';
import Submit from './Submit';

export default class LoginScreen extends React.Component {
  render() {
    return (
      <Wallpaper>
        <TopSpace />
        <Form />
        <Submit />
      </Wallpaper>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
});