/* eslint-disable no-multi-assign,id-length,no-empty-function */

import { StatusBar, Dimensions, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');

const Util = () => {};

Util.prototype = {
    constructor: Util,
    os: Platform.OS,
    clientWidth: width,
    clientHeight: height,
    statusBarHeight: StatusBar.currentHeight,
    innerHeight: Util.clientHeight - Util.statusBarHeight
};

const _ = new Util();

export default _;
