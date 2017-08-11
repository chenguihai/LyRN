/* eslint-disable no-multi-assign,id-length,no-empty-function */

import { StyleSheet, Platform } from 'react-native';


const Util = () => {};

Util.prototype = {
    constructor: Util,
    os: Platform.OS,
    hairlineWidth: StyleSheet.hairlineWidth
};

const _ = new Util();

export default _;
