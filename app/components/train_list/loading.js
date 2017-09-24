import React, { Component } from 'react';
import {
    View,
    Image,
    Dimensions,
    StatusBar
} from 'react-native';

export default class LoadingComponent extends Component {

    render() {
        const { width, height } = Dimensions.get('window');

        return (
            <View style={{
                position: 'absolute',
                width,
                height: height - StatusBar.currentHeight,
                top: 0,
                left: 0,
                zIndex: 999,
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
