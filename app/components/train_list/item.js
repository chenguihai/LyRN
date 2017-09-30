import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    Animated,
    Easing,
    Platform
} from 'react-native';

import SeatsDetailComponent from './seats_detail';

import _ from '../../util';

import CardView from 'react-native-cardview';

const seatsHeight = 33,
    cardScale = 31 / 21, // 身份证
    lineScale = 100 / 7;

export default class ListComponent extends Component {

    static propTypes = {
        data: PropTypes.object,
        lineScale: PropTypes.number,
        cardScale: PropTypes.number,
        viewWidth: PropTypes.number
    }

    showDetail = false;

    state = {
        height: new Animated.Value(seatsHeight),
        topHeight: new Animated.Value(seatsHeight),
        bottomHeight: new Animated.Value(0)
    }

    shouldComponentUpdate(nextProps, nextState) {
        const { height } = this.state;
        
        return nextProps.data !== this.props.data || height !== nextState.height;
    }

    _renderSeats(data) {
        return data.map((item, index) => {
            const { cn, seats } = item;

            if (seats > 0) {
                return <Text 
                    key={index} 
                    style={{
                        fontSize: setSpText(11),
                        // lineHeight: scaleSize(11),
                        marginLeft: scaleSize(8),
                        color: '#333'
                    }}
                >{cn} ({seats})</Text>;
            }

            return <Text key={index} style={{
                fontSize: setSpText(11),
                // lineHeight: scaleSize(11),
                marginLeft: scaleSize(8),
                color: '#ccc'
            }}
            >{cn} (无)</Text>;
        });
    }

