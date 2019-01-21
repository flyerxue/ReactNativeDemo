import React, {Component} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import NavigationUtil from "../navigator/NavigationUtil";
type Props = {};
export default class MyPage extends Component<Props> {
  render() {
    const {navigation} = this.props;
    return (
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
    );
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
