<template>
	<li class="listitem" v-if="isFolder">
		<h4 @click="isOpen = !isOpen">{{ data.name }} <span class="folder">({{isOpen ? "－":"＋"}})</span></h4>
		<transition-group name="show-fade" tag="ul" class="tab" v-on:enter="enter">
			<tree-view-item
				:data-index="index"
				:data="item"
				v-for="(item,index) in (isOpen ?data.children : [])"
				:key="item.name"
			></tree-view-item>
		</transition-group>
	</li>
	<li class="listitem" v-else>{{ data.name }}</li>
</template>

<script>
import Vue from "vue";
import TreeViewItem from "@/components/TreeViewItem.vue";
export default Vue.extend({
	name: "TreeViewItem",
	props: {
		data: Object
	},
	components: {
		TreeViewItem
	},
	data() {
		return {
			isFolder: false,
			isOpen: false
		};
	},
	created() {
		this.isFolder = this.data.hasOwnProperty("children");
	},
	methods: {
		enter(el, done) {
			el.style.transitionDelay = el.dataset.index * 50 + "ms";
		},
	}
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
}
.bold {
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
	display: block;
	overflow: visible;
}
.folder{
	font-size: 0.8em;
}
</style>
