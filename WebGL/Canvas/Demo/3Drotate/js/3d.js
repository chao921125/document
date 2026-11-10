/**
*@author: hunkid
*@date: 2016-12-7
*
*/
var drawing = document.getElementById("drawing");
var ctx = drawing.getContext("2d");
var ball = { 
    rad: 100,
    starNum: 50,
    disToCanvas: 200,
    disToEye: 400
};
var cvs = {
    size: 0,
    circlePos: {
        x: 0,
        y: 0
    },
    setCvsSize: function() {
        var cs = ball.rad / ball.disToEye; //arcsin
        var theta = Math.asin(cs);
        cvs.size = 2 * Math.tan(theta) * (ball.disToCanvas + ball.disToEye);
        drawing.width = cvs.size;
        drawing.height = cvs.size;
        ctx.translate(drawing.width / 2, drawing.width / 2);
    }
};

function LittleStar() {
    this.bright = 1; //明亮程度 [0,1]
    this.size = 1; //大小程度 [0,1]
    this.pos3d = { //四个尖角和四个内角坐标
            posOutA1: {
                x: 0,
                y: 99,
                z: 14
            },
            posOutA2: {
                x: 14,
                y: 99,
                z: 0
            },
            posOutA3: {
                x: 0,
                y: 99,
                z: -14
            },
            posOutA4: {
                x: -14,
                y: 99,
                z: 0
            },
            posInA1: {
                x: 3,
                y: 99.9,
                z: 3
            },
            posInA2: {
                x: 3,
                y: 99.9,
                z: -3
            },
            posInA3: {
                x: -3,
                y: 99.9,
                z: -3
            },
            posInA4: {
                x: -3,
                y: 99.9,
                z: 3
            },
            posCenter: {
                x: 0,
                y: 0,
                z: 0
            }
        },
        this.pos2d = {};
}
LittleStar.prototype.setPos = function(pos1, pos2, pos3, pos4, pos5, pos6, pos7, pos8) {
    this.pos3d.posOutA1 = pos1;
    this.pos3d.posInA1 = pos2;
    this.pos3d.posOutA2 = pos3;
    this.pos3d.posInA2 = pos4;
    this.pos3d.posOutA3 = pos5;
    this.pos3d.posInA3 = pos6;
    this.pos3d.posOutA4 = pos7;
    this.pos3d.posInA4 = pos8;
};
LittleStar.prototype.transTo2d = function() {
    this.pos2d.posOutA1 = transUtil.trans3Dto2DAll(this.pos3d.posOutA1);
    this.pos2d.posOutA2 = transUtil.trans3Dto2DAll(this.pos3d.posOutA2);
    this.pos2d.posOutA3 = transUtil.trans3Dto2DAll(this.pos3d.posOutA3);
    this.pos2d.posOutA4 = transUtil.trans3Dto2DAll(this.pos3d.posOutA4);
    this.pos2d.posInA1 = transUtil.trans3Dto2DAll(this.pos3d.posInA1);
    this.pos2d.posInA2 = transUtil.trans3Dto2DAll(this.pos3d.posInA2);
    this.pos2d.posInA3 = transUtil.trans3Dto2DAll(this.pos3d.posInA3);
    this.pos2d.posInA4 = transUtil.trans3Dto2DAll(this.pos3d.posInA4);
};
LittleStar.prototype.horRotate = function(theta) {
    this.pos3d.posOutA1 = transUtil.horRotate3d(this.pos3d.posOutA1, theta);
    this.pos3d.posInA1 = transUtil.horRotate3d(this.pos3d.posInA1, theta);
    this.pos3d.posOutA2 = transUtil.horRotate3d(this.pos3d.posOutA2, theta);
    this.pos3d.posInA2 = transUtil.horRotate3d(this.pos3d.posInA2, theta);
    this.pos3d.posOutA3 = transUtil.horRotate3d(this.pos3d.posOutA3, theta);
    this.pos3d.posInA3 = transUtil.horRotate3d(this.pos3d.posInA3, theta);
    this.pos3d.posOutA4 = transUtil.horRotate3d(this.pos3d.posOutA4, theta);
    this.pos3d.posInA4 = transUtil.horRotate3d(this.pos3d.posInA4, theta);
    this.pos3d.posCenter = transUtil.horRotate3d(this.pos3d.posCenter, theta);
};
LittleStar.prototype.verRotate = function(theta) {
    this.pos3d.posOutA1 = transUtil.verRotate3d(this.pos3d.posOutA1, theta);
    this.pos3d.posInA1 = transUtil.verRotate3d(this.pos3d.posInA1, theta);
    this.pos3d.posOutA2 = transUtil.verRotate3d(this.pos3d.posOutA2, theta);
    this.pos3d.posInA2 = transUtil.verRotate3d(this.pos3d.posInA2, theta);
    this.pos3d.posOutA3 = transUtil.verRotate3d(this.pos3d.posOutA3, theta);
    this.pos3d.posInA3 = transUtil.verRotate3d(this.pos3d.posInA3, theta);
    this.pos3d.posOutA4 = transUtil.verRotate3d(this.pos3d.posOutA4, theta);
    this.pos3d.posInA4 = transUtil.verRotate3d(this.pos3d.posInA4, theta);
    this.pos3d.posCenter = transUtil.verRotate3d(this.pos3d.posCenter, theta);
};
LittleStar.prototype.draw = function() {
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.moveTo(this.pos2d.posOutA1.x, this.pos2d.posOutA1.y);
    ctx.lineTo(this.pos2d.posInA1.x, this.pos2d.posInA1.y);
    ctx.lineTo(this.pos2d.posOutA2.x, this.pos2d.posOutA2.y);
    ctx.lineTo(this.pos2d.posInA2.x, this.pos2d.posInA2.y);
    ctx.lineTo(this.pos2d.posOutA3.x, this.pos2d.posOutA3.y);
    ctx.lineTo(this.pos2d.posInA3.x, this.pos2d.posInA3.y);
    ctx.lineTo(this.pos2d.posOutA4.x, this.pos2d.posOutA4.y);
    ctx.lineTo(this.pos2d.posInA4.x, this.pos2d.posInA4.y);
    ctx.strokeStyle = '#fff';
    ctx.fillStyle = '#fff';
    ctx.stroke();
    ctx.fill();
    ctx.closePath();
};

