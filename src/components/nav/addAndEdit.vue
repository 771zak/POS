<template>
  <transition name="fade">
    <div class="product-input" v-if="showInput">
      <h3>Add product</h3>
      <form @submit.prevent="addToStock()">
        <div class="i-sec one">
          <label for="brand">Enter the brand:</label>
          <input
            type="text"
            id="brand"
            placeholder="Brand"
            v-model="brand"
            required
          />

          <label for="name">Enter the name:</label>
          <input
            required
            type="text"
            id="name"
            placeholder="Product name"
            v-model="name"
          />

          <label for="barcode">Enter the barcode:</label>
          <input
            required
            type="number"
            id="barcode"
            placeholder="BarCode"
            v-model="barcode"
          />

          <label for="categorie">Enter the categorie:</label>
          <select id="categorie" v-model="cat">
            <option :value="cat" v-for="cat in categories" :key="cat">
              {{ cat }}
            </option>
          </select>
        </div>
        <div class="i-sec two">
          <label for="qte">Enter the quantity:</label>
          <input
            required
            type="number"
            id="qte"
            step="any"
            placeholder="Qty"
            v-model="qty"
          />

          <label for="Pprice">Enter the purchase price:</label>
          <input
            required
            type="number"
            step="any"
            id="Pprice"
            placeholder="Purchase price"
            v-model="Pprice"
          />

          <label for="Sprice">Enter the Selling price:</label>
          <input
            required
            type="number"
            id="Sprice"
            placeholder="Selling price"
            v-model="Sprice"
          />
          <input
            type="file"
            name="img"
            accept="image/*"
            @change="onFileSelected"
          />
        </div>
        <div class="i-sec three">
          <input type="submit" value="Add to stock" />
        </div>
      </form>
      <button @click="this.showInput = !this.showInput" class="close-form">
        X {{ product.name }}
      </button>
    </div>
  </transition>
</template>

<script>
export default {
  name: "addAndEdit",
  props: ["product"],
};
</script>

<style></style>
