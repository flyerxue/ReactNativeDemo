/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

type Props = {};
export default class HomePage extends Component<Props> {

  static navigationOptions = {
    title: 'Home',
    headerBackTitle: '返回哈哈',//设置返回此页面的返回按钮文案，有长度限制
  };
  render() {
    const { navigation } = this.props
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to Page1!</Text>
        <Button
          style={styles.button}
          title={'Go to Page1'}
          onPress={() => {
            navigation.navigate('Page1', {name: '动态的'})
          }}
        />
        <Button
          title={'Go to Page2'}
          onPress={() => {
            navigation.navigate('Page2')
          }}
        />
        <Button
          title={'Go to Page3'}
          onPress={() => {
            navigation.navigate('Page3', {name: 'Devio'})
          }}
        />
        <Button
          title={'Go to Bottom Navigator'}
          onPress={() => {
            navigation.navigate('Bottom')
          }}
        />
        <Button
          title={'Go to Top Navigator'}
          onPress={() => {
            navigation.navigate('Top')
          }}
        />
        <Button
          title={'Go to DrawerNav'}
          onPress={() => {
            navigation.navigate('DrawerNav')
          }}
        />
        <Button
          title={'Go to FlatListDemo'}
          onPress={() => {
            navigation.navigate('FlatListDemo')
          }}
        />
        <Button
          title={'Go to SwipeableFlatListDemo'}
          onPress={() => {
            navigation.navigate('SwipeableFlatListDemo')
          }}
        />
        <Button
          title={'Go to SectionListDemo'}
          onPress={() => {
            navigation.navigate('SectionListDemo')
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    color: '#ccc',
  },
  button: {
    color: 'red'
  }
});
