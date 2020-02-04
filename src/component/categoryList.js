import React, { Component } from 'react';
import { 
  Image,
  FlatList, 
  StyleSheet,
  TouchableOpacity } from 'react-native';

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
  View, 
  Icon, 
  Text } from 'native-base';

import axios from 'axios';

class CategoryList extends Component {
  constructor(){
    super();
    this.state={
      categories: []
    }
  }

  componentDidMount(){
    axios.get('https://dumbtick-api.herokuapp.com/api/v1/categories')
    .then(res=>{
      this.setState({
        categories: res.data
      })
    })
    .catch(err => {
      alert(err)
    });
  }

  componentWillUnmount(){
    this.setState({
      categories: [],
    })
  }

  customRender = ({item,index}) =>{
    <TouchableOpacity 
      style={styles.categoryCard}
      onPress={() => {this.props.navigation.navigate('CategoryPage', {id: item.id})}} >
      <View>
        <Image source={{uri: item.urlImage}} style={styles.img} />
        <Text>{item.name}</Text>
      </View>
    </TouchableOpacity>
  }
  
  render(){
    const {categories} = this.state;
    return (
      <Content>
        <FlatList
          data={categories}
          renderItem={this.customRender}
          keyExtractor={(item) => item.id.toString()}
        />
      </Content>
    );
  }
}

export default CategoryList;
const styles = StyleSheet.create({

});
