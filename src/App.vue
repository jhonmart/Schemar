<script setup lang="ts">
import { state, onDrop } from './stories/dock.ts'
</script>

<script lang="ts">
import { defineComponent } from 'vue';
import Dock from './components/tools/Dock.vue'
import Quadro from './components/eletrics/Quadro.vue'
import Trilho from './components/eletrics/Trilho.vue'

export default defineComponent({
  components: {
    Quadro,
    Dock,
    Trilho
  },
})
</script>

<template>
  <Dock />
  <Quadro />
</template>
