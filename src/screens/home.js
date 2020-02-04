import React, { Component, useState, useEffect } from 'react';

import { 
  Image,
  FlatList, 
  StyleSheet,
  TouchableOpacity,
  View } from 'react-native';

import { 
  CardItem,
  Content,
  Item,
  Input,
  Right, 
  Body, 
  Icon, 
  Text } from 'native-base';

import moment from 'moment';
import axios from 'axios';

import EventCard from '../component/eventCard'

class Home extends Component {

  constructor(){
    super();
    this.state={
      todayEvents: [],
      upcomingEvents: [],
      search: ''
    }
  }

  componentDidMount(){
    let today = new Date();
    let before = new Date();
    before.setDate(before.getDate() + 1);
    let tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 2);

    today = moment(today).format("YYYY-MM-DD")
    before = moment(before).format("YYYY-MM-DD")
    tomorrow = moment(tomorrow).format("YYYY-MM-DD")  

    axios.get(
      `https://dumbtick-api.herokuapp.com/api/v1/events?start_date=${today}&&end_date=${before}`
    )
    .then(res=>{  
      this.setState({
        todayEvents: res.data.events
      })
    })
    .catch(err => {
      alert(err)
    }), 
    axios.get(
      `https://dumbtick-api.herokuapp.com/api/v1/events?start_date=${before}&&end_date=${tomorrow}`
    )
    .then(res=>{  
      this.setState({
        upcomingEvents: res.data.events
      })
    })
    .catch(err => {
      alert(err)
    })
  }
  
  handleChange = event =>{  
    this.setState({ [event.target.name]: event.target.value });
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
      <Content style={{backgroundColor:"white"}}>
        <CardItem>
          <Icon style={styles.search} name="ios-search" />
          <Input style={styles.search} onChange={this.handleChange} name="search" placeholder="Search" />
        </CardItem>

        <CardItem style={styles.cardContainer}>
          <Text style={styles.eventType}>TODAY EVENTS</Text>
        </CardItem>
        <FlatList
          data={this.state.todayEvents}
          renderItem={this.customRender}
          horizontal
          keyExtractor={(item) => item.id.toString()}
        />

        <CardItem style={styles.cardContainer}>
          <Text style={styles.eventType}>UPCOMING EVENTS</Text>
        </CardItem>
        <FlatList
          data={this.state.upcomingEvents}
          renderItem={this.customRender}
          horizontal
          keyExtractor={(item) => item.id.toString()}
        />
      </Content>
      
    );
  }
}

export default Home;
const styles = StyleSheet.create({
  title:{
    fontWeight: "bold",
    fontSize: 25,
    fontFamily: "Roboto"
  },

  search:{
    fontSize: 15,
  },

  cardContainer:{
    marginTop: 5
  },

  eventType:{
    color: '#4267b2', 
    fontSize: 15, 
    fontWeight: "bold"
  }
});
