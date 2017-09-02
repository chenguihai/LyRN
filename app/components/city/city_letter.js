import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    TouchableOpacity
} from 'react-native';

import letter from './letter';

export default class CityLetterComponent extends Component {

    static propTypes = {
        handlePress: PropTypes.func,
    }

    blockList = [];
    selectedIndex = '';

    handlePress(data, index) {
        if (this.selectedIndex !== '') {
            this.blockList[this.selectedIndex].setNativeProps({
                style: {
                    backgroundColor: '#FFF'
                }
            });
        }

        this.blockList[index].setNativeProps({
            style: {
                backgroundColor: '#dedede'
            }
        });

        this.selectedIndex = index;

        const { handlePress } = this.props;

        handlePress && handlePress(data);
    }

    _renderItem = (data, index) => {

        return (
            <TouchableOpacity
                ref={(ref) => {
                    this.blockList[index] = ref;
                }}
                style={[
                    styles.item,
                    {
                        marginTop: index < 6 ? 0 : this.innerWidth * 0.05,
                        marginLeft: index % 6 === 0 ? this.gutter : this.innerWidth * 0.05,
                        width: this.innerWidth * 0.75 / 6,
                    }
                ]}
                key={index}
                onPress={() => this.handlePress(data, index)}
            >
                <Text style={styles.txt}>{data}</Text>
            </TouchableOpacity>
        );
    }

    render() {
        const { width } = Dimensions.get('window');

        this.gutter = width * 0.05;
        this.innerWidth = width * 0.9;

        return (
            <View style={[
                styles.container,
                {
                    paddingTop: this.gutter,
                    paddingBottom: this.gutter
                }
            ]}>
                {
                    letter.map(this._renderItem)
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    'container': {
        backgroundColor: '#FFF',
        marginBottom: 15,
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    'item': {
        height: 35,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: '#dedfe0',
        borderRadius: 5
    },
    'txt': {
        fontSize: 14,
        color: '#2d2d2d'
    }
});
