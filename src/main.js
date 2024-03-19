import {
	createSSRApp
} from "vue";

import App from './App.vue';
import Tmap from '@map-component/vue-tmap';
import "default-passive-events";

export function createApp() {
	const app = createSSRApp(App);
	app.use(Tmap);
	return {
		app,
	};
}
