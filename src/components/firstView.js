'use strict'

import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';

import { 
    Container,
    Content
} from 'native-base';


class firstView extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            user: this.props.route.passProps.user
        };
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