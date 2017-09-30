import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Platform
} from 'react-native';

export default class ItemComponent extends Component {

    static defaultProps = {
        data: {}
    }

    static propTypes = {
        data: PropTypes.object
    }

    _renderItem(list, item, index) {
        const { style = {}, title = '', titleStyle = {}, after = '', afterStyle = {}, linkIcon = true, onPress } = item;

        // 如果list元素大于1,第一个元素添加上边radius,最后一个元素添加下边radius
        let borderRadiusStyle;

        if (list.length > 1) {
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
            <View key={index} >
                <TouchableOpacity 
                    style={[
                        styles.item_content,
                        {
                            paddingRight: linkIcon ? 0 : 5
                        },
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
                        : <Text style={[
                            styles.item_title,
                            titleStyle
                        ]}>{title}</Text>
                    }
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}>
                        {after.props 
                            ? after
                            : <Text style={[
                                styles.item_after,
                                afterStyle
                            ]}>{after}</Text>
                        }
                        {
                            linkIcon && <View style={styles.icon}></View>
                        }
                    </View>
                </TouchableOpacity>
                {list.length > 1 && index < list.length - 1 && <View style={{
                    height: StyleSheet.hairlineWidth,
                    backgroundColor: '#eee'
                }}></View>}
            </View>
        );
    }

    _renderList() {
        const { data: { list } } = this.props;

        return list.map(this._renderItem.bind(this, list));
    }

    render() {
        const { data: { style = {} } } = this.props;
        
        return (
            <View style={[
                styles.wrapper,
                style
            ]}>
                {this._renderList()}
            </View>
            
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
        marginTop: scaleSize(10),
        marginLeft: scaleSize(5), 
        marginRight: scaleSize(5),
        padding: scaleSize(0),
        borderRadius: 3
    },
    'item_content': {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: scaleSize(15),
        backgroundColor: '#FFF',
        ...Platform.select({
            ios: {
                height: scaleSize(44)
            },
            android: {
                height: scaleSize(50),
            }
        })
    },
    'item_title': {
        fontSize: setSpText(16),
        // lineHeight: setSpText(16),
        color: '#666'
    },
    'item_after': {
        fontSize: setSpText(14),
        marginRight: scaleSize(8), 
        color: '#CCC',
    },
    icon: {
        width: scaleSize(8),
        height: scaleSize(8),
        marginRight: scaleSize(21),
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
