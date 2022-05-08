import { createRouter, createWebHistory } from "vue-router";
import homeScreen from "../views/Home.vue";
import signIn from "../components/registration/signIn.vue";
import signUp from "../components/registration/signUp.vue";
import cashierScreen from "../components/nav/cashier.vue";
import stock from "../components/nav/stock.vue";
import history from "../components/nav/history.vue";
import settings from "../components/nav/settings.vue";
import accountSettings from "../components/nav/settings/accountSettings.vue";
import yourStore from "../components/nav/settings/yourStore.vue";
import receiptPage from "../components/receiptPage.vue";

const routes = [
	{
		path: "/home",
		component: homeScreen,
		name: "home",
		children: [
			{
				name: "cashier",
				component: cashierScreen,
				path: "/home/cashier",
			},
			{
				name: "stock",
				component: stock,
				path: "/home/stock",
			},
			{
				name: "history",
				component: history,
				path: "/home/history",
			},
			{
				name: "settings",
				component: settings,
				path: "/home/settings",
				children: [
					{
						name: "accountSettings",
						component: accountSettings,
						path: "/home/settings/accountSettings",
					},
					{
						name: "yourStore",
						component: yourStore,
						path: "/home/settings/yourStore",
					},
				],
			},
		],
	},
	{
		name: "signIn",
		path: "/signIn",
		component: signIn,
	},
	{
		name: "receiptPage",
		path: "/receiptPage",
		component: receiptPage,
	},
	{
		name: "signUp",
		path: "/signUp",
		component: signUp,
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;
