<template>
  <div class="barramento-central">
    <div class="block">
      <div class="connector" data-conn></div>
      <div class="connector" data-conn></div>
      <div class="connector" data-conn></div>
      <div class="connector" data-conn></div>
      <div class="connector" data-conn></div>
      <div class="connector" data-conn></div>
      <div class="connector" data-conn></div>
    </div>
    <div class="block">
      <div class="connector" data-conn></div>
      <div class="connector" data-conn></div>
      <div class="connector" data-conn></div>
      <div class="connector" data-conn></div>
      <div class="connector" data-conn></div>
      <div class="connector" data-conn></div>
      <div class="connector" data-conn></div>
      <div class="connector" data-conn></div>
      <div class="connector" data-conn></div>
      <div class="connector" data-conn></div>
    </div>
    <div class="block">
      <div class="connector" data-conn></div>
      <div class="connector" data-conn></div>
      <div class="connector" data-conn></div>
      <div class="connector" data-conn></div>
      <div class="connector" data-conn></div>
      <div class="connector" data-conn></div>
      <div class="connector" data-conn></div>
    </div>
  </div>
</template>

<style scoped>
  .barramento-central {
    background-image: url("../../assets/ref.png");
    background-size: 910px;
    background-repeat: no-repeat;
    background-position: -262px -840px;
    width: 441px;
    height: 36px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  /* Details */
  .barramento-central .block {
    position: relative;
    display: flex;
    transform: translate(0px, 55px);
    flex-direction: row;
    gap: 3px;
  }
  /* Wires and connections */
  .barramento-central .block > .connector {
    width: 15px;
    height: 15px;
    position: relative;
    display: flex;
  }
</style>
