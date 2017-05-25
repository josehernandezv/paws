'use strict'

import React, { Component } from 'react';
import {
    View,
    Text,
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
            text: '',
            search: ''
        };
        
        this.getAnimals();
        this.getCats();
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

    getAnimals() {
        var self = this;
        try {
            firebase.database().ref("animals/dogs").once("value",function(snapshot) {
                // self.showToast(snapshot.child().breed);
                // console.log(snapshot.val())
                self.setState({animals: snapshot.val()})
                //  self.props.navigator.replace({
                //     name: 'Main',
                //     passProps: { user: snapshot.val()} 
                // });
            });
        } catch (error) {
            self.showToast(error.message);
        }
    }

    getCats(){
        var self = this;
        try {
            firebase.database().ref("animals/cats").once("value", function(snapshot){
                self.setState({animals: snapshot.val()})
            });
        } catch (error) {
            self.showToast(error.message);
        }
    }

    // onBreedPressed(animal){
    //     this.props.navigator.push({
    //         name: 'details',
    //         Breed: animals.breed,
    //         passProps: {animals: animal}
    //     });
    // }

    pressed(animal){
        this.props.navigator.push({
            name: 'Details',
            tittle: animal.breed,
            passProps: {animal: animal}
        });
        //Alert.alert("adadsdd", "adsasd "+animal.breed);
    }

    // filterSearch(text){
    //     const newData = data.filter(function (item){
    //         const itemData = item.breed
    //         const textData = text
    //         return itemData.indexOf(textData) > -1
    //     })
    //     this.setState({
    //         dataSource: this.state.dataSource.cloneWithRows(newData),
    //         text: text
    //     })
    // }

    updateSearch(event){
        this.setState({
            search: event.target.value.substr(
                0,20
            )});
    }

    render() {
        var self = this;
        // let filteredAnimals = this.props.filter(
        //     (animal) => {
        //         return animal.breed.toLowerCase().indexOf(this.state.search) !== -1;
        //     }
        // );
        return (
             <Container style={StyleSheet.flatten(styles.container)}>
                <Content>
                    <View>
                        {/*<Input type="text" value={this.state.search} onChange={this.updateSearch.bind(this)}/>*/}
                    {/*<TextInput onChangeText={(text) => this.filterSearch(text)}
                        value={this.state.text}
                        />
                        <SearchBar
                            onSearchChange={() => this.search(text)}
                            height={50}
                            onFocus={() => console.log('On Focus')}
                            onBlur={() => console.log('On Blur')}
                            placeholder={'Search...'}
                            autoCorrect={false}
                            padding={5}
                            returnKeyType={'search'}
                            />

                        <Header searchBar rounded>
                            <Item>
                                <Icon name="ios-search" />
                                <Input placeholder="Search" />
                                <Icon name="ios-people" />
                            </Item>
                            <Button transparent>
                                <Text>Search</Text>
                            </Button>
                        </Header>*/}
                    <List dataArray={this.state.animals} renderRow={animal =>
                        
                        <ListItem onPress={() => this.pressed(animal)}>
                                    
                            <Thumbnail square size={80} source={require('../images/akita.jpg')} />
                                
                            <Body>
                                <Text>{animal.breed}</Text>
                                <Text note>{animal.description}</Text>
                            </Body>
                          
                        </ListItem>
                         }
                        
                    />
                   </View>
                </Content>
                    <Footer>
                        <FooterTab>
                            <Button onPress={() => this.getAnimals()}>
                                <Text>Dogs</Text>
                            </Button>
                            <Button onPress={() => this.getCats()}>
                                <Text>Cats</Text>
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





    // insertAnimal(){
    //     var self = this;
    //     try {
    //         firebase.database().ref("animals/dogs/" + 1).set({
    //             id: 1,
    //             specie: 'dog',
    //             breed: '',
    //             description: '',
    //             height: {
    //                 female: {
    //                     min: 55,
    //                     max: 60
    //                 },
    //                 male: {
    //                     min: 60,
    //                     max: 65
    //                 }
    //             },
    //             imgUrl: '',
    //             lifeSpan: {
    //                 min: 9,
    //                 max: 13
    //             },
    //             reference: '',
    //             weight: {
    //                 female: {
    //                     min: 22,
    //                     max: 32
    //                 },
    //                 male: {
    //                     min: 30,
    //                     max: 40
    //                 }
    //             }
    //         });
    //     } catch (error) {
    //         self.showToast(error.message);
    //     }
    // }