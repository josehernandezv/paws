'use strict'

import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    StatusBar,
    Alert
} from 'react-native';

import { 
    Container,
    Content,
    Drawer,
    Header,
    Button,
    Icon,
    Footer,
    FooterTab,
    Badge,
    List,
    ListItem,
    Thumbnail,
    Body,
    Toast
} from 'native-base';

import SearchBar from 'react-native-searchbar';

const firebase = require('../database/firebase')
console.ignoredYellowBox = ['Setting a timer'];

class dogsDescriptionView extends Component {

    constructor(props) {
        super(props);
        this.passProps = this.props.route.passProps
    }


    render() {
        var self = this;
        return (
             <Container style={StyleSheet.flatten(styles.container)}>
                <Content>
                  <View>
                    {/*<Image source={{uri: this.passProps.animal.Thumbnail.path+'.jpg'}}/>*/}
                    <Text>{this.passProps.animal.description}</Text>
                    
                  </View>

                </Content>
                   
            </Container>
            
        )
    }


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    paddingTop: 80
  },
  welcome: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00BCD4'
  },
  t_title: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
  header: {
  	backgroundColor: '#009688'
  },
  headerSection: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 20,
    paddingRight: 20
  },
  headerIcon: {
    color: '#fff',
  }
});

module.exports = dogsDescriptionView;