import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';

export const loginUser = ({ email, password }) => {
	return {

		firebase.auth().signInWithEmailAndPassword(email, password)
			.then(user => loginUserSuccess(dispatch, user))
			.catch(() => loginUserFail(dispatch));
	};
};