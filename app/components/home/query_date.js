import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity
} from 'react-native';

import { connect } from 'react-redux';

class QueryDateComponent extends Component {

    static propTypes = {
        tripTime: PropTypes.number,
        tripTimeDes: PropTypes.string,
        navigation: PropTypes.object
    }

    covertDate(time) {
        const date = new Date(time);
        const month = date.getMonth() + 1;
        const day = date.getDate();

        return `${month}月${day}日`;
    }

    handlePress = () => {
        const { navigation } = this.props;
        const { state, navigate } = navigation;

        navigate('calendar', { key: state.key });
    }

    render() {
        const { tripTime, tripTimeDes } = this.props;
        
        return (
            <TouchableOpacity onPress={this.handlePress} style={styles.query_date}>
                <View style={styles.query_date_inner}>
                    <Text style={styles.date}>{this.covertDate(tripTime)}</Text>
                    <Text style={styles.date_txt}>{tripTimeDes}</Text>
                </View>
            </TouchableOpacity>
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

const mapStateToProps = (state) => ({
    tripTime: state.Date.tripTime,
    tripTimeDes: state.Date.tripTimeDes
});

export default connect(mapStateToProps)(QueryDateComponent);
