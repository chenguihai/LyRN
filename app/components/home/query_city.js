import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    StyleSheet,
    View,
    Text,
    Animated,
    Image,
    TouchableOpacity
} from 'react-native';


class QueryCityComponent extends Component {

    static propTypes = {
        fromCity: PropTypes.string,
        toCity: PropTypes.string,
        selectFromCity: PropTypes.func,
        selectToCity: PropTypes.func,
        changeCityPosition: PropTypes.func
    }

    selectFromCity = () => {
        const { selectFromCity } = this.props;

        selectFromCity && selectFromCity();
    }

    selectToCity = () => {
        const { selectToCity } = this.props;

        selectToCity && selectToCity();
    }

    handlePress = () => {
        const { changeCityPosition } = this.props;

        changeCityPosition && changeCityPosition();
    }

    render() {
        const { fromCity, toCity } = this.props;

        
        return (
            <View style={styles.query_city}>
                <View style={styles.query_city_item}>
                    <Text style={styles.city_desc}>出发城市</Text>
                    <Animated.View
                        style={{
                            position: 'absolute',
                            top: 40
                        }}
                    >
                        <TouchableOpacity
                        
                            onPress={this.selectFromCity}
                        >
                            <Text 
                                ref={(ref) => { 
                                    this.fromCityRef = ref;
                                }}
                                style={styles.city_txt}
                            >
                                {fromCity}
                            </Text>
                        </TouchableOpacity>
                    </Animated.View>
                </View>
                <TouchableOpacity
                    onPress={this.handlePress}
                >
                    <Image 
                        style={styles.image} 
                        source={require('../../images/change_city.png')} 
                    />
                </TouchableOpacity>
                <View style={[
                    styles.query_city_item,
                    { alignItems: 'flex-end' }
                ]}>
                    <Text style={styles.city_desc}>到达城市</Text>
                    <Animated.View
                        style={{
                            position: 'absolute',
                            top: 40
                        }}
                    >
                        <TouchableOpacity
                            onPress={this.selectToCity}
                        >
                            <Text style={styles.city_txt}>
                                {toCity}
                            </Text>
                        </TouchableOpacity>
                    </Animated.View>
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
    'city_desc': {
        fontSize: 12,
        lineHeight: 12,
        color: '#999',
        paddingTop: 15,
        paddingBottom: 14
    },
    'city_txt': {
        fontSize: 28,
        color: '#333',
        lineHeight: 28,
        // borderWidth: 1,
        // borderColor: '#000',
    },
    'image': {
        width: 30,
        height: 30,
        position: 'relative',
        top: 30
    }
});

export default QueryCityComponent;
