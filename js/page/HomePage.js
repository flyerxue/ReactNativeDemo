import React, {Component} from 'react';
import NavigationUtil from "../navigator/NavigationUtil";
import {connect} from 'react-redux';
import {BackHandler} from 'react-native'
import {NavigationActions} from 'react-navigation'

import DynamicTabNavigator from '../navigator/DynamicTabNavigator'
import BackPressComponent from "../common/BackPressComponent";

type Props = {};
class HomePage extends Component<Props> {
  constructor(props) {
    super(props)
    this.backPress = new BackPressComponent({backPress: this.onBackPress()})
  }
  componentDidMount() {
    this.backPress.componentDidMount()
  }
  componentWillUnmount() {
    this.backPress.componentWillUnmount()
  }
  /**
   * 处理 android 中的物理返回键
   * https://reactnavigation.org/docs/en/redux-integration.html#handling-the-hardware-back-button-in-android
   * @returns {boolean}
   */
  onBackPress = () => {
    const {dispatch, nav} = this.props
    if(nav.routes[1].index === 0) {  //如果RootNavigator中的MainNavigator的index为0，则不处理返回事件
      return false
    }
    dispatch(NavigationActions.back())
    return true
  }
  render() {
    NavigationUtil.navigation = this.props.navigation
    return <DynamicTabNavigator/>
  }

}
const mapStateToProps = state =>{
  return  ({
    nav: state.nav
  })
}
export default connect(mapStateToProps)(HomePage)
