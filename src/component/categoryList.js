import React, { useState, useEffect } from 'react';
import { 
  Image,
  FlatList, 
  StyleSheet } from 'react-native';

import { 
  Container, 
  Header, 
  Title, 
  Content, 
  Footer, 
  FooterTab, 
  Button, 
  Left, 
  CardItem,
  Segment,
  Item,
  Input,
  Right, 
  Body, 
  Icon, 
  Text } from 'native-base';

import axios from 'axios';

import EventCard from '../component/eventCard'

const CategoryList = () => {
  const [categories, setCategories] = useState({ categories: [] });

  useEffect(() => {
    axios.get('http://192.168.1.21:5000/api/v1/categories')
    .then(res=>{
      setCategories(res.data)
    })
    .catch(err = {
      alert(err)
    })
      
  }, [])

  return (
    <CardItem>
      <Segment>
        <Button first><Text>Puppies</Text></Button>
        <Button last active><Text>Cubs</Text></Button>
      </Segment>
    </CardItem>
  );
}

export default CategoryList;
const styles = StyleSheet.create({
  title:{
    fontWeight: "bold",
    fontSize: 30
  },

  cardContainer:{
    backgroundColor: '#FF5555', 
    marginTop: 30
  },

  eventType:{
    color: 'white', 
    fontSize: 20, 
    fontWeight: "bold"
  },

  img:{
    height: 50, 
    width: 50, 
    flex: 1
  },
});
