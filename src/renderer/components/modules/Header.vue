<template>
    Header {{ localState.launchCounter }}
</template>
<script setup lang="ts">
import { inject, reactive, ref } from 'vue';
const store: any = inject('store');
let localState = reactive({
    launchCounter: 0
});
store.getLaunchCount().then((result: number): void => {
    localState.launchCounter = result;
});

</script>