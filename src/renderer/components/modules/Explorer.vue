<template>
  <div class="title">Explorer</div>
  <div id="explorer-content">
    <div v-for="group in store.app.appState.groups">
      <Group :group="group" />
    </div>
    <AddGroup />
  </div>
</template>
<script setup lang="ts">
import { inject, reactive } from "vue";

import Group from "@m/Group.vue";
import AddGroup from "@e/AddGroup.vue";
const store: any = inject("store");
</script>
<style lang="scss" scoped>
.title {
  text-transform: uppercase;
  font-weight: 100;
  font-size: 11px;
}

#explorer-content {
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 5px;
}
</style>
