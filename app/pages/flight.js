import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class FlightPage extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>机票页面</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({ container: { flex: 1, }, });
