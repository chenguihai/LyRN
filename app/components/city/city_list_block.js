import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Text,
    StyleSheet,
    Dimensions
} from 'react-native';
import _ from '../../util';

export default class CityListBlock extends Component {

    static defaultProps = {
        data: []
    }

    static propTypes = {
        data: PropTypes.array
    }

    /**
     * 渲染每一块
     * @param {array} data 
     * @param {number} index 
     */

    _renderBlock = (data, index) => {
        return (
            <View key={index} style={[
                styles.block,
                {
                    width: this.innerWidth * 0.3,
                    marginRight: this.innerWidth * .1 / 2 // eslint-disable-line
                }
            ]}>
                <Text style={styles.block_txt}>{data.Name}</Text>
            </View>
        );
    }

    /**
     * 渲染每一行
     * @param {array} data 
     */

    _renderRow(data) {

        return data.map((rowData, rowIndex) =>
            <View
                key={rowIndex}
                style={[
                    styles.row,
                    {
                        // 如果是第一行不用设置marginTop
                        marginTop: rowIndex !== 0 ? this.innerWidth * .1 / 2 : 0 // eslint-disable-line
                    }
                ]}
            >
                {
                    // 渲染每个一个城市块
                    rowData.map(this._renderBlock) // eslint-disable-line no-unused-vars
                }
            </View>
        );

    }

    render() {
        const { width } = Dimensions.get('window');
        const { data } = this.props;

        this.gutter = width * 0.1 / 2;
        this.innerWidth = width * 0.9;

        return (
            <View style={[
                styles.container,
                {
                    paddingTop: this.gutter,
                    paddingBottom: this.gutter,
                    paddingLeft: this.gutter,
                    paddingRight: this.gutter
                }
            ]}>
                <View style={styles.inner}>
                    {this._renderRow(_.chunk(data, 3))}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    'container': {
        backgroundColor: '#FFF'
    },
    'inner': {
    },
    'row': {
        flexDirection: 'row',
    },
    'block': {
        height: 35,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: '#dedfe0',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5
    },
    'block_txt': {
        fontSize: 14,
        color: '#2d2d2d'
    }
});
