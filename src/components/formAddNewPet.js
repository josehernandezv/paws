'use strict'

import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    StatusBar,
    Alert,
    TextInput,
    AsyncStorage 
} from 'react-native';

import { 
    Container,
    Content,
    Button,
    Icon,
    Body,
    Toast,
    Right,
    Left,
    Form,
    Item,
    Label,
    Input,
    Thumbnail,
    InputGroup,
    Title,
    Textarea,
    Radio
} from 'native-base';

import {
     Col,
     Row,
     Grid
} from 'react-native-easy-grid'


const firebase = require('../database/firebase')

class formAddNewPet extends Component {

    constructor(props) {
        super(props);
        this.passProps = this.props.route.passProps,
        this.state ={
            name:'',
            ageYears:'',
            ageMonths:'',
            weight:'',
            height:'',
            option: true,
            gender: '',
            isValid: false,
            nameError: false,
            ageYearsError: false,
            ageMonthsError: false,
            weightError: false,
            heightError: false, 
            genderError: false,
            user: {
                username: '',
                email: '',
                id: ''
            },
            // imgUrl:  this.passProps.animal.specie == 'Dog' ? '../images/dog_shape.jpg' : '../images/cat_shape.jpg'
            imgUrl:  this.passProps.animal.imgUrl
        };
        
    }

    componentDidMount() {
        this.getUser().done()
    }

    async getUser() {
        try {
            const value = await AsyncStorage.getItem('@PawsStore:user');
            if (value !== null){
                var user = JSON.parse(value)
                this.setState({user: user})
            }
        } catch (error) {
        }
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
        if(this.state.option){
            this.state.gender = "male"
        } else {
            this.state.gender = "female"
        }
        
        if(this.state.name !== '' && this.state.years !== '' && this.state.months !== '' && this.state.weight !== ''){
            var newPet = firebase.database().ref('pets').push();
            newPet.set({ 
                userId: this.state.user.id,
                name: this.state.name,
                age: {
                    years: this.state.ageYears,
                    months: this.state.ageMonths,
                },
                weight: this.state.weight,
                height: this.state.height,
                breedId: this.passProps.animal.key,
                gender: this.state.gender,
                imgUrl: this.state.imgUrl         
            });

            firebase.database().ref('notifications').push({
                petId: newPet.key,
                userId: this.state.user.id,
                nutrition: false,
                medical: false,
                hair: false,
                bath: false,
                physical: false,
                digestive: false
            })

            Alert.alert('Success', this.state.name + ' has been added to your pets!',
            [
              {text: 'OK', onPress: () => {  	
                this.props.refreshMenu();	
                this.props.navigator.popToTop()
                
              }}
            ]);
            
        } else {
            Alert.alert("Error", "All the fields are required");
        }
        this.setState({
                name:'',
                age:'',
                weight:''
        });
    }

    validate(email, password) {
        return {
            email: email.length === 0,
            password: password.length === 0,
        };
    }

    validarCampos(numero){
        if(!/^([0-9])*$/.test(numero)){
            Alert.alert("Debe ingresar números");
        }
    }

    checkName() {
        if (this.state.name == '' || this.state.years == '' || this.state.months == '' || this.state.weight == '') {
            this.setState({nameError: true})
        }
    }
    

    render() {
        return (
             <Container style={StyleSheet.flatten(styles.container)}>

                <Content>

                    <Form>

                        <Item floatingLabel error={this.state.nameError}>
							<Label>Name</Label>
							<Input
                            onBlur={() => this.checkName()} 
                            onChangeText={(text) => this.setState({name:text})} />
						</Item>

                        
                        <Grid style={{margin: 10}}>
                            <Row style={{marginBottom: 10}}>
                                <Label style={{color: '#455A64'}}> Gender </Label>
                            </Row>
                            <Row>
                                <Col style={{flexDirection: 'row'}}>
                                    <Radio selected={this.state.option} onPress={() =>this.setState({option:!this.state.option})}/>
                                    <Text> Male</Text>
                                </Col>
                                <Col style={{flexDirection: 'row'}}>
                                    <Radio selected={!this.state.option} onPress={() => this.setState({option:!this.state.option})}/>
                                    <Text> Female</Text>
                                </Col>
                            </Row>
                        </Grid>
                        <Grid>
                            <Row style={{marginLeft: 10, marginTop: 20, marginBottom: 0}}>
                                <Label style={{color: '#455A64'}}> Age </Label>
                            </Row>
                            <Row>
                                <Col>
                                    <Item inlineLabel floatingLabel error={this.state.nameError}>
                                        <Label>Years</Label>
                                        
                                        <Input onChange={() => this.validarCampos(this.state.ageYears)} onBlur={() => this.checkName()} keyboardType="numeric" onChangeText={(text) => this.setState({ageYears:text})} />
                                        
                                    </Item>
                                </Col>
                                <Col>
                                    <Item inlineLabel floatingLabel error={this.state.nameError}>
                                        <Label>Months</Label>
                                        <Input onChange={() => this.validarCampos(this.state.ageMonths)} onBlur={() => this.checkName()} keyboardType="numeric" onChangeText={(text) => this.setState({ageMonths:text})} />
                                    </Item>
                                </Col>
                            </Row>
                        </Grid>

                        <Grid>
                            <Row>
                                <Col>
                                    <Item floatingLabel error={this.state.nameError}>
                                        <Label>Weight</Label>
                                        <Input onChange={() => this.validarCampos(this.state.weight)} onBlur={() => this.checkName()} keyboardType="numeric" onChangeText={(text) => this.setState({weight:text})} />
                                    </Item>
                                </Col>
                                <Col style={{paddingTop:50}}>
                                    <Label> kg </Label>
                                </Col>
                            </Row>
                        </Grid>

                        <Grid>
                            <Row>
                                <Col>
                                    <Item floatingLabel >
                                        <Label>Height</Label>
                                        <Input onChange={() => this.validarCampos(this.state.height)} keyboardType="numeric" onChangeText={(text) => this.setState({height:text})} />
                                    </Item>
                                </Col>
                                <Col style={{paddingTop:50}}>
                                    <Label> cm </Label>
                                </Col>
                            </Row>
                        </Grid>
                        

                        <Button iconLeft rounded style={StyleSheet.flatten(styles.add_button)}>
                            <Icon name='md-camera' />
                            <Text style={StyleSheet.flatten(styles.button_text)}>Add a photo</Text>
                        </Button>

                        <Image style={{margin: 10, height: 100, width: 100}} source={{uri: this.state.imgUrl}} />
                    
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
    padding: 20,
    backgroundColor: '#F5FCFF',
    paddingTop: 60
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
		marginLeft: 10,
		marginRight: 10,
		marginTop: 10,
		backgroundColor: '#009688'
	},
    button_text: {
		color: '#fff',
		fontSize: 16
	},
    title: {
    fontSize: 18
  },
  description: {
    fontSize: 14,
    color: 'gray'
  },
  error: {
    borderColor: 'red'
  }
  
});

module.exports = formAddNewPet;