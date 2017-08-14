import React, { Component } from 'react';
import { 
    View, 
    Text,
    StyleSheet
} from 'react-native';

export default class CityPage extends Component {
    render() {
        return (
            <View style={styles.wrap}>
                <Text>城市选择</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({ 
    wrap: { 
        flex: 1, 
        backgroundColor: '#f3f4f8',
    },
    container: {
        backgroundColor: '#FFF',
    },
});
