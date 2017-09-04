import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    FlatList
} from 'react-native';

import ItemComponent from './item';

export default class ListComponent extends Component {

    static propTypes = {
        data: PropTypes.array
    }

    _renderItem = (data) => {
        return <ItemComponent cardScale={this.cardScale} lineScale={this.lineScale} data={data} />;
    }

    keyExtractor(item) {
        return item.trainno + item.usedtimeps;
    }

    render() {
        const { data } = this.props;

        return (
            <FlatList
                refreshing={true}
                initialNumToRender={6}
                data={data}
                keyExtractor={this.keyExtractor}
                renderItem={this._renderItem}
                getItemLayout={(data, index) => ({ 
                    length: 103,
                    offset: 103 * index,
                    index 
                })}
            />
        );
    }
}
