const changeImage = (canvas, image) => {
  const reader = new FileReader()
  reader.onload = (f) => {
    const data = f.target.result
    fabric.Image.fromURL(data, (img) => {
      canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
        scaleX: canvas.width / img.width,
        scaleY: canvas.height / img.height
      })
    })
  }

  reader.readAsDataURL(image)
}

const backgroundSetting = {
  changeImage
}

export default backgroundSetting
