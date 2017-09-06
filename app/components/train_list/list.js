import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    FlatList,
    Dimensions
} from 'react-native';

import ItemComponent from './item';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { TrainAction } from '../../actions';

class ListComponent extends Component {

    static propTypes = {
        trainList: PropTypes.object,
        length: PropTypes.number,
        changeLength: PropTypes.func,
        isShowSeatsModal: PropTypes.func
    }

    handlePress(seatsMap) {
        alert(JSON.stringify(seatsMap));
    }

    _renderItem = (data) => {
        return <ItemComponent 
            cardScale={this.cardScale} 
            viewWidth={this.width} 
            lineScale={this.lineScale} 
            data={data} 
            handlePress={this.handlePress}
        />;
    }

    keyExtractor(item) {
        return item.trainno + item.usedtimeps;
    }

    onEndReached = () => {
        this.props.changeLength();
    }

    render() {
        const { width } = Dimensions.get('window');
        const { trainList, length } = this.props;
        const { data = {} } = trainList;
        const { tcount = 0, trainlist = [] } = data;

        if (tcount === 0) {
            return null;
        }

        this.width = width;
        this.cardScale = 31 / 21;
        this.lineScale = 100 / 7;

        return (
            <FlatList
                onEndReached={this.onEndReached}
                onEndReachedThreshold={0.9}
                initialNumToRender={6}
                data={trainlist.slice(0, length)}
                keyExtractor={this.keyExtractor}
                renderItem={this._renderItem}
                getItemLayout={(data, index) => ({
                    length: 98.5,
                    offset: 98.5 * index,
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
    isShowSeatsModal: bindActionCreators(TrainAction.isShowSeatsModal, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ListComponent);
