<template>
  <div class="input-container">
    <input
      type="text"
      class="filter-search"
      placeholder="Search by product name or brand"
      v-model="input"
      v-on:input="search()"
    />
    <img src="@/assets/icons/Group.png" alt="" />
  </div>
</template>

<script>
export default {
  name: "searchBar",
  data() {
    return {
      input: "",
    };
  },
  methods: {
    search() {
      if (this.input) {
        this.$store.dispatch("search", this.input);
      } else {
        this.$store.commit("undoSearch");
      }
    },
  },
};
</script>

<style>
.input-container input {
  padding: 15px 40px;
  border: none;
  border-radius: 10px;
  width: 490px;
  margin-left: 40px;
  font-size: 14pt;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
}
.input-container input:focus {
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
</style>
