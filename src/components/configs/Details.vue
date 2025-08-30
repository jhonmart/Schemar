<script setup lang="ts">
import { inject, computed } from 'vue'
import { getDeviceByUUID } from '../../stories/dock.ts'

const props = defineProps<{
  item: object;
  uuid: string;
}>();

const device = getDeviceByUUID(props.uuid, props.item.uuid)
const labelRef = computed({
  get: () => device.value?.label,
  set: (val: string) => {
    if (device.value) device.value.label = val
  }
})
const amperRef = computed({
  get: () => device.value?.amper,
  set: (val: string) => {
    if (device.value) device.value.amper = val
  }
})
const modeRef = computed({
  get: () => device.value?.mode || "neutro",
  set: (val: string) => {
    if (device.value) device.value.mode = val
  }
})
const rotateRef = computed({
  get: () => device.value?.rotate || "deg90",
  set: (val: string) => {
    if (device.value) device.value.rotate = val
  }
})

const limits = {
  label: ['Dijuntor', 'Dijuntor Duplo', 'Dijuntor Residencial'].includes(props.item.name),
  amper: ['Dijuntor', 'Dijuntor Duplo', 'Dijuntor Residencial', 'DPS'].includes(props.item.name),
  mode: ['Barramento'].includes(props.item.name),
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
    <input v-if="limits.label" type="text" v-model="labelRef" placeholder="Label" />
    <input v-if="limits.amper" type="text" v-model="amperRef" placeholder="Potencia" />
    <select v-if="limits.mode" v-model="modeRef">
      <option value="neutro">Neutro</option>
      <option value="fase">Fase</option>
      <option value="terra">Terra</option>
    </select>
    <select v-if="limits.rotation" v-model="rotateRef">
      <option value="deg90">90°</option>
      <option value="deg0">180°</option>
    </select>
  </main>
</template>

<style scoped>
  .group {
    display: flex;
    gap: 2px;
  }
  input[type=text] {
    padding: 5px;
    border: 0;
  }
</style>