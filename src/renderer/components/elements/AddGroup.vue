<template>
    <span v-if="localState.active"><input @keyup.enter="add" ref="addGroupInput" @blur="hide" autofocus type="text"
            id="addGroupInput" v-model="localState.newGroupName" /></span>
    <button v-else="!localState.active" id="addGroupButton" @click="show">➕</button>
</template>
<script setup lang="ts">
import { reactive, ref, inject, nextTick } from "vue";
const store: any = inject("store");
const addGroupInput = ref(null);
const localState = reactive({
    active: false,
    newGroupName: ''
});

function hide() {
    console.log('hide');
    localState.active = false;
}

function show() {
    console.log(addGroupInput.value);
    localState.active = true;
    nextTick(() => {
        addGroupInput.value.focus();
    })
}

function add() {
    let existing = store.app.appState.groups.filter(function (group: any) {
        return group.name == localState.newGroupName;
    });
    if(existing.length > 0){
        return false;
    }else{
        store.app.appState.groups.push({
            name: localState.newGroupName,
            enabled: false,
            ips: {},
            expanded: true
        });
        localState.newGroupName = '';
        localState.active = false;
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
.error{
    border: 1px solid red;
    background-color: rgba(255,0,0, .1);
}
</style>