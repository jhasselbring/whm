import { createApp } from 'vue';
import store from "./store"
import App from './App.vue'

const app = createApp(App);

// * Make firebase store available everywhere
app.provide('store', store)

app.mount('#app');
