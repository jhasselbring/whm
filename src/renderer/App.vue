<template>
  <div id="app">
    <Header />
    <div id="pages">
      <Workspace />
    </div>
  </div>
</template>
<script setup lang="ts">
import { inject } from 'vue';
import Header from '@m/Header.vue';
import Workspace from '@p/Workspace.vue';
const store:any = inject('store');
store.getLaunchCount().then((result: number): void => {
  console.log('Launch count is: ', result);
});
</script>
<style lang="scss">
@import './lib/reset.scss';
</style>