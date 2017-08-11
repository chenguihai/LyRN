import React from 'react';
import { Image } from 'react-native';
import HomeView from './views/home';
import ShopMallView from './views/shopmall';
import ProfileView from './views/profile';

export const TabNavigatorConfig = {
    tabBarPosition: 'bottom',
    swipeEnabled: false,
    
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
        screen: HomeView,
        title: '首页',
        unactiveIcon: require('./images/tab_icon/home.png'),
        activeIcon: require('./images/tab_icon/home_active.png')
    },
    ShopMall: {
        screen: ShopMallView,
        title: '商城',
        unactiveIcon: require('./images/tab_icon/shopmall.png'),
        activeIcon: require('./images/tab_icon/shopmall_active.png')
    },
    Profile: {
        screen: ProfileView,
        title: '我的',
        unactiveIcon: require('./images/tab_icon/profile.png'),
        activeIcon: require('./images/tab_icon/profile_active.png')
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

export const RouteConfigs = {};

[
    'Home', 
    'ShopMall', 
    'Profile'
].forEach((item) => {
    RouteConfigs[item] = generateRouteConfig(obj[item]);
});
