import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Text
} from 'react-native';

export default class ComboPage extends Component {

    static propTypes = {
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Text>优选服务</Text>
            </View>
        );
    }
}
