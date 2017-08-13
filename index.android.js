/**
 * @flow
 */
import React from 'react';
import {
    AppRegistry,
} from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import AppReducer from './app/reducers';
import AppWithNavigationState from './app/navigators/AppNavigator';

class LyRN extends React.Component {
  store = createStore(AppReducer, applyMiddleware(thunk));
  
  render() {
      return (
          <Provider store={this.store}>
              <AppWithNavigationState />
          </Provider>
      );
  }
}

AppRegistry.registerComponent('LyRN', () => LyRN);

export default LyRN;
