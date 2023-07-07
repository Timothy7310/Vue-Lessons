// import { findById, upsert, docToResource } from "@/helpers";

// export default {
//   setItem(state, { resource, item }) {
//     upsert(state[resource], docToResource(item));
//   },

// setAuthId(state, id) {
//   state.authId = id;
// },

// setAuthUserUnsubscribe(state, unsubscribe) {
//   state.authUserUnsubscribe = unsubscribe;
// },

// setAuthObserverUnsubscribe(state, unsubscribe) {
//   state.authObserverUnsubscribe = unsubscribe;
// },

//   appendUnsubscribe(state, { unsubscribe }) {
//     state.unsubscribes.push(unsubscribe);
//   },

//   clearAllUnsubscribes(state) {
//     state.unsubscribes = [];
//   },

// appendPostToThread: makeAppendChildToParentMutation({
//   parent: "threads",
//   child: "posts",
// }),

//   appendThreadToForum: makeAppendChildToParentMutation({
//     parent: "forums",
//     child: "threads",
//   }),

//   appendThreadToUser: makeAppendChildToParentMutation({
//     parent: "users",
//     child: "threads",
//   }),

// appendContributorToThread: makeAppendChildToParentMutation({
//   parent: "threads",
//   child: "contributors",
// }),
// };

import { upsert, docToResource } from "@/helpers";
export default {
  setItem(state, { resource, item }) {
    upsert(state[resource].items, docToResource(item));
  },
  appendUnsubscribe(state, { unsubscribe }) {
    state.unsubscribes.push(unsubscribe);
  },
  clearAllUnsubscribes(state) {
    state.unsubscribes = [];
  },
  clearItems(state, { modules = [] }) {
    modules.forEach((module) => {
      state[module].items = [];
    });
  },
};
