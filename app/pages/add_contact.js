import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Text,
    TextInput,
    Picker,
    Dimensions,
    Animated,
    Easing,
    StyleSheet,
    TouchableOpacity
} from 'react-native';

import ListItemComponent from '../components/list_item';

export default class AddContactPage extends Component {

    static propTypes = {
        
    }

    animatedValue = new Animated.Value(0)

    state = {
        ticketType: {
            currentVal: '成人票',
            val: [
                '成人票',
                '儿童票'
            ]
        },
        cardType: {
            currentVal: '身份证',
            val: [
                '身份证',
                '护照',
                '台胞证',
                '港澳通行证'
            ]
        },
        key: 'cardType'
    }

    _renderTitle(title) {
        return (
            <View style={{
                flex: 1
            }}>
                <Text style={{
                    color: '#666',
                    fontSize: setSpText(16)
                }}>{title}</Text>
            </View>
        );
    }

    _renderInputAfter(placeholder) {
        return (
            <View style={{
                flex: 2.3
            }}>
                <TextInput
                    underlineColorAndroid="transparent"
                    placeholder={placeholder}
                    placeholderTextColor="#CCC"
                    style={{
                        padding: scaleSize(0),
                        fontSize: setSpText(16),
                        // lineHeight: setSpText(16),
                        // height: scaleSize(44),
                        flex: 1
                    }}
                />
            </View>
        );
    }

    _renderAfter = (key) => {
        return (
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                    requestAnimationFrame(() => {
                        this.setState({
                            key
                        });
                        Animated.timing(this.animatedValue, {
                            toValue: 1,
                            duration: 300,
                            easing: Easing.linear
                        }).start();
                    });
                }} 
                style={{
                    flex: 2.3
                }}
            >
                <Text>{this.state[key].currentVal}</Text>
            </TouchableOpacity>
        );
    }

    render() {
        const { key } = this.state;
        const { width } = Dimensions.get('window');

        return (
            <View style={{
                flex: 1
            }}>
                <ListItemComponent 
                    data={{
                        borderRadius: 2,
                        list: [
                            {
                                iconStyle: {
                                    opacity: 0,
                                },
                                title: this._renderTitle('姓名'),
                                after: this._renderInputAfter('乘客姓名')
                            },
                            {
                                iconDirection: 'down',
                                title: this._renderTitle('车票类型'),
                                after: this._renderAfter('ticketType')
                            },
                            {
                                iconDirection: 'down',
                                title: this._renderTitle('证件类型'),
                                after: this._renderAfter('cardType')
                            },
                            {
                                iconStyle: {
                                    opacity: 0,
                                },
                                title: this._renderTitle('证件号码'),
                                after: this._renderInputAfter('证件号码')
                            }
                        ]
                    }}
                />
                <Animated.View style={{
                    position: 'absolute',
                    bottom: this.animatedValue.interpolate({
                        inputRange: [
                            0, 
                            1
                        ],
                        outputRange: [
                            scaleSize(-260), 
                            0
                        ]
                    })
                }}>
                    <View style={{
                        width,
                        height: scaleSize(44),
                        backgroundColor: '#f7f7f8',
                        borderTopWidth: StyleSheet.hairlineWidth,
                        borderTopColor: '#929499',
                        paddingRight: scaleSize(15),
                        paddingLeft: scaleSize(15),
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'flex-end'
                    }}>
                        <TouchableOpacity
                            onPress={() => {
                                requestAnimationFrame(() => {
                                    Animated.timing(this.animatedValue, {
                                        toValue: 0,
                                        duration: 300,
                                        easing: Easing.linear
                                    }).start();
                                });
                            }}
                        >
                            <Text style={{
                                fontSize: setSpText(17),
                                color: '#007aff'
                            }}>完成</Text>
                        </TouchableOpacity> 
                    </View>
                    <Picker
                        style={{
                            width,
                            backgroundColor: '#cfd5da',
                        }}
                        itemStyle={{
                            height: scaleSize(216)
                        }}
                        selectedValue={this.state[key].currentVal}
                        onValueChange={(val) => {
                            const types = this.state[key];

                            types.currentVal = val;
                            this.setState({ [key]: types });
                        }}>
                        {this.state[key].val.map((item, index) => 
                            <Picker.Item key={index} label={item} value={item} />
                        )}
                    </Picker>
                </Animated.View>
            </View>
        );
    }
}
