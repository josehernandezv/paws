'use strict'

import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    Dimensions,
    TouchableWithoutFeedback ,
    AsyncStorage
} from 'react-native';

import { 
    Container,
    Content,
    Thumbnail,
    Icon,
    H1,
    List,
    ListItem,
    Left,
    Badge,
    Right,
    Spinner
} from 'native-base';

const firebase = require('../database/firebase')
import { Col, Row, Grid } from 'react-native-easy-grid';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
const petsData = [
//   {
//     name: 'Header',
//     route: 'header',
//     icon: 'phone-portrait',
//     bg: '#477EEA',
//     types: '8',
//   },
  {
    name: 'Add new pet',
    route: 'SearchAnimals',
    icon: 'md-add-circle',
  },
  {
    name: 'Medical Records',
    route: 'MedicalRecords',
    icon: 'ios-list-box',
  },
  {
    name: 'My pets',
    route: 'MyPets',
    icon: 'md-paw',
  },
  {
    name: 'Notifications',
    route: 'Notifications',
    icon: 'md-notifications',
  },
  {
    name: 'Account',
    route: '',
    icon: 'md-contact',
  },
  {
    name: 'Settings',
    route: '',
    icon: 'md-settings',
  },
  {
    name: 'Log out',
    route: 'Login',
    icon: 'md-log-out',
  },
];

const noPetsData = [
  {
    name: 'Add new pet',
    route: 'SearchAnimals',
    icon: 'md-add-circle',
  },
  {
    name: 'Account',
    route: '',
    icon: 'md-contact',
  },
  {
    name: 'Settings',
    route: '',
    icon: 'md-settings',
  },
  {
    name: 'Log out',
    route: 'Login',
    icon: 'md-log-out',
  },
];
class sideBar extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            user: {
                username: '',
                email: '',
                id: ''
            },
            currentPet: {
                name: '',
                id: '',
                imgUrl: ''
            },
            pets: [],
            isLoaded: false,
            hasPets: false,
        };
    }

    componentDidMount() {
        this.getData().done()
    }

    async refresh() {
        console.log('refreshing')
        this.setState({isLoaded:false})
        await this.getData();
    }

    async getData() {
        var user = {};
        var pets = [];
        var self = this;
        var currentPet = {};
        try {
            const value = await AsyncStorage.getItem('@PawsStore:user');
            if (value !== null){
                user = JSON.parse(value)
            }
        } catch (error) {
        }

        await firebase.database().ref("pets").orderByChild("userId").equalTo(user.id).once("value",async function(snapshot) {


            snapshot.forEach(function(child) {
                var pet = child.val()
                pet.id = child.key
                pets.push(pet)
            });

           console.log(pets.length)
           if (pets.length > 0) {
               currentPet = pets.shift()

               try {
                    await AsyncStorage.setItem('@PawsStore:pet', JSON.stringify(currentPet));
                    self.setState({user: user, currentPet:currentPet, isLoaded: true, pets : pets, hasPets: true})  
                } catch (error) {
                }

           } else {
               self.setState({user: user, isLoaded: true, hasPets: false})
           }            

        });
    }

    async changeCurrentPet(pet) {
        this.setState({isLoaded:false});
        var pets = this.state.pets;
        pets.push(this.state.currentPet);
        var currentPet = pets.shift();

        try {
            await AsyncStorage.setItem('@PawsStore:pet', JSON.stringify(currentPet));
            this.setState({isLoaded:true,currentPet:pet, pets:pets})
        } catch (error) {
        }
    }

    renderLoadingView() {
        return (
            <Container style={StyleSheet.flatten(styles.container)}>
                <Content>
                    <Spinner color='#009688' />
                </Content>
            </Container>
        );
    }

    navigate(data) {
        if (data.route == 'Login') {
            this.logout();
        }
        this.props.navigator().replace({
            name: data.route,
            title: data.name,
            passProps: {}
        });
        
        setTimeout(() => { this.props.close();},300)
    }

    async logout(){
        try {
            await AsyncStorage.removeItem('@PawsStore:user');
        } catch (error) {
        }
    }

    render() {
        if (!this.state.isLoaded) {
            return this.renderLoadingView();
        }
        return (
            <Container>
                <Content bounces={false} style={{ flex: 1, backgroundColor: '#fff', top: -1 }}>
                    <Image source={require('../images/LoginBackground.jpg')} style={styles.drawerCover}>
                    
                        {!this.state.hasPets && 
                            <Image square style={styles.drawerImage} source={require('../images/Title.png')} />
                        }

                        {this.state.hasPets &&
                            <Content>
                                <Grid>
                                    <Col>
                                        <Thumbnail large size={300} source={{uri: this.state.currentPet.imgUrl}} />     
                                    </Col>
                                    <Col>
                                        <View style={styles.otherPets}>

                                            {this.state.pets.map((pet) => 
                                                    <TouchableWithoutFeedback  key={pet.id} onPress={() => this.changeCurrentPet(pet)} >
                                                        <View>
                                                            <Thumbnail small  source={{uri: pet.imgUrl}} style={StyleSheet.flatten(styles.petThumb)}/>
                                                        </View>
                                                    </TouchableWithoutFeedback >
                                                                                
                                            )}
                                    
                                        </View>                  
                                    </Col>
                                </Grid>
                                <H1 style={{color: '#fff'}} >{this.state.currentPet.name}</H1>
                            </Content>
                        }
                        

                        
                    </Image>

                    <List
                        dataArray={this.state.hasPets ? petsData : noPetsData} renderRow={data =>
                        <ListItem button noBorder onPress={() => this.navigate(data)} >
                            <Left>
                                <Icon active name={data.icon} style={{ color: '#777', fontSize: 26, width: 30 }} />
                                <Text style={styles.text}>{data.name}</Text>
                            </Left>
                            {/*{(data.types) &&
                            <Right style={{ flex: 1 }}>
                            <Badge
                                style={{ borderRadius: 3, height: 25, width: 72, backgroundColor: data.bg }}
                            >
                                <Text style={styles.badgeText}>{`${data.types} Types`}</Text>
                            </Badge>
                            </Right>
                            }*/}
                        </ListItem>}
                        
                    />
                   
                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  welcome: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00BCD4'
  },
  drawerCover: {
    alignSelf: 'stretch',
    height: deviceHeight / 4,
    width: null,
    position: 'relative',
    marginBottom: 10,
    padding: 10,
    paddingTop: 30,
    
  },
  drawerImage: {
    position: 'absolute',
    left:  deviceWidth / 10,
    top:  deviceHeight / 13,
    width: 210,
    height: 75,
    resizeMode: 'cover',
  },
  otherPets : {
    paddingTop: 20,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  petThumb: {
      margin: 5
  },
  text: {
    fontWeight:  '500',
    fontSize: 16,
    marginLeft: 20,
  },
});

module.exports = sideBar;
