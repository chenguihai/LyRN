import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    Platform
} from 'react-native';

import CardView from 'react-native-cardview';
import ItemComponent from '../item';

export default class ContactComponent extends Component {

    static contextTypes = {
        navigation: PropTypes.object
    }

    static propTypes = {
    }

    addPeople() {
        return (
            <View style={{
                flexDirection: 'row'
            }}>
                <View style={{
                    width: 18,
                    height: 18
                }}>
                    <View
                        style={{
                            width: 1,
                            height: 18,
                            backgroundColor: '#3C6',
                            position: 'absolute',
                            left: 8.5
                        }}
                    ></View>
                    <View
                        style={{
                            width: 18,
                            height: 1,
                            backgroundColor: '#3C6',
                            position: 'absolute',
                            top: 8.5
                        }}
                    ></View>
                </View>
                <Text style={{
                    color: '#3C6',
                    fontSize: 16,
                    lineHeight: 16,
                    marginLeft: 15,
                    marginTop: Platform.OS === 'ios' ? 2 : 0
                }}>
                    添加/修改乘客
                </Text>
            </View>
        );
    }

    _renderInput() {
        return (
            <View style={{
                flex: 1
            }}>
                <TextInput
                    underlineColorAndroid="transparent"
                    placeholder="用于接收购票信息"
                    placeholderTextColor="#CCC"
                    maxLength={13}
                    style={{
                        padding: 0,
                        fontSize: 16,
                        lineHeight: 16,
                        height: 44,
                        marginLeft: 15
                    }}
                />
            </View>
        );
    }

    _renderContent() {
        return (
            <View>
                <ItemComponent
                    data = {{
                        list: [
                            {  
                                onPress: () => {
                                    this.context.navigation.navigate('Contact');
                                },
                                title: this.addPeople()
                            },
                            {
                                title: '手机号码',
                                after: this._renderInput(),
                                linkIcon: false
                            }
                        ]
                    }}
                />
            </View>
        );
    }

    render() {
        if (Platform.OS === 'ios') {
            return this._renderContent();
        }
        
        return (
            <CardView
                cardElevation={1}
                cardMaxElevation={1}
                cornerRadius={3}
                style={styles.container}
            >
                {this._renderContent()}   
            </CardView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        marginLeft: 5,
        marginRight: 0,
    }
});
