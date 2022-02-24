<template>
  <div class="signUp-container">
    <h1>Sign Up</h1>
    <span>Don't have an account?</span>
    <form>
      <custom-input
        :type="userNameType"
        :label="userNameLabel"
        v-model="userName"
      />
      <custom-input :type="emailType" :label="emailLabel" v-model="email" />
      <custom-input
        :type="passwordType"
        :label="passwordLabel"
        v-model="password"
      />
      <sign-btn @click.prevent="signUp" />
    </form>
    <p>
      I have an account!
      <router-link to="/signIn" id="signUp-link">sign In</router-link>
    </p>
  </div>
</template>

<script>
import signBtn from "./signBtn.vue";
import customInput from "./customInput.vue";
import Localbase from "localbase";
let db = new Localbase("db");
export default {
  name: "signUp",
  components: {
    customInput,
    signBtn,
  },
  data() {
    return {
      email: "",
      emailType: "email",
      emailLabel: "Your Email",
      password: "",
      passwordType: "password",
      passwordLabel: "Your Password",
      userName: "",
      userNameType: "text",
      userNameLabel: "Your Name",
    };
  },
  methods: {
    signUp() {
      db.collection("users").add({
        userName: this.userName,
        email: this.email,
        password: this.password,
      });
      this.$router.push({ name: "signIn" });
    },
  },
};
</script>

<style>
.signUp-container {
  width: 510px;
  height: 80vh;
  border-radius: 18px;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.signUp-container form {
  width: 100%;
  margin-top: 39px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.signUp-container h1 {
  margin-top: 75px;
  font-size: 36px;
  line-height: 110%;
  color: #282c40;
}
.signUP-container span {
  font-weight: 500;
  margin-top: 15px;
  font-size: 16px;
  line-height: 110%;
  color: rgb(40, 44, 64);
}
.signUp-container p {
  font-weight: 600;
  font-size: 14pt;
  line-height: 110%;
  margin-top: 10px;
  color: rgb(40, 44, 64);
}
#signUp-link {
  font-weight: 600;
  cursor: pointer;
  font-size: 15pt;
  color: #f0ae4b;
  line-height: 110%;
  text-decoration: none;
}
</style>
