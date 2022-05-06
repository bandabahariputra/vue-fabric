<script setup>
  import { defineProps, ref } from 'vue'

  const props = defineProps({
    object: Object
  })

  const emits = defineEmits([
    'handleChangeColor',
    'handleAddAnimateEase'
  ])

  const color = ref('#000000')
  const move = ref(0)
  const to = ref('right')
  const duration = ref(1)
  const ease = ref('easeInQuad')
  const isLoop = ref(false)

  const handleChangeColor = () => {
    emits('handleChangeColor', color.value)
  }

  const handleAddAnimateEase = () => {
    const data = {
      move: move.value,
      to: to.value,
      duration: duration.value,
      ease: ease.value,
      isLoop: isLoop.value
    }

    emits('handleAddAnimateEase', data)
  }
</script>

<template>
  <div class="toolbar">
    <div class="menus">
      <span>change fill: </span>
      <input type="color" v-model="color" @input="handleChangeColor">
    </div>
    <div class="menus">
      <div>animate ease: </div>
      <span>move: </span>
      <input type="number" v-model="move">
      <br>
      <span>to: </span>
      <select v-model="to">
        <option>right</option>
        <option>left</option>
        <option>top</option>
        <option>bottom</option>
      </select>
      <br>
      <span>duration (second): </span>
      <input type="number" v-model="duration">
      <br>
      <span>ease: </span>
      <select v-model="ease">
        <option>easeInQuad</option>
        <option>easeInBack</option>
      </select>
      <br>
      <span>loop: </span>
      <input type="checkbox" v-model="isLoop">
      <br>
      <button @click="handleAddAnimateEase">add animate</button>
    </div>
  </div>
</template>
