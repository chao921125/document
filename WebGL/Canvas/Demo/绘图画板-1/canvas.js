var canvas = document.getElementById('canvas');
var cxt = canvas.getContext('2d');
//获取工具按钮的标签
//获取画笔标签
var Brush = document.getElementById('means_brush');
//获取橡皮标签
var Eraser = document.getElementById('means_eraser');
//获取油漆桶标签
var Paint = document.getElementById('means_paint');
//获取吸管标签
var Straw = document.getElementById('means_straw');
//获取文本标签
var Text = document.getElementById('means_text');
//获取放大镜标签
var Magnifier = document.getElementById('means_magnifier');
//获取时钟标签
var time = document.getElementById("means_time");
//获取仪表盘标签
var panel = document.getElementById("means_panel");
//获取三次贝塞尔标签
var bs = document.getElementById("means_bs");
//获取坐标标签
var zb = document.getElementById("means_zb");
//获取旋转的标签
var rota = document.getElementById("means_rot");
//获取画线标签
var Line = document.getElementById('shape_line');
//获取画圆圈的标签
var Arc = document.getElementById('shape_arc');
//获取画方框的标签
var Rect = document.getElementById('shape_rect');
//获取画多标签的标签
var Poly = document.getElementById('shape_poly');
//获取画圆形(填充)
var ArcFill = document.getElementById('shape_arcfill');
//获取画矩形的标签
var RectFill = document.getElementById('shape_rectfill');

//把工具和形状标签放到一个数组中
var actions = [Brush, Eraser, Paint, Straw, Text, Magnifier, Line, Arc, Rect, Poly, ArcFill, RectFill];

//获取线宽按钮
var Line_1 = document.getElementById('width_1');
var Line_3 = document.getElementById('width_3');
var Line_5 = document.getElementById('width_5');
var Line_8 = document.getElementById('width_8');
//把4中线宽对象放到一个数组中
var widths = [Line_1, Line_3, Line_5, Line_8];

//获取颜色按钮
var ColorRed = document.getElementById('red');
var ColorGreen = document.getElementById('green');
var ColorBlue = document.getElementById('blue');
var ColorYellow = document.getElementById('yellow');
var ColorWhite = document.getElementById('white');
var ColorBlack = document.getElementById('black');
var ColorPink = document.getElementById('pink');
var ColorPurPle = document.getElementById('purple');
var ColorCyan = document.getElementById('cyan');
var ColorOrange = document.getElementById('orange');
var Colorgray = document.getElementById('gray');
//把颜色标签对象放到一个数组中
var colors = [ColorRed, ColorGreen, ColorBlue, ColorYellow, ColorWhite, ColorBlack, ColorPink, ColorPurPle, ColorCyan, ColorOrange, Colorgray];

//设置初始值 
//默认选中画笔工具
drawBrush(0);
//默认设置颜色
setColor(ColorRed, 0);
//设置默认线宽
setLineWidth(0);
//画布旋转
function rotating() {
    cxt.save;
    cxt.rotate(30 * Math.PI / 180);

    cxt.restore();
}
//虚线
function drawDashedLine() {
    //运用三元表达式实现默认参数
    var flag = 0;
    cxt.setLineDash([5, 15]);
    canvas.onmousedown = function(evt) {
        evt = window.event || evt;
        var startX = evt.pageX - this.offsetLeft;
        var startY = evt.pageY - this.offsetTop;
        cxt.beginPath();
        cxt.moveTo(startX, startY);
        flag = 1;
    }
    canvas.onmousemove = function(evt) {
        evt = window.event || evt;
        var endX = evt.pageX - this.offsetLeft;
        var endY = evt.pageY - this.offsetTop;
        if (flag) {
            cxt.lineTo(endX, endY);
        }
        //     //要记得描线啊
        cxt.stroke();
        //结束绘制
        cxt.closePath();
    }

    //鼠标抬起的时候结束绘图
    canvas.onmouseup = function() {
            flag = 0;
        }
        //鼠标移出canvas的时候必须取消画图操作
    canvas.onmouseout = function() {
        flag = 0;
    }
    drawBrush(0);

}
//网格
function drawGrid(color, stepx, stepy) {
    cxt.save()
    cxt.strokeStyle = color;
    cxt.fillStyle = '#ffffff';
    cxt.lineWidth = 0.5;
    cxt.fillRect(0, 0, cxt.canvas.width, cxt.canvas.height);
    for (var i = stepx + 0.5; i < cxt.canvas.width; i += stepx) {
        cxt.beginPath();
        cxt.moveTo(i, 0);
        cxt.lineTo(i, cxt.canvas.height);
        cxt.stroke();
    }

    for (var i = stepy + 0.5; i < cxt.canvas.height; i += stepy) {
        cxt.beginPath();
        cxt.moveTo(0, i);
        cxt.lineTo(cxt.canvas.width, i);
        cxt.stroke();
    }
    cxt.restore();
}

//状态设置函数
function setStatus(Arr, num, type) {
    for (var i = 0; i < Arr.length; i++) {
        //设置选中的标签改变CSS属性
        if (i == num) {
            //设置改变CSS的样式是背景色还是边框
            if (type == 1) {
                Arr[i].style.background = "#CCC";
            } else {
                Arr[i].style.border = "1px solid #fff";
            }

        } else { //设置未选中的组中的其他标签改变颜色
            if (type == 1) {
                Arr[i].style.background = "white";
            } else {
                Arr[i].style.border = "1px solid #000";
            }
        }
    }

}

//设置图像功能函数  保存图片  清空画布
function saveimg() {
    var imgdata = canvas.toDataURL();
    var b64 = imgdata.substring(22);
    //alert(b64);
    //将form表单中的隐藏表单 赋值(值就是我们获取的b64)
    var data = document.getElementById('data');
    data.value = b64;
    //将表单提交到后台
    var form = document.getElementById('myform');
    form.submit();
}
//清空画布
function clearimg() {
    //画布清除方法
    cxt.clearRect(0, 0, 880, 600);
}

//列出所有的按钮对应的函数
//铅笔工具函数
function drawBrush(num) {
    setStatus(actions, num, 1);
    var flag = 0; //设置标志位->检测鼠标是否按下
    canvas.onmousedown = function(evt) {
        evt = window.event || evt;
        var startX = evt.pageX - this.offsetLeft;
        var startY = evt.pageY - this.offsetTop;
        cxt.beginPath();
        cxt.moveTo(startX, startY);
        flag = 1;
    }

    //鼠标移动的时候->不同的绘图(获取鼠标的位置)
    canvas.onmousemove = function(evt) {
        evt = window.event || evt;
        var endX = evt.pageX - this.offsetLeft;
        var endY = evt.pageY - this.offsetTop;
        //判断一下鼠标是否按下
        if (flag) {
            //移动的时候设置路径并且画出来
            cxt.lineTo(endX, endY);
            cxt.stroke();
        }

    }

    //鼠标抬起的时候结束绘图
    canvas.onmouseup = function() {
        flag = 0;
    }

    //鼠标移出canvas的时候必须取消画图操作
    canvas.onmouseout = function() {
        flag = 0;
    }
}

