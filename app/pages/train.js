import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    View,
    ScrollView,
    StyleSheet,
} from 'react-native';

import BannerComponent from '../components/home/banner';
import NoticeComponent from '../components/home/notice';
import QueryCityComponent from '../components/home/query_city';
import QueryDateComponent from '../components/home/query_date';
import CheckboxComponent from '../components/home/checkbox';
import ButtonComponent from '../components/home/button';
import OperationComponent from '../components/home/operation';
import PubOperationComponent from '../components/home/pub_operation';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { TrainAction } from '../actions';

class TrainPage extends Component {

    static propTypes = {
        getBanner: PropTypes.func,
        getNotice: PropTypes.func,
        getTab: PropTypes.func,
        Train: PropTypes.object,
        navigation: PropTypes.object,
        TrainfromCity: PropTypes.object,
        TraintoCity: PropTypes.object,
        TraintripTime: PropTypes.number,
        TraintripTimeDes: PropTypes.string
    }

    state = {
    }

    componentWillMount() {
        this.props.getBanner();
        this.props.getNotice();
        this.props.getTab();
    }

    handleCheckbox = (field, val) => {
        this.setState({
            [field]: !val
        });
    }

    selectCity(key) {
        const { navigation } = this.props;

        navigation.navigate('City', {
            key,
            routeName: navigation.state.routeName
        });
    }

    selectDate = () => {
        const { navigation } = this.props;

        navigation.navigate('Calendar', {
            routeName: navigation.state.routeName
        });
    }

    render() {
        const { Train, TrainfromCity, TraintoCity, TraintripTime, TraintripTimeDes } = this.props;
        const { data1, notice, data2 } = Train;
        const { Adverts = { List: [] }, Icons = { List: [] } } = data1;
        const { OperationIcon = [] } = data2;

        return (
            <ScrollView style={styles.wrap}>
                <View style={styles.container}>
                    {/* Notice start  */}
                    {notice.IsShow && <NoticeComponent data={notice} />}
                    {/* Notice end  */}
                    {/* Banner start  */}
                    {Adverts.List.length > 0 && <BannerComponent data={Adverts.List} />}
                    {/* Banner end  */}
                    {/* 查询城市开始  */}
                    <QueryCityComponent
                        selectFromCity={() => this.selectCity('fromCity')}
                        selectToCity={() => this.selectCity('toCity')}
                        fromCity={TrainfromCity.Name}
                        toCity={TraintoCity.Name}
                    />
                    {/* 查询城市结束  */}
                    {/* 查询日期开始  */}
                    <QueryDateComponent
                        handlePress={this.selectDate}
                        tripTime={TraintripTime}
                        tripTimeDesc={TraintripTimeDes}
                    />
                    {/* 查询日期结束  */}
                    <View style={styles.checkbox}>
                        <CheckboxComponent title="学生票" />
                        <CheckboxComponent title="高铁/动车" />
                    </View>
                    {/* 查询按钮开始  */}
                    <ButtonComponent title="火车票查询" />
                    {/* 查询按钮结束  */}
                    {Icons.List.length > 0 && <OperationComponent data={Icons.List} />}
                </View>
                {OperationIcon.length > 0 && <PubOperationComponent data={OperationIcon} />}
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    wrap: {
        flex: 1,
        backgroundColor: '#f3f4f8',
    },
    container: {
        backgroundColor: '#FFF',
    },
    'checkbox': {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginRight: 15,
        marginLeft: 15,
        // Height: 18,
        paddingTop: 15,
        paddingBottom: 18
    },
});

const mapStateToProps = (state) => ({
    Train: state.Train,
    TrainfromCity: state.City.TrainfromCity,
    TraintoCity: state.City.TraintoCity,
    TraintripTime: state.Date.TraintripTime,
    TraintripTimeDes: state.Date.TraintripTimeDes
});

const mapDispatchToProps = (dispatch) => ({
    getBanner: bindActionCreators(TrainAction.getBanner, dispatch),
    getNotice: bindActionCreators(TrainAction.getNotice, dispatch),
    getTab: bindActionCreators(TrainAction.getTab, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(TrainPage);
