'use strict'

import React, { Component } from 'react';

import { View, Text, StyleSheet, DatePickerAndroid, TouchableWithoutFeedback, TextInput, Alert, AsyncStorage } 
from 'react-native';

import { Container, Content, Header, Button, Title, Right, Left, Body, Icon, Form, Item,
	Label, Input, Footer, InputGroup, Textarea, Toast } from 'native-base';

const firebase = require('../database/firebase')

export default class formMedicalRecordView extends Component {
	
	constructor(props) {
        super(props);
		var record = this.props.route.passProps.record;
		
		if ("undefined" === typeof record) {
			this.state = { 
				title: '' ,
				date: '',
				details: '',
				simpleDate: new Date(),
				simpleText: 'Pick a date',
				isUpdate: false,
				nameError: false,
				userId: '',
				petId: ''
			};
		} else {
			this.state = { 
				title: record.title ,
				date: record.date,
				details: record.details,
				simpleDate: new Date(),
				simpleText: record.date,
				isUpdate: true,
				key: record.key,
				userId: record.userId,
				petId: record.petId
			};
		}
    }

	componentDidMount() {
		if (!this.state.isUpdate) {
       		this.getData().done()
		}
    }

	async getData() {
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
		this.setState({userId: userId, petId: petId})
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

			if(this.state.title !== ''){
				var newRecord = firebase.database().ref("medicalRecords").push();
				newRecord.set({
					title: this.state.title,
					date: this.state.simpleText,
					details: this.state.details,
					userId: this.state.userId,
					petId: this.state.petId
				});
				Alert.alert('Success', 'Medical record successfully added!',
				[
				{text: 'OK', onPress: () => {
							self.props.route.refreshList()		  		
							self.props.navigator.replace({
								name: 'IndividualMedicalRecord',
								title: 'Medical Record',
								passProps: {record: {
									title: this.state.title,
									date: this.state.simpleText,
									details: this.state.details,
									key: newRecord.key
								}}
							})}}
				]
			);
			} else {
				Alert.alert("Error", "All the fields are required");
			}

        	
        } catch (error) {
            self.showToast(error.message);
        }
    }

	editRecord () {
    	var self = this;
        try {
        	var record = firebase.database().ref("medicalRecords/" + this.state.key);
            record.set({
                 title: this.state.title,
                 date: this.state.simpleText,
                 details: this.state.details,
				 userId: this.state.userId,
				 petId: this.state.petId
            });
        	Alert.alert('Success', 'Medical record successfully edited!',
            [
              {text: 'OK', onPress: () => {
				  			this.props.route.callback({
								title: this.state.title,
								date: this.state.simpleText,
								details: this.state.details,
								key: this.state.key
							});
							this.props.route.refreshList()
				  			this.props.navigator.pop();
                        }}
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

	checkData() {
        if (this.state.title == '' || this.state.date == '' || this.state.details == '') {
            this.setState({nameError: true})
        }
    }


	render() {
		return (
			<Container>

				<Content style={StyleSheet.flatten(styles.contentStyle)}>

					<Form>

						<Item floatingLabel={!this.state.isUpdate} stackedLabel={this.state.isUpdate} error={this.state.nameError}>
							<Label>Title</Label>
							<Input onBlur={() => this.checkData()} onChangeText={(title) => this.setState({title})} value={this.state.title}/>
						</Item>

						<TouchableWithoutFeedback
							onPress={this.showPicker.bind(this, 'simple', {date: this.state.simpleDate})}>
							<View>
							<Text style={styles.date_button}>{this.state.simpleText}</Text>
							</View>
						</TouchableWithoutFeedback>
			 		
			 			<Label style={StyleSheet.flatten(styles.coloredTitle)}>Medical Record Details</Label>
                        	
                        	<TextInput multiline = {true} style={StyleSheet.flatten(styles.textarea)} 
                        	onChangeText={(details) => this.setState({details})}
							value={this.state.details}/>
                    
                    		<Button full rounded style={StyleSheet.flatten(styles.add_button)}
                    		onPress ={() => this.state.isUpdate ? this.editRecord() : this.addRecord() }>
								<Text style={StyleSheet.flatten(styles.button_text)}>
									{this.state.isUpdate ? 'Edit' : 'Add'} record
								</Text>
							</Button>
					
					</Form>
			
			</Content>
		
		</Container>
			
	);
	}
}

const styles = StyleSheet.create({
	contentStyle: {
		padding: 20,
        backgroundColor: '#F5FCFF',
		paddingTop: 60
	},
	header: {
		backgroundColor: '#009688'
	},
	add_button: {
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
	},
	error: {
    	borderColor: 'red'
  	}
});

module.exports = formMedicalRecordView;
