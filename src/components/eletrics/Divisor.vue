<template>
  <aside class="container">
    <slot />
  </aside>
</template>

<style scoped>
  .container {
    display: flex;
    width: 100%;
    justify-content: space-between;
  }
</style>