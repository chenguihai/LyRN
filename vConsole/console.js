/* eslint-disable no-alert,no-debugger */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, View, Text, StyleSheet } from 'react-native';

class ConsolePanel extends Component {

    static propTypes = {
        modalVisible: PropTypes.bool
    };

    state = {}

    printLog = (type, logs) => {
        let line = '';

        logs.forEach((item) => {
            line += item;
        });
        this.setState({
            logsMsg: line
        });
    }   
    
    render() {
        const { logsMsg } = this.state;
        const { modalVisible = true } = this.props;

        return (
            <Modal
                animationType={'slide'}
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => { 
                    alert('Modal has been closed.');
                }}
            >
                <View style={styles.container}>
                    <View style={styles.panel}>
                        <Text>{logsMsg}</Text>
                    </View>
                </View>
            </Modal>
        );
    }
}

global.consoleBak = {};

const _setUp = () => {
    global.consoleBak.log = global.console.log;
    global.console.log = () => {
        // console.info(arguments[0]);
    };
};

export default {
    setUp() {
        // _setUp();
        global.console.log = () => {
            console.log.bind(console, 'console prefix:', arguments);
        };

        return ConsolePanel;
    }
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,.6)'
    }
});
