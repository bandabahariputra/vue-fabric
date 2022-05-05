<script setup>
  import { onMounted, ref } from 'vue'
  import fabric, { textbox, background, image, rectangle } from './fabric-func/'

  let canvas = null
  let mediaRecorder = null
  const canvasRef = ref(null)

  const text = ref('')
  const chunks = ref([])
  const recording = ref(false)
  const allowedImageType = [
    'image/png',
    'image/jpg',
    'image/jpeg'
  ]

  onMounted(() => {
    canvas = new fabric.Canvas(canvasRef.value)

    const canvasStream = canvasRef.value.captureStream(30)

    mediaRecorder = new MediaRecorder(canvasStream, {
      mimeType: "video/webm; codecs=vp9"
    })

    mediaRecorder.ondataavailable = (event) => {
      chunks.value.push(event.data)
    }

    mediaRecorder.onstop = () => {
      onMediaRecorderStop(chunks.value)
    }
  })

  const clear = () => {
    const context = canvasRef.value.getContext('2d')
    context.clearRect(0, 0, canvasRef.value.width, canvasRef.value.height)
  }

  const addText = () => {
    if (text.value) {
      textbox.add(canvas, text.value)
      text.value = ''
    }
  }

  const changeBg = (e) => {
    if (e.target.files.length) {
      const file = e.target.files[0]

      if (!allowedImageType.includes(file.type)) {
        alert('wrong file format')
        e.target.value = null
        return
      }

      background.changeImage(canvas, file)
    }
  }

  const addImage = (e) => {
    if (e.target.files.length) {
      const file = e.target.files[0]
      
      if (!allowedImageType.includes(file.type)) {
        alert('wrong file format')
        e.target.value = null
        return
      }

      image.add(canvas, file)
    }
  }

  const addRectangle = () => rectangle.add(canvas)

  // save to video
  const startRecord = () => {
    recording.value = true
    mediaRecorder.start(100)
  }

  const stopRecord = () => {
    mediaRecorder.stop()
    recording.value = false
  }

  const onMediaRecorderStop = (chunks) => {
    const blob = new Blob(chunks, { type: 'video/webm' })
    const recordingUrl = URL.createObjectURL(blob)

    const a = document.createElement('a')
    a.style.display = 'none'
    a.href = recordingUrl
    a.download = 'video/webm'
    a.click()

    URL.revokeObjectURL(recordingUrl)
    document.body.removeChild(a)

    chunks.value = []
  }
</script>


<template>
  <div class="fabric">
    <h1>Vue Fabric.js</h1>
    <div>
      <canvas ref="canvasRef" height="500" width="500"></canvas>
    </div>
    <h3>canvas menu</h3>
    <div class="menus">
      <button @click="clear">clear canvas</button>
    </div>
    <div class="menus">
      <span>add text: </span>
      <input type="text" v-model="text">
      <button @click="addText">add text</button>
    </div>
    <div class="menus">
      <span>change backgound: </span>
      <input type="file" @change="changeBg">
    </div>
    <div class="menus">
      <span>add image: </span>
      <input type="file" @change="addImage">
    </div>
    <div class="menus">
      <span>add rectangle: </span>
      <button @click="addRectangle">add rectangle</button>
    </div>
    <hr>
    <h3>save to video</h3>
    <div class="menus save-to-video">
      <button @click="startRecord" :disabled="recording">
        <span v-if="recording">recording</span>
        <span v-else>start record</span>
      </button>
      <button @click="stopRecord">stop record</button>
    </div>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  margin-bottom: 60px;
}

.fabric {
  width: 500px;
  margin: 0 auto;
}

.fabric div:first-child {
  border: 1px solid #333;
}

.menus {
  margin: 20px 0;
  text-align: left;
}

.menus.save-to-video {
  display: flex;
  justify-content: center;
}
</style>
