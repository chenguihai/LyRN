import React, { Component } from 'react';
import { View, Text, Image, Animated, Easing, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import _ from '../util';

export default class TrainPage extends Component {

    checkboxMap = {
        false: require('../images/checkbox.png'),
        true: require('../images/checkbox_active.png')
    }

    state = {
        checkboxStudent: false,
        checkboxHighRail: false,
        cityOpacity: new Animated.Value(1)
    }

    changeCityPosition = () => {
        Animated.timing(this.state.cityOpacity, {
            toValue: 0,
            duration: 2000,
            easing: Easing.linear
        }).start();
    }

    handleCheckbox = (field, val) => {
        this.setState({
            [field]: !val            
        });
    }

    render() {
        const { checkboxStudent, checkboxHighRail, cityOpacity } = this.state;
        const { width } = Dimensions.get('window');

        return (
            <View style={styles.wrap}>
                <View style={styles.container}>
                    {/* Notice start  */}
                    <Text style={styles.notice} numberOfLines={1}>
                    暑期出行提醒：暑期客运高峰，出行人数较多，部分车站安检排队人数较多，请合理安排好您的出行时间，出行前检查好您的必要证件，以避免耽误您的出行。
                    </Text>
                    {/* Notice end  */}
                    {/* Banner start  */}
                    <Image 
                        resizeMode ="stretch" 
                        style={{ width,
                            height: 116 }} source={require('../images/banner.jpg')} />
                    {/* Banner end  */}
                    {/* 查询城市开始  */}
                    <View style={styles.query_city}>
                        <View style={styles.query_city_item}>
                            <Text style={styles.city_txt}>出发城市</Text>
                            <TouchableOpacity>
                                <Animated.Text style={[
                                    styles.city, 
                                    { opacity: cityOpacity }
                                ]}>
                                    上饶
                                </Animated.Text>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity onPress={this.changeCityPosition}>
                            <Image style={styles.change_city} source={require('../images/change_city.png')} />
                        </TouchableOpacity>
                        <View style={[
                            styles.query_city_item, 
                            { alignItems: 'flex-end' }
                        ]}>
                            <Text style={styles.city_txt}>到达城市</Text>
                            <Text style={styles.city}>上海</Text>
                        </View>
                    </View>
                    {/* 查询城市结束  */}
                    {/* 查询日期开始  */}
                    <View style={styles.query_date}>
                        <View style={styles.query_date_inner}>
                            <Text style={styles.date}>8月13日</Text>
                            <Text style={styles.date_txt}>明天出发</Text>
                        </View>
                    </View>
                    {/* 查询日期结束  */}
                    <View style={styles.checkbox}>
                        <TouchableOpacity
                            activeOpacity={0.6}
                            onPress={() => this.handleCheckbox('checkboxStudent', checkboxStudent)}
                        >
                            <View style={styles.checkbox_item}>
                                <Text style={styles.checkbox_txt}>学生票</Text>
                                <Image 
                                    style={styles.checkbox_image} 
                                    source={this.checkboxMap[checkboxStudent]} 
                                />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={0.6}
                            onPress={() => this.handleCheckbox('checkboxHighRail', checkboxHighRail)}
                        >
                            <View style={styles.checkbox_item}>
                                <Text style={styles.checkbox_txt}>高铁/动车</Text>
                                <Image 
                                    style={styles.checkbox_image} 
                                    source={this.checkboxMap[checkboxHighRail]} 
                                />
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{ alignItems: 'center', 
                        marginTop: 13, 
                        marginBottom: 13 }}>
                        <View style={[
                            styles.search_button, 
                            { width: width * 0.86, 
                                position: 'relative' }
                        ]}>
                            <Text style={styles.button_txt}>火车票查询</Text>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({ 
    wrap: { 
        flex: 1, 
        backgroundColor: '#f3f4f8'
    },
    container: {
        backgroundColor: '#FFF',
    },
    notice: {
        alignItems: 'center',
        fontSize: 11,
        backgroundColor: '#fff7dc',
        color: '#9a7126',
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 15,
        paddingRight: 15,
        
    },
    'query_city': {
        flexDirection: 'row',
        height: 84,
        marginLeft: 15,
        marginRight: 15,
        borderBottomWidth: _.hairlineWidth,
        borderColor: '#dcdcdc'
    },
    'query_city_item': {
        flex: 1,
    },
    'city_txt': {
        fontSize: 12,
        lineHeight: 12,
        color: '#999',
        paddingTop: 15,
        paddingBottom: 14
    },
    city: {
        fontSize: 28,
        color: '#333',
        lineHeight: 28
    },
    'change_city': {
        width: 30,
        height: 30,
        position: 'relative',
        top: 30
    },
    'query_date': {
        marginLeft: 15,
        marginRight: 15,
        minHeight: 61,
        alignItems: 'flex-start',
        justifyContent: 'center',
        borderBottomWidth: _.hairlineWidth,
        borderColor: '#dcdcdc'
    },
    'query_date_inner': {
        flexDirection: 'row',
        alignItems: 'baseline'
    },
    date: {
        fontSize: 25,
        color: '#333',
        lineHeight: 25,
        fontWeight: 'normal'
    },
    'date_txt': {
        color: '#999',
        fontSize: 14
    },
    'checkbox': {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginRight: 15,
        marginLeft: 15,
        // Height: 18,
        paddingTop: 15,
        paddingBottom: 18
    },
    'checkbox_item': {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    'checkbox_txt': {
        fontSize: 14,
        lineHeight: 18,
        color: '#2d2d2d'
    },
    'checkbox_image': {
        width: 18,
        height: 18,
        marginLeft: 3
    },
    'search_button': {
        justifyContent: 'center',
        alignItems: 'center',
        height: 45,
        // marginTop: 13,
        // marginBottom: 13,
        backgroundColor: '#28c54d',
        borderRadius: 22.5
    },
    'button_txt': {
        color: '#FFF',
        fontSize: 18,
        fontWeight: '700'
    }
});
