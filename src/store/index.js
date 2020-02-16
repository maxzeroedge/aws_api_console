import Vue from 'vue'
import Vuex from 'vuex'
import {getLogGroups} from '../main/logs/logGroups'
import {getLogStreams} from '../main/logs/logStreams'
import {getLogEvents} from '../main/logs/logEvents'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
	},
	mutations: {
	},
	actions: {
		getLogGroups(_, payload){
			return getLogGroups(payload)
		},
		getLogStreams(_, payload){
			return getLogStreams(payload)
		},
		getLogEvents(_, payload){
			return getLogEvents(payload)
		}
	},
	modules: {
	}
})
