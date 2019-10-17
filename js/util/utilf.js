export function canvasTextAutoLine(str, canvas, initX, initY, lineHeight) {
  var ctx = canvas.getContext('2d')
  var lineWidth = 0;
  var canvasWidth = canvas.width;
  var lastSubStrIndex = 0;
  for (let i = 0; i < str.length; i++) {
    lineWidth += ctx.measureText(str[i]).width;
    if (lineWidth > canvasWidth / 10 * 9) {
      ctx.fillText(str.substring(lastSubStrIndex, i), initX, initY);
      initY += lineHeight;
      lineWidth = 0;
      lastSubStrIndex = i;
    }
    if (i == str.length - 1) {
      ctx.fillText(str.substring(lastSubStrIndex, i + 1), initX, initY);
    }
  }
  return initY += lineHeight
}

export function canvasTextRight(str, canvas, initX, initY, rightX) {
  var ctx = canvas.getContext('2d')
  var lineWidth = 0;
  var canvasWidth = canvas.width;
  for (let i = 0; i < str.length; i++) {
    lineWidth += ctx.measureText(str[i]).width;
  }
  initX = canvasWidth - rightX - lineWidth
  ctx.fillText(str, initX, initY);
}

export function canvasTextCenter(str, canvas, initX, initY, rightX) {
  var ctx = canvas.getContext('2d')
  var lineWidth = 0;
  var canvasWidth = canvas.width;
  for (let i = 0; i < str.length; i++) {
    lineWidth += ctx.measureText(str[i]).width;
  }
  initX = canvasWidth / 2 - lineWidth / 2
  ctx.fillText(str, initX, initY);
}

export function canvasTextSplit(canvas, initX, initY) {
  var ctx = canvas.getContext('2d')
  var lineWidth = 0;
  var str = ""
  var canvasWidth = canvas.width - 2 * initX;
  while (lineWidth < canvasWidth) {
    str += "-"
    lineWidth += ctx.measureText("-").width;
  }
  ctx.fillText(str, initX, initY);
}