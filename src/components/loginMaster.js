'use strict'

import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    StatusBar
} from 'react-native';

import { 
    Container,
    Content,
} from 'native-base';

const Navigator = require('../../node_modules/react-native-deprecated-custom-components/src/Navigator');



const Login = require('./loginView');
const SignUp = require('./signupView');
import Main from './mainView';

export default class loginMaster extends Component {

    renderScene(route, navigator) {
        switch (route.name) {
            case 'Login':
                return (
                    <Login {...route.props} navigator={navigator} route={route}></Login>
                );
            case 'Signup':
                return (
                    <SignUp {...route.props} navigator={navigator} route={route}></SignUp>
                );
            case 'Main':
                return (
                    <Main {...route.props} navigator={navigator} route={route}></Main>
            );
        }
        
    }

    render() {
        return (
             <Navigator style={{backgroundColor: '#fff'}}
                initialRoute={{name:'Login'}}
                renderScene={this.renderScene}
                configureScene={(route) => {
                    if(route.sceneConfig) {
                        return route.sceneConfig;
                    }
                    return Navigator.SceneConfigs.FloatFromRight;
                }}
                />
        );
    }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  welcome: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00BCD4'
  }
});

module.exports = loginMaster;
