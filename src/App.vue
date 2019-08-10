<template>
	<div id="app">
		<header ref="top" class="topmenu">
			<div class="topmenu__left">
				<h1 class="topmenu__title">RG2R</h1>
				<nav class="topmenu__topic">아 | 귀찮아 | 대충 | 여기겠지</nav>
			</div>
			<div class="topmenu__search"></div>
		</header>
		<div class="row">
			<nav ref="navigation" class="navigation">
				<input class="navigation__filter" type="text" placeholder="Filter by title" v-model="search" />
				<tree-view class="navigation__list" :data="getComputedList" :search="search" />
			</nav>
			<section class="content">
				<router-view />
			</section>
		</div>
		<footer class="footer">FOOTER</footer>
	</div>
</template>
<script lang="ts">
import Vue from "vue";
import TreeView from "@/components/TreeView.vue";

export default Vue.extend({
	components: {
		TreeView
	},
	mounted() {
		var navigation: any = this.$refs.navigation;
		addEventListener("scroll", e => {
			if (scrollY > 55) navigation.style.position = "fixed";
			else if (innerWidth > 480) navigation.style.position = "static";
		});
		var startX: number;
        var endX: number;
        var currentLeft = -innerWidth;
		addEventListener("touchstart", e => {
			startX = e.touches[0].clientX;
		});
		addEventListener("touchmove", e => {
            endX = e.touches[0].clientX;
            var value = currentLeft-startX+endX
            navigation.style.left = (value < -innerWidth ? -innerWidth : (value > 0 ? 0 : value))+"px"
		});
		addEventListener("touchend", e => {
			if (startX - endX > 50) {
                currentLeft = -innerWidth;
				navigation.style.left = "-100%";
			} else if (startX - endX < 50) {
                currentLeft = 0;
				navigation.style.left = "0px";
			}
		});
	},
	data() {
		return {
			search: "",
			isShowMenu: false,
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
	width: 100%;
	height: auto;

	display: flex;
	flex-direction: column;
}
.row {
	display: flex;
	justify-content: flex-end;
}
.topmenu {
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
	left: 0;
	top: 0;
	width: 25%;
	height: calc(100vh - 55px);
	padding-left: 5%;

	display: flex;
	flex-direction: column;

	user-select: none;
}

.content {
	width: 75%;
	min-height: calc(100vh - 55px);
	height: 2000px;

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
	background: #292a59;
	color: white;

	padding: 20px;
}

@media (min-width: 320px) and (max-width: 480px) {
	.row {
		flex-direction: column;
	}
	.navigation {
		position: fixed;
        top:0;
		left: -100%;
		padding: 10px;
        height: 100%;
        background-color: #292a59;
        color: white;
		width: 100%;
        transition: 0.5s cubic-bezier(0.215, 0.610, 0.355, 1);
	}
	.content {
		padding: 0;
		width: 100%;
	}
    .navigation__filter{
        background-color: #292a59;
        color: white;
        border: 1px solid white !important;
    }
}
</style>
