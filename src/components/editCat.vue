<template>
	<div class="editCatContainer">
		<input type="text" :value="value.name" />
		<primButton />
	</div>
</template>

<script>
import primButton from "../components/primButton.vue";
export default {
	name: "editCat",
	components: {
		primButton,
	},
	props: ["value"],
};
</script>

<style>
.editCatContainer {
	width: 40%;
	height: 30vh;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	background: #f7f7f7;
	display: flex;
	box-shadow: 10px 10px 11px -3px rgb(0 0 0 / 10%);
	flex-direction: column;
	border-radius: 10px;
	align-items: center;
	justify-content: center;
}
.editCatContainer input[type="text"] {
	border: none;
	border-bottom: 2px solid #ebebeb;
	transition: 0.3s ease;
	margin-bottom: 10px;
	padding: 10px 5px;
}
.editCatContainer input[type="text"]:focus {
	outline: none;
	border-bottom: 2px solid #333;
}
</style>
