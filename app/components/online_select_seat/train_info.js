import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Text,
    Image,
    StyleSheet
} from 'react-native';

import TrainDecorator from '../train_decorator';

@TrainDecorator
export default class TrainInfoComponent extends Component {
    static propTypes = {
        data: PropTypes.object
    }

    state = {
        bDate: {},
        eDate: {}
    }

    componentWillMount() {
        this.covertToMonthAnDay();
    }

    render() {
        const { fmcity, fmtime, tocity, totime, trainno } = this.props.data;
        const { bDate, eDate } = this.state;

        return (
            <View style={{
                height: 100,
                flexDirection: 'row'
            }}>
                <Image 
                    source={require('../../images/ticketsInfo.png')}
                    resizeMode="cover"
                    style={{
                        height: 100,
                        position: 'absolute',
                        top: 0,
                        left: 0
                    }}
                />
                <View style={[
                    styles.item,
                    styles.side,
                    {
                        alignItems: 'flex-start'
                    }
                ]}>
                    <Text style={styles.city}>
                        {fmcity}
                    </Text>
                    <Text style={styles.time}>
                        {fmtime}
                    </Text>
                    <View style={styles.date}>
                        <Text style={styles.datetime}>
                            {bDate.dateS}
                        </Text>
                        <Text style={[
                            styles.datetime,
                            styles.weekDay
                        ]}>
                            {bDate.weekDay}
                        </Text>
                    </View>
                </View>
                <View style={[
                    styles.item,
                    styles.center,
                ]}>
                    <Text style={styles.trainno}>
                        {trainno}次
                    </Text>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}>
                        <View style={styles.line}>
                        </View>
                        <View style={{
                            width: 58,
                            height: 17,
                            borderColor: '#FFF',
                            borderWidth: StyleSheet.hairlineWidth,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <Text style={{
                                fontSize: 12,
                                color: '#FFF'
                            }}>经停信息</Text>
                        </View>
                        <View style={[
                            styles.line,
                            {
                                alignItems: 'flex-end'
                            }
                        ]}>
                            <View style={{
                                width: 6,
                                height: StyleSheet.hairlineWidth,
                                backgroundColor: '#FFF',
                                position: 'relative',
                                top: -1,
                                transform: [
                                    {
                                        rotateZ: '-135deg'
                                    }
                                ]
                            }}>

                            </View>
                        </View>
                    </View>
                </View>
                <View style={[
                    styles.item,
                    styles.side,
                    {
                        alignItems: 'flex-end'
                    }
                ]}>
                    <Text style={styles.city}>
                        {tocity}
                    </Text>
                    <Text style={styles.time}>
                        {totime}
                    </Text>
                    <View style={styles.date}>
                        <Text style={styles.datetime}>
                            {eDate.dateS}
                        </Text>
                        <Text style={[
                            styles.datetime,
                            styles.weekDay
                        ]}>
                            {bDate.weekDay}
                        </Text>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    item: {
        flex: 1,
        backgroundColor: 'transparent'
    },
    side: {
        paddingTop: 15,
        paddingLeft: 20,
        paddingRight: 20
    },
    center: {
        alignItems: 'center',
        paddingTop: 30,
    },
    city: {
        fontSize: 14,
        lineHeight: 14,
        color: '#FFF',
        marginBottom: 9,
    },
    time: {
        fontSize: 30,
        lineHeight: 30,
        color: '#FFF',
        marginBottom: 6,
    },
    date: {
        flexDirection: 'row'
    },
    datetime: {
        color: '#FFF',
        fontSize: 12,
        lineHeight: 12
    },
    weekDay: {
        marginLeft: 6
    },
    trainno: {
        color: '#FFF',
        fontSize: 12,
        marginBottom: 6
    },
    line: {
        width: 16,
        height: StyleSheet.hairlineWidth,
        backgroundColor: '#FFF'
    }
});
