import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    FlatList,
    Dimensions
} from 'react-native';

import ItemComponent from './item';

export default class ListComponent extends Component {

    static propTypes = {
        data: PropTypes.object,
        length: PropTypes.number,
    }

    state = {
        length: 10
    }

    shouldComponentUpdate(nextProps, nextState) {
        return this.props.data !== nextProps.data || this.state.length !== nextState.length;
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.data.trainlist !== this.props.data.trainlist) {
            this.setState({ length: 10 });
        }
    }
    
    _renderItem = (data) => {
        return <ItemComponent 
            viewWidth={this.width} 
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

    render() {
        const { width } = Dimensions.get('window');
        const { length } = this.state;
        const { data } = this.props;
        const { tcount = 0, trainlist = [] } = data;

        if (tcount === 0) {
            return null;
        }

        this.width = width;
        
        return (       
            <FlatList
                onEndReached={this.onEndReached}
                onEndReachedThreshold={0.9}
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
