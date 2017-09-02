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
import { DateAction } from '../actions';

import createCalendar from '../util/createCalendar';

class CalenDarPage extends Component {

    static propTypes = {
        selectDate: PropTypes.func,
        navigation: PropTypes.object
    }

    state = {
        calendar: []
    }

    componentDidMount() {
        this.setState({
            calendar: createCalendar.init()
        });
    }

    handleSelect = (time) => {
        const { navigation, selectDate } = this.props;

        selectDate(navigation.state.params.routeName, time);
        InteractionManager.runAfterInteractions(() => {
            navigation.goBack();
        });
    }

    render() {

        return (
            <View style={{ flex: 1 }}>
                <CalendarHeaderPage />
                <CalendarMonthComponent 
                    onSelect={this.handleSelect} 
                    data={this.state.calendar} 
                />
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
