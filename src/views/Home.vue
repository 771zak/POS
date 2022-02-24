<template>
  <div class="main">
    <div class="header">
      <profile />
      <div class="nav">
        <router-link to="/home/cashier"
          ><img src="..\assets\icons\CashRegister.png" alt="" /><span
            >Cashier</span
          ></router-link
        >
        <router-link to="/home/stock"
          ><img src="..\assets\icons\Warehouse.png" alt="" /><span
            >Stock</span
          ></router-link
        >
        <router-link to="/home/history"
          ><img src="..\assets\icons\History.png" alt="" /><span
            >History</span
          ></router-link
        >
        <router-link to="/home/settings">
          <img src="../assets/icons/settings.png" />
          <span>Settings</span>
        </router-link>
      </div>
      <button @click="signOut()">
        <img src="../assets/icons/Shutdown.png" alt="" />
      </button>
    </div>
    <router-view />
  </div>
</template>

<script>
import profile from "../components/nav/profile.vue";
import { ipcRenderer } from "electron";
export default {
  name: "homeScreen",
  components: {
    profile,
  },
  methods: {
    signOut() {
      var r = confirm("You want to exit??");
      if (r) {
        localStorage.removeItem("user-info");
        this.$router.push({ name: "signIn" });
        ipcRenderer.send("close");
      }
    },
  },
  created() {
    this.$router.push({ name: "cashier" });
    this.$store.dispatch("fetching_data");
    const notify = new Notification("Welcome", {
      body: "Take a look on the expired products",
    });
    notify.onclick = () => {
      this.$router.push({ name: "stock" });
      this.$store.dispatch("sort_by_expDate");
    };
  },
};
</script>

<style>
.main {
  width: 100%;
  height: 97vh;
  display: flex;
}
.header {
  max-width: 5%;
  height: 97vh;
  background-color: #320617;
  border-radius: 18px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  box-shadow: #0000003f 6px 3px 8px;
}
.nav {
  padding: 10px;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 350px;
  justify-content: space-around;
  align-items: center;
}
.router-link-active,
.router-link-exact-active {
  background-color: #6f042d;
  transition: 0.3s ease;
}
.nav a {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  width: 60px;
  height: 60px;
  color: white;
  text-decoration: none;
}
.nav a span {
  padding-top: 3px;
}
.header button {
  margin-bottom: 30px;
  display: block;
  border: none;
  background: none;
  cursor: pointer;
}
.cashier,
.history,
.stock {
  width: 95%;
  height: 97vh;
}
</style>
