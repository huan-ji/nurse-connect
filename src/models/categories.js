import { Firebase, FirebaseRef } from '../lib/firebase';

export default {
  state: {
    categories: {},
    currentCategory: '',
  },

  reducers: {
    addCategory(state, payload) {
      const newCategories = Object.assign({}, state.categories);
      newCategories[payload.id] = payload;

      return {
        ...state,
        categories: newCategories,
      };
    },
    replaceCategories(state, payload) {
      return {
        ...state,
        categories: payload,
      };
    },
    setCategory(state, payload) {
      return {
        ...state,
        currentCategory: payload,
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
          this.setCategory(Object.keys(data)[0]);
          return resolve();
        }).catch(reject)).catch((err) => { throw err.message; });
    },

    createCategory(category) {
      if (Firebase === null) return () => new Promise(resolve => resolve());
      const newPostRef = FirebaseRef.child('categories').push();

      return new Promise((resolve, reject) => newPostRef.set(category)
        .then(() => {
          this.addCategory(Object.assign({}, category, { id: newPostRef.key }));
          this.setCategory(newPostRef.key);
          return resolve();
        }).catch(reject)).catch((err) => { throw err.message; });
    },
  }),
};
