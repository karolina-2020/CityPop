import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import Home from '../screens/homePage';
//import Country from '../screens/countryPage';
import City from '../screens/cityPage';
//import Population from '../screens/populationPage'

const screens = {
    homePage: {
        screen: Home
    },
    cityPage: {
        screen: City
    }

}

const HomeStack = createStackNavigator(screens);

export default createAppContainer(HomeStack)