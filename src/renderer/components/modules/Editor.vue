<template>
    <pre>{{ store }}</pre>
    <button @click="store.app.groups.testCounter++">TestCounter++</button>
    <button @click="store.app.count2++">TestCounter2++</button>
</template>
<script setup lang="ts">
import { inject } from 'vue';
const store: any = inject('store');
</script>
<style lang="scss" scoped>

</style>