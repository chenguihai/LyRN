import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';


import _ from '../../util';

import { BoxShadow } from 'react-native-shadow';

const shadowOpt = {
    height: 98.5,
    color: '#C8CECB',
    border: 1.3,
    radius: 2,
    opacity: 0.3,
    x: 0,
    y: 0,
    style: {
        marginVertical: 5,
        marginTop: 5,
        marginBottom: 5,
        marginLeft: 5
    }
};

export default class ListComponent extends Component {

    static propTypes = {
        data: PropTypes.object,
        lineScale: PropTypes.number,
        cardScale: PropTypes.number,
        viewWidth: PropTypes.number,
        handlePress: PropTypes.func
    }

    _renderSeats(data) {
        return data.map((item, index) => {
            const { cn, seats } = item;

            if (seats > 0) {
                return <Text key={index} style={{
                    fontSize: 11,
                    lineHeight: 11,
                    marginLeft: 8,
                    color: '#333'
                }}>{cn} ({seats})</Text>;
            }

            return <Text key={index} style={{
                fontSize: 11,
                lineHeight: 11,
                marginLeft: 8,
                color: '#ccc'
            }}>{cn} (无)</Text>;
        });
    }

    render() {
        const { data, cardScale, lineScale, viewWidth } = this.props;
        const { item } = data;

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

        shadowOpt.width = viewWidth - 10;

        return (
            <BoxShadow setting={shadowOpt} >
                <View
                    style={styles.container}
                >
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => this.props.handlePress(seatsMap)}
                        style={styles.train_info}
                    >
                        <View style={styles.info_row}>
                            {/* 始发时间 */}
                            <View style={styles.info_item}>
                                <Text style={{
                                    fontSize: 20,
                                    lineHeight: 20,
                                    color: '#333'
                                }}>{fmtime}</Text>
                            </View>
                            {/* 列车编号 */}
                            <View style={[
                                styles.info_item,
                                {
                                    flexDirection: 'column',
                                    alignItems: 'center'
                                }
                            ]}>
                                <View style={styles.trainno}>
                                    <Text style={{
                                        fontSize: 12,
                                        lineHeight: 12,
                                        color: '#333'
                                    }}>{trainno}</Text>
                                    {accbyidcard ? <View style={{
                                        width: 4
                                    }}></View> : null}
                                    {accbyidcard ? <Image
                                        resizeMode="cover"
                                        style={{
                                            width: cardScale * 12,
                                            height: 12
                                        }}
                                        source={require('../../images/idcard.png')}
                                    /> : null}
                                </View>
                                <Image
                                    resizeMode="cover"
                                    style={{
                                        width: 61,
                                        height: 61 / lineScale,
                                        marginTop: 3
                                    }}
                                    source={require('../../images/right_line.png')}
                                />
                            </View>
                            {/* 达到时间 */}
                            <View style={styles.info_item}>
                                <Text style={{
                                    fontSize: 20,
                                    lineHeight: 20,
                                    color: '#333'
                                }}>{totime}</Text>
                            </View>
                            {/* 空占位符 */}
                            <View style={styles.info_item}>
                            </View>
                        </View>
                        <View style={[
                            styles.info_row,
                            {
                                alignItems: 'baseline'
                            }
                        ]}>
                            {/* 始发站点 */}
                            <View style={styles.info_item}>
                                <Text style={{
                                    fontSize: 14,
                                    lineHeight: 14,
                                    color: '#333'
                                }}>{fmcity}</Text>
                            </View>
                            {/* 行程总时间 */}
                            <View style={styles.info_item}>
                                <Text style={{
                                    fontSize: 12,
                                    lineHeight: 12,
                                    color: '#999',
                                }}>{usedtime}</Text>
                            </View>
                            {/* 到达站点 */}
                            <View style={styles.info_item}>
                                <Text style={{
                                    fontSize: 14,
                                    lineHeight: 14,
                                    color: '#333'
                                }}>{tocity}</Text>
                            </View>
                            {/* 票价 */}
                            <View style={styles.info_item}>
                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: 'baseline'
                                }}>
                                    <Text style={{
                                        fontSize: 12,
                                        lineHeight: 12,
                                        color: '#ff5346'
                                    }}>¥</Text>
                                    <Text style={{
                                        fontSize: 18,
                                        lineHeight: 18,
                                        color: '#ff5346'
                                    }}>{Math.min.apply({}, priceMap)}</Text>
                                    <Text style={{
                                        fontSize: 12,
                                        lineHeight: 12,
                                        color: '#ff5346'
                                    }}>起</Text>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <View style={styles.train_seats} >
                        {this._renderSeats(seatsMap)}
                    </View>
                </View >
            </BoxShadow >
        );
    }
}

const styles = StyleSheet.create({
    'container': {
        borderRadius: 3,
        backgroundColor: '#FFF'
    },
    'train_info': {
        paddingTop: 15,
        paddingBottom: 15,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#e4e4e4',
        borderStyle: 'dashed',
        // borderRadius: 4
    },
    'info_row': {
        flexDirection: 'row',
        // borderBottomWidth: 1,
        // borderColor: '#ccc'
    },
    'info_item': {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    'trainno': {
        flexDirection: 'row',
        alignItems: 'baseline'
    },

    'train_seats': {
        flexDirection: 'row',
        height: 30,
        alignItems: 'center',
        paddingLeft: 15,
        // backgroundColor: '#f9f9f9'
    }
});