var eraserFlag = 0; //设置橡皮擦的状态标志位
//橡皮工具函数
function drawEraser(num) {
    setStatus(actions, num, 1);
    canvas.onmousedown = function(evt) {
            evt = window.event || evt;
            var eraserX = evt.pageX - this.offsetLeft;
            var eraserY = evt.pageY - this.offsetTop;
            //canvas擦出方法 cxt.clearRect();
            cxt.clearRect(eraserX - cxt.lineWidth, eraserY - cxt.lineWidth, cxt.lineWidth * 2, cxt.lineWidth * 2);
            eraserFlag = 1;
        }
        //随着鼠标移动不停地擦出
    canvas.onmousemove = function(evt) {
            evt = window.event || evt;
            var eraserX = evt.pageX - this.offsetLeft;
            var eraserY = evt.pageY - this.offsetTop;
            // 擦除方法
            if (eraserFlag) { //判断鼠标左键是否按下(按下的情况下拖动鼠标才能删除)
                cxt.clearRect(eraserX - cxt.lineWidth, eraserY - cxt.lineWidth, cxt.lineWidth * 2, cxt.lineWidth * 2);
            }

        }
        //抬起鼠标按键 	清除擦出的状态位 变成0
    canvas.onmouseup = function() {
            eraserFlag = 0;
        }
        //抬起鼠标移出画布 	清除擦出的状态位 变成0
    canvas.onmouseout = function() {
        eraserFlag = 0;
    }
}

//油漆桶工具函数
function drawPaint(num) {
    setStatus(actions, num, 1);
    canvas.onmousedown = function() {
        //把画布涂成指定的颜色->画一个填充颜色的矩形
        cxt.fillRect(0, 0, 880, 600);
    }
    canvas.onmouseup = null;
    canvas.onmousemove = null;
    canvas.onmouseout = null;
}

//吸管工具函数
function drawStraw(num) {
    setStatus(actions, num, 1);
    canvas.onmousedown = function(evt) {
            evt = window.event || evt;
            var strawX =
                evt.pageX - this.offsetLeft;
            var strawY = evt.pageY - this.offsetTop;
            //获取该点坐标处的颜色信息
            //获取图像信息的方法getImageData(开始点X,开始点Y,宽度,高度)
            var obj = cxt.getImageData(strawX, strawY, 1, 1);
            var color = 'rgb(' + obj.data[0] + ',' + obj.data[1] + ',' + obj.data[2] + ')';
            //将吸管吸出的颜色设定到我们的应用中 
            cxt.strokeStyle = color;
            cxt.fillStyle = color;
            //颜色吸取吸取之后自动选中画笔工具
            drawBrush(0);
        }
        //取消移动事件 、鼠标抬起事件、鼠标移出事件
    canvas.onmousemove = null;
    canvas.onmouseup = null;
    canvas.onmouseout = null;

}

//文本工具函数
function drawText(num) {
    setStatus(actions, num, 1);
    canvas.onmousedown = function(evt) {
        evt = window.event || evt;
        //获取鼠标点击时的位置
        var textX = evt.pageX - this.offsetLeft;
        var textY = evt.pageY - this.offsetTop;
        //alert(textX+'------'+textY);
        //获取用户输入的信息
        //window.prompt(对话框提示,默认值);
        var userVal = window.prompt('请在这里输入文字', '');
        //alert(userVal);
        //将用户输入的文字写到画布中对应的坐标点上。
        if (userVal != null) {
            cxt.fillText(userVal, textX, textY);
        }

    }
    canvas.onmousemove = null;
    canvas.onmouseup = null;
    canvas.onmouseout = null;
}

//放大镜工具函数
function drawMagnifier(num) {
    setStatus(actions, num, 1);
    //用户输入的数据大小
    var scale = window.prompt('请输入要放大的百分比[只能是整型]', '100');
    //吧数据转成对应canvas画布的大小
    var scaleW = 880 * scale / 100;
    var scaleH = 400 * scale / 100;
    //将数据设置到对应HTML标签上
    canvas.style.width = parseInt(scaleW) + 'px';
    canvas.style.height = parseInt(scaleH) + 'px';
}

//线形状函数
function drawLine(num) {
    setStatus(actions, num, 1);
    canvas.onmousedown = function(evt) {
        evt = window.event || evt;
        //获取起始点的坐标(相对于canvas画布的)
        //先获取鼠标距离页面顶端的距离和左端的距离
        //evt.pageY 	evt.pageX 
        //获取当前画布相对页面顶端和左端的距离
        //this.offectTop 		this.offsetLeft

        //计算当前鼠标相对于canvas画布的距离(以canvas的左上角为0，0)
        var startX = evt.pageX - this.offsetLeft;
        var startY = evt.pageY - this.offsetTop;
        //设置直线的开始点
        cxt.beginPath(); //尽量写上开始新路径
        cxt.moveTo(startX, startY);
    }
    canvas.onmousemove = null; //注销掉其他工具注册时间
    canvas.onmouseout = null; //
    //鼠标按键抬起的时候
    canvas.onmouseup = function(evt) {
        //计算鼠标抬起时鼠标相对于画布的坐标
        var endX = evt.pageX - this.offsetLeft;
        var endY = evt.pageY - this.offsetTop;
        //设置路径吧开始点和结束点连接起来,然后进行绘图
        cxt.lineTo(endX, endY);
        cxt.closePath();
        cxt.stroke();
    }
}
//将变量设置为全局变量(如果是局部变量在其他的函数中无法调用)
var arcX = 0;
var arcY = 0;
//圆形形状函数
function drawArc(num) {
    setStatus(actions, num, 1);
    canvas.onmousedown = function(evt) {
        evt = window.event || evt;
        //获取圆心的位置
        arcX = evt.pageX - this.offsetLeft;
        arcY = evt.pageY - this.offsetTop;
    }

    canvas.onmouseup = function(evt) {
        evt = window.event || evt;
        //获取半径(目的)
        //实际获取的是一个坐标
        var endX = evt.pageX - this.offsetLeft;
        var endY = evt.pageY - this.offsetTop;
        //计算C的距离
        var a = endX - arcX;
        var b = endY - arcY;
        //计算半径
        var c = Math.sqrt(a * a + b * b);
        cxt.beginPath();
        cxt.arc(arcX, arcY, c, 0, 360, false);
        cxt.closePath();
        cxt.stroke();
    }
    canvas.onmousemove = null; //注销掉鼠标移动时间
    canvas.onmouseout = null;
}
//设置矩形全局变量
var rectX = 0;
var rectY = 0;
//矩形形状函数
function drawRect(num) {
    setStatus(actions, num, 1);
    canvas.onmousedown = function(evt) {
        evt = window.event || evt;
        //获取矩形左上角(对角线的开始点)
        rectX = evt.pageX - this.offsetLeft;
        rectY = evt.pageY - this.offsetTop;
    }
    canvas.onmouseup = function(evt) {
        evt = window.event || evt;
        //先获取鼠标的当前坐标
        var endX = evt.pageX - this.offsetLeft;
        var endY = evt.pageY - this.offsetTop;
        //计算矩形的宽高
        var rectW = endX - rectX;
        var rectH = endY - rectY;
        //画出矩形
        cxt.strokeRect(rectX, rectY, rectW, rectH);
    }
    canvas.onmousemove = null;
    canvas.onmouseout = null;
}

