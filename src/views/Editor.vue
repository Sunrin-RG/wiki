<template>
	<div class="editor">
		<div class="editor__content" v-html="getCurrentContent"></div>
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
	computed: {
		getCurrentContent(): string {
			return marked(this.text);
		}
	}
});
</script>

<style>
.editor {
	widows: 100%;
}
.editor__content{
    word-wrap: break-word;
}
.editor__field{
    width: 100%;
    height: 500px;
}
</style>