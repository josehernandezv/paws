'use strict'

import React, { Component } from 'react';

import { Switch, Text, View, StyleSheet } from 'react-native';

import { Container, Content, List, ListItem, Thumbnail, Right, Left, Body, H4 } from 'native-base';

const Nutrition = require('./notifications/nutritionView');
const Bath = require('./notifications/bathView');
const MedicalCare = require('./notifications/medicalCareView');
const PhysicalActivity = require('./notifications/physicalActivityView');
const DigestiveNecessities = require('./notifications/digestiveNecessitiesView');
const Hair = require('./notifications/hairCareView');


class notificationsView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            trueSwitchIsOnNutrition: true,
            falseSwitchIsOnNutrition: false,
            trueSwitchIsOnMedical: true,
            falseSwitchIsOnMedical: false,
            trueSwitchIsOnPhysical: true,
            falseSwitchIsOnPhysical: false,
            trueSwitchIsOnDigestive: true,
            falseSwitchIsOnDigestive: false,
            trueSwitchIsOnHair: true,
            falseSwitchIsOnHair: false,
            trueSwitchIsOnBath: true,
            falseSwitchIsOnBath: false
        }
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
                            passProps: {}
                        })}>
            <Left>
            <Thumbnail square source={require('../images/nutrition.png')}/>
            </Left>
            <Body style={{marginLeft: -110}}>
            <Text style={{fontWeight: 'bold', fontSize: 17}}>Nutrition</Text>
            <Text note numberOfLines={2}>Range of hydration periods</Text>
            </Body>
            <Right>
            <Switch onValueChange={(value) => this.setState({falseSwitchIsOnNutrition: value})}
            style={{marginBottom: 10}}
            value={this.state.falseSwitchIsOnNutrition} />
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
            <Text note numberOfLines={2}>Schedule notificactions for your pet's checkups</Text>
            </Body>
            <Right>
            <Switch onValueChange={(value) => this.setState({falseSwitchIsOnMedical: value})}
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
            <Switch onValueChange={(value) => this.setState({falseSwitchIsOnPhysical: value})}
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
            <Switch onValueChange={(value) => this.setState({falseSwitchIsOnDigestive: value})}
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
            <Text note numberOfLines={2}>Schedule hair hair routines on a range of periods</Text>
            </Body>
            <Right>
            <Switch onValueChange={(value) => this.setState({falseSwitchIsOnHair: value})}
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
            <Switch onValueChange={(value) => this.setState({falseSwitchIsOnBath: value})}
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