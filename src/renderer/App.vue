<template>
  <div id="app">
    <Header />
  </div>
</template>
<script setup lang="ts">
import { inject } from 'vue';
import Header from './components/modules/Header.vue'
const store = inject('store');
console.log('store', store);
// window.electron.ipcRenderer.send('message', 'Hello from App.vue!');
</script>
<style lang="scss">
@import './lib/reset.scss';
</style>