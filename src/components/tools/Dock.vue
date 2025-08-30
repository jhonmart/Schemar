<script>
import { defineComponent } from 'vue'
import Tabs from './Tabs.vue'

export default defineComponent({
  components: {
    Tabs
  },
})
</script>

<script setup>
import { getComponents, onDragStart } from '../../stories/dock.ts'

const devices = getComponents.value.filter(({ type }) => ['Device'].includes(type))
const tools = getComponents.value.filter(({ type }) => ['Tools'].includes(type))
const tabs = [
  { label: 'Dispositivos', slot: 'devices' },
  { label: 'Ferramentas', slot: 'tools' }
]
</script>

<template>
  <Tabs class="dock" :tabs="tabs">
    <template #devices>
      <aside class="list-itens">
        <div
          v-for="item in devices"
          :key="item.name"
          class="dock-item"
          draggable="true"
          @dragstart="onDragStart(item)"
        >
          <component
            :title="item.name"
            :is="item.component"
          />
        </div>
      </aside>
    </template>

    <template #tools>
      <aside class="list-itens">
        <div
          v-for="item in tools"
          :key="item.name"
          class="dock-item"
          draggable="true"
          @dragstart="onDragStart(item)"
        >
          <component
            :title="item.name"
            :is="item.component"
          />
        </div>
      </aside>
    </template>
  </Tabs>
</template>

<style>
  .dock {
    position: fixed;
    z-index: 300;
    background: #464646;
    left: 0;
    bottom: 0;
    width: 100%;
  }

  .list-itens {
    display: flex;
    gap: 5px;
  }

  .dock-item {
    cursor: grab;
    zoom: 0.5;
  }
</style>