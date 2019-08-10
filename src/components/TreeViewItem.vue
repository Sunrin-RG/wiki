<template>
	<li v-if="isFolder">
		<h4>{{ data.name }}</h4>
		<ul class="tab">
			<tree-view-item
				:data="item"
				v-for="item in data.children"
				:key="item.name"
			></tree-view-item>
		</ul>
	</li>
	<li v-else>{{ data.name }}</li>
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
			isFolder: false
		};
	},
	created() {
		console.log(this.data);
		this.isFolder = this.data.hasOwnProperty("children");
	}
});
</script>

<style scoped>
.bold {
	font-weight: bold;
}
.tab {
	padding-left: 20px;
}
</style>
