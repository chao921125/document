// 定义状态枚举
const initConfig = {
  // 初始状态
  INIT: 0,
  // 拖动状态
  DRAG_START: 1,
  DRAG_ING: 12,
  // 移动状态
  MOVE_START: 2,
  MOVE_ING: 21,
};

// 操作的对象
let canvasTarget = {
  // 清除画布
  clear: 100,
  // 全局标记是否拖拽
  isDragFlag: false,
  // 缩放倍数 默认 1
  scale: 1,
  // 缩放步长 默认 1
  scaleStep: 0.1,
  // 移动或缩放执行的最小距离
  scaleStepNum: 5,
  // 缩放倍数 最大
  scaleMax: 2,
  // 缩放倍数 最小
  scaleMin: 0.5,
  // 缩放 偏移量
  scaleOffset: {
    x: 0,
    y: 0,
  },
  canvasOffset: {
    x: 0,
    y: 0,
  },
  // 操作对象是否开始拖拽、缩放
  targetStatus: initConfig.INIT,
  // 操作对象 最后一次的位置
  targetLastPosition: {
    x: 0,
    y: 0,
  },
  // 操作对象的偏移量
  targetOffsetPosition: {
    x: 0,
    y: 0,
  },
  // 拖拽对象
  dragTarget: null,
  // 拖拽对象的数据
  dragTargetArray: [],
};

;(() => {
  resizeWindow();
  window.onresize = () => {
    resizeWindow();
  };
})(window);

function resizeWindow() {
  // 固定容易的大小
  // const configWindow = {
  //   maxWidth: 4000,
  //   maxHeight: 2000,
  //   minWidth: 2000,
  //   minHeight: 1000,
  // }

  // let divWidth = document.body.clientWidth;
  // let divHeight = document.body.clientHeight;

  let cWidth = document.body.clientWidth;
  // if (cWidth > configWindow.maxWidth) cWidth = configWindow.maxWidth;
  // if (cWidth < configWindow.minWidth) cWidth = configWindow.minWidth;

  let cHeight = document.body.clientHeight;
  // if (cHeight > configWindow.maxHeight) cHeight = configWindow.maxHeight;
  // if (cHeight < configWindow.minHeight) cHeight = configWindow.minHeight;

  document.querySelector("#mapBox").setAttribute("width", cWidth.toString());
  document.querySelector("#mapBox").setAttribute("height", cHeight.toString());
  document.querySelector("#canvas").setAttribute("width", cWidth.toString());
  document.querySelector("#canvas").setAttribute("height", cHeight.toString());
  initDraw();
}

function initDraw() {
  //获得画板
  let canvas = document.getElementById('canvas');
  if(!canvas.getContext) return false;
  //获得绘画环境
  let ctx = canvas.getContext('2d');
  ctx.save();

  drawDragImg(canvas, ctx, 100, 100, 20);
  canvasTarget.dragTargetArray.push({
    x: 100,
    y: 100,
    r: 20
  });
  drawDragImg(canvas, ctx, 200, 200, 40);
  canvasTarget.dragTargetArray.push({
    x: 200,
    y: 200,
    r: 40
  });
  // drawImg(canvas, ctx);
  // drawCanvasGrid(canvas, ctx);

  canvasEvent(canvas, ctx);
}

// 绘画容器的背景
function drawCanvasGrid(canvas, ctx) {
  // 网格部分参数
  const gridOptions = {
    left: 100,
    top: 100,
    // 正方形
    size: 1100,
    // 非正方形
    width: 550,
    height: 550,
    // 正方形
    step: 5,
    // 非正方形
    stepX: 5,
    stepY: 5,
    colorLine: "#1D1C2D",
    lineWidth: 0.1,
  }

  ctx.fillStyle = gridOptions.colorLine;
  ctx.lineWidth = gridOptions.lineWidth;

  ctx.beginPath();
  ctx.strokeRect(gridOptions.left, gridOptions.top, gridOptions.size, gridOptions.size);
  // row
  for (let i = gridOptions.step + gridOptions.lineWidth; i < gridOptions.size; i += gridOptions.step) {
    ctx.beginPath();
    ctx.moveTo(gridOptions.left, i + gridOptions.top);
    ctx.lineTo(gridOptions.size + gridOptions.left, i + gridOptions.top);
    ctx.closePath();
    ctx.stroke();
  }
  // column
  for (let i = gridOptions.step + gridOptions.lineWidth; i < gridOptions.size; i += gridOptions.step) {
    // 新建一条路径，生成之后，图形绘制命令被指向到路径上生成路径。
    ctx.beginPath();
    // 把画笔移动到指定的坐标
    ctx.moveTo(i + gridOptions.left, gridOptions.top);
    // 绘制一条从当前位置到指定坐标(200, 50)的直线.
    ctx.lineTo(i + gridOptions.left, gridOptions.size + gridOptions.top);
    //闭合路径。会拉一条从当前点到path起始点的直线。如果当前点与起始点重合，则什么都不做
    ctx.closePath();
    // 绘制路径。
    ctx.stroke();
  }
}

