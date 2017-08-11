import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class BusPage extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>汽车票页面</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({ container: { flex: 1, }, });
