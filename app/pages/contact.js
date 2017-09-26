import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Text
} from 'react-native';

export default class ContactPage extends Component {

    static propTypes = {
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Text>新增乘客</Text>
            </View>
        );
    }
}
