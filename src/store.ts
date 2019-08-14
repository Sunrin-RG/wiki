import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		currentContent: { name:"TEST",content:"# Hello World"}
	},
	mutations: {},
	actions: {}
});
