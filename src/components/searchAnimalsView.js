'use strict'

import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Image,
} from 'react-native';

import { 
    Container,
    Content,
    Text,
    Button,
    Input,
    Icon,
    Footer,
    FooterTab,
    List,
    ListItem,
    Thumbnail,
    Body,
    Toast,
    Item,
    Spinner 
} from 'native-base';

const firebase = require('../database/firebase');

class searchAnimalsView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            animals: [],
            filteredAnimals: [],
            searchingDogs: true,
            isLoaded: false
            
        };
    }

    componentDidMount() {
        this.getAnimals('dogs');
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
                specie: 'Dog',
                breed: 'Chihuahua',
                description: 'The Chihuahua is the smallest breed of dog and is named for the state of Chihuahua in Mexico. Chihuahuas come in a wide variety of sizes, head shapes, colors, and coat lengths. The Chihuahua is a tiny but confident dog that loves giving and receiving attention. Despite its petite and fragile appearance, the breed is quite bold and can even be considered brazen. Its wide eyes and big ears are quite possibly its best-known features.',
                height: {
                    female: {
                        min: 15.2,
                        max: 20.3
                    },
                    male: {
                        min: 15.2,
                        max: 22.9
                    }
                },
                imgUrl: 'https://fthmb.tqn.com/zy2PrI9CvR8f98_RBMVX8y_gL_w=/960x0/filters:no_upscale()/about/twenty20_f84c633e-705e-4bf8-a724-00cdea750d8d-590b51893df78c92837b18d6.jpg',
                lifeSpan: {
                    min: 15,
                    max: 20
                },
                reference: "https://en.wikipedia.org/wiki/Chihuahua_(dog)",
                weight: {
                    female: {
                        min: 1.5,
                        max: 3
                    },
                    male: {
                        min: 1.5,
                        max: 3
                    }
                }
            });
        } catch (error) {
            self.showToast(error.message);
        }
    }

    getAnimals(specie) {
        var self = this;
        this.setState({searchingDogs: (specie == 'dogs'), isLoaded:false});
        try {
            firebase.database().ref("animals/" + specie).orderByChild("breed").once("value",function(snapshot) {

                var animals = [];
                snapshot.forEach(function(child) {
                animals.push({
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
                                max: child.val().height.male.max
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
                self.setState({animals: animals, filteredAnimals: animals, isLoaded:true});
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
        return (
             <Container style={StyleSheet.flatten(styles.container)}>
                <Content>
                    
                    <Item searchBar rounded style={{marginLeft: 10, marginRight: 10, marginBottom: 20, backgroundColor: '#fff'}} >
                        <Icon name="md-search" style={{ color: 'gray'}}/>
                        <Input placeholder="Search" onChangeText={(searchText) => this.filter(searchText)}/>
                    </Item>
                    
                    {!this.state.isLoaded ? this.renderLoadingView() : null}
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
                            <Button style={StyleSheet.flatten(styles.footerButton)} onPress={() => this.getAnimals('dogs')} active={this.state.searchingDogs}>
                                <Text style={this.state.searchingDogs ? StyleSheet.flatten(styles.active) : StyleSheet.flatten(styles.inactive)}>
                                    Dogs
                                </Text>
                            </Button>
                            <Button style={StyleSheet.flatten(styles.footerButton)} onPress={() => this.getAnimals('cats')} active={!this.state.searchingDogs}>
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

