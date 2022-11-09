<template>
    <div id="workspace">
        <div id="explorer">
            <Explorer />
        </div>
        <div id="editor">
            <Editor />
        </div>
    </div>

</template>

<script setup>
import Explorer from "@m/Explorer.vue";
import Editor from "@m/Editor.vue";
</script>
<style lang="scss" scoped>
#workspace {
    height: 100%;
    width: 100%;
    #explorer {
        background-color: #241b2f;
        resize:horizontal !important;
        float: left;
        width: 200px;
        min-width: 50px;
        max-width: 500px;
        height: 100%;
        box-sizing: border-box;
        overflow:hidden;
        text-overflow: ellipsis;
        padding: 2px;

    }

    #editor {
        width: auto;
        height: 100%;
        box-sizing: border-box;
        background-color: #262335;
    }
}
</style>