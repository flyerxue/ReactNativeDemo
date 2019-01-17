import React, {Component} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import { createBottomTabNavigator, createAppContainer, BottomTabBar } from 'react-navigation'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Entypo from 'react-native-vector-icons/Entypo'
import {connect} from 'react-redux';
import PopularPage from '../page/PopularPage'
import TrendingPage from '../page/TrendingPage'
import FavoritePage from '../page/FavoritePage'
import MyPage from '../page/MyPage'
import NavigationUtil from "../navigator/NavigationUtil";

// 在这里配置页面的路由
const TABS = {
  PopularPage: {
    screen: PopularPage,
    navigationOptions: {
      tabBarLabel: '最热',
      tabBarIcon: ({tintColor, focused}) => {
        return <MaterialIcons
          name={'whatshot'}
          size={26}
          style={{color: tintColor}}
        />
      }
    }
  },
  TrendingPage: {
    screen: TrendingPage,
    navigationOptions: {
      tabBarLabel: '趋势',
      tabBarIcon: ({tintColor, focused}) => {
        return <Ionicons
          name={'md-trending-up'}
          size={26}
          style={{color: tintColor}}
        />
      }
    }
  },
  FavoritePage: {
    screen: FavoritePage,
    navigationOptions: {
      tabBarLabel: '收藏',
      tabBarIcon: ({tintColor, focused}) => {
        return <MaterialIcons
          name={'favorite'}
          size={26}
          style={{color: tintColor}}
        />
      }
    }
  },
  MyPage: {
    screen: MyPage,
    navigationOptions: {
      tabBarLabel: '我的',
      tabBarIcon: ({tintColor, focused}) => {
        return <Entypo
          name={'user'}
          size={26}
          style={{color: tintColor}}
        />
      }
    }
  },
}
type Props = {};
class DynamicTabNavigator extends Component<Props> {
  constructor(props) {
    super(props)
    console.disableYellowBox = true
  }
  _tabNavigator() {
    const {PopularPage, TrendingPage, FavoritePage, MyPage} = TABS
    const tabs = {PopularPage, TrendingPage, FavoritePage, MyPage} //根据需要定制显示的tab
    PopularPage.navigationOptions.tabBarLabel = '最热1' // 动态配置Tab属性
    return createAppContainer(createBottomTabNavigator(tabs, {
      tabBarComponent: props => {
        return <TabBarComponent theme={this.props.theme} {...props}/>
      }
    }))
  }
  render() {
    // console.log('dynamic',this.props);
    // NavigationUtil.navigation = this.props.navigation
    const Tab = this._tabNavigator()
    return <Tab/>
  }

}
class TabBarComponent extends React.Component{
  constructor(props) {
    super(props)
    this.theme = {
      tintColor: props.activeTintColor,
      updateTime: new Date().getTime()
    }
  }
  render() {
    const {routes, index} = this.props.navigation.state;
    if(routes[index].params) {
      const { theme } = routes[index].params
      // 以最新的更新时间为主,防止被其他tab之前的修改覆盖掉
      if(theme && theme.updateTime > this.theme.updateTime) {
        this.theme = theme
      }
    }
    return (
      <BottomTabBar
        {...this.props}
        activeTintColor={this.theme.tintColor || this.props.activeTintColor}
      />
    )
  }
}


const mapStateToProps = state => ({
  theme: state.theme.theme
})
export default connect(mapStateToProps)(DynamicTabNavigator)
