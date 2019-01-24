import React, {Component} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {connect} from 'react-redux';
import actions from '../actions/index'
type Props = {};
class TrendingPage extends Component<Props> {
  render() {
    const {navigation} = this.props;
    console.log('Trending',this.props);
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to TrendingPage!</Text>
        <Button
          title='改变主题颜色'
          onPress={()=> {

            // redux之前操作
            // navigation.setParams({
            //   theme: {
            //     tintColor: 'red',
            //     updateTime: new Date().getTime()
            //   }
            // })

            this.props.onThemeChange('orange')
          }}
        />
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

const mapStateToProps = state =>({});
const mapDispatchToProps = dispatch =>({
  onThemeChange: theme => dispatch(actions.onThemeChange(theme))
});
export default connect(mapStateToProps, mapDispatchToProps)(TrendingPage)
