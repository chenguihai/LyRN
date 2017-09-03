import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    StyleSheet,
    View,
    Text,
    Animated,
    Image,
    TouchableOpacity,
    Dimensions,
    InteractionManager
} from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { CityAction } from '../../actions';

import _ from '../../util';

class QueryCityComponent extends Component {

    state = {
        left: new Animated.Value(0),
        right: new Animated.Value(0),
        opacity: new Animated.Value(1)
    }

    innerWidth = 0;
    isSwitch = false;

    static propTypes = {
        fromCity: PropTypes.object,
        toCity: PropTypes.object,
        selectFromCity: PropTypes.func,
        selectToCity: PropTypes.func,
        fromKey: PropTypes.string,
        toKey: PropTypes.string,
        selectCity: PropTypes.func
    }

    componentDidUpdate(nextProps, nextState) {
        if (this.isSwitch) {
            InteractionManager.runAfterInteractions(() => {
                Animated.parallel([
                    Animated.timing(nextState.left, {
                        toValue: 0,
                        duration: 100
                    }),
                    Animated.timing(nextState.right, {
                        toValue: 0,
                        duration: 100
                    }),
                    Animated.timing(nextState.opacity, {
                        toValue: 1,
                        duration: 100
                    })
                ]).start();
                this.isSwitch = false;
            });
        }
    }

    selectFromCity = () => {
        const { selectFromCity } = this.props;

        selectFromCity && selectFromCity();
    }

    selectToCity = () => {
        const { selectToCity } = this.props;

        selectToCity && selectToCity();
    }

    handlePress = async () => {
        const fromLayout = await _.getLayout(this.fromRef);
        const toLayout = await _.getLayout(this.toRef);

        Animated.parallel([
            Animated.timing(this.state.left, {
                toValue: this.innerWidth - fromLayout.width,
                duration: 100
            }),
            Animated.timing(this.state.right, {
                toValue: this.innerWidth - toLayout.width,
                duration: 100
            }),
            Animated.timing(this.state.opacity, {
                toValue: 0,
                duration: 100
            })
        ]).start();
        this.isSwitch = true;
        this.switchCity();
    }

    switchCity = () => {
        const { fromKey, toKey, fromCity, toCity, selectCity } = this.props;

        selectCity({
            [fromKey]: toCity,
            [toKey]: fromCity
        });
    }

    render() {
        const { width } = Dimensions.get('window');
        const { fromCity, toCity } = this.props;
        const { left, right, opacity } = this.state;        

        this.innerWidth = (width - 30) / 2;
        
        return (
            <View style={styles.query_city}>
                <View style={styles.query_city_item}>
                    <Text style={styles.city_desc}>出发城市</Text>
                    <Animated.View
                        style={{
                            position: 'absolute',
                            top: 40,
                            left,
                            opacity
                        }}
                    >
                        <TouchableOpacity
                            onPress={this.selectFromCity}
                        >
                            <Text 
                                ref={(ref) => { 
                                    this.fromRef = ref;
                                }}
                                style={styles.city_txt}
                            >
                                {fromCity.Name}
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
                            top: 40,
                            right,
                            opacity
                        }}
                    >
                        <TouchableOpacity
                            onPress={this.selectToCity}
                        >
                            <Text 
                                ref={(ref) => { 
                                    this.toRef = ref;
                                }}
                                style={styles.city_txt}
                            >
                                {toCity.Name}
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

const mapDispatchToProps = (dispatch) => ({
    selectCity: bindActionCreators(CityAction.selectCity, dispatch),
});

export default connect(() => ({}), mapDispatchToProps)(QueryCityComponent);
