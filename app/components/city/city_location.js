import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    TouchableOpacity
} from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { CityAction } from '../../actions';

class CityLoctionComponent extends Component {

    static propTypes = {
        getCurrentLocation: PropTypes.func,
        data: PropTypes.object,
        handlePress: PropTypes.func
    }

    componentWillMount() {
        this.getCurrentPosition();
    }

    getCurrentPosition() {
        navigator.geolocation.getCurrentPosition((location) => {
            const { longitude, latitude } = location.coords;

            this.props.getCurrentLocation(`${longitude},${latitude}`);
        });
    }

    handlePress(Name) {
        const { handlePress } = this.props;

        handlePress && handlePress({ Name });
    }

    render() {
        const
            { width } = Dimensions.get('window'),
            { data } = this.props;

        const { info, regeocode = {} } = data;

        if (!info) {
            return null;
        }

        const { addressComponent = {} } = regeocode;
        const { province } = addressComponent;
        const cityName = province.replace(/市/g, '');

        return (
            <View style={styles.container}>
                <TouchableOpacity
                    onPress={() => this.handlePress(cityName)}
                >
                    <View style={[
                        styles.city_item,
                        {
                            width: (width - 30) * 0.43
                        }
                    ]}>
                        <Text
                            style={styles.city_txt}
                        >
                            {cityName}
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    'container': {
        paddingTop: 6,
        paddingBottom: 6,
        paddingLeft: 15,
        paddingRight: 15,
        backgroundColor: '#FFF'
    },
    'city_item': {
        height: 35,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: '#dedfe0',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5
    },
    'city_txt': {
        fontSize: 14,
        color: '#2d2d2d'
    }
});

const mapDispatchToProps = (dispatch) => ({
    getCurrentLocation: bindActionCreators(CityAction.getCurrentLocation, dispatch)
});

export default connect(() => ({}), mapDispatchToProps)(CityLoctionComponent);
