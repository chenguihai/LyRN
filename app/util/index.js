/* eslint-disable no-multi-assign,id-length,no-empty-function */

import {
    StyleSheet,
    findNodeHandle,
    UIManager
} from 'react-native';
import axios from 'axios';
import lodash from './lodash.custom.min.js';

const Util = () => { };
const class2type = {},
    { toString } = class2type;

[
    'String', 
    'Number', 
    'Array',
    'Boolean', 
    'Function',
    'Object'
].forEach((i) => {
    class2type[`[object ${i}]`] = i.toLowerCase();
});

function type(obj) {
    return obj === null ? String(obj) : class2type[toString.call(obj)] || 'object';
}

Util.prototype = {
    constructor: Util,
    hairlineWidth: StyleSheet.hairlineWidth,
    prefixUri: 'http://wx.17u.cn/'
};

Util.prototype.debounce = lodash.debounce;

/**
 * @description 判断元素是否为null
 * @param {*} 要判断的元素
 */

Util.prototype.isNull = function (value) {
    return value === null;
};

/**
 * @description 判断元素是否为函数
 * @param {*} 要判断的元素
 */

Util.prototype.isFunction = function (value) {
    return type(value) === 'function';
};

/**
 * @description 将数组分割成相等数量的块
 * @param {array} arr 要切割的数组
 * @param {number} num 块的数量 
 */

Util.prototype.chunk = function (arr, num) {
    num = Number(num) || 1;
    const ret = [];

    arr.forEach((item, i) => {
        if (i % num === 0) {
            ret.push([]);
        }
        ret[ret.length - 1].push(item);
    });

    return ret;
};

/** 
 * @description 获取组件的宽度和高度及位置信息
 * @param {ReactElement} ref 组件实例
 * @returns {promise} x,y组件的相对坐标,width组件的宽度,height组件的高度,pageX,pageY组件相对于屏幕的绝对坐标
 */

Util.prototype.getLayout = function (ref) {
    const handle = findNodeHandle(ref);

    return new Promise((resolve) => {
        UIManager.measure(handle, (x, y, width, height, pageX, pageY) => {
            resolve({
                x,
                y,
                width,
                height,
                pageX,
                pageY
            });
        });
    });
};

// ===== ajax helpers

Util.prototype.get = (uri, data) => {
    return new Promise((resolve) => {
        const url = uri.indexOf('http') !== -1 ? uri : _.prefixUri + uri;

        axios.get(url, {
            params: data
        })
            .then((response) => {
                resolve(response);
            })
            .catch((err) => {
                console.log(err.message);
            });
    });
    //     if (error.response) {
    //         // The request was made and the server responded with a status code
    //         // that falls out of the range of 2xx
    //         // console.log(error.response.data);
    //         // console.log(error.response.status);
    //         // console.log(error.response.headers);
    //     } else if (error.request) {
    //         // The request was made but no response was received
    //         // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    //         // http.ClientRequest in node.js
    //         // console.log(error.request);
    //     } else {
    //         // Something happened in setting up the request that triggered an Error
    //         // console.log('Error', error.message);
    //     }
    //     // console.log(error.config);

    //     return error;
};

// ===== date helpers

/**
 * @description 重置时间
 * @param {date} date 需要重置的时间
 * @returns {date}
 */

Util.prototype.resetTime = function (date) {
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);

    return Number(date);
};

/**
 * @description 获取今天凌晨0点0时0分的时间戳(毫秒为单位)
 */

Util.prototype.getToday = function () {
    return _.resetTime(new Date());
};

/**
 * @description 获取明天凌晨0点0时0分的时间戳(毫秒为单位)
 */

Util.prototype.getTomorrow = function () {
    return _.resetTime(new Date(_.getToday() + 8.64e7));
};

/**
 * @description 获取后天凌晨0点0时0分的时间戳(毫秒为单位)
 */

Util.prototype.getAfterTomorrow = function () {
    return _.resetTime(new Date(_.getTomorrow() + 8.64e7));
};

Util.prototype.format = function (timeStamp) {
    const
        date = new Date(timeStamp),
        year = date.getFullYear(),
        month = date.getMonth() + 1,
        day = date.getDate();

    return `${year}-${month > 9 ? month : `0${month}`}-${day > 9 ? day : `0${day}`}`;
};

const _ = new Util();

export default _;
