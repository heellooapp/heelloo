import * as React from 'react';
import Modal from "react-native-modal";
import {
    Text,
    View,
    StyleSheet,
    FlatList,
    Image,
    ScrollView,
    TextInput,
} from 'react-native';
import { Button, Search } from '../../../common';
import { TouchableOpacity } from 'react-native-gesture-handler';
import badges from '../../../utils/constants';
import images from '../../../images';
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { default as Icon2 } from 'react-native-vector-icons/Ionicons';

const showAvatar = (profileImg) => {
    if (profileImg) {
        return <FastImage source={{ uri: profileImg }} style={local.image} />;
    } else {
        return <Image source={images.avatar} style={local.image} />;
    }
}
const Card = ({ item, index, click }) => {
    return (
        <TouchableOpacity onPress={() => { click(item) }}>

            <View style={local.item}>
                {showAvatar(item.profileImg)}
                <Text style={local.title}>{item.firstName}</Text>
                <Text style={local.title}>{item.lastname}</Text>

            </View>
        </TouchableOpacity>

    )
}
export default function SelectUser({ show, close, selectUser, users }) {
    const [value, setValue] = React.useState('');
    const [filterUsers, setFilterUsers] = React.useState([]);
    const handleChange = txt => {
        setValue(txt);
    };
    React.useEffect(() => {
        let text = value.toString().toLowerCase();
        let results = users.filter((n, i) => {
            let note = n.firstName.toString().toLowerCase();
            return note.match(text);
        });
        setFilterUsers(results);
    }, [value]);

    return (
        <Modal
            testID={'modal'}
            isVisible={show}
            // onSwipeComplete={close}
            // swipeDirection={['up', 'left', 'right', 'down']}
            style={local.modal}>

            <View style={local.content}>
                <View style={local.searchGroup}>
                    <Icon2 name="ios-search" size={20} style={{ marginRight: 20, alignSelf: 'center' }} />
                    <TextInput
                        type="text"
                        style={local.search}
                        autoCorrect={false}
                        placeholder="Search"
                        autoFocus
                        underlineColorAndroid="transparent"
                        value={"Search"}
                        value={value}
                        onChangeText={handleChange}
                        autoCapitalize="words"
                    />
                    <Icon name="filter-variant" size={20} style={{ alignSelf: 'center' }} />

                </View>
                <ScrollView style={{ alignSelf: 'stretch', padding: 22 }}>
                    <FlatList
                        style={{ margin: 5, }}
                        data={filterUsers}
                        numColumns={1}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index }) => <Card item={item} click={selectUser} />}
                    />
                </ScrollView>
                <View style={local.finishButton}>
                    <Button onPress={close}>Finish</Button>
                </View>
            </View>
        </Modal>
    );
}

const local = StyleSheet.create({
    chooseMember: {
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 5,
        paddingBottom: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderColor: '#D1D4D7',
        borderWidth: 1,
    },
    modal: {
        justifyContent: 'flex-end',
        margin: 0,
    },
    content: {
        backgroundColor: 'white',
        // padding: 22,
        paddingTop: 0,
        paddingBottom: 22,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        height: '70%',
        flexDirection: 'column',
        borderColor: 'rgba(0, 0, 0, 0.1)',
    },
    contentTitle: {
        fontSize: 20,
        marginBottom: 12,
        color: '#2a8aed'
    },
    finishButton: {
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 5,
        paddingBottom: 5,
        height: 50,
        width: '90%',
    },
    image: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 20,
    },
    title: {
        color: 'black',
        marginRight: 10,

    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    search: {
        color: '#A9A9A9',
        height: 50,
        fontFamily: 'Montserrat-Light',
        // justifyContent: 'flex-start',
        fontSize: 15,
        flex: 1,
    },
    searchGroup: {
        borderRadius: 4,
        paddingLeft: 22,
        paddingRight: 22,
        backgroundColor: '#F5F5F5',
        alignSelf: 'stretch',
        flexDirection: 'row',
    }
});