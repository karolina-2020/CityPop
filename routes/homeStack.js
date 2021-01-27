import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import Home from '../screens/homePage';
import Country from '../screens/countryPage';
import City from '../screens/cityPage';
import Population from '../screens/populationPage';
import ThreeBiggest from '../screens/threeBiggestPage';

/* Constant with screens to set navigation options  */

const screens = {
    homePage: {
        screen: Home,

        /* make title field empty for aestetic reasons */
        
        navigationOptions: { title: "" } 
    },
    cityPage: {
        screen: City,
        navigationOptions: { title: "CityPop"}
    },

    countryPage: {
        screen: Country,
        navigationOptions: { title: "CityPop" }
    },

    populationPage: {
        screen: Population,
        navigationOptions: { title: "CityPop" }
    },

   threeBiggest: {
        screen: ThreeBiggest,
        navigationOptions: { title: "CityPop"}
    }

}


const HomeStack = createStackNavigator(screens);

export default createAppContainer(HomeStack)