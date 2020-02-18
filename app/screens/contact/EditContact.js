import React, { Component } from 'react';
import {
  Text,
  View,
  Picker,
  Platform,
  TextInput,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-picker';
import Collapsible from 'react-native-collapsible';
import { Spinner, Structure } from '../common';
import Uploader from '../Uploader';
import { firebase } from '@react-native-firebase/app';
import database from '@react-native-firebase/database';
import images from '../../images';
import DatePicker from 'react-native-datepicker';
import ActionSheet from 'react-native-action-sheet';
import Toast, { DURATION } from 'react-native-easy-toast';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { editContactStyles } from '../styles';
import { ModalWrapper, ModalWrapperClose } from './modal';

const styles = editContactStyles;
const GenderButtons = ['Male', 'Female', 'Cancel'];
let DepartmentButtons = [];
const GENDER_CANCEL_INDEX = 2;
const mValid = [
  { name: 'mFirstname', mError: 'Fill name' },
  { name: 'mRelation', mError: 'Fill relation' },
  { name: 'mBirthday', mError: 'Fill birthday' },
  { name: 'mPhone', mError: 'Fill phone' },
];

class EditContact extends Component {
  constructor(props) {
    super(props);

    this.userRef = null;
    this.userInfoRef = null;
    this.structureRef = null;

    this.state = {
      loadingUser: true,
      loading: true,
      user: null,
      userInfo: null,
      members: [],
      structures: null,
      structure: null,
      basic: false,
      anniversary: false,
      family: false,
      favourite: false,
      hobby: false,
      social: false,
      isFamilyVisible: false,
      isProfileImageVisible: false,
      onEdit: false,
      mError: '',
      mUid: '',
      imagePath: '',
      selectedItems: [],
    };
    this.userRef = this.getRef().child(`users/${this.props.uid}`);
    this.userInfoRef = this.getRef().child(`/userInfo/${this.props.uid}`);
    this.structureRef = this.getRef().child(`structures`);
    this.saveProfileImage = this.saveProfileImage.bind(this);
    this.profileImgVisible = this.profileImgVisible.bind(this);
    this.toggleCollapse = this.toggleCollapse.bind(this);
    this.structurePicker = this.structurePicker.bind(this);
    this.genderPicker = this.genderPicker.bind(this);
    this.openDatePicker = this.openDatePicker.bind(this);
    this.showFamilyModal = this.showFamilyModal.bind(this);
    this.validFamily = this.validFamily.bind(this);
    this.closeComponent = this.closeComponent.bind(this);
  }

  componentDidMount() {
    this.userRef.on('value', this.handleUser);
    this.structureRef.on('value', this.handleQuery);
    this.userInfoRef.on('value', this.handleInfo);
  }

  componentWillUnmount() {
    this.userRef.off('value', this.handleUser);
    this.structureRef.off('value', this.handleQuery);
    this.userInfoRef.off('value', this.handleInfo);
  }

  getRef() {
    return database().ref();
  }

  handleUser = snapshot => {
    val = snapshot.val() || {};
    user = val;

    this.setState({
      lastname: user.lastname,
      phone: user.phone,
      profileImg: user.profileImg,
      isAdmin: user.isAdmin,
      firstName: user.firstName,
      lastname: user.lastname,
      position: user.position,
      parent: user.structure,
      firstDay:
        user.anniversary && user.anniversary.firstDay
          ? user.anniversary.firstDay
          : '',
      birthday:
        user.anniversary && user.anniversary.birthday
          ? user.anniversary.birthday
          : '',
      loadingUser: false,
    });
  };

  handleInfo = snapshot => {
    val = snapshot.val() || {};
    info = val;

    this.setState({
      gender: info && info.gender ? info.gender : '',
      nickname: info && info.nickname ? info.nickname : '',
      drink: info.favourite && info.favourite.drink ? info.favourite.drink : '',
      snack: info.favourite && info.favourite.snack ? info.favourite.snack : '',
      food: info.favourite && info.favourite.food ? info.favourite.food : '',
      music: info.favourite && info.favourite.music ? info.favourite.music : '',
      sport: info.favourite && info.favourite.sport ? info.favourite.sport : '',
      info: info.favourite && info.info ? info.info : '',
      interest: info && info.interest ? info.interest : '',
      facebook: info.social && info.social.facebook ? info.social.facebook : '',
      instagram:
        info.social && info.social.instagram ? info.social.instagram : '',
      linkedin: info.social && info.social.linkedin ? info.social.linkedin : '',
      twitter: info.social && info.social.twitter ? info.social.twitter : '',
      skype: info.social && info.social.skype ? info.social.skype : '',
      members: info && info.family ? info.family : [],
    });
  };

  handleQuery = snapshot => {
    val = snapshot.val();
    this.setState({
      loading: false,
      structures: val,
    });

    // this.setState({ test: val });
    // var items = Object.keys(val).map((s, i) => {
    //   var obj = { id: s, parent: val[s].parent, name: val[s].name };
    //   return obj;
    // });

    // userStructure = items.filter(e => e.id == this.state.parent);
    // obj = Object.assign({}, ...userStructure);

    // this.setState({
    //   loading: false,
    //   structures: items,
    //   structure: obj,
    // });

    // DepartmentButtons = Object.keys(val).map((s, i) => {
    //   return val[s].name;
    // });
    // DepartmentButtons.push('Cancel');
  };

  closeComponent() {
    Actions.pop({ refresh: { structure: this.state.structure } });
  }

  profileImgVisible() {
    this.setState({
      isProfileImageVisible: true,
    });
  }

  focusInput(name) {
    this.refs[name].focus();
  }

  saveProfileImage() {
    if (this.state.imagePath) {
      try {
        this.setState({ loading: true });
        Uploader.uploadImage(
          this.state.imagePath,
          'image/jpeg',
          `${this.props.uid}.jpg`,
        )
          .then(responseData => {
            this.userRef.update({ profileImg: responseData });
          })
          .done(() => {
            this.setState({
              loading: false,
              isProfileImageVisible: false,
            });
          });
      } catch (error) { }
    }
  }

  openPicker() {
    const options = {
      title: 'Upload your image',
      storageOptions: {
        skipBackup: true,
        path: 'profileImg',
      },
      maxWidth: 200,
      maxHeight: 200,
    };
    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
      } else if (response.error) {
      } else if (response.customButton) {
      } else {
        this.setState({
          imagePath: response.uri,
          imageHeight: 200,
          imageWidth: 200,
        });
      }
    });
  }

  openDatePicker(ref) {
    this.refs[ref].onPressDate();
  }

  isValid({ name, mError }) {
    if (this.state[name].length === 0 || !this.state[name]) {
      this.setState({ mError });
      return false;
    }
    return true;
  }

  validFamily = () => {
    if (!mValid.find(item => !this.isValid(item))) {
      this.setState({ mError: '', family: false });
      this.updateFamily();
    }
  };

  updateFamily() {
    let obj = {
      name: this.state.mFirstname,
      relation: this.state.mRelation,
      birthday: this.state.mBirthday,
      phone: this.state.mPhone,
    };

    !this.state.onEdit
      ? this.userInfoRef.child('family').push(obj)
      : this.userInfoRef.child(`/family/${this.state.mUid}`).update(obj);

    this.setState({ isFamilyVisible: false });
  }

  onEdit = (member, uid) => {
    this.setState({
      mError: '',
      mFirstname: member.name,
      mRelation: member.relation,
      mBirthday: member.birthday,
      mPhone: member.phone,
      isFamilyVisible: true,
      onEdit: true,
      mUid: uid,
    });
  };

  deleteFamily = () => {
    this.userInfoRef.child(`/family/${this.state.mUid}`).remove();
    this.setState({
      isFamilyVisible: false,
      family: false,
      mUid: '',
      onEdit: false,
      onDelete: false,
    });
  };

  showFamilyModal = () => {
    this.setState({
      mFirstname: '',
      mRelation: '',
      mPhone: '',
      mBirthday: '',
      mError: '',
      onEdit: false,
    });
    this.setState({ isFamilyVisible: !this.state.isFamilyVisible });
  };

  structurePicker() {
    ActionSheet.showActionSheetWithOptions(
      {
        options: DepartmentButtons,
        cancelButtonIndex: DepartmentButtons.lastIndexOf('Cancel'),
        tintColor: '#2A8AED',
      },
      index => {
        this.state.structures.filter(obj => {
          if (obj.name == DepartmentButtons[index]) {
            this.setState({ structure: obj });
            this.updateStructure(obj.id);
          }
        });
      },
    );
  }

  genderPicker() {
    ActionSheet.showActionSheetWithOptions(
      {
        options: GenderButtons,
        cancelButtonIndex: GENDER_CANCEL_INDEX,
        tintColor: '#2A8AED',
      },
      index => {
        if (index != 2) {
          this.setState({ gender: GenderButtons[index] });
          this.updateField({
            ref: this.userInfoRef,
            key: 'gender',
            name: 'gender',
            label: 'Gender:',
          });
        }
      },
    );
  }

  toggleCollapse = name => {
    this.setState({
      basic: false,
      anniversary: false,
      family: false,
      favourite: false,
      hobby: false,
      social: false,
    });
    this.setState({ [name]: !this.state[name] });
  };

  updateField = ({ ref, key, name, label }) => {
    ref.update({
      [key]: this.state[name],
    });
    Keyboard.dismiss();
    this.refs.toast.show(label.slice(0, -1) + ' updated', 800);
  };

  updateDate = ({ ref, key, date, name, label }) => {
    this.setState({ [name]: date });
    ref.update({
      [key]: date,
    });
    this.refs.toast.show(label.slice(0, -1) + ' updated', 800);
  };

  updateStructure = structure => {
    this.userRef.update({
      structure: structure,
    });
    this.refs.toast.show('Department updated', 800);
  };

  renderWrappers() {
    return (
      <View>
        <ModalWrapper
          isVisible={this.state.isProfileImageVisible}
          title="Profile Image"
          onSave={this.saveProfileImage}
          onHide={() =>
            this.setState({ isProfileImageVisible: false, profileImg: '' })
          }>
          <TouchableOpacity
            onPress={() => this.openPicker()}
            style={styles.ProfileImageContainer}>
            {this.state.imagePath ? (
              <Image
                style={styles.profileImageDetail}
                source={{ uri: this.state.imagePath }}
                value={this.state.imagePath}
                onChangeImage={profileImg => this.setState({ profileImg })}
              />
            ) : (
                <View style={styles.ProfileImageContainer}>
                  <Text style={styles.profileImageText}>
                    Click here to upload image
                </Text>
                </View>
              )}
          </TouchableOpacity>
        </ModalWrapper>

        <ModalWrapper
          isVisible={this.state.isFamilyVisible}
          title="Family"
          onSave={this.validFamily}
          onDelete={this.deleteFamily}
          onEdit={this.state.onEdit}
          onHide={() => this.setState({ isFamilyVisible: false })}>
          <View style={styles.mFieldContainer}>
            {this.mField({ label: 'Name:', name: 'mFirstname' })}
            {this.mField({ label: 'Relation:', name: 'mRelation' })}
            {this.mField({ label: 'Phone:', name: 'mPhone' })}
            <View style={styles.mContainer}>
              <Text style={styles.mLabel}>Birthday:</Text>
              <DatePicker
                style={{ height: 30 }}
                customStyles={{
                  dateInput: {
                    alignItems: 'flex-start',
                    marginLeft: 20,
                    borderWidth: 0,
                    marginBottom: 15,
                  },
                  dateText: styles.mInputDate,
                  placeholderText: styles.mPlaceholder,
                }}
                date={this.state.mBirthday}
                minDate="1900-01-01"
                maxDate={new Date().toISOString()}
                placeholder="Select a date"
                mode="date"
                showIcon={false}
                format="YYYY-MM-DD"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                onDateChange={mBirthday => this.setState({ mBirthday })}
              />
            </View>
            {this.showError()}
          </View>
        </ModalWrapper>
      </View>
    );
  }

  showError() {
    if (this.state.mError.length > 0) {
      return <Text style={styles.error}>{this.state.mError}</Text>;
    } else {
      return null;
    }
  }

  mField({ label, name }) {
    return (
      <View style={styles.mContainer}>
        <Text style={styles.mLabel}>{label}</Text>
        <TextInput
          style={styles.mInputStyle}
          autoCorrect={false}
          onChangeText={val => this.setState({ [name]: val })}
          underlineColorAndroid="transparent"
          value={this.state[name]}
        />
      </View>
    );
  }

  renderFamilyMembers() {
    let members = Object.keys(this.state.members).map((s, i) => {
      return (
        <View key={i} style={styles.accordianContent}>
          <View style={styles.fieldContainer}>
            <View style={styles.memberContainer}>
              <Text style={styles.relationLabel}>
                {this.state.members[s].relation}
              </Text>
              <Text style={styles.phoneLabel}>
                {this.state.members[s].phone}
              </Text>
            </View>

            <View style={styles.memberContainer}>
              <Text style={styles.nameLabel}>{this.state.members[s].name}</Text>
              <Text style={styles.birthdayLabel}>
                {this.state.members[s].birthday}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.circleEdit}
            onPress={() => this.onEdit(this.state.members[s], s)}>
            <Icon name="md-create" color="#FFF" size={15} />
          </TouchableOpacity>
        </View>
      );
    });

    return members;
  }

  renderProfileImg() {
    if (this.state.loadingUser) return;
    if (this.state.profileImg) {
      return (
        <Image
          source={{ uri: this.state.profileImg }}
          style={styles.profileImg}
        />
      );
    } else {
      return <Image source={images.avatar} style={styles.profileImg} />;
    }
  }

  renderHeader() {
    return (
      <View style={styles.header}>
        <TouchableOpacity onPress={this.closeComponent} style={styles.close}>
          <Icon name="md-close" size={30} color="#000" />
        </TouchableOpacity>
        <View style={styles.imgContainer}>
          {this.renderProfileImg()}
          <TouchableOpacity
            style={styles.circle}
            onPress={this.profileImgVisible}>
            <Icon name="md-create" color="#FFF" size={15} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  showArrowIcon(collapse) {
    let icon = collapse ? 'ios-arrow-up' : 'ios-arrow-down';
    return <Icon name={icon} size={30} color="#555" />;
  }

  renderSection({ title, collapse, index }) {
    return (
      <TouchableWithoutFeedback
        key={index}
        onPress={() => this.toggleCollapse(collapse)}>
        <View style={styles.accordionHeader}>
          <Text style={styles.accordianTitle}>{title}</Text>
          <TouchableOpacity onPress={() => this.toggleCollapse(collapse)}>
            {this.showArrowIcon(this.state[collapse])}
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    );
  }

  renderField({ label, name, ref, key }) {
    return (
      <View style={styles.accordianContent}>
        <View style={styles.fieldContainer}>
          <Text style={styles.labelStyle}>{label}</Text>
          <TextInput
            ref={name}
            blurOnSubmit={false}
            autoCorrect={false}
            style={styles.inputStyle}
            underlineColorAndroid="transparent"
            onSubmitEditing={() =>
              this.updateField({
                ref: ref,
                key: key ? key : name,
                name: name,
                label: label,
              })
            }
            onChangeText={value => this.setState({ [name]: value })}
            value={this.state[name]}
          />
        </View>
        <TouchableOpacity
          style={styles.circleEdit}
          onPress={() => this.focusInput(name)}>
          <Icon name="md-create" color="#FFF" size={15} />
        </TouchableOpacity>
      </View>
    );
  }

  onSelectedItemsChange = (selectedItems) => {
    if (selectedItems.length > 0)
      this.setState({ parent: selectedItems[0], selectedItems: selectedItems });
  };

  renderPicker({ label, name, action }) {
    return (
      <View style={styles.accordianContent}>
        <View style={styles.fieldContainer}>
          <Text style={styles.labelStyle}>{label}</Text>
          {name == 'structure'
            ?
            <Structure
              onSelectedItemsChange={this.onSelectedItemsChange}
              selectedItems={this.state.selectedItems}
              structures={this.state.structures}
            />
            :
            <Text style={styles.regularText}>
              {this.state.gender}
            </Text>
          }

        </View>
        <TouchableOpacity style={styles.circleEdit} onPress={action}>
          <Icon name="md-create" color="#FFF" size={15} />
        </TouchableOpacity>
      </View>
    );
  }

  renderDate({ label, name, ref, key }) {
    return (
      <View style={styles.accordianContent}>
        <View style={styles.fieldContainer}>
          <Text style={styles.labelStyle}>{label}</Text>
          <DatePicker
            ref={name}
            customStyles={{
              dateInput: {
                alignItems: 'flex-start',
                borderWidth: 0,
              },
              dateText: styles.inputStyle,
            }}
            date={this.state[name]}
            mode="date"
            dateText={styles.inputStyle}
            placeholder="Select a date"
            showIcon={false}
            format="YYYY-MM-DD"
            minDate="1940-01-01"
            maxDate={new Date().toISOString()}
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            onDateChange={val =>
              this.updateDate({
                ref: ref,
                date: val,
                name: name,
                label: label,
                key: key,
              })
            }
          />
        </View>
        <TouchableOpacity
          style={styles.circleEdit}
          onPress={() => this.openDatePicker(name)}>
          <Icon name="md-create" color="#FFF" size={15} />
        </TouchableOpacity>
      </View>
    );
  }

  basic(i) {
    let sectionTitle = this.renderSection({
      title: 'Basic Info',
      collapse: 'basic',
      index: i,
    });
    let sectionBody = (
      <Collapsible
        key={i + 1}
        align="center"
        style={styles.collapseView}
        collapsed={!this.state.basic}>
        {this.renderField({
          label: 'Last name:',
          name: 'lastname',
          ref: this.userRef,
        })}
        {this.renderField({
          label: 'First name:',
          name: 'firstName',
          ref: this.userRef,
        })}
        {this.renderField({
          label: 'Position:',
          name: 'position',
          ref: this.userRef,
        })}
        {this.renderField({
          label: 'Phone:',
          name: 'phone',
          ref: this.userRef,
        })}
        {this.renderField({
          label: 'Nickname:',
          name: 'nickname',
          ref: this.userInfoRef,
        })}
        {this.renderPicker({
          label: 'Department:',
          name: 'structure',
          // action: this.structurePicker,
        })}
        {this.renderPicker({
          label: 'Gender:',
          name: 'gender',
          action: this.genderPicker,
        })}
      </Collapsible>
    );
    return [sectionTitle, sectionBody];
  }

  anniversary(i) {
    let sectionTitle = this.renderSection({
      title: 'Anniversary',
      collapse: 'anniversary',
      index: i,
    });
    let sectionBody = (
      <Collapsible
        key={i + 1}
        align="center"
        style={styles.collapseView}
        collapsed={!this.state.anniversary}>
        {this.renderDate({
          label: 'First Day:',
          name: 'firstDay',
          key: 'anniversary/firstDay',
          ref: this.userRef,
        })}
        {this.renderDate({
          label: 'Birthday:',
          name: 'birthday',
          key: 'anniversary/birthday',
          ref: this.userRef,
        })}
      </Collapsible>
    );
    return [sectionTitle, sectionBody];
  }

  family(i) {
    let sectionTitle = this.renderSection({
      title: 'Family',
      collapse: 'family',
      index: i,
    });
    let sectionBody = (
      <Collapsible
        key={i + 1}
        align="center"
        style={styles.collapseView}
        collapsed={!this.state.family}>
        {this.renderFamilyMembers()}
        <TouchableOpacity
          style={styles.addMemberBtn}
          onPress={this.showFamilyModal}>
          <Text style={styles.btnTextMember}>Add Member</Text>
        </TouchableOpacity>
      </Collapsible>
    );
    return [sectionTitle, sectionBody];
  }

  favourite(i) {
    let sectionTitle = this.renderSection({
      title: 'Favourite Things',
      collapse: 'favourite',
      index: i,
    });
    let sectionBody = (
      <Collapsible
        key={i + 1}
        align="center"
        collapsed={!this.state.favourite}
        style={styles.collapseView}>
        {this.renderField({
          label: 'Drinks:',
          name: 'drink',
          ref: this.userInfoRef,
          key: 'favourite/drink',
        })}
        {this.renderField({
          label: 'Food:',
          name: 'food',
          ref: this.userInfoRef,
          key: 'favourite/food',
        })}
        {this.renderField({
          label: 'Snack:',
          name: 'snack',
          ref: this.userInfoRef,
          key: 'favourite/snack',
        })}
        {this.renderField({
          label: 'Music:',
          name: 'music',
          ref: this.userInfoRef,
          key: 'favourite/music',
        })}
        {this.renderField({
          label: 'Sport:',
          name: 'sport',
          ref: this.userInfoRef,
          key: 'favourite/sport',
        })}
      </Collapsible>
    );
    return [sectionTitle, sectionBody];
  }

  hobby(i) {
    let sectionTitle = this.renderSection({
      title: 'Hobby',
      collapse: 'hobby',
      index: i,
    });
    let sectionBody = (
      <Collapsible
        key={i + 1}
        align="center"
        collapsed={!this.state.hobby}
        style={styles.collapseView}>
        {this.renderField({
          label: 'Interest:',
          name: 'interest',
          ref: this.userInfoRef,
        })}
        {this.renderField({
          label: 'More Information:',
          name: 'info',
          ref: this.userInfoRef,
        })}
      </Collapsible>
    );
    return [sectionTitle, sectionBody];
  }

  social(i) {
    let sectionTitle = this.renderSection({
      title: 'Social Accounts',
      collapse: 'social',
      index: i,
    });
    let sectionBody = (
      <Collapsible
        key={i + 1}
        align="center"
        collapsed={!this.state.social}
        style={styles.collapseView}>
        {this.renderField({
          label: 'Facebook ID:',
          name: 'facebook',
          ref: this.userInfoRef,
          key: 'social/facebook',
        })}
        {this.renderField({
          label: 'Instagram ID:',
          name: 'instagram',
          ref: this.userInfoRef,
          key: 'social/instagram',
        })}
        {this.renderField({
          label: 'LinkedIn ID:',
          name: 'linkedin',
          ref: this.userInfoRef,
          key: 'social/linkedin',
        })}
        {this.renderField({
          label: 'Skype ID:',
          name: 'skype',
          ref: this.userInfoRef,
          key: 'social/skype',
        })}
        {this.renderField({
          label: 'Twitter ID:',
          name: 'twitter',
          ref: this.userInfoRef,
          key: 'social/twitter',
        })}
      </Collapsible>
    );
    return [sectionTitle, sectionBody];
  }

  getSections() {
    sectionVal = [];
    arr = ['basic', 'anniversary', 'family', 'favourite', 'hobby', 'social'];
    for (i = 0; i < 6; i++) {
      let val = this[arr[i]](i);
      sectionVal.push(val);
    }
    let sections = Object.keys(sectionVal).map((s, i) => {
      return sectionVal[s];
    });
    return sections;
  }

  render() {
    if (this.state.loading || this.state.loadingUser) return <Spinner />;
    let sections = this.getSections();
    return (
      <KeyboardAwareScrollView behavior="padding" style={styles.mainContainer}>
        {this.renderHeader()}
        {!this.state.loading ? this.renderWrappers() : null}
        {sections}
        <Toast
          ref="toast"
          style={styles.toast}
          textStyle={styles.toastText}
          positionValue={60}
        />
      </KeyboardAwareScrollView>
    );
  }
}

export { EditContact };
