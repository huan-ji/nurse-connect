import { Firebase, FirebaseRef } from '../lib/firebase';

export default {
  state: {
    posts: {},
    currentPost: undefined,
  },

  reducers: {
    addPost(state, payload) {
      const newPosts = Object.assign({}, state.posts);
      newPosts[payload.id] = payload;

      return {
        ...state,
        posts: newPosts,
      };
    },
    addPostLike(state, payload) {
      const newPosts = Object.assign({}, state.posts);
      newPosts[payload].likeCount += 1;

      return {
        ...state,
        posts: newPosts,
      };
    },
    replacePosts(state, payload) {
      return {
        ...state,
        posts: payload,
      };
    },
    setPost(state, payload) {
      return {
        ...state,
        currentPost: payload,
      };
    },
  },

  effects: () => ({
    setPost(postId) {
      this.setPost(postId);
    },
    getPosts(categoryId) {
      if (Firebase === null) return () => new Promise(resolve => resolve());

      return new Promise((resolve, reject) => FirebaseRef.child('posts').orderByChild('categoryId').equalTo(categoryId).once('value')
        .then((snapshot) => {
          const data = snapshot.val() || [];
          this.replacePosts(data);
          return resolve();
        })
        .catch(reject)).catch((err) => { throw err.message; });
    },
    createLike(postId) {
      if (Firebase === null) return () => new Promise(resolve => resolve());
      const userId = Firebase.auth().currentUser.uid;
      const like = { postId, userId };

      return new Promise((resolve, reject) => FirebaseRef.child('likes').push(like)
        .then(() => {
          this.addPostLike(postId);
          return resolve();
        }).catch(reject)).catch((err) => { throw err.message; });
    },
    createPost(postData) {
      if (Firebase === null) return () => new Promise(resolve => resolve());
      const newPostRef = FirebaseRef.child('posts').push();
      const userId = Firebase.auth().currentUser.uid;
      const post = Object.assign({}, postData, { userId });

      return new Promise((resolve, reject) => newPostRef.set(post)
        .then(() => {
          this.addPost(Object.assign({}, post, { id: newPostRef.key }));
          return resolve();
        }).catch(reject)).catch((err) => { throw err.message; });
    },
  }),
};
