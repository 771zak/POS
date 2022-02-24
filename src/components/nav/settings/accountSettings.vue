<template>
	<div class="account-set">
		<div class="account-set-nav">
			<h1>Account settings</h1>
		</div>
		<div class="a-s-email">
			<h2>Email address</h2>
			<div class="a-s-email-content">
				<p>Your email address is <strong v-if="!editEmail">{{user.email}}</strong>
					<input type="email" v-model="user.email" v-if="editEmail"
						@blur="saveEmail()"
						@keyup.enter="saveEmail()"
					/>
				</p>
				<button @click="editEmail = !editEmail">{{ editEmail? "save": 'change'}}</button>
			</div>
			<hr>
		</div>
		<div class="a-s-password">
			<h2 style="display: inline; margin-right: 120px;">Password</h2>
			<button @click="showPassChange = !showPassChange"
				style="display: inline;"
			>{{ showPassChange? "hide": "show" }}</button>
			<div class="a-s-password-content" v-if="showPassChange">
				<div>
					<label for="cuPass">Currrent password</label>
					<input type="password" id="cuPass" 
						v-model="checkpassowrd"
						@input="checkPass"
					/>
				</div>
				<div v-if="passChecked">
					<label for="newPass" >New password</label>
					<input type="password" v-model="newPass">
				</div>
				<button
					id="save-pass"
					@click="savePass()"
				>Save changes</button>
			</div>
		</div>
		<div class="a-s-delete">
			<hr>
			<h2>Delete account</h2>
			<p>Would you like to delete your account?<br>
				Deleting your account will not remove the store content with it.
			</p>
			<button
				@click="deleteAccount()"
			>Delete this account</button>
		</div>
	</div>
</template>

<script>
import Localbase from 'localbase';
const db = new Localbase('db');
const smallTalk = require("smalltalk");

	export default {
		name: 'accountSettings',
		data() {
			return {
				user: [],
				editEmail: false,
				checkpassowrd: '',
				passChecked: false,
				showPassChange: false,
				newPass: ''
			}
		},
		methods: {
			saveEmail() {
				db.collection("users").doc({ userName: this.user.userName}).update({
					email: this.user.email
				})
				this.editEmail = false
			},
			checkPass() {
				if (this.checkpassowrd == this.user.password) {
					return this.passChecked = true;
				}
			},
			savePass() {
				db.collection("users").doc({ userName: this.user.userName }).update({
					password: this.newPass
				})
			},
			deleteAccount() {
				smallTalk.confirm("Question", "Are you sure?").then(()=> {
					db.collection("users").doc({ userName: this.user.userName }).delete();
					localStorage.removeItem("user-info");
					this.$router.push({ name: 'signIn' });
				}).catch(()=> {
					console.log('no');
				})
			}
		},
		computed: {
		},
		mounted() {
			let user = JSON.parse(localStorage.getItem('user-info'))
			this.user = user
		}
	}
</script>

<style>
.account-set {
	margin: 30px;
}
.account-set-nav {
	margin-bottom: 30px;
}
.a-s-email-content {
	display: flex;
	width: 500px;
	height: 60px;
	align-items: center;
	justify-content: space-between;
	padding: 10px;
}
.a-s-email-content button {
	width: 70px;
	height: 30px;
}
label {
	display: block;
	margin-bottom: 5px;
}
label::after {
	content: " :";
}
.settings input {
	padding: 5px 10px;
	font-size: 14pt;
}
.a-s-password {
	margin-top: 10px;
}
.a-s-password-content {
	margin-top: 20px;
	display: flex;
	justify-content: space-between;
	width: 600px;
	position: relative;
	height: 130px;
}
.a-s-password button {
	padding: 5px;
}
#save-pass {
	position: absolute;
	bottom: 10px;
	padding: 5px;
}
.a-s-delete {
	margin-top: 20px;
}
.a-s-delete h2, .a-s-delete p {
	margin-top: 10px;
	margin-bottom: 10px;
}
</style>
