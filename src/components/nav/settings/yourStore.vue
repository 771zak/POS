<template>
	<div class="store-setting">
		<h1>Store settings</h1>
		<div class="s-s-content">
			<h2 style="margin-top: 10px;">Store info</h2>
			<form @submit.prevent="setSetting()">
				<label>The store name</label>
				<input type="text" v-model="storeName"/>
				<label>Tax (TVA%)</label>
				<input type="number" v-model="tax"/>
				<input type="submit" value="" name="" id=""/>
			</form>
			<hr>
				<h2 style="margin-top: 10px;">Categories</h2>
				<div class="catList">
				<ul v-for="cat in categories" :key="cat">
					<li>{{cat}}</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
import Localbase from 'localbase';
let db = new Localbase('db');

	export default {
		name: 'yourStore',
		data() {
			return {
				storeName: '',
				tax: 0
			};
		},
		methods: {
			setSetting() {
				let sets = {
					name: this.storeName,
					tax: this.tax
				}
				db.collection("settings").set([sets])
			}
		},
		computed: {
			categories() {
				return this.$store.getters.GetCategories;
			}
		},
		mounted() {
			db.collection("settings").get().then((set) => {
				this.storeName = set[0].name
				this.tax = set[0].tax
			})
		}
	}
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
.store-setting ul {
	list-style: none;
	font-size: 14pt;
	width: 100%;
	padding: 5px;
}
.store-setting li {
	background-color: #F7F6F7;
	border-radius: 4px;
	padding: 10px;

}
</style>
