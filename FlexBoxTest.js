/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';


type Props = {};
export default class FlexBoxTest extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
       <View style={styles.box1}>
         <Text>1</Text>
       </View>
       <View style={styles.box1}>
         <Text>2</Text>
       </View>
       <View style={styles.box1}>
         <Text>3</Text>
       </View>
       <View style={styles.box1}>
         <Text>4</Text>
       </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row-reverse',
    backgroundColor: 'red',
    marginTop: 20
  },
  box1: {
    width: 40,
    height: 40,
    backgroundColor: 'red',
    margin: 5
  }
});
