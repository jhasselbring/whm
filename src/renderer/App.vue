<template>
  <!-- section id="forehead">
    <Header />
  </section -->
  <section id="face">
    <Nav />
    <div id="page-container">
      <Workspace
        v-if="(store.app.appState.page === 'workspace' || store.app.appState.page === '' || store.app.appState.page === 'undefined')" />
    </div>
  </section>
  <section id="chin">⏯</section>
</template>
<script setup>
import { inject, onMounted } from 'vue';
import Header from '@m/Header.vue';
import Nav from "@m/Nav.vue";
import Workspace from '@p/Workspace.vue';
const store = inject('store');

onMounted(() => {
  window.addEventListener('keyup', function (e) {
    if (e.key == 'Delete' && !e.altKey && !e.ctrlKey) {
      window
        .electron
        .ipcRenderer
        .invoke('delete', 'Some > Path').then(response => {
          if (response && response.response == 0) {
            if (store.app.appState.focus.type == 'redirectGroup') {
              store.app.appState.groups.forEach((group, i) => {
                if (group.name == store.app.appState.focus.group) {
                  store.app.appState.groups.splice(i, 1);
                  store.app.appState.focus = {}
                }
              });

            } else if (store.app.appState.focus.type == 'redirectGroupIP') {
              delete store.app.appState.focus.group.ips[store.app.appState.focus.ip];
              store.app.appState.focus = {}
            }
          }
          console.log('response from main', response);

        })
    }

  });
});
</script>
<style lang="scss">
@import './lib/reset.scss';


#forhead {
  height: 20px;
  overflow: hidden;
  display: none;
}

#face {
  display: flex;
  height: calc(100% - 45px + 20px);
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