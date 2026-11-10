var WINDOW_WIDTH = 1024;
var WINDOW_HEIGHT = 600;
var RADIUS = 8;
var MARGIN_TOP = 60;
var MARGIN_LEFT = 30;

// const endTime = new Date(2016,5,24,20,33,22);  //不能超过99个小时
// var endTime = new Date();
// endTime.setTime(endTime.getTime() + 3600*1000);  //距离现在一小时
var curShowTimeSeconds = 0;

var balls = [];
const colors = ['#33b5e5','#0099cc','#aa66cc','#9933cc','#99cc00','#669900','#ffbb33','#ff8800','#ff4444','#cc0000'];

window.onload = function(){

	WINDOW_WIDTH = document.body.clientWidth;
	WINDOW_HEIGHT = document.body.clientHeight;

	// WINDOW_WIDTH = document.documentElement.clientWidth-20;
	// WINDOW_HEIGHT = document.documentElement.clientHeight-20;

	MARGIN_LEFT = Math.round(WINDOW_WIDTH/10);
	RADIUS = Math.round(WINDOW_WIDTH*4/5/108)-1;

	MARGIN_TOP = Math.round(WINDOW_HEIGHT/5);

	//获取canvas对象
	var canvas = document.getElementById('canvas');	
	//判断浏览器是否支持Canvas
	if(canvas.getContext('2d')){
		var context = canvas.getContext('2d');
		//使用context绘制
	}else{
		alert('当前浏览器不支持Canvas，请更换浏览器后再试');
	}

	canvas.width = WINDOW_WIDTH;
	canvas.height = WINDOW_HEIGHT;

	curShowTimeSeconds = getCurrentShowTimeSeconds();
	setInterval(function(){
		render(context);
		update();
	},50);
}

function getCurrentShowTimeSeconds(){
	var curTime = new Date();
	var ret = curTime.getHours()*3600 + curTime.getMinutes()*60 + curTime.getSeconds();

	return ret;
}

//负责数据的改变
function update(){

	var nextShowTimeSeconds = getCurrentShowTimeSeconds();

	var nextHours = parseInt(nextShowTimeSeconds/3600);
	var nextMinutes = parseInt((nextShowTimeSeconds-nextHours*3600)/60);
	var nextSeconds = nextShowTimeSeconds%60;

	var curHours = parseInt(curShowTimeSeconds/3600);
	var curMinutes = parseInt((curShowTimeSeconds-curHours*3600)/60);
	var curSeconds = curShowTimeSeconds%60;

	if(nextSeconds != curSeconds){
		if(parseInt(curHours/10) != parseInt(nextHours/10)){
			addBalls(MARGIN_LEFT + 0,MARGIN_TOP,parseInt(curHours/10));
		}
		if(parseInt(curHours%10) != parseInt(nextHours%10)){
			addBalls(MARGIN_LEFT + 15*(RADIUS+1),MARGIN_TOP,parseInt(curHours%10));
		}

		if(parseInt(curMinutes/10) != parseInt(nextMinutes/10)){
			addBalls(MARGIN_LEFT + 39*(RADIUS+1),MARGIN_TOP,parseInt(curMinutes/10));
		}
		if(parseInt(curMinutes%10) != parseInt(nextMinutes%10)){
			addBalls(MARGIN_LEFT + 54*(RADIUS+1),MARGIN_TOP,parseInt(curMinutes%10));
		}

		if(parseInt(curSeconds/10) != parseInt(nextSeconds/10)){
			addBalls(MARGIN_LEFT + 78*(RADIUS+1),MARGIN_TOP,parseInt(curSeconds/10));
		}
		if(parseInt(curSeconds%10) != parseInt(nextSeconds%10)){
			addBalls(MARGIN_LEFT + 93*(RADIUS+1),MARGIN_TOP,parseInt(nextSeconds%10));
		}

		curShowTimeSeconds = nextShowTimeSeconds;
	}

	updateBalls();
	console.log(balls.length);
}

function updateBalls(){
	for(var i=0;i<balls.length;i++){

		balls[i].x += balls[i].vx;
		balls[i].y += balls[i].vy;
		balls[i].vy += balls[i].g;

		if(balls[i].y >= WINDOW_HEIGHT-RADIUS){
			balls[i].y = WINDOW_HEIGHT-RADIUS;
			balls[i].vy = -balls[i].vy*0.75;
		}
	}

	//性能优化
	var count = 0;
	for(var i=0;i<balls.length;i++){
		if(balls[i].x+RADIUS>0 && balls[i].x - RADIUS < WINDOW_WIDTH){
			balls[count++] = balls[i];
		}
	}
	while(balls.length>Math.min(300,count)){
		balls.pop();
	}
}

function addBalls(x,y,num){
	for(var i=0;i<digit[num].length;i++){
		for(var j=0;j<digit[num][i].length;j++){
			if(digit[num][i][j]==1){
				var aBall = {
					x:x+j*2*(RADIUS+1)+(RADIUS+1),
					y:y+i*2*(RADIUS+1)+(RADIUS+1),
					g:1.5+Math.random(),
					vx:Math.pow(-1,Math.ceil(Math.random()*1000))*4,  //取-1或者1
					vy:-5,  //小球向上抛的效果
					color:colors[Math.floor(Math.random()*colors.length)]
				}

				balls.push(aBall);
			}
		}
	}
}

//负责绘制
function render(cxt){
	//对矩形空间内进行刷新操作
	cxt.clearRect(0,0,WINDOW_WIDTH,WINDOW_HEIGHT);

	var hours = parseInt(curShowTimeSeconds/3600);
	var minutes = parseInt((curShowTimeSeconds-hours*3600)/60);
	var seconds = curShowTimeSeconds%60;

	renderDigit(MARGIN_LEFT,MARGIN_TOP,parseInt(hours/10),cxt);
	renderDigit(MARGIN_LEFT + 15*(RADIUS+1),MARGIN_TOP,parseInt(hours%10),cxt);
	renderDigit(MARGIN_LEFT + 30*(RADIUS+1),MARGIN_TOP,10,cxt);
	renderDigit(MARGIN_LEFT + 39*(RADIUS+1),MARGIN_TOP,parseInt(minutes/10),cxt);
	renderDigit(MARGIN_LEFT + 54*(RADIUS+1),MARGIN_TOP,parseInt(minutes%10),cxt);
	renderDigit(MARGIN_LEFT + 69*(RADIUS+1),MARGIN_TOP,10,cxt);
	renderDigit(MARGIN_LEFT + 78*(RADIUS+1),MARGIN_TOP,parseInt(seconds/10),cxt);
	renderDigit(MARGIN_LEFT + 93*(RADIUS+1),MARGIN_TOP,parseInt(seconds%10),cxt);

	for(var i=0;i<balls.length;i++){
		cxt.fillStyle = balls[i].color;

		cxt.beginPath();
		cxt.arc(balls[i].x,balls[i].y,RADIUS,0,2*Math.PI,true);
		cxt.closePath();

		cxt.fill();
	}
}

function renderDigit(x,y,num,cxt){
	cxt.fillStyle = "rgb(0,102,153)";

	for(var i=0;i<digit[num].length;i++){
		for(var j=0;j<digit[num][i].length;j++){
			if(digit[num][i][j] == 1){
				cxt.beginPath();
				cxt.arc(x+j*2*(RADIUS+1)+(RADIUS+1),y+i*2*(RADIUS+1)+(RADIUS+1),RADIUS,0,2*Math.PI);
				cxt.closePath();

				cxt.fill();
			}
		}
	}
}