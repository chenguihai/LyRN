import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';

export default class CityListTitle extends Component {

    static propTypes = {
        title: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.element
        ])
    }

    static defaultProps = {
        title: ''
    }

    render() {
        const { title } = this.props;
        
        return (
            <View style={styles.title}>
                <Text style={styles.title_txt}>{title}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    title: {
        backgroundColor: '#e9ecf1',
        paddingLeft: 15,
        justifyContent: 'center',
        height: 35
    },
    'title_txt': {
        fontSize: 14,
        lineHeight: 14,
        color: '#999'
    }
});
