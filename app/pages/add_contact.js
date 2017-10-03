import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import {
    View,
    Text,
    TextInput,
    ScrollView,
    TouchableOpacity,
} from 'react-native';

import ListItemComponent from '../components/list_item';
// import PickerComponent from '../components/picker';
import Picker from 'react-native-picker';
// import DatePickerComponent from '../components/date_picker';

const pickerTitleMap = {
    ticket: '选择车票类型',
    idCard: '选择证件类型',
    sex: '选择性别',
    birthDay: '选择日期'
};

const nowDate = new Date(),
    years = [],
    months = [],
    initialYear = 1900,
    thisYear = nowDate.getFullYear(), // 今年的年份
    thisMonth = nowDate.getMonth() + 1, // 今年的月份
    thisDay = nowDate.getDate(); // 今年的日期

for (let i = 1; i <= 12; i++) {
    months.push(i); 
}

/**
 * @description 每个月的天数
 * @param {*} year 年份
 */

const getDayNum = (year) => {
    const dayOfMonth = [
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
    // 如果为闰年，2月份有29天

    if (year % 4 === 0 && year % 100 !== 0 || year % 400 === 0) {
        dayOfMonth[1] = 29;
    }
    
    return dayOfMonth;
};

for (let i = initialYear; i <= thisYear; i++) {
    const dayOfMonth = getDayNum(i);

    const monthData = [];

    // if (i === thisYear) { 
    months.forEach((item, index) => {
        const days = [];

        for (let i = 1; i <= dayOfMonth[index]; i++) {
            days.push(i);
        }
        monthData.push({
            [item]: days
        });
    });
    // }
    years.push({
        [i]: monthData
    });
}
const pickerOption = {
    pickerConfirmBtnText: '确定',
    pickerCancelBtnText: '取消',
    onPickerCancel: () => {
        Picker.hide();
    }
};

export default class AddContactPage extends Component {

    static propTypes = {
    }
    
    state = {
        ticket: {
            selectedValue: '成人票',
            pickerData: [
                '成人票', 
                '儿童票'
            ]
        },
        idCard: {
            selectedValue: '身份证',
            pickerData: [
                '身份证', 
                '护照',
                '台胞证',
                '港澳通行证'
            ]
        },
        sex: {
            selectedValue: '男',
            pickerData: [
                '男', 
                '女'
            ]
        },
        birthDay: {
            placeholder: '年/月/日',
            selectedValue: '',
            pickSelectedValue: [
                thisYear, 
                thisMonth, 
                thisDay
            ]
        }
    }

    initPicker(key) {
        const { selectedValue, pickerData } = this.state[key];

        Picker.init({
            ...{
                pickerData,
                selectedValue: [selectedValue],
                pickerTitleText: pickerTitleMap[key],
                onPickerConfirm: ([value]) => {
                    // console.log(`pickerConfirm:${value}`);
                    const data = this.state[key];
    
                    data.selectedValue = value;
                    this.setState({
                        [key]: data
                    });
                },
                onPickerSelect: () => {
                    // console.log(`pickerSelect:${value}`);
                }
            },
            ...pickerOption
        });
    }

    initDatePicker(key) {
        const data = this.state[key];

        Picker.init({
            ...{
                pickerData: years,
                pickerTitleText: pickerTitleMap[key],
                selectedValue: data.pickSelectedValue,
                onPickerConfirm: (value) => {
                    data.pickSelectedValue = value;
                    data.selectedValue = value.join('-');
                    data.placeholder = '';
                    this.setState({
                        [key]: data
                    }); 
                }
            },
            ...pickerOption
        });
    }

    _renderTitle(title) {
        return (
            <View style={{
                flex: 1
            }}>
                <Text style={{
                    color: '#666',
                    fontSize: setSpText(16)
                }}>{title}</Text>
            </View>
        );
    }

    _renderInputAfter(placeholder, keyboardType, maxLength) {
        return (
            <View style={{
                flex: 2.3
            }}>
                <TextInput
                    underlineColorAndroid="transparent"
                    placeholder={placeholder}
                    placeholderTextColor="#CCC"
                    keyboardType={keyboardType}
                    maxLength={maxLength}
                    style={{
                        padding: scaleSize(0),
                        fontSize: setSpText(16),
                        // lineHeight: setSpText(16),
                        // height: scaleSize(44),
                        flex: 1
                    }}
                />
            </View>
        );
    }

    _renderAfter = (key) => {
        return (
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                    requestAnimationFrame(() => {
                        this.initPicker(key);
                    });
                }} 
                style={{
                    flex: 2.3
                }}
            >
                <Text>{this.state[key].selectedValue}</Text>
            </TouchableOpacity>
        );
    }

    _renderDateAfter = (key) => {
        const { placeholder, selectedValue } = this.state[key];
        
        return (
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                    requestAnimationFrame(() => {
                        this.initDatePicker(key);
                    });
                }} 
                style={{
                    flex: 2.3
                }}
            >
                <Text>{placeholder.length > 0 ? placeholder : selectedValue}</Text>
            </TouchableOpacity>
        );
    }

    _renderSubmitButton() {
        return (
            <View style={{
                marginTop: scaleSize(40),
                marginLeft: scaleSize(20),
                marginRight: scaleSize(20),
                height: scaleSize(50),
                backgroundColor: '#3c6',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 5
            }}>
                <Text style={{
                    fontSize: setSpText(18),
                    color: '#FFF'
                }}>确定</Text>
            </View>
        );
    }

    render() {
        const { idCard } = this.state;

        const reset = idCard.selectedValue !== '身份证' 
            ? [
                {
                    iconDirection: 'down',
                    title: this._renderTitle('生日'),
                    after: this._renderDateAfter('birthDay')
                },
                {
                    iconDirection: 'down',
                    title: this._renderTitle('性别'),
                    after: this._renderAfter('sex')
                }
            ] : [];

        return (
            <View style={{
                flex: 1
            }}>
                <ScrollView>
                    <ListItemComponent 
                        data={{
                            borderRadius: 3,
                            list: [
                                {
                                    iconStyle: {
                                        opacity: 0,
                                    },
                                    title: this._renderTitle('姓名'),
                                    after: this._renderInputAfter('乘客姓名', 'default', 20)
                                },
                                {
                                    iconDirection: 'down',
                                    title: this._renderTitle('车票类型'),
                                    after: this._renderAfter('ticket')
                                },
                                {
                                    iconDirection: 'down',
                                    title: this._renderTitle('证件类型'),
                                    after: this._renderAfter('idCard')
                                },
                                {
                                    iconStyle: {
                                        opacity: 0,
                                    },
                                    title: this._renderTitle('证件号码'),
                                    after: this._renderInputAfter('乘客证件号码', 'numeric', 18)
                                },
                                ...reset
                            ]
                        }}
                    />
                    {this._renderSubmitButton()}
                </ScrollView>
            </View>
        );
    }
}
