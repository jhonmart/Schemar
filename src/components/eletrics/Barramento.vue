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
const mode = computed(() => device.value?.mode)
</script>

<template>
  <div class="barramento" v-bind="{ [mode]: 1 }">
    <div class="connector p1" data-conn></div>
    <div class="connector p2" data-conn></div>
    <div class="connector p3" data-conn></div>
    <div class="connector p4" data-conn></div>
    <div class="connector p5" data-conn></div>
    <div class="connector p6" data-conn></div>
    <div class="connector p7" data-conn></div>
    <div class="connector p8" data-conn></div>
    <div class="connector p9" data-conn></div>
    <div class="connector p10" data-conn></div>
    <div class="connector p11" data-conn></div>
    <div class="connector p12" data-conn></div>
  </div>
</template>

<style scoped>
  .barramento {
    background-image: url("../../assets/ref.png");
    background-size: 70rem;
    background-repeat: no-repeat;
    background-position: -134px -440px;
    width: 22px;
    height: 255px;
    display: flex;
    justify-content: space-evenly;
    flex-direction: column;
    align-items: center;
    padding: 2px 2px;
    position: relative;
  }
  /* Details */
  .barramento[terra] {
    background-image: url("../../assets/ref.png");
    background-position: -80px -440px;
  }
  .barramento[fase] {
    background-image: url("../../assets/ref.png");
    background-position: -107px -440px;
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
  .barramento .connector {
    transform: none;
    position: relative;
    width: 15px;
    height: 15px;
  }
</style>
