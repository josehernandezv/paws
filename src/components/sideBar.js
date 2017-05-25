'use strict'

import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    Dimensions 
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
    Right
} from 'native-base';

import { Col, Row, Grid } from 'react-native-easy-grid';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
const datas = [
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
    route: '',
    icon: 'md-paw',
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

];


class mainView extends Component {

    constructor(props) {
        super(props);
    }

    navigate(data) {
        this.props.navigator().replace({
            name: data.route,
            title: data.name,
            passProps: {}
        });
        setTimeout(() => { this.props.close();}, 300)
        
    }

    render() {
        return (
            <Container>
                <Content bounces={false} style={{ flex: 1, backgroundColor: '#fff', top: -1 }}>
                    <Image source={require('../images/LoginBackground.jpg')} style={styles.drawerCover}>
                        {/*<Image
                        square
                        style={styles.drawerImage}
                        source={require('../images/Title.png')}
                        />*/}
                        <Grid>
                            <Col>
                                <Thumbnail large size={300} source={require('../images/akita.jpg')} />     
                            </Col>
                            <Col>
                                <View style={styles.otherPets}>
                                    <Thumbnail small  source={require('../images/pastor.jpg')} style={StyleSheet.flatten(styles.petThumb)} />    
                                    <Thumbnail small  source={require('../images/pastor.jpg')} style={StyleSheet.flatten(styles.petThumb)} />    
                                </View>                  
                            </Col>
                        </Grid>
                        <H1 style={{color: '#fff'}} >Hachiko</H1>
                    </Image>

                    <List
                        dataArray={datas} renderRow={data =>
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

module.exports = mainView;
