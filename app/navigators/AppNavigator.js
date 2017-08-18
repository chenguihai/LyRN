import React from 'react';
import { Image } from 'react-native';
import { connect } from 'react-redux';
import { TabNavigator, StackNavigator } from 'react-navigation';

import ShopMallView from '../views/shopmall';
import ProfileView from '../views/profile';

import TrainPage from '../pages/train';
import FlightPage from '../pages/flight';
import BusPage from '../pages/bus';
import CityPage from '../pages/city';
import CalendarPage from '../pages/calendar';

const HomeNavigator = TabNavigator({
    '火车票': { screen: TrainPage },
    '机票': { screen: FlightPage },
    '汽车/船票': { screen: BusPage },
}, { 
    tabBarPosition: 'top',
    lazyLoad: false,
    lazy: true,
    scrollEnabled: true,
    swipeEnabled: false,
    animationEnabled: false,
    tabBarOptions: {
        // 是否显示icon
        showIcon: false,
        // 底部标签栏样式
        style: {
            height: 50,
            backgroundColor: '#FFF'
        },
        tabStyle: {
        },
        labelStyle: {
            fontSize: 14,
            color: '#666'
        },
        activeTintColor: '#09bb07',
        // 底部标签栏指示器的样式
        indicatorStyle: {
            backgroundColor: '#09bb07'
        }
    }
});

const TabNavigatorConfig = {
    tabBarPosition: 'bottom',
    swipeEnabled: false,
    animationEnabled: false,
    tabBarOptions: {
        // 是否显示icon
        showIcon: true,
        // 底部标签栏样式
        style: {
            height: 52,
            backgroundColor: '#FFF'
        },
        tabStyle: {
        },
        labelStyle: {
            fontSize: 12,
            margin: 0,
            color: 'rgb(122, 131, 137)'
        },
        activeTintColor: '#09bb07',
        // 底部标签栏指示器的样式
        indicatorStyle: {
            height: 0
        }
    }
};

/**
 * 路由配置
 */
const obj = {
    Home: {
        screen: HomeNavigator,
        title: '首页',
        unactiveIcon: require('../images/tab_icon/home.png'),
        activeIcon: require('../images/tab_icon/home_active.png')
    },
    ShopMall: {
        screen: ShopMallView,
        title: '商城',
        unactiveIcon: require('../images/tab_icon/shopmall.png'),
        activeIcon: require('../images/tab_icon/shopmall_active.png')
    },
    Profile: {
        screen: ProfileView,
        title: '我的',
        unactiveIcon: require('../images/tab_icon/profile.png'),
        activeIcon: require('../images/tab_icon/profile_active.png')
    }
};

const generateRouteConfig = (route) => ({ 
    screen: route.screen,
    navigationOptions: {
        title: route.title,
        tabBarIcon({ focused }) {
            return <Image
                style={{
                    width: 68,
                    height: 68 / 1.125
                }}
                source= { focused ? route.activeIcon : route.unactiveIcon }
            />;
        }
    }
});

const RouteConfigs = {};

[
    'Home', 
    'ShopMall', 
    'Profile'
].forEach((item) => {
    RouteConfigs[item] = generateRouteConfig(obj[item]);
});

export const AppNavigator = TabNavigator(RouteConfigs, TabNavigatorConfig);

const MainNavigator = StackNavigator({
    
    'main': { screen: AppNavigator, 
        navigationOptions: {
            header: null
        } },
    'city': { screen: CityPage, 
        navigationOptions: {
            title: '选择城市'
        } },
    'calendar': {
        screen: CalendarPage,
        navigationOptions: {
            title: '选择日期'
        }
    },
    
}, {
});

const AppWithNavigationState = () => <MainNavigator />;

export default connect()(AppWithNavigationState);
