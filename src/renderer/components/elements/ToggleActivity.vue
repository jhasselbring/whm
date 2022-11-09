<template>
    <span class="toggle-activity no-select" v-if="props.group.enabled" @click="props.group.enabled = !props.group.enabled">🟢</span>
    <span class="toggle-activity no-select" v-else @click="props.group.enabled = !props.group.enabled">🔴</span>
</template>
<script setup>
import { defineProps } from 'vue';
const props = defineProps({
    group: Object
})

</script>
<style lang="scss" scoped>
.toggle-activity{
    cursor: pointer;
}
</style>