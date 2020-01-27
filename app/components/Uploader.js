import {firebase} from '../config';
import {Platform} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob'

const Blob = RNFetchBlob.polyfill.Blob;
const fs = RNFetchBlob.fs;
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = Blob;

class Uploader {
	static uploadImage = (uri, mime, uid) => {
	  return new Promise((resolve, reject) => {
	    const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
	    let uploadBlob = null;

	    const imageRef = firebase
	      .storage()
	      .ref('profileImg')
	      .child(uid);
	    fs
	      .readFile(uploadUri, 'base64')
	      .then(data => {
	        return Blob.build(data, {type: `${mime};BASE64`});
	      })
	      .then(blob => {
	        uploadBlob = blob;
	        return imageRef.put(uploadUri, {contentType: mime});
	      })
	      .then(() => {
	        uploadBlob.close();
	        return imageRef.getDownloadURL();
	      })
	      .then(url => {
	        resolve(url);
	      })
	      .catch(error => {
	        reject(error);
	      });
	  });
	};
}

export default Uploader;
