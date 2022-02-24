<template>
  <div class="settings">
    <div class="set-header">
      <h1>Settings</h1>
      <div class="set-nav">
        <router-link to="/home/settings/accountSettings">
          <span>Acount</span>
        </router-link>
        <router-link to="/home/settings/yourStore">
          <span>Your Store</span>
        </router-link>
      </div>
    </div>
    <div class="content">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: "settingsScreen",
  mounted() {
    this.$router.push({ name: "accountSettings" });
  },
};
</script>

<style>
.settings {
  display: flex;
  justify-content: space-around;
  align-items: center;
  max-height: 100vh;
  width: 95%;
  color: black;
}
.set-header {
  height: 90vh;
  width: 20%;
  box-shadow: 10px 10px 11px -3px rgba(0, 0, 0, 0.1);
  border-radius: 18px;
  background-color: #fff;
}
.set-nav {
  width: 100%;
  margin-top: 20px;
  height: 90%;
  display: flex;
  align-items: center;
  /*justify-content: space-around;*/
  flex-direction: column;
}
.set-nav h1 {
  align-self: start;
}
.set-nav a {
  text-decoration: none;
  color: black;
  margin-top: 30px;
}
.set-nav .router-link-active {
  background: #acacb8;
  padding: 10px 20px;
  border-radius: 10px;
  color: black;
  text-decoration: none;
}
.content {
  width: 75%;
  height: 90vh;
  border-radius: 18px;
  background-color: #fff;
  box-shadow: 10px 10px 11px -3px rgba(0, 0, 0, 0.1);
}
</style>
