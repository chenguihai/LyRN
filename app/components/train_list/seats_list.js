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
        data: PropTypes.array,
        height: PropTypes.object
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
                            color: 'rgb(170, 170, 170)'
                        }}>{seats} 张</Text>
                    </View>
                    <View style={styles.seats_box}>
                        <View style={{
                            paddingTop: 4,
                            paddingBottom: 4,
                            paddingLeft: 8,
                            paddingRight: 8,
                            borderRadius: 3,
                            backgroundColor: '#3c6'
                        }}>
                            <Text style={{
                                fontSize: 12,
                                color: '#FFF'
                            }}>预定</Text>
                        </View>
                    </View>
                </View>
            );
        });
    }

    render() {
        const { data, height } = this.props;

        return (
            <Animated.View style={{
                backgroundColor: '#f9f9f9',
                height
            }}>
                {this._renderSeatsList(data)}
            </Animated.View>
        );
    }
}

const styles = StyleSheet.create({
    'seats_list': {
        flexDirection: 'row',
        height: 51,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#dcdcdc',
    },
    'seats_box': {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});
