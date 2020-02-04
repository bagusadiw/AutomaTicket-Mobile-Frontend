import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Home from '../screens/home';
import CategoryPage from '../screens/categoryPage';
import EventDetail from '../screens/eventDetail';

const href = createStackNavigator(
	{
  	Home,
  	CategoryPage,
  	EventDetail
  },
  {
      headerMode: 'none'
  },
	initialRootName = CategoryPage,
)

export default createAppContainer(href);