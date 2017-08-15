import React, { Component } from 'react';
import { 
    View, 
    Text,
    TextInput,
    StyleSheet
} from 'react-native';

export default class CityPage extends Component {
    render() {
        return (
            <View style={styles.wrap}>
                <View style={{
                    borderWidth: StyleSheet.hairlineWidth,
                    borderColor: '#FFF'
                }}>
                    <TextInput 
                        underlineColorAndroid="transparent"
                        style={{
                            padding: 0
                        }} 
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({ 
    wrap: { 
        flex: 1, 
        backgroundColor: '#f3f4f8',
    },
});
