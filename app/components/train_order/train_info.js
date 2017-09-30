import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Text,
    Image,
    Dimensions,
    StyleSheet
} from 'react-native';

import TrainDecorator from '../train_decorator';

@TrainDecorator
class TrainInfoComponent extends Component {

    static propTypes = {
        data: PropTypes.object
    }

    state = {}

    componentWillMount() {
        this.covertToMonthAnDay();
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
                        height: scaleSize(138),
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
                        paddingRight: scaleSize(6)
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
                            marginTop: scaleSize(5)
                        }
                    ]}>
                        <View style={styles.stopInfoLine}>
                        </View>
                        <View style={{
                            borderWidth: StyleSheet.hairlineWidth,
                            borderColor: '#FFF'
                        }}>
                            <Text style={{
                                fontSize: setSpText(14),
                                lineHeight: setSpText(14),
                                color: '#FFF',
                                // paddingBottom: scaleSize(2)
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
                        paddingLeft: scaleSize(6)
                    }
                ]}>
                    <Text style={styles.station}
                    >
                        {tocity}
                    </Text>
                    <Text style={styles.stationTime} onLayout={({ nativeEvent: e }) => { 
                        console.log(e);
                    }}>
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
        paddingTop: scaleSize(15),
        paddingBottom: scaleSize(15),
        height: scaleSize(138),
        backgroundColor: 'transparent'
    },
    item: {
        flex: 1
    },
    station: {
        fontSize: setSpText(17),
        lineHeight: setSpText(17),
        paddingBottom: scaleSize(10),
        color: '#FFF', 
        borderColor: '#000',
        borderWidth: 1
    },
    stationTime: {
        fontSize: setSpText(30),
        lineHeight: setSpText(30),
        paddingBottom: scaleSize(8),
        color: '#FFF',
    },
    stationDateContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        marginBottom: scaleSize(12)
    },
    stationDate: {
        fontSize: setSpText(13),
        lineHeight: setSpText(13),
        color: '#FFF'
    },
    stationDate1: {
        marginLeft: scaleSize(10)
    },
    trainNo: {
        fontSize: setSpText(14),
        lineHeight: setSpText(14),
        color: '#FFF'
    },
    usedtime: {
        fontSize: setSpText(14),
        lineHeight: setSpText(14),
        color: '#FFF'
    },
    stopInfo: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    stopInfoLine: {
        width: scaleSize(20),
        height: StyleSheet.hairlineWidth,
        backgroundColor: '#FFF'
    },
    price: {
        fontSize: setSpText(14),
        lineHeight: setSpText(14),
        color: '#FFF',
        position: 'absolute',
        bottom: 0
    }
});

export default TrainInfoComponent;
