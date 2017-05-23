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
    Drawer,
    Header,
    Button,
    Icon,
    Footer,
    FooterTab,
    Badge
} from 'native-base';

class searchAnimalsView extends Component {

    constructor(props) {
        super(props);
        
    }

    render() {
        var self = this;
        return (
             <Container style={StyleSheet.flatten(styles.container)}>
                <Content>
                </Content>
                    <Footer>
                        <FooterTab>
                            <Button>
                                <Text>Apps</Text>
                            </Button>
                            <Button>
                                <Text>Camera</Text>
                            </Button>
                            <Button active>
                                <Text>Navigate</Text>
                            </Button>
                            <Button>
                                <Text>Contact</Text>
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

module.exports = searchAnimalsView;