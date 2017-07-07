'use strict'

import React, { Component } from 'react';

import { View, Text, StyleSheet, DatePickerAndroid, TouchableWithoutFeedback, TextInput, Alert, TimePickerAndroid, AsyncStorage } from 'react-native';

import { Container, Content, Header, Button, Title, Right, Left, Body, Icon, Form, Item,
	Label, Input, Footer, InputGroup, Textarea, Toast, List, ListItem, Picker } from 'native-base';

import moment from 'moment';

const PushNotification = require('./PushNotification')

export default class medicalCareView extends Component {
	
	constructor(props) {
        super(props);   
		this.state = { 
			simpleDate: new Date(),
			simpleText: 'Pick a date',
			pet: {},
			isoFormatText: 'Pick a time',
			presetHour: 4,
			presetMinute: 4,
			presetText: 'pick a time, default: 4:04AM',
			simpleText2: 'pick a time',
		};   
    }

	componentDidMount() {
		this.getPet().done()
  }

	async getPet() {
        try {
            const value = await AsyncStorage.getItem('@PawsStore:pet');
            if (value !== null){
                var pet = JSON.parse(value)
                this.setState({pet})
            }
        } catch (error) {
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

	async showPicker2(stateKey, options) {
    try {
      const {action, minute, hour} = await TimePickerAndroid.open(options);
      var newState = {};
      if (action === TimePickerAndroid.timeSetAction) {
        newState[stateKey + 'Text'] = _formatTime(hour, minute);
        newState[stateKey + 'Hour'] = hour;
        newState[stateKey + 'Minute'] = minute;
      } else if (action === TimePickerAndroid.dismissedAction) {
        newState[stateKey + 'Text'] = 'Pick a time';
      }
      this.setState(newState);
    } catch ({code, message}) {
      console.warn(`Error in example '${stateKey}': `, message);
    }
  }


	setNotification() {
		// var date = new Date(this.state.simpleDate.getFullYear(),
		// 									 this.state.simpleDate.getMonth(),
		// 									 this.state.simpleDate.getDay(),
		// 									 this.state.isoFormatHour,
		// 									 this.state.isoFormatMinute,
		// 									 0,
		// 									 0) 
			
		// date = moment(date, 'YYYY-MM-DD HH:mm').toDate()
		var date = new Date(Date.now())
		date.setFullYear(this.state.simpleDate.getFullYear())
		date.setMonth(this.state.simpleDate.getMonth())
		date.setDate(this.state.simpleDate.getDay())
		
		
		PushNotification.localNotificationSchedule({
				message: 'Today ' + this.state.pet.name + ' has a date with the doctor',
				title: 'Medical appointment',
				date: new Date(Date.now() + (60 * 1000))
		})
		Alert.alert('Success', 'Notification setted successfully!',
					[{text: 'OK', onPress: () => {
						this.props.navigator.pop();	
					}}]
		);
	}	
 

	
	render() {
		return (
			<Container style={StyleSheet.flatten(styles.container)}>

				<Content>
					<Form>
						<List> 

							<ListItem>
								<Body>
									<Text 
										style={{marginBottom:20}}>Choose the date for the next appointment schedule for your pet:</Text>
								
									<TouchableWithoutFeedback
										onPress={this.showPicker.bind(this, 'simple', {date: this.state.simpleDate})}>
										<View>
											<Text style={styles.date_button}>{this.state.simpleText}</Text>
										</View>
									</TouchableWithoutFeedback>
								</Body>
							</ListItem>
							<ListItem>
								<Body>
									<Text
										style={{marginBottom:20}}>Choose the time you want to be reminded of on that day:</Text>
										<TouchableWithoutFeedback
											onPress={this.showPicker2.bind(this, 'isoFormat', {
											hour: this.state.isoFormatHour,
											minute: this.state.isoFormatMinute,
											is24Hour: true,
											})}>
											<Text style={styles.text}>{this.state.isoFormatText}</Text>
										</TouchableWithoutFeedback>
								</Body>
							</ListItem>
						</List>
                    

                      
                    	<Button full rounded style={StyleSheet.flatten(styles.add_button)}
                    		onPress ={() => this.setNotification()}>
							<Text style={StyleSheet.flatten(styles.button_text)}>Set Notification</Text>
						</Button>
					
					</Form>
			</Content>
		
		</Container>
			
	);
}

}
function _formatTime(hour, minute) {
  return hour + ':' + (minute < 10 ? '0' + minute : minute);
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    padding: 20,
    backgroundColor: '#F5FCFF',
    paddingTop: 80
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
	picker: {
    backgroundColor: '#E5E5E5'
 	}
});

module.exports = medicalCareView;