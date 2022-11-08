<template>
    <span class="toggle-activity" v-if="props.group.enabled" @click="props.group.enabled = !props.group.enabled">🟢</span>
    <span class="toggle-activity" v-else @click="props.group.enabled = !props.group.enabled">🔴</span>
</template>
<script setup lang="ts">
import { defineProps } from 'vue';
const props = defineProps({
    group: Object
})

</script>
<style lang="scss" scoped>
.toggle-activity{
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