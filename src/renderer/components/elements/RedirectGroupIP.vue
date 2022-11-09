<template>
    <div @click="select" :class="{ selected: isSelected() }">📄{{ props.ipkey }}</div>
</template>
<script setup>
import { defineProps, reactive, inject } from "vue";
const store = inject("store");
const props = defineProps({
    group: Object,
    ips: Object,
    ipkey: String,
});
const localState = reactive({
    selected: false,
});
function select() {
    store.app.appState.focus = {};
    store.app.appState.focus.type = "redirectGroupIP";
    store.app.appState.focus.group = props.group;
    store.app.appState.focus.name = props.group.name;
    store.app.appState.focus.ip = props.ipkey;
}
function isSelected() {
    return (
        store.app.appState.focus.type == "redirectGroupIP" &&
        store.app.appState.focus.name == props.group.name &&
        store.app.appState.focus.ip == props.ipkey
    );
}
</script>
<style lang="scss" scoped>
.selected {
        background-color: rgba(255, 255, 255, 0.3);
        color: #fff;
    }
</style>