var polyX = 0;
var polyY = 0;
//三角形形状函数
function drawPoly(num) {
    setStatus(actions, num, 1);
    canvas.onmousedown = function(evt) {
        evt = window.event || evt;
        polyX = evt.pageX - this.offsetLeft;
        POLyY = evt.pageY - this.offsetTop;
    }
    canvas.onmouseup = function(evt) {
        evt = window.event || evt;
        var endX = evt.pageX - this.offsetLeft;
        var endY = evt.pageY - this.offsetTop;
        cxt.beginPath();
        //将画笔移动到右下角的顶点
        cxt.moveTo(endX, endY);
        //计算左下角的顶点坐标
        var lbX = 2 * polyX - endX;
        var lbY = endY;
        cxt.lineTo(lbX, lbY);
        //设置第三个顶点的坐标
        var tmpC = 2 * (endX - polyX);
        var tmpA = endX - polyX;
        var tmpB = Math.sqrt(tmpC * tmpC - tmpA * tmpA);
        //计算最上面顶点坐标
        //endY-tmpB 定点的Y坐标 polyX是顶点的X坐标
        //画到顶点
        cxt.lineTo(polyX, endY - tmpB);
        //封闭路径->画出来
        cxt.closePath();
        cxt.stroke();
    }
    canvas.onmousemove = null;
    canvas.onmouseout = null;
}

//圆形填充形状函数
function drawArcFill(num) {
    setStatus(actions, num, 1);
    canvas.onmousedown = function(evt) {
        evt = window.event || evt;
        //获取圆心的位置
        arcX = evt.pageX - this.offsetLeft;
        arcY = evt.pageY - this.offsetTop;
    }
    canvas.onmouseup = function(evt) {
        evt = window.event || evt;
        //获取半径(目的)
        //实际获取的是一个坐标
        var endX = evt.pageX - this.offsetLeft;
        var endY = evt.pageY - this.offsetTop;
        //计算C的距离
        var a = endX - arcX;
        var b = endY - arcY;
        //计算半径
        var c = Math.sqrt(a * a + b * b);
        cxt.beginPath();
        cxt.arc(arcX, arcY, c, 0, 360, false);
        cxt.closePath();
        cxt.fill();
    }
    canvas.onmousemove = null; //注销掉鼠标移动时间
    canvas.onmouseout = null;
}

//矩形填充形状函数
function drawRectFill(num) {
    setStatus(actions, num, 1);

    canvas.onmousedown = function(evt) {
        evt = window.event || evt;
        //获取矩形左上角(对角线的开始点)
        rectX = evt.pageX - this.offsetLeft;
        rectY = evt.pageY - this.offsetTop;

    }

    canvas.onmouseup = function(evt) {
        evt = window.event || evt;
        //先获取鼠标的当前坐标
        var endX = evt.pageX - this.offsetLeft;
        var endY = evt.pageY - this.offsetTop;
        //计算矩形的宽高
        var rectW = endX - rectX;
        var rectH = endY - rectY;
        //画出矩形
        cxt.fillRect(rectX, rectY, rectW, rectH);
    }
    canvas.onmousemove = null;
    canvas.onmouseout = null;
}

//线宽设置函数
function setLineWidth(num) {
    setStatus(widths, num, 1);
    switch (num) {
        case 0:
            cxt.lineWidth = 1;
            break;
        case 1:
            cxt.lineWidth = 3;
            break;
        case 2:
            cxt.lineWidth = 5;
            break;
        case 3:
            cxt.lineWidth = 8;
            break;
        default:
            cxt.lineWidth = 1;

    }
}

//颜色设置函数
function setColor(obj, num) {
    setStatus(colors, num, 0);
    //设置画笔颜色和填充颜色
    cxt.strokeStyle = obj.id;
    cxt.fillStyle = obj.id;
}

