<template>
    <div id="editor-container">
        <div id="redirect-group-ip-editor">
            <textarea></textarea>
        </div>
        <div>
            <pre>{{ store }}</pre>
        </div>
    </div>
    <button @click="store.app.groups.testCounter++">TestCounter++</button>
    <button @click="store.app.count2++">TestCounter2++</button>
</template>
<script setup lang="ts">
import { inject } from 'vue';
const store: any = inject('store');
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