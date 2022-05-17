<template>
	<div class="stock">
		<div class="stock-header">
			<h1>Stock</h1>
			<search />
			<button @click="showInputForm()" id="addProduct">
				<img src="@/assets/icons/Add.png" alt="" /> Add product
			</button>
			<button @click="showExpired()" id="addProduct">
				<img src="@/assets/icons/Expired.png" alt="" />{{
					showExp ? "show All" : "Show EXP"
				}}
			</button>
		</div>

		<!-- add product modal -->
		<transition name="fade">
			<div class="product-input" v-if="showInput">
				<h3>Add product</h3>
				<form @submit.prevent="addToStock(prod)">
					<div class="i-sec">
						<div>
							<label for="barcode">Enter the barcode</label>
							<input
								required
								type="text"
								id="barcode"
								placeholder="BarCode"
								v-model="barcode"
								@input="checkBar()"
							/>
						</div>
						<div>
							<label for="brand">Enter the brand</label>
							<input
								type="text"
								id="brand"
								placeholder="Brand"
								v-model="brand"
								required
							/>
						</div>
					</div>
					<div class="i-sec">
						<div>
							<label for="name">Enter the name</label>
							<input
								required
								type="text"
								id="name"
								placeholder="Product name"
								v-model="name"
							/>
						</div>

						<div style="flex-direction: row; align-items: center">
							<label for="categorie">Enter the categorie</label>
							<select id="categorie" v-model="cat">
								<option
									:value="cat.name"
									v-for="cat in categories"
									:key="cat.id"
								>
									{{ cat.name }}
								</option>
							</select>
						</div>
					</div>
					<div class="i-sec">
						<div>
							<label for="qte"
								>Enter the quantity
								<span v-if="cat == 'weight'">(Kg)</span>
							</label>
							<input
								required
								type="number"
								id="qte"
								step="any"
								placeholder="Qty"
								v-model="qty"
							/>
						</div>
						<div>
							<label for="Pprice">Enter the purchase price</label>
							<input
								required
								type="number"
								step="any"
								id="Pprice"
								placeholder="Purchase price"
								v-model="Pprice"
							/>
						</div>
					</div>
					<div class="i-sec">
						<div>
							<label for="Sprice">Enter the Selling price</label>
							<input
								required
								type="number"
								id="Sprice"
								step="any"
								placeholder="Selling price"
								v-model="Sprice"
							/>
						</div>
						<div>
							<label for="ExDate">Enter expiring date</label>
							<input type="date" id="ExDate" required v-model="exDate" />
						</div>
					</div>
					<div class="i-sec">
						<input
							type="file"
							name="img"
							accept="image/*"
							@change="onFileSelected"
						/>
					</div>
					<div class="i-sec">
						<primButton :title="Addtostock" />
					</div>
				</form>
				<button @click="this.showInput = !this.showInput" class="close-form">
					X
				</button>
			</div>
		</transition>

		<!-- edit product modal -->
		<transition name="fade">
			<div class="product-input" v-if="showEdit">
				<h3>Edit product</h3>
				<form @submit.prevent="updateProd(prod)">
					<div class="i-sec">
						<div>
							<label for="brand">Enter the brand</label>
							<input
								type="text"
								id="brand"
								placeholder="Brand"
								v-model="editProd.brand"
								required
							/>
						</div>
						<div>
							<label for="name">Enter the name</label>
							<input
								required
								type="text"
								id="name"
								placeholder="Product name"
								v-model="editProd.name"
							/>
						</div>
					</div>
					<div class="i-sec">
						<div>
							<label for="barcode">Enter the barcode</label>
							<input
								required
								type="text"
								id="barcode"
								placeholder="BarCode"
								v-model="editProd.barcode"
							/>
						</div>
						<div style="flex-direction: row; align-items: center">
							<label for="categorie">Enter the categorie</label>
							<select id="categorie" v-model="editProd.cat">
								<option :value="cat" v-for="cat in categories" :key="cat.id">
									{{ cat.name }}
								</option>
							</select>
						</div>
					</div>
					<div class="i-sec">
						<div>
							<label for="qte">Enter the quantity</label>
							<input
								required
								type="number"
								id="qte"
								step="any"
								placeholder="Qty"
								v-model="editProd.qty"
							/>
						</div>

						<div>
							<label for="Pprice">Enter the purchase price</label>
							<input
								required
								type="number"
								step="any"
								id="Pprice"
								placeholder="Purchase price"
								v-model="editProd.Pprice"
							/>
						</div>
					</div>
					<div class="i-sec">
						<div>
							<label for="Sprice">Enter the Selling price</label>
							<input
								required
								type="number"
								id="Sprice"
								step="any"
								placeholder="Selling price"
								v-model="editProd.Sprice"
							/>
						</div>
						<div>
							<label for="ExDate">Enter the expiring date</label>
							<input type="date" id="ExDate" v-model="editProd.ExDate" />
						</div>
					</div>
					<div class="i-sec">
						<input
							type="file"
							name="img"
							accept="image/*"
							@change="onFileSelected"
						/>
					</div>
					<div class="i-sec">
						<primButton :title="Update" />
					</div>
				</form>
				<button @click="this.showEdit = !this.showEdit" class="close-form">
					X
				</button>
			</div>
		</transition>

		<!-- show the products -->
		<div
			class="product-table"
			:style="showInput || showEdit ? { opacity: '0.4' } : { opacity: '1' }"
		>
			<table>
				<tr>
					<th>Id</th>
					<th>EXP date</th>
					<th>Ref</th>
					<th>Brand</th>
					<th>Product name</th>
					<th>Purchase price</th>
					<th>Qty</th>
					<th>Selling price</th>
					<th>Edit</th>
				</tr>

				<tr v-for="prod in productList" :key="prod.id">
					<td>{{ prod.id }}</td>
					<td
						:style="
							(Number(prod.ExDate) - Number(new Date())) / 8.64e7 < 10
								? { color: 'red' }
								: { color: 'black' }
						"
					>
						{{ new Date(prod.ExDate).toDateString() }}
					</td>
					<td>{{ prod.barcode }}</td>
					<td>{{ prod.brand }}</td>
					<td>{{ prod.name }}</td>
					<td>{{ prod.Pprice + " DZD" }}</td>
					<td :style="prod.qty < 0 ? { color: 'red' } : { color: 'black' }">
						{{ prod.qty.toFixed(2) }}
						{{ prod.cat == "weight" ? "Kg" : "" }}
					</td>
					<td>{{ prod.Sprice + " DZD" }}</td>
					<td>
						<button @click="deleteProd(prod)" class="btn">
							<img src="@/assets/icons/Delete.png" alt="" />
						</button>
						<button @click="showEditProd(prod)" class="btn editBtn">
							<img src="@/assets/icons/Edit.svg" alt="" />
						</button>
					</td>
				</tr>
			</table>
		</div>
	</div>
