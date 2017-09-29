import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Platform
} from 'react-native';

import _ from '../util';

import CardView from 'react-native-cardview';

export default class ItemComponent extends Component {

    static defaultProps = {
        title: '',
        after: '',
        boxShadow: true
    }

    static propTypes = {
        title: PropTypes.oneOfType([
            PropTypes.string, 
            PropTypes.element
        ]),
        after: PropTypes.oneOfType([
            PropTypes.string, 
            PropTypes.element
        ]),
        boxShadow: PropTypes.bool,
        style: PropTypes.object,
        onPress: PropTypes.func
    }

    handlePress = () => {
        const { onPress } = this.props;

        if (onPress) {
            onPress();
        }
    }

    _renderContent() {
        const { boxShadow, title, after, style } = this.props;

        return (
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={this.handlePress} 
                style={[
                    styles.content,
                    {
                        marginTop: boxShadow ? 0 : 10,
                        marginBottom: boxShadow && Platform.OS !== 'ios' ? 4 : 0,
                        marginLeft: boxShadow ? 0 : 5
                    },
                    style
                ]}
            >
                {_.isString(title)
                    ? <Text style={styles.title}>{title}</Text> : title
                }
                {_.isString(after)
                    ? <View style={styles.after}>
                        <View style={{
                            marginRight: 5
                        }}>
                            <Text style={{
                                fontSize: 16,
                                lineHeight: 16,
                                color: '#CCC'
                            }}>{after}</Text> 
                        </View>
                        <View style={styles.icon}></View>
                    </View>
                    : after
                }
            </TouchableOpacity>
        );
    }

    render() {
        const { boxShadow } = this.props;
        
        if (!boxShadow) {
            return this._renderContent();
        }

        if (Platform.OS === 'ios') {
            return (
                <View style={styles.wrapper}>
                    {this._renderContent()}
                </View>
            );
        }
        
        return (
            <CardView
                cardElevation={1}
                cardMaxElevation={1}
                cornerRadius={3}
                style={[styles.wrapper]}
            >
                {this._renderContent()}
            </CardView>
            
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
        marginTop: 10,
        marginLeft: 5, 
        shadowColor: '#E6E6E6',
        shadowOffset: { width: 1, 
            height: 1 },
        shadowOpacity: 1,
        shadowRadius: 3
    },
    content: {
        flexDirection: 'row',
        paddingLeft: 15,
        paddingRight: 11,
        height: 44,
        marginRight: 5,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#FFF',
        borderRadius: 3
    },
    title: {
        fontSize: 16,
        lineHeight: 16,
        color: '#666'
    },
    after: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    icon: {
        width: 8,
        height: 8,
        borderRightWidth: StyleSheet.hairlineWidth,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: '#BCBBB8',
        transform: [
            {
                rotateZ: '-45deg'
            }
        ]
    }
});
