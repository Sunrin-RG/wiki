<template>
	<div class="parentSeletor">
		<input class="parentSeletor__input" type="text" />
        <div class="parentSeletor__list">

        </div>
	</div>
</template>

<script>
export default {};
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
}
.parentSeletor__list{
    position: absolute;
    width: 100%;
    height: 100px;
    background-color: grey;
}
</style>