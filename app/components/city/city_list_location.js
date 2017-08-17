import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Text,
    StyleSheet,
    Dimensions
} from 'react-native';

export default class CityLoctionComponent extends Component {

    static defaultProps = {
        data: []
    }

    static propTypes = {
        data: PropTypes.array
    }

    render() {
        const { width } = Dimensions.get('window');
        const { data } = this.props;
        
        return (
            <View style={styles.list_location}>
                <View style={[
                    styles.list_location_item,
                    {
                        width: (width - 30) * 0.43 
                    }
                ]}>
                    <Text style={styles.list_location_txt}>{data[0] ? data[0].Name : ''}</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    'list_location': {
        paddingTop: 6,
        paddingBottom: 6,
        paddingLeft: 15,
        paddingRight: 15,
        backgroundColor: '#FFF'
    },
    'list_location_item': {
        height: 35,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: '#dedfe0',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5
    },
    'list_location_txt': {
        fontSize: 14,
        color: '#2d2d2d'
    }
});
