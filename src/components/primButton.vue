<template>
	<input type="submit" :value="title" />
</template>

<script>
export default {
	name: "primButton",
	props: ["title"],
};
</script>

<style scoped>
input {
	border: none;
	background: #ef1a69;
	color: #fff;
	border-radius: 10px;
	transition: 0.3s ease;
	box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
	cursor: pointer;
}

input:hover {
	opacity: 0.8;
}
input:active {
	transform: scale(0.9);
}
</style>
