import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image, StyleSheet } from 'react-native';
import _ from '../../util';

export default class OperationComponent extends Component {

    static propTypes = {
        data: PropTypes.array
    }

    _render(data) {
        return data.map((rowData, index) => 
            <View style={styles.row} key={index}>
                {
                    rowData.map((item) => {
                        const { ICImageUrl, ICTitle } = item;

                        return <View style={styles.row_item} key={ICImageUrl}>
                            <Image style={styles.image} source={{ uri: ICImageUrl }} />
                            <Text style={styles.txt}>{ICTitle}</Text>
                        </View>;
                    })
                }
            </View>
        );
    }

    render() {
        const { data } = this.props;

        return (
            <View style={styles.box}>
                {this._render(_.chunk(data, 4))}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    box: {
        marginTop: -15
    },
    row: {
        flexDirection: 'row'
    },
    'row_item': {
        flex: 1,
        alignItems: 'center',
        marginTop: 20
    },
    image: {
        width: 24,
        height: 24
    },
    txt: {
        fontSize: 11,
        color: '#666',
        marginTop: 5,
        lineHeight: 11,
    }
});
