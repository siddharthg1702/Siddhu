import React from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';

import img from './Images/Wallpaper.jpg'

export default class Form extends React.Component {
  render() {
    return (
        <ImageBackground style={styles.container} source={img}>
            {this.props.children}
        </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: null,
        height: null,
        //resizeMode: 'cover',
    },
});