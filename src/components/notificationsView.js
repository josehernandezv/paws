'use strict'

import React, { Component } from 'react';

import { Switch, Text, View, StyleSheet, AsyncStorage, Alert } from 'react-native';

import { Container, Content, List, ListItem, Thumbnail, Right, Left, Body, H4, Toast } from 'native-base';

const Nutrition = require('./notifications/nutritionView');
const Bath = require('./notifications/bathView');
const MedicalCare = require('./notifications/medicalCareView');
const PhysicalActivity = require('./notifications/physicalActivityView');
const DigestiveNecessities = require('./notifications/digestiveNecessitiesView');
const Hair = require('./notifications/hairCareView');

const firebase = require('../database/firebase');

class notificationsView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            falseSwitchIsOnNutrition: false,
            falseSwitchIsOnMedical: false,
            falseSwitchIsOnPhysical: false,
            falseSwitchIsOnDigestive: false,
            falseSwitchIsOnHair: false,
            falseSwitchIsOnBath: false,
            pet: {}
        }
    }

    componentDidMount() {
        this.getPet().done()
        this.getNotificationState().done();
    }

    async getNotificationState(){
        var self = this;
        try {
            //Alert.alert("adadsd " + self.state.pet.id)
            firebase.database().ref("notifications").orderByChild("petId").once("value", function(snapshot){
            snapshot.forEach(function(child){
                if(self.state.pet.id !== 'undifined' && self.state.pet.id === child.val().petId){
                    // Alert.alert("adadsd " + child.val().medical.state + " pet: " +child.val().petId)
                    // Alert.alert("petid " + self.state.pet.id)
                    child.key,
                    self.setState({falseSwitchIsOnBath: child.val().bath.state}),
                    self.setState({falseSwitchIsOnDigestive: child.val().digestive.state}),
                    self.setState({falseSwitchIsOnHair: child.val().hair.state}),
                    self.setState({falseSwitchIsOnMedical: child.val().medical.state}),
                    self.setState({falseSwitchIsOnNutrition: child.val().nutrition.state}),
                    self.setState({falseSwitchIsOnPhysical: child.val().physical.state})
                    
                }
                
                    // this.state.falseSwitchIsOnBath = child.val().bath.state,
                    // this.state.falseSwitchIsOnDigestive = child.val().digestive.state,
                    // this.state.falseSwitchIsOnHair = child.val().hair.state,
                    // this.state.falseSwitchIsOnMedical = child.val().medical.state,
                    // this.state.falseSwitchIsOnNutrition = child.val().nutrition.state,
                    // this.state.falseSwitchIsOnPhysical = child.val().physical.state
                
            });
        });
            
        } catch (error) {
            
        }
        
    }

    async getPet() {
        try {
            const value = await AsyncStorage.getItem('@PawsStore:pet');
            if (value !== null){
                var pet = JSON.parse(value)
                this.setState({pet})
            }
        } catch (error) {
        }
    }

    

    showToast(message) {
        Toast.show({
            supportedOrientations:['portrait','landscape'],
            text: message,
            position: 'bottom',
            buttonText: 'Ok'
        })
    }

    updateNotificationState(value, type) {
        
        var self = this;
        firebase.database().ref("notifications").orderByChild("petId").equalTo(self.state.pet.id).on("child_added",function(snapshot) {
            console.log(snapshot.key)
            firebase.database().ref("notifications/" + snapshot.key + "/" + type).set({
                state: value
            })
        });
        
    }

    render() {
        return (
            <Container style={StyleSheet.flatten(styles.container)}>
            <Content>

            <List> 

            <ListItem 
                        onPress={() => this.props.navigator.push({
                            name: 'Nutrition',
                            title: 'Nutrition Notifications',
                            passProps: { state: this.state.falseSwitchIsOnNutrition }
                        })}>
            <Left>
            <Thumbnail square source={require('../images/nutrition.png')}/>
            </Left>
            <Body style={{marginLeft: -110}}>
            <Text style={{fontWeight: 'bold', fontSize: 17}}>Nutrition</Text>
            <Text note numberOfLines={2}>Range of hydration periods</Text>
            </Body>
            <Right>
            <Switch onValueChange={(value) => {
                this.updateNotificationState(value, 'nutrition')
                this.setState({falseSwitchIsOnNutrition: value})
            }}
            style={{marginBottom: 10}}
            value={this.state.falseSwitchIsOnNutrition}
             />
            </Right>
            </ListItem>

            <ListItem 
                        onPress={() => this.props.navigator.push({
                            name: 'MedicalCare',
                            title: 'Medical Care Notifications',
                            passProps: {}
                        })}>
            <Left>
            <Thumbnail square source={require('../images/medicalcare.png')}/>
            </Left>
            <Body style={{marginLeft: -110}}>
            <Text style={{fontWeight: 'bold', fontSize: 17}}>Medical Care</Text>
            <Text note numberOfLines={2}>Schedule notifications for your pet's checkups</Text>
            </Body>
            <Right>
            <Switch onValueChange={(value) => {
                this.updateNotificationState(value, 'medical')
                this.setState({falseSwitchIsOnMedical: value})
            }}
            style={{marginBottom: 10}}
            value={this.state.falseSwitchIsOnMedical} />
            </Right>
            </ListItem>

             <ListItem 
                        onPress={() => this.props.navigator.push({
                            name: 'PhysicalActivity',
                            title: 'Physical Activity Notifications',
                            passProps: {}
                        })}>
            <Left>
            <Thumbnail square source={require('../images/physicalactivity.png')}/>
            </Left>
            <Body style={{marginLeft: -110}}>
            <Text style={{fontWeight: 'bold', fontSize: 17}}>Physical Activity</Text>
            <Text note numberOfLines={2}>Allow your pet to release energy</Text>
            </Body>
            <Right>
            <Switch onValueChange={(value) => {
                this.updateNotificationState(value, 'physical')
                this.setState({falseSwitchIsOnPhysical: value})
            }}
            style={{marginBottom: 10}}
            value={this.state.falseSwitchIsOnPhysical} />
            </Right>
            </ListItem>

             <ListItem 
                        onPress={() => this.props.navigator.push({
                            name: 'DigestiveNecessities',
                            title: 'Digestive Necessities Notifications',
                            passProps: {}
                        })}>
            <Left>
            <Thumbnail square source={require('../images/digestivenecessities.png')}/>
            </Left>
            <Body style={{marginLeft: -110}}>
            <Text style={{fontWeight: 'bold', fontSize: 17}}>Digestive Necessities</Text>
            <Text note numberOfLines={2}>Schedule potty rides</Text>
            </Body>
            <Right>
            <Switch onValueChange={(value) => {
                this.updateNotificationState(value, 'digestive')
                this.setState({falseSwitchIsOnDigestive: value})
            }}
            style={{marginBottom: 10}}
            value={this.state.falseSwitchIsOnDigestive} />
            </Right>
            </ListItem>

             <ListItem 
                        onPress={() => this.props.navigator.push({
                            name: 'Hair',
                            title: 'Hair Care Notifications',
                            passProps: {}
                        })}>
            <Left>
            <Thumbnail square source={require('../images/haircare.png')}/>
            </Left>
            <Body style={{marginLeft: -110}}>
            <Text style={{fontWeight: 'bold', fontSize: 17}}>Hair Care</Text>
            <Text note numberOfLines={2}>Schedule hair routines on a range of periods</Text>
            </Body>
            <Right>
            <Switch onValueChange={(value) => {
                this.updateNotificationState(value, 'hair')
                this.setState({falseSwitchIsOnHair: value})
            }}
            style={{marginBottom: 10}}
            value={this.state.falseSwitchIsOnHair} />
            </Right>
            </ListItem>

             <ListItem 
                        onPress={() => this.props.navigator.push({
                            name: 'Bath',
                            title: 'Bath Notifications',
                            passProps: {}
                        })}>
            <Left>
            <Thumbnail square source={require('../images/bath.png')}/>
            </Left>
            <Body style={{marginLeft: -110}}>
            <Text style={{fontWeight: 'bold', fontSize: 17}}>Bath</Text>
            <Text note numberOfLines={2}>Plan a bath schedule so your pet won't stink</Text>
            </Body>
            <Right>
            <Switch onValueChange={(value) => {
                this.updateNotificationState(value, 'bath')
                this.setState({falseSwitchIsOnBath: value})
            }}
            style={{marginBottom: 10}}
            value={this.state.falseSwitchIsOnBath} />
            </Right>
            </ListItem>

            </List>
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
    }
});

module.exports = notificationsView;