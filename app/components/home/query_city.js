import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    StyleSheet,
    View,
    Text,
    Image,
    Animated,
    TouchableOpacity
} from 'react-native';

import { connect } from 'react-redux';


class QueryCityComponent extends Component {

    static propTypes = {
        fromCity: PropTypes.string,
        toCity: PropTypes.string,
        navigation: PropTypes.object
    }

    selectFromCity = () => {
        const { navigation } = this.props;

        navigation.navigate('City');
    }

    render() {
        const { fromCity, toCity } = this.props;

        return (
            <View style={styles.query_city}>
                <View style={styles.query_city_item}>
                    <Text style={styles.city_txt}>出发城市</Text>
                    <TouchableOpacity
                        onPress={this.selectFromCity}
                    >
                        <Animated.Text style={[styles.city]}>
                            {fromCity}
                        </Animated.Text>
                    </TouchableOpacity>
                </View>
                <Image style={styles.change_city} source={require('../../images/change_city.png')} />
                <View style={[
                    styles.query_city_item,
                    { alignItems: 'flex-end' }
                ]}>
                    <Text style={styles.city_txt}>到达城市</Text>
                    <Text style={styles.city}>
                        {toCity}
                    </Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    'query_city': {
        flexDirection: 'row',
        height: 84,
        marginLeft: 15,
        marginRight: 15,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: '#dcdcdc'
    },
    'query_city_item': {
        flex: 1
    },
    'city_txt': {
        fontSize: 12,
        lineHeight: 12,
        color: '#999',
        paddingTop: 15,
        paddingBottom: 14
    },
    city: {
        fontSize: 28,
        color: '#333',
        lineHeight: 28
    },
    'change_city': {
        width: 30,
        height: 30,
        position: 'relative',
        top: 30
    }
});

export default QueryCityComponent;
