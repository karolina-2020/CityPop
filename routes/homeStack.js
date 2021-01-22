import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import Home from '../screens/homePage';
import Country from '../screens/countryPage';
import City from '../screens/cityPage';
//import Population from '../screens/populationPage'


const screens = {
    homePage: {
        screen: Home,
        navigationOptions: { title: "" }
    },
    cityPage: {
        screen: City,
        navigationOptions: { title: "CityPop" }
    },

    countryPage: {
        screen: Country,
        navigationOptions: { title: "CityPop" }
    }

}


const HomeStack = createStackNavigator(screens);

export default createAppContainer(HomeStack)