<template>
  <div class="modal-overlay" @click.self="close">
    <div class="modal">
      <header class="modal-header">
        <slot name="header">{{ title }}</slot>
        <button class="close-button" @click="close">×</button>
      </header>

      <section class="modal-body">
        <slot>Conteúdo</slot>
      </section>

      <footer class="modal-footer">
        <slot name="footer">
          <button @click="close" class="btn">Fechar</button>
        </slot>
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
import { provide } from 'vue'
const emit = defineEmits(['close'])

defineProps<{
  title: string
}, {
  title: 'Título'
}>()

function close() {
  emit('close')
}

provide('modalClose', () => {
  emit('close')
})
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal {
  background: #232323;
  border-radius: 8px;
  width: 400px;
  max-width: 90%;
  overflow: hidden;
}

.modal-header,
.modal-footer {
  padding: 1rem 2rem;
  background: #1E1E1E;
  color: #f1f1f1;
  display: flex;
  justify-content: flex-end;
}

.modal-header {
  justify-content: space-between;
  padding-right: 1.5rem;
  padding-left: 1rem; 
}

.modal-body {
  padding: 1rem;
}

.close-button {
  background: transparent;
  border: none;
  font-size: 1.2rem;
  float: right;
  cursor: pointer;
  color: #f1f1f1;
}

.btn {
  border: 0;
  padding: 7px 15px;
  background: #EF4444;
  color: #E0E0E0;
  cursor: pointer;
  font-family: sans-serif, arial;
  font-weight: 600;
}

.align-right {
  align-self: right;
}
</style>
