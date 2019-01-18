import React, {Component} from 'react';
import {Button, StyleSheet, Text, View, TextInput} from 'react-native';
type Props = {};
export default class FetchDemoPage extends Component<Props> {
  constructor(props) {
    super(props)
    this.state = {
      showText: ''
    }
  }
  // https://api.github.com/search/repositories?q=java
  loadData() {
    let url = `https://api.github.com/search/repositories?q=${this.searchKey}`
    fetch(url)
      .then((response) => {
        if(response.ok) {
          return response.text()
        }
        // 这里抛出的错误会被catch()捕获
        throw new Error('Network response was not ok.')
      })
      .then((responseText) => {
        console.log('responseText',responseText);
        this.setState({
          showText: responseText
        })
      })
      .catch(e => {
        this.setState({
          showText: e.toString()
        })
      })
  }
  render() {
    const {navigation} = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Fetch 使用!</Text>
        <View style={styles.input_container}>
          <TextInput
            style={styles.input}
            placeholder="Type here to translate!"
            onChangeText={(text) => {
              // this.setState({text}
              this.searchKey = text
            }}
          />
          <Button
            title={'获取'}
            onPress={() => {
              this.loadData()
            }}
          />
        </View>

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
    marginHorizontal: 10
  },
  input: {
    height: 40,
    flex: 1,
    borderWidth: 1,
    borderColor: 'black',
    marginRight: 10,
    justifyContent: 'center'
  },

});
