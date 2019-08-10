<template>
	<ul>
		<tree-view-item
			:data="item"
			v-for="item in data"
			:key="item.name"
		></tree-view-item>
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
		data: Array
	}
});
</script>

<style>
ul,
ul * {
	list-style: none;
}
</style>
