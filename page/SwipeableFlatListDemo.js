/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
  Button,
  StyleSheet,
  Text,
  View,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  SwipeableFlatList,
  TouchableHighlight
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

type Props = {};
const array = [{key: '0'}, {key: '1'}, {key: '2'}, {key: '3'}, {key: '4'}, {key: '5'}]
export default class SwipeableFlatListDemo extends Component<Props> {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
      dataArray: array,
    }
  }
  _keyExtractor(data, index){
    return index.toString()
  }
  // 列表渲染item
  _renderItem(item) {
    return (
      <View style={styles.item}>
        <Text style={styles.text}>{item.key}</Text>
      </View>
    )
  }
  // 上拉加载loading效果
  genIndicator() {
    return (
      <View style={styles.indicatorContainer}>
        <ActivityIndicator
          style={styles.indicator}
          size={'large'}
          color={'red'}
          animating={true}
        />
        <Text>正在加载更多</Text>
      </View>
    )
  }
  // 上拉加载 下拉刷新 加载数据
  loadData(refresh) {
    if(refresh) {
      this.setState({
        isLoading: true
      })
    }
    setTimeout(() => {
      let dataArray = []
      if(refresh) {
        for(let i = this.state.dataArray.length -1; i>=0; i--) {
          dataArray.push(this.state.dataArray[i])
        }
      } else {
        dataArray = this.state.dataArray.concat(array)
      }

      this.setState({
        isLoading: false,
        dataArray: dataArray
      })
    }, 200)
  }
  genQuickActions() {
    return  (
      <View style={styles.quickContainer}>
        <TouchableHighlight
          onPress={() => {
            alert('确认删除?')
          }}
        >
          <View style={styles.quick}>
            <Text style={styles.text}>删除</Text>
          </View>
        </TouchableHighlight>
      </View>
    )
  }
  render() {
    return (
      <View style={styles.container}>
        <SwipeableFlatList
          data={this.state.dataArray}
          renderItem={({item}) => this._renderItem(item)}
          keyExtractor={this._keyExtractor}
          maxSwipeDistance={100}
          bounceFirstRowOnMount={false}
          // refreshing={this.state.isLoading}
          // onRefresh={() => {
          //   this.loadData()
          // }}
          refreshControl={
            (
              <RefreshControl
                colors={['red']}
                refreshing={this.state.isLoading}
                onRefresh={() => {
                  this.loadData(true)
                }}
              />
            )
          }
          ListFooterComponent={() => this.genIndicator()}
          onEndReached={() => this.loadData()}
          renderQuickActions={() => this.genQuickActions()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    backgroundColor: '#169',
    height: 100,
    marginRight: 15,
    marginLeft: 15,
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    color: '#fff',
    fontSize: 20
  },
  indicatorContainer: {
    alignItems: 'center'
  },
  indicator: {
    color: 'red',
  },
  quickContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginRight: 15,
    marginBottom: 15
  },
  quick: {
    backgroundColor: 'red',
    flex: 1,
    alignItems:'flex-end',
    justifyContent: 'center',
    padding: 10,
    width: 200
  }

});
