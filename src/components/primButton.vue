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
	box-shadow: 1px 2px 18px #333;
	transition: 0.3s ease;
	cursor: pointer;
}

input:hover {
	opacity: 0.8;
}
input:focus {
	transform: scale(0.9);
}
</style>
