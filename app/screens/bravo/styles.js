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
        // justifyContent: 'space-between',
        // alignSelf:'center',
        marginTop: 8,
    },
    row2: {
        marginTop: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    row3: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    honor: {
        borderRadius: 10,
        width: 44,
        height: 44,
        // padding: 10,
        backgroundColor: 'white',
        // marginRight: 10,
    },
    col1: {
        flex: 1,
        paddingLeft: 20,
    },
    smallTitle: {
        color: '#2a8aed',
        // fontWeight: 'bold',
        // textTransform: 'uppercase',
        fontFamily: 'Montserrat-Medium',

    },
    bigTitle: {
        color: '#353A3E',
        fontSize: 12,
        fontWeight: '500',
        marginTop: 8,
        // maxWidth: 150,
        // alignSelf:'stretch',
        fontFamily: 'Montserrat-Medium',
    },
    description: {
        color: 'grey',
        fontSize: 12,
        // marginTop: 2,
    },
    from: {
        color: 'grey',
        marginRight: 5,
        fontStyle: 'italic'
    },
    fromName: {
        color: '#2E86C1',
        fontStyle: 'italic',
    },
    time: {
        color: 'grey',
        fontSize: 12,
    }

});