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
    Body,
    Spinner,
    DeckSwiper
} from 'native-base';

const firebase = require('../database/firebase')


const deviceWidth = Dimensions.get('window').width;

class firstView extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            user: {},
            pets: [],
            isLoaded: false,
            hasPets: false
        };
    }

    componentDidMount() {
        this.getData().done()
    }

    async getData() {
        var user = {};
        var pets = [];
        var self = this;
        var hasPets = false;
        try {
            const value = await AsyncStorage.getItem('@PawsStore:user');
            if (value !== null){
                var user = JSON.parse(value)
            }
        } catch (error) {
        }

        firebase.database().ref("pets").orderByChild("userId").equalTo(user.id).once("value",async function(snapshot) {

            snapshot.forEach(function(child) {
                var pet = child.val()
                pet.id = child.key
                pets.push(pet)
            });

           if (pets.length > 0) {
               hasPets= true;
           } else {
               hasPets = false;
           }      

            self.setState({user: user, isLoaded: true, hasPets: hasPets, pets: pets})
           
        });

    }

    renderLoadingView() {
        return (
            <Container style={StyleSheet.flatten(styles.container)}>
                <Content>
                    <Spinner color='#009688' />
                </Content>
            </Container>
        );
    }
    

    render() {
        if (!this.state.isLoaded) {
            return this.renderLoadingView();
        } else if (this.state.hasPets) {
            return (
                <Container style={StyleSheet.flatten(styles.container)}>
                    
                        <Card style={{ flex: 0 }}>
                            <CardItem>
                                <Left>
                                    <Thumbnail square source={require('../images/logo.png')} />
                                    <Body>
                                        <Text>Welcome back {this.state.user.username}</Text>
                                        <Text note>Check on your pets</Text>
                                    </Body>
                                </Left>
                            </CardItem>
                        </Card>
                        <View>
                        <DeckSwiper
                            dataSource={this.state.pets}
                            renderItem={pet =>
                                <Card style={{ elevation: 4 }}>
                                    <CardItem>
                                        <Left>
                                            <Body>
                                                <Text>{pet.name}</Text>
                                                <Text note>{pet.specie}</Text>
                                            </Body>
                                        </Left>
                                    </CardItem>
                                    <CardItem cardBody>
                                        <Image style={{ resizeMode: 'stretch', height: 200, width:(deviceWidth - 60) }} source={{uri:pet.imgUrl}} />
                                    </CardItem>
                                    <CardItem>
                                        <Icon name="heart" style={{ color: '#ED4A6A' }} />
                                        <Text>{pet.name}</Text>
                                    </CardItem>
                                </Card>
                            }
                        />
                        </View>
                 
                </Container>
            );
        } else {
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
