import Vue from 'vue'
import VueRouter from 'vue-router'

import App from './App'
import Home from './components/Home'
import About from './components/About'
import Order from './components/Order'
import Contacts from './components/Contacts'

Vue.use(VueRouter);

const router = new VueRouter({
	routes: [
		{
			name: 'home',
			path: '/',
			component: Home
		},
		{
			name: 'about',
			path: '/about',
			component: About
		}, 
		{
			name: 'order',
			path: '/order',
			component: Order
		},
		{
			name: 'contacts',
			path: '/contacts',
			component: Contacts
		}
	],
	mode: 'history'
})

new Vue({
	el: '#app',
	render: h=>h(App),
	router
})