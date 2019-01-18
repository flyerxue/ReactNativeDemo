import React, {Component} from 'react';
import {Button, StyleSheet, Text, View, TextInput, AsyncStorage} from 'react-native';
import DataStore from '../expand/dao/DataStore'
type Props = {};
const KEY = 'save'
export default class DataStoreDemoPage extends Component<Props> {
  constructor(props) {
    super(props)
    this.state = {
      showText: ''
    }
    this.dataStore = new DataStore()
  }
  loadData() {
    let url = `https://api.github.com/search/repositories?q=${this.value}`;
    this.dataStore.fetchData(url)
      .then((data) => {
        let showData = `初次数据加载时间: ${new Date(data.timestamp)} \n ${JSON.stringify(data.data)}`
        this.setState({
          showText: showData
        })
      })
      .catch((error) => {
        error && console.log(error)
      })
  }
  render() {
    const {navigation} = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>离线缓存框架设计!</Text>
        <TextInput
          style={styles.input}
          placeholder="Type here to translate!"
          onChangeText={(text) => {
            this.value = text
          }}
        />
        <Text onPress={() => {
          this.loadData()
        }}>
          获取
        </Text>

        <Text>{this.state.showText}</Text>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 10,
  },
  input_container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
    justifyContent: 'space-around'
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: 'black',
    marginRight: 10,
    justifyContent: 'center'
  },

});
