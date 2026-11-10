var WINDOW_WIDTH = 1024;
var WINDOW_HEIGHT = 768;
var RADIUS = 8;  //小圆的半径
var MARGIN_TOP = 60; //每一个数字举例画布上边缘的距离
var MARGIN_LEFT = 30; //第一个数字距离画布左边缘的距离

//倒计时结束时间(当前时间往后退1个小时)
var endTime = new Date();
endTime.setTime(endTime.getTime() + 3600 * 1000);

var curShowTimeSeconds = 0;

var balls = [];
const colors = ['#33b5e5', '#0099cc', '#aa66cc', '#9933cc', '#99cc00', '#669900', '#ffbb33', '#ff8800', '#ff4444', '#cc0000'];

window.onload = function () {
    WINDOW_WIDTH = document.body.clientWidth;
    WINDOW_HEIGHT = document.body.clientHeight;

    //假设我们想左右两边间隙合占屏幕的1/5,文字部分占4/5。
    //左右间距合占0.2,则一边占0.1
    MARGIN_LEFT = Math.round(WINDOW_WIDTH * 0.1);

    //WINDOW_WIDTH * 0.8为文字的宽度，108=(93 + 15), 93是最后一个文字的x坐标对(RADIUS+1)的倍数，
    // 而文字自身有15个(RADIUS+1)，加在一起就是108个，用文字总宽度/108即(RADIUS+1)的值，减去1就得到RADIUS
    RADIUS = Math.round(WINDOW_WIDTH * 0.8 / 108) - 1;

    MARGIN_TOP = WINDOW_HEIGHT / 5;  //上边距可以指定为一个常量，比如屏幕高度的1/5

    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");

    canvas.width = WINDOW_WIDTH;
    canvas.height = WINDOW_HEIGHT;

    curShowTimeSeconds = getCurrentShowTimeSeconds();

    setInterval(function () {
        render(context);
        update();
    }, 50)
}

//倒计时效果
// function getCurrentShowTimeSeconds() {
//     var curTime = new Date();
//     var ret = endTime.getTime() - curTime.getTime();
//     ret = Math.round(ret / 1000);
//     return ret >= 0 ? ret : 0;
// }

//时钟效果
function getCurrentShowTimeSeconds() {
    var curTime = new Date();
    var ret = curTime.getHours() * 3600 + curTime.getMinutes() * 60 + curTime.getSeconds();
    return ret;
}

function update() {
    var nextShowTimeSeconds = getCurrentShowTimeSeconds();

    var nextHours = parseInt(nextShowTimeSeconds / 3600);
    var nextMinutes = parseInt((nextShowTimeSeconds - nextHours * 3600) / 60);
    var nextSeconds = nextShowTimeSeconds % 60;

    var curHours = parseInt(curShowTimeSeconds / 3600);
    var curMinutes = parseInt((curShowTimeSeconds - curHours * 3600) / 60);
    var curSeconds = curShowTimeSeconds % 60;

    if (nextSeconds !== curSeconds) {
        //产生小球
        //小时的十位
        if (parseInt(curHours / 10) !== parseInt(nextHours / 10)) {
            //(MARGIN_LEFT + 0, MARGIN_TOP)表示小时十位数字的坐标位置,对应的小球要加在这个位置。
            addBalls(MARGIN_LEFT, MARGIN_TOP, parseInt(curHours / 10));
        }
        //小时的个位
        if (parseInt(curHours % 10) !== parseInt(nextHours % 10)) {
            addBalls(MARGIN_LEFT + 15 * (RADIUS + 1), MARGIN_TOP, parseInt(curHours % 10));
        }
        //分钟的十位
        if (parseInt(curMinutes / 10) !== parseInt(nextMinutes / 10)) {
            addBalls(MARGIN_LEFT + 39 * (RADIUS + 1), MARGIN_TOP, parseInt(curMinutes / 10));
        }
        //分钟的个位
        if (parseInt(curMinutes % 10) !== parseInt(nextMinutes % 10)) {
            addBalls(MARGIN_LEFT + 54 * (RADIUS + 1), MARGIN_TOP, parseInt(curMinutes % 10));
        }
        //秒钟的十位
        if (parseInt(curSeconds / 10) !== parseInt(nextSeconds / 10)) {
            addBalls(MARGIN_LEFT + 78 * (RADIUS + 1), MARGIN_TOP, parseInt(curSeconds / 10));
        }
        //秒钟的个位
        if (parseInt(curSeconds % 10) !== parseInt(nextSeconds % 10)) {
            addBalls(MARGIN_LEFT + 93 * (RADIUS + 1), MARGIN_TOP, parseInt(curSeconds % 10));
        }
        curShowTimeSeconds = nextShowTimeSeconds;
    }

    updateBalls();
}

