'use strict'

import React, { Component } from 'react';

import { View, Text, StyleSheet, Alert } from 'react-native';

import { Container, Content, Header, Button, Title, Right, Body, Icon, Item, Label,  
	Card, CardItem, Grid, Col, Row, Left, Toast } from 'native-base';

const firebase = require('../database/firebase');

export default class individualMedicalRecordView extends Component {

	constructor(props) {
        super(props);
        this.state = { 
            record: this.props.route.passProps.record
        };
    }

    showToast(message) {
        Toast.show({
            supportedOrientations:['portrait','landscape'],
            text: message,
            position: 'bottom',
            buttonText: 'Ok'
        })
    }

    deleteRecord () {
    	var self = this;
    	Alert.alert('Confirm Delete...', 'Are you sure you want to delete this?',
            [
              {text: 'Yes', onPress: () => {
					try {
	                		firebase.database().ref("medicalRecords/" + this.state.record.key).remove();
	                		this.props.navigator.replace({name: 'MedicalRecords', title: 'Medical Records',
	                      							passProps: {}})
	               			Alert.alert('Success', 'Medical record successfully deleted!',
	            			[
	              				{text: 'OK', onPress: () => self.props.navigator.replace({
	                            name: 'MedicalRecords',
	                            title: 'Medical Records',
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

	callback(args) {
		this.setState({
            record: args
		});
	}

	render() {
		return (
			<Container style={StyleSheet.flatten(styles.container)}>
				<Content style={StyleSheet.flatten(styles.contentStyle)}>
					<Card style={StyleSheet.flatten(styles.cardStyle)}>
						
						<CardItem>
							<Left>
								<Body>
									<Text style={{fontWeight: 'bold'}}>{this.state.record.title}</Text>
									<Text note>{this.state.record.date}</Text>
								</Body>
							</Left>
						</CardItem>

						<CardItem>
							<Body>

								<Text>{this.state.record.details}</Text>

								<Grid>
									<Right>

										<Row>
											<Button transparent>
												<Icon name="md-create" style={StyleSheet.flatten(styles.baseColor)}
												onPress={() => this.props.navigator.push({
                        							name: 'FormMedicalRecord',
                       								title: 'Edit record',
                        							passProps: {record: this.state.record},
													callback: this.callback.bind(this),
													refreshList: this.props.route.refreshList

                    							})}/>
											</Button>
											<Button transparent>
												<Icon name="md-trash" style={{color: '#b22222'}} 
												onPress={() => this.deleteRecord()}/>
											</Button>
										</Row>

									</Right>
								</Grid> 

							</Body>
						</CardItem>
					
					</Card>
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
		color: '#009688'
	}
});

module.exports = individualMedicalRecordView;
