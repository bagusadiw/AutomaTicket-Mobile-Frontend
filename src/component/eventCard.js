import React, {useState, useEffect}from 'react';
import { 
  AsyncStorage,
  Image, 
  StyleSheet } from 'react-native';

import {   
  Card, 
  CardItem, 
  Text, 
  Icon, 
  Left,
  Body, 
  Right,
  View } from 'native-base';

import NumberFormat from 'react-number-format';
import moment from 'moment';
import axios from 'axios';

const EventCard = (props) => {
  const [favorited, setFavorited] = useState({ favorited: true });
  
  useEffect(() => {
      axios.post(
        'https://dumbtick-api.herokuapp.com/api/v1/favorites/show', {
        idUser: AsyncStorage.getItem("id"),
        idEvent: props.id
      })
      .then(res=>{  
        setFavorited(res.data.favorited)
      })
      .catch(err => {
        alert(err)
      });
  }, [favorited])

  const handleFavorite = () =>{
    // if (favorited){
    //   axios.post(
    //     'https://dumbtick-api.herokuapp.com/api/v1/favorites/delete', {
    //     idUser: AsyncStorage.getItem("id"),
    //     idEvent: props.id
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
    //     idEvent: props.id
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

  let favoritesIcon;
  if(favorited){
    favoritesIcon =
      <View onPress={handleFavorite} style={styles.favoritesContainer}>          
        <Icon style={styles.filledFav} reverse name="heart" />  
      </View>
  }else{
    favoritesIcon =
      <View onPress={handleFavorite} style={styles.favoritesContainer}>          
        <Icon style={styles.defaultFav} reverse name="heart" />  
      </View>
  }

  return (
    <Card style={styles.card}>
      <CardItem style={styles.titleCard}>
        <Text numberOfLines={1} style={styles.title}>
          {props.title}
        </Text>
      </CardItem>

      <CardItem cardBody style={styles.body}>
        <Image source={{uri: props.img}} style={styles.img}/>
        <View style={styles.priceFavorites}>
          <View style={styles.priceContainer}>
            <NumberFormat 
              value={props.price/1000} 
              displayType={'text'} 
              thousandSeparator={true} prefix={'Rp.'} suffix={'K'}
              renderText={value => <Text style={styles.price}>{value}</Text>} 
            />      
          </View>
          {favoritesIcon}
        </View>
      </CardItem>
      
      <CardItem style={styles.footerCard}>
        <Text style={styles.date}>{moment(props.startTime).format("DD MMM YYYY")} </Text>
        <Text style={styles.date}> {moment(props.startTime).format("HH:mm")} </Text>
      </CardItem>
    </Card>
  );
}

export default EventCard;

const styles = StyleSheet.create({
  card:{
    width: 175,
    alignSelf: 'center',
    borderRadius: 10,
    overflow: 'hidden'
  },

  body:{
    justifyContent: 'space-between',
    alignItems: 'flex-start'
  },

  img:{
    height: 200, 
    width: 200, 
    flex: 1
  },

  titleCard: {
    backgroundColor: 'white'
  },

  title:{
    fontSize: 15,
    fontWeight: "bold",
    color:'black'
  },

  footerCard:{
    backgroundColor: 'white',
    justifyContent: 'space-between',
  },

  date:{
    fontSize: 12,
    color: 'black'
  },

  priceFavorites:{
    flexDirection: 'row',
    position: 'absolute',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: 20,
    margin: 5,
  },

  priceContainer:{
    backgroundColor: '#e3f2fd',
    paddingRight: 5,
    paddingLeft: 5,
    borderRadius: 5
  },

  price:{
    fontSize: 14,
    fontWeight: 'bold', 
    color: '#42a5f5'
  },

  favoritesContainer:{
    margin: 5, 
    padding: 3
  },

  filledFav:{
    color: '#f44336',
  },

  defaultFav:{
    color: 'gray'
  },

  dateContainer:{
    flexDirection:'row',
    justifyContent: 'space-between'
  }
});