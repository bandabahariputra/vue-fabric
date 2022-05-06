import { fabric } from 'fabric'

const add = (canvas, text) => {
  const newText = new fabric.Textbox(text, {
    top: 50,
    left: 50,
    fontSize: 16
  })

  const getText = canvas.getObjects().filter((item) => item.name && item.name.includes('textbox'))

  newText.name = 'textbox-' + Number(getText.length + 1)

  canvas.add(newText)
}

const textSetting = {
  add
}

export default textSetting
