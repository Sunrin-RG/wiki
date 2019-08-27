<template>
	<div class="editor">
		<div class="editor__content" v-html="getCurrentContent"></div>
        <div class="editor__row">
            <input class="editor__category" type="text">
            <input class="editor__parentId" type="text">
        </div>
        <input  class="editor__title" type="text">
		<textarea class="editor__field" v-model="text"></textarea>
	</div>
</template>
<script lang="ts">
import Vue from "vue";
import TreeView from "@/components/TreeView.vue";
import marked from "marked";

export default Vue.extend({
	data() {
		return {
			text: "" as string
		};
    },
    created(){
        this.text = this.getCurrentDocs.content
    },
	computed: {
		getCurrentContent(): string {
			return marked(this.text);
        },
        getCurrentDocs(){
            return this.$store.state.currentDocs
        }
	}
});
</script>

<style>
.editor {
	widows: 100%;
}
.editor__content {
	word-wrap: break-word;
}
.editor__category, .editor__parentId{
    width: 50%;
    padding: 10px;
}
.editor__title{
    width : 100%;
    padding: 10px;
}
.editor__field {
	width: 100%;
	height: 500px;
}
</style>