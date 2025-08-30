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
  <div class="chave-transferencia">
    <div class="connector superior" data-conn></div>
    <div class="connector superior2" data-conn></div>
    <div class="connector inferior" data-conn></div>
    <div class="connector inferior1" data-conn></div>
    <div class="connector inferior2" data-conn></div>
    <div class="connector inferior3" data-conn></div>
  </div>
</template>

<style scoped>
  .chave-transferencia {
    background-image: url("../../assets/ref.png");
    background-size: 1120px;
    background-repeat: no-repeat;
    background-position: -580px -737px;
    width: 116px;
    height: 260px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }
  /* Details */
  /* Wires and connections */
  .connector {
    width: 30px;
    height: 30px;
    transform: translate(0%, -330%);
    z-index: 101;
    border-radius: 50%;
    position: absolute;
  }
  .chave-transferencia .connector.superior {
    transform: translate(-80%, -330%);
  }
  .chave-transferencia .connector.superior2 {
    transform: translate(80%, -330%);
  }
  .chave-transferencia .connector.inferior {
    width: 20px;
    height: 20px;
    transform: translate(-180%, 450%);
  }
  .chave-transferencia .connector.inferior1 {
    width: 20px;
    height: 20px;
    transform: translate(70%, 450%);
  }
  .chave-transferencia .connector.inferior2 {
    width: 20px;
    height: 20px;
    transform: translate(-80%, 570%);
  }
  .chave-transferencia .connector.inferior3 {
    width: 20px;
    height: 20px;
    transform: translate(160%, 560%);
  }
</style>
