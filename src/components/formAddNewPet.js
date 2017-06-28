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

import RNFetchBlob from 'react-native-fetch-blob'


const firebase = require('../database/firebase')
const ImagePicker = require('react-native-image-picker');
const Blob = RNFetchBlob.polyfill.Blob
const Fetch = RNFetchBlob.polyfill.Fetch
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
window.Blob = Blob
window.fetch = new Fetch({
    auto : true,
    binaryContentTypes : [
        'image/',
        'video/',
        'audio/',
        'foo/',
    ]
}).build()

const options = {
  title: 'Select pet picture',
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
};

class formAddNewPet extends Component {

    constructor(props) {
        super(props);
        this.passProps = this.props.route.passProps;
        var pet = this.passProps.pet;

        if ("undefined" === typeof pet) {
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
            isNameEditable: true,
            isGenderEditable: true,
            isUpdate: false,
            user: {
                username: '',
                email: '',
                id: ''
            },
            // imgUrl:  this.passProps.animal.specie == 'Dog' ? '../images/dog_shape.jpg' : '../images/cat_shape.jpg'
            imgUrl:  this.passProps.animal.imgUrl
        };
        } else {
            this.state ={
            name: pet.name,
            id: pet.id,
            ageYears: pet.age.years,
            ageMonths: pet.age.months,
            weight: pet.weight,
            height: pet.height,
            option: (pet.gender == 'male' ? true : false),
            gender: pet.gender,
            isValid: false,
            nameError: false,
            ageYearsError: false,
            ageMonthsError: false,
            weightError: false,
            heightError: false, 
            genderError: false,
            isNameEditable: false,
            isGenderEditable: false,
            isUpdate: true,
            user: {
                username: '',
                email: '',
                id: ''
            },
            // imgUrl:  this.passProps.animal.specie == 'Dog' ? '../images/dog_shape.jpg' : '../images/cat_shape.jpg'
            imgUrl:  pet.imgUrl
        };
        }
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
            

