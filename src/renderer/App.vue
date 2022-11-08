<template>
  <section id="forehead">
    <Header />
  </section>
  <section id="face">
    <Nav />
    <div id="page-container">
      <Workspace
        v-if="(store.app.appState.page == 'workspace' || store.app.appState.page == '' || store.app.appState.page == 'undefined')" />
    </div>
  </section>
  <section id="chin">⏯</section>
</template>
<script setup lang="ts">
import { inject } from 'vue';
import Header from '@m/Header.vue';
import Nav from "@m/Nav.vue";
import Workspace from '@p/Workspace.vue';
const store: any = inject('store');
</script>
<style lang="scss">
@import './lib/reset.scss';


#forhead {
  height: 20px;
  overflow: hidden;
}

#face {
  display: flex;
  height: calc(100% - 45px);
  overflow: hidden;

  &>#page-container {
    flex-grow: 1;
  }
}

#chin {
  height: 19px;
  overflow: hidden;
  background-color: #241b2f;
  line-height: 20px;
}
</style>