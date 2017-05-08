'use strict'

import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image
} from 'react-native';

import { 
    Container,
    Footer, 
    FooterTab,
    Button,
    Icon,
    Item,
    Input,
    Toast
} from 'native-base';

import GoogleSignIn from 'react-native-google-sign-in';

const firebase = require('../database/firebase')
var {FBLogin, FBLoginManager} = require('react-native-facebook-login');

class loginView extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            email: '' ,
            password: ''
        };
    }

    showToast(message) {
        Toast.show({
            supportedOrientations:['portrait','landscape'],
            text: message,
            position: 'bottom',
            buttonText: 'Ok'
        })
    }

    async login() {
        var self = this;
        try {
            await firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password);
            firebase.database().ref("users").orderByChild("email").equalTo(this.state.email).on("child_added",function(snapshot) {
                 self.props.navigator.replace({
                    name: 'Main',
                    passProps: { user: snapshot.val()} 
                });
            });
        } catch (error) {
            self.showToast(error.message);
        }
    }

    async facebookLogin() {
        var self = this;
        FBLoginManager.loginWithPermissions(['email'], (error, data) => {
            if (!error) {
                var profile = JSON.parse(data.profile);
                firebase.database().ref("users").orderByChild("email").equalTo(profile.email).once("value").then(function(snapshot) {
                    if (snapshot.exists()) {
                        const credential = firebase.auth.FacebookAuthProvider.credential(data.credentials.token);
                        firebase.auth().signInWithCredential(credential).then(function() {
                            self.props.navigator.replace({
                                name: 'Main',
                                passProps: { user: {
                                    email: profile.email,
                                    username: profile.name
                                }} 
                            });
                        }).catch(function(error) {
                            self.showToast(error);
                        });
                    } else {
                       self.showToast('Please sign in first');                      
                    }
                 });
            }
        });
    }

    async googleLogin() {
        var self = this;
        await GoogleSignIn.configure({
            clientID: '804759165602-qim4grv81neao38olojij9lnin9gdhna.apps.googleusercontent.com',
            scopes: ['openid', 'email', 'profile'],
            shouldFetchBasicProfile: true,
            serverClientID: '804759165602-qim4grv81neao38olojij9lnin9gdhna.apps.googleusercontent.com'
        });
        const user = await GoogleSignIn.signInPromise();

        firebase.database().ref("users").orderByChild("email").equalTo(user.email).once("value").then(function(snapshot) {
            if (snapshot.exists()) {
                var credential = firebase.auth.GoogleAuthProvider.credential(user.idToken);
                firebase.auth().signInWithCredential(credential).then(function() {
                    self.props.navigator.replace({
                        name: 'Main',
                        passProps: { user: {
                            email: user.email,
                            username: user.givenName
                        }} 
                    });
                }).catch(function(error) {
                    self.showToast(error.message)
                }) 
            } else {
                self.showToast('Please sign in first')
            }
        });
    }

    render() {
        return (
            <Container>
                <Image style={styles.container} source={require('../images/LoginBackground.jpg')}>
                    <Image style={styles.title} source={require('../images/Title.png')}/>
                    <Item rounded style={StyleSheet.flatten(styles.item)}>
                        <Icon active name='md-person' style={{color: 'rgba(255,255,255,0.7)'}}/>
                        <Input placeholder='Email'
                            placeholderTextColor='rgba(255,255,255,0.7)'
                            keyboardType='email-address'
                            style={{color: '#fff'}}
                            onChangeText={(email) => this.setState({email})}/>
                    </Item>
                    <Item rounded style={StyleSheet.flatten(styles.item)}>
                        <Icon active name='md-unlock' style={{color: 'rgba(255,255,255,0.7)'}}/>
                        <Input placeholder='Password'
                            secureTextEntry={true}
                            style={{color: '#fff'}}
                            placeholderTextColor='rgba(255,255,255,0.7)'
                            onChangeText={(password) => this.setState({password})}/>
                    </Item>
                    <Button light full rounded
                        style={StyleSheet.flatten(styles.button)}
                        onPress={() => this.login()}>
                        <Text style={styles.loginButton}>Log In</Text>
                    </Button>
                    <Text style={styles.middle}>__________ OR __________</Text>
                    <Button light full rounded iconLeft 
                        style={StyleSheet.flatten(styles.button)}
                        onPress={() => this.facebookLogin()}>
                        <Icon active name='logo-facebook' style={{color: '#3b5998'}}/>                        
                        <Text style={{color: '#3b5998'}}>Log in with Facebook</Text>
                    </Button>
                    <Button light full rounded iconLeft 
                        style={StyleSheet.flatten(styles.button)}
                        onPress={() => this.googleLogin()}>
                        <Icon active name='logo-google' style={{color: '#db3236'}}/>                        
                        <Text style={{color: '#db3236'}}>Log in with Google</Text>
                    </Button>

                </Image>
                <Footer>
                    <FooterTab>
                        <Button full style={StyleSheet.flatten(styles.footer)}
                            onPress={() => this.props.navigator.replace({name: 'Signup'})}>
                            <Text style={{color: '#fff'}}>Don't have an account? Sign up.</Text>
                        </Button>
                    </FooterTab>
                </Footer>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    resizeMode: 'cover',
    padding: 30,
    width: null,
    // height: null
  },
  title: {
    resizeMode: 'contain',
    height: 80,
    marginBottom: 30
  },
  item: {
      marginBottom: 10,
      backgroundColor: 'rgba(255,255,255,0.3)'
  },
  button: {
      marginBottom: 10
  },
  loginButton: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00BCD4'
  },
  middle:{
    color: '#f9f9f9',
    fontWeight: 'bold',
    marginBottom: 10
  },
  footer: {
    backgroundColor: '#146DC1'
  }
  
});

module.exports = loginView;
