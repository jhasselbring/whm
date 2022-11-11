<template>
    <div id="editor-container">
        <div id="redirect-group-ip-editor">
            <textarea v-if="store.app.appState.focus.group" v-model="store.app.appState.focus.group.ips[store.app.appState.focus.ip]"></textarea>
        </div>
        <div>
            <pre>{{ store }}</pre>
        </div>
    </div>
</template>
<script setup>
import { inject } from 'vue';
const store = inject('store');
</script>
<style lang="scss" scoped>
#editor-container {
    display: flex;
    &>div{
        &>textarea{
            width: 100%;
            height: 100%;
            background-color: transparent;
            border: 0;
            color: #f18b39;
        }
        width: 50%;
    }
}
</style>