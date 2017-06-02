'use strict'

import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Image,
    StatusBar,
    Alert,
    TouchableHighlight,
    TextInput
} from 'react-native';

import { 
    Container,
    Content,
    Drawer,
    Text,
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
    Toast,
    Item,
    Input
} from 'native-base';

const firebase = require('../database/firebase');

class searchAnimalsView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            animals: [],
            filteredAnimals: [],
            searchingDogs: true
        };
    }

    componentDidMount() {
        this.getDogs();
    }

    showToast(message) {
        Toast.show({
            supportedOrientations:['portrait','landscape'],
            text: message,
            position: 'bottom',
            buttonText: 'Ok'
        })
    }

     insertAnimal(){
        var self = this;
        try {
            var newAnimal = firebase.database().ref("animals/dogs/").push();

            newAnimal.set({
                specie: 'dog',
                breed: '',
                description: '',
                height: {
                    female: {
                        min: 55,
                        max: 60
                    },
                    male: {
                        min: 60,
                        max: 65
                    }
                },
                imgUrl: '',
                lifeSpan: {
                    min: 9,
                    max: 13
                },
                reference: '',
                weight: {
                    female: {
                        min: 22,
                        max: 32
                    },
                    male: {
                        min: 30,
                        max: 40
                    }
                }
            });
        } catch (error) {
            self.showToast(error.message);
        }
    }

    getDogs() {
        var self = this;
        this.setState({searchingDogs: true});
        try {
            firebase.database().ref("animals/dogs").orderByChild("breed").once("value",function(snapshot) {

                var dogs = [];
                snapshot.forEach(function(child) {
                dogs.push({
                        key: child.key,
                        specie: child.val().specie,
                        breed: child.val().breed,
                        description: child.val().description,
                        height: {
                            female: {
                                min: child.val().height.female.min,
                                max: child.val().height.female.max
                            },
                            male: {
                                min: child.val().height.male.min,
                                max: child.val().height.male.min
                            }
                        },
                        imgUrl: child.val().imgUrl,
                        lifeSpan: {
                            min: child.val().lifeSpan.min,
                            max: child.val().lifeSpan.max
                        },
                        reference: child.val().reference,
                        weight: {
                            female: {
                                min: child.val().weight.female.min,
                                max: child.val().weight.female.max
                            },
                            male: {
                                min: child.val().weight.male.min,
                                max: child.val().weight.male.max
                            }
                        }
                    })
                });
                self.setState({animals: dogs, filteredAnimals: dogs});


            });
        } catch (error) {
            self.showToast(error.message);
        }
    }

    getCats(){
        var self = this;
        this.setState({searchingDogs: false});        
        try {
            firebase.database().ref("animals/cats").once("value", function(snapshot){
                self.setState({animals: snapshot.val(), filteredAnimals: snapshot.val()})
            });
        } catch (error) {
            self.showToast(error.message);
        }
    }
  

    pressed(animal){
        this.props.navigator.push({
            name: 'Details',
            title: animal.breed,
            passProps: {animal: animal}
        });
    }

    filter(searchText) {
        var text = searchText.toLowerCase();
        var filteredAnimals = this.state.animals.filter( (animal) => {
            var a = animal.breed.toLowerCase();
            return a.search(text) !== -1;
        });
        this.setState({filteredAnimals: filteredAnimals})
    }

    render() {
        var self = this;
        return (
             <Container style={StyleSheet.flatten(styles.container)}>
                <Content>
                    <Item searchBar rounded style={{marginLeft: 10, marginRight: 10, marginBottom: 20, backgroundColor: '#fff'}} >
                        <Icon name="md-search" style={{ color: 'gray'}}/>
                        <Input placeholder="Search" onChangeText={(searchText) => this.filter(searchText)}/>
                    </Item>
                    
                    <List dataArray={this.state.filteredAnimals} renderRow={animal =>
                        <ListItem onPress={() => this.pressed(animal)}>
                            <Thumbnail square style={StyleSheet.flatten(styles.thumbnail)} source={{uri: animal.imgUrl}} />
                            <Body>
                                <Text >{animal.breed}</Text>
                                <Text note numberOfLines={4}>{animal.description}</Text>
                            </Body>
                          
                        </ListItem>
                         }
                    />
                </Content>
                    <Footer>
                        <FooterTab style={StyleSheet.flatten(styles.footer)}>
                            <Button style={StyleSheet.flatten(styles.footerButton)} onPress={() => this.getDogs()} active={this.state.searchingDogs}>
                                <Text style={this.state.searchingDogs ? StyleSheet.flatten(styles.active) : StyleSheet.flatten(styles.inactive)}>
                                    Dogs
                                </Text>
                            </Button>
                            <Button style={StyleSheet.flatten(styles.footerButton)} onPress={() => this.getCats()} active={!this.state.searchingDogs}>
                                <Text style={!this.state.searchingDogs ? StyleSheet.flatten(styles.active) : StyleSheet.flatten(styles.inactive)}>
                                    Cats
                                </Text>
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
    backgroundColor: '#F5FCFF',
    paddingTop: 80
  },
  thumbnail: {
      width: 100,
      height: 100
  },
  footer: {
      backgroundColor: '#F5FCFF'
  },
  footerButton: {
    backgroundColor: '#F5FCFF'
  },
  inactive: {
    color: '#90A4AE'
  },
  active: {
    color: '#263238'
  }
});

module.exports = searchAnimalsView;

