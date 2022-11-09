<template>
    <div id="header">
    🌐 HTTP Gate v0.1.0
    </div>
</template>
<script setup lang="ts">
import { inject } from 'vue';
const store: any = inject('store');

</script>

<style lang="scss" scoped>
#header {
    background-color: #241b2f;
    color: #fff;
    padding: 5px;
}
</style>