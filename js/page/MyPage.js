import React, {Component} from 'react';
import {Button, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import NavigationUtil from "../navigator/NavigationUtil";
import NavigationBar from '../common/NavigationBar'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Feather from 'react-native-vector-icons/Feather'
const THEME_COLOR = '#678';
type Props = {};
export default class MyPage extends Component<Props> {
  getRightButton() {
    return (
      <View style={{flexDirection: 'row', }}>
        <TouchableOpacity onPress={() => {}}>
          <View style={{padding: 5, marginRight: 8}}>
            <Feather
              name={'search'}
              size={24}
              style={{color: '#fff'}}
            />
          </View>
        </TouchableOpacity>
      </View>
    )
  }

  getLeftButton(callBack) {
    return (
      <TouchableOpacity
        style={{padding: 8, paddingLeft: 12}}
        onPress={() => {}}
      >
        <Ionicons
          name={'ios-arrow-back'}
          size={26}
          style={{color: '#fff'}}
        />

      </TouchableOpacity>
    )
  }

  render() {
    let statusBar = {
      backgroundColor: THEME_COLOR,
      barStyle: 'light-content'
    };
    let navigationBar =
      <NavigationBar
        title={'我的'}
        statusBar={statusBar}
        style={{backgroundColor: THEME_COLOR}}
        rightButton={this.getRightButton()}
        leftButton={this.getLeftButton()}
      />;
    return (
      <View style={{flex: 1}}>
        {navigationBar}
        <Text style={styles.welcome}>MyPage</Text>
        <View style={styles.container}>
          <Text style={styles.welcome}>Welcome to MyPage!</Text>
          <Text onPress={() => {
            NavigationUtil.goPage({
              navigation: this.props.navigation
            }, 'DetailPage')
          }}>跳转到详情页</Text>
          <Button
            title={'Fetch 使用'}
            onPress={() => {
              NavigationUtil.goPage({
                navigation: this.props.navigation
              }, 'FetchDemoPage')
            }}/>
          <Button
            title={'AsyncStorage 使用'}
            onPress={() => {
              NavigationUtil.goPage({
                navigation: this.props.navigation
              }, 'AsyncStorageDemoPage')
            }}/>
          <Button
            title={'DataStore 使用'}
            onPress={() => {
              NavigationUtil.goPage({
                navigation: this.props.navigation
              }, 'DataStoreDemoPage')
            }}/>
        </View>
      </View>
    )
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
