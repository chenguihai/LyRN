import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    View,
    DatePickerIOS,
    StyleSheet
} from 'react-native';

export default class DatePickerComponent extends Component {

    static propTypes = {
    }

    onPickerSelect = (val) => {
        console.log(val);
    }

    render() {
        return (
            <View style={styles.modal}>
                <DatePickerIOS
                    date={new Date()} 
                    mode="datetime"
                    onDateChange={this.onPickerSelect}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    modal: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        // height: 0,
        backgroundColor: 'yellow',
        overflow: 'hidden'
    }
});
