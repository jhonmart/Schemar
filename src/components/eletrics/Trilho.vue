<script setup lang="ts">
import { onDrop, onDropAt, getDevices } from '../../stories/dock.ts'
import { modal } from '../tools/modal'
import Details from '../configs/Details.vue'

const props = defineProps<{
  uuid?: string
}>()

function changeDetails(item: object) {
  modal.open({
    template: Details,
    props: {
      title: `Mudar parametros: ${item.name}`,
      item,
      uuid: props.uuid
    }
  })
}

const devices = getDevices(props.uuid)
</script>

<template>
  <div class="trilho"
    @dragover.prevent
    @drop="onDrop(uuid, 'Device')"
  >
    <component
      v-for="(item, index) in devices"
      :key="`${item.uuid}_${item.lastChange}`"
      @dragover.prevent
      @drop="onDropAt(uuid, index, 'Device')"
      :is="item.component"
      :uuid="item.uuid"
      :row="uuid"
      @dblclick="changeDetails(item)"
    />
    <slot/>
  </div>
</template>

<style scoped>
  .trilho {
    display: flex;
    align-items: center;
    background-image: url("/src/assets/ref.png");
    background-size: 528px 1360px;
    background-position: 319px 0px;
    background-repeat: repeat-x;
    padding: 0px 25px;
    height: 165px;
    width: 100%;
    min-width: 200px;
  }
  .trilho > *:nth-child(1)  { z-index: 100; left: 0px; }
  .trilho > *:nth-child(2)  { z-index: 99; left: -12px; }
  .trilho > *:nth-child(3)  { z-index: 98; left: -22px; }
  .trilho > *:nth-child(4)  { z-index: 97; left: -32px; }
  .trilho > *:nth-child(5)  { z-index: 96; left: -42px; }
  .trilho > *:nth-child(6)  { z-index: 95; left: -52px; }
  .trilho > *:nth-child(7)  { z-index: 94; left: -62px; }
  .trilho > *:nth-child(8)  { z-index: 93; left: -72px; }
  .trilho > *:nth-child(9)  { z-index: 92; left: -82px; }
  .trilho > *:nth-child(10) { z-index: 91; left: -92px; }
  .trilho > *:nth-child(11) { z-index: 90; left: -102px; }
  .trilho > *:nth-child(12) { z-index: 89; left: -112px; }
</style>