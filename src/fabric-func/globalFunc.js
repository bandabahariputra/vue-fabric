const deleteIcon = "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3C!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3E%3Csvg version='1.1' id='Ebene_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='595.275px' height='595.275px' viewBox='200 215 230 470' xml:space='preserve'%3E%3Ccircle style='fill:%23F44336;' cx='299.76' cy='439.067' r='218.516'/%3E%3Cg%3E%3Crect x='267.162' y='307.978' transform='matrix(0.7071 -0.7071 0.7071 0.7071 -222.6202 340.6915)' style='fill:white;' width='65.545' height='262.18'/%3E%3Crect x='266.988' y='308.153' transform='matrix(0.7071 0.7071 -0.7071 0.7071 398.3889 -83.3116)' style='fill:white;' width='65.544' height='262.179'/%3E%3C/g%3E%3C/svg%3E"

const img = document.createElement('img')
img.src = deleteIcon

export const renderIcon = (ctx, left, top, styleOverride, fabricObject) => {
  const size = 24
  ctx.save()
  ctx.translate(left, top)
  ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle))
  ctx.drawImage(img, -size/2, -size/2, size, size)
  ctx.restore()
}

export const deleteObject = (eventData, transform) => {
  const target = transform.target
  const canvas = target.canvas
  canvas.remove(target)
  canvas.requestRenderAll()
}

export const runAllAnimation = (canvas) => {
  canvas.getObjects().forEach((item) => {
    canvas.discardActiveObject()

    if (item.animateEase) {
      const direction = item.animateEase.to === 'left' || item.animateEase.to === 'right' ? 'left' : 'top'

      let current

      if (direction === 'left') {
        current = 'currentLeft'
      } else {
        current = 'currentTop'
      }

      let move

      if (item.animateEase.to === 'left' || item.animateEase.to === 'top') {
        move = item.animateEase[current] - item.animateEase.move
      } else {
        move = item.animateEase[current] + item.animateEase.move
      }
      
      item.animate(direction, item[direction] === item.animateEase[current] ? move : item.animateEase[current], {
        duration: item.animateEase.duration * 1000,
        onChange: canvas.renderAll.bind(canvas),
        onComplete: function() {
          runAllAnimation(canvas)
        },
        easing: fabric.util.ease[item.animateEase.ease]
      })
    }
  })
}
