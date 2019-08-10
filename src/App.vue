<template>
	<div id="app">
		<header ref="top" class="topmenu">
			<h1 class="topmenu__title">RG2R</h1>
			<div class="topmenu__search">SEARCH</div>
		</header>
		<nav class="navigation">
			<input class="navigation__filter" type="text" placeholder="Filter by title" />
			<tree-view class="navigation__list" :data="list" />
		</nav>
		<section class="content">
			<router-view />
		</section>
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
			list: [
				{
					name: "test",
					children: [
						{
							name: "test2"
						},
						{
							name: "test3",
							children: [
								{
									name: "test4"
								},
								{
									name: "test5"
								}
							]
						}
					]
				}
			]
		};
	},
	mounted() {}
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
	width: 100vw;
	height: 100vh;
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

.topmenu__title {
	font-size: 1.3em;
	font-weight: bold;
	color: #555286;
}

.navigation {
	position: absolute;
	bottom: 0;
	left: 0;
	width: 25%;
	height: calc(100% - 55px);
	padding-left: 5%;

	display: flex;
	flex-direction: column;
}

.content {
	position: absolute;
	top: 55px;
	right: 0;

	width: 75%;

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
</style>
