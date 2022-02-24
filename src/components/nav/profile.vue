<template>
  <div class="profile" @click="this.showProfile = !this.showProfile">
    <h2>{{ firstLetter }}</h2>
  </div>
  <transition name="fade">
    <div class="profile-setting" v-if="showProfile">
      <button @click="changeProfile()" class="btn">Sign-out</button>
      <button class="btn" @click="showPro()">Edit profile</button>
    </div>
  </transition>
</template>

<script>
export default {
  name: "profileCont",
  data() {
    return {
      firstLetter: "",
      showProfile: false,
    };
  },
  methods: {
    changeProfile() {
      localStorage.removeItem("user-info");
      this.$router.push({ name: "signIn" });
    },
    showPro() {
      this.$router.push({ name: "accountSettings" });
      this.showProfile = false;
    },
  },
  mounted() {
    let user_name = JSON.parse(localStorage.getItem("user-info"));
    return (this.firstLetter = user_name.userName[0]);
  },
};
</script>

<style>
.profile {
  width: 46px;
  height: 46px;
  background-color: #6f042d;
  margin-top: 20px;
  border-radius: 12px;
  color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  text-transform: uppercase;
  user-select: none;
}
.profile-setting {
  width: 200px;
  height: 120px;
  background-color: #6f042d;
  position: absolute;
  z-index: 3;
  border-radius: 8px;
  left: 75px;
  top: 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  user-select: none;
}
.profile-setting .btn {
  color: #fff;
  margin-bottom: 0;
  font-size: 12pt;
  padding-bottom: 6px;
  transition: 0.2s ease;
}
.profile-setting .btn:hover {
  border-bottom: 1px solid #fff;
}
</style>
