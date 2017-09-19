import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Text,
    Image,
    Dimensions,
    StyleSheet,
    TouchableOpacity,
    Animated
} from 'react-native';

import date from '../../util/date';

const themeColor = '#3C6';

export default class HeaderComponent extends Component {

    static propTypes = {
        navigation: PropTypes.object
    };

    static defaultProps={
        navigation: { state: { params: {} } }
    }

    dayMap = [
        '周日', 
        '周一', 
        '周二', 
        '周三', 
        '周四', 
        '周五', 
        '周六'
    ];

    state = {
        prev: '09月20日',
        current: '09月21日',
        next: '09月22日'
    }

    componentWillMount() {
        const { navigation: { state: { params: { tripTime } } } } = this.props;

        this.animtedValue = new Animated.Value(-1);
        this.setState({
            tripTime
        });
    }

    selectPrevDay = () => {
        Animated.timing(this.animtedValue, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true
        }).start(() => {
            Animated.timing(this.animtedValue, {
                toValue: -1,
                duration: 0,
                useNativeDriver: true
            }).start();
        });
    }

    selectNextDay = () => {
        Animated.timing(this.animtedValue, {
            toValue: 1,
            duration: 100,
            useNativeDriver: true
        }).start(() => {
            this.setState({
                tripTime: this.todayTimeStamp + 8.64e7
            });
            Animated.timing(this.animtedValue, {
                toValue: -1,
                duration: 0,
                useNativeDriver: true
            }).start();
        });
    }

    covertToMonthAndDay(time) {
        const date = new Date(time),
            month = date.getMonth() + 1,
            day = date.getDate(),
            weekDay = this.dayMap[date.getDay()];
        
        return {
            date: `${month > 9 ? month : `0${month}`}月${day > 9 ? day : `0${day}`}日`,
            weekDay
        };
    }

    render() {
        const { tripTime } = this.state;
        const { width } = Dimensions.get('window');
        const btnWidth = (width - 12) * 0.28;

        const imageScale = 12 / 22;

        this.todayTimeStamp = date.resetTime(tripTime);
        const 
            today = this.covertToMonthAndDay(this.todayTimeStamp),
            tomorrow = this.covertToMonthAndDay(this.todayTimeStamp + 8.64e7),
            yesterday = this.covertToMonthAndDay(this.todayTimeStamp - 8.64e7);
        
        return (
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={this.selectPrevDay}
                >
                    <View style={[
                        styles.btn,
                        {
                            width: btnWidth
                        }
                    ]}>
                        <Image
                            source={require('../../images/arrow_left.png')}
                            resizeMode="cover"
                            style={
                                {
                                    width: 6,
                                    height: 6 / imageScale,
                                    marginRight: 6
                                }
                            }
                        />
                        <Text style={styles.btn_txt}>
                        前一天
                        </Text>
                    </View>
                </TouchableOpacity>
                <View style={{
                    width: 150,
                    height: 32,
                    backgroundColor: '#f4f4f4',
                    flexDirection: 'row'
                }}>
                    <Animated.View style={{
                        width: 298,
                        height: 32,
                        flexDirection: 'row',
                        alignItems: 'center',
                        transform: [
                            {
                                translateX: this.animtedValue.interpolate({
                                    inputRange: [
                                        -1,
                                        0, 
                                        1
                                    ],
                                    outputRange: [
                                        -98,
                                        0, 
                                        -196
                                    ]
                                })
                            }
                        ]
                    }}>
                        <View style={{ flex: 1, 
                            alignItems: 'center', 
                            justifyContent: 'center' }}>
                            <Text style={{
                                fontSize: 14
                            }}>{yesterday.date} {yesterday.weekDay}</Text>
                        </View>
                        <View style={{ flex: 1, 
                            alignItems: 'center', 
                            justifyContent: 'center' }}>
                            <Text style={{
                                fontSize: 14
                            }}>{today.date} {today.weekDay}</Text>
                        </View>
                        <View style={{ flex: 1, 
                            alignItems: 'center', 
                            justifyContent: 'center' }}>
                            <Text style={{
                                fontSize: 14
                            }}>{tomorrow.date} {tomorrow.weekDay}</Text>
                        </View>
                    </Animated.View> 
                    <View style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'absolute',
                        width: 50,
                        zIndex: 100,
                        backgroundColor: '#f4f4f4',
                        right: 0,
                        height: 32
                    }}>
                        <Text>日历</Text>
                    </View>
                </View>
                <TouchableOpacity
                    onPress={this.selectNextDay}
                >
                    <View style={[
                        styles.btn,
                        {
                            width: btnWidth,
                            justifyContent: 'flex-end',
                        }
                    ]}>
                        <Text style={styles.btn_txt}>
                        后一天
                        </Text>
                        <Image
                            style={
                                {
                                    width: 6,
                                    height: 6 / imageScale,
                                    marginLeft: 6
                                }
                            }
                            source={require('../../images/arrow_right.png')}
                        />
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    'header': {
        paddingTop: 12.5,
        paddingBottom: 12.5,
        paddingRight: 6,
        paddingLeft: 6,
        backgroundColor: '#FFF',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    'btn': {
        height: 24,
        flexDirection: 'row',
        alignItems: 'center'
    },
    'btn_txt': {
        fontSize: 14,
        color: themeColor
    }
});
