import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Text
} from 'react-native';

export default class ItemComponent extends Component {

    static propTypes = {
        
    }

    render() {
        return (
            <View style={{
                paddingLeft: 10,
                margin: 5,
                height: 44,
                alignItems: 'center'
            }}>
                <View>
                    <Text>优选服务</Text>
                </View>
                <View>
                    <Text></Text>
                </View>
                <View>
                    <Text>服务名称</Text>
                </View>
            </View>
        );
    }
}
