import * as React from 'react';
import Modal from "react-native-modal";
import {
    Text,
    View,
    StyleSheet,
    FlatList,
    Image,
} from 'react-native';
import { Button } from '../../../common';
import { TouchableOpacity } from 'react-native-gesture-handler';
import badges from '../../../utils/constants';

const Card = ({ item, index, click }) => {
    return (
        <View style={local.item}>
            <TouchableOpacity onPress={() => click(item.id)}>
                <Image style={local.image} source={item.image} />
            </TouchableOpacity>
            <Text style={local.title}>{item.name}</Text>
        </View >
    )
}
export default function SelectBadge({ show, close, selectBadge }) {
    return (
        <Modal
            testID={'modal'}
            isVisible={show}
            onSwipeComplete={close}
            swipeDirection={['up', 'left', 'right', 'down']}
            style={local.modal}>
            <View style={local.content}>
                <Text style={local.contentTitle}>Select Badge 👋</Text>

                <FlatList
                    style={{
                        margin: 5,
                    }}
                    columnWrapperStyle={{ justifyContent: 'space-between', marginBottom: 20 }}

                    data={badges}
                    numColumns={2}
                    keyExtractor={(item, index) => item.id}
                    renderItem={({ item, index }) => <Card item={item} click={selectBadge} />}
                />
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
        padding: 22,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
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
        width: 60,
        height: 60,
    },
    title: {
        color: 'grey',
        marginTop: 5,
    },
    item: {
        flexDirection: 'column',
        // alignItems: 'center',
        alignItems: 'center',
        width: '50%',
    }
});