import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Text,
    ScrollView,
    Dimensions,
} from 'react-native';

import TrainInfoComponent from '../components/train_order/train_info';
import ConcatComponent from '../components/train_order/contact';
import GetFreeComponent from '../components/train_order/getfree';

import ItemComponent from '../components/item';

export default class TrainOrderPage extends Component {

    childContextTypes = {
        navigation: PropTypes.object
    }

    getChildContext = {
        navigation: this.props.navigation
    }

    static propTypes = {
        navigation: PropTypes.object
    }

    render() {
        const { width } = Dimensions.get('window');
        const { navigation: { state: { params: { data } } } } = this.props;

        return (
            <View 
                style={{ 
                    flex: 1, 
                    backgroundColor: '#f2f4f7',
                    paddingBottom: 50
                }}
            >
                <ScrollView>
                    <TrainInfoComponent data={data} />
                    <ItemComponent
                        data = {{
                            style: {
                                marginTop: 0,
                                marginLeft: 0,
                                marginRight: 0
                            },
                            list: [
                                {
                                    onPress: () => {
                                        this.props.navigation.navigate('OnlineSelectSeat', { data });
                                    },
                                    title: '在线选座',
                                    after: '选座'
                                }
                            ]
                        }}
                    />
                
                    <ConcatComponent />
                
                    <ItemComponent
                        data = {{
                            list: [
                                {
                                    onPress: () => {
                                        this.props.navigation.navigate('Combo');
                                    },
                                    title: '优选服务',
                                    after: '服务名称'
                                }
                            ]
                        }}
                    />

                    <ItemComponent
                        data = {{
                            list: [
                                {
                                    onPress: () => {
                                        this.props.navigation.navigate('Tinsurance');
                                    },
                                    title: '行程保险',
                                }
                            ]
                        }}
                    />

                    <GetFreeComponent />

                    <ItemComponent
                        data = {{
                            style: {
                                marginBottom: 50
                            },
                            list: [
                                {
                                    onPress: () => {
                                    },
                                    title: '同程优惠',
                                    after: '暂无可用代金券'
                                }
                            ]
                        }}
                    />
                </ScrollView>
                <View style={{
                    position: 'absolute',
                    bottom: 0,
                    height: 55,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#3C6',
                    width
                }}>
                    <Text style={{
                        color: '#FFF',
                        fontSize: setSpText(18),
                        fontWeight: 'bold'
                    }}>提交订单</Text>
                </View>
            </View>
        );
    }
}
