import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { View, Text, Platform, Image, Dimensions, ScrollView, TextInput, TouchableHighlight, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import DatePicker from 'react-native-datepicker'
import Modal from 'react-native-modal';
import { Header, Spinner } from '../components/common';
import images from '../config/images';
import Communications from 'react-native-communications';
import firebase from '../utils/firebase';

Height = Dimensions.get("window").height
Width = Dimensions.get("window").width

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = { email: '', phone: '', birthdate: '', workdate: '', family: '', more: '', child: '', hobby: '', drink: '', food: '', dessert:'', music: '', sport: '', user: null, info: null, nickname: '', gender: '' };
  }
    state = {
      isSocialVisible: false,
      isContactVisible: false,
      isAnniversaryVisible: false,
      isFamilyVisible: false,
      isFavouriteVisible: false,
      isInterestVisible: false,
      isMoreVisible: false,
    }
  componentDidMount() {
    userRef = firebase.database().ref('users').orderByChild('uid').equalTo(this.props.uid);
    userRef.on('value', this.handleUser);

    infoRef = firebase.database().ref('userInfo').orderByChild('uid').equalTo(this.props.uid);
    infoRef.on('value', this.handleInfo);
  }

  handleUser = (snapshot) => {
    val = snapshot.val() || {};
    user = val[this.props.uid];
    this.setState({ user });
  }

  handleInfo = (snapshot) => {
    console.log(snapshot.val())
    val = snapshot.val() || {};
    info = val[this.props.uid];
    this.setState({ info });
  }

  header() {
    const { viewStyle, iconLeft, iconList, textStyle } = styles;
    return (
    <View style={viewStyle}>
      <Icon name="caret-left" size={45} color="#fff" style={iconLeft} onPress={() => Actions.pop()} />
      <Text style={textStyle}>Profile</Text>
      <Icon name="lock" size={30} color="#fff" style={iconList}  />
    </View>
  )}

  OnFamilySaveButton(){
    const { currentUser } = firebase.auth();

    firebase.database().ref(`/userInfo/${currentUser.uid}/family`)
    .push({ 
      'title': this.state.family,
      'husband': this.state.child
     })
    .then(() => { this.setState({ isFamilyVisible: false })
    });
  }

  OnNicknameSaveButton(){
    const { currentUser } = firebase.auth();

    firebase.database().ref(`/users/${currentUser.uid}/`)
    .push({ 
      'nickname': this.state.nickname
     })
    .then(() => { this.setState({ isNicknameVisible: false })
    });
  }

  OnPhonePress(){
    const { phone, firstName } = this.state.user;

    Communications.phonecall(phone.toString(), false)
  }

  OnTextPress(){
    const { phone, firstName } = this.state.user;

    Communications.text(phone.toString(), `Hi, ${firstName}`)
  }

  renderSocialIcons(userProp, infoProp) {
    return (
      <View style={{flexDirection: 'row', paddingBottom: 20, paddingTop: 10}}>
        <TouchableHighlight onPress={() => Linking.openURL(infoProp.fb)}>
          <Image source={images.fb} style={styles.socialImage} />
        </TouchableHighlight>
        <TouchableHighlight>
          <Image source={images.twitter} style={styles.socialImage} />
        </TouchableHighlight>
        <TouchableHighlight>
          <Image source={images.instagram} style={styles.socialImage} />
        </TouchableHighlight>
        <TouchableHighlight>
          <Image source={images.linkedin} style={styles.socialImage} />
        </TouchableHighlight>
        <TouchableHighlight>
          <Image source={images.skype} style={styles.socialImage} />
        </TouchableHighlight>
      </View>
  )}

  addTagToInput(event){
    this.state = {text: this.state.text + " " + this.U9};
  }

  render() {
    const userProp = this.state.user;
    const infoProp = this.state.info; 
    return (
      <View style={{backgroundColor: '#eee', height: Height }}>
        {this.header()}
        {
          userProp && infoProp &&
          <ScrollView style={{ marginBottom:60 }}>
          <View style={styles.mainStyle}>
            <Image
            style={styles.profileImage}
            source={{uri: userProp.profile_img}} />
            <View style={styles.namePart}>
              <View style={styles.nameFlex}>
                <Text style={styles.generalText}>Name:</Text>
                <Text style={styles.userName}>{userProp.firstName} {userProp.lastname}</Text>
              </View>
              <View style={styles.nameFlex}>
                <Text style={styles.generalText}>Position:</Text>
                <Text>{userProp.position}</Text>
              </View>
              <View style={styles.nameFlex}>
                <Text style={styles.generalText}>Nickname:</Text>
                <View style={styles.mainTitle}>
                  <Text>{userProp.nickname}</Text>
                  <Icon name="pencil-square-o" size={23} color="#000" style={styles.icon} onPress={() => this.setState({ isNicknameVisible: true })}/>
                  <Modal isVisible={this.state.isNicknameVisible}>
                    <View style={styles.modal}>
                      <Text style={styles.modalTitle}>Nickname</Text>
                        <View style={styles.containerStyle}>
                          <Icon style={styles.iconStyle} name="user-circle-o" size={23} color="#67686c"/>
                          <TextInput
                            placeholder="Nickname"
                            style={styles.inputStyle}
                            underlineColorAndroid='transparent'
                            onChangeText={(nickname) => this.setState({nickname})}
                            value={this.state.nickname}
                            autoCorrection="false"
                          />
                        </View>
                        <TouchableHighlight style={styles.btn} onPress={this.OnNicknameSaveButton.bind(this)} underlayColor="#2b78e4">
                          <Text style={styles.btntextStyle}>Save</Text>
                        </TouchableHighlight> 
                      </View>
                  </Modal>
                </View>
              </View>
              <View style={styles.nameFlex}>
                <Text style={styles.generalText}>Gender:</Text>
                <View style={styles.mainTitle}>
                  <Text>{infoProp.gender}</Text>
                  <Icon name="pencil-square-o" size={23} color="#000" style={styles.icon}/>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.mainStyle}>
            <View style={styles.center}>
              <Icon name="phone-square" size={37} color="#009e11" style={{marginRight: 15}} onPress={this.OnPhonePress.bind(this)} />
              <Icon name="envelope" size={35} color="#b45f00" onPress={this.OnTextPress.bind(this)}/>
            </View>
          </View>
          <View style={styles.columnStyle}>
            <View style={styles.mainTitle}>
              <Text style={styles.mainTitleText}>Social accounts</Text>
              <Icon name="pencil-square-o" size={23} color="#000" style={{justifyContent: 'flex-end'}} onPress={() => this.setState({ isSocialVisible: true })}/>
              <Modal isVisible={this.state.isSocialVisible}>
                <View style={styles.modal}>
                  <Text style={styles.modalTitle}>Social accounts</Text>
                    <View style={styles.containerStyle}>
                      <Icon style={styles.iconStyle} name="facebook-official" size={23} color="#67686c"/>
                      <TextInput
                        placeholder="Facebook"
                        style={styles.inputStyle}
                        underlineColorAndroid='transparent'
                        onChangeText={(email) => this.setState({email})}
                        value={this.state.email}
                      />
                    </View>
                    <View style={styles.containerStyle}>
                      <Icon style={styles.iconStyle} name="twitter-square" size={23} color="#67686c"/>
                      <TextInput
                        placeholder="Twitter"
                        style={styles.inputStyle}
                        underlineColorAndroid='transparent'
                        onChangeText={(phone) => this.setState({phone})}
                        value={this.state.phone}
                      />
                    </View>
                    <View style={styles.containerStyle}>
                      <Icon style={styles.iconStyle} name="instagram" size={23} color="#67686c"/>
                      <TextInput
                        placeholder="Instagram"
                        style={styles.inputStyle}
                        underlineColorAndroid='transparent'
                        onChangeText={(phone) => this.setState({phone})}
                        value={this.state.phone}
                      />
                    </View>
                    <View style={styles.containerStyle}>
                      <Icon style={styles.iconStyle} name="linkedin-square" size={23} color="#67686c"/>
                      <TextInput
                        placeholder="Linkedin"
                        style={styles.inputStyle}
                        underlineColorAndroid='transparent'
                        onChangeText={(phone) => this.setState({phone})}
                        value={this.state.phone}
                      />
                    </View>
                    <View style={styles.containerStyle}>
                      <Icon style={styles.iconStyle} name="skype" size={23} color="#67686c"/>
                      <TextInput
                        placeholder="Skype"
                        style={styles.inputStyle}
                        underlineColorAndroid='transparent'
                        onChangeText={(phone) => this.setState({phone})}
                        value={this.state.phone}
                      />
                    </View>
                    <TouchableHighlight style={styles.btn} onPress={() => this.setState({ isSocialVisible: false })} underlayColor="#2b78e4">
                      <Text style={styles.btntextStyle}>Save</Text>
                    </TouchableHighlight> 
                  </View>
              </Modal>
            </View>
            {this.renderSocialIcons(userProp, infoProp)}

            <View style={styles.mainTitle}>
              <Text style={styles.mainTitleText}>Contact Info</Text>
              <Icon name="pencil-square-o" size={23} color="#000" style={{justifyContent: 'flex-end'}} onPress={() => this.setState({ isContactVisible: true })}/>
              <Modal isVisible={this.state.isContactVisible}>
                <View style={styles.modal}>
                  <Text style={styles.modalTitle}>Contact Info</Text>
                    <View style={styles.containerStyle}>
                      <Icon style={styles.iconStyle} name="envelope" size={23} color="#67686c"/>
                      <TextInput
                        placeholder="E-mail address"
                        style={styles.inputStyle}
                        underlineColorAndroid='transparent'
                        onChangeText={(email) => this.setState({email})}
                        value={this.state.email}
                      />
                    </View>
                    <View style={styles.containerStyle}>
                      <Icon style={styles.iconStyle} name="phone-square" size={23} color="#67686c"/>
                      <TextInput
                        placeholder="Phone number"
                        style={styles.inputStyle}
                        underlineColorAndroid='transparent'
                        onChangeText={(phone) => this.setState({phone})}
                        value={this.state.phone}
                      />
                    </View>
                    <TouchableHighlight style={styles.btn} onPress={() => this.setState({ isContactVisible: false })} underlayColor="#2b78e4">
                      <Text style={styles.btntextStyle}>Save</Text>
                    </TouchableHighlight> 
                  </View>
              </Modal>
            </View>
            <View style={styles.mainContent}>
              <View style={styles.mainContainerStyle}>
                <Icon style={styles.contentIconStyle} name="envelope" size={14} color="#333"/>
                <Text style={styles.contentIconStyle}>{userProp.email}</Text>
              </View>
              <View style={styles.mainContainerStyle}>
                <Icon style={styles.contentIconStyle} name="phone-square" size={18} color="#333"/>
                <Text style={styles.contentIconStyle}>{userProp.phone}</Text>
              </View>
            </View>

            <View style={styles.mainTitle}>
              <Text style={styles.mainTitleText}>Anniversary</Text>
              <Icon name="pencil-square-o" size={23} color="#000" style={{justifyContent: 'flex-end'}} onPress={() => this.setState({ isAnniversaryVisible: true })}/>
              <Modal isVisible={this.state.isAnniversaryVisible}>
                <View style={styles.modal}>
                  <Text style={styles.modalTitle}>Anniversary</Text>
                    <View style={styles.containerStyle}>
                      <Icon style={styles.iconStyle} name="birthday-cake" size={23} color="#67686c"/>
                      <DatePicker
                        style={styles.datePicker}
                        value={this.state.birthdate}
                        date={this.state.birthdate}
                        mode="date"
                        placeholder="Birthday"
                        format="YYYY-MM-DD"
                        confirmBtnText="Yes"
                        cancelBtnText="No"
                        onDateChange={(birthdate) => this.setState({birthdate})}
                      />
                    </View>
                    <View style={styles.containerStyle}>
                      <Icon style={styles.iconStyle} name="briefcase" size={23} color="#67686c"/>
                      <DatePicker
                        style={styles.datePicker}
                        value={this.state.workdate}
                        date={this.state.workdate}
                        mode="date"
                        placeholder="Work anniversary"
                        format="YYYY-MM-DD"
                        confirmBtnText="Yes"
                        cancelBtnText="No"
                        onDateChange={(workdate) => this.setState({workdate})}
                      />
                    </View>
                    <TouchableHighlight style={styles.btn} onPress={() => this.setState({ isAnniversaryVisible: false })} underlayColor="#2b78e4">
                      <Text style={styles.btntextStyle}>Save</Text>
                    </TouchableHighlight> 
                  </View>
              </Modal>
            </View>
            <View style={styles.mainContent}>
              <View style={styles.mainContainerStyle}>
                <Icon style={styles.contentIconStyle} name="birthday-cake" size={14} color="#333"/>
                <Text style={styles.contentIconStyle}>{userProp.anniversary.birthday}</Text>
              </View>
              <View style={styles.mainContainerStyle}>
                <Icon style={styles.contentIconStyle} name="briefcase" size={14} color="#333"/>
                <Text style={styles.contentIconStyle}>{userProp.anniversary.firstDay}</Text>
              </View>
            </View>
            <View style={styles.mainTitle}>
              <Text style={styles.mainTitleText}>Family</Text>
              <Icon name="pencil-square-o" size={23} color="#000" style={{justifyContent: 'flex-end'}} onPress={() => this.setState({ isFamilyVisible: true })}/>
              <Modal isVisible={this.state.isFamilyVisible}>
                <View style={styles.modal}>
                  <Text style={styles.modalTitle}>Family</Text>
                    <View style={styles.containerStyle}>
                      <Icon style={styles.iconStyle} name="heart" size={23} color="#67686c"/>
                      <TextInput
                        placeholder="Firstame /Husband or Wife/"
                        style={styles.inputStyle}
                        underlineColorAndroid='transparent'
                        onChangeText={(family) => this.setState({family})}
                        value={this.state.family}
                      />
                    </View>
                    <View style={styles.containerStyle}>
                      <Icon style={styles.iconStyle} name="child" size={26} color="#67686c"/>
                      <TextInput
                        placeholder="Firstname /Child/"
                        style={styles.inputStyle}
                        underlineColorAndroid='transparent'
                        onChangeText={(child) => this.setState({child})}
                        value={this.state.child}
                      />
                    </View>
                    <TouchableHighlight onPress={this.addTagToInput.bind(this)}>
                      <View style={{flexDirection: 'row', alignSelf: 'flex-end', marginRight: 20}}>
                      <Icon name="plus" size={15} color="#000"/>
                      <Text>Add child</Text>
                      </View>
                    </TouchableHighlight>
                    <TouchableHighlight style={styles.btn} onPress={this.OnFamilySaveButton.bind(this)} underlayColor="#2b78e4">
                      <Text style={styles.btntextStyle}>Save</Text>
                    </TouchableHighlight> 
                  </View>
              </Modal>
            </View>
            <View style={styles.mainContent}>
              <View style={styles.mainContainerStyle}>
                <Icon style={styles.contentIconStyle} name="heart" size={14} color="#333"/>
                {
                  infoProp.family &&
                <Text style={styles.contentIconStyle}>{infoProp.family.member}}</Text>
                }
                <Text>\husband\</Text>
              </View>
              <View style={styles.mainContainerStyle}>
                <Icon style={styles.contentIconStyle} name="child" size={18} color="#333"/>
                {
                  infoProp.family &&
                <Text style={styles.contentIconStyle}>{infoProp.family.child.one.name}}</Text>
                }
                <Text>\3 age\</Text>
              </View>
              <View style={styles.mainContainerStyle}>
                <Icon style={styles.contentIconStyle} name="child" size={18} color="#333"/>
                {
                  infoProp.family &&
                  <Text style={styles.contentIconStyle}>{infoProp.family.child.two.name}</Text>
                }

                <Text>\3 age\</Text>
              </View>
            </View>
            <View style={styles.mainTitle}>
              <Text style={styles.mainTitleText}>Favourite things</Text>
              <Icon name="pencil-square-o" size={23} color="#000" style={{justifyContent: 'flex-end'}} onPress={() => this.setState({ isFavouriteVisible: true })}/>
              <Modal isVisible={this.state.isFavouriteVisible}>
                <View style={styles.modal}>
                  <Text style={styles.modalTitle}>Favourite things</Text>
                    <View style={styles.containerStyle}>
                      <Icon style={styles.iconStyle} name="coffee" size={23} color="#67686c"/>
                      <TextInput
                        placeholder="Favourite drinks"
                        style={styles.inputStyle}
                        underlineColorAndroid='transparent'
                        onChangeText={(drink) => this.setState({drink})}
                        value={this.state.drink}
                      />
                    </View>
                    <View style={styles.containerStyle}>
                      <Icon style={styles.iconStyle} name="cutlery" size={26} color="#67686c"/>
                      <TextInput
                        placeholder="Favourite foods"
                        style={styles.inputStyle}
                        underlineColorAndroid='transparent'
                        onChangeText={(food) => this.setState({food})}
                        value={this.state.food}
                      />
                    </View>
                    <View style={styles.containerStyle}>
                      <Icon style={styles.iconStyle} name="apple" size={26} color="#67686c"/>
                      <TextInput
                        placeholder="Favourite snacks"
                        style={styles.inputStyle}
                        underlineColorAndroid='transparent'
                        onChangeText={(dessert) => this.setState({dessert})}
                        value={this.state.dessert}
                      />
                    </View>
                    <View style={styles.containerStyle}>
                      <Icon style={styles.iconStyle} name="headphones" size={26} color="#67686c"/>
                      <TextInput
                        placeholder="Favourite music"
                        style={styles.inputStyle}
                        underlineColorAndroid='transparent'
                        onChangeText={(music) => this.setState({music})}
                        value={this.state.music}
                      />
                    </View>
                    <View style={styles.containerStyle}>
                      <Icon style={styles.iconStyle} name="futbol-o" size={26} color="#67686c"/>
                      <TextInput
                        placeholder="Favourite sports"
                        style={styles.inputStyle}
                        underlineColorAndroid='transparent'
                        onChangeText={(sport) => this.setState({sport})}
                        value={this.state.sport}
                      />
                    </View>
                    <TouchableHighlight style={styles.btn} onPress={() => this.setState({ isFavouriteVisible: false })} underlayColor="#2b78e4">
                      <Text style={styles.btntextStyle}>Save</Text>
                    </TouchableHighlight> 
                  </View>
              </Modal>
            </View>
            <View style={styles.mainContent}>
              <View style={styles.mainContainerStyle}>
               {
                  infoProp.favourite &&
                <Icon style={styles.contentIconStyle} name="coffee" size={14} color="#333"/> &&
                <Text style={styles.contentIconStyle}>{infoProp.favourite.drink}</Text>
                }
              </View>
              <View style={styles.mainContainerStyle}>
               {
                  infoProp.favourite &&
                <Icon style={styles.contentIconStyle} name="cutlery" size={14} color="#333"/> &&
                <Text style={styles.contentIconStyle}>{infoProp.favourite.food}</Text>
                }
              </View>
              <View style={styles.mainContainerStyle}>
                {
                  infoProp.favourite &&
                <Icon style={styles.contentIconStyle} name="apple" size={14} color="#333"/> &&
                <Text style={styles.contentIconStyle}>{infoProp.favourite.snack}</Text>
                }
              </View>
              <View style={styles.mainContainerStyle}>
                {
                  infoProp.favourite &&
                <Icon style={styles.contentIconStyle} name="headphones" size={14} color="#333"/> &&
                <Text style={styles.contentIconStyle}>{infoProp.favourite.music}</Text>
                }
              </View>
              <View style={styles.mainContainerStyle}>
                {
                  infoProp.favourite &&
                <Icon style={styles.contentIconStyle} name="futbol-o" size={14} color="#333"/> &&
                <Text style={styles.contentIconStyle}>{infoProp.favourite.sport}</Text>
                }
              </View>
            </View>

            <View style={styles.mainTitle}>
              <Text style={styles.mainTitleText}>Interest</Text>
              <Icon name="pencil-square-o" size={23} color="#000" style={{justifyContent: 'flex-end'}} onPress={() => this.setState({ isInterestVisible: true })}/>
              <Modal isVisible={this.state.isInterestVisible}>
                <View style={styles.modal}>
                  <Text style={styles.modalTitle}>Interest</Text>
                    <View style={styles.containerStyle}>
                      <TextInput
                        multiline = {true}
                        numberOfLines = {4}
                        placeholder="Write about your hobby..."
                        style={styles.inputStyle}
                        underlineColorAndroid='transparent'
                        onChangeText={(hobby) => this.setState({hobby})}
                        value={this.state.hobby}
                      />
                    </View>
                    <TouchableHighlight style={styles.btn} onPress={() => this.setState({ isInterestVisible: false })} underlayColor="#2b78e4">
                      <Text style={styles.btntextStyle}>Save</Text>
                    </TouchableHighlight> 
                  </View>
              </Modal>
            </View>
            <View style={styles.mainContent}>
              <View style={styles.mainContainerStyle}>
                <Text style={styles.contentIconStyle}>{infoProp.interest}</Text>
              </View>
            </View>
            <View style={styles.mainTitle}>
              <Text style={styles.mainTitleText}>More Information</Text>
              <Icon name="pencil-square-o" size={23} color="#000" style={{justifyContent: 'flex-end'}} onPress={() => this.setState({ isMoreVisible: true })}/>
              <Modal isVisible={this.state.isMoreVisible}>
                <View style={styles.modal}>
                  <Text style={styles.modalTitle}>More Information</Text>
                    <View style={styles.containerStyle}>
                      <TextInput
                        multiline = {true}
                        numberOfLines = {4}
                        placeholder="Write here..."
                        style={styles.inputStyle}
                        underlineColorAndroid='transparent'
                        onChangeText={(more) => this.setState({more})}
                        value={this.state.more}
                      />
                    </View>
                    <TouchableHighlight style={styles.btn} onPress={() => this.setState({ isMoreVisible: false })} underlayColor="#2b78e4">
                      <Text style={styles.btntextStyle}>Save</Text>
                    </TouchableHighlight> 
                  </View>
              </Modal>
            </View>
            <View style={styles.mainContent}>
              <View style={styles.mainContainerStyle}>
                <Text style={styles.contentIconStyle}>{infoProp.moreInformation}</Text>
              </View>
            </View> 
          </View>
        </ScrollView>
      }
    </View>
    );
  }
}

