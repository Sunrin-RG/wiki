<template>
	<div id="app">
        <div class="userinterface">
		<header ref="top" class="topmenu">
			<div class="topmenu__left">
				<h1 class="topmenu__title">RG2R</h1>
				<nav class="topmenu__topic">아 | 귀찮아 | 대충 | 여기겠지</nav>
			</div>
			<div class="topmenu__search"></div>
		</header>
		<nav class="navigation">
			<input class="navigation__filter" type="text" placeholder="Filter by title" v-model="search" />
			<tree-view class="navigation__list" :data="getComputedList" :search="search" />
		</nav>
		<section class="content">
			<router-view />
		</section>
        </div>

		<footer class="footer">a</footer>
	</div>
</template>
<script lang="ts">
import Vue from "vue";
import TreeView from "@/components/TreeView.vue";

export default Vue.extend({
	components: {
		TreeView
	},
	data() {
		return {
			search: "",
			list: [
				{
					name: "구성 요소",
					children: [
						{
							name: "Camera",
							children: [
								{
									name: "CameraBuilder",
									children: []
								}
							]
						},
						{
							name: "Object",
							children: [
								{
									name: "ObjectBuilder",
									children: []
								}
							]
						},
						{
							name: "Scene",
							children: []
						},
						{
							name: "Component",
							children: []
						}
					]
				},
				{
					name: "시스템",
					children: [
						{
							name: "GraphicManager",
							children: []
						},
						{
							name: "InputManager",
							children: []
						},
						{
							name: "SceneManager",
							children: []
						},
						{
							name: "TextureManager",
							children: []
						},
						{
							name: "TimeManager",
							children: []
						},
						{
							name: "WindowManager",
							children: []
						}
					]
				},
				{
					name: "컴포넌트",
					children: [
						{
							name: "Effect",
							children: [
								{
									name: "EffectInfo",
									children: []
								}
							]
						},
						{
							name: "Renderer",
							children: [
								{
									name: "SpriteRenderer",
									children: []
								},
								{
									name: "ViewRenderer",
									children: []
								},
								{
									name: "TextRenderer",
									children: []
								},
								{
									name: "AnimationRenderer",
									children: []
								}
							]
						},
						{
							name: "Transform",
							children: []
						}
					]
				}
			]
		};
	},
	computed: {
		getComputedList(): any {
			if (this.search.length != 0) {
				var result: any[] = JSON.parse(JSON.stringify(this.list));
				var findName = (item: any) => {
					if (item.hasOwnProperty("children")) {
						if (item.name.indexOf(this.search) != -1) {
							return true;
						}
						var chk = false;
						item.children = item.children.filter((y: any) => {
							let value = findName(y);
							if (!chk) chk = value;
							return value;
						});
						return chk;
					} else {
						if (item.name.indexOf(this.search) != -1) {
							return true;
						} else {
							return false;
						}
					}
				};
				return result.filter((x: any) => {
					return findName(x);
				});
			} else return this.list;
		}
	}
});
</script>

<style>
/* 
#292a59
#555286
#00002f
*/
* {
	padding: 0;
	margin: 0;
	box-sizing: border-box;
	font-family: "Nanum Gothic", sans-serif;
	letter-spacing: 0.075em;
	line-height: 1.4em;
}

input {
	border: 1px solid #55528633;
	border-radius: 2px;
	outline-color: #555286;
	outline-width: thick;
}

input:hover {
	border: 1px solid #555286;
}

::-webkit-scrollbar {
	width: 5px;
	height: 5px;
}

::-webkit-scrollbar-track {
	background-color: #55528633;
}

::-webkit-scrollbar-thumb {
	background-color: #555286;
}

#app {
}
.userinterface{
    width: 100vw;
    height: 100vh;
    position: relative;
}
.topmenu {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 55px;
	border-bottom: 1px solid #292a5933;

	display: flex;
	justify-content: space-between;
	align-items: center;

	padding: 0 5%;
}
.topmenu__left {
	display: flex;
	align-items: center;
}

.topmenu__title {
	font-size: 1.3em;
	font-weight: bold;
	color: #555286;
}
.topmenu__topic {
	margin-left: 20px;
}

.navigation {
	position: absolute;
	top: 55px;
	left: 0;
	width: 25%;
	height: calc(100% - 55px);
	padding-left: 5%;

	display: flex;
	flex-direction: column;

	user-select: none;
}

.content {
	position: absolute;
	top: 55px;
	right: 0;

	width: 75%;
	min-height: calc(100% - 55px);

	padding-top: 20px;
	padding-left: 50px;
}

.navigation__filter {
	width: 100%;
	margin-top: 20px;
	padding: 7.5px;
}

.navigation__list {
	padding-top: 10px;
	padding-left: 20px;
	margin-top: 1em;
	margin-bottom: 1em;

	overflow-y: scroll;
	flex: 1;
}
.footer {
	background: grey;
}
</style>
