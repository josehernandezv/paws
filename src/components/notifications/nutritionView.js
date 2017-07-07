'use strict'

import React, { Component } from 'react';

import { View, Text, StyleSheet, DatePickerAndroid, TouchableWithoutFeedback, TextInput, Alert, Picker, Switch } 
from 'react-native';

import { Container, Content, Header, Button, Title, Right, Left, Body, Icon, Form, Item,
	Label, Input, Footer, InputGroup, Textarea, Toast, List, ListItem } from 'native-base';

const firebase = require('../../database/firebase');

export default class nutritionView extends Component {
	
	constructor(props) {
        super(props);   
			this.state = { 
				timeRangeFood: '',
				timeRangeWater: '',
				falseSwitchIsOnNutrition: this.props.route.passProps.state,
				pet: {}
			}; 
    }

	updateNutritionNotifications(){

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

	updateNotificationState(value, type) {
        
        var self = this;
        firebase.database().ref("notifications").orderByChild("petId").equalTo(self.state.pet.id).on("child_added",function(snapshot) {
            console.log(snapshot.key)
            firebase.database().ref("notifications/" + snapshot.key + "/" + type).set({
                state: value
            })
        });
        
    }

	render() {
		return (
			<Container style={StyleSheet.flatten(styles.container)}>

                <Content>

                    <Form>
						<List> 

							{/*<ListItem>
								<Body>
									<Text style={{fontWeight: 'bold', fontSize: 17}}>{this.state.falseSwitchIsOnNutrition ? 'On' : 'Off'}</Text>
								</Body>
								<Right>
									<Switch onValueChange={(value) => {
										this.setState({falseSwitchIsOnNutrition: value})
										this.updateNotificationState(value, 'nutrition')
									}}
									style={{marginBottom: 10}}
									value={this.state.falseSwitchIsOnNutrition}
									/>
								</Right>
							</ListItem>*/}

							<ListItem>
								<Body>
									<Text>Choose how many times a day you want to feed your pet:</Text>
								
									<Picker
										selectedValue={this.state.timeRangeFood}
										onValueChange={(itemValue, itemIndex) => this.setState({timeRangeFood: itemValue})}>
										<Picker.Item label="Once" value="1" />
										<Picker.Item label="Twice" value="2" />
										<Picker.Item label="Three times" value="3" />
									</Picker>
								</Body>
							</ListItem>
							<ListItem>
								<Body>
									<Text>Choose how many times a day you want to give your pet some water:</Text>
								
									<Picker
										selectedValue={this.state.timeRangeWater}
										onValueChange={(itemValue, itemIndex) => this.setState({timeRangeWater: itemValue})}>
										<Picker.Item label="Once" value="1" />
										<Picker.Item label="Twice" value="2" />
										<Picker.Item label="Three times" value="3" />
										<Picker.Item label="Four times" value="4" />
										<Picker.Item label="Five times" value="5" />
									</Picker>
								</Body>
							</ListItem>
						</List>
                    

                      
                    	<Button full rounded style={StyleSheet.flatten(styles.add_button)}
                    		onPress ={() => this.updateNutritionNotifications()}>
							<Text style={StyleSheet.flatten(styles.button_text)}>Update Details</Text>
						</Button>
					
					</Form>
                </Content>
            </Container>		
		);
	}
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
	}
});

module.exports = nutritionView;