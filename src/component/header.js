import React, { useState, useEffect } from 'react';
import { 
  Image,
  FlatList, 
  StyleSheet } from 'react-native';

import { 
  Header, 
  Body,
  Icon,
  Title,
  Right } from 'native-base';

const Headers = (props) => {
	return (
		<Header style={styles.header}>
      <Body>
        <Title style={styles.title}>AutomaTicket</Title>
      </Body>
      <Image source={{uri: 'https://img.icons8.com/plasticine/2x/ticket.png'}} style={styles.img}/>
      <Right>
        <Icon style={styles.icon} reverse name="heart" />
        <Icon style={styles.icon} reverse name="notifications" />
      </Right>
    </Header>
	);
}
export default Headers;

const styles = StyleSheet.create({
  header:{
    backgroundColor: '#4267b2'
  },

  title:{
    fontWeight: "bold",
    fontSize: 20,
    fontFamily: "Roboto",
    zIndex: 10
  },

  img:{
    position: 'absolute',
    zIndex: 1,
    left: 140,
    height: 50,
    width: 100
  },

  icon:{
    marginRight: 15,
    color: 'white'
  }
})