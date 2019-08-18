<template>
	<ul class="treeview">
		<tree-view-item :highlight="search" :data="item" :key="item.name" v-for="item in data"></tree-view-item>
	</ul>
</template>

<script lang="ts">
import Vue from "vue";
import TreeViewItem from "@/components/TreeViewItem.vue";
export default Vue.extend({
	components: {
		TreeViewItem
	},
	props: {
		data: Array,
		search: String
	},
});
</script>

<style scoped>
ul,
ul * {
	list-style: none;
}
.treeview{
    font-size: 1.1em;
}
</style>
