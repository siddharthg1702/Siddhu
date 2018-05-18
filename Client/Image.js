import React, {Component} from 'react';

import { ScrollView, StyleSheet, Text, View,Button, TouchableHighlight, Alert, Image } from 'react-native';

export default class Image extends Component {
    render () {
        return (
            <ScrollView>
                <Image
                    style={{width:400,height:400}}
                    source={{uri:{require('./src/image/Sample.jpg')}}}
                />
            </ScrollView>

        );
    }
}