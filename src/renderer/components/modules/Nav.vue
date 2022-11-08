<template>
    <div id="nav">
        <div class="tab">📜</div>
        <div class="tab">🛑</div>
        <div class="tab">⚙</div>
    </div>
</template>
<style lang="scss" scoped>
#nav {
    min-width: 50px;
    background-color: #171520;
    height: 100%;
    .tab {
        height: 50px;
        width:50px;
        line-height: 50px;
        text-align: center;
        cursor: pointer;
        &:hover{
            background-color: #29162a;
        }
    }
}
</style>