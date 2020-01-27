import firestore from '@react-native-firebase/firestore'
// import { COLLECTIONS } from '../constants'

export default class FirebaseService {
  // auth = firebase.auth()

  constructor() {
    this.messageRef = firestore().collection("conversation");
  }

  async fetchMessages() {
    const messages = await this.messageRef
      .orderBy('created_at', 'desc')
      .limit(10)
      .get()

    return messages.docs
  }

  async createMessage({ message, conversationId, sender }) {
    await this.messageRef.doc(conversationId).collection('messages').add({
      message,
      sender,
      created_at: new Date()
    })
  }
}
