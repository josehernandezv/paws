'use strict'

import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Image,
    Dimensions
} from 'react-native';

import { 
    Container,
    Content,
    Button,
    Icon,
    Thumbnail,
    Body,
    Fab,
    H1,
    H2,
    H3,
    Text,
    Right,
    Left,
    Card,
    CardItem,

} from 'native-base';

import { Col, Row, Grid } from 'react-native-easy-grid';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
const firebase = require('../database/firebase')

class dogsDescriptionView extends Component {

    constructor(props) {
        super(props);
        this.passProps = this.props.route.passProps
        this.state = {dog: this.passProps.animal}
    }


    render() {
        var self = this;
        return (
             <Container style={StyleSheet.flatten(styles.container)}>
                

                    <Image source={{uri: this.state.dog.imgUrl}} style={styles.fullImage}/>
                    
                    <View style={styles.header}>
                        <H1>{this.state.dog.breed}</H1>
                        <Text note>Dog</Text>
                         <Fab active={true} style={{ backgroundColor: '#009688'}} position="topRight"
                      onPress={() => {
                          this.props.navigator.push({
                            name: 'FormAddPet',
                            title: 'Add new Pet',
                            passProps: {
                                animal: this.state.dog
                            }
                      })}}>
                          <Icon name="md-add" />
                    </Fab>
                    </View>
                    <Content>
                    <Card style={StyleSheet.flatten(styles.cardContainer)}>
                        <CardItem header style={StyleSheet.flatten(styles.card)}>
                            <Text style={StyleSheet.flatten(styles.title)}>General description</Text>
                        </CardItem>
                        <CardItem style={StyleSheet.flatten(styles.card)}>
                            <Body>
                                <Text>{this.state.dog.description}</Text>
                            </Body>
                        </CardItem>
                   </Card>

                   <Card style={StyleSheet.flatten(styles.cardContainer)}>
                        <CardItem header style={StyleSheet.flatten(styles.card)}>
                            <Text style={StyleSheet.flatten(styles.title)}>Height</Text>
                        </CardItem>
                        <CardItem style={StyleSheet.flatten(styles.card)}>
                            <Icon style={StyleSheet.flatten(styles.icon)} name="md-male" />
                            <Text>
                                {this.state.dog.height.male.min} - {this.state.dog.height.male.max} cm
                            </Text>
                        </CardItem>
                        <CardItem style={StyleSheet.flatten(styles.card)}>
                            <Icon style={StyleSheet.flatten(styles.icon)} name="md-female" />
                            <Text>
                                {this.state.dog.height.female.min} - {this.state.dog.height.female.max} cm
                            </Text>
                        </CardItem>
                   </Card>
                   <Card style={StyleSheet.flatten(styles.cardContainer)}>
                        <CardItem header style={StyleSheet.flatten(styles.card)}>
                            <Text style={StyleSheet.flatten(styles.title)}>Weight</Text>
                        </CardItem>
                        <CardItem style={StyleSheet.flatten(styles.card)}>
                            <Icon style={StyleSheet.flatten(styles.icon)} name="md-male" />
                            <Text>
                                {this.state.dog.weight.male.min} - {this.state.dog.weight.male.max} kg
                            </Text>
                        </CardItem>
                        <CardItem style={StyleSheet.flatten(styles.card)}>
                            <Icon style={StyleSheet.flatten(styles.icon)} name="md-female" />
                            <Text>
                                {this.state.dog.weight.female.min} - {this.state.dog.weight.female.max} kg
                            </Text>
                        </CardItem>
                   </Card>
                   <Card style={StyleSheet.flatten(styles.cardContainer)}>
                        <CardItem header style={StyleSheet.flatten(styles.card)}>
                            <Text style={StyleSheet.flatten(styles.title)}>Life span</Text>
                        </CardItem>
                        <CardItem style={StyleSheet.flatten(styles.card)}>
                            <Icon style={StyleSheet.flatten(styles.icon)} name="md-pulse" />
                            <Text>
                                {this.state.dog.lifeSpan.min} - {this.state.dog.lifeSpan.max} years
                            </Text>
                        </CardItem>
                        
                   </Card>

                    

                </Content>
               
                   
            </Container>
            
        )
    }


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    paddingTop: 55
  },
  fullImage: {
    alignSelf: 'stretch',
    height: deviceHeight / 2.5,
    width: deviceWidth,
    position: 'relative',
    marginBottom: 10,
  },
  header: {
    padding: 20
  },
  card: {
      backgroundColor: '#F5FCFF',
  },
  title: {
      fontWeight: 'bold',
      fontSize: 20
  },
  cardContainer: {
      marginLeft: 20,
      marginRight: 20,
      marginTop: 10
  },
  icon : {
      color: '#009688',
  }
});

module.exports = dogsDescriptionView;