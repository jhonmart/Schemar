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
  <div class="dijuntor-residencial" :amper="amper" :label="label">
    <div class="connector superior" data-conn></div>
    <div class="connector superior2" data-conn></div>
    <div class="connector inferior" data-conn></div>
    <div class="connector inferior2" data-conn></div>
  </div>
</template>

<style scoped>
  .dijuntor-residencial {
    background-image: url("../../assets/ref.png");
    background-size: 1120px;
    background-repeat: no-repeat;
    background-position: -375px -438px;
    width: 116px;
    height: 260px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }
  /* Details */
  .dijuntor-residencial[amper]::before {
    content: attr(amper);
    display: flex;
    width: 85%;
    padding-left: 5px;
    position: relative;
    bottom: 45px;
    right: -5px;
    font-family: sans-serif;
    font-weight: 700;
    border-radius: 2px;
    color: #fcfcfc;
    background-color: #262983;
  }
  .dijuntor-residencial[label]::after {
    content: attr(label);
    display: flex;
    width: 87%;
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
  :not(dijuntor, dps)>.connector.superior {
    transform: translate(-80%, -330%);
  }
  :not(dijuntor, dps)>.connector.superior2 {
    transform: translate(80%, -330%);
  }
  :not(dijuntor, dps)>.connector.inferior {
    transform: translate(-80%, 330%);
  }
  :not(dijuntor, dps)>.connector.inferior2 {
    transform: translate(80%, 330%);
  }
</style>
