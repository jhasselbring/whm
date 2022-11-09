<template>
    <span>📄{{ props.ipkey }}</span>
</template>
<script lang="ts" setup>
import { defineProps, reactive, inject } from "vue";
const store: any = inject("store");
const props = defineProps({
    ips: Object,
    ipkey: String,
});
const localState = reactive({
    selected: false,
});
function select() {
    store.app.appState.focus.type = "redirectGroupIP";
    store.app.appState.focus.name = props.ipkey;
}
</script>