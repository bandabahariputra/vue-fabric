<script setup>
  import { defineProps, ref } from 'vue'

  const props = defineProps({
    object: Object
  })

  const emits = defineEmits([
    'handleChangeColor'
  ])

  const color = ref('')

  const handleChangeColor = () => {
    emits('handleChangeColor', color.value)
  }
</script>

<template>
  <div class="toolbar">
    <div class="menus">
      <span>change fill: </span>
      <input type="color" v-model="color" @input="handleChangeColor">
    </div>
  </div>
</template>
