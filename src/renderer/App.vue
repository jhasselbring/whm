<template>
  <section id="forehead">
    <Header />
  </section>
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
      if (store.app.appState.focus.type == 'redirectGroup') {
        store.app.appState.groups.forEach((group, i) => {
          if (group.name == store.app.appState.focus.group) {
            var confirmation = confirm("Are you sure you want to delete " + store.app.appState.focus.name); // The "hello" means to show the following text
            if (confirmation) {
              store.app.appState.groups.splice(targetId, 1);
              store.app.appState.focus = {}
            }
          }
        });

      } else if (store.app.appState.focus.type == 'redirectGroupIP') {

        var confirmation = confirm("Are you sure you want to delete " + store.app.appState.focus.name); // The "hello" means to show the following text
        if (confirmation) {
          delete store.app.appState.focus.group.ips[store.app.appState.focus.ip];
          store.app.appState.focus = {}
        }
      }
    }

  });
});
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