function updateBalls() {
    for (var i = 0; i < balls.length; i++) {
        var ball = balls[i];
        ball.x += ball.vx;
        ball.y += ball.vy;
        ball.vy += ball.g;

        //小球到地面的碰撞检测
        if (ball.y >= WINDOW_HEIGHT - RADIUS) {
            ball.y = WINDOW_HEIGHT - RADIUS;
            ball.vy = -ball.vy * 0.75; //阻力系数
        }
    }

    //当小球滚出画面时应删掉，否则balls数组会越来越大，时间长了会内存溢出
    balls = balls.filter(function (ball) {
        return ball.x > -RADIUS && ball.x < WINDOW_WIDTH + RADIUS; //表示还在画布内的小球
    });
    //还可以指定一个经验值，避免小球数量太大渲染不过来
    if (balls.length >= 500) {
        balls = balls.slice(0, 500);
    }
}

function addBalls(x, y, num) {
    for (var i = 0; i < digit[num].length; i++) {
        for (var j = 0; j < digit[num][i].length; j++) {
            if (digit[num][i][j] === 1) {
                var aBall = {
                    x: x + j * 2 * (RADIUS + 1) + (RADIUS + 1),
                    y: y + i * 2 * (RADIUS + 1) + (RADIUS + 1),
                    g: 1.5 + Math.random(),  //小球的加速度在1.5~2.5之间
                    vx: Math.pow(-1, Math.ceil(Math.random() * 1000)) * 4,  // Math.pow(-1, Math.ceil(Math.random() * 1000))表示-1的多少次方，结果为1或-1，故vx为4或-4
                    vy: -5, //vy为负值可以让小球有一个稍微向上抛的动作
                    color: colors[Math.floor(Math.random() * colors.length)]
                };
                balls.push(aBall);
            }
        }
    }
}


function render(ctx) {
    var hours = parseInt(curShowTimeSeconds / 3600);
    var minutes = parseInt((curShowTimeSeconds - hours * 3600) / 60);
    var seconds = curShowTimeSeconds % 60;

    ctx.clearRect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT); //必须清除，否则本次绘制和上一次会叠加到一起

    //绘制小时
    renderDigit(MARGIN_LEFT, MARGIN_TOP, parseInt(hours / 10), ctx);
    // 15 * (RADIUS + 1)的意思是 14 * (RADIUS + 1) + (RADIUS + 1)，14是因为digit数组是7个元素表示数字的一行，相当于14个(小圆半径+边距)。
    // 之所以变成15，是因为数字与数字之间需要给个适当的间距，后面都是默认每个数字占据15*(RADIUS+1)的宽度。
    renderDigit(MARGIN_LEFT + 15 * (RADIUS + 1), MARGIN_TOP, parseInt(hours % 10), ctx);
    //绘制冒号
    renderDigit(MARGIN_LEFT + 30 * (RADIUS + 1), MARGIN_TOP, 10, ctx);  //10这个位置的索引在digit.js中表示冒号

    //绘制分钟
    //这里从39开始是因为冒号是4*10位的二维数组，所以冒号的宽度应该是 8*(RADIUS + 1), 然后冒号右侧要有间隙，则为 9*(RADIUS + 1)，故总共是 39*(RADIUS + 1)
    renderDigit(MARGIN_LEFT + 39 * (RADIUS + 1), MARGIN_TOP, parseInt(minutes / 10), ctx);
    renderDigit(MARGIN_LEFT + 54 * (RADIUS + 1), MARGIN_TOP, parseInt(minutes % 10), ctx);
    renderDigit(MARGIN_LEFT + 69 * (RADIUS + 1), MARGIN_TOP, 10, ctx); //第二个冒号

    //绘制秒钟
    renderDigit(MARGIN_LEFT + 78 * (RADIUS + 1), MARGIN_TOP, parseInt(seconds / 10), ctx);
    renderDigit(MARGIN_LEFT + 93 * (RADIUS + 1), MARGIN_TOP, parseInt(seconds % 10), ctx);

    //绘制小球动画
    for (var i = 0; i < balls.length; i++) {
        var ball = balls[i];
        ctx.fillStyle = ball.color;

        ctx.beginPath();
        ctx.arc(ball.x, ball.y, RADIUS, 0, 2 * Math.PI, true); //实际上就是在绘制一个实心圆
        ctx.closePath();

        ctx.fill();
    }
    console.log("balls length: " + balls.length);
}

function renderDigit(x, y, num, ctx) {
    ctx.fillStyle = "rgb(0, 102, 153)";

    for (var i = 0; i < digit[num].length; i++) {
        for (var j = 0; j < digit[num][i].length; j++) {
            if (digit[num][i][j] === 1) {
                ctx.beginPath();

                ctx.arc(x + j * 2 * (RADIUS + 1) + (RADIUS + 1), y + i * 2 * (RADIUS + 1) + (RADIUS + 1), RADIUS, 0, 2 * Math.PI);
                ctx.closePath();

                ctx.fill();
            }
        }
    }
}
