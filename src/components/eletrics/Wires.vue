<script setup>
  import { ref, onMounted } from 'vue'
  import { refWireColor, refWireWeight } from '../../stories/wire.ts'

  onMounted(() => {
    document.querySelectorAll(".button").forEach(elemento => {
      const color = getComputedStyle(elemento).backgroundColor;
      elemento.addEventListener("click", (e) => {
        const hex = '#' + color
          .slice(4, -1) // remove "rgb(" e ")"
          .split(',')   // separa [r, g, b]
          .map(num => Number(num.trim()).toString(16).padStart(2, '0'))
          .join('');

        refWireColor.value = hex;
      });
    });
  })
</script>

<template>
  <div class="controls">
    <span>Cor:</span>
    <input type="color" v-model="refWireColor">

    <span>Grossura:</span>
    <input type="number" v-model="refWireWeight" min="1" max="10">
    
    <button class="button"></button>
    <button class="button button2"></button>
    <button class="button button3"></button>
    <button class="button button4"></button>
    <button class="button button5"></button>
  </div>

  <svg id="connections"></svg>
</template>

<style>
  svg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    min-height: 110vh;
    pointer-events: none;
    z-index: 102;
  }

  .wire {
    cursor: pointer;
    fill: none;
  }

  /* Controls */
  .controls {
    position: fixed;
    top: 10px;
    right: 10px;
    background: white;
    padding: 5px;
    border: 1px solid #ccc;
    z-index: 103;
    display: flex;
    gap: 5px;
    align-items: center;
  }

  .button {
    background-color: #04AA6D; /* Green */
    border: none;
    color: white;
    padding: 10px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 2px;
    cursor: pointer;
  }

  .button2 {background-color: #008CBA;} /* Blue */
  .button3 {background-color: #f44336;} /* Red */ 
  .button4 {background-color: #fff48d; color: black;} /* Yellow */ 
  .button5 {background-color: #000000;} /* Black */

  .controls > span {
    color: black;
    font-family: sans-serif;
    font-weight: 600;
  }
</style>