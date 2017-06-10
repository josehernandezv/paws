'use strict'

import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Image,
    Dimensions,
    AsyncStorage 
} from 'react-native';

import { 
    Container,
    Content,
    Card,
    CardItem, 
    Thumbnail, 
    Text, 
    Button,
    Icon,
    Left,
    Body
} from 'native-base';

const deviceWidth = Dimensions.get('window').width;

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
                    <Card style={{ flex: 0 }}>
                        <CardItem>
                            <Left>
                                <Thumbnail square source={require('../images/logo.png')} />
                                <Body>
                                    <Text>Welcome to Paws</Text>
                                    <Text note>The best pet care app</Text>
                                </Body>
                            </Left>
                        </CardItem>
                        <CardItem>
                            <Body>
                                <Image style={{ resizeMode: 'stretch', height: 150, width:(deviceWidth - 60) }} source={require('../images/pets3.jpg')} />
                                <Text>
                                    Hello {this.state.user.username}, welcome to Paws, you haven't added any pets yet, Click below to add your first pet to the app.
                                </Text>
                                <Button rounded style={StyleSheet.flatten(styles.button)}
                                onPress={() => this.props.navigator.replace({name: 'SearchAnimals',title: 'Add new pet',passProps: {}})}>
                                    <Icon name="md-add-circle" />
                                    <Text>Add a pet</Text>
                                </Button>
                            </Body>
                        </CardItem>
                   </Card>
                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    padding: 20,
    backgroundColor: '#F5FCFF',
    paddingTop: 80
  },
  welcome: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00BCD4'
  },
  button: {
    marginTop: 20,
    backgroundColor: '#009688'
  }
});

module.exports = firstView;