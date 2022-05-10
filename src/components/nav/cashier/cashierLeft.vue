<template>
	<div class="cashier-left" id="cashier">
		<div class="c-l-header">
			<div class="info">
				<h2 @click="increament()">{{ username }}</h2>
				<h3>{{ date }}</h3>
			</div>
			<search class="search" />
		</div>
		<div class="categories">
			<ul v-for="cat in categories" :key="cat.id">
				<li @click="filterCat($event, cat.name)" class="cat">
					{{ cat.name }}
				</li>
			</ul>
		</div>
		<hr />
		<div class="p-c-list">
			<TransitionGroup name="list">
				<product-card
					v-for="product in productList.slice(0, loading)"
					:key="product"
					:name="product.name"
					:price="product.Sprice"
					:image="product.image"
					:brand="product.brand"
					:item="product"
					@click="addToCart(product)"
				/>
			</TransitionGroup>
			<h1 v-if="productList == ''">Sorry, can't found this product!</h1>
		</div>
		<button @click="loading += 10" class="showMore">Show more</button>
	</div>
</template>

<script>
import productCard from "./productCard.vue";
import search from "../search.vue";
export default {
	name: "cas:hierLeft",
	components: {
		productCard,
		search,
	},
	data() {
		return {
			date: new Date().toDateString(),
			username: JSON.parse(localStorage.getItem("user-info")).userName,
			products: [],
			showWeight: false,
			weight: [],
			loading: 10,
		};
	},
	methods: {
		addToCart(product) {
			this.$store.commit("addToCart", {
				product: product,
				quantity: 1,
			});
		},
		filterCat(event, cat) {
			this.$store.dispatch("filterCat", cat);
			let tablinks = document.getElementsByClassName("cat");
			for (let i = 0; i < tablinks.length; i++) {
				tablinks[i].className = tablinks[i].className.replace(" active", "");
			}
			event.currentTarget.className += " active";
		},
	},
	computed: {
		productList() {
			return this.$store.getters.GetProduct;
		},
		categories() {
			return this.$store.getters.GetCategories;
		},
		product() {
			return this.$store.getters.GetProduct;
		},
	},
	mounted() {
		window.onkeypress = (e) => {
			if (this.$route.name == "cashier") {
				let tablinks = document.getElementsByClassName("cat");
				for (let i = 0; i < tablinks.length; i++) {
					tablinks[i].className = tablinks[i].className.replace(" active", "");
				}
				tablinks[0].className += " active";
				this.$store.commit("undoCat");
				this.product.forEach((el) => {
					if (el.barcode == e.key) {
						this.$store.commit("addToCart", {
							product: el,
							quantity: 1,
						});
					}
				});
			}
		};
		if (this.categories.length > 0) {
			let tablinks = document.getElementsByClassName("cat");
			tablinks[0].className += " active";
		}
	},
	unmounted() {
		this.$store.dispatch("filterCat", "All");
	},
};
</script>

<style>
.list-move, /* apply transition to moving elements */
.list-enter-active,
.list-leave-active {
	transition: all 0.4s ease;
}

.list-enter-from,
.list-leave-to {
	opacity: 0;
	transform: translateX(30px);
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.list-leave-active {
	position: absolute;
}

.cashier-left {
	position: relative;
}
::-webkit-scrollbar {
	width: 5px;
	height: 7px;
}
::-webkit-scrollbar-thumb {
	background-color: rgba(51, 51, 51, 0.719);
	border-radius: 10px;
}
::-webkit-scrollbar-thumb:hover {
	background-color: #333;
}
.c-l-header {
	display: flex;
	align-items: center;
	height: 10%;
}
.p-c-list {
	width: 100%;
	display: flex;
	justify-content: space-evenly;
	flex-wrap: wrap;
	overflow: auto;
	max-height: 600px;
}
.c-l-header input {
	padding: 15px 40px;
	border: none;
	border-radius: 10px;
	width: 490px;
	margin-left: 40px;
	font-size: 14pt;
}
.c-l-header input:focus {
	outline: none;
}
.input-container {
	position: relative;
}
.input-container img {
	position: absolute;
	left: 40px;
	padding: 15px 10px;
}
.c-l-header .info {
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	height: 100%;
	margin-left: 10px;
}
.c-l-header .info h2 {
	font-weight: bold;
	line-height: 24px;
	align-items: flex-end;
	color: #000000;
}

.c-l-header .info h3 {
	font-weight: normal;
	font-size: 14px;
	line-height: 16px;
	color: rgba(0, 0, 0, 0.63);
}
.categories {
	width: 100%;
	height: 38px;
	display: flex;
	overflow-x: auto;
}
.categories ul {
	list-style: none;
	flex: 0 0 auto;
	font-weight: 500;
	margin-left: 20px;
}
.cat {
	color: rgba(0, 0, 0, 0.63);
	margin-right: 10px;
	font-size: 14pt;
	cursor: pointer;
	transition: 0.2s ease;
	padding-bottom: 4px;
}
.cat:hover {
	color: #ef1a69;
}
.active {
	color: #ef1a69;
	border-bottom: 3px solid #ef1a69;
}
.weight {
	width: 300px;
	height: 250px;
	background: #fff;
	position: absolute;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-evenly;
	top: 200px;
	left: 300px;
	border-radius: 18px;
	box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
}
.weight input,
.weight button {
	padding: 10px 15px;
}
.showMore {
	cursor: pointer;
	position: absolute;
	left: 50%;
	background: transparent;
	border: none;
	border-bottom: 1px solid #333;
	padding-bottom: 3px;
	bottom: 25px;
	font-size: 12pt;
	transform: translate(-50%, 50%);
	transition: 0.2s ease;
}
.showMore:hover {
	bottom: 27px;
}
.showMore:focus {
	outline: none;
}
</style>
