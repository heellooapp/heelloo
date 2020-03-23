import React, { Component } from 'react';
import {
    Text,
    View,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Spinner, Button, BackBtn, Structure } from '../../common';
import { firebase } from '../../config';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { newContactStyles } from '../../styles';
import { SelectBadge, SelectUser } from './modals';
import badges from '../../utils/constants';
const styles = newContactStyles;

class AddBravo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: 1,
            sortedContacts: [],
            isAdmin: false,
            show: true,
            badge: 0,
            user: null,
            title: '',
            description: '',
        };
        this.structureRef = this.getRef().child('structures');
        this.usersRef = this.getRef().child('users');
    }

    getRef() {
        return firebase.database().ref();
    }

    loadFinish = () => {
        this.setState(prevState => {
            return {
                loading: prevState.loading - 1
            }
        })
    }

    setUsersArray(val) {
        usersArray = Object.keys(val).map(key => {
            return { ...val[key], key: val[key].uid };
        });
        return usersArray;
    }

    sortContactsByName(val) {
        return val.sort(function (a, b) {
            return b.firstName > a.firstName ? -1 : b.firstName < a.firstName ? 1 : 0;
        });
    }

    componentDidMount() {

        this.structureRef.once('value').then((snapshot) => {
            this.loadFinish();
        });

        this.usersRef.once('value').then((snapshot) => {
            val = snapshot.val() || {};
            usersArray = this.setUsersArray(val);
            sortedContacts = this.sortContactsByName(usersArray);
            this.setState({ sortedContacts: sortedContacts });
            this.loadFinish();
        });
    }




    isValid() {


        if (this.state.user == null) {
            this.setState({ error: 'Choose user' });
            return false;
        }

        if (this.state.badge == 0) {
            this.setState({ error: 'Choose badge' });
            return false;
        }

        if (this.state.title.length < 5) {
            this.setState({ error: "Title is too short" });
            return false;
        }
        if (this.state.description.length < 5) {
            this.setState({ error: "Description is too short" });
            return false;
        }

        return true;
    }



    createBadge = () => {
        if (this.isValid()) {
            this.setState({ loading: 1 });
            currentUser = firebase.auth().currentUser;
            const { title, description, user, badge } = this.state;
            firebase.firestore().collection("bravo").add({
                date: new Date(),
                description,
                title,
                from: currentUser.uid,
                to: user.uid,
                type: badges[badge - 1].name,
                type_icon: badge,
            }).then(() => {
                this.setState({ loading: 0 });
                this.props.navigation.goBack();
            }).catch(() => {
                console.error("Error writing document: ", error);
                this.setState({ loading: 0 });
            });
        }
    }

    header() {
        const { viewStyle, titleNavbar } = styles;
        return (
            <View style={viewStyle}>
                <BackBtn />
                <Text style={titleNavbar}>ADD BRAVO</Text>
                <View style={{ width: 25, height: 25 }} />
            </View>
        );
    }



    renderField({ label, name, multiline }) {
        const { fieldContainer, inputContainer, labelStyle, inputStyle } = styles;

        return (
            <View style={fieldContainer}>
                <View style={inputContainer}>
                    <Text style={labelStyle}>{label}</Text>
                    <TextInput
                        style={inputStyle}
                        autoCorrect={false}
                        underlineColorAndroid="transparent"
                        onChangeText={value => this.setState({ [name]: value })}
                        multiline={multiline}
                        value={this.state[name]}
                    />
                </View>
            </View>
        );
    }
    renderMember = () => {
        const { user } = this.state;
        return (
            <TouchableOpacity onPress={() => this.setState({ show1: true })}>
                <View style={local.chooseMember}>
                    <Text>{user ? user.firstName : 'Choose Member'}</Text>
                    <Icon name='ios-add' size={30} />
                </View>
            </TouchableOpacity>
        );
    }
    renderBadge = () => {
        const { badge } = this.state;
        return (
            <View style={local.badgeGroup}>
                <TouchableOpacity onPress={() => this.setState({ show2: true })}>
                    <Image
                        style={local.badgeImage}
                        source={badge == 0 ?
                            require('../../images/selectbadge.png') :
                            badges[badge - 1].image} />
                </TouchableOpacity>
                <Text style={styles.badgeText}>
                    {badge == 0 ? 'Select Badge' : badges[badge - 1].name}
                </Text>
            </View>
        );
    }
    close2 = () => {
        this.setState({ show2: false })
    }
    close1 = () => {
        this.setState({ show1: false })
    }
    selectBadge = (id) => {
        this.setState({ show2: false, badge: id });
    }
    selectUser = (user) => {
        this.setState({ show1: false, user: user });
    }
    render() {
        const { loading, show1, show2, sortedContacts } = this.state;
        if (loading > 0) return <Spinner />;
        return (
            <View style={{ flex: 1, backgroundColor: '#FFF' }}>
                {this.header()}
                <KeyboardAwareScrollView
                    enableResetScrollToCoords={false}
                    enableAutoAutomaticScroll={false}
                    style={{ flex: 1 }}>
                    <View style={styles.mainContainer}>
                        {this.renderMember()}
                        {this.renderBadge()}
                        {this.renderField({
                            label: 'Title:',
                            name: 'title',
                            multiline: false,
                        })}
                        {this.renderField({
                            label: 'Description:',
                            name: 'description',
                            multiline: true,
                        })}

                        <Text style={styles.errorText}>{this.state.error}</Text>
                        <View style={styles.fieldContainer}>
                            <Button onPress={this.createBadge}>Add</Button>
                        </View>
                    </View>
                    <SelectUser
                        show={show1}
                        users={sortedContacts}
                        close={this.close1}
                        selectUser={this.selectUser} />

                    <SelectBadge
                        show={show2}
                        close={this.close2}
                        selectBadge={this.selectBadge} />
                </KeyboardAwareScrollView>
            </View >
        );
    }
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
    },
    finishButton: {
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 5,
        paddingBottom: 5,
        height: 50,
        width: '90%',
    },
    badgeImage: {
        width: 80,
        height: 80,
    },
    badgeGroup: {
        alignItems: 'center',
        marginBottom: 30,
        marginTop: 30
    },
    badgeText: {
        marginTop: 10,
        color: '#2a8aed'
    }
});
export default AddBravo;
