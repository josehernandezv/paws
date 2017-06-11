'use strict'

import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    AsyncStorage,
    Alert
} from 'react-native';

import { 
    Container,
    Content
} from 'native-base';


class firstView extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            user: {
                username: '',
                email: '',
                id: ''
            }
        };
        this.getUser()
    }

    componentDidMount() {
        
        this.getUser().done()
    }

    async getUser() {
        try {
            const value = await AsyncStorage.getItem('@PawsStore:user');
            console.log(value)
            if (value !== null){
                var user = JSON.parse(value)
                this.setState({user})
            }
        } catch (error) {
            
        }
    }
    

    render() {
        return (
            <Container style={StyleSheet.flatten(styles.container)}>
                <Content>
                    <Text style={styles.welcome}>
                        Welcome {this.state.user.username}
                        
                    </Text>
                </Content>
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
    paddingTop: 80
  },
  welcome: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00BCD4'
  }
});

module.exports = firstView;