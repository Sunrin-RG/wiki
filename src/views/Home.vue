<template>
	<div class="home">
        <div class="home__content" v-html="getCurrentContent"></div>
        <router-link to="/edit" class="home__edit" v-if="getCurrentContent && getIsAdmin">EDIT</router-link>
    </div>
</template>
<script lang="ts">
import Vue from "vue";
import TreeView from "@/components/TreeView.vue";
import marked from 'marked';

export default Vue.extend({
	computed:{
        getIsAdmin():boolean{
            return this.$store.state.isAdmin
        },
		getCurrentContent(){
            return marked(this.$store.state.currentDocs.content)
		}
	}
});
</script>

<style>
</style>