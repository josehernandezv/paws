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
const Login = require('./loginView');
const SignUp = require('./signupView');
const First = require('./firstView');
const Second = require('./secondView');
const SearchAnimals = require('./searchAnimalsView');
<<<<<<< HEAD
const Details = require('./dogsDescriptionView');

=======
const MedicalRecords = require('./medicalRecordsView');
const FormMedicalRecord = require('./formMedicalRecordView');
const IndividualMedicalRecord = require('./individualMedicalRecordView');
>>>>>>> 014706001d327630338bfe385fbdb05bb7d14b53

class mainView extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            user: this.props.route.passProps.user
        };
    }

    renderScene(route, navigator) {
        switch (route.name) {
            case 'Login':
                return (
                    <Login {...route.props} navigator={navigator} route={route}></Login>
                );
            case 'Signup':
                return (
                    <SignUp {...route.props} navigator={navigator} route={route}></SignUp>
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
<<<<<<< HEAD
            case 'Details':
                return(
                    <Details {...route.props} navigator={navigator} route={route}/>
=======
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
>>>>>>> 014706001d327630338bfe385fbdb05bb7d14b53
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
                if (route.name == 'First') {
                    return (
                        <View style={styles.headerSection}>
                            <Icon name='md-add' style={StyleSheet.flatten(styles.headerIcon)} 
                             onPress={() => {
                                 navigator.push({
                                    name: 'Second',
                                    title: 'Second View',
                                    passProps: {user: self.state.user}
                                })
                             }}/>
                        </View>
                    );
                }
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

    render() {
        var self = this;
        return (
             <Drawer
                ref={(ref) => { this.drawer = ref; }}
                content={<SideBar close={this.closeDrawer.bind(this)} navigator={this.getNavigator.bind(this)} />}
                onClose={() => this.closeDrawer()} >

                <StatusBar backgroundColor="#00796B" barStyle="light-content"/>
                
                <Navigator ref="navigator"
                    style={{backgroundColor: '#fff'}}
                    initialRoute={{name:'First', title: 'First View', passProps: {user: self.state.user}}}
                    renderScene={this.renderScene}
                    configureScene={(route) => {
                        if(route.sceneConfig) {
                            return route.sceneConfig;
                        }
                        return Navigator.SceneConfigs.FloatFromRight;
                    }}
                     navigationBar={
                         <Navigator.NavigationBar style={styles.header} routeMapper={this.getNavigatorBarRouteMapper()} />
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
