import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Image,
    Text,
    Switch,
    StyleSheet
} from 'react-native';

// import CardView from 'react-native-cardview';
import ItemComponent from '../item';

export default class GetFreeComponent extends Component {

    static propTypes = {
    }

    state = { isPay: false }

    _renderTitle() {
        return (
            <View style={{
                flexDirection: 'row',
                alignItems: 'center'
            }}>
                <Image 
                    source={require('../../images/getfree.png')}
                    style={{
                        width: 28,
                        height: 28
                    }}
                />
                <View style={{
                    marginLeft: 10
                }}>
                    <View style={{
                        flexDirection: 'row',
                        marginBottom: 10,
                        alignItems: 'center'
                    }}>
                        <Text style={{
                            fontSize: 16,
                            lineHeight: 16,
                            color: '#666'
                        }}>一元免单</Text>
                        <View style={{
                            marginLeft: 24,
                            paddingTop: 2,
                            paddingBottom: 2,
                            paddingLeft: 5,
                            paddingRight: 5,
                            borderColor: '#FF6540',
                            borderWidth: StyleSheet.hairlineWidth
                        }}>
                            <Text style={{
                                fontSize: 12,
                                lineHeight: 12,
                                color: '#FF6540'
                            }}>热卖</Text>
                        </View>
                    </View>
                    <Text style={{
                        fontSize: 12,
                        color: '#999'
                    }}>支付一元赢订单全额免费</Text>
                </View>
            </View>
        );
    }

    _renderAfter() {
        return (
            <View style={{
                flexDirection: 'row',
                alignItems: 'center'
            }}>
                <Text style={{
                    fontSize: 16,
                    color: '#999',
                    marginRight: 8
                }}>
                    ¥1/人
                </Text>
                <Switch 
                    value={this.state.isPay}
                    onValueChange={(val) => { 
                        this.setState({ isPay: val });
                    }}
                />
            </View>
        );
    }

    render() {

        return (
            <ItemComponent
                data={{
                    list: [
                        {
                            style: {
                                paddingTop: 15,
                                paddingBottom: 10,
                                height: 'auto'
                            },
                            title: this._renderTitle(),
                            after: this._renderAfter(),
                            linkIcon: false
                        }
                    ]
                }}
            />
        );
    }
}
