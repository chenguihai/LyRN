import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    View
} from 'react-native';

import TrainInfoComponent from '../components/train_order/train_info';

export default class TrainOrderPage extends Component {

    static propTypes = {
        navigation: PropTypes.object
    }

    render() {
        const { navigation: { state: { params: { data } } } } = this.props;

        return (
            <View style={{ flex: 1 }}>
                <TrainInfoComponent data={data} />
            </View>
        );
    }
}
