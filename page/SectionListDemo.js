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
  TouchableHighlight,
  SectionList
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

type Props = {};
const CITY_NAMES = [
  {
    data: ['北京', '上海', '广州', '深圳'],
    title: '一线城市'
  },
  {
    data: ['杭州', '苏州', '成都', '武汉'],
    title: '二三线城市1'
  },
  {
    data: ['洛阳', '厦门', '青岛', '拉萨'],
    title: '二三线城市2'
  }
]
export default class SectionListDemo extends Component<Props> {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
      dataArray: CITY_NAMES,
    }
  }
  _keyExtractor(data, index){
    return index.toString()
  }
  // 列表渲染item
  _renderItem(item) {
    return (
      <View style={styles.item}>
        <Text style={styles.text}>{item}</Text>
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
        dataArray = this.state.dataArray.concat(CITY_NAMES)
      }

      this.setState({
        isLoading: false,
        dataArray: dataArray
      })
    }, 200)
  }
  _renderSectionHeader(section) {
    return (
      <View style={styles.sectionHeader}>
        <Text style={styles.text}>{section.title}</Text>
      </View>
    )
  }
  render() {
    return (
      <View style={styles.container}>
        <SectionList
          renderItem={({ item }) => this._renderItem(item)}
          renderSectionHeader={({ section }) => this._renderSectionHeader(section)}
          sections={this.state.dataArray}
          keyExtractor={this._keyExtractor}
          ItemSeparatorComponent={() => {
            return (
              <View style={styles.separator}></View>
            )
          }}
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
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa'
  },
  item: {
    height: 80,
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    color: '#333',
    fontSize: 20
  },
  indicatorContainer: {
    alignItems: 'center'
  },
  indicator: {
    color: 'red',
  },
  sectionHeader: {
    height: 50,
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center'
  },
  separator:{
    height: 1,
    backgroundColor: '#ccc',
    flex: 1
  }

});
