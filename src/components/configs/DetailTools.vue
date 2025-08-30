<script setup lang="ts">
import { inject, computed } from 'vue'
import { getToolByUUID } from '../../stories/dock.ts'

const props = defineProps<{
  item: object;
  uuid: string;
}>();

const device = getToolByUUID(props.uuid, props.item.uuid)
const rotateRef = computed({
  get: () => device.value?.rotate || "deg90",
  set: (val: string) => {
    if (device.value) device.value.rotate = val
  }
})

const limits = {
  rotation: ['Conduíte'].includes(props.item.name),
}


if (!Object.values(limits).includes(true)) {
  console.log("Fechado por não ter parametros ativos!")
  const closeModal = inject<() => void>('modalClose')
  closeModal?.()
}
</script>

<template>
  <main class="group">
    <select v-if="limits.rotation" v-model="rotateRef">
      <option value="deg90">90°</option>
      <option value="deg0">180°</option>
    </select>
  </main>
</template>
