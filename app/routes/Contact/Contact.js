import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { View, Text, Platform, Image, Dimensions, ScrollView, TextInput, Picker, TouchableOpacity, TouchableHighlight, Linking, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import DatePicker from 'react-native-datepicker'
import Modal from 'react-native-modal';
import Communications from 'react-native-communications';
import RNFetchBlob from 'react-native-fetch-blob';
import ImagePicker from 'react-native-image-picker';
import { Header, Spinner, FloatButton, EditButton, Input, CardSection, Card } from '../../components/common';
import images from '../../config/images';
import firebase from '../../utils/firebase';

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

class ModalWrapperClose extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { isVisible, onClose, children } = this.props;
    const { modal, btnContainer, btn, btntextStyle } = styles;
    return (
      <Modal isVisible={isVisible}>
        <View style={modal}>
          {children}
          <View style={btnContainer}>
            <TouchableOpacity style={btn} onPress={onClose}>
              <Text style={btntextStyle}>Close</Text>
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
          placeholder          ={placeholder}
          style                ={inputStyle}
          underlineColorAndroid='transparent'
          onChangeText         ={onChangeText}
          value                ={value}
          autoCorrect          ={false} />
      </View>
    );
  }
}

class Uploader {
  static setImageUrl(userId, url){
    let Path = "/users/"+userId+"/url"
    return firebase.database().ref(Path).set(url)
  }
}

const Blob = RNFetchBlob.polyfill.Blob
const fs = RNFetchBlob.fs
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
window.Blob = Blob

const  uploadImage = (uri, imageName, mime = 'image/jpg') => {
 return new Promise((resolve, reject) => {
   const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri
   let uploadBlob = null
   const imageRef = firebase.storage().ref('profileImg').child(imageName)
   fs.readFile(uploadUri, 'base64')
     .then((data) => {
         return Blob.build(data, { type: `${mime};BASE64` })
     })
     .then((blob) => {
       uploadBlob = blob
       return imageRef.put(blob, { contentType: mime })
     })
     .then(() => {
       uploadBlob.close()
       return imageRef.getDownloadURL()
     })
     .then((url) => {
       resolve(url)
     })
     .catch((error) => {
       reject(error)
     })
 })
}

