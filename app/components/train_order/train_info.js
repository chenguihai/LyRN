import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Text,
    Image,
    Dimensions,
    StyleSheet
} from 'react-native';

import date from '../../util/date';

export default class TrainInfoComponent extends Component {

    static propTypes = {
        data: PropTypes.object
    }

    state = {}

    componentWillMount() {
        let eDate;
        const { fmtimeps, totimeps, usedtimeps } = this.props.data;

        Storage.load({ key: 'bDate' }).then((bDate) => {
            const usedDayNum = Math.floor(usedtimeps / 60 / 24);
            // 判断所花时间是否小于一天

            eDate = bDate;

            if (usedDayNum < 1 && totimeps < fmtimeps) { 
                eDate = Number(new Date(bDate)) + 8.64e7;
            }

            if (usedDayNum >= 1) {
                eDate = Number(new Date(bDate)) + usedDayNum * 8.64e7;
            }

            this.setState({
                bDate: date.covertToMonthAndDay(bDate),
                eDate: date.covertToMonthAndDay(eDate) // 到站时间
            });
        });
    }

    render() {
        const { width } = Dimensions.get('window');
        const { bDate = {}, eDate = {} } = this.state;
        const { data } = this.props;
        const { 
            fmcity, tocity, fmtime, totime, trainno, usedtime, selectedSeats: { cn, price } 
        } = data;

        return (
            <View style={styles.container}>
                <Image 
                    source={require('../../images/trainBookTop.jpg')}
                    style={{
                        position: 'absolute',
                        height: 138,
                        width,
                        top: 0,
                        left: 0
                    }}
                    resizeMode="cover"
                />
                <View style={[
                    styles.item,
                    {
                        alignItems: 'flex-end',
                        paddingRight: 6
                    }
                ]}>
                    <Text style={styles.station}>
                        {fmcity}
                    </Text>
                    <Text style={styles.stationTime}>
                        {fmtime}
                    </Text>
                    <View style={styles.stationDateContainer}>
                        <Text style={styles.stationDate}>
                            {bDate.date}
                        </Text>
                        <Text style={[
                            styles.stationDate,
                            styles.stationDate1
                        ]}>
                            {bDate.weekDay}
                        </Text>
                    </View>
                    <Text style={styles.trainNo}>
                        {trainno}
                    </Text>
                </View>
                <View style={[
                    styles.item,
                    {
                        alignItems: 'center'
                    }
                ]}>
                    <Text style={styles.usedtime}>
                        {usedtime}
                    </Text>
                    <View style={[
                        styles.stopInfo,
                        {
                            marginTop: 5
                        }
                    ]}>
                        <View style={styles.stopInfoLine}>
                        </View>
                        <View style={{
                            borderWidth: StyleSheet.hairlineWidth,
                            borderColor: '#FFF'
                        }}>
                            <Text style={{
                                fontSize: 14,
                                lineHeight: 14,
                                color: '#FFF',
                                paddingBottom: 2
                            }}>
                                经停信息
                            </Text>
                        </View>
                        <View style={styles.stopInfoLine}>
                        </View>
                    </View>
                    <Text style={styles.price}>
                        ¥{price} 
                    </Text>
                </View>
                <View style={[
                    styles.item,
                    {
                        alignItems: 'flex-start',
                        paddingLeft: 6
                    }
                ]}>
                    <Text style={styles.station}>
                        {tocity}
                    </Text>
                    <Text style={styles.stationTime}>
                        {totime}
                    </Text>
                    <View style={styles.stationDateContainer}>
                        <Text style={styles.stationDate}>
                            {eDate.date}
                        </Text>
                        <Text style={[
                            styles.stationDate,
                            styles.stationDate1
                        ]}>
                            {eDate.weekDay}
                        </Text>
                    </View>
                    <Text style={styles.trainNo}>
                        {cn}
                    </Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingTop: 15,
        paddingBottom: 15,
        height: 138,
        backgroundColor: 'transparent'
    },
    item: {
        flex: 1
    },
    station: {
        fontSize: 17,
        lineHeight: 17,
        paddingBottom: 10,
        color: '#FFF'
    },
    stationTime: {
        fontSize: 30,
        lineHeight: 30,
        paddingBottom: 12,
        color: '#FFF'
    },
    stationDateContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        marginBottom: 12
    },
    stationDate: {
        fontSize: 13,
        lineHeight: 13,
        color: '#FFF'
    },
    stationDate1: {
        marginLeft: 10
    },
    trainNo: {
        fontSize: 14,
        lineHeight: 14,
        color: '#FFF'
    },
    usedtime: {
        fontSize: 14,
        lineHeight: 14,
        color: '#FFF'
    },
    stopInfo: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    stopInfoLine: {
        width: 20,
        height: StyleSheet.hairlineWidth,
        backgroundColor: '#FFF'
    },
    price: {
        fontSize: 14,
        lineHeight: 14,
        color: '#FFF',
        position: 'absolute',
        bottom: 0
    }
});
