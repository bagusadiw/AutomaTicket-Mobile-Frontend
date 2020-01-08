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
  DatePicker,
  Segment,
  Item,
  Input,
  Right, 
  Body, 
  Icon, 
  Text } from 'native-base';

import axios from 'axios';

import EventCard from '../component/eventCard'

const CategoryPage = (props) => {
  const [events, setEvents] = useState({ events: [] });

  useEffect(() => {
    const idCategory = props.idCategory
    axios.get(
      `http://192.168.1.51:5000/api/v1/events`
    )
    .then(res=>{  
      setEvents(res.data)
    },)
    .catch(err => {
      alert(err)
    });
      
  }, [])

  return (
    <Container>
      <Header style={{backgroundColor: '#07d9c4'}}>
        <Body>
          <Title style={styles.title}>AutomaTicket</Title>
        </Body>
        <Right>
          <Image source={{uri: 'https://img.icons8.com/plasticine/2x/ticket.png'}} style={styles.img}/>          
        </Right>
      </Header>

      <Content>
        <CardItem style={styles.cardContainer}>
          <Left>
              <Text style={styles.eventType}>Category : Sport</Text>
          </Left>
        </CardItem>
        <CardItem>
          <Text>
            Search by Date :
          </Text>
          <DatePicker
            defaultDate={new Date()}
            minimumDate={new Date(2010, 1, 1)}
            maximumDate={new Date(2030, 12, 31)}
            locale={"en"}
            timeZoneOffsetInMinutes={undefined}
            modalTransparent={false}
            animationType={"fade"}
            androidMode={"default"}
            placeHolderText="Select date"
            textStyle={{ color: "green" }}
            placeHolderTextStyle={{ color: "#d3d3d3" }}
            disabled={false}
          />
        </CardItem>
        
          <FlatList
            data={events}
            renderItem={({ item }) => 
              <EventCard  
                id={item.id}
                title={item.title}
                img={item.img}
                price={item.price}
                startTime={item.startTime}
              />
            }
            keyExtractor={(item, index) => index}
          />
      </Content>
    </Container>
  );
}

export default CategoryPage;

const styles = StyleSheet.create({
  title:{
    fontWeight: "bold",
    fontSize: 25,
    fontFamily: "Roboto"
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