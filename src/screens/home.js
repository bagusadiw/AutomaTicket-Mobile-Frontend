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

const Home = () => {
  const [events, setEvents] = useState({ events: [] });
  const [categories, setCategories] = useState({ categories: [] });

  useEffect(() => {
    axios.get(
      'http://192.168.1.33:5000/api/v1/events?title='
    )
    .then(res=>{  
      setEvents(res.data.events)
    })
    .catch(err => {
      alert(err)
    })
  }, [], () =>{
    axios.get(
      'http://192.168.1.30:5000/api/v1/categories'
    )
    .then(res=>{
      setCategories(res.data)
    })
    .catch(err=>{
      alert(err)
    })
  }, [])

  // TODAY EVENTS FEED 
  const todayEvents = Array.isArray(events) && events.filter(events => {
    const date = new Date(events.startTime);
    const today = new Date();
    return (date.toString().substring(0, 10) === today.toString().substring(0, 10));
  });

  // UPCOMING EVENTS FEED 
  const upcomingEvents = Array.isArray(events) && events.filter(events => {
    const date = new Date(events.startTime);
    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return (date.toString().substring(0,10) === tomorrow.toString().substring(0,10));
  });

  return (
    <Container style={{backgroundColor: 'white'}}>
      <Header style={{backgroundColor: '#07d9c4'}}>
        <Body>
          <Title style={styles.title}>AutomaTicket</Title>
        </Body>
        <Right>
          <Image source={{uri: 'https://img.icons8.com/plasticine/2x/ticket.png'}} style={styles.img}/>          
        </Right>
      </Header>
      <Content>
        
        <CardItem style={{backgroundColor: 'white'}}>
          <Item>
            <Icon name="ios-search" />
            <Input placeholder="Search" />
          </Item>
        </CardItem>
        <CardItem style={styles.cardContainer}>
          <Text style={styles.eventType}>TODAY EVENTS</Text>
        </CardItem>
        
          <FlatList
            data={todayEvents}
            renderItem={({ item }) => 
              <EventCard  
                id={item.id}
                title={item.title}
                img={item.img}
                price={item.price}
                startTime={item.startTime}
              />
            }
            horizontal
            keyExtractor={(item) => item.id.toString()}
          />
        
        <CardItem style={styles.cardContainer}>
          <Left>
              <Text style={styles.eventType}>UPCOMING EVENTS</Text>
          </Left>
        </CardItem>
        <FlatList
            data={upcomingEvents}
            renderItem={({ item }) => 
              <EventCard  
                id={item.id}
                title={item.title}
                img={item.img}
                price={item.price}
                startTime={item.startTime}
              />
            }
            horizontal
            keyExtractor={(item) => item.id.toString()}
          />
      </Content>
    </Container>
  );
}

export default Home;
const styles = StyleSheet.create({
  title:{
    fontWeight: "bold",
    fontSize: 25,
    fontFamily: "Roboto"
  },

  cardContainer:{
    backgroundColor: '#9fdfcd', 
    marginTop: 10
  },

  eventType:{
    color: 'green', 
    fontSize: 20, 
    fontWeight: "bold"
  },

  img:{
    height: 50, 
    width: 50, 
    flex: 1
  },
});
