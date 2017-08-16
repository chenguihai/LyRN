import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Text,
    StyleSheet,
    Dimensions
} from 'react-native';
import _ from '../../util';

export default class CityListBlock extends Component {

    static defaultProps = {
        data: []
    }

    static propTypes = {
        data: PropTypes.array
    }

    render() {
        const { width } = Dimensions.get('window');
        const { data } = this.props;
        const innerWidth = width - 30;

        
        return (
            <View style={styles.list_block}>
                <View>
                    {
                        data.map((item, key) => 
                            <View key={key} style={[
                                styles.item, 
                                { width: innerWidth * 0.3 }
                            ]}>
                                <Text>{item.Name}</Text>
                            </View>
                        )
                    }
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    'list_block': {
        backgroundColor: '#FFF',
        paddingTop: 6,
        paddingBottom: 6,
        paddingLeft: 15,
        paddingRight: 15
    },
    list: {

    },
    item: {
        height: 35,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: '#dedfe0',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5
    }
});
