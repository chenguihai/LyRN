import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Platform
} from 'react-native';

import CardView from 'react-native-cardview';

export default class ItemComponent extends Component {

    static defaultProps = {
        data: {}
    }

    static propTypes = {
        data: PropTypes.object
    }

    _renderItem(list, item, index) {
        const { style = {}, title = '', after = '', linkIcon = true, onPress } = item;

        // list数组长度大于0并且不是最后一个元素
        const borderStyle = list.length > 0 && index < list.length - 1 ? {
            borderBottomColor: '#DCDCDC',
            borderBottomWidth: StyleSheet.hairlineWidth
        } : {
        };

        // 如果是第一个元素添加上边radius,最后一个元素添加下边radius
        let borderRadiusStyle;

        if (list.length > 0) {
            borderRadiusStyle = index === 0 ? {
                borderTopLeftRadius: 3,
                borderTopRightRadius: 3
            } : index === list.length - 1 ? {
                borderBottomLeftRadius: 3, 
                borderBottomRightRadius: 3
            } : {};
        } else {
            borderRadiusStyle = { borderRadius: 3 };
        }

        return (
            <TouchableOpacity 
                key={index} 
                style={[
                    styles.item_content,
                    {
                        paddingRight: linkIcon ? 0 : 5
                    },
                    borderStyle,
                    borderRadiusStyle,
                    style
                ]}
                onPress={() => {
                    requestAnimationFrame(() => {
                        if (onPress) {
                            onPress();
                        }
                    });
                }}
            >
                {title.props 
                    ? title 
                    : <Text style={styles.item_title}>{title}</Text>
                }
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center'
                }}>
                    {after.props 
                        ? after
                        : <Text style={styles.item_after}>{after}</Text>
                    }
                    {
                        linkIcon && <View style={styles.icon}></View>
                    }
                </View>
            </TouchableOpacity>
        );
    }

    _renderList() {
        const { data: { list } } = this.props;

        return list.map(this._renderItem.bind(this, list));
    }

    render() {
        const { data: { boxShadow = true, style = {} } } = this.props;
        
        if (Platform.OS === 'ios') {
            return (
                <View style={[
                    styles.wrapper,
                    style,
                    boxShadow ? styles.shadowStyle : {}
                ]}>
                    {this._renderList()}
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
            </CardView>
            
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
        marginTop: 10,
        marginLeft: 5, 
        marginRight: 5
    },
    shadowStyle: {
        shadowColor: '#E6E6E6',
        shadowOffset: { width: 1, 
            height: 1 },
        shadowOpacity: 1,
        shadowRadius: 3
    },
    'item_content': {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 15,
        height: 44,
        backgroundColor: '#FFF'
    },
    'item_title': {
        fontSize: 16,
        lineHeight: 16,
        color: '#666'
    },
    'item_after': {
        fontSize: 16,
        color: '#CCC',
        marginRight: 8
    },
    icon: {
        width: 8,
        height: 8,
        marginRight: 11,
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
