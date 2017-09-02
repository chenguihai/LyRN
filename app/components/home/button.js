import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    StyleSheet,
    View,
    Text,
    Dimensions
} from 'react-native';

export default class ButtonComponent extends Component {

    static propTypes = {
        title: PropTypes.string
    }

    shouldComponentUpdate() {
        return false;
    }

    render() {
        const { width } = Dimensions.get('window');
        const { title } = this.props;
        
        return (
            <View style={{ alignItems: 'center', 
                marginTop: 13, 
                marginBottom: 13 }}>
                <View style={[
                    styles.search_button, 
                    { width: width * 0.86, 
                        position: 'relative' }
                ]}>
                    <Text style={styles.button_txt}>{title}</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    'search_button': {
        justifyContent: 'center',
        alignItems: 'center',
        height: 45,
        // marginTop: 13,
        // marginBottom: 13,
        backgroundColor: '#28c54d',
        borderRadius: 22.5
    },
    'button_txt': {
        color: '#FFF',
        fontSize: 18,
        fontWeight: '700'
    }
});
