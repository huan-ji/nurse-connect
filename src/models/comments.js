import { Firebase, FirebaseRef } from '../lib/firebase';

export default {
  state: {
    comments: {},
  },

  reducers: {
    replaceComments(state, payload) {
      return {
        ...state,
        comments: payload,
      };
    },
  },

  effects: () => ({
    getComments() {
      if (Firebase === null) return () => new Promise(resolve => resolve());

      return new Promise((resolve, reject) => FirebaseRef.child('comments').once('value')
        .then((snapshot) => {
          const data = snapshot.val() || [];
          this.replaceComments(data);
          return resolve();
        }).catch(reject)).catch((err) => { throw err.message; });
    },
  }),
};
