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

const seatsHeight = scaleSize(34),
    cardScale = 31 / 21, // 身份证
    lineScale = 100 / 7;

const pureText = (content, style, fontSize) => {
    return Platform.select({
        ios: <Text style={[
            style,
            {
                fontSize: setSpText(fontSize)
            }
        ]}>{content}</Text>,
        android: <Text style={[
            style,
            {
                fontSize: setSpText(fontSize),
                lineHeight: setSpText(fontSize),
                includeFontPadding: false
            }
        ]}>{content}</Text>
    });
};

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
                        fontSize: setSpText(12),
                        // lineHeight: setSpText(11),
                        marginLeft: scaleSize(8),
                        color: '#333'
                    }}
                >{cn} ({seats})</Text>;
            }

            return <Text key={index} style={{
                fontSize: setSpText(12),
                // lineHeight: setSpText(11),
                marginLeft: scaleSize(8),
                color: '#ccc'
            }}
            >{cn} (无)</Text>;
        });
    }

    handlePress = () => {
        requestAnimationFrame(() => {
            if (this.showDetail) {
                Animated.parallel([
                    Animated.timing(this.state.height, {
                        toValue: scaleSize(seatsHeight),
                        duration: 150,
                        easing: Easing.ease,
                        // useNativeDriver: true
                    }),
                    Animated.timing(this.state.topHeight, {
                        toValue: scaleSize(seatsHeight),
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

        if (Platform.OS === 'android') {
            this.height = scaleSize((seatsMap.length - 1) * 51) + scaleSize(55); // 51为火车票详情的高度
        } else {
            this.height = scaleSize(seatsMap.length * 51);
        }
        
        return (
            <View style={{
                overflow: 'hidden'
            }}>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => this.handlePress()}
                    style={styles.train_info}
                    
                >
                    {/* 开始信息开始 */}
                    <View style={styles.info_column}>
                        {pureText(fmtime, { color: '#333' }, 20)}
                        {pureText(fmcity, { color: '#2d2d2d', 
                            marginTop: 5 }, 14)}
                    </View>
                    {/* 开始信息结束 */}
                    <View style={styles.info_column}>
                        <View style={styles.trainno}>
                            {pureText(trainno, { color: '#2d2d2d' }, 12)}
                            {accbyidcard ? <Image
                                resizeMode="cover"
                                style={{
                                    width: cardScale * 12,
                                    height: scaleSize(12),
                                    marginLeft: 4
                                }}
                                source={require('../../images/idcard.png')}
                            /> : null}
                        </View>
                        <Image
                            resizeMode="cover"
                            style={{
                                width: scaleSize(61),
                                height: scaleSize(61) / lineScale
                            }}
                            source={require('../../images/right_line.png')}
                        />
                        {pureText(usedtime, { color: '#999', 
                            marginTop: Platform.OS === 'ios' ? setSpText(4) : 0 }, 12)}
                    </View>
                    {/* 到达信息开始 */}
                    <View style={styles.info_column}>
                        {pureText(totime, { color: '#333' }, 20)}
                        {pureText(tocity, { color: '#2d2d2d', 
                            marginTop: 5 }, 14)}
                    </View>
                    {/* 到达信息结束 */}
                    {/* 票价开始 */}
                    <View style={styles.info_column}>
                        <Text style={{
                            fontSize: setSpText(20),
                            color: '#ff5346',
                        }}>
                            <Text style={{
                                fontSize: setSpText(12)
                            }}>¥</Text>
                            {Math.min.apply({}, priceMap)}
                            <Text style={{
                                fontSize: setSpText(12)
                            }}>起</Text>
                        </Text>
                    </View>
                    {/* 票价结束 */}
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

    render() {
        const { viewWidth } = this.props;

        if (Platform.OS === 'ios') {
            return (
                <View style={{
                    marginLeft: scaleSize(5),
                    marginRight: scaleSize(5),
                    marginBottom: scaleSize(5),
                    // shadowColor: 'rgba(153,153,153,.2)',
                    shadowColor: '#ccc',
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
                    marginLeft: 5,
                    marginBottom: 3
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
        flexDirection: 'row',
        ...Platform.select({
            ios: {
                borderRadius: 4,
                backgroundColor: '#FFF',
            }
        })
    },
    'info_column': {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    'trainno': {
        flexDirection: 'row',
        alignItems: 'center'
    },
    'train_seats': {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: scaleSize(15),
        ...Platform.select({
            ios: {
                backgroundColor: 'transparent',
                borderBottomLeftRadius: 4,
                borderBottomRightRadius: 4
            },
            android: {
                position: 'relative',
                bottom: scaleSize(4),
            }
        })
    }
});
