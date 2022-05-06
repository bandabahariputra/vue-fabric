import { fabric } from 'fabric'

const add = (canvas) => {
  const rect = new fabric.Rect({
    top: 50,
    left: 50,
    width: 50,
    height: 50,
    fill: 'yellow'
  })

  const getRect = canvas.getObjects().filter((item) => item.name && item.name.includes('rect'))

  rect.name = 'rect-' + Number(getRect.length + 1)

  canvas.add(rect)
}

const rectangleSetting = {
  add
}

export default rectangleSetting
