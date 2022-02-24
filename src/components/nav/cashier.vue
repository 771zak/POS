<template>
  <div class="cashier">
    <cashier-left />
    <cashier-right />
  </div>
</template>

<script>
import cashierRight from "./cashier/cashierRight.vue";
import cashierLeft from "./cashier/cashierLeft.vue";
export default {
  name: "cashierScreen",
  components: {
    cashierRight,
    cashierLeft,
  },
	created() {
	}
};
</script>

<style>
.cashier {
  display: flex;
}
.cashier-left {
  flex: 70%;
}
.cashier-right {
  flex: 30%;
}
</style>
