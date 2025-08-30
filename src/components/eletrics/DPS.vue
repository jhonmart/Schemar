<script setup lang="ts">
import { computed } from 'vue'
import { getDeviceByUUID } from '../../stories/dock.ts'
const props = defineProps<{
  row?: string,
  uuid?: string,
}, {
  row: "",
  uuid: "",
}>()
const device = getDeviceByUUID(props.row, props.uuid)
const label = computed(() => device.value?.label)
const amper = computed(() => device.value?.amper)
</script>

<template>
  <div class="dps" :amper="amper">
    <div class="connector superior" data-conn></div>
    <div class="connector inferior" data-conn></div>
  </div>
</template>

<style scoped>
  .dps {
    background-image: url("../../assets/ref.png");
    background-size: 70rem;
    background-repeat: no-repeat;
    background-position: -218px -139px;
    width: 64px;
    height: 260px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }
  /* Details */
  .dps[amper]::before {
    content: attr(amper);
    display: flex;
    width: 70%;
    padding-left: 2px;
    position: relative;
    bottom: 9px;
    right: -10%;
    font-family: sans-serif;
    font-weight: 700;
    background: #428942;
    color: #fcfcfc;
    border-radius: 2px;
  }
  /* Wires and connections */
  .connector {
    width: 30px;
    height: 30px;
    transform: translate(0%, -330%);
    z-index: 101;
    border-radius: 50%;
    position: absolute;
  }
  .connector.inferior {
    transform: translate(0%, 330%);
  }
</style>
