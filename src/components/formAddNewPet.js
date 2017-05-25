'use strict'

import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    StatusBar,
    Alert,
    TouchableWithoutFeedback,
    DatePickerAndroid,
    TextInput
} from 'react-native';

import { 
    Container,
    Content,
    Drawer,
    Header,
    Button,
    Icon,
    Footer,
    FooterTab,
    Badge,
    List,
    ListItem,
    Thumbnail,
    Body,
    Toast,
    Fab,
    Right,
    Left,
    Form,
    Item,
    Label,
    Input,
    InputGroup,
    Title,
    Textarea
} from 'native-base';

const firebase = require('../database/firebase')

class formAddNewPet extends Component {

    constructor(props) {
        super(props);
        this.passProps = this.props.route.passProps,
        this.state ={
            name:'',
            age:'',
            weight:''
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

    addPet(){
        
        if(this.state.name !== '' & this.state.age !== '' & this.state.weight !== ''){
            firebase.database().ref('pets').push({ 
                name: this.state.name,
                age: this.state.age,
                weight: this.state.weight
            });
            this.setState({
                name:'',
                age:'',
                weight:''
            });
        }
    }

    render() {
        return (
             <Container style={StyleSheet.flatten(styles.container)}>

                <Content>

                    <Form>

						<Item floatingLabel>
							<Label>Name</Label>
							<Input onChangeText={(text) => this.setState({name:text})}/>
						</Item>

                        <Item floatingLabel>
							<Label>Age</Label>
							<Input keyboardType="numeric" onChangeText={(text) => this.setState({age:text})}/>
						</Item>

                        <Item floatingLabel>
							<Label>Weight</Label>
							<Input keyboardType="numeric" onChangeText={(text) => this.setState({weight:text})}/>
						</Item>
                    
                    	<Button full rounded style={StyleSheet.flatten(styles.add_button)}
                    		onPress ={() => this.addPet()}>
							<Text style={StyleSheet.flatten(styles.button_text)}>Add Pet</Text>
						</Button>
					
					</Form>

                </Content>
            </Container>
            
        )
    }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    paddingTop: 80
  },
  welcome: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00BCD4'
  },
  t_title: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
  header: {
  	backgroundColor: '#009688'
  },
  headerSection: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 20,
    paddingRight: 20
  },
  headerIcon: {
    color: '#fff',
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
    
});

module.exports = formAddNewPet;