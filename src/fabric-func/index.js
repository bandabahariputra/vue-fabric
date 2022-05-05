import { fabric } from 'fabric'
import { renderIcon, deleteObject } from './globalFunc'
import textboxSetting from './textboxSetting'
import backgroundSetting from './backgroundSetting'
import imageSetting from './imageSetting'
import rectangleSetting from './rectangleSetting'

fabric.Object.prototype.transparentCorners = false
fabric.Object.prototype.cornerColor = 'blue'
fabric.Object.prototype.cornerStyle = 'circle'

fabric.Object.prototype.controls.deleteControl = new fabric.Control({
  x: 0.5,
  y: -0.5,
  offsetY: 16,
  cursorStyle: 'pointer',
  mouseUpHandler: deleteObject,
  render: renderIcon,
  cornerSize: 24
})

export const textbox = textboxSetting
export const background = backgroundSetting
export const image = imageSetting
export const rectangle = rectangleSetting

export default fabric
