import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Text,
    Image,
    TextInput,
    ScrollView,
    Platform
} from 'react-native';

import TrainInfoComponent from '../components/online_select_seat/train_info';
import SeatsComponent from '../components/online_select_seat/seats';
import ItemComponent from '../components/item';

export default class OnlineSelectSeatPage extends Component {

    static propTypes = {
        navigation: PropTypes.object
    }

    childContextTypes = {
        navigation: PropTypes.object
    }

    getChildContext = {
        navigation: this.props.navigation
    }

    renderTitle1() {
        return (
            <View style={{
                flexDirection: 'row',
                alignItems: 'center'
            }}>
                <Image 
                    source={require('../images/icon_add.png')}
                    style={{
                        width: scaleSize(18),
                        height: scaleSize(18)
                    }}
                />
                <Text style={{
                    fontSize: setSpText(16),
                    color: '#3c6',
                    marginLeft: scaleSize(5)
                }}>添加乘客</Text>
            </View>
        );
    }

    renderInput() {
        return (
            <TextInput 
                style={{
                    padding: scaleSize(0),
                    flex: 1,
                    marginLeft: scaleSize(20),
                    fontSize: setSpText(16),
                    color: '#333'
                }}
                maxLength={11}
                placeholder="用于接收购票信息"
                placeholderTextColor="#ccc"
                underlineColorAndroid="transparent"
                keyboardType="numeric"
            />
        );
    }

    renderTitle2(title, after, isHot = false) {
        return (
            <View style={{
                height: Platform.OS === 'ios' ? scaleSize(44) : scaleSize(50),
                alignItems: 'center',
                flexDirection: 'row',
                paddingLeft: scaleSize(15)
            }}>
                {isHot
                    ? <View style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: scaleSize(27),
                        height: scaleSize(27),
                        borderTopLeftRadius: 3,
                        overflow: 'hidden'
                    }}>
                        <Image 
                            source={
                                require('../images/icon_hot.png')
                            }
                            style={{
                                width: scaleSize(27),
                                height: scaleSize(27)
                            }}
                        />
                    </View>
                    : null
                }
                <Text style={{
                    fontSize: setSpText(16),
                    color: '#666'
                }}>{title}</Text>
                <Text style={{
                    fontSize: setSpText(16),
                    color: '#ccc',
                    marginLeft: scaleSize(20)
                }}>{after}</Text>
            </View>
        );
    }

    renderTitle3() {
        return (
            <View style={{
                paddingTop: scaleSize(11),
                paddingBottom: scaleSize(11),
                flexDirection: 'row',
                alignItems: 'center'
            }}>
                <Image 
                    source={require('../images/getfree.png')}
                    style={{
                        width: scaleSize(25),
                        height: scaleSize(25)
                    }}
                />
                <View style={{
                    marginLeft: scaleSize(15)
                }}>
                    <Text style={{
                        fontSize: setSpText(16),
                        color: '#333'
                    }}>
                        保证达
                    </Text>
                    <Text style={{
                        fontSize: setSpText(12),
                        color: '#999'
                    }}>
                        车票配送遗失、延误，赔付损失
                    </Text>
                </View>
            </View>
        );
    }

    render() {
        const { state: { params: { data = {} } } } = this.props.navigation;
        
        return (
            <View style={{
                flex: 1,
                backgroundColor: '#f2f4f7'
            }}>
                <ScrollView>
                    <TrainInfoComponent data={data} />
                    <SeatsComponent data={data} />
                    <ItemComponent
                        data={{
                            list: [
                                {
                                    title: this.renderTitle1()
                                }
                            ]
                        }}
                    />
                    <ItemComponent
                        data={{
                            list: [
                                {
                                    title: '联系手机',
                                    linkIcon: false,
                                    after: this.renderInput()
                                }
                            ]
                        }}
                    />
                    <ItemComponent
                        data={{
                            list: [
                                {
                                    style: {
                                        paddingLeft: scaleSize(0)
                                    },
                                    title: this.renderTitle2('指定座位', '请指定座位', true)
                                }, 
                                {
                                    style: {
                                        paddingLeft: scaleSize(0)
                                    },
                                    title: this.renderTitle2('取票方式', '指定取票方式')
                                }
                            ]
                        }}
                    
                    />
                    {/* 保证达开始 */}
                    <ItemComponent
                        data={{
                            list: [
                                {
                                    style: {
                                        height: 'auto',
                                    }, 
                                    linkIcon: false,
                                    title: this.renderTitle3()
                                }
                            ]
                        }}
                    />
                    {/* 保证达结束 */}
                    <ItemComponent
                        data={{
                            list: [
                                {
                                    title: '优先出票套餐',
                                    after: '未选择'
                                }
                            ]
                        }}
                    />
                    <ItemComponent
                        data={{
                            list: [
                                {
                                    title: '行程保险',
                                    after: '安全出行，建议选购保险',
                                    titleStyle: {
                                        color: '#999'
                                    }
                                }
                            ]
                        }}
                    />
                    <ItemComponent
                        data={{
                            list: [
                                {
                                    title: '套餐发票',
                                    after: '不需要',
                                    titleStyle: {
                                        color: '#999'
                                    }
                                }
                            ]
                        }}
                    />
                </ScrollView>
            </View>
        );
    }
}
