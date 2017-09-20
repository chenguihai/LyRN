import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Text,
    Image,
    StyleSheet
} from 'react-native';

import DateHeaderComponent from '../components/train_list/date-header';
import ListComponent from '../components/train_list/list';
import SfzMaskComponent from '../components/train_list/sfz-mask';
import LoadingComponent from '../components/train_list/loading';

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
    }

    componentWillMount() {
        const { navigation: { state: { params: { tripTime } } } } = this.props;

        this.requestTrainList(tripTime);        
    }

    requestTrainList = (date) => {
        const { navigation: { state: { params: { from, to } } } } = this.props;

        this.setState({
            data: {
                trainlist: [],
                tcount: 0
            }
        });
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
                <DateHeaderComponent navigation={navigation} getTrainList={this.requestTrainList} />
                <ListComponent data={data} />
                <SfzMaskComponent />
                {data.tcount === 0 ? <LoadingComponent /> : null}
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
