<template>
	<div class="home" v-html="getCurrentContent"></div>
</template>
<script lang="ts">
import Vue from "vue";
import TreeView from "@/components/TreeView.vue";
import marked from 'marked';

export default Vue.extend({
	computed:{
		getCurrentContent(){
            return marked(this.$store.state.currentDocs.content)
		}
	}
});
</script>

<style>
</style>