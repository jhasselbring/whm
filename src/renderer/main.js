import { createApp } from 'vue';
import store from "./store"
import App from './App.vue'

// Initialize FE store/state before building and mounting the App
store.init(() => {
    const app = createApp(App);
    app.provide('store', store)
    app.mount('#app');
});

 