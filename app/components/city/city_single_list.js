import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native';

import { connect } from 'react-redux';

class CityListComponent extends Component {

    static propTypes = {
        cityList: PropTypes.array,
        handlePress: PropTypes.func
    }

    handlePress = (data) => {
        const { handlePress } = this.props;

        handlePress && handlePress(data); // eslint-disable-line
    }

    _renderRow(data) {
        return (
            data.map((item, index) =>
                <TouchableOpacity
                    style={styles.row}
                    key={index}
                    onPress={() => { this.handlePress(item) }}
                >
                    <Text style={styles.txt}>{item.Name}</Text>
                </TouchableOpacity>
            )
        );
    }

    render() {
        const { cityList } = this.props;

        return (
            <View style={styles.container}>
                {cityList.length > 0 ? this._renderRow(cityList) : null}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    'container': {
        paddingLeft: 15,
        paddingRight: 15,
        backgroundColor: '#FFF'
    },
    'row': {
        height: 35,
        justifyContent: 'center',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#eee'
    },
    'txt': {
        fontSize: 14,
        color: '#2d2d2d',
    }
});

const mapStateToProps = (state) => ({
    cityList: state.City.cityList
});

export default connect(mapStateToProps)(CityListComponent);
