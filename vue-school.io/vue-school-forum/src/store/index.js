import { createStore } from "vuex";
import getters from "@/store/getters";
import actions from "@/store/actions";
import mutations from "@/store/mutations";

export default createStore({
  state: {
    categories: [],
    forums: [],
    threads: [],
    posts: [],
    users: [],
    authId: null,
    // authId: "u4r8XCziZEWEXsj2UIKNHBoDh0n2",
    unsubscribes: [],
    authUserUnsubscribe: null,
    authObserverUnsubscribe: null,
  },
  getters,
  actions,
  mutations,
});