</template>

<script>
import search from "./search.vue";
import Localbase from "localbase";
let db = new Localbase("db");
const smallTalk = require("smalltalk");
import primButton from "../primButton.vue";

export default {
	name: "stockScreen",
	components: {
		search,
		primButton,
	},
	data() {
		return {
			Sprice: Number,
			Pprice: Number,
			brand: "",
			qty: Number,
			name: "",
			showInput: false,
			products: [],
			img: null,
			barcode: "",
			cat: null,
			exDate: Number,
			showEdit: false,
			editProd: [],
			showExp: false,
		};
	},

	methods: {
		showInputForm() {
			this.showInput = !this.showInput;
		},
		addToStock() {
			let newProduct = {
				id: Math.floor(Math.random() * 1000000),
				brand: this.brand,
				Pprice: this.Pprice,
				Sprice: this.Sprice,
				name: this.name,
				qty: this.qty,
				image: this.img,
				barcode: this.barcode,
				ExDate: new Date(this.exDate),
				cat: this.cat == null ? "All" : this.cat,
			};
			this.products.push(newProduct);
			this.$store.dispatch("addToStock", newProduct);
			db.collection("product").add(newProduct);
			this.img = null;
			this.brand = "";
			this.name = "";
			this.Pprice = Number;
			this.Sprice = Number;
			this.barcode = "";
			this.qty = null;
			this.exDate = null;
		},
		onFileSelected(event) {
			//to add image
			const image = event.target.files[0];
			const reader = new FileReader();
			reader.readAsDataURL(image);
			reader.onload = (e) => {
				this.img = e.target.result;
			};
		},
		deleteProd(prod) {
			smallTalk
				.confirm("Question", "are you sure?")
				.then(() => {
					let index = this.productList.findIndex(
						(product) => product.id === prod.id
					);
					this.$store.dispatch("deleteProduct", index);
					db.collection("product").doc({ id: prod.id }).delete();
				})
				.catch(() => {
					console.log("no");
				});
		},
		showEditProd(prod) {
			this.showEdit = true;
			this.editProd = prod;
		},
		updateProd() {
			db.collection("product")
				.doc({ id: this.editProd.id })
				.update({
					brand: this.editProd.brand,
					Pprice: this.editProd.Pprice,
					Sprice: this.editProd.Sprice,
					name: this.editProd.name,
					qty: this.editProd.qty,
					barcode: this.editProd.barcode,
					ExDate: new Date(this.editProd.ExDate),
				});
		},
		checkBar() {
			this.productList.forEach((el) => {
				if (el.barcode == this.barcode) {
					document.getElementById("barcode").blur();
					this.showEdit = true;
					this.editProd = el;
					this.barcode = "";
				}
			});
		},
		showExpired() {
			this.showExp = !this.showExp;
			if (this.showExp) {
				this.$store.dispatch("sort_by_expDate");
			} else {
				this.$store.commit("sort_all_products");
			}
		},
	},
	computed: {
		productList() {
			return this.$store.getters.GetProduct;
		},
		categories() {
			return this.$store.getters.GetCategories;
		},
	},
};
</script>

