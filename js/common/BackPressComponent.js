import React, {component} from 'react'
import { BackHandler } from "react-native";

/**
 * Android 物理回退键处理
 */

export default class BackPressComponent {
  constructor(props) {
    this._hardwareBackPress = this.onHardwareBackPress.bind(this);
    this.props = props
  }
  componentDidMount() {
    if(this.props.backPress) {
      BackHandler.addEventListener('hardwareBackPress', this.onBackPress)
    }
  }
  componentWillUnmount() {
    if(this.props.backPress) {
      BackHandler.removeEventListener('hardwareBackPress', this.onBackPress)
    }
  }
  onHardwareBackPress(e) {
    return this.props.backPress(e)
  }
}
