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

class signupView extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            email: '' ,
            username: '',
            password: '',
            confirmPassword: ''
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

    async signup() {
        var self = this;
        if (this.state.password == this.state.confirmPassword) {
            if (this.state.username) {
                try {
                    await firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password);
                    await firebase.database().ref('users/' + firebase.auth().currentUser.uid).set({
                        id:  firebase.auth().currentUser.uid,
                        email: this.state.email,
                        username: this.state.username
                    });
                    self.props.navigator.replace({
                        name: 'Main',
                        passProps: { user: {
                            email: this.state.email,
                            username: this.state.name
                        }} 
                    });                  
                } catch (error) {
                    self.showToast(error.message)
                }             
                    
            } else {
                self.showToast('Username can\'t be empty ')
            }
        } else {
            self.showToast('Passwords must match');
        }
    }

    async facebookSignup() {
        var self = this;
        FBLoginManager.loginWithPermissions(['email'], (error, data) => {
            if (!error) {
                const credential = firebase.auth.FacebookAuthProvider.credential(data.credentials.token);
                firebase.auth().signInWithCredential(credential).then(function() {
                    var profile = JSON.parse(data.profile);
                    firebase.database().ref("users").orderByChild("email").equalTo(profile.email).once("value").then(function(snapshot) {
                        if (snapshot.exists()) {
                            self.props.navigator.replace({
                                name: 'Main',
                                passProps: { user: {
                                    email: profile.email,
                                    username: profile.first_name
                                }} 
                            });
                        } else {
                            try {
                                 firebase.database().ref('users/' + firebase.auth().currentUser.uid).set({
                                    id:  firebase.auth().currentUser.uid,
                                    email: profile.email,
                                    username: profile.first_name
                                });
                                self.props.navigator.replace({
                                    name: 'Main',
                                    passProps: { user: {
                                        email: profile.email,
                                        username: profile.first_name
                                    }} 
                                });              
                            } catch (error) {
                                self.showToast(error.message)
                            }             
                        }
                    });



                }).catch(function(error) {
                    self.showToast(error);
                });
            } else {
                console.log(error, data);
            }
        });

    }

    async googleSignup() {
        var self = this;
        await GoogleSignIn.configure({
            clientID: '804759165602-qim4grv81neao38olojij9lnin9gdhna.apps.googleusercontent.com',
            scopes: ['openid', 'email', 'profile'],
            shouldFetchBasicProfile: true,
            serverClientID: '804759165602-qim4grv81neao38olojij9lnin9gdhna.apps.googleusercontent.com'
        });
        const user = await GoogleSignIn.signInPromise();
        var credential = firebase.auth.GoogleAuthProvider.credential(user.idToken);

        firebase.auth().signInWithCredential(credential).then(function() {
            firebase.database().ref("users").orderByChild("email").equalTo(user.email).once("value").then(function(snapshot) {
                if (snapshot.exists()) {
                    self.props.navigator.replace({
                        name: 'Main',
                        passProps: { user: {
                            email: user.email,
                            username: user.givenName
                        }} 
                    });
                } else {
                    try {
                        firebase.database().ref('users/' + firebase.auth().currentUser.uid).set({
                            id:  firebase.auth().currentUser.uid,
                            email: user.email,
                            username: user.givenName
                        });
                        self.props.navigator.replace({
                            name: 'Main',
                            passProps: { user: {
                                email: user.email,
                                username: user.givenName
                            }} 
                        });              
                    } catch (error) {
                        self.showToast(error.message)
                    }             
                }
            });
        }).catch(function(error) {
            self.showToast(error);
        });
    }

    render() {
        return (
            <Container>
                <StatusBar backgroundColor="#000" barStyle="light-content"/>
                <Image style={styles.container} source={require('../images/SignupBackground.jpg')}>
                    <Image style={styles.title} source={require('../images/Title.png')}/>
                    <Item inlineLabel>
                        <Icon active name='md-mail' style={{color: 'rgba(255,255,255,0.7)'}}/>
                        <Input placeholder='E-mail'
                            placeholderTextColor='rgba(255,255,255,0.7)'
                            keyboardType='email-address'
                            style={{color: '#fff'}}
                            onChangeText={(email) => this.setState({email})}/>
                    </Item>
                    <Item inlineLabel>
                        <Icon active name='md-person' style={{color: 'rgba(255,255,255,0.7)'}}/>
                        <Input placeholder='Username'
                            placeholderTextColor='rgba(255,255,255,0.7)'
                            style={{color: '#fff'}}
                            onChangeText={(username) => this.setState({username})}/>
                    </Item>
                    <Item inlineLabel>
                        <Icon active name='md-unlock' style={{color: 'rgba(255,255,255,0.7)'}}/>
                        <Input placeholder='Password'
                            secureTextEntry={true}
                            style={{color: '#fff'}}
                            placeholderTextColor='rgba(255,255,255,0.7)'
                            onChangeText={(password) => this.setState({password})}/>
                    </Item>
                    <Item inlineLabel style={StyleSheet.flatten(styles.item)}>
                        <Icon active name='md-unlock' style={{color: 'rgba(255,255,255,0.7)'}}/>
                        <Input placeholder='Confirm Password'
                            secureTextEntry={true}
                            style={{color: '#fff'}}
                            placeholderTextColor='rgba(255,255,255,0.7)'
                            onChangeText={(confirmPassword) => this.setState({confirmPassword})}/>
                    </Item>
                    <Button light full rounded
                        style={StyleSheet.flatten(styles.button)}
                        onPress={() => this.signup()}>
                        <Text style={styles.signupButton}>Sign Up</Text>
                    </Button>
                    <Text style={styles.middle}>__________ OR __________</Text>
                    <Button light full rounded iconLeft 
                        style={StyleSheet.flatten(styles.button)}
                        onPress={() => this.facebookSignup()}>
                        <Icon active name='logo-facebook' style={{color: '#3b5998'}}/>                        
                        <Text style={{color: '#3b5998'}}>Sign in with Facebook</Text>
                    </Button>
                    <Button light full rounded iconLeft 
                        style={StyleSheet.flatten(styles.button)}
                        onPress={() => this.googleSignup()}>
                        <Icon active name='logo-google' style={{color: '#db3236'}}/>                        
                        <Text style={{color: '#db3236'}}>Sign in with Google</Text>
                    </Button>

                </Image>
                <Footer>
                    <FooterTab>
                        <Button full style={StyleSheet.flatten(styles.footer)}
                            onPress={() => this.props.navigator.replace({name: 'Login'})}>
                            <Text style={{color: '#fff'}}>Already have an account? Log in.</Text>
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
  },
  button: {
      marginBottom: 10
  },
  signupButton: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#E65100'
  },
  middle:{
    color: '#f9f9f9',
    fontWeight: 'bold',
    marginBottom: 10
  },
  footer: {
    backgroundColor: '#EF8D32'
  }
  
});

module.exports = signupView;
