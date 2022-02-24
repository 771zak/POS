<template>
	<transition name="fade">
		<div class="product-card">
			<img :src="image" alt="" />
			<div class="p-c-info">
				<h1>{{ brand + " " + name }}</h1>
				<h4>{{ price + " DZD" }}</h4>
				<button>Add to basket</button>
			</div>
		</div>
	</transition>
</template>

<script>
export default {
  name: "productCard",
  props: ["name", "price", "image", "brand"],
  data() {
    return {};
  },
};
</script>

<style>
.product-card {
  width: 350px;
  background-color: #ffffff;
  border-radius: 10px;
  min-height: 100px;
  margin: 10px 5px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 2px 5px;
  cursor: default;
}
.p-c-info {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}
.product-card img {
  width: 50px;
  height: auto;
  border-radius: 10px;
}
.product-card h1 {
  font-size: 14pt;
  line-height: 19px;
  color: rgba(0, 0, 0, 0.8);
}
.product-card h4 {
  font-size: 13pt;
  line-height: 19px;
  color: rgba(0, 0, 0, 0.36);
}
.product-card button {
  padding: 5px 10px;
  cursor: pointer;
  border: 2px solid rgba(0, 0, 0, 0.4);
  border-radius: 10px;
  background-color: #ffffff;
  color: #e1045f;
}
.product-card button:focus {
  outline: none;
}
.product-card button:active {
  animation: btnClicked 0.1s;
}

@keyframes btnClicked {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
