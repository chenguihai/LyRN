const _Date = () => {};

_Date.prototype = {
    constructor: _Date
};

/**
 * @description 重置时间
 * @param {date} date 需要重置的时间
 * @returns {date}
 */

_Date.prototype.resetTime = function (date) {
    date = new Date(date);
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);

    return Number(date);
};

/**
 * @description 获取今天凌晨0点0时0分的时间戳(毫秒为单位)
 */

_Date.prototype.getToday = function () {
    return date.resetTime(new Date());
};

/**
 * @description 获取明天凌晨0点0时0分的时间戳(毫秒为单位)
 */

_Date.prototype.getTomorrow = function () {
    return date.getToday() + 8.64e7;
};

/**
 * @description 获取后天凌晨0点0时0分的时间戳(毫秒为单位)
 */

_Date.prototype.getAfterTomorrow = function () {
    return date.getTomorrow() + 8.64e7;
};

_Date.prototype.format = function (timeStamp) {
    const
        date = new Date(timeStamp),
        year = date.getFullYear(),
        month = date.getMonth() + 1,
        day = date.getDate();

    return `${year}-${month > 9 ? month : `0${month}`}-${day > 9 ? day : `0${day}`}`;
};

const date = new _Date();

export default date;
