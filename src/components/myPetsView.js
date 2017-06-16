'use strict'

import React, { Component } from 'react';

import { View, Text, StyleSheet, AsyncStorage, Image, Dimensions, Alert } from 'react-native';

import { Container, Content, List, Item, ListItem, CheckBox, Header, 
	Button, Title, Right, Left, Body, Icon, Footer, Input, Fab, Toast, 
    Card, CardItem, Spinner, Thumbnail } 
    from 'native-base';

    import { Col, Row, Grid } from 'react-native-easy-grid';

 //   const formAddNewPet = require('./formAddNewPet');
 const firebase = require('../database/firebase');
 const deviceWidth = Dimensions.get('window').width;
 const deviceHeight = Dimensions.get('window').height;

 export default class myPetsView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: {},
            pets: [],
            isLoaded: false,
        };
    }

    componentDidMount() {
        this.getData().done();
    }

    async getData() {
        var user = {};
        var pets = [];
        var self = this;
        try {
            const value = await AsyncStorage.getItem('@PawsStore:user');
            if (value !== null){
                user = JSON.parse(value)
            }
        } catch (error) {
        }

        await firebase.database().ref("pets").orderByChild("userId").equalTo(user.id).once("value",async function(snapshot) {

            snapshot.forEach(function(child) {
                var pet = child.val()
                pet.id = child.key
                pets.push(pet)
            });

            self.setState({user: user, isLoaded: true, pets : pets}) 

        });
    }


    showToast(message) {
        Toast.show({
            supportedOrientations:['portrait','landscape'],
            text: message,
            position: 'bottom',
            buttonText: 'Ok'
        })
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

         deletePet (chosenPet) {
         var self = this;
         Alert.alert('Confirm Delete...', 'Are you sure you want to delete this pet?',
            [ 
               {text: 'Yes', onPress: () => {
                     try {
                             firebase.database().ref("pets/" + chosenPet.id).remove();
                             Alert.alert('Success', 'Pet successfully deleted!',
                             [
                                 {text: 'OK', onPress: () => self.props.navigator.replace({
                                 name: 'MyPets',
                                 title: 'My Pets',
                                 passProps: {}
                             })}
                             ])
                     } catch (error) {
                         self.showToast(error.message);
                     }
               }},
               {text: 'No'}
             ]
          )

     }

    render() {
        if (!this.state.isLoaded) {
            return this.renderLoadingView();
        }
        return (
            <Container style={StyleSheet.flatten(styles.container)}>
            <Content style={StyleSheet.flatten(styles.contentStyle)} >

            {this.state.pets.map((pet) => 

                <Card key={pet.id} style={{ flex: 0}}>
                <CardItem>
                <Left>
                <Body>
                <Text style={{fontWeight: 'bold', fontSize: 18}}>{pet.name}</Text>
                </Body>
                </Left>
                </CardItem>
                <CardItem>
                <Body>
                <Image style={{resizeMode: 'stretch', height: (deviceHeight - 470), width:(deviceWidth - 85) }} source={{uri: pet.imgUrl}} />
                </Body>
                </CardItem>
                <CardItem>
                <Grid>
                        <Row>
                        <Col><Text style={{fontWeight: 'bold'}}>Age:</Text></Col>
                        <Col><Text>{pet.age.years} years {pet.age.months} months</Text></Col>
                        </Row>
                        <Row style={{marginTop: 2}}>
                        <Col><Text style={{fontWeight: 'bold'}}>Gender:</Text></Col>
                        <Col><Text>{pet.gender}</Text></Col>
                        </Row>
                        <Row style={{marginTop: 2}}>
                        <Col><Text style={{fontWeight: 'bold'}}>Height:</Text></Col>
                        <Col><Text>{pet.height}</Text></Col>
                        </Row>
                        <Row style={{marginTop: 2}}>
                        <Col><Text style={{fontWeight: 'bold'}}>Weight:</Text></Col>
                        <Col><Text>{pet.weight}</Text></Col>
                        </Row>
                </Grid> 
                </CardItem>
                <CardItem>
                <Grid>
               
                <Right>
                 <Row>
                 
                 <Button transparent style={{marginRight: 20}}>
                 <Icon name="md-create" style={StyleSheet.flatten(styles.baseColor)}
                 onPress={() => this.props.navigator.push({
                     name: 'FormAddPet',
                     title: 'Edit Pet Info',
                     passProps: {pet: pet},
                     callback: this.callback.bind(this),
                     refreshList: this.props.route.refreshList
                 })}/>
                 </Button>
                   
                 <Button transparent>
                 <Icon name="md-trash" style={{color: '#b22222', fontSize: 30}} 
                 onPress={() => this.deletePet(pet)}/>
                 </Button>
                 
                 </Row>

                 </Right>
                 </Grid> 

                </CardItem>
                </Card>
                )}
            </Content>

            </Container>
            );
}
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
        paddingTop: 80,
    },
    header: {
        backgroundColor: '#009688'
    },
    contentStyle: {
        padding: 20,
        backgroundColor: '#F5FCFF'
    },
    cardStyle: {
        flex: 0
    },
    baseColor: {
        color: '#009688', 
        fontSize: 30
    }
});

module.exports = myPetsView;       