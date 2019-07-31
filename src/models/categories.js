import { Firebase, FirebaseRef } from '../lib/firebase';

export default {
  state: {
    categories: {},
  },

  reducers: {
    replaceCategories(state, payload) {
      return {
        ...state,
        categories: payload,
      };
    },
  },

  effects: () => ({
    getCategories() {
      if (Firebase === null) return () => new Promise(resolve => resolve());

      return new Promise((resolve, reject) => FirebaseRef.child('categories').once('value')
        .then((snapshot) => {
          const data = snapshot.val() || [];
          this.replaceCategories(data);
          return resolve();
        }).catch(reject)).catch((err) => { throw err.message; });
    },
  }),
};
