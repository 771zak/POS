<template>
  <div class="signIn-container">
    <h1>Sign In</h1>
    <span>Welcome to Z-Cashier</span>
    <form>
			<custom-input 
				:type="emailType" 
				:label="emailLabel" 
				v-model="userEmail" 
			/>

      <custom-input
        :type="passwordType"
        :label="passwordLabel"
        v-model="password"
      />
      <sign-btn @click.prevent="signIn()" />
    </form>
    <p>
      Don't have an account!
      <router-link to="/signUp" id="signUp-link">sign Up</router-link>
    </p>
  </div>
</template>

<script>
import customInput from "./customInput.vue";
import SignBtn from "./signBtn.vue";
import Localbase from "localbase";
import { ipcRenderer } from "electron";
let db = new Localbase("db");

export default {
  name: "signIn",
  components: {
    customInput,
    SignBtn,
  },
  data() {
    return {
      userEmail: "",
      password: "",
      emailType: "text",
      passwordType: "password",
      emailLabel: "User Name",
      passwordLabel: "Your Password",
      somthing: "",
    };
  },
  methods: {
    async signIn() {
      db.collection("users")
        .doc({ userName: this.userEmail, password: this.password })
        .get()
        .then((document) => {
          if (document) {
						localStorage.setItem("user-info", JSON.stringify(document));
            this.$router.push({ name: "cashier" });
          } else {
            ipcRenderer.send("sign-error");
          }
        });
    },
  },
};
</script>

<style>
.signIn-container,
.signUp-container {
	margin: 80px auto;
	box-shadow: 3px 4px 10px #999;
}
.signIn-container {
  width: 510px;
  height: 80vh;
  border-radius: 18px;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.signIn-container form {
  width: 100%;
  margin-top: 39px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.signIn-container h1 {
  margin-top: 75px;
  font-size: 36px;
  line-height: 110%;
  color: #282c40;
}
.signIn-container span {
  font-weight: 500;
  margin-top: 15px;
  font-size: 16px;
  line-height: 110%;
  color: rgb(40, 44, 64);
}
.signIn-container p {
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
