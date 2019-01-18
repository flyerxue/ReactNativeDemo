import React, {Component} from 'react';
import {Button, StyleSheet, Text, View, TextInput, AsyncStorage} from 'react-native';
type Props = {};
const KEY = 'save'
export default class AsyncStorageDemoPage extends Component<Props> {
  constructor(props) {
    super(props)
    this.state = {
      showText: ''
    }
  }
  render() {
    const {navigation} = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>AsyncStorageDemoPage 使用!</Text>
        <TextInput
          style={styles.input}
          placeholder="Type here to translate!"
          onChangeText={(text) => {
            // this.setState({text}
            this.value = text
          }}
        />
        <View style={styles.input_container}>
          <Text onPress={() => {
            this.doSave()
          }}>
            存储
          </Text>
          <Text onPress={() => {
            this.doRemove()
          }}>
            删除
          </Text>
          <Text onPress={() => {
            this.getData()
          }}>
            获取
          </Text>
        </View>

        <Text>{this.state.showText}</Text>
      </View>
    );
  }
  /**
   * 存储数据
   * @returns {Promise<void>}
   */
  async doSave() {
    // 用法一
    AsyncStorage.setItem(KEY, this.value, error => {
      error && console.log(error.toString())
    });
    // // 用法二
    // AsyncStorage.setItem(KEY, this.value)
    //   .cache(error => {
    //     error && console.log(error.toString())
    //   });
    // // 用法三
    // try {
    //   await AsyncStorage.setItem(KEY, this.value)
    // } catch (error) {
    //   error && console.log(error.toString())
    // }

  }
  /**
   * 删除数据
   * @returns {Promise<void>}
   */
  async doRemove() {
    // 用法一
    AsyncStorage.removeItem(KEY, error => {
      error && console.log(error.toString())
    });
    // // 用法二
    // AsyncStorage.removeItem(KEY)
    //   .catch(error => {
    //     error && console.log(error.toString())
    //   })
    // // 用法三
    // try {
    //   await  AsyncStorage.removeItem(KEY)
    // } catch (error) {
    //   error && console.log(error.toString())
    // }
  }

  /**
   * 获取数据
   * @returns {Promise<void>}
   */
  async getData() {
    // 用法一
    AsyncStorage.getItem(KEY, (error, value) => {
      this.setState({
        showText: value
      });
      console.log(value);
      error && console.log(error.toString())
    });
    // // 用法二
    // AsyncStorage.getItem(KEY)
    //   .then(value => {
    //     this.setState({
    //       showText: value
    //     });
    //     console.log(value);
    //   })
    //   .catch(error => {
    //     error && console.log(error.toString())
    //   });
    // // 用法三
    // try {
    //   const value = await AsyncStorage.getItem(KEY)
    //   this.setState({
    //     showText: value
    //   });
    //   console.log(value);
    // } catch (error) {
    //   error && console.log(error.toString())
    // }
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
