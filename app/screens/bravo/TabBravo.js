import * as React from 'react';
import { View, FlatList, StyleSheet, Dimensions, Text, Image } from 'react-native';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import firestore from '@react-native-firebase/firestore'
import FastImage from 'react-native-fast-image';
import moment from "moment";
import st from './styles';
import badges from '../../utils/constants';
import { Spinner } from '../../common';
const renderItem = ({ item, index }) => {
    let ago = '';
    if (item.date) {
        let dateToFormat = (new Date(item.date._seconds * 1000));
        ago = moment(dateToFormat).fromNow();
    }
    return (
        <View style={st.item}>
            {item.touser ? <FastImage style={st.image} source={{ uri: item.touser.profileImg }} />
                : <View style={st.image}></View>}
            <View style={st.col1}>
                <View style={st.row1}>
                    <View style={{ flex: 5 }}>
                        <Text style={st.smallTitle}>{badges[item.type_icon - 1].name}</Text>
                        <Text style={st.bigTitle}>{item.title}</Text>
                    </View>
                    <View style={{ flex: 1.5 }}>
                        <Image style={st.honor} source={badges[item.type_icon - 1].image} />
                    </View>

                </View>
                <Text style={st.description}>{item.description}</Text>
                <View style={st.row2}>
                    <View style={st.row3}>
                        <Text style={st.from}>From:</Text>
                        <Text style={st.fromName}>{item.fromuser && item.fromuser.firstName}</Text>
                    </View>
                    <Text style={st.time}>{ago}</Text>
                </View>
            </View>
        </View>
    )
}
const AllRoute = (props) => {

    const [data, setData] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    const renderItemCall = React.useCallback(({ item, index }) => renderItem({ item, index }));

    React.useEffect(() => {

        firestore().collection("bravo").orderBy('date', 'desc').get().then(snapshot => {
            let messages = [];
            snapshot.forEach(doc => {
                let d = doc.data();
                d.touser = props.users[d.to];
                d.fromuser = props.users[d.from];
                messages.push(d);
            });
            setData(messages);
            setLoading(false)

        });
        // return function () { unsubscribe(); };
    }, [data]);
    if (loading) {
        return <Spinner />
    }
    return (
        <View style={styles.scene}>
            {data.length > 0 ?
                <FlatList
                    style={styles.flat}
                    data={data}
                    renderItem={renderItemCall}
                    keyExtractor={(item, index) => index.toString()}
                /> :
                <Text style={styles.notfound}>No Bravo found</Text>
            }
        </View>
    );
};

const ReceiveRoute = (props) => {
    const [data, setData] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    const renderItemCall = React.useCallback(({ item, index }) => renderItem({ item, index }));

    React.useEffect(() => {

        firestore().collection("bravo").where('to', '==', props.currentUser.uid).orderBy('date', 'desc')
            .get().then(snapshot => {
                let messages = [];
                snapshot.forEach(doc => {
                    let d = doc.data();
                    d.touser = props.users[d.to];
                    d.fromuser = props.users[d.from];
                    messages.push(d);
                });
                setData(messages);
                setLoading(false)

            });
    }, [data]);
    if (loading) {
        return <Spinner />
    }
    return (
        <View style={styles.scene}>
            {data.length > 0 ?
                <FlatList
                    style={styles.flat}
                    data={data}
                    renderItem={renderItemCall}
                    keyExtractor={(item, index) => index.toString()}
                /> :
                <Text style={styles.notfound}>No Bravo found</Text>
            }
        </View>
    );
};

const MeRoute = (props) => {
    const [data, setData] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    const renderItemCall = React.useCallback(({ item, index }) => renderItem({ item, index }));

    React.useEffect(() => {
        firestore().collection("bravo")
            .where('from', '==', props.currentUser.uid)
            .orderBy('date', 'desc')
            .get().then(snapshot => {
                let messages = [];
                snapshot.forEach(doc => {
                    let d = doc.data();
                    d.touser = props.users[d.to];
                    d.fromuser = props.users[d.from];
                    messages.push(d);
                });
                setData(messages);
                setLoading(false)
            });
    }, [data]);

    if (loading) {
        return <Spinner />
    }
    return (
        <View style={styles.scene}>
            {data.length > 0 ?
                <FlatList
                    style={styles.flat}
                    data={data}
                    renderItem={renderItemCall}
                    keyExtractor={(item, index) => index.toString()}
                /> :
                <Text style={styles.notfound}>No Bravo found</Text>
            }
        </View>
    );
};

const initialLayout = { width: Dimensions.get('window').width };

const renderTabBar = props => (
    <TabBar
        {...props}
        indicatorStyle={{ backgroundColor: '#2a8aed' }}
        activeColor='#2a8aed'
        inactiveColor='grey'
        style={{ backgroundColor: 'white' }}
    />
);

export default function TabBravo(props) {
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'k1', title: 'All' },
        { key: 'k2', title: 'Receive' },
        { key: 'k3', title: 'Me' },
    ]);

    renderScene = ({ route }) => {
        switch (route.key) {
            case 'k1':
                return <AllRoute users={props.users} currentUser={props.currentUser} />;
            case 'k2':
                return <ReceiveRoute users={props.users} currentUser={props.currentUser} />;
            default:
                return <MeRoute users={props.users} currentUser={props.currentUser} />;
        };
    }

    return (
        <TabView
            renderTabBar={renderTabBar}
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={initialLayout}
        />
    );
}

const styles = StyleSheet.create({
    scene: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F0F0F0',
    },
    flat: {
        flex: 1,
        width: '100%',
    },
    notfound: {
        alignSelf: 'center',
    }
});