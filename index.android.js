/**
 * @flow
 */
import React from 'react';
import {
    AppRegistry,
} from 'react-native';
import { Provider } from 'react-redux';
import store from './app/store/configureStore';
// 配置react-native-storage
import './app/configureStorage';

import AppWithNavigationState from './app/navigators/AppNavigator';

class LyRN extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <AppWithNavigationState />
            </Provider>
        );
    }
}

AppRegistry.registerComponent('LyRN', () => LyRN);

export default LyRN;