const styles = {
  mainStyle: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 10,
    marginTop: 5
  },
  columnStyle: {
    flexDirection: 'column',
    backgroundColor: '#fff',
    padding: 10,
    marginTop: 5
  },
  center: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  mainTitle: {
    flex: 1, 
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  mainTitleText:{
    fontWeight: 'bold',
    justifyContent: 'center'
  },
  viewStyle: {
    backgroundColor: '#6fa8dc',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 75,
    paddingTop: (Platform.OS === 'ios') ? 20 : 0,
  },
  textStyle: {
    fontSize: 23,
    color: '#fff'
  },
  iconLeft: {
    marginLeft: 20
  },
  iconList: {
    marginRight: 20,
    width: 30,
    height: 30,
  },
  textInput: {
    flex: 1,
    height: 35,
    paddingVertical: 0,
    justifyContent: 'flex-start',
    fontSize: 14
  },
  modal: {
    backgroundColor: '#fff',
    borderRadius: 5,
    borderColor: '#fff',
    borderWidth: 1
  },
  modalTitle: {
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 18,
    padding: 15
  }, 
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 10,
    borderColor: '#eee',
    borderWidth: 1
  },
  namePart: {
    flexDirection: 'column',
  },
  nameFlex: {
    flexDirection: 'row',
    minWidth: 262,
    marginBottom: 7,
  },
  generalText: {
    fontSize: 14,
    fontWeight: '700',
    marginRight: 7,
  },
  icon: {
    justifyContent: 'flex-end', 
  },
  socialImage: {
    width: 30,
    height: 30,
    marginRight: 8,
    resizeMode: 'contain'
  },
  inputStyle: {
    color: '#333',
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: 14,
    lineHeight: 23,
    flex: 1
  },
  iconStyle: {
    padding: 8,
    backgroundColor: '#cccccc',
    width: 39
  },
  containerStyle: {
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    marginBottom: 8,
    marginRight: 20,
    marginLeft: 20,
    borderColor: '#cccccc'
  },
  btn: {
    alignSelf: 'center',
    width: 90,
    backgroundColor: '#2b78e4',
    borderRadius: 2,
    borderColor: '#98bce1',
    borderWidth: 1,
    marginTop: 7,
    marginBottom: 15
  },
  btntextStyle: {
    alignSelf: 'center',
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    paddingTop: 8,
    paddingBottom: 8
  },
  datePicker: {
    borderColor: '#cccccc',
    width: 253,
    marginRight: 10
  },
  mainContent: {
    paddingBottom: 10,
    paddingTop: 7
  },
  mainContainerStyle: {
    flexDirection: 'row',
    paddingBottom: 4
  },
  contentIconStyle: {
    paddingRight: 8,
    minWidth: 22,
    justifyContent: 'center'
  }
};

export default Profile;
