'use strict'

import React, { Component } from 'react';

import { View, Text, StyleSheet, DatePickerAndroid, TouchableWithoutFeedback, TextInput, Alert } 
from 'react-native';

import { Container, Content, Header, Button, Title, Right, Left, Body, Icon, Form, Item,
	Label, Input, Footer, InputGroup, Textarea, Toast } from 'native-base';

export default class nutritionView extends Component {
	
	constructor(props) {
        super(props);        
    }

	render() {
		return (
			<Container>

				<Content style={StyleSheet.flatten(styles.contentStyle)}>
					<Text>Nutrition Notifications</Text>
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
	}
});

module.exports = nutritionView;