import React, { Component } from 'react';
import { Platform, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { MapView } from 'expo';
import { Button, Card, Icon } from 'react-native-elements';
import * as actions from '../actions';

import Swipe from '../components/Swipe';

class DeckScreen extends Component {
    static navigationOptions = {
        title: 'Jobs',
        tabBarIcon: ({ tintColor }) => {
            return <Icon name="description" size={30} color={tintColor} />;
          }
        }

    renderCard(job) {
        const initialRegion = {
            longitude: job.longitude,
            latitude: job.latitude,
            latitudeDelta: 0.045,
            longitudeDelta: 0.02
        };

        return (
            <Card 
                title={job.jobtitle}
                containerStyle={{ height: 500 }}
            >
                <View style={{ height: 300 }}>
                    <MapView
                        scrollEnabled={false}
                        style={{ flex: 1 }}
                        cacheEnabled={Platform.OS === 'android' }
                        initialRegion={initialRegion}
                    >
                        <MapView.Marker coordinate={initialRegion} />
                    </MapView>
                </View>
                <View style={styles.detailWrapper}>
                    <Text>{job.company}</Text>
                    <Text>{job.formattedRelativeTime}</Text>
                </View>
                <Text>
                    {job.snippet.replace(/<\/*b>/g, '')}
                </Text>
            </Card>
        );
    }

    renderNoMoreCards = () => {
        return (
            <Card title="No More Jobs Found">
                <Button 
                    title="Back to Map"
                    large
                    icon={{ name: 'my-location' }}
                    backgroundColor="#03A9F4"
                    onPress={() => this.props.navigation.navigate('map')}
                />
            </Card>
        );
    }
    
    render() {
        return (
            <View style={{ marginTop: 20 }}>
                <Swipe 
                    data={this.props.jobs}
                    renderCard={this.renderCard}
                    renderNoMoreCards={this.renderNoMoreCards}
                    onSwipeRight={job => this.props.likeJob(job)}
                    keyProp="jobkey"
                />
            </View>
        );
    }
}

const styles = {
    detailWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 10
    }
};

function mapStateToProps ({ jobs }) {
    return { jobs: jobs.results };
}

export default connect(mapStateToProps, actions)(DeckScreen);