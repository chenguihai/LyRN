import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    View, Image, Text, StyleSheet, TouchableOpacity
} from 'react-native';

class BackNavbarComponent extends Component {

    static propTypes = {
        navigator: PropTypes.object
    }

    titleMap = {
        City: '选择城市',
        Calendar: '选择日期',
        TrainOrder: '订单'
    }

    render() {
        let title = '';
        const { scene: { route }, navigation: { goBack } } = this.props.navigator,
            { routeName, params } = route;

        if (routeName === 'TrainList') {
            const { from, to } = params;

            title = `${from.Name} - ${to.Name}`;
        } else if (this.titleMap[routeName]) {
            title = this.titleMap[routeName];
        }
        
        return (
            <View style={{
                height: 50,
                flexDirection: 'row',
                alignItems: 'center',
                paddingLeft: 10,
                backgroundColor: '#FFF',
                borderBottomColor: '#e4e4e4',
                borderBottomWidth: StyleSheet.hairlineWidth
            }}>
                <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={ () => { 
                        requestAnimationFrame(() => {
                            goBack();
                        });
                    } }
                >
                    <Image 
                        source={require('../images/icon_back.png')}
                        style={{
                            width: 32,
                            height: 28
                        }}
                    />
                </TouchableOpacity>
                <Text style={{
                    fontSize: 18
                }}>{title}</Text>
            </View>
        );
    }
}

const backNavbar = (navigator) => {
    return <BackNavbarComponent navigator={navigator} />;
};

export default backNavbar;
