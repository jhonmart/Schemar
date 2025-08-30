<template>
  <div class="tabs">
    <!-- Cabeçalho das abas -->
    <div class="tab-headers">
      <button
        v-for="(tab, index) in tabs"
        :key="tab.label"
        @click="activeTab = index"
        :class="{ active: index === activeTab }"
      >
        {{ tab.label }}
      </button>
    </div>

    <!-- Conteúdo da aba ativa -->
    <div class="tab-content">
      <slot :name="tabs[activeTab]?.slot" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  tabs: {
    type: Array,
    required: true,
  },
})

const activeTab = ref(0)
</script>

<style scoped>
.tabs {
  /* border: 1px solid #ccc;
  border-radius: 6px; */
}

.tab-headers {
  display: flex;
}

.tab-headers button {
  flex: 1;
  padding: 10px;
  border: none;
  border-bottom: 2px solid transparent;
  background: #606060ff;
  cursor: pointer;
}

.tab-headers button.active {
  border-bottom: 2px solid #03458bff;
  background: #fff;
  font-weight: bold;
  background: none;
  color: #fcfcfc;
}

.tab-content {
  padding: 16px;
  background: #858585ff;
}
</style>
