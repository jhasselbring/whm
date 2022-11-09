<template>
    <span class="toggle-view no-select" v-if="props.group.expanded" @click="props.group.expanded = !props.group.expanded">🔽</span>
    <span class="toggle-view no-select" v-else @click="props.group.expanded = !props.group.expanded">🔼</span>
</template>
<script setup>
import { defineProps } from 'vue';
const props = defineProps({
    group: Object
})
if (!props.group.expanded) {
    props.group.expanded = false;
}
</script>
<style lang="scss" scoped>
.toggle-view {
    cursor: pointer;
}
</style>