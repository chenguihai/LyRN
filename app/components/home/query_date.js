import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    StyleSheet,
    View,
    Text
} from 'react-native';

export default class QueryDateComponent extends Component {

    static propTypes = {
        date: PropTypes.string,
        description: PropTypes.string
    }

    render() {
        const { date, description } = this.props;
        
        return (
            <View style={styles.query_date}>
                <View style={styles.query_date_inner}>
                    <Text style={styles.date}>{date}</Text>
                    <Text style={styles.date_txt}>{description}</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    'query_date': {
        marginLeft: 15,
        marginRight: 15,
        minHeight: 61,
        alignItems: 'flex-start',
        justifyContent: 'center',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: '#dcdcdc'
    },
    'query_date_inner': {
        flexDirection: 'row',
        alignItems: 'baseline'
    },
    date: {
        fontSize: 25,
        color: '#333',
        lineHeight: 25,
        fontWeight: 'normal'
    },
    'date_txt': {
        color: '#999',
        fontSize: 14
    },
});
