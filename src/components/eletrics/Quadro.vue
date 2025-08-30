<script setup lang="ts">
import { state, onDrop, onDropAt, getDevices } from '../../stories/dock.ts'
const myName = performance.now()
import { modal } from '../tools/modal'
import DetailTools from '../configs/DetailTools.vue'


function changeDetails(item: object) {
  modal.open({
    template: DetailTools,
    props: {
      title: `Mudar configurações: ${item.name}`,
      item,
      uuid: myName
    }
  })
}
</script>

<template>
  <div class="quadro"
    @dragover.prevent
    @drop="onDrop(myName, 'Tools')"
  >
    <component
      v-for="(item, index) in state.dropped[myName]"
      :key="index"
      @dragover.prevent
      @drop="onDropAt(myName, index, 'Tools')"
      @dblclick="changeDetails(item)"
      :is="item.component"
      :uuid="item.uuid"
      :row="myName"
    />
    <slot />
  </div>
</template>

<style scoped>
  .quadro {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    width: 100vid;
    height: 1150px;
    align-items: center;
    background: #121212;
  }
</style>
