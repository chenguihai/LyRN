import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { 
    View,
    InteractionManager
} from 'react-native';
import CalendarHeaderPage from './calendar_header';
import CalendarMonthComponent from '../components/calendar/calendar_month';

import { NavigationActions } from 'react-navigation';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { DateAction } from '../actions';

class CalenDarPage extends Component {

    static propTypes = {
        startDate: PropTypes.oneOfType([
            PropTypes.number, 
            PropTypes.string,
            PropTypes.date
        ]),
        endDate: PropTypes.oneOfType([
            PropTypes.number, 
            PropTypes.string,
            PropTypes.date
        ]),
        selectDate: PropTypes.func,
        navigation: PropTypes.object
    }

    static defaultProps = {
        startDate: new Date(),
        endDate: ''
    }

    state = {
        calendar: []
    }

    startDate = '';
    endDate = '';
    month = '';
    year = '';
    calendar = [];

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            this.init();
        });
    }

    init() {
        const { startDate, endDate } = this.props;

        this.startDate = startDate;
        this.endDate = endDate !== '' ? endDate : new Date(Number(this.startDate) + 2592e6); // eslint-disable-line
        this.year = this.startDate.getFullYear();
        this.month = this.startDate.getMonth() + 1;
        // debugger; // eslint-disable-line
        this.createCalendar();
    }

    createCalendar() { // eslint-disable-line
        const endYear = this.endDate.getFullYear(); // 获取结束年份
        const endMonth = this.endDate.getMonth() + 1; // 获取结束月份
        const monthNum = (endYear - this.year) * 12 + endMonth - this.month; // eslint-disable-line
        for (let i = 0; i <= monthNum; i++) {
            // debugger; // eslint-disable-line
            const idx = this.month + i;
            const month = idx - Math.floor((idx - 1) / 12) * 12; // eslint-disable-line
            const year = Math.floor((idx - 1) / 12) + this.year;
            const monthObj = {
                year: '',
                month: '',
                dayList: []
            };

            monthObj.year = year;
            monthObj.month = month;
            monthObj.dayList = this.createDayList(year, month);
            this.calendar.push(monthObj);
        }
        this.setState({
            calendar: this.calendar
        });
    }

    /**
     * 获取当月的日历数组
     * @param {number} year 
     * @param {number} month 
     * @return {array} 
     */

    createDayList(year, month) {
        const dayList = [];
        const dayNumofMonth = this.getDayNum(year, month); // 获取当前月份的总天数
        const weekofFirstDay = new Date(year, month - 1, 1).getDay(); // 获取当前月的第一天是星期几

        for (let i = 0; i < weekofFirstDay; i++) {
            dayList.push(null);
        }
        for (let i = 1; i <= dayNumofMonth; i++) {
            dayList.push(i);
        }
        
        return dayList;
    }   

    /**
     * 获取当月的总天数
     * @param {number} year 要获取总天数所在的年份
     * @param {number} month 要获取总天数所在的月份
     * @return {number} 返回当月的总天数
     */

    getDayNum(year, month) {
        let dayOfMonth = [31,28,31,30,31,30,31,31,30,31,30,31]; // eslint-disable-line
        // 判断是否为闰年,闰年2月份有29天
        if(year % 4 === 0 && year % 100 !== 0 || year % 400 === 0){  // eslint-disable-line
            dayOfMonth[1] = 29;
        }
        
        return dayOfMonth[month - 1];
    }

    handleSelect = (time) => {
        const { navigation, selectDate } = this.props;
        const { navigate, state } = navigation;
        const { params } = state;

        navigate({
            routeName: 'Main',
            action: NavigationActions.navigate({ routeName: 'Home' })
        });
        selectDate(time);
    }

    render() {
        const { calendar } = this.state;
        
        return (
            <View style={{ flex: 1 }}>
                <CalendarHeaderPage />
                <CalendarMonthComponent onSelect={this.handleSelect} calendarData={calendar} />
            </View>
        );
    }
}

const mapStateToProps = () => ({
});

const mapActionToProps = (dispatch) => ({
    selectDate: bindActionCreators(DateAction.selectDate, dispatch)
});

export default connect(mapStateToProps, mapActionToProps)(CalenDarPage);
