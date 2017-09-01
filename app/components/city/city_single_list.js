import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';

import { connect } from 'react-redux';

class CityListComponent extends Component {

    static propTypes = {
        cityList: PropTypes.array
    }

    _renderRow(data) {
        return (
            data.map((item, index) =>
                <View style={styles.row} key={index}>
                    <Text style={styles.txt}>{item.Name}</Text>
                </View>
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