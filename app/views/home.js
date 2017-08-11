import React, { Component } from 'react';
import { StyleSheet, Text, Platform } from 'react-native';
import { TabViewAnimated, TabViewPagerScroll, TabViewPagerPan, TabBar, SceneMap } from 'react-native-tab-view';
import TrainPage from '../pages/train';
import FlightPage from '../pages/flight';
import BusPage from '../pages/bus';

const themeColor = '#09bb07';

export default class HomeView extends Component {

    state = {
        index: 0,
        routes: [
            { key: '1',
                title: '火车票' },
            { key: '2',
                title: '机票' },
            { key: '3',
                title: '汽车/船票' }
        ],
    };

    _renderLabel({ focused, route }) {
        const { title = '' } = route;
        let style = {};

        if (focused) {
            style = { color: themeColor };
        }
        
        return <Text style={style}>{title.toUpperCase()}</Text>;
    }

    _handleIndexChange = (index) => this.setState({ index });

    _renderHeader = (props) => <TabBar 
        renderLabel={this._renderLabel}
        style={{
            backgroundColor: '#FFF'
        }}
        tabStyle={{
            height: 50,
        }}
        labelStyle={{
            color: '#666'
        }}
        indicatorStyle={{
            backgroundColor: themeColor,
        }}
        {...props} 
    />;

    _renderPager = (props) => Platform.OS === 'ios' ? <TabViewPagerScroll {...props} /> : <TabViewPagerPan {...props} />;

    _renderScene = SceneMap({
        '1': TrainPage,
        '2': FlightPage,
        '3': BusPage
    });

    render() {
        return (
            <TabViewAnimated
                style={styles.container}
                navigationState={this.state}
                renderScene={this._renderScene}
                renderHeader={this._renderHeader}
                onIndexChange={this._handleIndexChange}
                renderPager={this._renderPager}
            />
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
