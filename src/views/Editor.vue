<template>
	<div class="editor">
		<div class="editor__content" v-html="getCurrentContent"></div>
		<div class="editor__row">
			<input
				v-model="category"
				class="editor__category"
				:disabled="parentSelect.length > 0"
				type="text"
				placeholder="카테고리"
			/>
			<ParentSelector
				v-model="parentSelect"
				:init="parentSelect"
				class="editor__parentId"
				type="text"
			/>
		</div>
		<input class="editor__title" v-model="name" type="text" placeholder="제목" />
		<textarea class="editor__field" v-model="text" placeholder="내용"></textarea>
		<button class="editor__send" @click="send">EDIT</button>
	</div>
</template>
<script lang="ts">
import Vue from "vue";
import ParentSelector from "@/components/ParentSelector.vue";
import marked from "marked";
import axios from "axios";
import qs from 'qs';

export default Vue.extend({
	data() {
		return {
			text: "" as string,
			parentSelect: "",
			category: "",
			name: ""
		};
	},
	watch: {
		parentSelect(value: string) {
			if (value.length > 0) {
				this.category = "";
			}
		}
	},
	created() {
		if (!this.getCurrentDocs._id || !this.getIsAdmin) this.$router.replace("/");
		this.text = this.getCurrentDocs.content as string;
		this.parentSelect = this.getCurrentDocs.parentId as string;
		this.category = this.getCurrentDocs.category as string;
		this.name = this.getCurrentDocs.name as string;
	},
	methods: {
		send() {
			this.getCurrentDocs.parentId = this.parentSelect;
			this.getCurrentDocs.category = this.category;
			this.getCurrentDocs.name = this.name;
			this.getCurrentDocs.content = this.text;
			axios
				.post(
					"https://asia-east2-calcium-ratio-249108.cloudfunctions.net/getRG2RDocs-update",
					qs.stringify({ data: this.getCurrentDocs }),
					{
						headers: {
							"content-type": "application/x-www-form-urlencoded"
						}
					}
				)
				.then(data => {
					console.log(data.data);
				});
		}
	},
	components: {
		ParentSelector
	},
	computed: {
        getIsAdmin():boolean{
            return this.$store.state.isAdmin
        },
		getCurrentContent(): string {
			return marked(this.text);
		},
		getCurrentDocs(): any {
			return this.$store.state.currentDocs;
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
.editor__category {
	width: 50%;
	padding: 10px;
}
.editor__parentId {
	width: 50%;
}
.editor__title {
	width: 100%;
	padding: 10px;
}
.editor__field {
	width: 100%;
	height: 500px;
}
.editor__send {
	color: white;
	border: none;
	padding: 5px 20px;
	font-size: 1.2em;
	background-color: #292a59;
	outline-color: #555286;
}
</style>