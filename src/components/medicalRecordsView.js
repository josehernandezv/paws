'use strict'

import React, { Component } from 'react';

import { View, Text, StyleSheet, AsyncStorage } from 'react-native';

import { Container, Content, List, Item, ListItem, 
	Button, Title, Right, Left, Body, Icon, Input, Fab, Toast, Spinner } 
    from 'native-base';

    const FormMedicalRecord = require('./formMedicalRecordView');
    const firebase = require('../database/firebase');
    
    export default class medicalRecordsView extends Component {

        constructor(props) {
            super(props);
            this.state = {
                records: [],
                filteredRecords: [],
                isLoaded: false
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
            this.getRecords().done();
        }

        async getRecords () {
            var userId = '';
            var petId = '';
            try {
                var user = await AsyncStorage.getItem('@PawsStore:user');
                if (user !== null){
                    userId = JSON.parse(user).id
                }
                var pet = await AsyncStorage.getItem('@PawsStore:pet');
                if (pet !== null){
                    petId = JSON.parse(pet).id
                }
            } catch (error) {
            }
            var self = this;
            try {
                firebase.database().ref("medicalRecords").orderByChild("petId").equalTo(petId).once("value",function(snapshot) {
                     var records = [];
                     snapshot.forEach(function(child) {
                        var record = child.val()
                        record.key = child.key;
                        records.push(record)
                     });
                     self.setState({records: records, filteredRecords: records, isLoaded: true});

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
                    <Content style={{ flex: 1 }} contentContainerStyle={{ flex: 1 }}>
            
                    <Item searchBar rounded style={{marginLeft: 10, marginRight: 10, marginBottom: 20, backgroundColor: '#fff'}} >
                        <Icon name="md-search" style={{ color: 'gray'}}/>
                        <Input placeholder="Search" onChangeText={(searchText) => this.filter(searchText)}/>
                    </Item>

                     {!this.state.isLoaded ? this.renderLoadingView() : null}
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