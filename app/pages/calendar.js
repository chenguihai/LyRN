import React, { Component } from 'react';
import { 
    ScrollView,
    View,
    Text,
    StyleSheet,
    Dimensions
} from 'react-native';
import CalendarHeaderPage from './calendar_header';

export default class CalenDarPage extends Component {

    today = new Date(); // 获取当前时间的Date对象
    year = this.today.getFullYear(); // 获取Date对象中的年份
    month = this.today.getMonth(); // 获取Date对象中的月份
    dayOfMonth = this.today.getDate(); // 获取Date对象中一月中的某一天
    firstDay = new Date(this.year, this.month, 1).getDay(); // 当月的第一天是礼拜几
    daysNum = this.getDayNum(this.year)[this.month]; // 这个月的总天数
    lineNumber = Math.ceil((this.daysNum + this.firstDay) / 7); // 总行数

    getDayNum(year) {
        const days_per_month = [ // eslint-disable-line
            31,
            28, 
            31, 
            30, 
            31, 
            30, 
            31, 
            31,
            30,
            31,
            30,
            31
        ];
        if (year % 4 === 0 && year % 400 !== 0 || year % 400 === 0) { // eslint-disable-line
            days_per_month[1] = 29; // eslint-disable-line
        }

        return days_per_month; // eslint-disable-line
    }

    componentDidMount() {
        console.log(new Array(this.lineNumber));
    }

    _renderRow(rowIndex) {
        const columnArr = new Array(7).fill('');

        return columnArr.map((item, index) => {
            const idx = index + rowIndex * 7; // eslint-disable-line
            const date = idx - this.firstDay + 1; // eslint-disable-line
            const innerStyle = date === this.dayOfMonth ? styles.active_background : {};
            const textStyle = date === this.dayOfMonth ? styles.active_txt : {};
            const disableTxtStyle = date < this.dayOfMonth ? styles.disable_txt : {};

            return (
                <View style={[
                    styles.each_day,
                    { width: this.innerWidth / 7 }
                ]} key={idx}>
                    <View style={[
                        styles.each_day_inner,
                        innerStyle
                    ]}>
                        <Text style={[
                            textStyle, 
                            disableTxtStyle
                        ]}>{date <= 0 || date > this.daysNum ? '' : date}</Text> 
                    </View>
                    <Text></Text>
                </View>
            );
        });
    }

    render() {
        const rowArr = new Array(this.lineNumber).fill('');
        const { width } = Dimensions.get('window');

        this.innerWidth = width * 0.9;
        this.gutter = width * 0.05;
        
        return (
            <View>
                <CalendarHeaderPage />
                <View style={[
                    styles.each_month,
                    {
                        paddingLeft: this.gutter,
                        paddingRight: this.gutter
                    }
                ]}>
                    {
                        rowArr.map((item, index) => 
                            <View style={styles.each_week} key={index}>
                                {this._renderRow(index)}
                            </View>
                        )
                    }
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    'each_month': {
        backgroundColor: '#FFF'
    },
    'each_week': {
        flexDirection: 'row'
    },
    'each_day': {
        height: 35
    },
    'each_day_inner': {
        width: 28,
        height: 28,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    'active_background': {
        backgroundColor: '#09bb07'
    },
    'active_txt': {
        color: '#FFF'
    },
    'disable_txt': {
        color: '#ccc'
    },
});
