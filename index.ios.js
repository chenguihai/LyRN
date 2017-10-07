/**
 * @flow
 */
import React from 'react';
import {
    AppRegistry,
    View
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
                <View
                    style={{
                        flex: 1,
                        backgroundColor: '#efeff4',
                    }}
                >
                    {/* statusBar背景开始 */}
                    <View style={{
                        height: scaleSize(20),
                        backgroundColor: '#FFF'
                    }}></View>
                    {/* statusBar背景结束 */}
                    <AppWithNavigationState />
                </View>
            </Provider>
        );
    }
}

AppRegistry.registerComponent('LyRN', () => LyRN);

export default LyRN;
