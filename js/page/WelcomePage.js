import React, {Component} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';

type Props = {};
export default class WelcomePage extends Component<Props> {
  componentDidMount() {
    console.log('this.props',this.props);
    this.timer = setTimeout(() => {
      const {navigation} = this.props
      navigation.navigate('Main')
    }, 2000)
  }
  componentWillUnMount() {
    this.timer && clearTimeout(this.timer)
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to WelcomePage!</Text>
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
