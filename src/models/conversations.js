import { Firebase, FirebaseRef } from '../lib/firebase';

export default {
  state: {
    conversations: {},
    currentConversation: undefined,
  },

  reducers: {
    addConversation(state, payload) {
      const newConversations = Object.assign({}, state.conversations);
      newConversations[payload.id] = payload;

      return {
        ...state,
        conversations: newConversations,
      };
    },
    replaceConversations(state, payload) {
      return {
        ...state,
        conversations: payload,
      };
    },
    setConversation(state, payload) {
      return {
        ...state,
        currentConversation: payload,
      };
    },
  },

  effects: () => ({
    setConversation(conversationId) {
      this.setConversation(conversationId);
    },
    getConversations(usersId) {
      if (Firebase === null) return () => new Promise(resolve => resolve());

      return new Promise((resolve, reject) => FirebaseRef.child('conversations').orderByChild('usersId').equalTo(usersId).once('value')
        .then((snapshot) => {
          const data = snapshot.val() || [];
          this.replaceConversations(data);
          return resolve();
        })
        .catch(reject)).catch((err) => { throw err.message; });
    },
    createConversation(conversationData, otherUserId) {
      if (Firebase === null) return () => new Promise(resolve => resolve());
      const newConversationRef = FirebaseRef.child('conversations').push();
      const currentUserId = Firebase.auth().currentUser.uid;
      const usersId = [currentUserId, otherUserId].sort().join('~~~');
      const conversation = Object.assign({}, conversationData, { usersId });

      return new Promise((resolve, reject) => newConversationRef.set(conversation)
        .then(() => {
          this.addConversation(Object.assign({}, conversation, { id: newConversationRef.key }));
          return resolve();
        }).catch(reject)).catch((err) => { throw err.message; });
    },
  }),
};
