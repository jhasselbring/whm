<template>
    <div class="group-container">
        <div class="group-name-container">
            <ToggleView :group="group" />
            <ToggleActivity :group="group" /> <span>{{ group.name }}</span>
        </div>
        <div>
            <div v-if="group.expanded" class="ip" v-for="(value, key) in group.ips">📄{{ key }}</div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { defineProps } from 'vue';
import ToggleView from "@e/ToggleView.vue";
import ToggleActivity from "@e/ToggleActivity.vue";
const props = defineProps({
    group: Object
})

</script>
<style lang="scss" scoped>
.group-container {

    .group-name-container {
        padding: 2px 0 2px 0;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        cursor: pointer;

        &:hover {
            background-color: rgba(255, 255, 255, .1);
        }
    }
}

.ip {
    padding: 2px 0 2px 60px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    cursor: pointer;

    &:hover {
        background-color: rgba(255, 255, 255, .1);
    }
}
</style>