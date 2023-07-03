import firebase from "firebase";
import { findById } from "@/helpers";

export default {
  createPost({ commit, state }, post) {
    post.id = "qqqq" + Math.random();
    post.userId = state.authId;
    post.publishedAt = Math.floor(Date.now() / 1000);
    commit("setItem", { resource: "posts", item: post });
    commit("appendPostToThread", {
      childId: post.id,
      parentId: post.threadId,
    });
    commit("appendContributorToThread", {
      childId: state.authId,
      parentId: post.threadId,
    });
  },

  async createThread({ commit, state, dispatch }, { text, title, forumId }) {
    const id = "qqqq" + Math.random();
    const userId = state.authId;
    const publishedAt = Math.floor(Date.now() / 1000);
    const thread = {
      forumId,
      title,
      publishedAt,
      userId,
      id,
    };
    commit("setItem", { resource: "threads", item: thread });
    commit("appendThreadToUser", { parentId: userId, childId: id });
    commit("appendThreadToForum", { parentId: forumId, childId: id });
    dispatch("createPost", { text, threadId: id });
    return findById(state.threads, id);
  },

  async updateThread({ commit, state }, { title, text, id }) {
    const thread = findById(state.threads, id);
    const post = findById(state.posts, thread.posts[0]);
    thread.title = title;

    const newThread = { ...thread, title };
    const newPost = { ...post, text };

    commit("setItem", { resource: "threads", item: newThread });
    commit("setItem", { resource: "posts", item: newPost });
    return newThread;
  },

  updateUser({ commit }, user) {
    commit("setItem", { resource: "users", item: user });
  },

  fetchCategory: ({ dispatch }, { id }) =>
    dispatch("fetchItem", { resource: "categories", id, emoji: "📂" }),

  fetchForum: ({ dispatch }, { id }) =>
    dispatch("fetchItem", { resource: "forums", id, emoji: "🏁" }),

  fetchThread: ({ dispatch }, { id }) =>
    dispatch("fetchItem", { resource: "threads", id, emoji: "📃" }),

  fetchUser: ({ dispatch }, { id }) =>
    dispatch("fetchItem", { resource: "users", id, emoji: "🧑🏻" }),

  fetchPost: ({ dispatch }, { id }) =>
    dispatch("fetchItem", { resource: "posts", id, emoji: "💬" }),

  fetchAllCategories({ commit }) {
    console.log("🔥", "🗂️", "all");
    return new Promise((resolve) => {
      firebase
        .firestore()
        .collection("categories")
        .onSnapshot((querySnapshot) => {
          const categories = querySnapshot.docs.map((doc) => {
            const item = { id: doc.id, ...doc.data() };
            commit("setItem", { resource: "categories", item });
            return item;
          });
          resolve(categories);
        });
    });
  },

  fetchCategories: ({ dispatch }, { ids }) =>
    dispatch("fetchItems", { resource: "categories", ids, emoji: "📂" }),
  fetchForums: ({ dispatch }, { ids }) =>
    dispatch("fetchItems", { resource: "forums", ids, emoji: "🏁" }),
  fetchThreads: ({ dispatch }, { ids }) =>
    dispatch("fetchItems", { resource: "threads", ids, emoji: "📃" }),
  fetchUsers: ({ dispatch }, { ids }) =>
    dispatch("fetchItems", { resource: "users", ids, emoji: "🧑🏻" }),
  fetchPosts: ({ dispatch }, { ids }) =>
    dispatch("fetchItems", { resource: "posts", ids, emoji: "💬" }),

  fetchItem({ state, commit }, { resource, id, emoji }) {
    console.log("🔥", emoji, id);
    return new Promise((resolve) => {
      firebase
        .firestore()
        .collection(resource)
        .doc(id)
        .onSnapshot((doc) => {
          const item = { ...doc.data(), id: doc.id };
          commit("setItem", { resource, id, item });
          resolve(item);
        });
    });
  },

  fetchItems: ({ dispatch }, { ids, resource, emoji }) =>
    Promise.all(
      ids.map((id) => dispatch("fetchItem", { id, resource, emoji }))
    ),
};
