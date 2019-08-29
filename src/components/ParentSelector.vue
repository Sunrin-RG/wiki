<template>
	<div class="parentSeletor">
		<input
			class="parentSeletor__input"
			@keydown="moveSelect"
			@focus="show = true"
			@click="show = true"
			@blur="show=false"
			type="text"
			readonly
			v-model="name"
			placeholder="상위 폴더"
		/>
		<div class="parentSeletor__id">{{parentId}}</div>
		<div
			@click="show = false"
			class="parentSeletor__list"
			:class="{'parentSeletor__list-active':show}"
			v-if="getFlatList"
		>
			<div
				class="parentSeletor__list__item"
				:class="{'parentSeletor__list__item-active': currentSelectIndex == idx}"
				@mousedown="setText(item.name,item._id)"
				v-for="(item,idx) in getFlatList"
				:key="item.name"
			>{{item.name}}</div>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
	name: "ParentSelector",
	components: {},
	props: {
		init: String
	},
	data() {
		return {
			parentId: "",
			name: "",
			currentSelectIndex: 0,
			show: false
		};
	},
	created() {
		if (this.init) {
			this.parentId = this.init;
			this.name = this.getFlatList.find(
				(x: any) => x._id == this.parentId
            ).name;
        }
	},
	methods: {
		moveSelect(e: KeyboardEvent) {
			this.getFlatList.length;
			switch (e.keyCode) {
				case 38:
					if (this.currentSelectIndex > 0) this.currentSelectIndex--;
					break;
				case 40:
					if (this.currentSelectIndex < this.getFlatList.length - 1)
						this.currentSelectIndex++;
					break;
				case 13:
					this.parentId = this.getFlatList[
						this.currentSelectIndex
					]._id;
					this.name = this.getFlatList[this.currentSelectIndex].name;
					this.show = false;
					break;
			}
		},
		setText(name: string, parentId: string) {
			this.name = name;
			this.parentId = parentId;
		}
	},
	watch: {
		parentId(value) {
			this.$emit("input", value);
		}
	},
	computed: {
		getFlatList() {
			return this.$store.state.flatList;
		}
	}
});
</script>

<style>
.parentSeletor {
	position: relative;
	display: inline-block;
	width: 50%;
}
.parentSeletor__input {
	width: 100%;
	padding: 10px;
	z-index: 1;
}
.parentSeletor__list {
	position: absolute;
	display: none;
	flex-direction: column;

	width: 100%;

	border: 1px solid #555286;
	background-color: #fafafa;

	transition: 0.5s;
}
.parentSeletor__list-active {
	display: flex;
}
.parentSeletor__id {
	position: absolute;
	bottom: 5px;
	right: 5px;
	font-size: 0.8em;
}
.parentSeletor__list__item {
	font-size: 1.2em;
	padding: 10px 20px;
	width: 100%;
}
.parentSeletor__list__item-active,
.parentSeletor__list__item:hover {
	background-color: #555286;
	color: white;
}
</style>