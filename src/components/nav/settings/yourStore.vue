<template>
	<div class="store-setting">
		<h1>Store settings</h1>
		<div class="s-s-content">
			<h2 style="margin-top: 10px">Store info</h2>
			<form @submit.prevent="setSetting()">
				<label>The store name</label>
				<input type="text" v-model="storeName" />
				<label>Address</label>
				<input type="text" v-model="address" />
				<label>Tax (TVA%)</label>
				<input type="number" v-model="tax" />
				<input type="submit" value="" name="" id="" />
			</form>
			<hr />
			<h2 style="margin-top: 10px">Categories</h2>
			<div class="categories-container">
				<div class="catForm">
					<input
						type="text"
						placeholder="Add categorie"
						v-model="categorie"
						@keyup.enter="addNewCategorie"
					/>
					<button @click="addNewCategorie">Add categorie</button>
				</div>
				<div class="catList">
					<ul v-for="cat in categories" :key="cat.id">
						<li class="categorie">{{ cat.name }}</li>
						<img src="@/assets/icons/Edit.svg" alt="" @click="editCat(cat)" />
						<img
							src="@/assets/icons/Delete.png"
							@click="deleteCat(cat)"
							:style="cat.name === 'All' ? 'display: none' : 'display: block'"
						/>
					</ul>
				</div>
			</div>
		</div>
		<editCat
			:value="cat"
			v-if="showEditCat"
			@closeshowEditCat="showEditCat = false"
		/>
	</div>
</template>

<script>
import Localbase from "localbase";
let db = new Localbase("db");
import editCat from "../../editCat.vue";

export default {
	name: "yourStore",
	components: {
		editCat,
	},
	data() {
		return {
			storeName: "",
			tax: 0,
			address: "",
			categorie: "",
			cat: {},
			showEditCat: false,
		};
	},
	methods: {
		setSetting() {
			let sets = {
				name: this.storeName,
				tax: this.tax,
				address: this.address,
			};
			db.collection("settings").set([sets]);
			this.$store.dispatch("changeTax", this.tax);
		},
		addNewCategorie() {
			let newCat = {
				id: this.categorie + Math.floor(Math.random() * 11),
				name: this.categorie,
			};
			db.collection("categories").add(newCat);
			this.$store.dispatch("addNewCategorie", newCat);
			this.categorie = "";
		},
		editCat(cat) {
			this.cat = cat;
			if (!this.showEditCat) {
				this.showEditCat = true;
			} else if (this.showEditCat) {
				this.showEditCat = true;
			}
		},
		deleteCat(cat) {
			db.collection("product")
				.get()
				.then((products) => {
					products.forEach((el) => {
						if (el.cat == cat.name) {
							db.collection("product").doc({ id: el.id }).update({
								cat: "All",
							});
						}
					});
				});
			this.$store.dispatch("deleteCat", cat);
		},
	},
	computed: {
		categories() {
			return this.$store.getters.GetCategories;
		},
	},
	mounted() {
		db.collection("settings")
			.get()
			.then((set) => {
				this.storeName = set[0].name;
				this.tax = set[0].tax;
				this.address = set[0].address;
			});
	},
	unmounted() {
		this.$store.dispatch("fetching_data");
	},
};
</script>

<style scoped>
.store-setting {
	margin: 30px;
}
label {
	margin-top: 15px;
}
input {
	display: block;
	margin-bottom: 5px;
}
.catList {
	max-height: 200px;
	width: 20%;
	overflow: scroll;
}
.catList ul {
	display: flex;
	margin-bottom: 5px;
	justify-content: space-around;
	align-items: center;
	background-color: #f7f6f7;
}
.catList img {
	cursor: pointer;
}
.catList img:hover {
	opacity: 0.8;
}
.catList img:active {
	transform: scale(0.9);
}
.store-setting ul {
	list-style: none;
	font-size: 14pt;
	width: 100%;
	padding: 5px;
}
.store-setting li {
	border-radius: 4px;
	padding: 10px;
}

.categories-container {
	display: flex;
	width: 100%;
	height: 240px;
}

.catList {
	width: 70%;
	min-height: 100%;
	display: flex;
	flex-direction: column;
}

.categorie {
	min-width: 5em;
	text-align: center;
	max-height: 40px;
}

.catForm {
	flex: 0.5;
}
</style>
