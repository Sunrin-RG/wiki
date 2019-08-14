<template>
	<ul class="treeview">
		<tree-view-item :highlight="search" :data="item" :key="index" v-for="(item,index) in data"></tree-view-item>
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
.mark {
	color: #555286 !important;
}
.treeview{
    font-size: 1.1em;
}
</style>
