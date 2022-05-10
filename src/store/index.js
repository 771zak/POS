import Localbase from "localbase";
import { createStore } from "vuex";
//import { ipcRenderer } from "electron";
let db = new Localbase("db");
const smallTalk = require("smalltalk");

export default createStore({
	state: {
		cart: [[]],
		products: [],
		filteredList: [],
		cartId: 0,
		history: [],
		filteredHis: [],
		categories: [],
		receipt: [],
	},

	getters: {
		cartTotalPrice(state) {
			let total = 0;
			if (state.cart[state.cartId].length > 0) {
				state.cart[state.cartId].forEach((item) => {
					total += item.product.Sprice * item.quantity;
				});
				return total;
			} else {
				return (total = 0);
			}
		},
		getTotalS(state) {
			let total = 0;
			for (let i = 0; i < state.filteredHis.length; i++) {
				total += state.filteredHis[i].totalS;
			}
			return total;
		},
		getTotalP(state) {
			let total = 0;
			state.filteredHis.forEach((el) => {
				total += el.totalP;
			});
			return total;
		},
		search(state) {
			return state.search;
		},
		GetProduct(state) {
			return state.filteredList;
		},
		GetCategories(state) {
			return state.categories;
		},
		Gethistory(state) {
			return state.filteredHis;
		},
	},

	mutations: {
		addToCart(state, payload) {
			let item = payload;
			let newCart = state.cartId;
			item = { ...item, quantity: 1 };
			if (state.cart[newCart].length > 0) {
				let bool = state.cart[newCart].some((i) => i.product == item.product);
				if (bool) {
					let itemIndex = state.cart[newCart].findIndex(
						(el) => el.product == item.product
					);
					state.cart[newCart][itemIndex].quantity += 1;
				} else {
					state.cart[newCart].push(payload);
				}
			} else {
				state.cart[newCart].push(payload);
			}
		},
		increase(state, qte) {
			qte.quantity += 1;
		},
		decrease(state, qte) {
			qte.quantity -= 1;
			let i = state.cart[state.cartId].indexOf(qte);
			if (qte.quantity == 0) {
				state.cart[state.cartId].splice(i, 1);
			}
		},
		deleteFromCart(state, prod) {
			let i = state.cart[state.cartId].indexOf(prod);
			state.cart[state.cartId].splice(i, 1);
		},
		changeQte(sate, qte) {
			qte[1].quantity = qte[0];
		},
		deleteCart(state) {
			if (state.cart.length == 1) {
				state.cart = [[]];
			} else {
				state.cart = [[]];
				state.cartId = 0;
			}
		},
		Fetch_Products(state) {
			db.collection("product")
				.get()
				.then((product) => {
					state.products = product;
					state.filteredList = product;
				});

			db.collection("history")
				.get()
				.then((his) => {
					state.history = his;
					state.filteredHis = his;
				});

			db.collection("settings")
				.get()
				.then((set) => {
					localStorage.setItem("settings", JSON.stringify(set));
				});

			db.collection("categories")
				.get()
				.then((cats) => {
					state.categories = cats;
				});
		},
		SET_SEARCHED_lIST(state, rs) {
			state.filteredList = rs;
		},
		undoSearch(state) {
			db.collection("product")
				.get()
				.then((product) => {
					state.filteredList = product;
				});
		},
		undoCat(state) {
			state.filteredList = state.products;
		},
		addToStock(state, product) {
			state.products.push(product);
		},
		cartId(state, payload) {
			state.cartId = payload;
		},
		proceed(state, payload) {
			if (state.cart[payload].length > 0) {
				let user_name = JSON.parse(localStorage.getItem("user-info"));
				//to get the total selling price and total purchase price
				let total = 0;
				let totalp = 0;
				state.cart[payload].forEach((el) => {
					total += el.product.Sprice * el.quantity;
					totalp += el.product.Pprice * el.quantity;
					return total, totalp;
				});

				let item = {
					date: Number(new Date()),
					products: JSON.stringify(state.cart[payload]),
					seller: user_name.userName,
					totalS: total,
					totalP: totalp,
				};

				//to decrease the quantity from the stock
				state.cart[payload].forEach((el) => {
					state.products.forEach((item) => {
						if (item.id == el.product.id) {
							item.qty -= el.quantity;
							db.collection("product").doc({ id: el.product.id }).update({
								qty: item.qty,
							});
						}
					});
				});

				state.history.push(item);
				db.collection("history").add(item);
				state.cart[payload] = [];
			} else {
				smallTalk.alert("Error", "the cart is empty!!");
			}
		},
		proceedAndPrint(state, payload) {
			if (state.cart[payload].length > 0) {
				let user_name = JSON.parse(localStorage.getItem("user-info"));
				//to get the total selling price and total purchase price
				let total = 0;
				let totalp = 0;
				state.cart[payload].forEach((el) => {
					total += el.product.Sprice * el.quantity;
					totalp += el.product.Pprice * el.quantity;
					return total, totalp;
				});

				let item = {
					date: Number(new Date()),
					products: JSON.stringify(state.cart[payload]),
					seller: user_name.userName,
					totalS: total,
					totalP: totalp,
				};

				//to decrease the quantity from the stock
				state.cart[payload].forEach((el) => {
					state.products.forEach((item) => {
						if (item.id == el.product.id) {
							item.qty -= el.quantity;
							db.collection("product").doc({ id: el.product.id }).update({
								qty: item.qty,
							});
						}
					});
				});

				state.history.push(item);
				db.collection("history").add(item);
				//ipcRenderer.send("load-receipt", item);
				state.receipt = item;
				localStorage.setItem("receipt", JSON.stringify(item));
				state.cart[payload] = [];
			} else {
				smallTalk.alert("Error", "the cart is empty!!");
			}
		},
		filterCat(state, rs) {
			state.filteredList = rs;
		},
		filterByDate(state, rs) {
			state.filteredHis = rs;
		},
		sort_by_exDate(state, rs) {
			state.filteredList = rs;
		},
		sort_all_products(state) {
			state.filteredList = state.products;
		},
	},

	actions: {
		increase({ commit }, qte) {
			commit("increase", qte);
		},
		decrease({ commit }, qte) {
			commit("decrease", qte);
		},
		deleteFromCart({ commit }, prod) {
			commit("deleteFromCart", prod);
		},
		changeQte({ commit }, prod, qte) {
			commit("changeQte", prod, qte);
		},
		fetching_data({ commit }) {
			commit("Fetch_Products");
		},
		search({ commit, state }, input) {
			let rs = state.products.filter((el) => {
				return (el.name + el.brand).match(input);
			});
			commit("SET_SEARCHED_lIST", rs);
		},
		addToStock({ commit }, product) {
			commit("addToStock", product);
		},
		deleteProduct({ state }, index) {
			state.filteredList.splice(index, 1);
		},
		sort_by_expDate({ state, commit }) {
			let newArr = [];
			state.products.forEach((el) => {
				let ExDate = Number(el.ExDate);
				let today = Number(new Date());
				let resDays = (ExDate - today) / 8.64e7;
				if (resDays < 10) {
					newArr.push(el);
					commit("sort_by_exDate", newArr);
				}
			});
		},
		addNewCart({ state }) {
			state.cart.push([]);
		},
		cartId({ commit }, payload) {
			commit("cartId", payload);
		},
		proceed({ commit }, payload) {
			commit("proceed", payload);
		},
		proceedAndPrint({ commit }, payload) {
			commit("proceedAndPrint", payload);
		},
		filterCat({ commit, state }, cat) {
			if (cat == "All") {
				commit("filterCat", state.products);
			} else {
				let rs = state.products.filter((el) => {
					return el.cat.match(cat);
				});
				commit("filterCat", rs);
			}
		},
		filterByDate({ commit, state }, payload) {
			let rs = state.history.filter((el) => {
				let day = new Date().getDate();
				let month = new Date().getMonth();
				if (payload == "today") {
					if (
						new Date(el.date).getDate() == day &&
						new Date(el.date).getMonth() == month
					) {
						return el;
					}
				} else if (payload == "yesterday") {
					if (
						new Date(el.date).getDate() == day - 1 &&
						new Date(el.date).getMonth() == month
					) {
						return el;
					}
				} else if (payload == "month") {
					if (new Date(el.date).getMonth() == month) {
						return el;
					}
				} else if (payload == "Lmonth") {
					if (new Date(el.date).getMonth() == month - 1) {
						return el;
					}
				} else {
					return el;
				}
			});
			commit("filterByDate", rs);
		},
	},

	modules: {},
});
