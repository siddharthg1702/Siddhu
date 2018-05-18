import React from 'react';
import HttpExample from './HttpExample.js'

const Home = () => {
   return (
      <HttpExample />
   )
}
export default Home


/*
import React, { Component } from 'react'
import { View, LayoutAnimation, TouchableOpacity, Text, StyleSheet } from 'react-native'

class Animations extends Component {
   state = {
      myStyle: {
         height: 100,
         backgroundColor: 'red'
      }
   } 
   expandElement = () => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
      this.setState({
         myStyle: {
            height: 400,
            backgroundColor: 'red'
         }
      })
   }
   collapseElement = () => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
      
      this.setState({
         myStyle: {
            height: 100,
            backgroundColor: 'red'
         }
      })
   }
   render() {
      return (
         <View>
            <View style = {this.state.myStyle}>
            </View>

            <TouchableOpacity>
               <Text style = {styles.button} onPress = {this.expandElement}>
                  Expand
               </Text>
            </TouchableOpacity>

            <TouchableOpacity>
               <Text style = {styles.button} onPress = {this.collapseElement}>
                  Collapse
               </Text>
            </TouchableOpacity>
         </View>
      )
   }
}
export default Animations

const styles = StyleSheet.create({
   button: {
      borderWidth: 1,
      borderColor: 'red',
      color: 'red',
      textAlign: 'center',
      marginTop: 50,
      padding: 10
   }
})
//export default Home
*/

/*
import React, { Component } from 'react'
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native'

class Inputs extends Component {
   state = {
      email: '',
      password: ''
   }
   handleEmail = (text) => {
      this.setState({ email: text });
      console.log('Hii');
   }
   handlePassword = (text) => {
      this.setState({ password: text });
      console.log('Hii');
   }
   login = (email, pass) => {
      alert('email: ' + email + '\n password: ' + pass)
   }
   render(){
      return (
         <View style = {styles.container}>
            <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "Email"
               placeholderTextColor = "#9a73ef"
               autoCapitalize = "none"
               onChangeText = {this.handleEmail}/>
            
            <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "Password"
               placeholderTextColor = "#9a73ef"
               autoCapitalize = "none"
               onChangeText = {this.handlePassword}/>
               
            <TouchableOpacity
               style = {styles.submitButton}
               onPress = {
                  () => this.login(this.state.email, this.state.password)
               }>
               <Text style = {styles.submitButtonText}> Submit </Text>

               <Text> {this.state.email + '     ' +'Email'} </Text>
            </TouchableOpacity>
         </View>
      )
   }
}
export default Inputs

const styles = StyleSheet.create({
   container: {
      paddingTop: 23
   },
   input: {
      margin: 15,
      height: 40,
      borderColor: '#7a42f4',
      borderWidth: 1
   },
   submitButton: {
      backgroundColor: '#7a42f4',
      padding: 10,
      margin: 15,
      height: 40,
   },
   submitButtonText:{
      color: 'white'
   }
})

*/