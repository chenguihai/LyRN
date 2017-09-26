import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Text,
    TextInput,
    StyleSheet
} from 'react-native';

import CardView from 'react-native-cardview';

import TrainInfoComponent from '../components/train_order/train_info';
import ItemComponent from '../components/item';

export default class TrainOrderPage extends Component {

    static propTypes = {
        navigation: PropTypes.object
    }

    addPeople() {
        return (
            <View style={{
                flexDirection: 'row'
            }}>
                <View style={{
                    width: 18,
                    height: 18
                }}>
                    <View
                        style={{
                            width: 1,
                            height: 18,
                            backgroundColor: '#3C6',
                            position: 'absolute',
                            left: 8.5
                        }}
                    ></View>
                    <View
                        style={{
                            width: 18,
                            height: 1,
                            backgroundColor: '#3C6',
                            position: 'absolute',
                            top: 8.5
                        }}
                    ></View>
                </View>
                <Text style={{
                    color: '#3C6',
                    fontSize: 16,
                    lineHeight: 16,
                    marginLeft: 15
                }}>
                    添加/修改乘客
                </Text>
            </View>
        );
    }

    _renderInput() {
        return (
            <View style={{
                flex: 1
            }}>
                <TextInput
                    underlineColorAndroid="transparent"
                    placeholder="用于接收购票信息"
                    placeholderTextColor="#CCC"
                    maxLength={13}
                    style={{
                        padding: 0,
                        fontSize: 16,
                        lineHeight: 16,
                        height: 44,
                        marginLeft: 15
                    }}
                />
            </View>
        );
    }

    render() {
        const { navigation: { state: { params: { data } } } } = this.props;

        return (
            <View 
                style={{ 
                    flex: 1, 
                    backgroundColor: '#f2f4f7' 
                }}
            >
                <TrainInfoComponent data={data} />
                <ItemComponent 
                    boxShadow={false}
                    style={{
                        marginTop: 0,
                        marginLeft: 0,
                        marginRight: 0
                    }}
                    title="在线选座"
                    after="选座"
                />
                <CardView
                    cardElevation={1}
                    cardMaxElevation={1}
                    cornerRadius={3}
                    style={{
                        marginTop: 10,
                        marginLeft: 5,
                        marginRight: 5
                    }}
                >
                    <ItemComponent
                        onPress={() => {
                            this.props.navigation.navigate('Contact');
                        }}
                        boxShadow={false}
                        style={{
                            marginTop: 0,
                            marginLeft: 0,
                            borderBottomColor: '#DCDCDC',
                            borderBottomWidth: StyleSheet.hairlineWidth
                        }}
                        title={this.addPeople()}
                    />
                    <ItemComponent
                        boxShadow={false}
                        title="手机号码"
                        style={{
                            marginTop: 0,
                            marginLeft: 0,
                            marginBottom: 4,
                            paddingRight: 0
                        }}
                        after={this._renderInput()}
                    />
                </CardView>
                
                <ItemComponent
                    onPress={() => {
                        this.props.navigation.navigate('Combo');
                    }}
                    title="优选服务"
                    after="服务名称"
                />

                <ItemComponent 
                    onPress={() => {
                        this.props.navigation.navigate('Tinsurance');
                    }}
                    title="行程保险"
                />

                <ItemComponent 
                />

                <ItemComponent 
                    title="同程优惠"
                    after="暂无可用代金券"
                />
            </View>
        );
    }
}