class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user       : null,
      info       : null,
      loadingUser: true,
      loadingInfo: true,
      currentUid : firebase.auth().currentUser.uid,
      uid        : '',
      password   : ''
    };
      
    this.renderContent = this.renderContent.bind(this);
    this.renderChildren = this.renderChildren.bind(this);
    this.addChildToObject = this.addChildToObject.bind(this);
  }
    state = {
      isSocialVisible      : false,
      isContactVisible     : false,
      isAnniversaryVisible : false,
      isFamilyVisible      : false,
      isFavouriteVisible   : false,
      isInterestVisible    : false,
      isMoreVisible        : false,
      isNicknameVisible    : false,
      isGenderVisible      : false,
      isPasswordVisible    : false,
      isProfileImageVisible: false,
      isBigImage           : false,
    }

  componentWillMount() {
   try {
      this.setState({
        uid: this.state.currentUid
      })
    } catch(error){
      console.log(error)
    }
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
    this.setState({
      user,
      loadingUser: false,
      firstName  : user.firstName,
      lastname   : user.lastname,
      email      : user.email,
      phone      : user.phone,
      birthday   : user.anniversary.birthday,
      firstDay   : user.anniversary.firstDay
    });
  }

  handleInfo = (snapshot) => {
    val = snapshot.val() || {};
    info = val;

    member     = '';
    child      = [];
    childNumber= 0;
    drink      = '';
    food       = '';
    snack      = '';
    music      = '';
    sport      = '';
    if (typeof info.family !== 'undefined') {
      member     = info.family.member;
      child      = info.family.children;
      childNumber= info.family.children.length;
    }
    if (info.favourite) {
      drink = info.favourite.drink;
      food  = info.favourite.food;
      snack = info.favourite.snack;
      music = info.favourite.music;
      sport = info.favourite.sport;
    }
    this.setState({
      info,
      member,
      child,
      childNumber,
      drink,
      food,
      snack,
      music,
      sport,
      loadingInfo: false,
      nickname   : info.nickname,
      gender     : info.gender,
      more       : info.info
    });
  }

  header() {
    const { viewStyle, iconLeft, iconList, textStyle } = styles;
    return (
    <View style={viewStyle}>
      <TouchableOpacity onPress={() => Actions.pop()} style={styles.headBtn}>
        <Icon name="caret-left" size={45} color="#fff" style={iconLeft} />
      </TouchableOpacity>
      <Text style={textStyle}>Profile</Text>
      {
        this.props.currentUser === true
          ? (<TouchableOpacity onPress={() => this.setState({ isPasswordVisible: true })} style={styles.headBtn}>
              <Icon name="lock" size={30} color="#fff" style={iconList} />
            </TouchableOpacity>)
          : <View/>
      }
    </View>
  )}

  savePassword(){
    if (this.state.password.length === 0) {
      this.setState({ passwordErr: 'Password should not be null.' });
      return;
    }
    if (this.state.password !== this.state.newPassword) {
      this.setState({ passwordErr: 'Password does not match.' });
      return;
    }
    let user = firebase.auth().currentUser;
    user.updatePassword(this.state.password)
      .then(() => {
        this.setState({ isPasswordVisible: false, newPassword: '', password: '', passwordErr: '' })
      });
  }

  saveFamily(){
    firebase.database().ref(`/userInfo/${this.props.uid}`)
    .update({
      family: {
        member  : this.state.member,
        children: this.state.child
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

  saveProfileImage(){
    firebase.database().ref(`/users/${this.props.uid}/`)
    .update({ 
      profileImg: this.state.imagePath
    })
    .then(() => { this.setState({ isProfileImageVisible: false })
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
    .then(() => {
      this.setState({ isContactVisible: false });
      Actions.contact({
        uid: this.props.uid,
        isAdmin: this.props.isAdmin,
        currentUser: firebase.auth().currentUser.uid === this.props.uid
      });
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

  saveSocialAccount() {
    firebase.database().ref(`/userInfo/${this.props.uid}/`)
    .update({
      social: {
        facebook : this.state.facebook,
        twitter  : this.state.twitter,
        instagram: this.state.instagram,
        linkedin : this.state.linkedin,
        skype    : this.state.skype
      }
    })
    .then(() => { this.setState({ isSocialVisible: false })
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
        food : this.state.food,
        snack: this.state.snack,
        music: this.state.music,
        sport: this.state.sport,
      }
    })
    .then(() => { this.setState({ isFavouriteVisible: false })
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
      <View style={{flexDirection: 'row', paddingBottom: 20, paddingTop: 10, justifyContent: 'space-around'}}>
      {
       (infoProp.social && infoProp.social.facebook) ?
        <TouchableOpacity onPress={() => Linking.openURL('https://www.facebook.com/'+infoProp.facebook)}>
          <Image source={images.fb} style={styles.socialImage} />
        </TouchableOpacity> : null 
      }
      {
      (infoProp.social && infoProp.social.twitter) ?
        <TouchableOpacity>
          <Image source={images.twitter} style={styles.socialImage} />
        </TouchableOpacity> : null      
      }
      {
        (infoProp.social && infoProp.social.instagram) ?
        <TouchableOpacity>
          <Image source={images.instagram} style={styles.socialImage} />
        </TouchableOpacity> : null
      }
      {
       (infoProp.social && infoProp.social.linkedin) ?
        <TouchableOpacity>
          <Image source={images.linkedin} style={styles.socialImage} />
        </TouchableOpacity> : null
      }
      {
        (infoProp.social && infoProp.social.skype) ?
        <TouchableOpacity>
          <Image source={images.skype} style={styles.socialImage} />
        </TouchableOpacity> : null
      }
      </View>
  )}

  addChildToObject(index, child) {
    let arr = this.state.child.slice();
    arr[index] = child;
    this.setState({ child: arr });
  }

  renderChildren() {
    let children = [];
    for ( let i = 0; i < this.state.childNumber; i ++) {

      children.push(
        <CardSection key={i}>
          <Input
            icon        ='ios-body'
            placeholder ="Firstname /Child/"
            onChangeText={(child) => this.addChildToObject(i, child)}
            value       ={this.state.child[i]}
          />
        </CardSection>
      );
    }

    return (<View>{ children }</View>)
  }

  renderWrappers() {
    return (
      <View>
        <ModalWrapper
          isVisible={this.state.isPasswordVisible}
          title="Password"
          onSave={this.savePassword.bind(this)}
          onHide={() => this.setState({ isPasswordVisible: false, password: '', newPassword: '' })}>
          <Card>
            <CardSection>
              <Input
                icon        ="md-lock"
                placeholder ="New password"
                onChangeText={(password) => this.setState({ password })}
                value       ={this.state.twitter}
                secureTextEntry />
            </CardSection>
            <CardSection>
              <Input
                icon        ="md-lock"
                placeholder ="Repeat new password"
                onChangeText={(newPassword) => this.setState({ newPassword })}
                value       ={this.state.twitter}
                secureTextEntry />
            </CardSection>
            <Text style={styles.errorText}>{this.state.passwordErr}</Text>
          </Card>
        </ModalWrapper>

        <ModalWrapper
          isVisible={this.state.isNicknameVisible}
          title="Nickname"
          onSave={this.saveNickName.bind(this)}
          onHide={() => this.setState({ isNicknameVisible: false, nickname: this.state.info.nickname })}>
          <Card>
            <CardSection>
              <Input
                icon          ='ios-contact'
                placeholder   ="Nickname"
                onChangeText  ={(nickname) => this.setState({nickname})}
                value         ={this.state.nickname}
                autoCapitalize='words' />
            </CardSection>
          </Card>
        </ModalWrapper>

        <ModalWrapperClose
          isVisible={this.state.isBigImage}
          onClose={() => this.setState({ isBigImage: false })}>
          <Image source={{uri: this.state.user.profileImg}} style={styles.bigImage} />
        </ModalWrapperClose>

        <ModalWrapper
          isVisible={this.state.isGenderVisible}
          title="Gender"
          onSave={this.saveGender.bind(this)}
          onHide={() => this.setState({ isGenderVisible: false, gender: this.state.info.gender })}>
          <Picker
            selectedValue={this.state.gender}
            onValueChange={(gender) => this.setState({gender})}>
            <Picker.Item label="Male" value="male" />
            <Picker.Item label="Female" value="female" />
          </Picker>
        </ModalWrapper>

        <ModalWrapper
          isVisible={this.state.isProfileImageVisible}
          title="Profile Image"
          onSave={this.saveProfileImage.bind(this)}
          onHide={() => this.setState({ isProfileImageVisible: false, profileImg: '' })}>
            <TouchableOpacity onPress={() => this.openPicker()} style={styles.ProfileImageContainer}>
            {
            this.state.imagePath ? <Image style={styles.profileImageDetail} source={{uri: this.state.imagePath}} value={this.state.imagePath} onChangeImage={(profileImg) => this.setState({profileImg})} /> :
              <View style={styles.ProfileImageContainer}>
                <Text style={styles.profileImageText}>Энд</Text> 
                <Text>дарж зурагаа оруулна уу</Text>
              </View>
            }
            </TouchableOpacity>
        </ModalWrapper>

        <ModalWrapper
          isVisible={this.state.isSocialVisible}
          title="Social accounts"
          onSave={this.saveSocialAccount.bind(this)}
          onHide={() => this.setState({ isSocialVisible: false, facebook: '', twitter: '', instagram: '', linkedin: '', skype: '' })} >
          <Card>
            <CardSection>
              <Input
                icon          ="logo-facebook"
                placeholder   ="Facebook"
                onChangeText  ={(facebook) => this.setState({facebook})}
                value         ={this.state.facebook}
                autoCapitalize='none' />
            </CardSection>
            <CardSection>
              <Input
                icon          ="logo-twitter"
                placeholder   ="Twitter"
                onChangeText  ={(twitter) => this.setState({twitter})}
                value         ={this.state.twitter}
                autoCapitalize='none' />
            </CardSection>
            <CardSection>
              <Input
                icon          ="logo-instagram"
                placeholder   ="Instagram"
                onChangeText  ={(instagram) => this.setState({instagram})}
                value         ={this.state.instagram}
                autoCapitalize='none'  />
            </CardSection>
            <CardSection>
              <Input
                icon          ="logo-linkedin"
                placeholder   ="Linkedin"
                onChangeText  ={(linkedin) => this.setState({linkedin})}
                value         ={this.state.linkedin}
                autoCapitalize='none'  />
            </CardSection>
            <CardSection>
              <Input
                icon          ="logo-skype"
                placeholder   ="Skype"
                onChangeText  ={(skype) => this.setState({skype})}
                value         ={this.state.skype}
                autoCapitalize='none'  />
            </CardSection>
          </Card>
        </ModalWrapper>

        <ModalWrapper
          isVisible={this.state.isContactVisible}
          title="Contact Info"
          onSave={this.saveContact.bind(this)}
          onHide={() => this.setState({ isContactVisible: false, email: this.state.user.email, phone: this.state.user.phone })} >
          <Card>
            <CardSection>
              <Input
                icon="ios-mail"
                placeholder="E-mail address"
                onChangeText={(email) => this.setState({email})}
                value={this.state.email} />
            </CardSection>
            <CardSection>
              <Input
                icon="ios-call"
                placeholder="Phone number"
                onChangeText={(phone) => this.setState({phone})}
                value={this.state.phone} />
            </CardSection>
          </Card>
        </ModalWrapper>

        <ModalWrapper
          isVisible={this.state.isAnniversaryVisible}
          title="Anniversary"
          onSave={this.saveAnniversary.bind(this)}
          onHide={() => this.setState({ isAnniversaryVisible: false, birthday: this.state.user.anniversary.birthday, firstDay: this.state.user.anniversary.firstDay })} >
          <Card>
            <CardSection>
              <Icon style={styles.iconStyle} name="birthday-cake" size={23} color="#98bce1"/>
              <DatePicker
                style         ={styles.datePicker}
                value         ={this.state.birthday}
                date          ={this.state.birthday}
                mode          ="date"
                placeholder   ="Birthday"
                format        ="YYYY-MM-DD"
                confirmBtnText="Yes"
                cancelBtnText ="No"
                onDateChange  ={(birthday) => this.setState({birthday})}
              />
            </CardSection>
            <CardSection>
              <Icon style={styles.iconStyle} name="briefcase" size={23} color="#98bce1"/>
              <DatePicker
                style         ={styles.datePicker}
                value         ={this.state.firstDay}
                date          ={this.state.firstDay}
                mode          ="date"
                placeholder   ="Work anniversary"
                format        ="YYYY-MM-DD"
                confirmBtnText="Yes"
                cancelBtnText ="No"
                onDateChange  ={(firstDay) => this.setState({firstDay})}
              />
            </CardSection>
          </Card>
        </ModalWrapper>

        <ModalWrapper
          isVisible={this.state.isFamilyVisible}
          title="Family"
          onSave={this.saveFamily.bind(this)}
          onHide={() => this.setState({ isFamilyVisible: false, member: this.state.info.family.member, child: this.state.info.family.children, childNumber: this.state.info.family.children.length })} >
          <Card>
            <CardSection>
              <Input
                icon        ='ios-heart'
                placeholder ="Firstame /Husband or Wife/"
                style       ={styles.inputStyle}
                onChangeText={(member) => this.setState({member})}
                value       ={this.state.member}
              />
            </CardSection>
            {this.renderChildren()}
            <CardSection style={{ alignSelf: 'flex-end', marginRight: 20}}>
              <TouchableOpacity style={{flexDirection: 'row'}} onPress={() => this.setState({ childNumber: this.state.childNumber + 1 })}>
                <Icon name="plus" size={15} color="#555"/>
                <Text>Add child</Text>
              </TouchableOpacity>
            </CardSection>
          </Card>
        </ModalWrapper>

        <ModalWrapper
          isVisible={this.state.isMoreVisible}
          title="More Information"
          onSave={this.saveMoreInfo.bind(this)}
          onHide={() => this.setState({ isMoreVisible: false, more: this.state.info.info })}>
          <Card>
            <CardSection>
              <TextInput
                placeholder  ="More information about you..."
                onChangeText ={(more) => this.setState({more})}
                value        ={this.state.more}
                style        ={styles.textInputLong}
                multiline    = {true}
                numberOfLines= {4}
                autoCorrect  = {false}
              />
            </CardSection>
          </Card>
        </ModalWrapper>

        <ModalWrapper
          isVisible={this.state.isInterestVisible}
          title="Interest"
          onSave={this.saveInterest.bind(this)}
          onHide={() => this.setState({ isInterestVisible: false, interest: this.state.info.interest })}>
          <Card>
            <CardSection>
              <TextInput
                placeholder  ="Write about your hobby..."
                onChangeText ={(interest) => this.setState({interest})}
                value        ={this.state.interest}
                style        ={styles.textInputLong}
                multiline    = {true}
                numberOfLines= {4}
                autoCorrect  = {false}
              />
            </CardSection>
          </Card>
        </ModalWrapper>

        <ModalWrapper
          isVisible={this.state.isFavouriteVisible}
          title="Favourite things"
          onSave={this.saveFavourites.bind(this)}
          onHide={() =>
            this.setState({
              isFavouriteVisible: false,
              drink: this.state.info.favourite.drink,
              food : this.state.info.favourite.food,
              snack: this.state.info.favourite.snack,
              music: this.state.info.favourite.music,
              sport: this.state.info.favourite.sport
            })}>
          <Card>
            <CardSection>
              <Input
                icon          ="ios-beer"
                placeholder   ="Drinks"
                onChangeText  ={(drink) => this.setState({drink})}
                value         ={this.state.drink}
                autoCapitalize='none' />
            </CardSection>
            <CardSection>
              <Input
                icon          ="ios-pizza"
                placeholder   ="Foods"
                onChangeText  ={(food) => this.setState({food})}
                value         ={this.state.food}
                autoCapitalize='none' />
            </CardSection>
            <CardSection>
              <Input
                icon          ="logo-apple"
                placeholder   ="Snacks"
                onChangeText  ={(snack) => this.setState({snack})}
                value         ={this.state.snack}
                autoCapitalize='none' />
            </CardSection>
            <CardSection>
              <Input
                icon          ="ios-headset"
                placeholder   ="Music"
                onChangeText  ={(music) => this.setState({music})}
                value         ={this.state.music}
                autoCapitalize='none' />
            </CardSection>
            <CardSection>
              <Input
                icon          ="ios-basketball"
                placeholder   ="Sport"
                onChangeText  ={(sport) => this.setState({sport})}
                value         ={this.state.sport}
                autoCapitalize='none' />
            </CardSection>
          </Card>
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

  openPicker(){
      const options = {
        title: 'Зурагаа сонгоно уу',
        storageOptions: {
          skipBackup: true,
          path: 'profileImg'
        }
      }
      ImagePicker.showImagePicker(options, (response) => {
        if(response.didCancel){
          console.log('User canccelled')
        } else if (response.error){
          console.log('Error' + response.error)
        } else if(response.customButton){
          console.log('custom'+ response.customButton)
        } else {
            this.setState({
              imagePath: response.uri,
              imageHeight: response.height,
              imageWidth: response.width
            })
        }
      })
  }

  renderContent() {
    if (this.state.loadingUser || this.state.loadingInfo)
      return <Spinner/>

    const userProp = this.state.user;
    const infoProp = this.state.info; 
    return (
      <ScrollView style={{ marginBottom:60 }}>
        <View style={styles.mainStyle}>
          { ( this.props.currentUser) ?
            <TouchableOpacity onPress={() => this.setState({ isProfileImageVisible: true })}>
              { userProp.profileImg ?  <Image source={{uri: userProp.profileImg}} style={styles.profileImage} /> :
                <Image source={images.avatarAdd} style={styles.profileImage} />
              } 
            </TouchableOpacity> :
            <TouchableOpacity onPress={() => this.setState({ isBigImage: true })}>
              { userProp.profileImg ?  <Image source={{uri: userProp.profileImg}} style={styles.profileImage} /> :
                <Image source={images.avatarAdd} style={styles.profileImage} />
              } 
            </TouchableOpacity> 
         }
          <View style={styles.namePart}>
            <View style={styles.nameFlex}>
              <Text style={styles.generalText}>Name:</Text>
              <Text style={styles.userName}>{userProp.firstName} {userProp.lastname}</Text>
            </View>
            <View style={styles.nameFlex}>
              <Text style={styles.generalText}>Position:</Text>
              <Text style={styles.position}>{userProp.position}</Text>
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
                  ( this.props.currentUser)
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
                  ( this.props.currentUser)
                    ? <Icon name="pencil-square-o" size={23} color="#000" style={styles.icon} onPress={() => this.setState({ isGenderVisible: true })}/>
                    : null
                }
              </View>
            </View>
          </View>
        </View>

        <View style={styles.mainStyle}>
          <View style={styles.center}>
            <TouchableOpacity onPress={this.OnPhonePress.bind(this)}>
              <Icon name="phone-square" size={42} color="#a8dc6f" style={{marginRight: 15}} />
            </TouchableOpacity>
            <TouchableOpacity onPress={this.OnTextPress.bind(this)}>
              <Icon name="envelope" size={42} color="#dca36f" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.columnStyle}>
          <View style={styles.mainTitle}>
            <Text style={styles.mainTitleText}>Social accounts</Text>
            {
              ( this.props.currentUser)
                ? <Icon name="pencil-square-o" size={23} color="#000" style={styles.icon} onPress={() => this.setState({ isSocialVisible: true })}/>
                : null
            }
          </View>
          {this.renderSocialIcons(userProp, infoProp)}

          <View style={styles.mainTitle}>
            <Text style={styles.mainTitleText}>Contact Info</Text>
            {
              ( this.props.currentUser)
                ? <Icon name="pencil-square-o" size={23} color="#000" style={styles.icon} onPress={() => this.setState({ isContactVisible: true })}/>
                : null
            }
            
          </View>
          <View style={styles.mainContent}>
             {
                userProp.email &&
                <View style={styles.mainContainerStyle}>
                  <Icon style={styles.contentIconStyle} name="envelope" size={14} color="#333"/>
                  <Text style={styles.contentIconStyle}>{userProp.email}</Text>
                </View>
              }
            {
              userProp.phone &&
              <View style={styles.mainContainerStyle}>
                <Icon style={styles.contentIconStyle} name="phone-square" size={18} color="#333"/>
                <Text style={styles.contentIconStyle}>{userProp.phone}</Text>
              </View>
             }
          </View>

          <View style={styles.mainTitle}>
            <Text style={styles.mainTitleText}>Anniversary</Text>
            {
              ( this.props.currentUser)
                ? <Icon name="pencil-square-o" size={23} color="#000" style={styles.icon} onPress={() => this.setState({ isAnniversaryVisible: true })}/>
                : null
            }
            
          </View>
          <View style={styles.mainContent}>
          {
              userProp.anniversary.birthday &&
            <View style={styles.mainContainerStyle}>
              <Icon style={styles.contentIconStyle} name="birthday-cake" size={14} color="#333"/>
              <Text style={styles.contentIconStyle}>{userProp.anniversary.birthday}</Text>
            </View>
          }
          {
              userProp.anniversary.firstDay &&
            <View style={styles.mainContainerStyle}>
              <Icon style={styles.contentIconStyle} name="briefcase" size={14} color="#333"/>
              <Text style={styles.contentIconStyle}>{userProp.anniversary.firstDay}</Text>
            </View>
          }
          </View>
          <View style={styles.mainTitle}>
            <Text style={styles.mainTitleText}>Family</Text>
            {
              ( this.props.currentUser)
                ? <Icon name="pencil-square-o" size={23} color="#000" style={styles.icon} onPress={() => this.setState({ isFamilyVisible: true })}/>
                : null
            }
            
          </View>
          <View style={styles.mainContent}>
            <View style={styles.mainContainerStyle}>
              {
                (infoProp.family && infoProp.family.member)
                  ? 
                  <View style={styles.btnContainer}>
                    <Icon style={styles.contentIconStyle} name="heart" size={14} color="#333"/>
                    <Text style={styles.contentIconStyle}>{infoProp.family.member}</Text>
                  </View>
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
              ( this.props.currentUser)
                ? <Icon name="pencil-square-o" size={23} color="#000" style={styles.icon} onPress={() => this.setState({ isFavouriteVisible: true })}/>
                : null
            }
          </View>
          <View style={styles.mainContent}>
            <View style={styles.mainContainerStyle}>
             {
                (infoProp.favourite && infoProp.favourite.drink) ?
                <View style={styles.btnContainer}>
                  <Icon style={styles.contentIconStyle} name="coffee" size={14} color="#333"/>
                  <Text style={styles.contentIconStyle}>{infoProp.favourite.drink}</Text>
                </View> : null
              } 
            </View>
            <View style={styles.mainContainerStyle}>
             {
               ( infoProp.favourite && infoProp.favourite.food) ? 
              <View style={styles.btnContainer}>
                <Icon style={styles.contentIconStyle} name="cutlery" size={14} color="#333"/> 
                <Text style={styles.contentIconStyle}>{infoProp.favourite.food}</Text>
              </View> : null 
              }
            </View>
            <View style={styles.mainContainerStyle}>
              {
                (infoProp.favourite && infoProp.favourite.snack) ?
              <View style={styles.btnContainer}>
                <Icon style={styles.contentIconStyle} name="apple" size={14} color="#333"/> 
                <Text style={styles.contentIconStyle}>{infoProp.favourite.snack}</Text>
              </View> : null
              }
            </View>
            <View style={styles.mainContainerStyle}>
              {
                (infoProp.favourite && infoProp.favourite.music) ?
              <View style={styles.btnContainer}>
                <Icon style={styles.contentIconStyle} name="headphones" size={14} color="#333"/> 
                <Text style={styles.contentIconStyle}>{infoProp.favourite.music}</Text>
              </View> : null
              } 
            </View> 
            <View style={styles.mainContainerStyle}>
              {
                (infoProp.favourite && infoProp.favourite.sport) ?
              <View style={styles.btnContainer}>
                <Icon style={styles.contentIconStyle} name="futbol-o" size={14} color="#333"/> 
                <Text style={styles.contentIconStyle}>{infoProp.favourite.sport}</Text>
              </View> : null
              }
            </View>
          </View>

          <View style={styles.mainTitle}>
            <Text style={styles.mainTitleText}>Interest</Text>
            {
              ( this.props.currentUser)
                ? <Icon name="pencil-square-o" size={23} color="#000" style={styles.icon} onPress={() => this.setState({ isInterestVisible: true })}/>
                : null
            }
            
          </View>
          <View style={styles.mainContent}>
            <View style={styles.mainContainerStyle}>
              {
                infoProp.interest ?
                <View style={styles.btnContainer}>
                  <Icon style={styles.contentIconStyle} name="globe" size={14} color="#333"/> 
                  <Text style={styles.contentIconStyle}>{infoProp.interest}</Text>
                </View> : null
              }
            </View>
          </View>
          <View style={styles.mainTitle}>
            <Text style={styles.mainTitleText}>More Information</Text>
            {
              ( this.props.currentUser)
                ? <Icon name="pencil-square-o" size={23} color="#000" style={styles.icon} onPress={() => this.setState({ isMoreVisible: true })}/>
                : null
            }
            
          </View>
          <View style={styles.mainContent}>
            <View style={styles.mainContainerStyle}>
              {
                infoProp.info ? 
                <View style={styles.btnContainer}>
                  <Icon style={styles.contentIconStyle} name="info" size={14} color="#333"/> 
                  <Text style={styles.contentIconStyle}>{infoProp.info}</Text>
                </View> : null
              }
            </View>
          </View> 
        </View>
      </ScrollView>
    );
  }

  editContact(){
    Actions.editContact({
      uid: this.props.uid
    });
  }

  render() {
    return (
      <View style={{backgroundColor: '#eee', height: Height }}>
        {this.header()}
        {this.renderContent()}
        {
          (!this.state.loadingUser && !this.state.loadingInfo)  ? this.renderWrappers() : null
        }
        {
          this.props.isAdmin &&
          <EditButton
            onEditPress={this.editContact.bind(this)}/>
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
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 26,
    margin: 10,
  },
  textInput: {
    flex: 1,
    height: 35,
    paddingVertical: 0,
    justifyContent: 'flex-start',
    fontSize: 14
  },
  textInputLong: {
    flexDirection: 'column',
    flex: 1,
    fontSize: 16,
    marginBottom: 7,
    color: '#555'
  },
  errorText: {
    textAlign: 'center',
    color: '#F44336',
    fontSize: 16,
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
    borderWidth: 1,
    resizeMode: 'contain'
  },
  bigImage: {
    height: 350,
    resizeMode: 'contain',
    justifyContent: 'center',
    alignItems: 'center'
  },
  profileImageDetail: {
    width: 100,
    height: 100,
    marginRight: 10,
    borderColor: '#eee',
    borderWidth: 1,
    resizeMode: 'contain'
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
  position: {
    width: 200,
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
  },
  headBtn: {
    width: 80,
  },
  longInput: {
    height: 150,
    flexDirection: 'column',
  },
  ProfileImageContainer: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  profileImageText: {
    color: 'red'
  }
});

export { Contact };
