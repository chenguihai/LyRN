import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    FlatList,
    Dimensions,
    Text,
    View
} from 'react-native';

import ItemComponent from './item';

import { connect } from 'react-redux';

export default class ListComponent extends Component {

    static propTypes = {
        data: PropTypes.object,
        trainList: PropTypes.object,
        length: PropTypes.number,
    }

    state = {
        length: 10
    }
    
    _renderItem = (data) => {
        return <ItemComponent 
            cardScale={this.cardScale} 
            viewWidth={this.width} 
            lineScale={this.lineScale} 
            data={data}
        />;
    }

    keyExtractor(item) {
        return item.trainno + item.usedtimeps;
    }

    onEndReached = () => {
        const { data: { trainlist } } = this.props;
        const { length } = this.state;

        if (length < trainlist.length) { 
            this.setState({
                length: length + 10
            }); 
        }
    }

    _footer() {
        return <View style={{ height: 0 }}><Text>这是尾部组件</Text></View>;
    }

    render() {
        const { width } = Dimensions.get('window');
        const { length } = this.state;
        const { data } = this.props;
        const { tcount = 0, trainlist = [] } = data;

        if (tcount === 0) {
            return null;
        }

        this.width = width;
        this.cardScale = 31 / 21; // 身份证
        this.lineScale = 100 / 7;
        
        return (       
            <FlatList
                onEndReached={this.onEndReached}
                onEndReachedThreshold={0.9}
                ListFooterComponent={this._footer()}
                initialNumToRender={10}
                data={trainlist.slice(0, length)}
                keyExtractor={this.keyExtractor}
                renderItem={this._renderItem}
                getItemLayout={(data, index) => ({
                    length: 99,
                    offset: 99 * index,
                    index
                })}
            />
        );
    }
}
