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
    Content
} from 'native-base';


class mainView extends Component {

    constructor(props) {
        super(props);
        this.user = this.props.route.passProps.user;
    }

    render() {
        return (
            <Container>
                <Content>
                    <View style={styles.container}>
                        <Text style={styles.welcome}>
                            Welcome {this.user.username}
                        </Text>
                    </View>
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
    backgroundColor: '#F5FCFF'
  },
  welcome: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00BCD4'
  }
});

module.exports = mainView;
