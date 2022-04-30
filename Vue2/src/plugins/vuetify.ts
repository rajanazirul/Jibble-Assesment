import Vue from 'vue'
import Vuetify from 'vuetify/lib'

Vue.use(Vuetify)

const vuetify = new Vuetify({
	theme: {
		themes: {
			light: {
				primary: '#31AA75',
				secondary: '#A2EF44',
				third: '#C7C7C7',
				anchor: '#8C9EFF',
			},
		},
	},
})

export default vuetify
