'use strict'

import React, { Component } from 'react';

import { View, Text, StyleSheet, DatePickerAndroid, TouchableWithoutFeedback, TextInput, Alert } 
from 'react-native';

import { Container, Content, Header, Button, Title, Right, Left, Body, Icon, Form, Item,
	Label, Input, Footer, InputGroup, Textarea, Toast } from 'native-base';

const firebase = require('../database/firebase')

export default class formMedicalRecordView extends Component {
	
	constructor(props) {
        super(props);
        this.state = { 
            title: '' ,
            date: '',
            details: '',
            simpleDate: new Date(),
			simpleText: 'Pick a date'
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

    addRecord () {
    	var self = this;
        try {
        	var newPost = firebase.database().ref("medicalRecords").push();
            newPost.set({
                 title: this.state.title,
                 date: this.state.simpleText,
                 details: this.state.details,
            });
        	Alert.alert('Success', 'Medical record successfully added!',
            [
              {text: 'OK', onPress: () => self.props.navigator.replace({
                            name: 'IndividualMedicalRecord',
                            title: 'Medical Record Card',
                            passProps: {}
                        })}
            ]
          )
        } catch (error) {
            self.showToast(error.message);
        }
    }

    showPicker = async (stateKey, options) => {
		try {
			var newState = {};
			const {action, year, month, day} = await DatePickerAndroid.open(options);
			if (action === DatePickerAndroid.dismissedAction) {
				newState[stateKey + 'Text'] = 'Pick a date';
			} else {
				var date = new Date(year, month, day);
				newState[stateKey + 'Text'] = date.toLocaleDateString();
				newState[stateKey + 'Date'] = date;
			}
			this.setState(newState);
		} catch ({code, message}) {
			console.warn(`Error in example '${stateKey}': `, message);
		}
	};

	render() {
		return (
			<Container>
				
				<Header style={StyleSheet.flatten(styles.header)}>
					<Left>
						<Button transparent>
							<Icon name='arrow-back' />
						</Button>
					</Left>
					<Body>
						<Text style={styles.t_title}>New Medical Record</Text>
					</Body>
				</Header>

				<Content style={StyleSheet.flatten(styles.contentStyle)}>

					<Form>

						<Item floatingLabel>
							<Label>Title</Label>
							<Input onChangeText={(title) => this.setState({title})}/>
						</Item>

						<TouchableWithoutFeedback
							onPress={this.showPicker.bind(this, 'simple', {date: this.state.simpleDate})}>
							<View>
							<Text style={styles.date_button}>{this.state.simpleText}</Text>
							</View>
						</TouchableWithoutFeedback>
			 		
			 			<Label style={StyleSheet.flatten(styles.coloredTitle)}>Medical Record Details</Label>
                        	
                        	<TextInput multiline = {true} style={StyleSheet.flatten(styles.textarea)} 
                        	onChangeText={(details) => this.setState({details})}/>
                    
                    		<Button full rounded style={StyleSheet.flatten(styles.add_button)}
                    		onPress ={() => this.addRecord()}>
								<Text style={StyleSheet.flatten(styles.button_text)}>Add to Records</Text>
							</Button>
					
					</Form>
			
			</Content>
		
		</Container>
			
	);
	}
}

const styles = StyleSheet.create({
	t_title: {
		fontSize: 18,
		color: '#fff',
		fontWeight: 'bold',
	},
	contentStyle: {
		padding: 20,
        backgroundColor: '#F5FCFF',
	},
	header: {
		backgroundColor: '#009688'
	},
	add_button: {
		fontSize: 16,
		marginLeft: 10,
		marginRight: 10,
		marginTop: 10,
		backgroundColor: '#009688'
	},
	button_text: {
		color: '#fff',
		fontSize: 16
	},
	coloredTitle: {
		textAlign: 'left', 
		color: '#565656', 
		marginTop: 20,
		marginLeft: 15
	},
	textarea: {
		height: 200,
		width: 305,
		borderWidth: 1,
		borderRadius: 15,
		borderColor: '#d3d3d3',
		marginTop: 20,
		marginBottom: 20,
		padding: 10,
		marginLeft: 10,
		backgroundColor: '#fff'
	},
	date_button: {
		borderWidth: 0.5,
		borderBottomColor: '#d3d3d3',
		borderTopColor: '#F5FCFF',
		borderRightColor: '#F5FCFF',
		borderLeftColor: '#F5FCFF',
		fontSize: 17,
		 backgroundColor: '#F5FCFF',
		marginLeft: 10,
		padding: 10,
		color: '#565656',
	}
});

module.exports = formMedicalRecordView;
