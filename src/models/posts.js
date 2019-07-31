import { Firebase, FirebaseRef } from '../lib/firebase';

export default {
  state: {
    posts: {},
  },

  reducers: {
    replacePosts(state, payload) {
      return {
        ...state,
        posts: payload,
      };
    },
  },

  effects: () => ({
    getPosts() {
      if (Firebase === null) return () => new Promise(resolve => resolve());

      return new Promise((resolve, reject) => FirebaseRef.child('posts').once('value')
        .then((snapshot) => {
          const data = snapshot.val() || [];
          this.replacePosts(data);
          return resolve();
        }).catch(reject)).catch((err) => { throw err.message; });
    },
  }),
};
