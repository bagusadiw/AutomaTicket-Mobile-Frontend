import React, { Component, useState, useEffect } from 'react';
import { 
  AsyncStorage,
  Image, 
  StyleSheet,
  View } from 'react-native';

import { 
  Content,
  Button,
  Fab,
  Left,
  Right,
  CardItem,
  Item,
  Input,
  Icon, 
  Text } from 'native-base';

import NumberFormat from 'react-number-format';
import moment from 'moment';
import axios from 'axios';

import EventCard from '../component/eventCard'

class EventDetail extends Component {
  constructor(props){
    super(props);
    this.state={
      eventDetail: [],
      favorited: true,
      id: JSON.stringify(this.props.navigation.getParam('id')),
      textShown: -1,
    }
  }

  componentDidMount(){
    const id = this.state.id;
    axios.get(
      `https://dumbtick-api.herokuapp.com/api/v1/event/${id}`
    )
    .then(res=>{  
      this.setState({
        eventDetail: res.data
      })
    })
    .catch(err => {
      alert(err)
    }),
    axios.post(
        'https://dumbtick-api.herokuapp.com/api/v1/favorites/show', {
        idUser: AsyncStorage.getItem("id"),
        idEvent: id
      })
      .then(res=>{  
        this.setState({favorited: res.data.favorited})
      })
      .catch(err => {
        alert(err)
      });
  }

  componentWillUnmount(){
    this.setState({
      eventDetail: [],
      favorited: true,
      id: ''
    })
  }

  toggleNumberOfLines = index => {
    this.setState({
      textShown: this.state.textShown === index ? -1 : index,
    });
  };

  handleFavorite = () =>{
    // const id = this.state.id;
    // if (this.state.favorited){
    //   axios.post(
    //     'https://dumbtick-api.herokuapp.com/api/v1/favorites/delete', {
    //     idUser: AsyncStorage.getItem("id"),
    //     idEvent: id
    //   }, {
    //     headers:{
    //       authorization: "Bearer "+AsyncStorage.getItem("token")
    //     }
    //   })
    //   .then(res=>{  
    //     setFavorited(res.data.favorited)
    //   })
    //   .catch(err => {
    //     alert(err)
    //   });
    // }else{
    //   axios.post(
    //     'https://dumbtick-api.herokuapp.com/api/v1/favorites/store', {
    //     idUser: AsyncStorage.getItem("id"),
    //     idEvent: id
    //   }, {
    //     headers:{
    //       authorization: "Bearer "+AsyncStorage.getItem("token")
    //     }
    //   })
    //   .then(res=>{  
    //     setFavorited(res.data.favorited)
    //   })
    //   .catch(err => {
    //     alert(err)
    //   });
    // } 
    this.setState({
      favorited: !this.state.favorited
    })
  };

  render(){
    const {eventDetail, favorited} = this.state;

    let favoritesIcon;
    if(favorited){
      favoritesIcon =
        <Fab style={styles.fabButton} onPress={this.handleFavorite}>
          <Icon  style={styles.filledFav} reverse name="heart" />  
        </Fab>
    }else{
      favoritesIcon =
        <Fab style={styles.fabButton} onPress={this.handleFavorite}>
          <Icon style={styles.defaultFav} reverse name="heart" />  
        </Fab>
    }

    return (
      <Content style={styles.content}>
        <View>
          <Image source={{uri: eventDetail.img}} style={styles.img}/>
          {favoritesIcon}
        </View>
        <CardItem style={styles.body}>
          <View style={styles.itemBody}>
            <Text style={styles.title}>{eventDetail.title}</Text>
            <NumberFormat 
              value={eventDetail.price/1000} 
              displayType={'text'} 
              thousandSeparator={true} prefix={'Rp.'} suffix={'K'}
              renderText={value => <Text style={styles.price}>{value}</Text>} 
            />
          </View>
          <View style={styles.itemBody}>
            <Text>{eventDetail.eventCategory && eventDetail.eventCategory.name}</Text>
            <Text>{eventDetail.eventCreator && eventDetail.eventCreator.name}</Text>
          </View>
          <View style={styles.itemBody}>
            <Text>{moment(eventDetail.startTime).format("DD MMM YYYY")} - {moment(eventDetail.endTime).format("DD MMM YYYY")}</Text>
            <Text>{eventDetail.eventCreator && eventDetail.eventCreator.phone}</Text>
          </View>
          <View style={styles.itemBody}>
            <Text>{moment(eventDetail.startTime).format("HH:mm")} - {moment(eventDetail.endTime).format("HH:mm")}</Text>
            <Text>{eventDetail.eventCreator && eventDetail.eventCreator.email}</Text>
          </View>
        </CardItem>
        
        <CardItem style={styles.body}>
          <Text style={{fontWeight: 'bold'}}>Event Description</Text>
          <Text>{eventDetail.description}</Text>
        </CardItem>

        <CardItem style={styles.body}>
          <Text style={{fontWeight: 'bold'}}>Location</Text>
          <Text>{eventDetail.address}</Text>
        </CardItem>

        
          <Fab style={styles.buy} position="bottomRight">
            <Text>Buy</Text>
          </Fab>

      </Content>
    );
  }
}

export default EventDetail;

const styles = StyleSheet.create({
  content:{
    paddingTop: 10,
    backgroundColor: 'white',
  },

  img:{
    height: 300,
    width:'100%',
    flex: 1,
    resizeMode: 'stretch'
  },

  fabButton:{
    backgroundColor: 'white',
    fontSize: 50,
    position: 'absolute',
    zIndex: 9999,
    bottom: -50,
    right: 0
  },

  filledFav:{
    color: '#f44336'
  },

  defaultFav:{
    color: 'gray'
  },

  body:{
    marginTop: 15,
    flexDirection:'column'
  },

  itemBody:{
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },

  title:{
    maxWidth: "50%",
    fontWeight: "bold",
    fontSize: 15,
  },

  price:{
    fontSize: 15,
    fontWeight: 'bold', 
    color: '#42a5f5'
  },

  buy:{
    bottom: 0,
    backgroundColor:'#f44336'
  }
});