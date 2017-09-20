import React, { Component } from 'react';
import {
    View,
    Image,
} from 'react-native';

export default class LoadingComponent extends Component {

    render() {
        return (
            <View style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <Image
                    source={require('../../images/gif-loading.gif')}
                    style={{
                        width: 150,
                        height: 150,
                        marginTop: -75
                    }}
                />
            </View>
        );
    }
}
