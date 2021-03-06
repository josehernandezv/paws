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
} from 'native-base';

const SideBar = require('./sideBar');
const Navigator = require('../../node_modules/react-native-deprecated-custom-components/src/Navigator');
import LoginMaster from './loginMaster';
const First = require('./firstView');
const Second = require('./secondView');
const SearchAnimals = require('./searchAnimalsView');
const Details = require('./animalsDescriptionView');
const MedicalRecords = require('./medicalRecordsView');
const FormMedicalRecord = require('./formMedicalRecordView');
const IndividualMedicalRecord = require('./individualMedicalRecordView');
const FormAddPet = require('./formAddNewPet');
const Notifications = require('./notificationsView');
const Nutrition = require('./notifications/nutritionView');
const Bath = require('./notifications/bathView');
const MedicalCare = require('./notifications/medicalCareView');
const PhysicalActivity = require('./notifications/physicalActivityView');
const DigestiveNecessities = require('./notifications/digestiveNecessitiesView');
const Hair = require('./notifications/hairCareView');
const MyPets = require('./myPetsView');


class NavigationBar extends Navigator.NavigationBar {
    render() {
        var routes = this.props.navState.routeStack;
        if(routes.length){
            var route = routes[routes.length -1];
        }
        if (!route.display) {
            return null;
        }
        return super.render();
    }
}

export default class mainView extends Component {

    constructor(props) {
        super(props);
    }

    renderScene(route, navigator) {
        route.display = true;
        switch (route.name) {
            case 'Login':
                route.display = false;
                console.log(LoginMaster)
                return (
                    <LoginMaster {...route.props} navigator={navigator} route={route}></LoginMaster>
                );
            case 'First':
                return (
                    <First {...route.props} navigator={navigator} route={route}></First>
                );
            case 'Second':
                return (
                    <Second {...route.props} navigator={navigator} route={route}></Second>
                );
            case 'SearchAnimals':
                return (
                    <SearchAnimals {...route.props} navigator={navigator} route={route}></SearchAnimals>
                );
            case 'Details':
                return(
                    <Details {...route.props} navigator={navigator} route={route}/>
                );
            case 'MedicalRecords':
                return (
                    <MedicalRecords {...route.props} navigator={navigator} route={route}></MedicalRecords>
                );
            case 'FormMedicalRecord':
                return (
                    <FormMedicalRecord {...route.props} navigator={navigator} route={route}></FormMedicalRecord>
                );
            case 'IndividualMedicalRecord':
                return (
                    <IndividualMedicalRecord {...route.props} navigator={navigator} route={route}></IndividualMedicalRecord>
                );
            case 'FormAddPet':
                return(
                    <FormAddPet {...route.props} navigator={navigator} route={route} refreshMenu={this.refreshSideBar.bind(this)} ></FormAddPet>
                );
            case 'Notifications':
                return(
                    <Notifications {...route.props} navigator={navigator} route={route}></Notifications>
                );
            case 'Nutrition':
                return(
                    <Nutrition {...route.props} navigator={navigator} route={route}></Nutrition>
                );
            case 'Bath':
                return(
                    <Bath {...route.props} navigator={navigator} route={route}></Bath>
                );
            case 'MedicalCare':
                return(
                    <MedicalCare {...route.props} navigator={navigator} route={route}></MedicalCare>
                );
            case 'DigestiveNecessities':
                return(
                    <DigestiveNecessities {...route.props} navigator={navigator} route={route}></DigestiveNecessities>
                );
            case 'PhysicalActivity':
                return(
                    <PhysicalActivity {...route.props} navigator={navigator} route={route}></PhysicalActivity>
                );
            case 'Hair':
                return(
                    <Hair {...route.props} navigator={navigator} route={route}></Hair>
                );
            case 'MyPets':
                return(
                    <MyPets {...route.props} navigator={navigator} route={route}></MyPets>
                );
        }
        
    }

    getNavigatorBarRouteMapper() {
        var self = this;
        return {
            LeftButton: function(route, navigator, index) {
                if (index == 0) {
                    return (
                        <View style={styles.headerSection}>
                            <Icon name='md-menu' style={StyleSheet.flatten(styles.headerIcon)} onPress={() => self.openDrawer()}/>
                        </View>
                    );
                }   
                return (
                    <View style={styles.headerSection}>
                        <Icon name='md-arrow-round-back' style={StyleSheet.flatten(styles.headerIcon)} onPress={() => {
                            if (index > 0 ) {
                                navigator.pop();
                            }
                        }}/>
                    </View>
                );
            }, 
            RightButton: function(route, navigator, index) {
                return null;
            },
            Title: function(route, navigator, index) {
                return (
                    <View style={styles.headerSection}>                    
                        <Text style={styles.t_title}>
                            {route.title}
                        </Text>
                    </View>
                );
            }
        }
    }

    closeDrawer() {
        this.drawer._root.close()
    }

    openDrawer() {
        this.drawer._root.open()
    }

    refreshSideBar() {
        this.refs.sideBar.refresh();
    }

    render() {
        var self = this;
        return (
             <Drawer
                ref={(ref) => { this.drawer = ref; }}
                content={<SideBar ref='sideBar' close={this.closeDrawer.bind(this)} navigator={this.getNavigator.bind(this)} />}
                onClose={() => this.closeDrawer()} >

                <StatusBar backgroundColor="#00796B" barStyle="light-content"/>
                
                <Navigator ref="navigator"
                    style={{backgroundColor: '#fff'}}
                    initialRoute={{name:'First', title: 'Paws', passProps: {}}}
                    renderScene={this.renderScene.bind(this)}
                    configureScene={(route) => {
                        if(route.sceneConfig) {
                            return route.sceneConfig;
                        }
                        return Navigator.SceneConfigs.FloatFromRight;
                    }}
                     navigationBar={
                         <NavigationBar style={styles.header} routeMapper={this.getNavigatorBarRouteMapper()} />
                    }         
                />

            </Drawer>
            
        );
    }

    getNavigator(){
        return this.refs.navigator;
    }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
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

module.exports = mainView;
