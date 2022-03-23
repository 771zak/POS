<template>
  <div class="cashier-right">
    <div class="c-r-header">
      <h1>
        Order list
        <select v-model="cartId">
          <option :value="item" v-for="item in cartList" :key="item">
            {{ item }}
          </option>
        </select>
      </h1>
      <button>
        <img src="@/assets/icons/cart.png" @click="addNewCart()" />
      </button>
    </div>
    <div class="c-r-cart" id="cashier-cart">
      <h1>Items</h1>
      <cart-card
        v-for="item in cart[cart_id]"
        :key="item.product.id"
        :name="item.product.name"
        :brand="item.product.brand"
        :price="item.product.Sprice"
        :prod="item"
        :quantity="item.quantity"
      />
    </div>
    <div class="checkout">
      <div class="subTotal">
        <h3>SubTotal</h3>
        <h2>{{ cartTotalPrice.toFixed(2) }} <span>DZD</span></h2>
      </div>
      <div class="tax">
        <h3 :style="tax == 0 ? {'text-decoration':'line-through'} : {'text-decoration': 'none'}">Tax ({{ tax }})%</h3>
        <h2>{{ (cartTotalPrice * (tax / 100)).toFixed(2) }} <span>DZD</span></h2>
      </div>
      <div class="total">
        <h3>Total</h3>
        <h3>{{ (cartTotalPrice * (1 + tax / 100)).toFixed(2) }} <span>DZD</span></h3>
      </div>
      <button class="proceed" @click="proceed()">Proceed</button>
    </div>
  </div>
</template>

<script>
import cartCard from "./cartCard.vue";
import sound from "@/assets/cash.mp3";
import Localbase from "localbase";
/*import { ipcRenderer } from "electron";*/
let db = new Localbase("db");


export default {
  name: "cashierRight",
  data() {
    return {
      cartList: [0],
      cartId: 0,
      tax: 0,
    };
  },
  methods: {
    addNewCart() {
      this.$store.dispatch("addNewCart");
      this.cartList.push(this.cartList.length);
      this.cartId++;
    },
    proceed() {
      let sfx = new Audio(sound);
      sfx.play();
      this.$store.dispatch("proceed", this.cartId);
      if (this.cartId > 0) {
        this.cartId--;
        this.cartList.pop();
      }
    },
  },
  computed: {
    cart() {
      return this.$store.state.cart;
    },
    cartTotalPrice() {
      return this.$store.getters.cartTotalPrice;
    },
    cart_id() {
      return this.$store.state.cartId;
    },
  },
  components: {
    cartCard,
  },
  mounted() {
    db.collection("settings")
      .get()
      .then((set) => {
        this.tax = set[0].tax;
      });
    window.addEventListener("keypress", (e) => {
			console.log(e.keyCode);
			if (e.keyCode == 115) { // when use click "s"
        if (this.cart[this.cartId].length > 0) {
          let sfx = new Audio(sound);
          sfx.play();
          this.$store.dispatch("proceed", this.cartId);
          if (this.cartId > 0) {
            this.cartId--;
            this.cartList.pop();
          }
        } else {
          console.log("ampty array");
        }
			} else if (e.keyCode == 112) { // when user click "p"
				console.log("yay it work's");
				if (this.cart[this.cartId].length > 0) {
          let sfx = new Audio(sound);
          sfx.play();
					this.$store.dispatch("proceed", this.cartId);
          if (this.cartId > 0) {
            this.cartId--;
            this.cartList.pop();
          }
        } else {
          console.log("ampty array");
        }

			}
    });
  },
  unmounted() {
    this.$store.commit("deleteCart");
    this.cartList = [0];
    this.cartId = 0;
  },
  updated() {
    this.$store.dispatch("cartId", this.cartId);
		var element = document.getElementById("cashier-cart");
		element.scrollTop = element.scrollHeight - element.clientHeight
  },
};
</script>

<style>
.cashier-right {
  background-color: #fff;
  width: 100%;
  height: 97vh;
  border-radius: 18px;
  box-shadow: #0000003f 0px 3px 8px;
}
.c-r-header {
  display: flex;
  height: 6vh;
  align-items: center;
  justify-content: space-around;
}
.c-r-header select {
  font-size: 14pt;
  padding: 5px 10px;
}
.c-r-header h1 {
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 24px;
  color: #000000;
}
.c-r-header p {
  font-size: 15px;
  color: rgb(0, 0, 0, 0.46);
}
.c-r-header button,
.c-r-header button:focus {
  border: none;
  background-color: transparent;
  outline: none;
  cursor: pointer;
}
.c-r-header button:active {
  transition: ease;
  opacity: 0.5;
}
.c-r-cart {
  height: 70vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: scroll;
}
.c-r-cart > h1:first-of-type {
  margin-bottom: 20px;
  line-height: 21px;
  font-size: 18pt;
  color: rgba(0, 0, 0, 0.7);
  position: sticky;
  top: 0px;
  width: 100%;
  height: max-content;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  background-color: #fff;
}
.checkout {
  width: 100%;
  height: 20vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-evenly;
}
.checkout div {
  display: flex;
  width: 100%;
  justify-content: space-around;
}
.checkout div h2 {
  font-size: 16pt;
  color: rgba(0, 0, 0, 0.3);
}
.checkout div span {
  font-size: 13pt;
}
.total {
  margin-top: 5px;
  padding-top: 5px;
  border-top: 2px dashed rgba(0, 0, 0, 0.3);
  font-size: 18pt;
}
.proceed {
  width: 90%;
  height: 34px;
  left: 880px;
  border: none;
  background: #ef1a69;
  border-radius: 10px;
  cursor: pointer;
  color: #fff;
  font-size: 15pt;
}
.proceed:active {
  animation: btnClicked 0.2s;
}
.proceed:focus {
  outline: none;
}
</style>