            this.savePicture(this.state.imgUrl).then(function(data) {
                if (!this.state.isUpdate) {
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
                        imgUrl: data         
                    });

                    firebase.database().ref('notifications').push({
                        petId: newPet.key,
                        userId: this.state.user.id,
                        nutrition: {state: false},
                        medical:  {state: false},
                        hair: {state: false},
                        bath: {state: false},
                        physical: {state: false},
                        digestive: {state: false}
                    })

                    Alert.alert('Success', this.state.name + ' has been added to your pets!',
                    [
                        {text: 'OK', onPress: () => {   
                            this.props.navigator.popToTop()
                            this.props.refreshMenu();   
                        }}
                    ]);    
                } else {
                    var pet = firebase.database().ref('pets/' + this.state.id);
                    pet.update({ 
                        age: {
                            years: this.state.ageYears,
                            months: this.state.ageMonths,
                        },
                        weight: this.state.weight,
                        height: this.state.height,
                        imgUrl: data         
                    });

                    Alert.alert('Success', this.state.name + ' has been edited!',
                    [
                        {text: 'OK', onPress: () => {   
                            this.props.navigator.popToTop()
                            this.props.refreshMenu();   
                        }}
                    ]);
                }

                
            }.bind(this))
                        
        } else {
            Alert.alert("Error", "All the fields are required");
        }
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

    takePicture() {
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                this.setState({
                    imgUrl: response.uri
                });
            }
        });
    }

    savePicture(uri) {
        return new Promise((resolve, reject) => {
            const sessionId = new Date().getTime()
            var uploadBlob = null;
            const imageRef = firebase.storage().ref('images').child(`${sessionId}`)

            if (uri.substring(0,4) == 'http') {
                RNFetchBlob.config({ fileCache : true }).fetch('GET', uri).then((resp) => {
                    let rnfbURI = RNFetchBlob.wrap(resp.path())
                    return Blob.build(rnfbURI, { type : 'image/jpg;'})
                }).then((blob) => {
                    uploadBlob = blob;
                    return imageRef.put(blob, { contentType : 'image/jpg' })
                }).then(() => {
                    uploadBlob.close()
                    return imageRef.getDownloadURL()
                }).then((url) => {
                    resolve(url)
                    console.log(url)
                })
                .catch((error) => {
                    reject(error)
                })
            } else {
                RNFetchBlob.fs.readFile(uri, 'base64')
                .then((data) => {
                    return Blob.build(data, { type: `${'application/octet-stream'};BASE64` })
                })
                .then((blob) => {
                    uploadBlob = blob
                    return imageRef.put(blob, { contentType: 'application/octet-stream' })
                })
                .then(() => {
                    uploadBlob.close()
                    return imageRef.getDownloadURL()
                })
                .then((url) => {
                    resolve(url)
                })
                .catch((error) => {
                    reject(error)
                })
            }
        })
    }
    
    render() {
        return (
             <Container style={StyleSheet.flatten(styles.container)}>

                <Content>

                    <Form>

                        <Item floatingLabel={this.state.isNameEditable} stackedLabel={!this.state.isNameEditable} error={this.state.nameError}>
							<Label>Name</Label>
							<Input
                            onBlur={() => this.checkName()} 
                            onChangeText={(text) => this.setState({name:text})} 
                            editable={this.state.isNameEditable}
                            value={this.state.name}/>
						</Item>

                        
                        <Grid style={{margin: 10}}>
                            <Row style={{marginBottom: 10}}>
                                <Label style={{color: '#455A64'}}> Gender </Label>
                            </Row>
                            <Row>
                                <Col style={{flexDirection: 'row'}}>
                                    <Radio selected={this.state.option} onPress={() =>this.setState({option:!this.state.option})}
                                    disable={this.state.isGenderEditable} />
                                    <Text> Male</Text>
                                </Col>
                                <Col style={{flexDirection: 'row'}}>
                                    <Radio selected={!this.state.option} onPress={() => this.setState({option:!this.state.option})}
                                    disable={this.state.isGenderEditable}/>
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
                                    <Item inlineLabel floatingLabel={this.state.isNameEditable} stackedLabel={!this.state.isNameEditable} error={this.state.nameError}>
                                        <Label>Years</Label>
                                        
                                        <Input onChange={() => this.validarCampos(this.state.ageYears)} onBlur={() => this.checkName()} keyboardType="numeric" onChangeText={(text) => this.setState({ageYears:text})} 
                                        value={this.state.ageYears}/>
                                        
                                    </Item>
                                </Col>
                                <Col>
                                    <Item inlineLabel floatingLabel={this.state.isNameEditable} stackedLabel={!this.state.isNameEditable} error={this.state.nameError}>
                                        <Label>Months</Label>
                                        <Input onChange={() => this.validarCampos(this.state.ageMonths)} onBlur={() => this.checkName()} keyboardType="numeric" onChangeText={(text) => this.setState({ageMonths:text})} 
                                        value={this.state.ageMonths}/>
                                    </Item>
                                </Col>
                            </Row>
                        </Grid>

                        <Grid>
                            <Row>
                                <Col>
                                    <Item floatingLabel={this.state.isNameEditable} stackedLabel={!this.state.isNameEditable} error={this.state.nameError}>
                                        <Label>Weight</Label>
                                        <Input onChange={() => this.validarCampos(this.state.weight)} onBlur={() => this.checkName()} keyboardType="numeric" onChangeText={(text) => this.setState({weight:text})} 
                                        value={this.state.weight}/>
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
                                    <Item floatingLabel={this.state.isNameEditable} stackedLabel={!this.state.isNameEditable} >
                                        <Label>Height</Label>
                                        <Input onChange={() => this.validarCampos(this.state.height)} keyboardType="numeric" onChangeText={(text) => this.setState({height:text})} 
                                         value={this.state.height}/>
                                    </Item>
                                </Col>
                                <Col style={{paddingTop:50}}>
                                    <Label> cm </Label>
                                </Col>
                            </Row>
                        </Grid>
                        

                        <Button iconLeft rounded style={StyleSheet.flatten(styles.add_button)}
                            onPress={() => this.takePicture()}>
                            <Icon name='md-camera' />
                            <Text style={StyleSheet.flatten(styles.button_text)}>{this.state.isUpdate ? 'Change' : 'Add a'} photo</Text>
                        </Button>

                        <Image style={{margin: 10, height: 100, width: 100}} source={{uri: this.state.imgUrl}} />
                    
                    	<Button full rounded style={StyleSheet.flatten(styles.add_button)}
                    		onPress ={() => this.addPet()}>
							<Text style={StyleSheet.flatten(styles.button_text)}>{this.state.isUpdate ? 'Edit' : 'Add'} Pet</Text>
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