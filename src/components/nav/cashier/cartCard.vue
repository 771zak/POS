<template>
  <div class="cart-card">
    <div class="cart-info">
      <h1 style="font-size: 16pt">{{ brand + " " + name }}</h1>
			<h3>{{price}} DZD</h3>
			<h2>{{ (price * quantity).toFixed(2)}} DZD</h2>
    </div>
    <div class="cart-btns">
      <div>
        <button @click="decrease(prod)">-</button>
        <h3 @click="showEditQte(0)" v-show="!editQte">{{ quantity }}</h3>
				<input
					type="text" 
					id="qauntity"
					@keypress.enter="changeQte(prod)"
					@blur="changeQte(prod)"
					v-show="editQte" 
					v-model="qte"
					step="any" 
				/>
        <button @click="increase(prod)">+</button>
      </div>
      <button @click="deleteFromCart(prod)" class="deleteBTn">
        <img src="@/assets/icons/deleteCart.png" alt="" />
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "cartCard",
  props: ["prod", "name", "brand", "price", "quantity"],
  data() {
		return {
			editQte: false,
			qte: 1
		};
  },
  methods: {
    decrease(qte) {
      this.$store.dispatch("decrease", qte);
			this.qte -= 1;
    },
    increase(qte) {
      this.$store.dispatch("increase", qte);
			this.qte += 1;
    },
    deleteFromCart(prod) {
      this.$store.dispatch("deleteFromCart", prod);
    },
		showEditQte() {
			this.editQte = true;
			setTimeout(()=>{
				document.getElementById('qauntity').focus();
			}, 1)
		},
		changeQte(prod) {
			this.editQte = false;
			this.$store.dispatch("changeQte",[Number(this.qte), prod])
		}
  },
};
</script>

<style>
.cart-card {
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 10px;
  min-height: 100px;
  background-color: #fff;
  border: 1px solid rgba(0, 0, 0, 0.356);
  border-radius: 5px;
  margin-bottom: 10px;
  width: 90%;
  transition: 3s ease-out;
}
.cart-info {
  flex: 60%;
}
.cart-btns {
  flex: 40%;
  display: flex;
  width: 95px;
  height: 90px;
  justify-content: space-around;
  width: 20px;
  align-items: center;
  flex-direction: column;
}
.cart-btns div {
  display: flex;
}
.cart-btns button,
.cart-btns h3,
.cart-btns input,
.cart-card button {
  width: 45px;
  height: 30px;
  background: #fffefe;
  border: 1px solid rgba(0, 0, 0, 0.22);
  border-radius: 8px;
  cursor: pointer;
}
.cart-btns button:focus,
.cart-card button:focus {
  outline: none;
  opacity: 0.3s;
}
.cart-btns button:active,
.cart-card button:active {
  animation: btnClicked 0.2s;
}
.cart-btns h3, .cart-btns input {
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(225, 4, 95, 0.6);
}
.deleteBTn {
  background-color: #fcccd9;
  border: 1px solid rgba(239, 26, 105, 0.44);
  border-radius: 8px;
}
#qauntity {
	width: 40px;
	text-align: center;
	font-size: 14pt;
}
</style>