<style scoped>
td,
th {
	border-bottom: 2px solid #ddd;
	padding: 10px 0px;
}

table {
	text-align: center;
	width: 100%;
	border-collapse: collapse;
}
table td {
	font-weight: 550;
}
.stock {
	position: relative;
}

.product-input,
.edit-fact {
	position: absolute;
	width: 50%;
	height: 68vh;
	z-index: 2;
	left: 0;
	right: 0;
	margin-top: 3rem;
	margin-left: auto;
	margin-right: auto;
	background-color: #fff;
	box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
	border-radius: 18px;
}
.product-input form {
	width: 100%;
	padding-top: 30px;
	height: 100%;
	display: flex;
	flex-direction: column;
	margin-top: 10px;
}

.i-sec {
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: space-around;
}

i-sec label {
	display: block;
	width: 100%;
}

.i-sec div {
	display: flex;
	margin-bottom: 10px;
	flex-direction: column;
	align-items: center;
	width: 40%;
	align-items: flex-start;
}

input {
	border: none;
	border-bottom: 2px solid #ebebeb;
	transition: 0.3s ease;
}
input:focus {
	outline: none;
	border-bottom: 2px solid #333;
}

select {
	padding: 5px 10px;
}

.product-input input {
	display: block;
	margin-bottom: 10px;
	padding: 10px 20px;
	font-weight: 550;
}
.product-table {
	width: 100%;
	padding-top: 10px;
	max-height: 86vh;
	overflow: scroll;
}
.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.4s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
	opacity: 0;
}

.stock-header {
	width: 100%;
	height: 10vh;
	display: flex;
	justify-content: space-around;
	align-items: center;
}
#addProduct {
	padding: 10px 20px;
	width: 140px;
	cursor: pointer;
	background-color: #e1045f;
	border: none;
	border-radius: 10px;
	color: #fff;
	display: flex;
	align-items: center;
	justify-content: space-around;
	box-shadow: rgba(0, 0, 0, 0.404) 0px 3px 6px;
	position: relative;
}
#addProduct img {
	width: 20px;
	height: auto;
}
button:active {
	size: 0.5px;
	animation: btnClicked 0.3s;
}
button:focus {
	outline: none;
}
button {
	cursor: pointer;
}
.close-form {
	position: absolute;
	padding: 2px 4px;
	font-size: 14pt;
	color: red;
	bottom: 20px;
	left: 50%;
	transform: translate(-50%, 50%);
}
.product-input h3 {
	position: absolute;
	left: 50%;
	transform: translate(-50%, 50%);
}
.btn {
	border: none;
	padding-left: 10px;
	background-color: transparent;
	cursor: pointer;
}
</style>
