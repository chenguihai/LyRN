/* eslint-disable no-debugger */
import React, { Component } from 'react';
import { 
    View,
    Text,
    TextInput,  
    StyleSheet,
    Image,
    Dimensions,
    TouchableOpacity
} from 'react-native';

import _ from '../../util';

const searchIconWidth = 36;
const searchImageWidth = 28;
const searchCancelWidth = 65;

export default class SearchComponent extends Component {

    state = {
        offsetWidth: 16,
        isFocus: false, // 输入框是否聚焦
        hasContent: false // 输入框是否有内容
    }

    handleFocus = () => {
        this.setState({
            offsetWidth: searchCancelWidth + 8,
            isFocus: true
        });
    }

    handleBlur = () => {
        this.setState({
            offsetWidth: 16,
            isFocus: false
        });
    }

    setHasContent = (field, val) => {
        this.setState({
            [field]: val
        });
    }

    handleChangeText = (text) => {
        const { hasContent } = this.state;

        text = text.trim();
        if (!hasContent && text.length > 0) {
            this.setHasContent('hasContent', true);
        }

        if (hasContent && text.length === 0) {
            this.setHasContent('hasContent', false);
        }
    }

    cleanInput = () => {
        this._searchInput.clear();
        this.setHasContent('hasContent', false);
    }

    cancelInput = () => {
        const { hasContent } = this.state;

        if (hasContent) {
            this.cleanInput();
        } 
        this._searchInput.blur();
    }

    render() {
        const { offsetWidth, isFocus, hasContent } = this.state;
        const { width } = Dimensions.get('window');
        const innerWidth = width - offsetWidth;

        
        return (
            <View style={[styles.search_wrap]}>
                {/* 搜索输入框开始 */}
                <View style={[
                    styles.search_inner,
                    { width: innerWidth, 
                        marginLeft: 8 }
                ]}>
                    {/* 搜索图标开始 */}
                    <View style={[styles.search_icon]}>
                        <View>
                            <Image style={styles.search_image} source={require('../../images/search.png')} />
                        </View>
                    </View>
                    {/* 搜索图标结束 */}
                    <TextInput
                        ref={(ref) => { 
                            this._searchInput = ref;
                        }}
                        underlineColorAndroid="transparent"
                        onFocus={this.handleFocus}
                        onBlur={this.handleBlur}
                        placeholder="北京/beijing/bj"
                        maxLength={30}
                        onChangeText={_.debounce(this.handleChangeText.bind(this), 500)}
                        style={[
                            styles.search_input, 
                            { width: innerWidth - searchIconWidth }
                        ]}
                    />
                    {
                        hasContent 
                            ? <TouchableOpacity
                                style={styles.search_clear_wrap}
                                onPress={this.cleanInput}
                            >
                                <Image style={styles.search_clear} source={require('../../images/clear.png')} />
                            </TouchableOpacity>
                            : null
                    }
                </View>
                {/* 搜索输入框结束 */}
                {/* 取消按钮开始 */}
                {
                    isFocus 
                        ? <TouchableOpacity
                            style={styles.search_cancel_wrap}
                            onPress={this.cancelInput}
                        >
                            <View
                                style={[styles.search_cancel]}
                            >
                                <Text style={{ color: '#2d2d2d' }}>
                                        取消
                                </Text>
                            </View>
                        </TouchableOpacity>
                            
                        : null
                }
                {/* 取消按钮结束 */}
                    
            </View>
        );
    }
}

const styles = StyleSheet.create({ 
    'search_wrap': {
        height: 56,
        justifyContent: 'center',
        backgroundColor: '#ededed'
    },
    'search_inner': {
        flexDirection: 'row',
        height: 40,
        backgroundColor: '#FFF',
        borderRadius: 5
    },
    'search_icon': {
        width: searchIconWidth,
        justifyContent: 'center',
        alignItems: 'center'
    },
    'search_image': {
        width: searchImageWidth,
        height: 28
    },
    'search_input': {
        padding: 0,
        fontSize: 14,
        height: 40
    },
    'search_clear_wrap': {
        position: 'absolute',
        right: 10,
        width: 20,
        height: 40,
        alignItems: 'center'
    },
    'search_clear': {
        width: 20,
        height: 20,
        top: 10
    },
    'search_cancel_wrap': {
        position: 'absolute',
        height: 40,
        width: searchCancelWidth,
        right: 0
    },
    'search_cancel': {
        width: searchCancelWidth,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
