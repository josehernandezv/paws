'use strict'

import React, { Component } from 'react';

import { View, Text, StyleSheet } from 'react-native';

import { Container, Content, List, Item, ListItem, CheckBox, Header, 
	Button, Title, Right, Left, Body, Icon, Footer, Input, Fab } 
    from 'native-base';

    const FormMedicalRecord = require('./formMedicalRecordView');

    export default class medicalRecordsView extends Component {

        constructor(props) {
            super(props);
        }

        render() {
            return (
                <Container style={{padding: 10}}>
                    
                    <Fab style={{ backgroundColor: '#009688'}} position="bottomRight"
                    onPress={() => this.props.navigator.replace({name: 'FormMedicalRecord'})}>
                        <Icon name="md-add" />
                    </Fab>
                    
                    <Item searchBar rounded style={{marginLeft: 10, marginRight: 10, marginTop: 20, marginBottom: 20}} >
                        <Icon name="md-search" style={{ color: 'gray'}}/>
                        <Input placeholder="Search"/>
                    </Item>

                    <List>
                        
                        <ListItem>
                            <Body>
                                <Text style={{fontWeight: 'bold'}}>Fever</Text>
                                <Text note numberOfLines={2}>In the consultation with the vet we found that 
                                                            Max had a little bit of fever so he was given a 
                                                            medicine to lower it down. This medicine worked 
                                                            very well on him and in a matter of 3 days he was 
                                                            totally healthy.</Text>
                            </Body>
                            <Right>
                                <Text note>5/26/17</Text>
                                <Button transparent>
                                    <Icon name='ios-arrow-forward' style={{color: 'gray', marginRight: -20}}/>
                                </Button>
                            </Right>
                        </ListItem>
                    </List>
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