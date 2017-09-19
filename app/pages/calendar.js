import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    View,
    InteractionManager
} from 'react-native';
import CalendarHeaderPage from '../components/calendar/calendar_header';
import CalendarMonthComponent from '../components/calendar/calendar_month';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { selectDate } from '../actions';

import createCalendar from '../util/createCalendar';

import date from '../util/date';

class CalenDarPage extends Component {

    static propTypes = {
        selectDate: PropTypes.func,
        navigation: PropTypes.object
    }

    state = {
        calendar: []
    }

    componentWillMount() {
        this.setState({
            calendar: createCalendar.init()
        });
    }

    handleSelect = (time) => {
        const { navigation, selectDate } = this.props;
        const { key } = navigation.state.params || {};

        selectDate({
            [key]: time,
            [`${key}Desc`]: this.getDayMap()[time] || ''
        });
        InteractionManager.runAfterInteractions(() => {
            navigation.goBack();
        });
    }

    getDayMap() {
        return {
            [date.format(date.getToday())]: '今天',
            [date.format(date.getTomorrow())]: '明天',
            [date.format(date.getAfterTomorrow())]: '后天'
        };
    }

    render() {

        return (
            <View style={{ flex: 1 }}>
                <CalendarHeaderPage />
                <CalendarMonthComponent 
                    onSelect={this.handleSelect} 
                    data={this.state.calendar} 
                    dayMap = {this.getDayMap()}
                />
            </View>
        );
    }
}

const mapStateToProps = () => ({
});

const mapActionToProps = (dispatch) => bindActionCreators({ selectDate }, dispatch);
    
export default connect(mapStateToProps, mapActionToProps)(CalenDarPage);
