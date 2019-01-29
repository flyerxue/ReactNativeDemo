import React, {Component} from 'react';
import {Button, StyleSheet, Text, View, WebView, TouchableOpacity} from 'react-native';
import NavigationBar from '../common/NavigationBar'
import ViewUtil from '../util/ViewUtil'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import NavigationUtil from "../navigator/NavigationUtil";
import BackPressComponent from "../common/BackPressComponent";

type Props = {};
const THEME_COLOR = '#678';
const TRENDING_URL = 'https://github.com';

export default class DetailPage extends Component<Props> {
  constructor(props) {
    super(props)
    this.params = this.props.navigation.state.params;
    const {projectModes} = this.params;
    this.url = projectModes.html_url ||  TRENDING_URL + projectModes.fullName;
    const title = projectModes.full_name || projectModes.fullName;
    this.state = {
      title: title,
      url: this.url,
      canGoBack: false
    }
    this.backPress = new BackPressComponent({backPress: () => this.onBackPress()})
  }
  componentDidMount() {
    this.backPress.componentDidMount()
  }
  componentWillUnmount() {
    this.backPress.componentWillUnmount()
  }
  onBackPress() {
    this.onBack()
    return true
  }
  onBack() {
    if(this.state.canGoBack) {
      this.webView.goBack()
    } else {
      NavigationUtil.goBack(this.props.navigation)
    }
  }
  renderRightButton() {
    return (
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          onPress={() => {

          }}
        >
          <FontAwesome
            name={'star-o'}
            size={20}
            style={{color: '#fff', marginRight: 10}}
          />
        </TouchableOpacity>
        {ViewUtil.getShareButton(() => {

        })}
      </View>
    )
  }
  onNavigationStateChange(navState) {
    this.setState({
      canGoBack: navState.canGoBack,
      url:navState.url
    })
  }

  render() {
    const titleLayoutStyle = this.state.title.length > 20 ? {paddingRight: 30} : null
    let navigationBar = <NavigationBar
      leftButton={ViewUtil.getLeftBackButton(() => this.onBack())}
      titleLayoutStyle={titleLayoutStyle}
      title={this.state.title}
      style={{backgroundColor: THEME_COLOR}}
      rightButton={this.renderRightButton()}
    />;


    return (
      <View style={styles.container}>
        {navigationBar}
        <WebView
          ref={webView => {
            this.webView = webView
          }}
          startInLoadingState={true}
          onNavigationStateChange={e => {
            this.onNavigationStateChange(e)
          }}
          source={{uri: this.state.url}}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: DeviceInfo.isIPhoneX_deprecated ? 30 : 0
  }
});
