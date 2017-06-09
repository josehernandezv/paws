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
  View
} from 'react-native';

// import Navigator from 'react-native-deprecated-custom-components'
const Navigator = require('./node_modules/react-native-deprecated-custom-components/src/Navigator');


//components
const Login = require('./src/components/loginView');
const SignUp = require('./src/components/signupView');
const Main = require('./src/components/mainView');
console.ignoredYellowBox = ['Setting a timer'];

export default class Paws extends Component {
  
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
          }}/>
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
