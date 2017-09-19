import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    Dimensions,
    StyleSheet,
    TouchableOpacity,
    Animated
} from 'react-native';

const themeColor = '#3C6';

export default class HeaderComponent extends Component {

    state = {
        left: new Animated.Value(-1)
    }

    selectPrevDay = () => {
        Animated.timing(this.state.transform, {
            toValue: 0,
            duration: 2000
        }).start();
    }

    selectNextDay() {
        Animated.timing(this.state.transform, {
            toValue: 1,
            duration: 2000
        }).start();
    }

    render() {
        const { width } = Dimensions.get('window');
        const btnWidth = (width - 12) * 0.28;

        const imageScale = 12 / 22;

        return (
            <View style={styles.header}>
                <TouchableOpacity
                    handlePress={this.selectPrevDay}
                >
                    <View style={[
                        styles.btn,
                        {
                            width: btnWidth
                        }
                    ]}>
                        <Image
                            source={require('../../images/arrow_left.png')}
                            resizeMode="cover"
                            style={
                                {
                                    width: 6,
                                    height: 6 / imageScale,
                                    marginRight: 6
                                }
                            }
                        />
                        <Text style={styles.btn_txt}>
                        前一天
                        </Text>
                    </View>
                </TouchableOpacity>
                <View style={{
                    width: 150,
                    height: 32,
                    backgroundColor: '#f4f4f4',
                    flexDirection: 'row'
                }}>
                    <View style={{
                        width: 298,
                        height: 32,
                        flexDirection: 'row',
                        alignItems: 'center',
                        position: 'absolute',
                        left: this.state.left.interpolate({
                            inputRange: [
                                -1, 
                                0, 
                                1
                            ],
                            outputRange: [
                                -98, 
                                0, 
                                98
                            ]
                        })
                    }}>
                        <View style={{ flex: 1, 
                            alignItems: 'center', 
                            justifyContent: 'center' }}>
                            <Text style={{
                                fontSize: 14
                            }}>09月19日 周二</Text>
                        </View>
                        <View style={{ flex: 1, 
                            alignItems: 'center', 
                            justifyContent: 'center' }}>
                            <Text style={{
                                fontSize: 14
                            }}>09月20日 周三</Text>
                        </View>
                        <View style={{ flex: 1, 
                            alignItems: 'center', 
                            justifyContent: 'center' }}>
                            <Text style={{
                                fontSize: 14
                            }}>09月21日 周四</Text>
                        </View>
                    </View> 
                    <View style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'absolute',
                        width: 50,
                        zIndex: 100,
                        backgroundColor: '#f4f4f4',
                        right: 0,
                        height: 32
                    }}>
                        <Text>日历</Text>
                    </View>
                </View>
                <TouchableOpacity
                    handlePress={this.selectNextDay}
                >
                    <View style={[
                        styles.btn,
                        {
                            width: btnWidth,
                            justifyContent: 'flex-end',
                        }
                    ]}>
                        <Text style={styles.btn_txt}>
                        后一天
                        </Text>
                        <Image
                            style={
                                {
                                    width: 6,
                                    height: 6 / imageScale,
                                    marginLeft: 6
                                }
                            }
                            source={require('../../images/arrow_right.png')}
                        />
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    'header': {
        paddingTop: 12.5,
        paddingBottom: 12.5,
        paddingRight: 6,
        paddingLeft: 6,
        backgroundColor: '#FFF',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    'btn': {
        height: 24,
        flexDirection: 'row',
        alignItems: 'center'
    },
    'btn_txt': {
        fontSize: 14,
        color: themeColor
    }
});
