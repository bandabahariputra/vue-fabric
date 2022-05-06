export const changeFill = (canvas, color) => {
  canvas.getActiveObject().set('fill', color)
  canvas.renderAll()
}

export const addAnimateEase = (canvas, data) => {
  canvas.getActiveObject().animateEase = {
    currentLeft: canvas.getActiveObject().left,
    currentTop: canvas.getActiveObject().top,
    move: data.move,
    to: data.to,
    duration: data.duration,
    ease: data.ease
  }

  canvas.renderAll()
}
