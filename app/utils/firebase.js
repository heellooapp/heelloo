import Firebase from 'react-native-firebase';

const configurationOptions = {
  debug: true
};

const firebase = Firebase.initializeApp(configurationOptions);

export default firebase;