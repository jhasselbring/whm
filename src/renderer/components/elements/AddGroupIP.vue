<template>
  <div>
    <input @keyup.enter="add" type="text" id="addRedirectGroupIPInput" v-model="localState.newGroupIP" />
  </div>
</template>

<script setup>
import { defineProps, reactive } from "vue";

const props = defineProps({
  group: Object,
});
const localState = reactive({
  newGroupIP: "",
});

function add() {
  if (props.group.ips[localState.newGroupIP]) {
    console.warn('IP Already exists in this group, ignoring.');
    return false;
  } else {
    props.group.ips[localState.newGroupIP] = '';
    localState.newGroupIP = '';
  }
}
</script>

<style lang="scss" scoped>
#addRedirectGroupIPButton {
  background-color: green;
  width: 100%;
  color: #fafafa;
  font-weight: 800;
  cursor: pointer;
  margin-right: 20px;

  &:hover {
    background-color: rgb(0, 174, 0);
  }
}

#addRedirectGroupIPInput {
  border: 1px solid #171520;
  color: darkgrey;
  width: 100%;
  height: 24px;
  background-color: #262335;
}
</style>