import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Text,
    Image,
    StyleSheet
} from 'react-native';

import HeaderComponent from '../components/train_list/header';
import ListComponent from '../components/train_list/list';

// import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { getTrainList } from '../actions/http';

class Header extends Component {

    static propTypes = {
        from: PropTypes.object,
        to: PropTypes.object,
        modalVisible: PropTypes.bool
    }

    render() {
        const { from, to } = this.props;

        return (
            <View style={styles.header}>
                <View>
                    {/* <Image 
                        source={}
                    /> */}
                </View>
                <View style={{
                    flexDirection: 'row'
                }}>
                    <Text>{from.Name}</Text>
                    <Image
                        source={require('../images/title_1.png')}
                        style={{
                            width: 10,
                            height: 10
                        }}
                    />
                    <Text>{to.Name}</Text>
                </View>
            </View>
        );
    }
}

export default class TrainListPage extends Component {

    static navigationOptions = ({ navigation }) => {
        const { from, to } = navigation.state.params;

        return {
            headerTitle: <Header from={from} to={to} />
        };
    }

    static propTypes = {
        navigation: PropTypes.object
    }

    state = {
        data: {
            trainlist: [],
            tcount: 0
        }
    }

    componentWillMount() {
        const { navigation: { state: { params: { tripTime } } } } = this.props;

        this.requestTrainList(tripTime);        
    }

    requestTrainList = (date) => {
        const { navigation: { state: { params: { from, to } } } } = this.props;

        getTrainList({
            params: {
                para: { 
                    'from': from.Name,
                    'to': to.Name, 
                    'oby': '0', 
                    date,
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

    render() {
        const { navigation } = this.props;
        const { data } = this.state;

        return (
            <View style={styles.container}>
                <HeaderComponent navigation={navigation} getTrainList={this.requestTrainList} />
                <ListComponent data={data} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f1f3f6'
    },
});