var transUtil = {
    tans3DTo2DProj: function(pos3D) {
        var pos2D = {};
        var scale = (ball.disToEye - pos3D.y) / (ball.disToEye + ball.disToCanvas);
        pos2D.x = pos3D.x / scale;
        pos2D.y = pos3D.z / scale;
        return pos2D;
    },
    horRotate3d: function(pos3D, theta) {
        var nexPos = {};
        nexPos.z = pos3D.z;
        nexPos.x = pos3D.x * Math.cos(theta / 180 * Math.PI) - pos3D.y * Math.sin(theta / 180 * Math.PI);
        nexPos.y = pos3D.x * Math.sin(theta / 180 * Math.PI) + pos3D.y * Math.cos(theta / 180 * Math.PI);
        return nexPos;
    },
    verRotate3d: function(pos3D, theta) {
        var nexPos = {};
        nexPos.x = pos3D.x;
        nexPos.y = pos3D.y * Math.cos(theta / 180 * Math.PI) - pos3D.z * Math.sin(theta / 180 * Math.PI);
        nexPos.z = pos3D.y * Math.sin(theta / 180 * Math.PI) + pos3D.z * Math.cos(theta / 180 * Math.PI);
        return nexPos;
    },
    transToCanvasPos: function(pos2D) {
        var nexPos = {};
        nexPos.x = pos2D.x;
        nexPos.y = -pos2D.y;
        return nexPos;
    },
    trans3Dto2DAll: function(pos3D) {
        var res = transUtil.transToCanvasPos(transUtil.tans3DTo2DProj(pos3D));
        return res;
    }
};

function drawCircle() {
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.strokeStyle = '#000';
    ctx.fillStyle = '#000';
    ctx.arc(cvs.circlePos.x, cvs.circlePos.y, cvs.size / 2, 0, 2 * Math.PI, false);
    ctx.stroke();
    ctx.fill();
    ctx.closePath();
}

window.onload = function() {
    cvs.setCvsSize();
    
    var star = [];
    for (var i = 0; i < ball.starNum; i++) {
        star[i] = new LittleStar();
        star[i].verRotate(Math.random() * 360);
        star[i].horRotate(Math.random() * 360);
    }
    drawCircle();
    setInterval(function() {
        ctx.clearRect(-drawing.width / 2, -drawing.width / 2, drawing.width, drawing.height);
        drawCircle();
        for (i = 0; i < ball.starNum; i++) {
            star[i].horRotate(360 / 1000);
            star[i].transTo2d();
            star[i].draw();
        }
    }, 10);
};