//绘制时钟
function Time(num) {
    setStatus(actions, num, 1);
    var canvas = document.getElementById('canvas'),
        context = canvas.getContext("2d"),
        FONT_HEIGHT = 15,
        MARGIN = 35,
        HAND_TRUNCATION = canvas.width / 25,
        HOUR_HAND_TRUNCATION = canvas.width / 10,
        NUMERAL_SPACING = 20,
        RADIUS = canvas.width / 3 - MARGIN,
        HAND_RADIUS = RADIUS + NUMERAL_SPACING;
    //绘制路径
    function drawCircle() {
        context.beginPath();

        context.arc(canvas.width / 2, canvas.height / 2,
            RADIUS, 0, Math.PI * 2, true); //一个圆形，radius=半径，起始位0，math.pi结束绘制的角度， true=逆时针，
        context.fillStyle = "#D4D444";
        context.stroke(); //开始绘制

    }
    //将时间刻度写在表盘上
    function drawNumerals() {
        var numerals = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
            angle = 0,
            numeralWidth = 0;
        numerals.forEach(function(numeral) { //forEach() 方法用于调用数组的每个元素，并将元素传递给回调函数。
            angle = Math.PI / 6 * (numeral - 3);
            //(1-3)*30=-60——————角度是一哪儿为起点？还是以x轴。
            numeralWidth = context.measureText(numeral).width;
            cxt.measureText(txt) //在画布上输出文本之前， 检查字体的宽度
            context.fillText(numeral,
                canvas.width / 2 + Math.cos(angle) * (HAND_RADIUS) - numeralWidth / 2,
                canvas.height / 2 + Math.sin(angle) * (HAND_RADIUS) + FONT_HEIGHT / 3);

        });
    }

    function drawCenter() {
        context.beginPath(); //
        context.fillStyle = '#D2F74F'; //改变
        context.arc(canvas.width / 2, canvas.height / 2, 5, 0, Math.PI * 2, true);
        context.fill();

    }

    function drawHand(loc, isHour) {
        var angle = (Math.PI * 2) * (loc / 60) - Math.PI / 2,
            //2pi/60*此时分钟数
            handRadius = isHour ? RADIUS - HAND_TRUNCATION - HOUR_HAND_TRUNCATION : RADIUS - HAND_TRUNCATION;
        context.moveTo(canvas.width / 2, canvas.height / 2); //从起点
        context.lineTo(canvas.width / 2 + Math.cos(angle) * handRadius,
            canvas.height / 2 + Math.sin(angle) * handRadius); //连接到什么地方
        context.stroke(); //进行绘制
    }

    function drawHands() { //根据得到的时间通过调用drawHand方法绘制时针，分针，秒针
        var date = new Date,
            hour = date.getHours();
        hour = hour > 12 ? hour - 12 : hour;
        drawHand(hour * 5 + (date.getMinutes() / 60) * 5, true, 1); //0.5是线的粗细
        drawHand(date.getMinutes(), false, 0.5);
        drawHand(date.getSeconds(), false, 0.2);
    }




    function drawClock() {
        context.clearRect(0, 0, canvas.width, canvas.height); //在给定矩形内清空一个矩形
        context.save();
        context.fillStyle = 'rgba(255,255,255,0.8)';
        context.fillRect(0, 0, canvas.width, canvas.height);
        drawCircle(); //绘制圆形
        drawCenter(); //在圆形中绘制一个点
        drawHands(); //根据得到的时间绘制时针，分针，秒针
        context.restore();
        drawNumerals(); //将时间刻度写在表盘上
        updateClockImage();

    }

    context.font = FONT_HEIGHT + 'px Arial';
    loop = setInterval(drawClock, 500);
}

function drawpanel(num) {
    setStatus(actions, num, 1);
    var canvas = document.getElementById('canvas'),
        context = canvas.getContext("2d"),
        CENTROID_RADIUS = 10,
        CENTROID_STROKE_STYLE = 'rgba(0, 0, 0, 0.5)',
        CENTROID_FILL_STYLE = 'rgba(80, 190, 240, 0.6)',

        RING_INNER_RADIUS = 35,
        RING_OUTER_RADIUS = 55,

        ANNOTATIONS_FILL_STYLE = 'rgba(0, 0, 230, 0.9)',
        ANNOTATIONS_TEXT_SIZE = 12,

        TICK_WIDTH = 10,
        TICK_LONG_STROKE_STYLE = 'rgba(100, 140, 230, 0.9)',
        TICK_SHORT_STROKE_STYLE = 'rgba(100, 140, 230, 0.7)',

        TRACKING_DIAL_STROKING_STYLE = 'rgba(100, 140, 230, 0.5)',

        GUIDEWIRE_STROKE_STYLE = 'goldenrod',
        GUIDEWIRE_FILL_STYLE = 'rgba(250, 250, 0, 0.6)',

        circle = {
            x: canvas.width / 2,
            y: canvas.height / 2,
            radius: 150
        };

    // Functions..........................................................

    function drawDial() {
        var loc = { x: circle.x, y: circle.y };

        drawCentroid();


        drawRing();
        drawTickInnerCircle();
        drawTicks();
        drawAnnotations();
    }

    function drawCentroid() {
        context.beginPath();
        context.save();
        context.strokeStyle = CENTROID_STROKE_STYLE;
        context.fillStyle = CENTROID_FILL_STYLE;
        context.arc(circle.x, circle.y,
            CENTROID_RADIUS, 0, Math.PI * 2, false);
        context.stroke();
        context.fill();
        context.restore();
    }

    function drawCentroidGuidewire(loc) {
        var angle = -Math.PI / 4,
            radius, endpt;

        radius = circle.radius + RING_OUTER_RADIUS;

        if (loc.x >= circle.x) {
            endpt = {
                x: circle.x + radius * Math.cos(angle),
                y: circle.y + radius * Math.sin(angle)
            };
        } else {
            endpt = {
                x: circle.x - radius * Math.cos(angle),
                y: circle.y - radius * Math.sin(angle)
            };
        }

        context.save();

        context.strokeStyle = GUIDEWIRE_STROKE_STYLE;
        context.fillStyle = GUIDEWIRE_FILL_STYLE;

        context.beginPath();
        context.moveTo(circle.x, circle.y);
        context.lineTo(endpt.x, endpt.y);
        context.stroke();

        context.beginPath();
        context.strokeStyle = TICK_LONG_STROKE_STYLE;
        context.arc(endpt.x, endpt.y, 5, 0, Math.PI * 2, false);
        context.fill();
        context.stroke();

        context.restore();
    }

    function drawRing() {
        drawRingOuterCircle();

        context.strokeStyle = 'rgba(0, 0, 0, 0.1)';
        context.arc(circle.x, circle.y,
            circle.radius + RING_INNER_RADIUS,
            0, Math.PI * 2, false);

        context.fillStyle = 'rgba(100, 140, 230, 0.1)';
        context.fill();
        context.stroke();
    }

    function drawRingOuterCircle() {
        context.shadowColor = 'rgba(0, 0, 0, 0.7)';
        context.shadowOffsetX = 3,
            context.shadowOffsetY = 3,
            context.shadowBlur = 6,
            context.strokeStyle = TRACKING_DIAL_STROKING_STYLE;
        context.beginPath();
        context.arc(circle.x, circle.y, circle.radius +
            RING_OUTER_RADIUS, 0, Math.PI * 2, true);
        context.stroke();
    }

    function drawTickInnerCircle() {
        context.save();
        context.beginPath();
        context.strokeStyle = 'rgba(0, 0, 0, 0.1)';
        context.arc(circle.x, circle.y,
            circle.radius + RING_INNER_RADIUS - TICK_WIDTH,
            0, Math.PI * 2, false);
        context.stroke();
        context.restore();
    }

    function drawTick(angle, radius, cnt) {
        var tickWidth = cnt % 4 === 0 ? TICK_WIDTH : TICK_WIDTH / 2;

        context.beginPath();

        context.moveTo(circle.x + Math.cos(angle) * (radius - tickWidth),
            circle.y + Math.sin(angle) * (radius - tickWidth));

        context.lineTo(circle.x + Math.cos(angle) * (radius),
            circle.y + Math.sin(angle) * (radius));

        context.strokeStyle = TICK_SHORT_STROKE_STYLE;
        context.stroke();
    }

    function drawTicks() {
        var radius = circle.radius + RING_INNER_RADIUS,
            ANGLE_MAX = 2 * Math.PI,
            ANGLE_DELTA = Math.PI / 64,
            tickWidth;

        context.save();

        for (var angle = 0, cnt = 0; angle < ANGLE_MAX; angle += ANGLE_DELTA, cnt++) {
            drawTick(angle, radius, cnt++);
        }

        context.restore();
    }

    function drawAnnotations() {
        var radius = circle.radius + RING_INNER_RADIUS;

        context.save();
        context.fillStyle = ANNOTATIONS_FILL_STYLE;
        context.font = ANNOTATIONS_TEXT_SIZE + 'px Helvetica';

        for (var angle = 0; angle < 2 * Math.PI; angle += Math.PI / 8) {
            context.beginPath();
            context.fillText((angle * 180 / Math.PI).toFixed(0),
                circle.x + Math.cos(angle) * (radius - TICK_WIDTH * 2),
                circle.y - Math.sin(angle) * (radius - TICK_WIDTH * 2));
        }
        context.restore();
    }

    // Initialization....................................................

    context.shadowOffsetX = 2;
    context.shadowOffsetY = 2;
    context.shadowBlur = 4;
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    drawDial();
}

