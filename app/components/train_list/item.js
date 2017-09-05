import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    Animated
} from 'react-native';

import CardView from 'react-native-cardview';
import SeatsListComponent from './seats_list';

import _ from '../../util';

export default class ListComponent extends Component {

    state = {
        expand: false,
        height: new Animated.Value(0)
    }

    static propTypes = {
        data: PropTypes.object,
        lineScale: PropTypes.number,
        cardScale: PropTypes.number
    }

    handlePress() {
        if (this.state.expand) {
            Animated.timing(this.state.height, {
                duration: 300,
                toValue: 0
            }).start(() => {
                this.setState({
                    expand: false
                });
            });
        } else {
            this.setState({
                expand: true
            }, () => {
                Animated.timing(this.state.height, {
                    duration: 300,
                    toValue: 153
                }).start();
            });
        }
    }

    _renderSeats(data) {
        return data.map((item, index) => {
            const { cn, seats } = item;

            if (seats > 0) {
                return <Text key={index} style={styles.seats_txt}>{cn} ({seats})</Text>;
            }

            return <Text key={index} style={styles.no_seats_txt}>{cn} (无)</Text>;
        });
    }

    layout(e) {
        // alert(JSON.stringify(e));
    }

    render() {
        const { expand, height } = this.state;

        const { data, cardScale, lineScale } = this.props;

        const { index, item } = data;

        // accbyidcard 是否可以通过刷身份证进站
        // fmcity 起始站
        // tocity 终止站
        // fmtime 始发时间
        // totime 到达时间
        // trainno 列车编号
        // usedtime 花费时间
        // ticketstatus 座位类型数组

        const { accbyidcard, fmcity, tocity, fmtime, totime, trainno, usedtime, ticketstatus } = item;

        const seatsMap = [];
        const priceMap = [];

        for (const i in ticketstatus) {
            if (!_.isNull(ticketstatus[i])) {
                seatsMap.push(ticketstatus[i]);
                priceMap.push(ticketstatus[i].price);
            }
        }
        // onLayout={({ nativeEvent: e }) => this.layout(e)}

        return (
            <CardView
                cornerRadius={4}
                style={styles.container}
            >
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => this.handlePress(index)}
                    style={styles.top}
                >
                    <View style={styles.box} >
                        <Text style={styles.big_txt}>{fmtime}</Text>
                        <Text style={styles.normal_txt}>{fmcity}</Text>
                    </View>
                    <View
                        style={[
                            styles.box,
                            {
                                justifyContent: 'center'
                            }
                        ]}
                    >
                        <View style={styles.trainno}>
                            <Text style={styles.trainno_txt}>{trainno}</Text>
                            {accbyidcard ? <View style={{
                                width: 4
                            }}></View> : null}
                            {accbyidcard ? <Image
                                resizeMode="cover"
                                style={{
                                    width: 18,
                                    height: 18 / cardScale
                                }}
                                source={require('../../images/idcard.png')}
                            /> : null}
                        </View>
                        <Image
                            resizeMode="cover"
                            style={{
                                width: 61,
                                height: 61 / lineScale
                            }}
                            source={require('../../images/right_line.png')}
                        />
                        <Text style={{
                            fontSize: 12,
                            lineHeight: 12,
                            color: '#999',
                            marginTop: 5
                        }}>{usedtime}</Text>
                    </View>
                    <View style={styles.box}>
                        <Text style={styles.big_txt}>{totime}</Text>
                        <Text style={styles.normal_txt}>{tocity}</Text>
                    </View>
                    <View style={[
                        styles.box,
                        styles.leaseMoney
                    ]}>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'baseline'
                        }}>
                            <Text style={[
                                styles.orange,
                                styles.money_small_txt
                            ]}>¥</Text>
                            <Text style={[
                                styles.orange,
                                styles.money_big_txt
                            ]}>{Math.min.apply({}, priceMap)}</Text>
                            <Text style={[
                                styles.money_small_txt,
                                { color: 'rgb(153, 153, 153)' }
                            ]}>起</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                {!expand
                    ? <View style={styles.bottom} >
                        {this._renderSeats(seatsMap)}
                    </View>
                    : null
                }
                {
                    expand ? <SeatsListComponent height={height} data={seatsMap} /> : null
                }
            </CardView >
        );
    }
}

const styles = StyleSheet.create({
    'container': {
        margin: 5
    },
    'top': {
        flexDirection: 'row',
        paddingTop: 12,
        paddingBottom: 10,
        backgroundColor: '#FFF',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#dcdcdc',
    },
    box: {
        flex: 1,
        alignItems: 'center',
    },
    'big_txt': {
        fontSize: 20,
        color: '#333',
        lineHeight: 30,
        justifyContent: 'center'
    },
    'normal_txt': {
        fontSize: 14,
        color: '#2d2d2d',
        lineHeight: 21,
        justifyContent: 'center'
    },
    trainno: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'baseline',
        marginTop: 5,
        marginBottom: 3
    },
    'trainno_txt': {
        fontSize: 12,
        lineHeight: 12,
        color: '#2d2d2d'
    },
    'bottom': {
        flexDirection: 'row',
        paddingLeft: 8,
        backgroundColor: '#f9f9f9',
        height: 30,
        alignItems: 'center'
    },
    'seats_txt': {
        fontSize: 12,
        color: '#666',
        marginLeft: 8,
        lineHeight: 12,
        position: 'relative',
        top: -4
    },
    'no_seats_txt': {
        fontSize: 12,
        color: '#ccc',
        marginLeft: 8,
        lineHeight: 12,
        position: 'relative',
        top: -4
    },
    leaseMoney: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    orange: {
        color: 'rgb(255, 101, 64)'
    },
    'money_big_txt': {
        fontSize: 20,
        lineHeight: 20
    },
    'money_small_txt': {
        fontSize: 12,
        lineHeight: 12
    }
});
