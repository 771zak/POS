<template>
  <div class="history">
    <h1 style="padding: 10px">History</h1>
    <img src="@/assets/icons/Filter.png" @click="showSort()" />
    <div class="sortByDAte" v-if="showSortDate">
      <form @submit.prevent="filterByDate()">
        <input
          type="radio"
          id="today"
          name="date"
          value="today"
          v-model="picked"
          checked
        />
        <label for="today">Today</label><br />

        <input
          type="radio"
          id="yesterday"
          name="date"
          value="yesterday"
          v-model="picked"
        />
        <label for="yesterday">Yesterday</label><br />

        <input
          type="radio"
          id="month"
          name="date"
          value="month"
          v-model="picked"
        />
        <label for="month">This month</label><br />
        <input
          type="radio"
          id="Lmonth"
          name="date"
          value="Lmonth"
          v-model="picked"
        />
        <label for="Lmonth">Last month</label><br />

        <input type="radio" id="all" name="date" value="all" v-model="picked" />
        <label for="all">All</label><br />

        <input type="submit" />
      </form>
    </div>
    <div class="history-content">
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Client</th>
            <th>Seller</th>
            <th>Items</th>
            <th>Total S-price</th>
            <th>Total P-price</th>
            <th>Benifits</th>
          </tr>
        </thead>

        <tbody id="table">
          <tr v-for="his in history" :key="his" @click="showFact(his)">
            <td>
              {{ new Date(his.date).toDateString() }} |
              {{ new Date(his.date).getHours() }}:{{
                new Date(his.date).getMinutes()
              }}:{{ new Date(his.date).getSeconds() }}
            </td>
            <td>Standard</td>
            <td>{{ his.seller }}</td>
            <td>{{ JSON.parse(his.products).length }} prd</td>
            <td>{{ his.totalS.toFixed(2) }} DZD</td>
            <td>{{ his.totalP.toFixed(2) }} DZD</td>
            <td>{{ (his.totalS - his.totalP).toFixed(2) }} DZD</td>
          </tr>
        </tbody>
        <thead>
          <tr style="font-weight: 600">
            <th>Date</th>
            <th>Client</th>
            <th>Seller</th>
            <th>Items</th>
            <th style="font-weight= 900; color: #000">
              {{ total.toFixed(2) }} DZD
            </th>
            <th style="color: #d72323; font-weight= 900;">
              {{ totalP.toFixed(2) }} DZD
            </th>
            <th style="color: #17b978; font-weight= 900;">
              {{ (total - totalP).toFixed() }} DZD
            </th>
          </tr>
        </thead>
      </table>
    </div>

    <div class="edit-fact" v-if="showEditFact">
      <h4>
        {{ new Date(factDate).toDateString() }} |
        {{ new Date(factDate).getHours() }}:{{
          new Date(factDate).getMinutes()
        }}:{{ new Date(factDate).getSeconds() }}
      </h4>
      <h4></h4>
      <table class="factTable">
        <thead>
          <tr>
            <th>Brand</th>
            <th>Product Name</th>
            <th>S-Price</th>
            <th>Quantity</th>
            <th>Total S-price</th>
          </tr>
        </thead>
        <tbody id="table">
          <tr v-for="his in factData" :key="his">
            <td>{{ his.product.brand }}</td>
            <td>{{ his.product.name }}</td>
            <td>{{ his.product.Sprice }}</td>
            <td>
              {{ his.quantity }} {{ his.product.cat == "weight" ? "kg" : "" }}
            </td>
            <td>{{ (his.quantity * his.product.Sprice).toFixed(2) }} DZD</td>
          </tr>
        </tbody>
      </table>
      <button class="close-fact" @click="this.showEditFact = false">X</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "historySceen",
  data() {
    return {
      showSortDate: false,
      picked: "",
      showEditFact: false,
      factData: [],
      factDate: Number,
    };
  },
  computed: {
    history() {
      return this.$store.getters.Gethistory;
    },
    total() {
      return this.$store.getters.getTotalS;
    },
    totalP() {
      return this.$store.getters.getTotalP;
    },
  },
  methods: {
    showFact(fact) {
      this.showEditFact = true;
      this.factData = JSON.parse(fact.products);
      this.factDate = fact.date;
    },
    showSort() {
      this.showSortDate = !this.showSortDate;
    },
    filterByDate() {
      this.$store.dispatch("filterByDate", this.picked);
      this.showSortDate = false;
    },
    close() {
      this.showEditFact = false;
    },
  },
  mounted() {
    var element = document.getElementById("table");
    element.scrollTop = element.scrollHeight - element.clientHeight;
    this.$store.dispatch("filterByDate", "today");
  },
};
</script>

<style scoped>
.history {
  width: 100%;
  padding: 20px;
  position: relative;
}
.history img {
  position: absolute;
  top: 40px;
  right: 70px;
  cursor: pointer;
}
.history-content {
  width: 100%;
}
table {
  width: 100%;
  table-layout: auto;
  border-collapse: collapse;
  text-align: center;
  font-weight: 550;
}
tbody {
  display: block;
  overflow: auto;
  height: 70vh;
}
thead tr {
  display: block;
}
th,
td {
  padding: 15px 0px;
  width: 300px;
  border-bottom: 2px solid #ddd;
}
tr {
  cursor: pointer;
  transition: 0.15s ease;
}
tr:hover {
  background: #fff;
}
th {
  background: #fff;
}
.sortByDAte {
  position: absolute;
  width: 200px;
  height: 200px;
  background: #fff;
  right: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  top: 70px;
  box-shadow: 0px 10px 15px 3px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
}
.sortByDAte form {
  font-size: 12pt;
}
.sortByDAte label {
  margin-left: 5px;
  cursor: pointer;
  display: inline-block;
}
.sortByDAte label::after {
  content: "";
}
.edit-fact {
  position: absolute;
  text-align: center;
  width: 50%;
  height: 68vh;
  z-index: 2;
  top: 0;
  left: 50%;
  transform: translate(-50%, 7rem);
  background-color: #fff;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  border-radius: 18px;
}
.edit-fact h4:first-child {
  margin-top: 30px;
  margin-bottom: 10px;
}
.factTable {
  overflow: scroll;
}
.factTable tbody {
  max-height: 375px;
}
.edit-fact table td {
  background: #f7f7f7;
}
.close-fact {
  padding: 5px 6px;
  color: red;
}
</style>