function drawbesaer(num) {
    setStatus(actions, num, 1);
    var canvas = document.getElementById('canvas'),
        context = canvas.getContext("2d"),
        strokeStyleSelect = document.getElementById('strokeStyleSelect'),
        instructions = document.getElementById('instructions'),
        instructionsOkayButton = document.getElementById('instructionsOkayButton'),
        instructionsNoMoreButton = document.getElementById('instructionsNoMoreButton'),

        showInstructions = true,

        GRID_STROKE_STYLE = 'lightblue',
        GRID_SPACING = 10,
        guidewires = true,
        CONTROL_POINT_RADIUS = 5,
        CONTROL_POINT_STROKE_STYLE = 'blue',
        CONTROL_POINT_FILL_STYLE = 'rgba(255, 255, 0, 0.5)',

        END_POINT_STROKE_STYLE = 'navy',
        END_POINT_FILL_STYLE = 'rgba(0, 255, 0, 0.5)',
        drawingImageData, // Image data stored on mouse down events

        mousedown = {}, // Cursor location for last mouse down event
        rubberbandRect = {}, // Constantly updated for mouse move events

        dragging = false, // If true, user is dragging the cursor
        draggingPoint = false, // End- or control-point the user is dragging

        endPoints = [{}, {}], // end point locations (x, y)
        controlPoints = [{}, {}], // control point locations (x, y)
        editing = false; // If true, user is editing the curve

    // Functions..........................................................
    function windowToCanvas(x, y) {
        var bbox = canvas.getBoundingClientRect();

        return {
            x: x - bbox.left * (canvas.width / bbox.width),
            y: y - bbox.top * (canvas.height / bbox.height)
        };
    }
    // Save and restore drawing surface...................................

    function saveDrawingSurface() {
        drawingImageData = context.getImageData(0, 0,
            canvas.width, canvas.height);
    }

    function restoreDrawingSurface() {
        context.putImageData(drawingImageData, 0, 0);
    }

    // Rubberbands........................................................

    function updateRubberbandRectangle(loc) {
        rubberbandRect.width = Math.abs(loc.x - mousedown.x);
        rubberbandRect.height = Math.abs(loc.y - mousedown.y);

        if (loc.x > mousedown.x) rubberbandRect.left = mousedown.x;
        else rubberbandRect.left = loc.x;

        if (loc.y > mousedown.y) rubberbandRect.top = mousedown.y;
        else rubberbandRect.top = loc.y;
    }

    function drawBezierCurve() {
        context.beginPath();
        context.moveTo(endPoints[0].x, endPoints[0].y);
        context.bezierCurveTo(controlPoints[0].x, controlPoints[0].y,
            controlPoints[1].x, controlPoints[1].y,
            endPoints[1].x, endPoints[1].y);
        context.stroke();
    }

    function updateEndAndControlPoints() {
        endPoints[0].x = rubberbandRect.left;
        endPoints[0].y = rubberbandRect.top;

        endPoints[1].x = rubberbandRect.left + rubberbandRect.width;
        endPoints[1].y = rubberbandRect.top + rubberbandRect.height

        controlPoints[0].x = rubberbandRect.left;
        controlPoints[0].y = rubberbandRect.top + rubberbandRect.height

        controlPoints[1].x = rubberbandRect.left + rubberbandRect.width;
        controlPoints[1].y = rubberbandRect.top;
    }

    function drawRubberbandShape(loc) {
        updateEndAndControlPoints();
        drawBezierCurve();
    }

    function updateRubberband(loc) {
        updateRubberbandRectangle(loc);
        drawRubberbandShape(loc);
    }
    // End points and control points......................................

    function drawControlPoint(index) {
        context.beginPath();
        context.arc(controlPoints[index].x, controlPoints[index].y,
            CONTROL_POINT_RADIUS, 0, Math.PI * 2, false);
        context.stroke();
        context.fill();
    }

    function drawControlPoints() {
        context.save();
        context.strokeStyle = CONTROL_POINT_STROKE_STYLE;
        context.fillStyle = CONTROL_POINT_FILL_STYLE;

        drawControlPoint(0);
        drawControlPoint(1);

        context.stroke();
        context.fill();
        context.restore();
    }

    function drawEndPoint(index) {
        context.beginPath();
        context.arc(endPoints[index].x, endPoints[index].y,
            CONTROL_POINT_RADIUS, 0, Math.PI * 2, false);
        context.stroke();
        context.fill();
    }

    function drawEndPoints() {
        context.save();
        context.strokeStyle = END_POINT_STROKE_STYLE;
        context.fillStyle = END_POINT_FILL_STYLE;

        drawEndPoint(0);
        drawEndPoint(1);

        context.stroke();
        context.fill();
        context.restore();
    }

    function drawControlAndEndPoints() {
        drawControlPoints();
        drawEndPoints();
    }

    function cursorInEndPoint(loc) {
        var pt;

        endPoints.forEach(function(point) {
            context.beginPath();
            context.arc(point.x, point.y,
                CONTROL_POINT_RADIUS, 0, Math.PI * 2, false);

            if (context.isPointInPath(loc.x, loc.y)) {
                pt = point;
            }
        });

        return pt;
    }

    function cursorInControlPoint(loc) {
        var pt;

        controlPoints.forEach(function(point) {
            context.beginPath();
            context.arc(point.x, point.y,
                CONTROL_POINT_RADIUS, 0, Math.PI * 2, false);

            if (context.isPointInPath(loc.x, loc.y)) {
                pt = point;
            }
        });

        return pt;
    }

    function updateDraggingPoint(loc) {
        draggingPoint.x = loc.x;
        draggingPoint.y = loc.y;
    }

    // Canvas event handlers..............................................

    canvas.onmousedown = function(e) {
        var loc = windowToCanvas(e.clientX, e.clientY);

        e.preventDefault(); // prevent cursor change

        if (!editing) {
            saveDrawingSurface();
            mousedown.x = loc.x;
            mousedown.y = loc.y;
            updateRubberbandRectangle(loc);
            dragging = true;
        } else {
            draggingPoint = cursorInControlPoint(loc);

            if (!draggingPoint) {
                draggingPoint = cursorInEndPoint(loc);
            }
        }
    };

    canvas.onmousemove = function(e) {
        var loc = windowToCanvas(e.clientX, e.clientY);

        if (dragging || draggingPoint) {
            e.preventDefault(); // prevent selections
            restoreDrawingSurface();

            if (guidewires) {
                drawGuidewires(loc.x, loc.y);
            }
        }

        if (dragging) {
            updateRubberband(loc);
            drawControlAndEndPoints();
        } else if (draggingPoint) {
            updateDraggingPoint(loc);
            drawControlAndEndPoints();
            drawBezierCurve();
        }
    };

    canvas.onmouseup = function(e) {
        loc = windowToCanvas(e.clientX, e.clientY);

        restoreDrawingSurface();

        if (!editing) {
            updateRubberband(loc);
            drawControlAndEndPoints();
            dragging = false;
            editing = true;
            if (showInstructions) {
                instructions.style.display = 'inline';
            }
        } else {
            if (draggingPoint) drawControlAndEndPoints();
            else editing = false;

            drawBezierCurve();
            draggingPoint = undefined;
        }
    };

    // Control event handlers.............................................


    strokeStyleSelect.onchange = function(e) {
        context.strokeStyle = strokeStyleSelect.value;
    };



    // Instructions event handlers........................................

    instructionsOkayButton.onclick = function(e) {
        instructions.style.display = 'none';
    };

    instructionsNoMoreButton.onclick = function(e) {
        instructions.style.display = 'none';
        showInstructions = false;
    };

    // Initialization.....................................................

    context.strokeStyle = strokeStyleSelect.value;
}