// 绘画 不可拖动图形
function drawImg(canvas, ctx) {
  ctx.save();
  ctx.beginPath();
  ctx.fillStyle = "red";
  ctx.fillRect(222, 222, 20, 20);
  ctx.fillStyle = "blue";
  ctx.fillRect(262, 222, 40, 40);
}

// 绘画 可拖动图形
function drawDragImg(canvas, ctx, cx, cy, r) {
  ctx.save();
  ctx.beginPath();

  ctx.strokeStyle = "blue";
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.stroke();

  ctx.closePath();
  ctx.restore();
}

function resetDraw() {

}

// 判断当前鼠标活动位置是否是图形还是画布
function isDragTarget(position, targetArray) {
  if (targetArray) {
    // 计算当前鼠标活动点与目标点的距离
    for (let o of targetArray) {
      if (getDistance(o, position) < o.r) return o;
    }
    return false;
  }
}

// 注册事件
function canvasEvent(canvas, ctx) {
  canvas.onmousedown = (event) => {
    canvasTarget.isDragFlag = false;
    canvas.style.cursor = "grab";
    // canvasDrag(canvas, ctx);
    // 拖拽指定对象
    const canvasPosition = getCanvasPosition(event, canvasTarget.scaleOffset, canvasTarget.scale);
    const dragImgRef = isDragTarget(canvasPosition, canvasTarget.dragTargetArray);
    // 点击对象的时候进行鼠标变形
    if (dragImgRef && canvasTarget.targetStatus === initConfig.INIT) {
      canvas.style.cursor = "all-scroll";
      canvasTarget.dragTarget = dragImgRef;
      canvasTarget.targetStatus = initConfig.DRAG_START;
      canvasTarget.targetLastPosition = canvasPosition;
      canvasTarget.targetOffsetPosition = canvasPosition;
    } else if (!dragImgRef) {
      canvasTarget.targetStatus = initConfig.MOVE_START;
      canvasTarget.canvasOffset = getMousePosition(event);
    }
  }
  canvas.onmousemove = (event) => {
    canvasTarget.isDragFlag = true;
    const canvasPosition = getCanvasPosition(event, canvasTarget.scaleOffset, canvasTarget.scale);
    const mouseOffsetPosition = getMousePosition(event);
    if (canvasTarget.targetStatus === initConfig.DRAG_START && getDistance(canvasPosition, canvasTarget.targetLastPosition) > canvasTarget.scaleStepNum) {
      canvasTarget.targetStatus = initConfig.DRAG_ING;
      canvasTarget.targetOffsetPosition = canvasPosition;
    } else if (canvasTarget.targetStatus === initConfig.DRAG_ING) {
      canvasTarget.dragTarget.x += (canvasPosition.x - canvasTarget.targetOffsetPosition.x);
      canvasTarget.dragTarget.y += (canvasPosition.y - canvasTarget.targetOffsetPosition.y);

      ctx.clearRect(0, 0, canvas.width * canvasTarget.clear * canvasTarget.scale, canvas.height * canvasTarget.clear * canvasTarget.scale);
      canvasTarget.dragTargetArray.forEach((item) => {drawDragImg(canvas, ctx, item.x, item.y, item.r);});
      canvasTarget.targetOffsetPosition = canvasPosition;

    } else if (canvasTarget.targetStatus === initConfig.MOVE_START && getDistance(mouseOffsetPosition, canvasTarget.targetLastPosition) > canvasTarget.scaleStepNum) {
      canvasTarget.targetStatus = initConfig.MOVE_ING;
      canvasTarget.canvasOffset = mouseOffsetPosition;
    } else if (canvasTarget.targetStatus === initConfig.MOVE_ING) {
      canvasTarget.scaleOffset.x += mouseOffsetPosition.x - canvasTarget.canvasOffset.x;
      canvasTarget.scaleOffset.y += mouseOffsetPosition.y - canvasTarget.canvasOffset.y;

      ctx.setTransform(canvasTarget.scale, 0, 0, canvasTarget.scale, canvasTarget.scaleOffset.x, canvasTarget.scaleOffset.y);
      ctx.clearRect(0, 0, canvas.width * canvasTarget.clear * canvasTarget.scale, canvas.height * canvasTarget.clear * canvasTarget.scale);
      canvasTarget.dragTargetArray.forEach((item) => {drawDragImg(canvas, ctx, item.x, item.y, item.r);});
      canvasTarget.targetOffsetPosition = mouseOffsetPosition;
    }
  }
  canvas.onmouseup = (event) => {
    canvas.style.cursor = "default";
    if (canvasTarget.targetStatus !== initConfig.INIT) {
      canvasTarget.targetStatus = initConfig.INIT;
    }
    if (canvasTarget.isDragFlag) {
      console.log("drag");
    } else {
      console.log("no drag");
    }
  }
  canvas.onwheel = (event) => {
    const canvasPosition = getCanvasPosition(event, canvasTarget.scaleOffset, canvasTarget.scale);
    
    const dealX = canvasPosition.x / canvasTarget.scale * canvasTarget.scaleStep;
    const dealY = canvasPosition.y / canvasTarget.scale * canvasTarget.scaleStep;
    if (event.wheelDelta > 0 && canvasTarget.scale < canvasTarget.scaleMax) {
      canvasTarget.scaleOffset.x -= dealX;
      canvasTarget.scaleOffset.y -= dealY;
      canvasTarget.scale += canvasTarget.scaleStep;
    } else if (event.wheelDelta <= 0 && canvasTarget.scale > canvasTarget.scaleMin) {
      canvasTarget.scaleOffset.x += dealX;
      canvasTarget.scaleOffset.y += dealY;
      canvasTarget.scale -= canvasTarget.scaleStep;
    }
    ctx.setTransform(canvasTarget.scale, 0, 0, canvasTarget.scale, canvasTarget.scaleOffset.x, canvasTarget.scaleOffset.y);
    
    ctx.clearRect(0, 0, canvas.width * canvasTarget.clear * canvasTarget.scale, canvas.height * canvasTarget.clear * canvasTarget.scale);
    canvasTarget.dragTargetArray.forEach((item) => {drawDragImg(canvas, ctx, item.x, item.x, item.r);});
    canvasTarget.targetOffsetPosition = canvasPosition;
  }
  // 区分出来点击事件和拖拽事件
  canvas.onclick = () => {
    canvas.style.cursor = "default";
  }
  // 双击放大不做
  canvas.ondblclick = () => {
    canvas.style.cursor = "default";
  }
}

// 缩放
function canvasZoom(canvas, ctx, offsetX, offsetY, scale) {

}

// 拖拽 开始
function canvasDragStart(canvas, ctx) {

}
// 拖拽 中
function canvasDragIng(canvas, ctx) {

}
// 拖拽 结束
function canvasDragEnd(canvas, ctx) {

}

// 获取鼠标点击的位置
function getCanvasPosition(event, offset = { x: 0, y: 0}, scale = 1) {
  return {
    x: (event.offsetX - offset.x) / scale,
    y: (event.offsetY - offset.y) / scale,
  }
}

// 获取鼠标的位置
function getMousePosition(event) {
  return {
    x: event.offsetX,
    y: event.offsetY,
  }
}

// 计算距离
function getDistance(pStart, pEnd) {
  return Math.sqrt((pStart.x - pEnd.x) ** 2 + (pStart.y - pEnd.y) ** 2);
}
