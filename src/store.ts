import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);
interface DocTree {
	_id: string;
	name: string;
	children?: DocTree[];
	content?: string;
}
interface Doc {
	_id: string;
	name: string;
	content?: string;
	category?: string;
	parentId?: string;
}

export default new Vuex.Store({
	state: {
		list: [],
		flatList: [],
		index: 0,
		currentDocs: {
			content: ""
		}
	},
	mutations: {
		setFlatDocs(state, data) {
			state.flatList = data;
		},
		setDocs(state, data) {
			state.list = data;
		}
	},
	actions: {
		GET_DOCS({ commit }) {
			axios
				.get(
					"https://asia-east2-calcium-ratio-249108.cloudfunctions.net/getRG2RDocs"
				)
				.then((data: { data: Doc[] }) => {
                    var docs: Doc[] = data.data;
					commit("setFlatDocs", docs);
					var treeDocs: DocTree[] = [];

					function treeDocsAppendByID(
						id: string,
						parent: DocTree[],
						doc: Doc
					) {
						parent.forEach(x => {
							let ok: boolean = false;
							if (x._id == id) {
								ok = true;
							}
							if (x.hasOwnProperty("children")) {
								if (ok) x.children!.push(doc);
								else treeDocsAppendByID(id, x.children!, doc);
							} else {
								if (ok) x.children = [doc];
								else return;
							}
						});
					}

					docs.forEach((doc: Doc) => {
						if (doc.category != "") {
							let category: string = doc.category!;
							let index = treeDocs.findIndex(
								x => x.name == doc.category
							);
							if (index == -1) {
								treeDocs.push({
									_id: "",
									name: category,
									children: [doc]
								});
							} else {
								treeDocs[index].children!.push(doc);
							}
						} else if (doc.hasOwnProperty("parentId")) {
							treeDocsAppendByID(doc.parentId!, treeDocs, doc);
						}
                    });
                    console.log(treeDocs)
					commit("setDocs", treeDocs);
				});
		}
	}
});
