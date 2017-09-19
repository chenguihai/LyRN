import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    FlatList,
    Dimensions,
    Text,
    View
} from 'react-native';

import ItemComponent from './item';

import { getTrainList } from '../../actions/http';

// import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// import { TrainAction } from '../../actions';

class ListComponent extends Component {

    static propTypes = {
        navigation: PropTypes.object,
        trainList: PropTypes.object,
        length: PropTypes.number,
        // changeLength: PropTypes.func,
        // isShowSeatsModal: PropTypes.func
    }

    state = {
        length: 10
    }

    componentWillMount() {
        const { navigation } = this.props;
        const { from, to, tripTime } = navigation.state.params;

        getTrainList({
            params: {
                para: { 
                    'from': from.Name,
                    'to': to.Name, 
                    'oby': '0', 
                    'date': tripTime,
                    'platId': 501, 
                    'requestType': 4,
                    'headct': 1, 
                    'headus': 1, 
                    'headver': '2.14.0.2', 
                    'isstu': false, 
                    'headtime': Number(new Date()) 
                }
            },
            callback: ({ data }) => {
                this.setState({ data });
            }
        });
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
        const { length, data } = this.state;
        // this.props.changeLength();

        if (length < data.trainlist.length) { 
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
        const { data = {}, length } = this.state;
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

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(ListComponent);