function drawzb() {
    var canvas = document.getElementById('canvas'),
        readout = document.getElementById('readout'),
        context = canvas.getContext("2d"),
        spritesheet = new Image();
    /*functions*/
    /*windowToCanvas在canvas对象上调用getBoundingClientRect获取元素的边界框，该边界框的坐标是相对于整个窗口的*/
    function windowToCanvas(canvas, x, y) {
        var bbox = canvas.getBoundingClientRect(); /*元素距离页面上下左右的距离*/
        /*  bbox.top：元素上边到视窗上边的距离;
	right：元素右边到视窗左边的距离;
	bottom：元素下边到视窗上边的距离;
	left：元素左边到视窗左边的距离;
	width：是元素自身的1宽
	height是元素自身的高*/
        return {
            x: x - bbox.left * (canvas.width / bbox.width),
            y: y - bbox.top * (canvas.height / bbox.height)
                /*，其中的x,y属性分别对应于鼠标在canvas之中的坐标*/
        };
    }

    function drawBackground() {
        var VERTICAL_LINE_SPACING = 12,
            i = context.canvas.height;
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.strokeStyle = 'lightgray';
        context.lineWidth = 0.5;
        while (i > VERTICAL_LINE_SPACING * 4) {
            context.beginPath();
            context.moveTo(0, i);
            context.lineTo(context.canvas.width, i);
            context.stroke();
            i -= VERTICAL_LINE_SPACING;
        }
    }
    //输出坐标
    function updateReadout(x, y) {
        readout.innerText = '(' + x.toFixed(0) + "," + y.toFixed(0) + ')';
    }

    function drawHorizontalLine(y) {
        context.beginPath();
        context.moveTo(0, y + 0.5);
        context.lineTo(context.canvas.width, y + 0.5);
        context.stroke();

    }

    function drawVerticalLine(x) {
        context.beginPath();
        context.moveTo(x + 0.5, 0);
        context.lineTo(x + 0.5, context.canvas.height);
        context.stroke();

    }
    /*Event handlers*/
    /*方法一：*/
    canvas.onmousedown = function(e) {
        var loc = windowToCanvas(canvas, e.x, e.y);

        e.x, e.y
        updateReadout(loc.x, loc.y);
        /*react to the mouse down event*/
    };
}
//画多边形
function drawduo() {
    var canvas = document.getElementById('canvas'),
        context = canvas.getContext('2d'),

        strokeStyleSelect = document.getElementById('strokeStyleSelect'),
        startAngleSelect = document.getElementById('startAngleSelect'),

        fillStyleSelect = document.getElementById('fillStyleSelect'),
        fillCheckbox = document.getElementById('fillCheckbox'),
        guidewireCheckbox = document.getElementById('guidewireCheckbox'),
        sidesSelect = document.getElementById('sidesSelect'),

        drawingSurfaceImageData,

        mousedown = {},
        rubberbandRect = {},
        dragging = false,

        sides = 8,
        startAngle = 0,

        guidewires = true,

        Point = function(x, y) {
            this.x = x;
            this.y = y;
        };


    // Functions.....................................................

    function drawGrid(color, stepx, stepy) {
        context.save()


        context.strokeStyle = color;
        context.fillStyle = '#ffffff';
        context.lineWidth = 0.5;
        context.fillRect(0, 0, context.canvas.width, context.canvas.height);

        for (var i = stepx + 0.5; i < context.canvas.width; i += stepx) {
            context.beginPath();
            context.moveTo(i, 0);
            context.lineTo(i, context.canvas.height);
            context.stroke();
        }

        for (var i = stepy + 0.5; i < context.canvas.height; i += stepy) {
            context.beginPath();
            context.moveTo(0, i);
            context.lineTo(context.canvas.width, i);
            context.stroke();
        }

        context.restore();
    }

    function windowToCanvas(e) {
        var x = e.x || e.clientX,
            y = e.y || e.clientY,
            bbox = canvas.getBoundingClientRect();

        return {
            x: x - bbox.left * (canvas.width / bbox.width),
            y: y - bbox.top * (canvas.height / bbox.height)
        };
    }

    // Save and restore drawing surface..............................

    function saveDrawingSurface() {
        drawingSurfaceImageData = context.getImageData(0, 0,
            canvas.width,
            canvas.height);
    }

    function restoreDrawingSurface() {
        context.putImageData(drawingSurfaceImageData, 0, 0);
    }

    // Rubberbands...................................................

    function updateRubberbandRectangle(loc) {
        rubberbandRect.width = Math.abs(loc.x - mousedown.x);
        rubberbandRect.height = Math.abs(loc.y - mousedown.y);

        if (loc.x > mousedown.x) rubberbandRect.left = mousedown.x;
        else rubberbandRect.left = loc.x;

        if (loc.y > mousedown.y) rubberbandRect.top = mousedown.y;
        else rubberbandRect.top = loc.y;
    }

    function getPolygonPoints(centerX, centerY, radius, sides, startAngle) {
        var points = [],
            angle = startAngle || 0;

        for (var i = 0; i < sides; ++i) {
            points.push(new Point(centerX + radius * Math.sin(angle),
                centerY - radius * Math.cos(angle)));
            angle += 2 * Math.PI / sides;
        }

        return points;
    }

    function createPolygonPath(centerX, centerY, radius, sides, startAngle) {
        var points = getPolygonPoints(centerX, centerY, radius, sides, startAngle);

        context.beginPath();

        context.moveTo(points[0].x, points[0].y);

        for (var i = 1; i < sides; ++i) {
            context.lineTo(points[i].x, points[i].y);
        }

        context.closePath();
    }

    function drawRubberbandShape(loc, sides, startAngle) {
        createPolygonPath(mousedown.x, mousedown.y,
            rubberbandRect.width,
            parseInt(sidesSelect.value),
            (Math.PI / 180) * parseInt(startAngleSelect.value));
        context.stroke();

        if (fillCheckbox.checked) {
            context.fill();
        }
    }

    function updateRubberband(loc, sides, startAngle) {
        updateRubberbandRectangle(loc);
        drawRubberbandShape(loc, sides, startAngle);
    }

    // Guidewires....................................................

    function drawHorizontalLine(y) {
        context.beginPath();
        context.moveTo(0, y + 0.5);
        context.lineTo(context.canvas.width, y + 0.5);
        context.stroke();
    }

    function drawVerticalLine(x) {
        context.beginPath();
        context.moveTo(x + 0.5, 0);
        context.lineTo(x + 0.5, context.canvas.height);
        context.stroke();
    }

    function drawGuidewires(x, y) {
        context.save();
        context.strokeStyle = 'rgba(0,0,230,0.4)';
        context.lineWidth = 0.5;
        drawVerticalLine(x);
        drawHorizontalLine(y);
        context.restore();
    }

    // Event handlers................................................

    canvas.onmousedown = function(e) {
        var loc = windowToCanvas(e);

        saveDrawingSurface();

        e.preventDefault(); // prevent cursor change

        saveDrawingSurface();
        mousedown.x = loc.x;
        mousedown.y = loc.y;
        dragging = true;
    };

    canvas.onmousemove = function(e) {
        var loc;

        if (dragging) {
            e.preventDefault(); // prevent selections

            loc = windowToCanvas(e);
            restoreDrawingSurface();
            updateRubberband(loc, sides, startAngle);

            if (guidewires) {
                drawGuidewires(mousedown.x, mousedown.y);
            }

        }
    };

    canvas.onmouseup = function(e) {
        var loc = windowToCanvas(e);
        dragging = false;
        restoreDrawingSurface();
        updateRubberband(loc);
    };


    strokeStyleSelect.onchange = function(e) {
        context.strokeStyle = strokeStyleSelect.value;
    };

    fillStyleSelect.onchange = function(e) {
        context.fillStyle = fillStyleSelect.value;
    };
    guidewireCheckbox.onchange = function(e) {
        guidewires = guidewireCheckbox.checked;
    };

    // Initialization................................................

    context.strokeStyle = strokeStyleSelect.value;
    context.fillStyle = fillStyleSelect.value;

}
//more functions
//rotating rectangle
function rotrec() {
    var angle = 10;
    setInterval(function() {
        //  cxt.clearRect(0, 0, canvas.width, canvas.height); 
        cxt.save();
        cxt.beginPath();
        cxt.translate(300, 250); //围绕矩形的中心点旋转
        cxt.rotate(angle * Math.PI / 180); //设置矩形旋转
        // 绘制矩形
        cxt.strokeStyle = 'red';
        cxt.strokeRect(-100, -50, 200, 100);
        //fillrect(矩形宽度的一半，矩形高度的一半，矩形长度，矩形宽度)
        cxt.restore();
        angle++;
    }, 100)
}
//绘制哆啦A梦
function doraemen() {
    var cxt = document.getElementById('canvas').getContext('2d');
    /* 头部*/
    cxt.beginPath(); //起始路径
    cxt.lineWidth = 1; //线宽度为1
    cxt.strokeStyle = '#000'; //笔触的颜色
    cxt.arc(200, 175, 175, 0.7 * Math.PI, 0.3 * Math.PI); //绘制弧，中心点（200，175），半径175
    cxt.fillStyle = '#0bb0da'; //设置填充时的颜色
    cxt.fill(); //填充颜色
    cxt.stroke(); //绘制路径

    /*脸部*/
    cxt.beginPath();
    cxt.fillStyle = '#fff';
    cxt.moveTo(110, 110); //将路径移到点（110，110），不创建线条
    cxt.quadraticCurveTo(-10, 200, 120, 315); //创建二次贝塞尔曲线,控制点(-10,200),结束点(120,315)
    cxt.lineTo(280, 315); //添加一个新点，然后在画布中创建从（110，110）到（280，315）的线条
    cxt.quadraticCurveTo(410, 210, 290, 110);
    cxt.lineTo(110, 110);
    cxt.fill();
    cxt.stroke();

    /*眼睛*/
    cxt.beginPath();
    cxt.lineWidth = 1;
    cxt.fillStyle = '#fff';
    cxt.moveTo(110, 110);
    cxt.bezierCurveTo(110, 25, 200, 25, 200, 100); //创建三次贝塞尔曲线,控制点1(110,25),控制点2(200,25),结束点(200,100)，也就是画左上半椭圆
    cxt.bezierCurveTo(200, 175, 110, 175, 110, 100); //画左下半椭圆
    cxt.moveTo(200, 100);
    cxt.bezierCurveTo(200, 25, 290, 25, 290, 100);
    cxt.bezierCurveTo(290, 175, 200, 175, 200, 100);
    cxt.fill();
    cxt.stroke();


    /*右眼球*/
    cxt.beginPath();
    cxt.fillStyle = '#000';
    cxt.arc(230, 130, 12, 0, 2 * Math.PI);
    cxt.fill();
    cxt.stroke();

    /*左眼球*/
    cxt.beginPath();
    cxt.fillStyle = '#000';
    cxt.arc(170, 130, 12, 0, 2 * Math.PI);
    cxt.fill();
    cxt.stroke();

    /* 鼻子*/
    cxt.beginPath();
    cxt.arc(200, 165, 25, 0, 2 * Math.PI);
    cxt.fillStyle = '#d05823';
    cxt.fill();
    cxt.stroke();

    /*胡须*/
    //左胡须
    cxt.beginPath();
    cxt.moveTo(80, 175);
    cxt.lineTo(150, 195);
    cxt.moveTo(80, 200);
    cxt.lineTo(150, 205);
    cxt.moveTo(80, 225);
    cxt.lineTo(150, 215);

    //中部胡须
    cxt.moveTo(200, 195);
    cxt.lineTo(200, 290);
    //右胡须
    cxt.moveTo(250, 195);
    cxt.lineTo(320, 175);
    cxt.moveTo(250, 205);
    cxt.lineTo(320, 200);
    cxt.moveTo(250, 215);
    cxt.lineTo(320, 225);
    cxt.stroke();

    /*嘴*/
    cxt.moveTo(80, 240);
    cxt.quadraticCurveTo(200, 350, 320, 240);
    cxt.stroke();


    /*围巾*/
    cxt.beginPath();
    cxt.moveTo(96, 316);
    cxt.lineTo(305, 316);
    cxt.lineTo(320, 316);
    cxt.arcTo(330, 316, 330, 326, 10); //在画布上创建介于两个切线之间的弧，起点坐标为(330,316),终点坐标为(330,326),半径为10
    cxt.lineTo(330, 336);
    cxt.arcTo(330, 346, 305, 346, 10);
    cxt.lineTo(81, 346);
    cxt.arcTo(71, 346, 71, 336, 10);
    cxt.lineTo(71, 326);
    cxt.arcTo(71, 316, 81, 316, 10);
    cxt.lineTo(96, 316);
    cxt.fillStyle = '#b13209';
    cxt.fill();
    cxt.stroke();

    /*下半身*/
    cxt.beginPath();
    cxt.fillStyle = '#0bb0da';
    cxt.moveTo(80, 346);
    //左衣服
    cxt.lineTo(26, 406);
    cxt.lineTo(65, 440);
    cxt.lineTo(85, 418);
    cxt.lineTo(85, 528);
    cxt.lineTo(185, 528);
    //右衣服
    cxt.lineTo(315, 528);
    cxt.lineTo(315, 418);
    cxt.lineTo(337, 440);
    cxt.lineTo(374, 406);
    cxt.lineTo(320, 346);
    cxt.fill();
    cxt.stroke();

    /*手*/
    //左手
    cxt.beginPath();
    cxt.fillStyle = '#fff';
    cxt.arc(37, 433, 30, 0, 2 * Math.PI);
    cxt.fill();
    cxt.stroke();
    //右手
    cxt.beginPath();
    cxt.fillStyle = '#fff';
    cxt.arc(363, 433, 30, 0, 2 * Math.PI);
    cxt.fill();
    cxt.stroke();

    /*肚*/
    cxt.beginPath();
    cxt.fillStyle = '#fff';
    cxt.arc(200, 400, 91, 1.8 * Math.PI, 1.2 * Math.PI);
    cxt.fill();
    cxt.stroke();
    //小口袋
    cxt.beginPath();
    cxt.fillStyle = '#fff';
    cxt.moveTo(130, 394);
    cxt.lineTo(270, 394);
    cxt.moveTo(130, 394);
    cxt.bezierCurveTo(130, 490, 270, 490, 270, 394);
    cxt.fill();
    cxt.stroke();

    /*两只脚的空隙*/
    cxt.beginPath();
    cxt.fillStyle = '#fff';
    cxt.arc(200, 529, 20, Math.PI, 0);
    cxt.fill();
    cxt.stroke();

    /*脚*/
    //左脚
    cxt.beginPath();
    cxt.fillStyle = '#fff';
    cxt.moveTo(180, 528);
    cxt.lineTo(72, 528);
    cxt.bezierCurveTo(52, 528, 52, 558, 72, 558);
    cxt.lineTo(180, 558);
    cxt.moveTo(180, 558);
    cxt.bezierCurveTo(200, 558, 200, 528, 180, 528);
    cxt.fill();
    cxt.stroke();

    //右脚
    cxt.beginPath();
    cxt.fillStyle = '#fff';
    cxt.moveTo(220, 528);
    cxt.lineTo(328, 528);
    cxt.bezierCurveTo(348, 528, 348, 558, 328, 558);
    cxt.lineTo(220, 558);
    cxt.moveTo(220, 558);
    cxt.bezierCurveTo(200, 558, 200, 528, 220, 528);
    cxt.fill();
    cxt.stroke();
}
//放射线
function fangse() {
    var c;
    var $;
    var w = 600;
    var h = 600;
    constant = 15;
    var rad = 300;
    var timeout = 0;

    c = document.getElementById("canvas");
    $ = c.getContext("2d");
    drawLines();

    function drawLines() {
        $.fillRect(0, 0, w, h);
        $.translate(w / 2, h / 2);
        for (var i = 0; i < 25; i++) {
            for (var n = -45; n <= 45; n += constant) {
                setTimeout("draw(" + n + ");", 100 * timeout);
                timeout++;
            }
        }
    }

    function draw(n) {
        $.beginPath();
        $.moveTo(0, rad);
        var radians = Math.PI / 180 * n;
        var x = (rad * Math.sin(radians)) / Math.sin(Math.PI / 2 - radians);
        $.lineTo(x, 0);

        if (Math.abs(n) == 45) {
            $.strokeStyle = rndColor();
            $.lineWidth = 2;
        } else if (n == 0) {
            $.strokeStyle = "rgb(200,200,200)";
            $.lineWidth = .5;
        } else {
            $.strokeStyle = "rgb(110,110,110)";
            $.lineWidth = .5;
        }
        $.stroke();
        $.rotate((Math.PI / 180) * 15);
    }

    function rndColor() {
        var r = 255 * Math.random() | 0,
            g = 255 * Math.random() | 0,
            b = 255 * Math.random() | 0;
        return 'rgb(' + r + ',' + g + ',' + b + ')';
    }
}