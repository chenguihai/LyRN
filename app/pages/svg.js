import React, { Component } from 'react';
import { View } from 'react-native';


export default class SvgPage extends Component {
    render() {
        return (
            <View style={{ flex: 1 }}>
                <BoxShadow setting={shadowOpt}>
                    <View style={{
                        width: 100,
                        height: 100,
                        backgroundColor: '#FFF',
                        borderRadius: 4
                    }} />
                </BoxShadow>
            </View>
        );
    }
}
