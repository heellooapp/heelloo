import * as React from 'react';
import { View, FlatList, StyleSheet, Dimensions, Text, Image } from 'react-native';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import firestore from '@react-native-firebase/firestore'
import FastImage from 'react-native-fast-image';
import moment from "moment";
import st from './styles';

const renderItem = ({ item, index }) => {
    let ago = '';
    if (item.date) {
        let dateToFormat = (new Date(item.date._seconds * 1000));
        ago = moment(dateToFormat).fromNow();
    }
    return (
        <View style={st.item}>
            {item.touser && <FastImage style={st.image} source={{ uri: item.touser.profileImg }} />}
            <View style={st.col1}>
                <View style={st.row1}>
                    <View>
                        <Text style={st.smallTitle}>{item.type}</Text>
                        <Text style={st.bigTitle}>{item.title}</Text>
                    </View>
                    <Image style={st.honor} source={require('../../images/honor.png')} />
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

    const renderItemCall = React.useCallback(({ item, index }) => renderItem({ item, index }));

    React.useEffect(() => {

        firestore().collection("bravo").get().then(snapshot => {
            let messages = [];
            snapshot.forEach(doc => {
                let d = doc.data();
                d.touser = props.users[d.to];
                d.fromuser = props.users[d.from];
                // console.log(d);
                messages.push(d);
                // props.users
            });
            setData(messages);
        });

        // Specify how to clean up after this effect:
        // return function () { unsubscribe(); };
    }, [data]);

    return (
        <View style={[styles.scene, { backgroundColor: '#F0F0F0' }]}>
            <FlatList
                data={data}
                renderItem={renderItemCall}
                keyExtractor={item => item.id}
            />
        </View>
    );
};

const ReceiveRoute = () => (
    <View style={[styles.scene, { backgroundColor: '#F0F0F0' }]} />
);

const MeRoute = () => (
    <View style={[styles.scene, { backgroundColor: '#F0F0F0' }]} />
);

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

    // const renderScene = SceneMap({
    //     first: <AllRoute users={props.users} />,
    //     second: ReceiveRoute,
    //     third: MeRoute,
    // });
    renderScene = ({ route }) => {
        switch (route.key) {
            case 'k1':
                return <AllRoute users={props.users} />;
            case 'k2':
                return <ReceiveRoute users={props.users} />;
            default:
                return <MeRoute users={props.users} />;
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
    },
});