<script setup lang="ts">
import { computed } from 'vue'
import { getToolByUUID } from '../../stories/dock.ts'
const props = defineProps<{
  row?: string,
  uuid?: string,
}, {
  row: "",
  uuid: "",
}>()
const device = getToolByUUID(props.row, props.uuid)
const rotate = computed(() => device.value?.rotate)
</script>

<template>
  <div class="conduite" v-bind="{ [rotate || 'deg90']: 1 }">
    <div class="connector superior" data-conn></div>
    <div class="connector inferior" data-conn></div>
  </div>
</template>

<style scoped>
  .conduite {
    background-image: url("../../assets/ref.png");
    background-size: 38rem;
    background-repeat: no-repeat;
    background-position: -53px -474px;
    width: 150px;
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px 0px;
  }
  /* Details */
  .conduite[deg90] {
    transform: rotate(90deg);
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
  .conduite .connector {
    transform: none;
    position: relative;
  }
</style>
