<template>
	<div class="titleBar">
		<h4>Zcashier</h4>
		<div class="wc-box" @dbClick="maximize">
			<div class="minimize" @click="minimize"></div>
			<div class="maximize" @click="maximize"></div>
			<div class="close" @click="close"></div>
		</div>
	</div>
	<router-view to="/home/cashier" />
</template>

<script>
import { ipcRenderer } from "electron";
export default {
	components: {
	},
  data() {
		return {
		};
  },
	methods: {
		minimize() {
			ipcRenderer.send('minimize')
		},
		maximize() {
			ipcRenderer.send("maximize")
		},
		close() {
			localStorage.removeItem("user-info")
			ipcRenderer.send("close")
		}
	},
  beforeCreate() {
    let user = localStorage.getItem("user-info");
    if (!user) {
      this.$router.push({ name: "signIn" });
    } else {
      this.$router.push({ name: "home" });
    }
  },
	created() {
	},
	mounted() {
		this.$store.dispatch("fetching_data");
	}
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100%;
  color: #282c40;
  height: 100vh;
  background-color: #f7f7f7;
  /*display: flex;*/
  /*align-items: center;*/
  /*justify-content: center;*/
  position: relative;
}
.titleBar {
	width: 100%;
	height: 3vh;
	background: #333;
	display: flex;
	color: #fff;
	align-items: center;
	justify-content: space-around;
	position: relative;
	-webkit-app-region: drag;
}
.wc-box {
  position: absolute;
	right: 10px;
	-webkit-app-region: no-drag;
}

.wc-box div {
  position: relative;
  float: left;
  width: 20px;
  height: 20px;
	margin-left: 5px;
}

.wc-box div:before,
.wc-box div:after {
  top: 30%;
  right: 30%;
  bottom: 30%;
  left: 30%;
  content: " ";
  position: absolute;
  border-color: #CCCCCC;
  border-style: solid;
  border-width: 0 0 2px 0;
}

.wc-box .minimize:before {
  border-bottom-width: 2px;
}

.wc-box .maximize:before {
  border-width: 1px 1px 2px 1px;
}

.wc-box .close:before,
.wc-box .close:after {
  bottom: 50%;
  top: 50%;
}

.wc-box .close:before {
  transform: rotate(45deg);
}

.wc-box .close:after {
  transform: rotate(-45deg);
}

.wc-box div:hover {
  background-color: #CCCCCC;
}

.wc-box .close:hover {
  background-color: #E04343;
}

.wc-box div:hover:after,
.wc-box div:hover:before {
  border-color: #333333;
}

.wc-box .close:hover:after,
.wc-box .close:hover:before {
  border-color: #FFFFFF;
}
</style>
