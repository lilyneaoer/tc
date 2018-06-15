/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {StackNavigator, TabNavigator,createStackNavigator} from 'react-navigation';
import SplashScreen from "./app/screens/SplashScreen";
import LoginScreen from "./app/screens/LoginScreen";
import HomeScreen from "./app/screens/HomeScreen";
import ContactsScreen from "./app/screens/ContactsScreen";
import FindScreen from "./app/screens/FindScreen";
import MeScreen from "./app/screens/MeScreen";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';

// main screen
const indexScreen = TabNavigator({
  Home: {screen: HomeScreen},
  Contacts: {screen: ContactsScreen},
  WorkRoud: {screen: FindScreen},
  Me: {screen: MeScreen}
}, {
  tabBarOptions: {
    activeTintColor: '#45C018',
    inactiveTintColor: '#999999',
    showIcon: true,
    labelStyle: {
      fontSize: 12,
      marginTop: 0,
      marginBottom: 0,
    },
    style: {
      marginBottom: -2,
      backgroundColor: '#FCFCFC',
    },
    tabStyle: {}
  },
  tabBarPosition: 'bottom',
});



export default App= createStackNavigator({
  // Splash: {screen: SplashScreen},
  Login: {screen: LoginScreen},
  Home: {screen:indexScreen}
}, {
  headerMode: 'none', // 此参数设置不渲染顶部的导航条
});