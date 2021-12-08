import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Detail from "../views/Detail.vue";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
	{
		path: "/",
		name: "Home",
		props: true,
		component: Home
	},
	{
		path: "/detail/:productsId",
		name: "Detail",
		props: true,
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () => import("../views/Detail.vue")
	}
];

const router = new VueRouter({
	mode: "history",
	base: process.env.BASE_URL,
	routes
});

export default router;
