import React, {Component} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Entypo from 'react-native-vector-icons/Entypo'

import PopularPage from './PopularPage'
import TrendingPage from './TrendingPage'
import FavoritePage from './FavoritePage'
import MyPage from './MyPage'
import NavigationUtil from "../navigator/NavigationUtil";

import DynamicTabNavigator from '../navigator/DynamicTabNavigator'

type Props = {};
export default class HomePage extends Component<Props> {
  // _tabNavigator() {
  //   return createAppContainer(createBottomTabNavigator({
  //     PopularPage: {
  //       screen: PopularPage,
  //       navigationOptions: {
  //         tabBarLabel: '最热',
  //         tabBarIcon: ({tintColor, focused}) => {
  //           return <MaterialIcons
  //             name={'whatshot'}
  //             size={26}
  //             style={{color: tintColor}}
  //           />
  //         }
  //       }
  //     },
  //     TrendingPage: {
  //       screen: TrendingPage,
  //       navigationOptions: {
  //         tabBarLabel: '趋势',
  //         tabBarIcon: ({tintColor, focused}) => {
  //           return <Ionicons
  //             name={'md-trending-up'}
  //             size={26}
  //             style={{color: tintColor}}
  //           />
  //         }
  //       }
  //     },
  //     FavoritePage: {
  //       screen: FavoritePage,
  //       navigationOptions: {
  //         tabBarLabel: '收藏',
  //         tabBarIcon: ({tintColor, focused}) => {
  //           return <MaterialIcons
  //             name={'favorite'}
  //             size={26}
  //             style={{color: tintColor}}
  //           />
  //         }
  //       }
  //     },
  //     MyPage: {
  //       screen: MyPage,
  //       navigationOptions: {
  //         tabBarLabel: '我的',
  //         tabBarIcon: ({tintColor, focused}) => {
  //           return <Entypo
  //             name={'user'}
  //             size={26}
  //             style={{color: tintColor}}
  //           />
  //         }
  //       }
  //     },
  //   }))
  // }
  render() {
    NavigationUtil.navigation = this.props.navigation
    // const Tab = this._tabNavigator()
    return <DynamicTabNavigator/>
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});
