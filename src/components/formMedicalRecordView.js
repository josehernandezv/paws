'use strict'

import React, { Component } from 'react';

import { View, Text, StyleSheet, DatePickerAndroid, TouchableWithoutFeedback, TextInput } 
from 'react-native';

import { Container, Content, Header, Button, Title, Right, Left, Body, Icon, Form, Item,
	Label, Input, Footer, InputGroup, Textarea } from 'native-base';

export default class formMedicalRecordView extends Component {
	
	state = {
		simpleDate: new Date(),
		simpleText: 'Pick a date',
	};

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
							<Input />
						</Item>

						<TouchableWithoutFeedback
							onPress={this.showPicker.bind(this, 'simple', {date: this.state.simpleDate})}>
							<Text style={styles.date_button}>{this.state.simpleText}</Text>
						</TouchableWithoutFeedback>
			 		
			 			<Label style={StyleSheet.flatten(styles.coloredTitle)}>Medical Record Details</Label>
                        	
                        	<TextInput multiline = {true} style={StyleSheet.flatten(styles.textarea)} />
                    
                    		<Button full rounded style={StyleSheet.flatten(styles.add_button)}>
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
		padding: 20
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
		marginLeft: 10
	},
	date_button: {
		borderWidth: 0.5,
		borderBottomColor: '#d3d3d3',
		borderTopColor: '#fff',
		borderRightColor: '#fff',
		borderLeftColor: '#fff',
		fontSize: 17,
		backgroundColor: '#fff',
		marginLeft: 10,
		padding: 10,
		color: '#565656',
	}
});

module.exports = formMedicalRecordView;
