/**
 * @flow
 */
import {
    AppRegistry,
} from 'react-native';
import { TabNavigator } from 'react-navigation';
import { RouteConfigs, TabNavigatorConfig } from './app/navigation';

const LyRN = TabNavigator(RouteConfigs, TabNavigatorConfig);

AppRegistry.registerComponent('LyRN', () => LyRN);
