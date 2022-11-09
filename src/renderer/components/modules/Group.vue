<template>
    <div class="group-container" :class="{ selected: isSelected() }">
        <div class="group-name-container" @dblclick="editName">
            <ToggleView v-if="!localState.editEnabled" :group="group" />
            <ToggleActivity v-if="!localState.editEnabled" :group="group" />
            <span @click="select" v-if="!localState.editEnabled" class="no-select static-name">{{ group.name }}</span>
            <input v-else v-model="group.name" @keyup.enter="localState.editEnabled = false"
                @blur="localState.editEnabled = false" type="text" ref="newNameInput" class="newNameInput" />
        </div>
        <div>
            <div v-if="props.group.expanded" class="ip" v-for="(value, key) in props.group.ips" :key="key">
                <RedirectGroupIP :ips="group.ips" :ipkey="key" />
            </div>
            <AddGroupIP :group="group" class="AddGroupIP" v-if="group.expanded" />
        </div>
    </div>
</template>
<script setup lang="ts">
import { defineProps, reactive, ref, nextTick, inject } from "vue";
import ToggleView from "@e/ToggleView.vue";
import RedirectGroupIP from "@e/RedirectGroupIP.vue";
import ToggleActivity from "@e/ToggleActivity.vue";
import AddGroupIP from "@e/AddGroupIP.vue";
const store: any = inject("store");
const props = defineProps({
    group: Object,
});
const localState = reactive({
    editEnabled: false,
    selected: false,
});
const newNameInput = ref(null);
function editName() {
    localState.editEnabled = true;
    store.app.appState.focus.type = "";
    store.app.appState.focus.name = "";
    nextTick(() => {
        newNameInput.value.focus();
    });
}
function select() {
    store.app.appState.focus.type = "redirectGroup";
    store.app.appState.focus.name = props.group.name;
}
function isSelected() {
    return (
        store.app.appState.focus.type == "redirectGroup" &&
        store.app.appState.focus.name == props.group.name
    );
}
</script>
<style lang="scss" scoped>
.group-container {
    &.selected {
        background-color: rgba(255, 255, 255, 0.3);
        color: #fff;
    }

    .group-name-container {
        padding: 2px 0 2px 0;
        white-space: nowrap;
        overflow: hidden;
        cursor: pointer;
        display: flex;

        .static-name {
            flex-grow: 1;
        }

        .newNameInput {
            border: 1px solid #171520;
            color: darkgrey;
            height: 24px;
            background-color: #262335;
            width: 100%;
        }

        &:hover {
            background-color: rgba(255, 255, 255, 0.1);
        }
    }
}

.AddGroupIP {
    padding: 2px 0 2px 60px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    cursor: pointer;
}

.ip {
    padding: 2px 0 2px 60px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    cursor: pointer;

    &:hover {
        background-color: rgba(255, 255, 255, 0.1);
    }
}
</style>
