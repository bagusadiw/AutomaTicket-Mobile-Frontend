import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Home from '../screens/home';
import CategoryPage from '../screens/categoryPage';

const href = createStackNavigator(
	{
  	Home,
  	CategoryPage
  },
  {
      headerMode: 'none'
  },
	initialRootName = Home,
)

export default createAppContainer(href);