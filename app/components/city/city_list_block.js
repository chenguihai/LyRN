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

    _renderItem(item, index) {
        return (
            <View key={index} style={[
                styles.item, 
                { 
                    width: this.innerWidth * 0.3, 
                    marginRight: this.innerWidth * .1 / 2 // eslint-disable-line
                }
            ]}>
                <Text style={styles.item_txt}>{item.Name}</Text>
            </View>
        );
    }

    _renderRow(data) {
        return data.map((rowData, rowIndex) => 
            <View 
                key={rowIndex} 
                style={[
                    styles.row,
                    { 
                        marginTop: rowIndex !== 0 ? this.innerWidth * .1 / 2 : 0 // eslint-disable-line
                    }
                ]}
            >
                {
                    rowData.map(this._renderItem.bind(this)) // eslint-disable-line no-unused-vars
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
                styles.list_block,
                {
                    paddingTop: this.gutter,
                    paddingBottom: this.gutter,
                    paddingLeft: this.gutter,
                    paddingRight: this.gutter
                }
            ]}>
                <View style={styles.list}>
                    {this._renderRow(_.chunk(data, 3))}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    'list_block': {
        backgroundColor: '#FFF'
    },
    list: {
         
    },
    row: {
        flexDirection: 'row',
    },
    item: {
        height: 35,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: '#dedfe0',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5
    },
    'item_txt': {
        fontSize: 14,
        color: '#2d2d2d'
    }
});
