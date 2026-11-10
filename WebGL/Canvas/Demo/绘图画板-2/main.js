// Canvas初始设置
let canvas = document.getElementById("canvas");
canvas.width = document.documentElement.clientWidth;
canvas.height = document.documentElement.clientHeight;
let ctx = canvas.getContext("2d");
ctx.strokeStyle = "none";
var lineWidth = 5;
ctx.lineCap = "round";
let l = 0; // arr.length,
let machine;

let paintingColor = "black"; // 画笔颜色
let painting = false;
var eraserEnabled = false;
let dataArr = [];
let orgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
dataArr.push(orgData);
let arr, arr1, arr2, ctr;
let LiColor = document.getElementsByTagName("li");

let paintor = document.querySelector("button#painting"),
  eraser = document.querySelector("button#eraser"),
  clear = document.querySelector("button#clear"),
  undo = document.querySelector("button#undo"),
  download = document.querySelector("button#download"),
  thin = document.querySelector("button#thin"),
  normal = document.querySelector("button#normal"),
  strong = document.querySelector("button#strong");

// listenToUser()
getColor();

// 设置线
function getColor() {
  for (let i = 0; i < LiColor.length; i++) {
    LiColor[i].onclick = function () {
      eraserEnabled = false;
      document.querySelectorAll("li.active")[0].classList.remove("active");
      LiColor[i].classList.add("active");
      eraser.classList.remove("active");
      paintor.classList.add("active");
      lineWidth = document.querySelectorAll("button.active")[1].value;
      paintingColor = LiColor[i].classList[0];
      ctx.fillStyle = ctx.strokeStyle = paintingColor;
    };
  }
}

paintor.onclick = () => {
  eraserEnabled = false;
  eraser.classList.remove("active");
  paintor.classList.add("active");
  paintingColor = paintingColor || "black";
  lineWidth = document.querySelectorAll("button.active")[1].value;
};

eraser.onclick = () => {
  eraserEnabled = true;
  paintor.classList.remove("active");
  eraser.classList.add("active");
  lineWidth = parseInt(lineWidth) + 5;
};

clear.onclick = () => {
  clear.classList.add("active");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  dataArr.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
  setTimeout('clear.classList.remove("active")', 200);
};

undo.onclick = () => {
  undo.classList.add("active");

  dataArr.pop();
  console.log(dataArr.length, dataArr);
  ctx.putImageData(dataArr[dataArr.length - 1] || orgData, 0, 0);
  setTimeout('undo.classList.remove("active")', 200);
};

download.onclick = () => {
  download.classList.add("active");
  let name = prompt("请输入要保存的图片名称", "默认图名"); // 'canvas绘制图片'为图片默认名
  if (name === "") {
    alert("名字不能为空");
  } else {
    let href = canvas.toDataURL(); // 获取canvas对应的base64编码
    let a = document.createElement("a"); // 创建a标签
    a.download = name; // 设置图片名字
    a.href = href;
    a.dispatchEvent(new MouseEvent("click"));
  }
  setTimeout('download.classList.remove("active")', 200);
};

thin.onclick = () => {
  normal.classList.remove("active");
  strong.classList.remove("active");
  thin.classList.add("active");
  lineWidth = eraserEnabled ? 3 : 1;
};
normal.onclick = () => {
  thin.classList.remove("active");
  strong.classList.remove("active");
  normal.classList.add("active");
  lineWidth = eraserEnabled ? 8 : 5;
};
strong.onclick = () => {
  thin.classList.remove("active");
  normal.classList.remove("active");
  strong.classList.add("active");
  lineWidth = eraserEnabled ? 15 : 10;
};
if (is_touch_device()) {
  machine = "phone";
  canvas.ontouchstart = (e) => {
    painting = true;
    arr = arr1 = getPoint(e);
    // 起点
  };
  canvas.ontouchmove = (e) => {
    if (painting) {
      arr.push(getPoint(e));
      arr2 = getPoint(e);
      l = arr.length;
      ctx.fillStyle = ctx.strokeStyle = eraserEnabled ? "white" : paintingColor;
      if (l > 3) {
        ctr = arr[l - 2];
        creatLine(arr1, ctr, arr2);
        arr1 = arr2;
      }
    }
  };
  canvas.ontouchend = (e) => {
    painting = false;
    dataArr.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
  };
} else {
  machine = "PC";
  canvas.onmousedown = (e) => {
    arr = arr1 = getPoint(e);
    painting = true;
  };

  canvas.onmouseup = (e) => {
    painting = false;
    dataArr.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
  };

  canvas.onmousemove = (e) => {
    if (!painting) {
      return;
    }
    arr.push(getPoint(e));
    arr2 = getPoint(e);
    l = arr.length;
    ctx.fillStyle = ctx.strokeStyle = eraserEnabled ? "white" : paintingColor;
    if (l > 3) {
      ctr = arr[l - 2];
      creatLine(arr1, ctr, arr2);
      arr1 = arr2;
    }
  };
}

// 检测设备
function is_touch_device() {
  try {
    document.createEvent("TouchEvent");
    return true;
  } catch (e) {
    return false;
  }
}

function getPoint(e) {
  return machine === "phone"
    ? [e.touches[0].clientX, e.touches[0].clientY]
    : [e.clientX, e.clientY];
}

function creatLine(pot1, ctr, pot2) {
  ctx.beginPath();
  ctx.moveTo(pot1[0], pot1[1]);
  ctx.lineWidth = lineWidth;
  ctx.quadraticCurveTo(ctr[0], ctr[1], pot2[0], pot2[1]);
  ctx.stroke();
}
