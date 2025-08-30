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
  <div class="dijuntor" :amper="amper" :label="label">
    <div class="connector superior" data-conn></div>
    <div class="connector inferior" data-conn></div>
  </div>
</template>

<style scoped>
  .dijuntor {
    background-image: url("../../assets/ref.png");
    background-size: 1120px;
    background-repeat: no-repeat;
    background-position: -132px -139px;
    width: 64px;
    height: 260px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }
  /* Details */
  .dijuntor[amper]::before {
    content: attr(amper);
    display: flex;
    width: 76%;
    padding-left: 2px;
    position: relative;
    bottom: 45px;
    right: -7%;
    font-family: sans-serif;
    font-weight: 700;
    background: #428942;
    color: #fcfcfc;
    border-radius: 2px;
  }
  .dijuntor[label]::after {
    content: attr(label);
    display: flex;
    width: 78%;
    position: absolute;
    bottom: 140px;
    right: 2px;
    padding-left: 1px;
    font-size: 10px;
    font-family: sans-serif;
    font-weight: 800;
    background: #FFEB3B;
    color: #000000;
    line-break: anywhere;
    overflow: hidden;
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
