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
                records: [],
                filteredRecords: []
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

        refresh() {
            this.getRecords();
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
                     self.setState({records: records, filteredRecords: records});

                });
            } catch (error) {
                self.showToast(error.message);
            }
        }

        filter(searchText) {
            var text = searchText.toLowerCase();
            var filteredRecords = this.state.records.filter( (record) => {
                var r = record.title.toLowerCase();
                return r.search(text) !== -1;
            });
            this.setState({filteredRecords: filteredRecords})
        }

        

        render() {
            return (
                <Container style={StyleSheet.flatten(styles.container)}>
                    <Content style={{ flex: 1 }} contentContainerStyle={{ flex: 1 }}>
            
                    <Item searchBar rounded style={{marginLeft: 10, marginRight: 10, marginBottom: 20, backgroundColor: '#fff'}} >
                        <Icon name="md-search" style={{ color: 'gray'}}/>
                        <Input placeholder="Search" onChangeText={(searchText) => this.filter(searchText)}/>
                    </Item>

                    <List dataArray={this.state.filteredRecords} renderRow={record => 
                        
                        <ListItem 
                        onPress={() => this.props.navigator.push({
                            name: 'IndividualMedicalRecord',
                            title: 'Medical Record',
                            passProps: {record: record},
                            refreshList: this.refresh.bind(this)
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
                    <Fab active={true}style={{ backgroundColor: '#009688'}} position="bottomRight"
                    onPress={() => {
                        console.log('Fab pressed')
                    this.props.navigator.push({
                        name: 'FormMedicalRecord',
                        title: 'Add new record',
                        passProps: {},
                        refreshList: this.refresh.bind(this)
                    })}}>
                        <Icon name="md-add" />
                    </Fab>
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
    }
 });

 module.exports = medicalRecordsView;