import { fabric } from 'fabric'

const add = (canvas) => {
  const rect = new fabric.Rect({
    top: 50,
    left: 50,
    width: 50,
    height: 50,
    fill: 'yellow'
  })

  canvas.add(rect)
}

const rectangleSetting = {
  add
}

export default rectangleSetting
