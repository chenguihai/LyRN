/* eslint-disable no-alert */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, View, Text, StyleSheet } from 'react-native';
import _ from './util';

export default class ConsolePanel extends Component {

    static propTypes = {
        modalVisible: PropTypes.bool
    };
    
    render() {
        console.log(_);

        const { modalVisible = true } = this.props;

        return (
            <Modal
                animationType={'slide'}
                transparent={true}
                style={{ backgroundColor: 'rgba(0,0,0,.6)' }}
                visible={modalVisible}
                onRequestClose={() => { 
                    alert('Modal has been closed.');
                }}
            >
                <View style={styles.container}>
                    <View style={styles.panel}>
                        <Text>console控制面板</Text>
                    </View>
                </View>
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 8
    },
    panel: {
        // Flex: 1
    }
});
