import React from 'react';
import {createStackNavigator, createSwitchNavigator} from 'react-navigation';
import Page1 from '../page/Page1'
import Login from '../page/Login'
import HomePage from '../page/HomePage'

const AppStack = createStackNavigator({
  Home: {
    screen: HomePage
  },
  Page1: {
    screen: Page1
  }
})
const AuthStack = createStackNavigator({
  Login: {
    screen: Login
  }
}, {
  navigationOptions: {
    // header: null  // 可以将header设为NULL 来禁用StackNavigator的NavigatorBar
  }
})
export default createSwitchNavigator(
  {
    Auth: AuthStack,
    App: AppStack
  },
  {
    initialRouteName: 'Auth'
  }
)
