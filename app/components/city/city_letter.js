import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    InteractionManager
} from 'react-native';
import _ from '../../util';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { CityAction } from '../../actions';

class CityLetterComponent extends Component {

    static propTypes = {
        getCityList: PropTypes.func
    }

    state = {
        letterList: []
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            this.setState({
                letterList: _.chunk(this._generateAllLetter(), 6)
            });
        });
    }

    _generateAllLetter() {
        const letterList = [];

        for (let i = 65; i < 91; i++) { // eslint-disable-line no-plusplus
            letterList.push(String.fromCharCode(i));
        }

        return letterList;
    }

    _renderItem(rowData, blockData, index) {

        return (
            <TouchableOpacity
                style={[
                    styles.item,
                    {
                        width: this.innerWidth * 0.12,
                        // 如果为每一行的最后一个块,将marginRight设置为0
                        marginRight: index != rowData.length - 1 ? this.innerWidth * 0.28 / 5 : 0 // eslint-disable-line
                    }
                ]}
                key={index}
                onPress={() => {
                    this.props.getCityList(blockData);
                }}
            >
                <Text style={styles.item_txt}>{blockData}</Text>
            </TouchableOpacity>
        );
    }

    _renderRow = (rowData, rowIndex) => {
        return (
            <View style={[
                styles.row,
                {
                    // 如果不是第一行设置marginTop为0
                    marginTop: rowIndex !== 0 ? this.innerWidth * 0.25 / 5 : 0 // eslint-disable-line
                }
            ]} key={rowIndex}>
                {
                    rowData.map(this._renderItem.bind(this, rowData))
                }
            </View>
        );
    }

    render() {
        const { letterList } = this.state;
        const { width } = Dimensions.get('window');

        this.gutter = width * 0.1 / 2;
        this.innerWidth = width * 0.9;

        return (
            <View style={[
                styles.container,
                {
                    paddingTop: this.gutter,
                    paddingBottom: this.gutter,
                    paddingLeft: this.gutter,
                    paddingRight: this.gutter
                }
            ]}>
                {
                    letterList.map(this._renderRow)
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    'container': {
        backgroundColor: '#FFF',
        marginBottom: 15
    },
    row: {
        flexDirection: 'row'
    },
    item: {
        height: 35,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: '#dedfe0',
        borderRadius: 5
    },
    'item_txt': {
        fontSize: 14,
        color: '#2d2d2d'
    }
});

const mapStateToProps = (state) => ({
    City: state.City
});

const mapDispatchToProps = (dispatch) => ({
    getCityList: bindActionCreators(CityAction.getCityList, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(CityLetterComponent);
