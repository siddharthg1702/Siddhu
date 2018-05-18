import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Dimensions from 'Dimensions';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  Animated,
  Easing,
  Image,
  Alert,
  View,
} from 'react-native';
import {Actions, ActionConst} from 'react-native-router-flux';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
const MARGIN = 40;

export default class Submit extends Component {
  constructor() {
    super();

    this.state = {
      isLoading: false,
      loginText: 'LOGIN',
      registerText: 'REGISTER',
    };

    this.growAnimatedLogin = new Animated.Value(0);
    this.growAnimatedRegister = new Animated.Value(0);
    this._onPressLogin = this._onPressLogin.bind(this);
    this._onPressRegister = this._onPressRegister.bind(this);
  }

  _onPressLogin() {
    if (this.state.isLoading) return;

    this.setState({isLoading: true});
    this.setState({loginText:'LOADING ...'});

    setTimeout(() => {
      this._onGrowLogin();
    }, 3000);

    setTimeout(() => {
      Actions.nextScreen();
      this.setState({isLoading: false});
      this.growAnimatedLogin.setValue(0);
    }, 3400);
  }

  _onPressRegister() {
    
    this._onGrowRegister();

    setTimeout(() => {
      Actions.registerScreen();
      this.growAnimatedRegister.setValue(0);
    }, 300);
  }

  _onGrowLogin() {
    Animated.timing(this.growAnimatedLogin, {
      toValue: 1,
      duration: 3000,
      easing: Easing.linear,
    }).start();
  }
  _onGrowRegister() {
    Animated.timing(this.growAnimatedRegister, {
      toValue: 1,
      duration: 3000,
      easing: Easing.linear,
    }).start();
  }

  render() {
    const changeScaleLogin = this.growAnimatedLogin.interpolate({
      inputRange: [0, 1],
      outputRange: [1, DEVICE_HEIGHT],
    });
    const changeScaleRegister = this.growAnimatedRegister.interpolate({
        inputRange: [0, 1],
        outputRange: [1, DEVICE_HEIGHT],
      });

    return (
      <View style={styles.container}>
        <View style={styles.Container}>
            <TouchableOpacity
            style={styles.button}
            onPress={this._onPressRegister}
            activeOpacity={1}>
                <Text style={styles.text}>{this.state.registerText}</Text>
            </TouchableOpacity>
            <Animated.View
                    style={[styles.circle, {transform: [{scale: changeScaleRegister}]}]}
            />
            <View style={styles.innerGap} />
            <TouchableOpacity
            style={styles.button}
            onPress={this._onPressLogin}
            activeOpacity={1}>
                {this.state.isLoading ? (
                    <Text style={styles.text}>{this.state.loginText}</Text>
                ) : (
                    <Text style={styles.text}>LOGIN</Text>
                )}
            </TouchableOpacity>
            <Animated.View
                style={[styles.circle, {transform: [{scale: changeScaleLogin}]}]}
            />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    height:DEVICE_HEIGHT,
  },
  innerContainer: {
    flex: 1,
    flexDirection: 'row',
    //alignItems: 'center',
    justifyContent: 'space-between',
    height:DEVICE_HEIGHT,
  },
  innerGap: {
      width: 40,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    height: MARGIN,
    width: (DEVICE_WIDTH-90)/2,
    borderRadius: 10,
    zIndex: 100,
    //left: 30
  },
  circle: {
    height: MARGIN,
    width: MARGIN,
    marginTop: -MARGIN,
    borderWidth: 3,
    borderColor: 'white',
    borderRadius: 100,
    alignSelf: 'center',
    zIndex: 99,
    backgroundColor: 'white',
  },
  text: {
    color: 'black',
    backgroundColor: 'transparent',
    zIndex: 100,
  },
});