import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    StyleSheet,
    Text
} from 'react-native';

export default class NoticeComponent extends Component {
    static propTypes = {
        data: PropTypes.object
    }
    render() {
        const { data } = this.props;
        
        return (
            <Text style={styles.notice} numberOfLines={1}>
                {data.Entity.NCTitle}
            </Text>
        );
    }
}

const styles = StyleSheet.create({
    notice: {
        alignItems: 'center',
        fontSize: 11,
        backgroundColor: '#fff7dc',
        color: '#9a7126',
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 15,
        paddingRight: 15,
        
    },
});
