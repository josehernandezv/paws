/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  AsyncStorage
} from 'react-native';

// import Navigator from 'react-native-deprecated-custom-components'
const Navigator = require('./node_modules/react-native-deprecated-custom-components/src/Navigator');


//components
const Login = require('./src/components/loginView');
const LoginMaster = require('./src/components/loginMaster');
const SignUp = require('./src/components/signupView');
const Main = require('./src/components/mainView');
console.ignoredYellowBox = ['Setting a timer'];

export default class Paws extends Component {
  
  constructor(props) {
        super(props)
        this.state = { 
            user: null
        };
    }

  componentWillMount(){
      AsyncStorage.getItem('@PawsStore:user').then((data) =>{
        var user = JSON.parse(data)
        this.setState({user:user})
      });
        
  }

  render() {
    if (this.state.user == null) {
      return (
            <LoginMaster></LoginMaster>
          );
    }
    return (
      <Main></Main>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('Paws', () => Paws);
