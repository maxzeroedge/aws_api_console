import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		name: 'LogGroup',
		component: () => import(/* webpackChunkName: "logGroup" */ '../views/logs/LogGroup.vue')
	},
	{
		path: '/stream/:group',
		name: 'LogStream',
		component: () => import(/* webpackChunkName: "logStream" */ '../views/logs/LogStream.vue')
	},
	{
		path: '/log/:group/:stream',
		name: 'LogDetail',
		component: () => import(/* webpackChunkName: "logDetail" */ '../views/logs/LogDetail.vue')
	}
]

const router = new VueRouter({
	routes
})

export default router
