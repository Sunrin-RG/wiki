<template>
	<li class="listitem" v-if="isFolder">
		<h4 @click="isOpen = !isOpen">
			<span v-html="text"></span>
			<span class="folder">({{isOpen ? "－":"＋"}})</span>
		</h4>
		<transition-group name="show-fade" tag="ul" class="tab" v-on:enter="enter" v-on:leave="leave">
			<tree-view-item
				:highlight="highlight"
				:data-index="index"
				:data="item"
				v-for="(item,index) in (isOpen ?data.children : [])"
				:key="item.name"
			></tree-view-item>
		</transition-group>
	</li>
	<li class="listitem" ref="listitem" v-else>
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
			this.setText(value);
		}
	},
	methods: {
		setText(value) {
			if (value == "") this.text = this.data.name;
			else
				this.text = this.data.name.replace(
					this.highlight,
					"<span class='mark'>" + this.highlight + "</span>"
				);
		},
		enter(el, done) {
			el.style.transitionDelay = el.dataset.index * 50 + "ms";
		},
		leave(el, done) {
			el.style.transitionDelay = (this.data.children.length-1-el.dataset.index) * 50 + "ms";
		}
	},
	computed: {}
});
</script>

<style scoped>
.show-fade-enter-active,
.show-fade-leave-active {
	transition: 0.5s;
}
.show-fade-enter,
.show-fade-leave-to {
	opacity: 0;
	transform: translateY(-10px);
	height: 0;
}
.show-fade-enter-to,
.show-fade-leave {
	opacity: 1;
	transform: translateY(0);
    height: 100%;
}
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
