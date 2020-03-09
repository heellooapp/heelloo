import { StyleSheet } from 'react-native'

// import { COLORS } from '../../styles'

export default StyleSheet.create({
    image: {
        borderRadius: 10,
        width: 60,
        height: 60,
    },
    item: {
        marginLeft: 20,
        marginRight: 20,
        marginTop: 20,
        flexDirection: 'row'
    },
    row1: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-between',
    },
    row2: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    row3: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    honor: {
        borderRadius: 25,
        width: 50,
        height: 50,
    },
    col1: {
        flex: 1,
        paddingLeft: 20,

    },
    smallTitle: {
        color: '#2a8aed',
        fontWeight: 'bold',
    },
    bigTitle: {
        color: '#353A3E',
        fontSize: 18,
        fontWeight: '500',

    },
    description: {
        color: 'grey',
        fontSize: 16,
        marginTop: 10,
    },
    from: {
        color: 'grey',
        marginRight: 10,
        fontStyle: 'italic'
    },
    fromName: {
        color: '#2E86C1',
        fontStyle: 'italic',
    },
    time: {
        color: 'grey',
        fontSize: 16,
    }

});