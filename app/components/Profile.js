import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { View, Text, Platform, Image, Dimensions, ScrollView, TextInput, TouchableOpacity, TouchableHighlight, Linking, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import DatePicker from 'react-native-datepicker'
import Modal from 'react-native-modal';
import { Header, Spinner } from '../components/common';
import images from '../config/images';
import firebase from '../utils/firebase';

Height = Dimensions.get("window").height
Width = Dimensions.get("window").width

class ModalWrapper extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { title, icon, isVisible, onChangeText, value, onSave, onHide, children } = this.props;
    const { modal, modalTitle, btnContainer, btn, btntextStyle } = styles;
    return (
      <Modal isVisible={isVisible}>
        <View style={modal}>
          <Text style={modalTitle}>{title}</Text>
          {children}
          <View style={btnContainer}>
            <TouchableOpacity style={btn} onPress={onSave}>
              <Text style={btntextStyle}>Save</Text>
            </TouchableOpacity> 
            <TouchableOpacity style={btn} onPress={onHide}>
              <Text style={btntextStyle}>Cancel</Text>
            </TouchableOpacity> 
          </View>
        </View>
      </Modal>
    );
  }
}

class ModalInput extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { placeholder, onChangeText, value, icon } = this.props;
    const { iconStyle, inputStyle } = styles;
    return (
      <View style={styles.containerStyle}>
        <Icon style={iconStyle} name={icon} size={23} color="#67686c"/>
        <TextInput
          placeholder={placeholder}
          style={inputStyle}
          underlineColorAndroid='transparent'
          onChangeText={onChangeText}
          value={value}
          autoCorrect={false} />
      </View>
    );
  }
}

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      info: null,
      loadingUser: true,
      loadingInfo: true,
      childNumber: 0,
      childrenObj: [],
      currentUid: firebase.auth().currentUser.uid
    };

    this.renderContent = this.renderContent.bind(this);
    this.renderChildren = this.renderChildren.bind(this);
    this.addChildToObject = this.addChildToObject.bind(this);
  }
    state = {
      isSocialVisible: false,
      isContactVisible: false,
      isAnniversaryVisible: false,
      isFamilyVisible: false,
      isFavouriteVisible: false,
      isInterestVisible: false,
      isMoreVisible: false,
      isNicknameVisible: false,
      isGenderVisible: false,
    }
  componentDidMount() {
    userRef = firebase.database().ref(`/users/${this.props.uid}`);
    userRef.on('value', this.handleUser);

    infoRef = firebase.database().ref(`/userInfo/${this.props.uid}`);
    infoRef.on('value', this.handleInfo);
  }

  handleUser = (snapshot) => {
    val = snapshot.val() || {};
    user = val;
    console.log(user);
    this.setState({ user, loadingUser: false });
  }

  handleInfo = (snapshot) => {
    console.log(snapshot.val())
    val = snapshot.val() || {};
    info = val;
    console.log(info);
    this.setState({
      info,
      loadingInfo: false
    });
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

  saveFamily(){
    firebase.database().ref(`/userInfo/${this.props.uid}`)
    .update({
      family: {
        member: this.state.member,
        children: this.state.childrenObj
      }
    })
    .then(() => { this.setState({ isFamilyVisible: false })
    });
  }

  saveNickName(){
    firebase.database().ref(`/userInfo/${this.props.uid}/`)
    .update({ 
      nickname: this.state.nickname
    })
    .then(() => { this.setState({ isNicknameVisible: false })
    });
  }

  saveGender(){
    firebase.database().ref(`/userInfo/${this.props.uid}/`)
    .update({ 
      gender: this.state.gender
     })
    .then(() => { this.setState({ isGenderVisible: false })
    });
  }

  saveContact() {
    firebase.database().ref(`/users/${this.props.uid}/`)
    .update({
      phone: this.state.phone,
      email: this.state.email
     })
    .then(() => { this.setState({ isContactVisible: false })
    });
  }

  saveAnniversary() {
    firebase.database().ref(`/users/${this.props.uid}/`)
    .update({
      anniversary: {
        birthday: this.state.birthday,
        firstDay: this.state.firstDay
      }
    })
    .then(() => { this.setState({ isAnniversaryVisible: false })
    });
  }

  saveMoreInfo() {
    firebase.database().ref(`/userInfo/${this.props.uid}/`)
    .update({
      info: this.state.more
    })
    .then(() => { this.setState({ isMoreVisible: false })
    });
  }

  saveInterest() {
    firebase.database().ref(`/userInfo/${this.props.uid}/`)
    .update({
      interest: this.state.interest
    })
    .then(() => { this.setState({ isInterestVisible: false })
    });
  }

  saveFavourites() {
    firebase.database().ref(`/userInfo/${this.props.uid}/`)
    .update({
      favourite: {
        drink: this.state.drink,
        food: this.state.food,
        snack: this.state.snack,
        music: this.state.music,
        sport: this.state.sport,
      }
    })
    .then(() => { this.setState({ isFavouriteVisible: false })
    });
  }

  renderSocialIcons(userProp, infoProp) {
    return (
      <View style={{flexDirection: 'row', paddingBottom: 20, paddingTop: 10, justifyContent: 'space-around'}}>
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

  addChildToObject(index, child) {
    let arr = this.state.childrenObj.slice();
    arr[index] = child;
    this.setState({ childrenObj: arr });

    console.log(this.state.childrenObj);
      // (child) => this.setState({ childrenObj[i]: [...this.state.childrenObj, child] })
  }

  renderChildren() {
    let children = [];
    for ( let i = 0; i < this.state.childNumber; i ++) {

      children.push(
        <View key={i} style={styles.containerStyle}>
          <Icon style={styles.iconStyle} name="child" size={26} color="#67686c"/>
          <TextInput
            placeholder="Firstname /Child/"
            style={styles.inputStyle}
            underlineColorAndroid='transparent'
            onChangeText={(child) => this.addChildToObject(i, child)}
            value={this.state.childrenObj[i]}
            autoCorrect={false}
          />
        </View>
      );
    }

    return (<View>{ children }</View>)
  }

  renderWrappers() {
    return (
      <View>
        <ModalWrapper
          isVisible={this.state.isNicknameVisible}
          title="Nickname"
          onSave={this.saveNickName.bind(this)}
          onHide={() => this.setState({ isNicknameVisible: false, nickname: '' })}>
          <ModalInput
            icon="user-circle-o"
            placeholder="Nickname"
            onChangeText={(nickname) => this.setState({nickname})}
            value={this.state.nickname} />
        </ModalWrapper>

        <ModalWrapper
          isVisible={this.state.isGenderVisible}
          title="Nickname"
          onSave={this.saveGender.bind(this)}
          onHide={() => this.setState({ isGenderVisible: false, gender: '' })}>
          <ModalInput
            icon="transgender"
            placeholder="Gender"
            onChangeText={(gender) => this.setState({gender})}
            value={this.state.gender} />
        </ModalWrapper>

        <ModalWrapper
          isVisible={this.state.isSocialVisible}
          title="Social accounts"
          onSave={() => this.setState({ isSocialVisible: false, facebook: '', twitter: '', instagram: '', linkedin: '', skype: '' })}
          onHide={() => this.setState({ isSocialVisible: false, facebook: '', twitter: '', instagram: '', linkedin: '', skype: '' })} >
          <ModalInput
            icon="facebook-official"
            placeholder="Facebook"
            onChangeText={(facebook) => this.setState({facebook})}
            value={this.state.facebook} />
          <ModalInput
            icon="twitter-square"
            placeholder="Twitter"
            onChangeText={(twitter) => this.setState({twitter})}
            value={this.state.twitter} />
          <ModalInput
            icon="instagram"
            placeholder="Instagram"
            onChangeText={(instagram) => this.setState({instagram})}
            value={this.state.instagram} />
          <ModalInput
            icon="linkedin-square"
            placeholder="Linkedin"
            onChangeText={(linkedin) => this.setState({linkedin})}
            value={this.state.linkedin} />
          <ModalInput
            icon="skype"
            placeholder="Skype"
            onChangeText={(skype) => this.setState({skype})}
            value={this.state.skype} />
        </ModalWrapper>

        <ModalWrapper
          isVisible={this.state.isContactVisible}
          title="Contact Info"
          onSave={this.saveContact.bind(this)}
          onHide={() => this.setState({ isContactVisible: false, email: '', phone: '' })} >
          <ModalInput
            icon="envelope"
            placeholder="E-mail address"
            onChangeText={(email) => this.setState({email})}
            value={this.state.email} />
          <ModalInput
            icon="phone-square"
            placeholder="Phone number"
            onChangeText={(phone) => this.setState({phone})}
            value={this.state.phone} />
        </ModalWrapper>

        <ModalWrapper
          isVisible={this.state.isAnniversaryVisible}
          title="Anniversary"
          onSave={this.saveAnniversary.bind(this)}
          onHide={() => this.setState({ isAnniversaryVisible: false, birthday: '', firstDay: '' })} >
          <View style={styles.containerStyle}>
            <Icon style={styles.iconStyle} name="birthday-cake" size={23} color="#67686c"/>
            <DatePicker
              style={styles.datePicker}
              value={this.state.birthday}
              date={this.state.birthday}
              mode="date"
              placeholder="Birthday"
              format="YYYY-MM-DD"
              confirmBtnText="Yes"
              cancelBtnText="No"
              onDateChange={(birthday) => this.setState({birthday})}
            />
          </View>
          <View style={styles.containerStyle}>
            <Icon style={styles.iconStyle} name="briefcase" size={23} color="#67686c"/>
            <DatePicker
              style={styles.datePicker}
              value={this.state.firstDay}
              date={this.state.firstDay}
              mode="date"
              placeholder="Work anniversary"
              format="YYYY-MM-DD"
              confirmBtnText="Yes"
              cancelBtnText="No"
              onDateChange={(firstDay) => this.setState({firstDay})}
            />
          </View>
        </ModalWrapper>

        <ModalWrapper
          isVisible={this.state.isFamilyVisible}
          title="Family"
          onSave={this.saveFamily.bind(this)}
          onHide={() => this.setState({ isFamilyVisible: false, member: '', child: '' })} >
          <View style={styles.containerStyle}>
            <Icon style={styles.iconStyle} name="heart" size={23} color="#67686c"/>
            <TextInput
              placeholder="Firstame /Husband or Wife/"
              style={styles.inputStyle}
              underlineColorAndroid='transparent'
              onChangeText={(member) => this.setState({member})}
              value={this.state.member}
            />
          </View>
          {this.renderChildren()}
          <View style={{ alignSelf: 'flex-end', marginRight: 20}}>
            <TouchableOpacity style={{flexDirection: 'row'}} onPress={() => this.setState({ childNumber: this.state.childNumber + 1 })}>
              <Icon name="plus" size={15} color="#000"/>
              <Text>Add child</Text>
            </TouchableOpacity>
          </View>
        </ModalWrapper>

        <ModalWrapper
          isVisible={this.state.isMoreVisible}
          title="More Information"
          onSave={this.saveMoreInfo.bind(this)}
          onHide={() => this.setState({ isMoreVisible: false, more: '' })}>
          <ModalInput
            icon="info"
            placeholder="Write here..."
            onChangeText={(more) => this.setState({more})}
            value={this.state.more} />
        </ModalWrapper>

        <ModalWrapper
          isVisible={this.state.isInterestVisible}
          title="Interest"
          onSave={this.saveInterest.bind(this)}
          onHide={() => this.setState({ isInterestVisible: false, interest: '' })}>
          <ModalInput
            icon="globe"
            placeholder="Write about your hobby..."
            onChangeText={(interest) => this.setState({interest})}
            value={this.state.interest} />
        </ModalWrapper>

        <ModalWrapper
          isVisible={this.state.isFavouriteVisible}
          title="Favourite things"
          onSave={this.saveFavourites.bind(this)}
          onHide={() => this.setState({ isFavouriteVisible: false })}>
          <ModalInput
            icon="coffee"
            placeholder="Drinks"
            onChangeText={(drink) => this.setState({drink})}
            value={this.state.drink} />
          <ModalInput
            icon="cutlery"
            placeholder="Foods"
            onChangeText={(food) => this.setState({food})}
            value={this.state.food} />
          <ModalInput
            icon="apple"
            placeholder="Snacks"
            onChangeText={(snack) => this.setState({snack})}
            value={this.state.snack} />
          <ModalInput
            icon="headphones"
            placeholder="Music"
            onChangeText={(music) => this.setState({music})}
            value={this.state.music} />
          <ModalInput
            icon="futbol-o"
            placeholder="Sport"
            onChangeText={(sport) => this.setState({sport})}
            value={this.state.sport} />
        </ModalWrapper>

        {/*
        */}
      </View>
    );
  }

  renderFamily(infoProp) {
    if (!infoProp.family || !infoProp.family.children)
      return ;
    let children = [];
    infoProp.family.children.forEach( (child, i) => {
      children.push(
        <View key={i} style={styles.mainContainerStyle}>
          <Icon style={styles.contentIconStyle} name="child" size={18} color="#333"/>
          <Text style={styles.contentIconStyle}>{child}</Text>
        </View>
      );
    });
    return (
      <View>
        {children}
      </View>
    )
  }

  renderEditIcon() {
    <Icon name="pencil-square-o" size={23} color="#000" style={styles.icon} onPress={() => this.setState({ isNicknameVisible: true })}/>
  }

  renderContent() {
    if (this.state.loadingUser || this.state.loadingInfo)
      return <Spinner/>

    const userProp = this.state.user;
    const infoProp = this.state.info; 
    return (
      <ScrollView style={{ marginBottom:60 }}>
        <View style={styles.mainStyle}>
          {
            userProp.profile_img
              ? <Image style={styles.profileImage} source={{uri: userProp.profile_img}} />
              : <Image style={styles.profileImage} source={images.avatar} />
          }
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
                {
                  infoProp.nickname
                    ? <Text>{infoProp.nickname}</Text>
                    : null
                }
                {
                  (this.props.isAdmin || this.props.currentUser)
                    ? <Icon name="pencil-square-o" size={23} color="#000" style={styles.icon} onPress={() => this.setState({ isNicknameVisible: true })}/>
                    : null
                }
              </View>
            </View>
            <View style={styles.nameFlex}>
              <Text style={styles.generalText}>Gender:</Text>
              <View style={styles.mainTitle}>
                {
                  infoProp.gender
                    ? <Text>{infoProp.gender}</Text>
                    : null
                }
                {
                  (this.props.isAdmin || this.props.currentUser)
                    ? <Icon name="pencil-square-o" size={23} color="#000" style={styles.icon} onPress={() => this.setState({ isGenderVisible: true })}/>
                    : null
                }
              </View>
            </View>
          </View>
        </View>
        <View style={styles.mainStyle}>
          <View style={styles.center}>
            <Icon name="phone-square" size={37} color="#009e11" style={{marginRight: 15}} />
            <Icon name="envelope" size={35} color="#b45f00" />
          </View>
        </View>
        <View style={styles.columnStyle}>
          <View style={styles.mainTitle}>
            <Text style={styles.mainTitleText}>Social accounts</Text>
            {
              (this.props.isAdmin || this.props.currentUser)
                ? <Icon name="pencil-square-o" size={23} color="#000" style={styles.icon} onPress={() => this.setState({ isSocialVisible: true })}/>
                : null
            }
          </View>
          {this.renderSocialIcons(userProp, infoProp)}

          <View style={styles.mainTitle}>
            <Text style={styles.mainTitleText}>Contact Info</Text>
            {
              (this.props.isAdmin || this.props.currentUser)
                ? <Icon name="pencil-square-o" size={23} color="#000" style={styles.icon} onPress={() => this.setState({ isContactVisible: true })}/>
                : null
            }
            
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
            {
              (this.props.isAdmin || this.props.currentUser)
                ? <Icon name="pencil-square-o" size={23} color="#000" style={styles.icon} onPress={() => this.setState({ isAnniversaryVisible: true })}/>
                : null
            }
            
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
            {
              (this.props.isAdmin || this.props.currentUser)
                ? <Icon name="pencil-square-o" size={23} color="#000" style={styles.icon} onPress={() => this.setState({ isFamilyVisible: true })}/>
                : null
            }
            
          </View>
          <View style={styles.mainContent}>
            <View style={styles.mainContainerStyle}>
              <Icon style={styles.contentIconStyle} name="heart" size={14} color="#333"/>
              {
                (infoProp.family && infoProp.family.member)
                  ? <Text style={styles.contentIconStyle}>{infoProp.family.member}</Text>
                  : null
              }
              {
                infoProp.gender === 'Female'
                  ? <Text>\husband\</Text>
                  : null
              }
              {
                infoProp.gender === 'Male'
                  ? <Text>\wife\</Text>
                  : null
              }
            </View>
            {this.renderFamily(infoProp)}
          </View>
          <View style={styles.mainTitle}>
            <Text style={styles.mainTitleText}>Favourite things</Text>
            {
              (this.props.isAdmin || this.props.currentUser)
                ? <Icon name="pencil-square-o" size={23} color="#000" style={styles.icon} onPress={() => this.setState({ isFavouriteVisible: true })}/>
                : null
            }
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
            {
              (this.props.isAdmin || this.props.currentUser)
                ? <Icon name="pencil-square-o" size={23} color="#000" style={styles.icon} onPress={() => this.setState({ isInterestVisible: true })}/>
                : null
            }
            
          </View>
          <View style={styles.mainContent}>
            <View style={styles.mainContainerStyle}>
              <Text style={styles.contentIconStyle}>{infoProp.interest}</Text>
            </View>
          </View>
          <View style={styles.mainTitle}>
            <Text style={styles.mainTitleText}>More Information</Text>
            {
              (this.props.isAdmin || this.props.currentUser)
                ? <Icon name="pencil-square-o" size={23} color="#000" style={styles.icon} onPress={() => this.setState({ isMoreVisible: true })}/>
                : null
            }
            
          </View>
          <View style={styles.mainContent}>
            <View style={styles.mainContainerStyle}>
              <Text style={styles.contentIconStyle}>{infoProp.info}</Text>
            </View>
          </View> 
        </View>
      </ScrollView>
    );
  }

  render() {
    return (
      <View style={{backgroundColor: '#eee', height: Height }}>
        {this.header()}
        {this.renderContent()}
        {
          (!this.state.loadingUser && !this.state.loadingInfo)  ? this.renderWrappers() : null
        }
    </View>
    );
  }
}

const styles = StyleSheet.create({
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
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  }
});

export default Profile;
