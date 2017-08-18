import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    ScrollView,
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Dimensions
} from 'react-native';
import _ from '../../util';

const themeColor = '#09bb07';
const todayBgColor = '#e7e7e7';

export default class CalendarMonthComponent extends Component {

    static defaultProps = {
        calendarData: []
    }

    static propTypes = {
        calendarData: PropTypes.array,
        onSelect: PropTypes.func
    }

    _refView = [];

    _refText = [];

    _recentList = [];

    handlePress = (time, txtColor, bgColor) => {
        if (this._recentList.length > 0) {
            this._recentList.forEach((item) => {
                const { ref, style } = item;

                ref.setNativeProps({ style });
            });
        }
                        
        this._refView[time].setNativeProps({
            style: { backgroundColor: themeColor }
        }); 
        this._refText[time].setNativeProps({
            style: {
                color: '#FFF'
            }
        });
        this._recentList[0] = {
            ref: this._refView[time],
            style: {
                backgroundColor: bgColor
            }
        };
        this._recentList[1] = {
            ref: this._refText[time],
            style: {
                color: txtColor
            }
        };
        const { onSelect } = this.props;

        if (onSelect) {
            onSelect(time);
        }
    }

    dayMap = {
        [this._getToday()]: '今天',
        [this._getTomorrow()]: '明天',
        [this._getAfterTomorrow()]: '后天'
    };

    _resetTime(date) {
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);
        date.setMilliseconds(0);
        
        return Number(date);
    }

    _getToday() {
        return this._resetTime(new Date());
    }

    _getTomorrow() {
        return this._resetTime(new Date(this._getToday() + 8.64e7));
    }

    _getAfterTomorrow() {
        return this._resetTime(new Date(this._getTomorrow() + 8.64e7));
    }

    _renderRow(rowData, monthData) {
        const { year, month } = monthData;
        const { length } = rowData;
        

        return rowData.map((item, index) => {
            const time = _.isNull(item) ? null : Number(new Date(year, month - 1, item));
            const bgColor = time === this._getToday() ? todayBgColor : '#FFF';
            const txtColor = time < this._getToday() ? '#ccc' : index === 0 && !_.isNull(item) || index === length - 1 && length === 7 ? themeColor : '#000';
            const handlePress = time < this._getToday() ? () => {} : this.handlePress;
            
            return (
                <TouchableOpacity
                    onPress={() => handlePress(time, txtColor, bgColor)}
                    style={[
                        styles.each_day,
                        { width: this.innerWidth / 7 }
                    ]} key={index}
                >
                    <View ref={(ref) => this._refView[time] = ref} style={[
                        styles.each_day_number, 
                        {
                            backgroundColor: bgColor
                        }
                    ]}>
                        <Text ref={(ref) => this._refText[time] = ref} style={{
                            color: txtColor // 如果为每行的第一个或者最后一个字体高亮显示
                        }}>{_.isNull(item) ? '' : item}</Text>
                    </View>
                    <Text style={[
                        styles.recent,
                        { color: themeColor }
                    ]}>{this.dayMap[time]}</Text>
                </TouchableOpacity>
            );
        });
    }

    render() {
        const { width } = Dimensions.get('window');

        this.innerWidth = width * 0.9;
        this.gutter = width * 0.05;
        const { calendarData } = this.props;
        
        return (
            <ScrollView style={{ flex: 1 }}>
                {
                    calendarData.map((monthData, index) => {
                        const { year, month, dayList } = monthData;
                        
                        return (
                            <View key={index}>
                                <View style={styles.month_header}>
                                    <Text style={styles.month_header_txt}>{year}年{month}月</Text>
                                </View>
                                <View style={[
                                    styles.each_month,
                                    {
                                        paddingLeft: this.gutter,
                                        paddingRight: this.gutter
                                    }
                                ]}>
                                    {
                                        _.chunk(dayList, 7).map((rowData, rowIndex) => 
                                            <View style={styles.each_month_row} key={rowIndex}>
                                                {this._renderRow(rowData, monthData)}
                                            </View> 
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
    'each_month': {
        backgroundColor: '#FFF'
    },
    'each_month_row': {
        flexDirection: 'row'
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
    recent: {
        fontSize: 11,
        lineHeight: 11
    }
});
