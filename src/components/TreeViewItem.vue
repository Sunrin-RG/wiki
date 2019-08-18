<template>
	<li class="listitem" v-if="isFolder">
		<h4 @click="isOpen = !isOpen">
			<span v-html="text"></span>
			<span class="folder">({{isOpen ? "－":"＋"}})</span>
		</h4>
		<ul class="tab" v-if="isOpen">
			<tree-view-item
				:highlight="highlight"
				:data-index="index"
				:data="item"
				v-for="(item,index) in data.children"
				:key="item.name"
			></tree-view-item>
		</ul>
	</li>
	<li class="listitem" ref="listitem" @click="gotoDocs" v-else>
		<span v-html="text"></span>
	</li>
</template>

<script>
import Vue from "vue";
import TreeViewItem from "@/components/TreeViewItem.vue";
export default Vue.extend({
	name: "TreeViewItem",
	props: {
		data: Object,
		highlight: String
	},
	components: {
		TreeViewItem
	},
	data() {
		return {
			isFolder: false,
			isOpen: false,
			text: ""
		};
	},
	created() {
		this.isFolder = this.data.hasOwnProperty("children");

		this.setText(this.highlight);
	},
	watch: {
		highlight(value) {
			if (this.isFolder && value != "") {
				this.isOpen =
					this.data.children.findIndex(
						x =>
							x.name
								.toLocaleLowerCase()
								.indexOf(value.toLocaleLowerCase()) != -1
					) != -1 ||
					this.data.name
						.toLocaleLowerCase()
						.indexOf(value.toLocaleLowerCase()) != -1;
			} else {
				this.isOpen = false;
			}
			this.setText(value);
		}
	},
	methods: {
		gotoDocs() {
			this.$store.state.currentDocs = this.data;
		},
		setText(value) {
			if (value == "") this.text = this.data.name;
			else{
                let reg = new RegExp(this.highlight, "gi")
                this.text = this.data.name.replace(
                    reg,
					"<span class='mark'>" + reg.exec(this.data.name) + "</span>"
				);
            }
		},
		enter(el, done) {
			el.style.transitionDelay = el.dataset.index * 50 + "ms";
		},
		leave(el, done) {
			el.style.transitionDelay =
				(this.data.children.length - 1 - el.dataset.index) * 50 + "ms";
		}
	},
	computed: {}
});
</script>

<style scoped>
.bold {
	cursor: pointer;
	font-weight: bold;
}
.tab {
	position: relative;
	overflow: hidden;
	padding-left: 20px;

	display: flex;
	flex-direction: column;

	font-size: 0.9em;
}
.listitem {
	margin-top: 5px;
	display: block;
	overflow: visible;
}
.folder {
	font-size: 0.8em;
}
</style>
