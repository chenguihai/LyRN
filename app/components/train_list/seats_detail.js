import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Text,
    StyleSheet,
    Animated
} from 'react-native';

export default class SeatsListComponent extends Component {

    static propTypes = {
        data: PropTypes.array
    }

    _renderSeatsList(data) {
        return data.map((item, index) => {
            const { cn, seats, price } = item;

            return (
                <View
                    key={index}
                    style={styles.seats_list}
                >
                    <View style={styles.seats_box}>
                        <Text style={{
                            fontSize: 14,
                            lineHeight: 14,
                            color: '#333'
                        }}>{cn}</Text>
                    </View>
                    <View style={styles.seats_box}>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'baseline'
                        }}>
                            <Text style={{
                                fontSize: 12,
                                lineHeight: 12,
                                color: '#FF6540'
                            }}>¥</Text>
                            <Text style={{
                                fontSize: 16,
                                lineHeight: 16,
                                color: '#FF6540'
                            }}>{price}</Text>
                        </View>
                    </View>
                    <View style={styles.seats_box}>
                        <Text style={{
                            fontSize: 14,
                            lineHeight: 14,
                            color: 'rgb(170, 170, 170)'
                        }}>{seats} 张</Text>
                    </View>
                    <View style={styles.seats_box}>
                        <View 
                            style={{
                                width: 40,
                                height: 20,
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: 3,
                                backgroundColor: '#3c6'
                            }}
                        >
                            <Text style={{
                                fontSize: 12,
                                lineHeight: 12,
                                color: '#FFF'
                            }}>预定</Text>
                        </View>
                    </View>
                </View>
            );
        });
    }

    render() {
        const { data } = this.props;

        return (
            <View style={{
                backgroundColor: '#FFF'
            }}>
                {this._renderSeatsList(data)}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    'seats_list': {
        flexDirection: 'row',
        height: 51,
        alignItems: 'center',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#dcdcdc',
        position: 'relative',
        bottom: 4.5
        // borderTopWidth: StyleSheet.hairlineWidth,
        // borderTopColor: '#dcdcdc'
    },
    'seats_box': {
        flex: 1,
        alignItems: 'center'
    }
});
