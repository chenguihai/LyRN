/* eslint-disable no-multi-assign,id-length,no-empty-function */

import { StyleSheet, Platform } from 'react-native';
import axios from 'axios';
import lodash from './lodash.custom.min.js';

const Util = () => { };

Util.prototype = {
    constructor: Util,
    hairlineWidth: StyleSheet.hairlineWidth,
    prefixUri: 'http://wx.17u.cn/'
};

Util.prototype.debounce = lodash.debounce;

Util.prototype.isNull = function (value) {
    return value === null;
};

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

Util.prototype.get = (uri, data) => {
    return new Promise((resolve, reject) => {
        axios.get(_.prefixUri + uri, {
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

const _ = new Util();

export default _;
