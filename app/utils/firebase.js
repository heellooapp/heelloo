import Firebase from 'react-native-firebase';

const configurationOptions = {
  debug: false
};

const firebase = Firebase.initializeApp(configurationOptions);

export default firebase;