import React, {Component} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {createMaterialTopTabNavigator, createAppContainer} from 'react-navigation'
import  NavigationUtil from '../navigator/NavigationUtil'

type Props = {};
export default class PopularPage extends Component<Props> {
  render() {
    const TabNavigator = createAppContainer(createMaterialTopTabNavigator({
      PopularTab1: {
        screen: PopularTab,
        navigationOptions: {
          title: 'Tab1'
        }
      },
      PopularTab2: {
        screen: PopularTab,
        navigationOptions: {
          title: 'Tab2'
        }
      }
    }))
    return (
      <TabNavigator/>
    );
  }
}

class PopularTab extends Component<Props> {
  render() {
    console.log('this.props',this.props);
    const {tabLabel} = this.props
    console.log('tabLabel',tabLabel);
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>{tabLabel}</Text>
        <Text onPress={() => {
          NavigationUtil.goPage({
            navigation: this.props.navigation
          }, 'DetailPage')
        }}>跳转到详情页</Text>
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
