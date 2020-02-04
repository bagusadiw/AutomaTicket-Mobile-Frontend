import React from 'react';
import 'react-native-gesture-handler';

import { 
  Image,
  FlatList, 
  StyleSheet,
  TouchableHighlight,
  View } from 'react-native';

import {Container} from 'native-base';

import { Provider } from 'react-redux';
// import store from './redux/store';

import Header from './src/component/header'
import Navigation from './src/navigation/navigation';
import Home from './src/screens/home';
// import CategoryList from './src/component/categoryList';
import CategoryPage from './src/screens/categoryPage';
import Footer from './src/component/footer';

const App: () => React$Node = () => {
  return (
  	<Container>
	  	<Header />
	    <Navigation />
	    <Footer />
    </Container>
    // <Home />
    // <CategoryList />

  );
};

export default App;
