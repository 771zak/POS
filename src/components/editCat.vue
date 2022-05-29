<template>
	<div class="editCatContainer">
		<input
			type="text"
			:value="value.name"
			@change="editCat($event)"
			id="editCatInput"
		/>
		<primButton @click="$emit('closeshowEditCat')" />
	</div>
</template>

<script>
import primButton from "../components/primButton.vue";
import Localbase from "localbase";
let db = new Localbase("db");

export default {
	name: "editCat",
	components: {
		primButton,
	},
	data() {
		return {
			editedCat: "",
		};
	},
	props: ["value"],
	methods: {
		editCat(e) {
			/* console.log(this.value); */
			db.collection("categories")
				.doc({ id: this.value.id })
				.update({
					name: e.target.value,
				})
				.then(() => {
					this.$emit("closeshowEditCat");
				});

			this.$store.dispatch("editCat", {
				newValue: e.target.value,
				oldValue: this.value,
			});
		},
	},
	mounted() {
		let input = document.getElementById("editCatInput");
		input.focus();
	},
};
</script>

<style>
.editCatContainer {
	width: 30%;
	height: 30vh;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	background: #f7f7f7;
	display: flex;
	box-shadow: 10px 10px 11px -3px rgb(0 0 0 / 40%);
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
