import { firebase } from '../config';
import { Platform } from 'react-native';
import RNFetchBlob from 'rn-fetch-blob'
import storage from '@react-native-firebase/storage';

const Blob = RNFetchBlob.polyfill.Blob;
const fs = RNFetchBlob.fs;
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = Blob;

class Uploader {
	static uploadImage = (uri, mime, uid) => {
		return new Promise((resolve, reject) => {
			const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
			const imageRef = storage()
				.ref('profileImg')
				.child(uid);
			const unsubscribe = imageRef
				.putFile(uploadUri).on(
					firebase.storage.TaskEvent.STATE_CHANGED,
					(snapshot) => {
						// console.log(snapshot.bytesTransferred);
						// console.log(snapshot.totalBytes);
						if (snapshot.state === firebase.storage.TaskState.SUCCESS) {
							resolve(imageRef.getDownloadURL())
						}
					},
					(error) => {
						unsubscribe();
						reject(error);
						console.error(error);
					},
				);
		});
	};
}

export default Uploader;
