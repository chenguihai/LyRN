import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    Dimensions,
    StyleSheet
} from 'react-native';

const themeColor = "#3C6";

export default class HeaderComponent extends Component {

    layout(e) {
        console.log(e);
    }

    render() {
        const { width } = Dimensions.get('window');
        const btnWidth = (width - 12) * 0.28;

        const imageScale = 12 / 22;

        return (
            <View style={styles.header}>
                <View style={[
                    styles.btn,
                    {
                        width: btnWidth
                    }
                ]}>
                    <Image
                        source={require('../../images/arrow_left.png')}
                        resizeMode="cover"
                        onLayout={({ nativeEvent: e }) => this.layout(e)}
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
                <View>

                </View>
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
