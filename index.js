/** @format */

import {AppRegistry} from 'react-native';
// import App from './App';
import { createAppContainer} from 'react-navigation'
// import { AppStackNavigator } from './navigators/AppNavigators'
// import AppNavigator from './navigators/SwitchNavigator'
import AppNavigator from './js/navigator/AppNavigator'
// import WelcomePage from './js/page/WelcomePage'
import {name as appName} from './app.json';

const AppStackNavigatorContainer = createAppContainer(AppNavigator)

AppRegistry.registerComponent(appName, () => AppStackNavigatorContainer);
