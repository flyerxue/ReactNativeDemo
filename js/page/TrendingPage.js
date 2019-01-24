import React, {Component} from 'react';
import {FlatList, StyleSheet, Text, View, RefreshControl, ActivityIndicator, DeviceInfo} from 'react-native';
import {connect} from 'react-redux'
import actions from '../actions/index'
import {createMaterialTopTabNavigator, createAppContainer} from 'react-navigation'
import  NavigationUtil from '../navigator/NavigationUtil'
import TrendingItem from '../common/TrendingItem'
import Toast from 'react-native-easy-toast'
import NavigationBar from '../common/NavigationBar'

const URL = 'https://github.com/trending/';
const QUERY_STR = '&sort=stars';
const THEME_COLOR = '#678';
type Props = {};
export default class TrendingPage extends Component<Props> {
  constructor(props){
    super(props);
    this.tabNames = ['All', 'C', 'C#', 'PHP', 'JavaScript']
  }
  _genTabs() {
    const tabs = {}
    this.tabNames.forEach((item, index) => {
      tabs[`tab${index}`] = {
        screen: (props) => {
          return (
            <TrendingTabPage
              {...props}
              tabLabel={item}
            />
          )
        },
        navigationOptions: {
          title: item
        }
      }
    })
    return tabs
  }
  render() {
    let statusBar = {
      backgroundColor: THEME_COLOR,
      barStyle: 'light-content'
    };
    let navigationBar = <NavigationBar
      title={'最热'}
      statusBar={statusBar}
      style={{backgroundColor: THEME_COLOR}}
    />;
    const TabNavigator = createAppContainer(createMaterialTopTabNavigator(
      this._genTabs(), {
        tabBarOptions: {
          tabStyle: styles.tabStyle,
          upperCaseLabel: false, //是否使标签大写,默认为true
          scrollEnabled: true, // 是否支持选项卡滚动, 默认为false
          style: {
            backgroundColor: '#678', //TabBar的背景颜色
            height: 30
          },
          indicatorStyle: styles.indicatorStyle, // 标签指示器的样式
          labelStyle: styles.labelStyle, // 文字的样式
        }
      }
    ))
    return (
      <View style={{flex: 1, marginTop: DeviceInfo.isIPhoneX_deprecated ? 30 : 0}}>
        {navigationBar}
        <TabNavigator/>
      </View>

    );
  }
}

const pageSize = 10; // 设置为常量,防止修改
class TrendingTab extends Component<Props> {
  constructor(props) {
    super(props)
    const {tabLabel} = this.props
    this.storeName = tabLabel
  }
  componentDidMount() {
    this.loadData()
  }
  loadData(loadMore) {
    const {onRefreshTrending, onLoadMoreTrending} = this.props;
    const store = this._store()
    const url = this.genFetchUrl(this.storeName)
    if(loadMore){
      onLoadMoreTrending(this.storeName, ++store.pageIndex, pageSize, store.items, callback => {
        this.refs.toast.show('没有更多了')
      })
    } else {
      onRefreshTrending(this.storeName, url, pageSize)
    }
  }

  /**
   * 获取当前页面有关的数据
   * @returns {*}
   * @private
   */
  _store() {
    const {trending} = this.props
    let store = trending[this.storeName]
    if(!store) {
      store = {
        items: [],
        isLoading: false,
        projectModes: [], // 要显示的数据
        hideLoadingMore: true, // 默认隐藏加载更多
      }
    }
    return store
  }
  genFetchUrl(key) {
    return URL + key + '?since=daily'
  }
  renderItem(data) {
    const item = data.item
    return (
      <TrendingItem
        item={item}
        onSelect={() => {

        }}
      />
    )
  }
  genIndicator() {
    return this._store().hideLoadingMore ? null :
      <View style={styles.indicatorContainer}>
        <ActivityIndicator
          style={styles.indicator}
        />
        <Text>正在加载更多</Text>
      </View>
  }
  render() {
    let store = this._store()
    return (
      <View style={styles.container}>
        <FlatList
          data={store.projectModes}
          renderItem = {data => this.renderItem(data)}
          keyExtractor={item => '' + (item.id || item.fullName)}
          refreshControl={
            <RefreshControl
              title={'Loading'}
              titleColor={THEME_COLOR}
              tintColor={THEME_COLOR}
              refreshing={store.isLoading}
              onRefresh={() => this.loadData()}
            />
          }
          ListFooterComponent={() => this.genIndicator()}
          onEndReached={() => {
            // console.log('-----------onEndReached-----------')
            setTimeout(() => {
              if(this.canLoadMore) {
                this.loadData(true)
                this.canLoadMore = false
              }
            }, 100)

          }}
          onEndReachedThreshold={0.5}
          onMomentumScrollBegin={() => {
            this.canLoadMore = true // fix 初始化时页调用onEndReached的问题
            // console.log('------------onMomentumScrollBegin------')
          }}
        />
        <Toast
          ref={'toast'}
          position={'center'}
        />
      </View>
    );
  }
}
const mapStateToProps = state => ({
  trending: state.trending
})

const mapDispatchToProps = dispatch => ({
  onRefreshTrending: (storeName, url, pageSize) => dispatch(actions.onRefreshTrending(storeName, url, pageSize)),
  onLoadMoreTrending: (storeName, pageIndex, pageSize, items, callBack) => dispatch(actions.onLoadMoreTrending(storeName, pageIndex, pageSize, items, callBack))
})

// 注意: connect 只是个function, 并不一定非要放在export后面
const TrendingTabPage = connect(mapStateToProps, mapDispatchToProps)(TrendingTab)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  tabStyle: {
    // minWidth: 50
    padding: 0
  },
  indicatorStyle: {
    height: 2,
    backgroundColor: '#fff'
  },
  labelStyle: {
    fontSize: 13,
    margin: 0
  },
  indicatorContainer: {
    alignItems: 'center'
  },
  indicator: {
    color: 'red',
    margin: 10
  }
});
