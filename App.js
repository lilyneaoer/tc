/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {StackNavigator, TabNavigator} from 'react-navigation';
import SplashScreen from "./app/screens/SplashScreen";
import LoginScreen from "./app/screens/LoginScreen";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';

export default App= StackNavigator({
  Splash: {screen: SplashScreen},
  Login: {screen: LoginScreen}
}, {
  headerMode: 'none', // 此参数设置不渲染顶部的导航条
});