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


class notificationsView extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Container style={StyleSheet.flatten(styles.container)}>
                <Content>
                    <Text style={styles.welcome}>
                        Notifications
                    </Text>
                    <Text style={styles.welcome}>
                        Notifications
                    </Text>
                    <Text style={styles.welcome}>
                        Notifications
                    </Text>
                    <Text style={styles.welcome}>
                        Notifications
                    </Text>
                    <Text style={styles.welcome}>
                        Notifications
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

module.exports = notificationsView;