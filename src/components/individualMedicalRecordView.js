'use strict'

import React, { Component } from 'react';

import { View, Text, StyleSheet } from 'react-native';

import { Container, Content, Header, Button, Title, Right, Body, Icon, Item, Label,  
	Card, CardItem, Grid, Col, Row, Left } from 'native-base';

export default class individualMedicalRecordView extends Component {

	render() {
		return (
			<Container>

				<Header style={StyleSheet.flatten(styles.header)}>
					<Left>
						<Button transparent>
							<Icon name='arrow-back' />
						</Button>
					</Left>
					<Body>
						<Text style={styles.t_title}>Medical Record Entry</Text>
					</Body>
				</Header>

				<Content style={StyleSheet.flatten(styles.contentStyle)}>
					<Card style={StyleSheet.flatten(styles.cardStyle)}>
						
						<CardItem>
							<Left>
								<Body>
									<Text style={{fontWeight: 'bold'}}>Fever</Text>
									<Text note>May 26, 2017</Text>
								</Body>
							</Left>
						</CardItem>

						<CardItem>
							<Body>

								<Text>
									In the consultation with the vet we found that 
									Max had a little bit of fever so he was given a 
									medicine to lower it down. This medicine worked 
									very well on him and in a matter of 3 days he was 
									totally healthy.
								</Text>

								<Grid>
									<Right>

										<Row>
											<Button transparent>
												<Icon name="md-create" style={StyleSheet.flatten(styles.baseColor)}/>
											</Button>
											<Button transparent>
												<Icon name="md-trash" style={{color: '#b22222'}} />
											</Button>
										</Row>

									</Right>
								</Grid> 

							</Body>
						</CardItem>
					
					</Card>
				</Content>
			</Container>
			
			);
	}
}

const styles = StyleSheet.create({
	t_title: {
		fontSize: 18,
		color: '#fff',
		fontWeight: 'bold',
	},
	header: {
		backgroundColor: '#009688'
	},
	contentStyle: {
		padding: 20
	},
	cardStyle: {
		flex: 0
	},
	baseColor: {
		color: '#009688'
	}
});

module.exports = individualMedicalRecordView;
