import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';

export default PresentationalComponent = (props)  => {
    return (
        <View>
            <Text onPress = {props.updateState}>
                {props.myState}
            </Text>
        </View>
    )
}