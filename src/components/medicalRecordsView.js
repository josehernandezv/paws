'use strict'

import React, { Component } from 'react';

import { View, Text, StyleSheet } from 'react-native';

import { Container, Content, List, Item, ListItem, CheckBox, Header, 
	Button, Title, Right, Left, Body, Icon, Footer, Input, Fab, Toast } 
    from 'native-base';

    const FormMedicalRecord = require('./formMedicalRecordView');
    const firebase = require('../database/firebase');
    
    export default class medicalRecordsView extends Component {

        constructor(props) {
            super(props);
            this.state = {
                records: []
            };
        }

        componentDidMount() {
            this.getRecords();
        }

        showToast(message) {
            Toast.show({
                supportedOrientations:['portrait','landscape'],
                text: message,
                position: 'bottom',
                buttonText: 'Ok'
            })
        }

        getRecords () {
            var self = this;
            try {
                firebase.database().ref("medicalRecords").orderByChild("date").once("value",function(snapshot) {
                     var records = [];
                     snapshot.forEach(function(child) {
                        records.push({
                            title: child.val().title,
                            details: child.val().details,
                            date: child.val().date,
                            key: child.key
                        })
                     });
                     self.setState({records: records});

                });
            } catch (error) {
                self.showToast(error.message);
            }
        }

        render() {
            return (
                <Container style={StyleSheet.flatten(styles.container)}>
                    
                    <Fab style={{ backgroundColor: '#009688'}} position="bottomRight"
                    onPress={() => this.props.navigator.push({
                        name: 'FormMedicalRecord',
                        title: 'Add new record',
                        passProps: {}
                    })}>
                        <Icon name="md-add" />
                    </Fab>
                    
                    <Item searchBar rounded style={{marginLeft: 10, marginRight: 10, marginBottom: 20, backgroundColor: '#fff'}} >
                        <Icon name="md-search" style={{ color: 'gray'}}/>
                        <Input placeholder="Search"/>
                    </Item>

                    <List dataArray={this.state.records} renderRow={record => 
                        
                        <ListItem 
                        onPress={() => this.props.navigator.push({
                            name: 'IndividualMedicalRecord',
                            title: 'Medical Record Card',
                            passProps: {record: record}
                        })}>
                            <Body>
                                <Text style={{fontWeight: 'bold'}}>{record.title}</Text>
                                <Text note numberOfLines={2}>{record.details}</Text>
                            </Body>
                            <Right>
                                <Text note>{record.date}</Text>
                                <Button transparent>
                                    <Icon name='ios-arrow-forward' style={{color: 'gray', marginRight: -20}}/>
                                </Button>
                            </Right>
                        </ListItem>}
                    />
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
    t_title: {
        fontSize: 16,
        color: '#fff',
        fontWeight: 'bold',
    },
    header: {
        backgroundColor: '#009688'
    }
 });

 module.exports = medicalRecordsView;