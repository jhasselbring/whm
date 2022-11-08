<template>
    <span class="toggle-view" v-if="props.group.expanded"
        @click="props.group.expanded = !props.group.expanded">🔽</span>
    <span class="toggle-view" v-else @click="props.group.expanded = !props.group.expanded">🔼</span>
</template>
<script setup lang="ts">
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
    /* Safari */
    -webkit-user-select: none;
    /* Firefox */
    -moz-user-select: none;
    /* IE10+/Edge */
    -ms-user-select: none;
    /* Standard */
    user-select: none;
}
</style>