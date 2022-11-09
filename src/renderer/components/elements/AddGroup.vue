<template>
    <span><input @keyup.enter="add" autofocus type="text"
            id="addGroupInput" v-model="localState.newGroupName" /></span>
</template>
<script setup>
import { reactive, inject } from "vue";
const store = inject("store");
const localState = reactive({
    active: true,
    newGroupName: "",
});

function add() {
    let existing = store.app.appState.groups.filter(function (group) {
        return group.name == localState.newGroupName;
    });
    if (existing.length > 0) {
        return false;
    } else {
        store.app.appState.groups.push({
            name: localState.newGroupName,
            enabled: false,
            ips: {},
            expanded: true,
        });
        localState.newGroupName = "";
    }
}
</script>
<style lang="scss" scoped>
#addGroupInput {
    border: 1px solid #171520;
    color: darkgrey;
    width: 100%;
    height: 24px;
    background-color: #262335;
}

#addGroupButton {
    background-color: green;
    width: 100%;
    color: #fafafa;
    font-weight: 800;
    cursor: pointer;

    &:hover {
        background-color: rgb(0, 174, 0);
    }
}

.error {
    border: 1px solid red;
    background-color: rgba(255, 0, 0, 0.1);
}
</style>
