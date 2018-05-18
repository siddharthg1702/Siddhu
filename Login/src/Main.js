import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Router, Scene } from 'react-native-router-flux';

import LoginScreen from './LoginScreen';
import NextScreen from './NextScreen';
import Register from './Register';

export default class Main extends React.Component {
  render() {
    return (
        <Router>
            <Scene key="root">
                <Scene key="loginScreen"
                    component={LoginScreen}
                    hideNavBar={true}
                />
                <Scene key="registerScreen"
                    component={Register}
                    hideNavBar={true}
                />
                <Scene key="nextScreen"
                    component={NextScreen}
                    hideNavBar={true}
                />
            </Scene>
        </Router>
    );
  }
}