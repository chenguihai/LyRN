import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    View,
    StyleSheet
} from 'react-native';

import HeaderComponent from '../components/train_list/header';
import ListComponent from '../components/train_list/list';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { TrainAction } from '../actions';

import _ from '../util';

class TrainListPage extends Component {

    static propTypes = {
        navigation: PropTypes.object,
        getTrainList: PropTypes.func
    }

    componentWillMount() {
        const { navigation, getTrainList } = this.props;
        const { from, to, tripTime } = navigation.state.params;

        getTrainList(from.Name, to.Name, _.format(tripTime));
    }

    render() {

        return (
            <View style={styles.container}>
                <HeaderComponent />
                <ListComponent /> 
            </View>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    getTrainList: bindActionCreators(TrainAction.getTrainList, dispatch) // 获取站点时刻表
});

export default connect(() => ({}), mapDispatchToProps)(TrainListPage);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f1f3f6'
    }
});
