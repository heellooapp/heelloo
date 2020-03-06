import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  Dimensions,
  Platform,
  ScrollView,
  FlatList,
  Keyboard,
} from 'react-native';
import { anniversaryListStyles } from '../../styles';
import { Actions } from 'react-native-router-flux';
import Communications from 'react-native-communications';
import { SwipeListView } from 'react-native-swipe-list-view';
import { Spinner, Search } from '../../common';
import images from '../../images';
import { firebase } from '../../config';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const styles = anniversaryListStyles;
const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
let currentDate = new Date();

class AnniversaryList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      anniversaryList: '',
      loading: true,
      today: false,
      db: [],
      searchValue: '',
      toggleSearchValue: false,
    };

    this.usersRef = this.getRef().child('users');
  }

  componentWillUnmount() {
    this.usersRef.off('value', this.handleUsers);
  }

  getRef() {
    return firebase.database().ref();
  }

  componentDidMount() {
    this.usersRef.on('value', this.handleUsers);
  }

  handleUsers = snapshot => {
    val = snapshot.val() || {};

    usersArray = this.setUsersArray(val);
    sortedContacts = this.sortContactsByDate(usersArray);

    this.setState({
      db: sortedContacts,
      anniversaryList: sortedContacts,
    });

    this.isLoading(false);
  };

  toggleSearch = () => {
    this.setState({
      searchValue: '',
      toggleSearchValue: !this.state.toggleSearchValue,
    });
    this.onSearch('');
  };

  onSearch(searchValue) {
    this.setState({ searchValue });
    let filteredData = this.filterNotes(searchValue, this.state.db);

    this.setState({
      anniversaryList: filteredData,
    });
  }

  filterNotes(searchValue, notes) {
    let text = searchValue.toString().toLowerCase();
    return notes.filter((n, i) => {
      let note = n.firstName.toString().toLowerCase();
      return note.match(text);
    });
  }

  checkAnniversary(ad) {
    if (
      ad.getMonth() === currentDate.getMonth() &&
      ad.getDate() === currentDate.getDate() &&
      currentDate.getFullYear() > ad.getFullYear()
    ) {
      return [true, currentDate.getFullYear() - ad.getFullYear()];
    }
    return [false, currentDate.getFullYear() - ad.getFullYear()];
  }

  checkBirthday(bd) {
    return [
      bd.getMonth() === currentDate.getMonth() &&
      bd.getDate() === currentDate.getDate(),
      currentDate.getFullYear() - bd.getFullYear(),
    ];
  }

  sortContactsByDate(val) {
    contactList = JSON.parse(JSON.stringify(val));
    let month = currentDate.getMonth();
    let day = currentDate.getDate();
    let year = currentDate.getFullYear();

    filteredData = contactList.filter(list => {
      let ad = new Date(list.anniversary.firstDay);
      let bd = new Date(list.anniversary.birthday);

      if (
        (ad.getFullYear() < year &&
          ad.getMonth() == month &&
          ad.getDate() >= day) ||
        (bd.getMonth() == month && bd.getDate() >= day)
      ) {
        return true;
      }
      return false;
    });

    filteredData.map(obj => {
      let ad = new Date(obj.anniversary.firstDay);
      let bd = new Date(obj.anniversary.birthday);

      valuesAd = this.checkAnniversary(ad);
      obj.isWork = valuesAd[0];
      obj.isWorkYears = valuesAd[1] || 0;

      valuesBd = this.checkBirthday(bd);
      obj.isBirthday = valuesBd[0];
      obj.isAge = valuesBd[1] || 0;
    });

    filteredData.sort((a, b) => {
      let ad, bd;
      if (a.isWork) {
        ad = new Date(a.anniversary.firstDay);
      } else {
        ad = new Date(a.anniversary.birthday);
      }
      if (b.isWork) {
        bd = new Date(b.anniversary.firstDay);
      } else {
        bd = new Date(b.anniversary.birthday);
      }
      ad.setFullYear(1970);
      bd.setFullYear(1970);

      return new Date(ad) - new Date(bd);
    });

    let today = new Date();
    today.setFullYear(1970);
    today.setHours(0, 0, 0, 0);
    for (var i = 0; i < filteredData.length; i++) {
      if (filteredData[0].isWork) {
        first = new Date(filteredData[0].anniversary.firstDay);
      } else {
        first = new Date(filteredData[0].anniversary.birthday);
      }
      first.setFullYear(1970);
      first.setHours(0, 0, 0, 0);
      if (first >= today) break;
      first = filteredData.shift();
      filteredData.push(first);
    }
    return filteredData;
  }

  isLoading = loading => {
    this.setState({ loading });
  };

  setUsersArray(val) {
    usersArray = Object.keys(val).map(key => {
      return val[key];
    });
    return usersArray;
  }

  _renderRow({ item }) {
    return (
      <View>
        {item.isBirthday && item.isWork ? (
          <View style={styles.cardContainer}>
            <View style={styles.mainContainer}>
              <LinearGradient
                colors={['yellow', 'red']}
                style={styles.dateBirth}>
                <View style={styles.whiteCircle}>
                  <Text style={styles.dateBirthBold}>
                    {new Date(item.anniversary.birthday).getDate()}
                  </Text>
                  <Text style={styles.dateBirthtext}>
                    {months[
                      new Date(item.anniversary.birthday).getUTCMonth(months)
                    ].slice(0, 3)}
                  </Text>
                </View>
              </LinearGradient>
              <View style={styles.secondContainer}>
                <Text
                  style={[
                    styles.name,
                    { fontSize: windowWidth <= 320 ? 14 : 15 },
                  ]}>
                  {item.firstName} {item.lastname}
                </Text>
                <Text style={styles.subText}>
                  Say to happy{' '}
                  {item.isAge}th birthday! and {item.anniversary.firstDay} year work anniversary!
                </Text>
              </View>
            </View>
          </View>
        ) : !item.isBirthday && item.isWork ? (
          <View style={styles.cardContainer}>
            <View style={styles.mainContainer}>
              <LinearGradient
                colors={['#eb00ff', '#9100f6', '#000aff']}
                style={styles.dateWork}>
                <View style={styles.whiteCircle}>
                  <Text style={(styles.dateWorkBold, styles.blueTextBold)}>
                    {new Date(item.anniversary.firstDay).getDate()}
                  </Text>
                  <Text style={(styles.dateWorktext, styles.blueText)}>
                    {months[
                      new Date(item.anniversary.firstDay).getMonth(months)
                    ].slice(0, 3)}
                  </Text>
                </View>
              </LinearGradient>
              <View style={styles.secondContainer}>
                <Text
                  style={[
                    styles.name,
                    { fontSize: windowWidth <= 320 ? 14 : 15 },
                  ]}>
                  {item.firstName} {item.lastname}
                </Text>
                <Text style={styles.subText}>
                  {item.isWorkYears} year work anniversary!
                </Text>
              </View>
            </View>
          </View>
        ) : item.isBirthday && !item.isWork ? (
          <View style={styles.cardContainer}>
            <View style={styles.mainContainer}>
              <LinearGradient
                colors={['#0085ff', '#0dff00']}
                style={styles.dateBirth}>
                <View style={styles.whiteCircle}>
                  <Text style={styles.dateBirthBold}>
                    {new Date(item.anniversary.birthday).getDate()}
                  </Text>
                  <Text style={styles.dateBirthtext}>
                    {item.anniversary.birthday && months[
                      new Date(item.anniversary.birthday).getUTCMonth(months)
                    ].slice(0, 3)}
                  </Text>
                </View>
              </LinearGradient>
              <View style={styles.secondContainer}>
                <Text
                  style={[
                    styles.name,
                    { fontSize: windowWidth <= 320 ? 14 : 15 },
                  ]}>
                  {item.firstName} {item.lastname}
                </Text>
                <Text style={styles.subText}>
                  Say to happy{' '}
                  {item.anniversary.birthday && new Date().getYear() -
                    new Date(item.anniversary.birthday).getYear()}th birthday!
                </Text>
              </View>
            </View>
          </View>
        ) : (
                <View style={styles.cardContainer}>
                  <View style={styles.mainContainer}>
                    <View style={styles.blueCircle}>
                      <Text style={(styles.dateWorkBold, styles.whiteTextBold)}>
                        {new Date(item.anniversary.firstDay).getDate()}
                      </Text>
                      <Text style={(styles.dateWorktext, styles.whiteText)}>
                        {item.anniversary.firstDay && months[
                          new Date(item.anniversary.firstDay).getUTCMonth(months)
                        ].slice(0, 3)}
                      </Text>
                    </View>
                    <View style={styles.secondContainer}>
                      <Text
                        style={[
                          styles.name,
                          { fontSize: windowWidth <= 320 ? 14 : 15 },
                        ]}>
                        {item.firstName} {item.lastname}
                      </Text>
                      <Text style={styles.subText}>{item.isWorkYears} year work anniversary!</Text>
                    </View>
                  </View>
                </View>
              )}
      </View>
    );
  }

  renderContent() {
    if (this.state.loading) return <Spinner />;
    return (
      <View>
        <FlatList
          keyExtractor={(item, index) => index.toString()}
          data={this.state.anniversaryList}
          renderItem={item => this._renderRow(item)}
        />
        <Text
          style={[
            anniversaryListStyles.centerText,
            { marginBottom: Platform.os == 'android' ? 50 : 70 },
          ]}>
          {months[currentDate.getMonth()].toUpperCase()} UPCOMING EVENTS
        </Text>
      </View>
    );
  }

  render() {
    return (
      <View>
        <Search
          title="ANNIVERSARY"
          toggleSearchValue={this.state.toggleSearchValue}
          toggleSearch={this.toggleSearch}
          searchValue={this.state.searchValue}
          onChangeText={searchValue => this.onSearch(searchValue)}
        />
        {this.renderContent()}
      </View>
    );
  }
}

export default AnniversaryList;
