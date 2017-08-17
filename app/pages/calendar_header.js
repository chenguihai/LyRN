import React, { Component } from 'react';
import { 
    View,
    Text,
    StyleSheet,
    Dimensions
} from 'react-native';

export default class CalendarHeaderPage extends Component {

    weekList = [
        '日', 
        '一', 
        '二', 
        '三', 
        '四', 
        '五', 
        '六'
    ];

    _renderWeekHeader(list, item, index) {
        return (
            <View style={[
                styles.item,
                { width: this.innerWidth / 7 }
            ]} key={index}>
                <Text style={[
                    styles.item_txt,
                    { color: index === 0 || index === list.length - 1 ? '#04be02' : '#FFF' }
                ]}>{item}</Text>
            </View>
        );
    }

    render() {
        const { width } = Dimensions.get('window');

        this.innerWidth = width * 0.9;
        
        return (
            <View style={[
                styles.list,
                { paddingLeft: width * 0.05, 
                    paddingRight: width * 0.05 }
            ]}>
                {this.weekList.map(this._renderWeekHeader.bind(this, this.weekList))}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    list: {
        flexDirection: 'row',
        backgroundColor: '#556a72'
    },
    item: {
        height: 33,
        justifyContent: 'center',
        alignItems: 'center'
    },
    'item_txt': {
        fontSize: 14
    }
});
