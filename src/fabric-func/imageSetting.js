const add = (canvas, image) => {
  const reader = new FileReader()
  reader.onload = (f) => {
    const imgObj = new Image()
    imgObj.src = f.target.result
    imgObj.onload = () => {
      const newImage = new fabric.Image(imgObj)
      canvas.centerObject(newImage)

      const getImage = canvas.getObjects().filter((item) => item.name && item.name.includes('image'))

      newImage.name = 'image-' + Number(getImage.length + 1)

      canvas.add(newImage)
    }
  }

  reader.readAsDataURL(image)
}

const imageSetting = {
  add
}

export default imageSetting
