import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    View,
} from 'react-native';

import TrainInfoComponent from '../components/train_order/train_info';
import ConcatComponent from '../components/train_order/contact';

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
                
                <ConcatComponent />
                
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
