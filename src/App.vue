<template>
	<div id="app">
		<transition name="fade">
			<div class="admin" v-if="adminPopup">
				AdminPassword :
				<input
					ref="adminInput"
					id="adminInput"
					type="text"
					v-model="adminPassword"
					:class="{'admin-clear':getIsAdmin}"
					:readonly="getIsAdmin"
				/>
			</div>
		</transition>
		<header ref="top" class="topmenu">
			<div class="topmenu__left">
				<h1 class="topmenu__title">RG2R</h1>
				<nav class="topmenu__topic">
					<span
						class="topmenu__topic__item"
						v-for="(item,idx) in getList"
						:key="item.name"
						@click="index = idx"
					>{{item.name}}</span>
				</nav>
			</div>
			<div class="topmenu__search"></div>
		</header>
		<div class="row">
			<nav ref="navigation" class="navigation">
				<input class="navigation__filter" type="text" placeholder="Filter by title" v-model="search" />
				<tree-view class="navigation__list" :data="getComputedList" :search="search" />
				<button class="navigation__create" v-if="getIsAdmin" @click="newDocs">새 항목 추가</button>
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
	created() {
		this.$store.dispatch("GET_DOCS");
	},
	watch: {
		index(value) {
			this.$store.state.index = value;
		},
		adminPassword(value) {
			if (value == "sunrin-rg") {
				this.adminPopup = false;
				this.$store.state.isAdmin = true;
			}
		}
	},
	methods: {
		newDocs() {
			this.$store.state.currentDocs = {
				name: "NEW_TITLE",
				content: "NEW_CONTENT"
			};
			this.$router.push("/edit");
		}
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
		addEventListener("keypress", (e: KeyboardEvent) => {
			if (e.code == "KeyQ" && e.ctrlKey) {
				this.adminPopup = !this.adminPopup;
				if (this.adminPopup) {
					this.$nextTick(() => {
						(this.$refs.adminInput as HTMLInputElement).focus();
					});
				}
			}
		});
		addEventListener("touchstart", e => {
			startX = e.touches[0].clientX;
			endX = startX;
		});
		addEventListener("touchmove", e => {
			endX = e.touches[0].clientX;
			var value = currentLeft - startX + endX;
			navigation.style.left =
				(value < -innerWidth ? -innerWidth : value > 0 ? 0 : value) +
				"px";
		});
		addEventListener("touchend", e => {
			if (startX - endX > innerWidth * 0.3) {
				currentLeft = -innerWidth;
				navigation.style.left = "-100%";
			} else if (startX - endX < -innerWidth * 0.3) {
				currentLeft = 0;
				navigation.style.left = "0px";
			} else {
				navigation.style.left = currentLeft + "px";
			}
		});
	},
	data() {
		return {
			index: 0,
			search: "",
			isShowMenu: false,
			adminPopup: false,
			adminPassword: ""
		};
	},
	computed: {
		getIsAdmin(): boolean {
			return this.$store.state.isAdmin;
		},
		getComputedList(): any {
			if (this.getList.length > 0) {
				if (this.search.length != 0) {
					var result: any[] = JSON.parse(
						JSON.stringify(this.getList[this.index].children)
					);
					var findName = (item: any) => {
						if (item.hasOwnProperty("children")) {
							if (
								item.name
									.toLocaleLowerCase()
									.indexOf(this.search.toLocaleLowerCase()) !=
								-1
							) {
								return true;
							} else {
								var chk = false;
								item.children = item.children.filter(
									(y: any) => {
										let value = findName(y);
										if (!chk) chk = value;
										return value;
									}
								);
								return chk;
							}
						} else {
							if (
								item.name
									.toLocaleLowerCase()
									.indexOf(this.search.toLocaleLowerCase()) !=
								-1
							) {
								return true;
							} else {
								return false;
							}
						}
					};
					return result.filter((x: any) => {
						return findName(x);
					});
				} else return this.getList[this.index].children;
			} else {
				return [];
			}
		},
		getList() {
			return this.$store.state.list;
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
	box-sizing: border-box;
	font-family: "Nanum Gothic", sans-serif;
	letter-spacing: 0.075em;
	line-height: 1.4em;
	color: #292a59;
}
body {
	padding: 0;
	margin: 0;
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
	margin: 0;
}
.topmenu * {
	margin: 0;
	padding: 0;
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
.topmenu__topic__item {
	cursor: pointer;
	margin: 0 5px;
	font-weight: bold;
}
.topmenu__topic__item:hover {
	color: #555286;
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
.navigation * {
	margin: 0;
	padding: 0;
}

.content {
	width: 75%;
	min-height: calc(100vh - 55px);

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
.navigation__create {
	border: none;
	background: none;
	border: 1px solid #292a59;
	color: #292a59;
	font-size: 1.2em;
	margin: 5px;
	transition: 0.5s;
}
.navigation__create:hover {
	color: white;
	background-color: #292a59;
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
		top: 0;
		left: -100%;
		padding: 10px;
		height: 100%;
		background-color: #292a59;
		width: 100%;
		transition: 0.5s cubic-bezier(0.215, 0.61, 0.355, 1);
	}
	.navigation * {
		color: white;
	}
	.navigation .mark {
		color: #292a59;
	}
	.navigation::before {
		content: ">";
		display: flex;
		justify-items: center;
		align-items: center;
		position: absolute;
		bottom: 50%;
		right: -10px;
		width: 10px;
		height: 50px;
		transform: translate3d(0, 50%, 0);
		background-color: #292a59;
		color: white;
	}
	.content {
		padding: 10px;
		width: 100%;
	}
	.navigation__filter {
		background-color: #292a59;
		color: white;
		border: 1px solid white !important;
	}
}

.mark {
	background-color: yellow;
}
.admin {
	position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;

	background-color: #292a59;
	display: flex;
	justify-content: center;
	align-items: center;

	color: white;
	transition: 0.5s;
}
.admin input {
	padding: 10px;
	width: 200px;
	background: none;
	border: none;
	border-bottom: 1px solid red;
	outline: none;
	color: white;
}
.admin-clear {
	border-bottom: 1px solid green !important;
}
.fade-enter,
.fade-leave-to {
	transform: translateY(-100%);
}
.fade-enter-to,
.fade-leave {
	transform: translateY(0);
}
</style>
