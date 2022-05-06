export const changeFill = (canvas, color) => {
  canvas.getActiveObject().set('fill', color)
  canvas.renderAll()
}
