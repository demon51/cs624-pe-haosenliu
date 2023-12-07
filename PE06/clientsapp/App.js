// Updated App.js for tab- and stack-driven navigations
import { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LogBox } from 'react-native';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

import Cities from './src/Cities/Cities'
import City from './src/Cities/City'
import AddCity from './src/AddCity/AddCity'

import Nations from './src/Nations/Nations'
import Nation from './src/Nations/Nation'
import AddNation from './src/AddNation/AddNation'

import { colors } from './src/theme'

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function CitiesStackScreen ({navigation, route}){
    return (
      <Stack.Navigator screenOptions={{
        headerStyle: {
          backgroundColor: colors.primary
        },
        headerTintColor: '#fff'
      }}>
      <Stack.Screen name="Cities" component={Cities} initialParams={{
        cities: route.params.cities,
        addCity: route.params.addCity,
        addLocation: route.params.addLocation}} />
      <Stack.Screen name="City" component={City} initialParams={{
        cities: route.params.cities,
        addCity: route.params.addCity,
        addLocation: route.params.addLocation}}/>
      </Stack.Navigator>
    );
}

function NationsStackScreen ({navigation, route}){
  return (
    <Stack.Navigator screenOptions={{
      headerStyle: {
        backgroundColor: colors.primary
      },
      headerTintColor: '#fff'
    }}>
    <Stack.Screen name="Nations" component={Nations} initialParams={{
      nations: route.params.nations,
      addNation: route.params.addNation,
      addLocation2: route.params.addLocation2}} />
    <Stack.Screen name="Nation" component={Nation} initialParams={{
      nations: route.params.nations,
      addNation: route.params.addNation,
      addLocation2: route.params.addLocation2}}/>
    </Stack.Navigator>
  );
}

export default class App extends Component {
  state = {
    cities: [],
    nations: []
  }
  addCity = (city) => {
    const cities = this.state.cities
    cities.push(city)
    this.setState({ cities })
  }
  addLocation = (location, city) => {
    const index = this.state.cities.findIndex(item => {
      return item.id === city.id
    })
    const chosenCity = this.state.cities[index]
    chosenCity.locations.push(location)
    const cities = [
      ...this.state.cities.slice(0, index),
      chosenCity,
      ...this.state.cities.slice(index + 1)
    ]
    this.setState({
      cities
    })
  }
  addNation = (nation) => {
    const nations = this.state.nations
    nations.push(nation)
    this.setState({ nations })
  }
  addLocation2 = (location, nation) => {
    const index = this.state.nations.findIndex(item => {
      return item.id === nation.id
    })
    const chosenNation = this.state.nations[index]
    chosenNation.locations.push(location)
    const nations = [
      ...this.state.nations.slice(0, index),
      chosenNation,
      ...this.state.nations.slice(index + 1)
    ]
    this.setState({
      nations
    })
  }
  render() {
    return (
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="CitiesNav" initialParams={{cities: this.state.cities,addCity: this.addCity,addLocation: this.addLocation}} component={CitiesStackScreen} />
          <Tab.Screen name="AddCity"   initialParams={{cities: this.state.cities,addCity: this.addCity,addLocation: this.addLocation}} component={AddCity} />
          
          <Tab.Screen name="CountryNav" initialParams={{nations: this.state.nations,addNation: this.addNation,addLocation2: this.addLocation2}} component={NationsStackScreen} />
          <Tab.Screen name="AddCountry"   initialParams={{nations: this.state.nations,addNation: this.addNation,addLocation2: this.addLocation2}} component={AddNation} />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
}