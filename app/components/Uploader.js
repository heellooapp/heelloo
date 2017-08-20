import * as firebase from '../utils/firebase';

class Uploader {
	static setImageUrl(userId, profileImg){
    let ProfileImagePath = "/users/"+userId+"/profileImg"
    return firebase.database().ref(ProfileImagePath).set(profileImg)
  }
}

export default Uploader;