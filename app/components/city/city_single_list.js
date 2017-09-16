import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    InteractionManager
} from 'react-native';

export default class CityListComponent extends Component {

    static propTypes = {
        data: PropTypes.array,
        handlePress: PropTypes.func,
        cityListUpdate: PropTypes.func
    }

    handlePress = (data) => {
        const { handlePress } = this.props;

        InteractionManager.runAfterInteractions(() => {
            handlePress && handlePress(data);
        });
    }

    _renderRow(data) {
        return (
            data.map((item, index) =>
                <TouchableOpacity
                    style={styles.row}
                    key={index}
                    onPress={() => {
                        this.handlePress(item); 
                    }}
                >
                    <Text style={styles.txt}>{item.Name}</Text>
                </TouchableOpacity>
            )
        );
    }

    componentDidUpdate() {
        this.props.data.length > 0 && this.props.cityListUpdate();
    }

    render() {
        const { data } = this.props;

        if (data.length === 0) {
            return null;
        }
        
        return (
            <View style={styles.container}>
                {data.length > 0 ? this._renderRow(data) : null}
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
