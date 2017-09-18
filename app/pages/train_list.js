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

class TrainListPage extends Component {

    static navigationOptions = ({ navigation }) => {
        const { from, to } = navigation.state.params;

        return {
            headerTitle: <Header from={from} to={to} />
        };
    }

    static propTypes = {
        navigation: PropTypes.object
    }

    render() {

        return (
            <View style={styles.container}>
                <HeaderComponent />
                <ListComponent navigation={this.props.navigation} />
            </View>
        );
    }
}

const mapStateToProps = (state) => ({
    // modalVisible: state.Train.modalVisible
});

const mapDispatchToProps = (dispatch) => ({
    // getTrainList: bindActionCreators(TrainAction.getTrainList, dispatch) // 获取站点时刻表
});

export default connect(mapStateToProps, mapDispatchToProps)(TrainListPage);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f1f3f6'
    }
});
