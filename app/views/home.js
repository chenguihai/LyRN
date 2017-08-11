import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import TrainPage from '../pages/train';
import FlightPage from '../pages/flight';
import BusPage from '../pages/bus';

export default class HomeView extends Component {
    render() {
        return (
            <ScrollableTabView>
                <TrainPage tabLabel="火车票" />
                <FlightPage tabLabel="机票" />
                <BusPage tabLabel="汽车/船票" />
            </ScrollableTabView>
        );
    }
}
