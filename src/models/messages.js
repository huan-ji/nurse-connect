import { Firebase, FirebaseRef } from '../lib/firebase';

export default {
  state: {
    messages: {},
  },

  reducers: {
    addMessage(state, payload) {
      const newMessages = Object.assign({}, state.messages);
      newMessages[payload.id] = payload;

      return {
        ...state,
        messages: newMessages,
      };
    },
    replaceMessages(state, payload) {
      const { id, conversationId } = payload;
      const newMessages = Object.assign({}, state.messages);
      newMessages[conversationId][id] = payload;

      return {
        ...state,
        messages: newMessages,
      };
    },
  },

  effects: () => ({
    getMessages(conversationId) {
      if (Firebase === null) return () => new Promise(resolve => resolve());

      return new Promise((resolve, reject) => FirebaseRef.child('messages').orderByChild('conversationId').equalTo(conversationId).once('value')
        .then((snapshot) => {
          const data = snapshot.val() || [];
          this.replaceMessages(data);
          return resolve();
        })
        .catch(reject)).catch((err) => { throw err.message; });
    },
    listenForMessages(conversationId) {
      if (Firebase === null) return () => new Promise(resolve => resolve());

      this.messagesRef = FirebaseRef
        .child('messages')
        .orderByChild('conversationId')
        .equalTo(conversationId)
        .limitToLast(20)
        .on('child_added', (data) => {
          this.addMessage(Object.assign({}, data.val(), { id: data.key }));
        });

      return this.messagesRef;
    },
    closeChat() {
      if (this.messagesRef) {
        this.messagesRef.off();
      }
    },
    createMessage(messageData) {
      if (Firebase === null) return () => new Promise(resolve => resolve());
      const newMessageRef = FirebaseRef.child('messages').push();
      const userId = Firebase.auth().currentUser.uid;
      const message = Object.assign({}, messageData, { userId });

      return new Promise((resolve, reject) => newMessageRef.set(message)
        .then(() => {
          this.addMessage(Object.assign({}, message, { id: newMessageRef.key }));
          return resolve();
        }).catch(reject)).catch((err) => { throw err.message; });
    },
  }),
};
