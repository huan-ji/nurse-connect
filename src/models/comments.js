import { Firebase, FirebaseRef } from '../lib/firebase';

export default {
  state: {
    comments: {},
  },

  reducers: {
    addComment(state, payload) {
      const newComments = Object.assign({}, state.comments);
      newComments[payload.id] = payload;

      return {
        ...state,
        comments: newComments,
      };
    },
    replaceComments(state, payload) {
      return {
        ...state,
        comments: payload,
      };
    },
  },

  effects: () => ({
    getComments(postId) {
      if (Firebase === null) return () => new Promise(resolve => resolve());

      return new Promise((resolve, reject) => FirebaseRef.child('comments').orderByChild('postId').isEqualTo(postId).once('value')
        .then((snapshot) => {
          const data = snapshot.val() || [];
          this.replaceComments(data);
          return resolve();
        })
        .catch(reject)).catch((err) => { throw err.message; });
    },
    createComment(comment) {
      if (Firebase === null) return () => new Promise(resolve => resolve());
      const newCommentRef = FirebaseRef.child('comments').push();

      return new Promise((resolve, reject) => newCommentRef.set(comment)
        .then(() => {
          this.addComment(Object.assign({}, comment, { id: newCommentRef.key }));
          return resolve();
        }).catch(reject)).catch((err) => { throw err.message; });
    },
  }),
};
