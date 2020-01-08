import React from 'react';
import { 
  Image, 
  StyleSheet } from 'react-native';

import { 
  Container, 
  Header, 
  Content, 
  Card, 
  CardItem, 
  Thumbnail, 
  Text, 
  Button, 
  Icon, 
  Left,
  Body, 
  Right,
  View } from 'native-base';

import NumberFormat from 'react-number-format';
import moment from 'moment';

const EventCard = (props) => {
  if(props.id%2 !== 0){
    return (
      <Card style={styles.card}>
        <CardItem style={styles.sectionTitle1}>
          <Text numberOfLines={1} style={styles.title}>
            {props.title}
          </Text>
        </CardItem>

        <CardItem cardBody style={styles.imgContainer}>
          <Image source={{uri: props.img}} style={styles.img}/>
          <View style={{position: 'absolute', backgroundColor:'white', margin: 5, padding: 3}}>
            <NumberFormat 
              value={props.price/1000} 
              displayType={'text'} 
              thousandSeparator={true} prefix={'Rp.'} suffix={'K'}
              renderText={value => <Text style={{fontSize: 14, color: 'black'}}>{value}</Text>} 
            />      
          </View>
        </CardItem>
        
        <CardItem style={styles.sectionFooter1}>
          <Text>{moment(props.startTime).format("DD MMM YYYY")}</Text>
          <Text>{moment(props.startTime).utc().format("HH:mm")}</Text>
          <Icon reverse color="#FF5555" name="heart" />  
        </CardItem>
      </Card>
    );
  }else{
    return (
      <Card style={styles.card}>
        <CardItem style={styles.sectionTitle1}>
          <Text numberOfLines={1} style={styles.title}>
            {props.title}
          </Text>
        </CardItem>

        <CardItem cardBody style={styles.imgContainer}>
          <Image source={{uri: props.img}} style={styles.img}/>
          <View style={styles.pri}>
            <NumberFormat 
              value={props.price/1000} 
              displayType={'text'} 
              thousandSeparator={true} prefix={'Rp.'} suffix={'K'}
              renderText={value => <Text style={{fontSize: 14, color: 'black'}}>{value}</Text>} 
            />      
          </View>
        </CardItem>
        
        <CardItem style={styles.sectionFooter1}>
            <Text>{moment(props.startTime).format("DD MMM YYYY")}</Text>
            <Text>{moment(props.startTime).utc().format("HH:mm")}</Text>
            <Icon reverse color="#FF5555" name="heart" />  
        </CardItem>
      </Card>
    );
  }
}

export default EventCard;

const styles = StyleSheet.create({
  card:{
    minWidth: 300, 
    maxWidth: 300
  },

  imgContainer:{
    justifyContent: 'flex-end',
    alignItems: 'flex-start'
  },

  img:{
    height: 200, 
    width: 200, 
    flex: 1
  },

  sectionTitle1: {
    fontSize: 24,
    fontWeight: '600',
    color: 'black',
    backgroundColor: '#9fdfcd'
  },

  sectionTitle2: {
    fontSize: 24,
    fontWeight: '600',
    color: 'black',
    backgroundColor: '#f4efd3'
  },

  title:{
    fontWeight: "bold",
  },

  sectionFooter1:{
    backgroundColor: '#9fdfcd',
    justifyContent: 'space-between'
  },

  sectionFooter2:{
    backgroundColor: '#a4d4ae',
    justifyContent: 'space-between'
  }
});