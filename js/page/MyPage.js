import React, {Component} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
type Props = {};
export default class MyPage extends Component<Props> {
  render() {
    const {navigation} = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to MyPage!</Text>
        <Button
          title='改变主题色'
          onPress={() => {
            navigation.setParams({
              theme: {
                tintColor: 'gray',
                updateTime: new Date().getTime()
              }
            })
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
    backgroundColor: '#F5FCFF',
  }
});
