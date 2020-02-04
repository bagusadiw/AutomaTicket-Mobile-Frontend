import React, { Component, useState, useEffect } from 'react';

import { 
  Image,
  FlatList, 
  StyleSheet,
  TouchableOpacity,
  View } from 'react-native';

import { 
  Container,
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

class CategoryPage extends Component {
  constructor(){
    super();
    this.state={
      events: []
    }
  }
  componentDidMount(){
    axios.get(
      'https://dumbtick-api.herokuapp.com/api/v1/events'
    )
    .then(res=>{  
      this.setState({
        events: res.data.events
      })
    })
    .catch(err => {
      alert(err)
    })
  }

  componentWillUnmount(){
    this.setState({
      events: [],
    })
  }

  customRender = ({ item, index }) => (
    <TouchableOpacity 
      onPress={() => {this.props.navigation.navigate('EventDetail', {id: item.id})}} >
      <EventCard  
        index={index}
        id={item.id}
        title={item.title}
        img={item.img}
        price={item.price}
        startTime={item.startTime}
      />
    </TouchableOpacity>
  );
  render(){
    return (
      <Container>
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
          <View>
          <FlatList
            data={this.state.events}
            renderItem={this.customRender}
            numColumns={3}
            keyExtractor={(item, index) => item.id.toString()}
          />
          </View>
        </Content>
      </Container>
    );
  }
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