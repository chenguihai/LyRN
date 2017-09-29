import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Text,
    Image,
    TextInput
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
                        width: 18,
                        height: 18
                    }}
                />
                <Text style={{
                    fontSize: 16,
                    color: '#3c6',
                    marginLeft: 5
                }}>添加乘客</Text>
            </View>
        );
    }

    renderInput() {
        return (
            <TextInput 
                style={{
                    padding: 0,
                    flex: 1,
                    marginLeft: 20,
                    fontSize: 16,
                    color: '#333'
                }}
                placeholder="用于接收购票信息"
                placeholderTextColor="#ccc"
            />
        );
    }

    renderTitle2(title, after, isHot = false) {
        return (
            <View style={{
                height: 44,
                alignItems: 'center',
                flexDirection: 'row',
                paddingLeft: 15
            }}>
                {isHot
                    ? <Image 
                        source={
                            require('../images/icon_hot.png')
                        }
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: 27,
                            height: 27,
                            zIndex: 500
                        }}
                    />
                    : null
                }
                <Text style={{
                    fontSize: 16,
                    color: '#666'
                }}>{title}</Text>
                <Text style={{
                    fontSize: 16,
                    color: '#ccc',
                    marginLeft: 20
                }}>{after}</Text>
            </View>
        );
    }

    render() {
        const { state: { params: { data = {} } } } = this.props.navigation;
        
        return (
            <View style={{
                flex: 1
            }}>
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
                                    paddingLeft: 0
                                },
                                title: this.renderTitle2('指定座位', '请指定座位', true)
                            }, 
                            {
                                style: {
                                    paddingLeft: 0
                                },
                                title: this.renderTitle2('取票方式', '指定取票方式')
                            }
                        ]
                    }}
                    
                />
            </View>
        );
    }
}
