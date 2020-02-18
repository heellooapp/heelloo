import {firebase} from '../../config';

class Utils {
  static getRef() {
    return firebase.database().ref();
  }

  static isAdmin(callback) {
    let uid = firebase.auth().currentUser.uid;
    return firebase
      .database()
      .ref('/users/' + uid)
      .on('value', snapshot => {
        let val = snapshot.val() || {};
        callback(null, val.isAdmin);
      });
  }

  static isAdminOff(callback) {
    let uid = firebase.auth().currentUser.uid;
    return firebase
      .database()
      .ref('/users/' + uid)
      .off('value', snapshot => {});
  }

  static getCurrentUserData(callback) {
    let uid = firebase.auth().currentUser.uid;
    return firebase
      .database()
      .ref('/users/' + uid)
      .on('value', snapshot => {
        let val = snapshot.val() || {};
        callback(null, val);
      });
  }

  static getUserStructure(val, callback) {
    let uid = firebase.auth().currentUser.uid;
    return firebase
      .database()
      .ref('/structures/' + val)
      .on('value', snapshot => {
        let val = snapshot.val() || {};
        callback(null, val);
      });
  }
}

export default Utils;
