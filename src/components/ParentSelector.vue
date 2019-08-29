<template>
	<div class="parentSeletor">
		<input class="parentSeletor__input" type="text" v-model="content"/>
        <div class="parentSeletor__list" v-if="getFlatList">
            <div class="parentSeletor__list__item" v-for="item in getFlatList" :key="item.name">{{item.name}}</div>
        </div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
    name: "ParentSelector",
    components:{
    },
    data(){
        return {
            content : ""
        }
    },
    watch:{
        content(value){
            this.$emit('input',{content:value})
        }
    },
    computed:{
        getFlatList(){
            return this.$store.state.flatList
        }
    }
})
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
.parentSeletor__list{
    position: absolute;
    display:none;
    flex-direction: column;
    
    width: 100%;

    border: 1px solid #555286;
    background-color: #FAFAFA;

    transition: 0.5s;
}
.parentSeletor__list__item{
    font-size: 1.2em;
    padding: 10px 20px;
    width: 100%;
}
.parentSeletor__list__item:hover{
    background-color: #555286;
    color: white;
}
.parentSeletor__input:focus+.parentSeletor__list{
    display: flex;
}
    </style>