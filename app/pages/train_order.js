import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Button
} from 'react-native';

import TrainInfoComponent from '../components/train_order/train_info';

import DialogAndroid from 'react-native-dialogs';

const options = {
    title: 'Hello, World!',
    content: 'I\'m just simple Dialog',
    positiveText: 'OK',
    negativeText: 'Cancel'
};

export default class TrainOrderPage extends Component {

    static propTypes = {
        navigation: PropTypes.object
    }

    onButtonPress() {
        const dialog = new DialogAndroid();

        dialog.set(options);
        dialog.show();
    }

    render() {
        const { navigation: { state: { params: { data } } } } = this.props;

        return (
            <View style={{ flex: 1 }}>
                <TrainInfoComponent data={data} />
                <Button
                    onPress={this.onButtonPress}
                    title="Press Purple"
                    color="#841584"
                    accessibilityLabel="Learn more about purple"
                />
            </View>
        );
    }
}