    _renderContent = () => {
        const { topHeight, bottomHeight, height } = this.state;
        const { data } = this.props;

        // accbyidcard 是否可以通过刷身份证进站
        // fmcity 起始站
        // tocity 终止站
        // fmtime 始发时间
        // totime 到达时间
        // trainno 列车编号
        // usedtime 花费时间
        // ticketstatus 座位类型数组

        const { accbyidcard, fmcity, tocity, fmtime, totime, trainno, usedtime, ticketstatus } = data.item;

        const seatsMap = [];
        const priceMap = [];

        for (const i in ticketstatus) {
            if (!_.isNull(ticketstatus[i])) {
                seatsMap.push(ticketstatus[i]);
                priceMap.push(ticketstatus[i].price);
            }
        }

        this.height = seatsMap.length * 51; // 51为火车票详情的高度
        
        return (
            <View style={{
                overflow: 'hidden'
            }}>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => this.handlePress()}
                    style={styles.train_info}
                >
                    <View style={styles.info_row} >
                        {/* 始发时间 */}
                        <View style={styles.info_item}>
                            <Text style={{
                                fontSize: setSpText(20),
                                // lineHeight: scaleSize(20),
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
                                    fontSize: setSpText(12),
                                    // lineHeight: scaleSize(12),
                                    color: '#333'
                                }}>{trainno}</Text>
                                {accbyidcard ? <View style={{
                                    width: scaleSize(4)
                                }}></View> : null}
                                {accbyidcard ? <Image
                                    resizeMode="cover"
                                    style={{
                                        width: cardScale * 12,
                                        height: scaleSize(12)
                                    }}
                                    source={require('../../images/idcard.png')}
                                /> : null}
                            </View>
                            <Image
                                resizeMode="cover"
                                style={{
                                    width: scaleSize(61),
                                    height: scaleSize(61) / lineScale,
                                    marginTop: scaleSize(3)
                                }}
                                source={require('../../images/right_line.png')}
                            />
                        </View>
                        {/* 达到时间 */}
                        <View style={styles.info_item}>
                            <Text style={{
                                fontSize: setSpText(20),
                                // lineHeight: scaleSize(20),
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
                                fontSize: setSpText(14),
                                // lineHeight: scaleSize(14),
                                color: '#333'
                            }}>{fmcity}</Text>
                        </View>
                        {/* 行程总时间 */}
                        <View style={styles.info_item}>
                            <Text style={{
                                fontSize: setSpText(12),
                                // lineHeight: scaleSize(12),
                                color: '#999',
                            }}>{usedtime}</Text>
                        </View>
                        {/* 到达站点 */}
                        <View style={styles.info_item}>
                            <Text style={{
                                fontSize: setSpText(14),
                                // lineHeight: scaleSize(14),
                                color: '#333'
                            }}>{tocity}</Text>
                        </View>
                        {/* 票价 */}
                        <View style={styles.info_item}>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'flex-end',
                            }}>
                                <Text style={{
                                    fontSize: setSpText(12),
                                    color: '#ff5346',
                                }}>¥</Text>
                                <Text style={{
                                    fontSize: setSpText(20),
                                    color: '#ff5346',
                                }}>{Math.min.apply({}, priceMap)}</Text>
                                <Text style={{
                                    fontSize: setSpText(12),
                                    color: '#ff5346',
                                }}>起</Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
                <Animated.View 
                    style={[
                        {
                            height
                        }
                    ]} 
                >
                    <Animated.View
                        ref={(ref) => { 
                            this._topRef = ref;
                        }}
                        style={[
                            styles.train_seats,
                            {
                                height: topHeight,
                                opacity: 1
                            }
                        ]}
                    >
                        {this._renderSeats(seatsMap)}
                    </Animated.View>
                    <Animated.View
                        style={[
                            {
                                height: bottomHeight
                            }
                        ]}
                    >
                        <SeatsDetailComponent data={data} seatsMap={seatsMap} />
                    </Animated.View>
                </Animated.View>
            </View>
        );
    }

    handlePress = () => {
        requestAnimationFrame(() => {
            if (this.showDetail) {
                Animated.parallel([
                    Animated.timing(this.state.height, {
                        toValue: seatsHeight,
                        duration: 150,
                        easing: Easing.ease,
                        // useNativeDriver: true
                    }),
                    Animated.timing(this.state.topHeight, {
                        toValue: seatsHeight,
                        duration: 150,
                        easing: Easing.ease,
                        // useNativeDriver: true
                    }),
                    Animated.timing(this.state.bottomHeight, {
                        toValue: 0,
                        duration: 150,
                        easing: Easing.ease,
                        // useNativeDriver: true
                    }),
                ]).start();
                setTimeout(() => {
                    this._topRef.setNativeProps({
                        style: {
                            opacity: 1
                        }
                    });
                }, 100);
            } else {
                this._topRef.setNativeProps({
                    style: {
                        opacity: 0
                    }
                });
                Animated.parallel([
                    Animated.timing(this.state.height, {
                        toValue: this.height,
                        duration: 150,
                        easing: Easing.ease,
                        // useNativeDriver: true
                    }),
                    Animated.timing(this.state.topHeight, {
                        toValue: 0,
                        duration: 150,
                        easing: Easing.ease,
                        // useNativeDriver: true
                    }),
                    Animated.timing(this.state.bottomHeight, {
                        toValue: this.height,
                        duration: 150,
                        easing: Easing.ease,
                        // useNativeDriver: true
                    })
                ]).start();
            }
            this.showDetail = !this.showDetail;
        });
        
    }

    render() {
        const { viewWidth } = this.props;

        if (Platform.OS === 'ios') {
            return (
                <View style={{
                    marginLeft: scaleSize(5),
                    marginRight: scaleSize(5),
                    marginBottom: scaleSize(5),
                    shadowColor: 'rgba(153,153,153,.2)',
                    shadowOffset: { width: scaleSize(1), 
                        height: scaleSize(2) },
                    shadowRadius: 4,
                    shadowOpacity: 1,
                    borderRadius: 4
                }}>
                    {this._renderContent()}
                </View>
            );
        }

        return (
            <CardView 
                cardElevation={2}
                cardMaxElevation={2}
                cornerRadius={5}
                style={{
                    backgroundColor: '#FFF',
                    width: viewWidth - 10,
                    marginLeft: scaleSize(5),
                    marginBottom: scaleSize(3)
                }}
            >
                {this._renderContent()}
            </CardView >
        );
    }
}

const styles = StyleSheet.create({
    'train_info': {
        paddingTop: scaleSize(15),
        paddingBottom: scaleSize(15),
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#eee',
        backgroundColor: '#FFF',
        borderRadius: 4
    },
    'info_row': {
        flexDirection: 'row'
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
        alignItems: 'center',
        paddingLeft: scaleSize(15),
        ...Platform.select({
            ios: {
                bottom: scaleSize(0),
                backgroundColor: 'transparent'
            },
            android: {
                position: 'relative',
                bottom: scaleSize(4),
                backgroundColor: '#FFF'
            }
        })
    }
});
