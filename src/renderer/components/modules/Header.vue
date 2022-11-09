<template>
    <div id="header">
    🌐 HTTP Gate v0.1.0
    </div>
</template>
<script setup>
import { inject } from 'vue';
const store = inject('store');

</script>

<style lang="scss" scoped>
#header {
    background-color: #241b2f;
    color: #fff;
    padding: 5px;
}
</style>