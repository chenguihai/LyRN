import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    ScrollView,
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    InteractionManager
} from 'react-native';
import _ from '../../util';
import date from '../../util/date';

const themeColor = '#09bb07';
const todayBgColor = '#e7e7e7';

export default class CalendarMonthComponent extends Component {

    static defaultProps = {
        data: []
    }

    static propTypes = {
        data: PropTypes.array,
        onSelect: PropTypes.func
    }

    _refView = [];

    _refText = [];

    _recentList = [];

    handlePress = (time) => {
        // if (this._recentList.length > 0) {
        //     this._recentList.forEach((item) => {
        //         const { ref, style } = item;

        //         ref.setNativeProps({ style });
        //     });
        // }

        this._refView[time].setNativeProps({
            style: { backgroundColor: themeColor }
        });
        this._refText[time].setNativeProps({
            style: {
                color: '#FFF'
            }
        });
        // this._recentList[0] = {
        //     ref: this._refView[time],
        //     style: {
        //         backgroundColor: bgColor
        //     }
        // };
        // this._recentList[1] = {
        //     ref: this._refText[time],
        //     style: {
        //         color: txtColor
        //     }
        // };
        const { onSelect } = this.props;

        if (onSelect) {
            InteractionManager.runAfterInteractions(() => {
                onSelect(time);
            });
        }
    }

    dayMap = {
        [date.getToday()]: '今天',
        [date.getTomorrow()]: '明天',
        [date.getAfterTomorrow()]: '后天'
    };

    _renderRow(day, index, year, month) {

        // const time = _.isNull(day) ? '' : Number(new Date(year, month - 1, day));
        const time = '';
        const bgColor = time === date.getToday() ? todayBgColor : '#FFF';
        // const txtColor = time < date.getToday()
        // ? '#ccc' 
        // : index === 0 && time !== '' || index === length - 1 && length === 7 ? themeColor : '#000';
        const handlePress = time < date.getToday() ? null : this.handlePress;
        const txtColor = time < date.getToday() ? '#ccc' : '#000';
        
        return (
            <TouchableOpacity
                onPress={() => handlePress(time)}
                style={[
                    styles.each_day,
                    { width: this.innerWidth / 7 }
                ]} key={index}
            >
                <View 
                    ref={(ref) => { 
                        time !== '' && (this._refView[time] = ref);
                    }} style={[
                        styles.each_day_number,
                        {
                            backgroundColor: bgColor
                        }
                    ]}
                >
                    <Text 
                        ref={(ref) => { 
                            time !== '' && (this._refText[time] = ref);
                        }} 
                        style={{
                            color: txtColor // 如果为每行的第一个或者最后一个字体高亮显示
                        }}
                    >{day}</Text>
                </View>
                <Text 
                    style={[
                        styles.each_day_txt,
                        { color: themeColor }
                    ]}
                >{this.dayMap[time]}</Text>
            </TouchableOpacity>
        );
    }

    render() {
        const { width } = Dimensions.get('window');
        const { data } = this.props;

        this.innerWidth = width * 0.9;

        return (
            <ScrollView style={{ flex: 1 }}>
                {
                    data.map((monthData, index) => {
                        const { year, month, dayList } = monthData;

                        return (
                            <View key={index}>
                                <View style={styles.month_header}>
                                    <Text style={styles.month_header_txt}>{year}年{month}月</Text>
                                </View>
                                <View style={styles.month_body}>
                                    {
                                        dayList.map(
                                            (day, dayIndex) => this._renderRow(day, dayIndex, year, month)
                                        )
                                    }
                                </View>
                            </View>
                        );
                    })
                }
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    'month_header': {
        height: 30,
        backgroundColor: '#f2f5f7',
        alignItems: 'center',
        justifyContent: 'center'
    },
    'month_header_txt': {
        fontSize: 14,
        color: '#000'
    },
    'month_body': {
        backgroundColor: '#FFF',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center'
    },
    'each_day': {
        height: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },
    'each_day_number': {
        width: 28,
        height: 28,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    'each_day_txt': {
        fontSize: 11,
        lineHeight: 11
    }
});
