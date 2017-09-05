import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    FlatList
} from 'react-native';

import ItemComponent from './item';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { TrainAction } from '../../actions';

class ListComponent extends Component {

    static propTypes = {
        trainList: PropTypes.object,
        length: PropTypes.number,
        changeLength: PropTypes.func
    }

    // loadMore = false;

    _renderItem = (data) => {
        return <ItemComponent cardScale={this.cardScale} lineScale={this.lineScale} data={data} />;
    }

    keyExtractor(item) {
        return item.trainno + item.usedtimeps;
    }

    componentDidUpdate() {
        // this.loadMore = false;
    }

    onEndReached = () => {
        // console.log(this._ref);
        this.props.changeLength();
    }

    handleScroll = ({ nativeEvent: e }) => {
        // const { contentOffset, contentSize, layoutMeasurement } = e;

        // if (!this.loadMore && contentOffset.y + layoutMeasurement.height + 50 > contentSize.height) {
        //     this.props.changeLength();
        //     this.loadMore = true;
        // }
    }

    render() {
        const { trainList, length } = this.props;
        const { data = {} } = trainList;
        const { tcount = 0, trainlist = [] } = data;

        if (tcount === 0) {
            return null;
        }

        this.cardScale = 31 / 21;
        this.lineScale = 100 / 7;
        
        return (
            <FlatList
                // ref={(ref) => { 
                //    this._ref = ref;
                // }}
                // onScroll={this.handleScroll}
                onEndReached={this.onEndReached}
                onEndReachedThreshold={0.9}
                // refreshing={true}
                initialNumToRender={6}
                data={trainlist.slice(0, length)}
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

const mapStateToProps = (state) => ({
    trainList: state.Train.trainList,
    length: state.Train.length
});

const mapDispatchToProps = (dispatch) => ({
    getTrainList: bindActionCreators(TrainAction.getTrainList, dispatch), // 获取站点时刻表
    changeLength: bindActionCreators(TrainAction.changeLength, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ListComponent);
