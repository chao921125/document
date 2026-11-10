> 在线查看 http://jsrun.net/N5kKp/edit
> download 库 下载canvas.toDataURL  https://github.com/rndme/download

[大致思路](http://upload-images.jianshu.io/upload_images/768057-e23fd62ea7107067.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![大致思路.png](http://upload-images.jianshu.io/upload_images/768057-e23fd62ea7107067.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

[自己画](http://upload-images.jianshu.io/upload_images/768057-15931e50d81e7f05.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![自己写.png](http://upload-images.jianshu.io/upload_images/768057-15931e50d81e7f05.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

[随机](http://upload-images.jianshu.io/upload_images/768057-a1884f8f68fb0e96.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![随机.png](http://upload-images.jianshu.io/upload_images/768057-a1884f8f68fb0e96.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

传入 canvas对象 和 options参数（可不传） run( canvas , option ) 
参数
- bgColor 背景色  默认 `#e8e8e8` 
- clickedColor 填充色 默认 `#ff0000`
- boxSize 方块大小 默认 `30`
方法
- clean 清除所有方块
- Random（number） 随机生成多少个方块


- 增加鼠标点击移动绘画
##### 实例

`html`
```
<div class="main">
        <button class="clean">clean</button>
        <button class="random">random</button>
        <button class="down">down the image</button>
        <canvas width="1500" height="600"></canvas>
    </div>
```

`js库`
```
function run(canvas, obj) {

    obj = obj || {}
    this.canvas = canvas
    this.cvs = canvas.getContext("2d")
    this.bgColor = obj.bgColor || "#e8e8e8"
    this.clickedColor = obj.clickedColor || "#ff0000"
    this.boxSize = obj.boxSize || 30
    this.bgWidthLength = 0
    this.bgHeightLength = 0
    this.clickedArr = []
    this.start()
    this.click()
    return this
}
run.prototype.start = function(){

    this.bgWidthLength = parseInt( this.canvas.width / this.boxSize )
    this.bgHeightLength = parseInt( this.canvas.height / this.boxSize )
    this.drawBg()

}
run.prototype.click = function(){

    let move = this.mousemove.bind(this)

    this.canvas.addEventListener("mousedown",function(e){

        let o = this.computedXY(e.offsetX,e.offsetY)
        this.toggleClick(o)
    
        this.canvas.addEventListener("mousemove",move )

    }.bind(this))

    this.canvas.addEventListener("mouseup",function(e){
        this.canvas.removeEventListener("mousemove",move )
    }.bind(this))
}
run.prototype.mousemove = function(e){
    console.log(e.offsetX,e.offsetY)
    let o = this.computedXY(e.offsetX,e.offsetY)
    this.toggleClick(o,true)
}  
run.prototype.computedXY = function(x,y){

    for( let i=0;i<this.bgWidthLength;i++ ){
        if( x > i*this.boxSize && x < (i+1)*this.boxSize ){
            x = i
            break;
        }
    }
    for( let i=0;i<this.bgHeightLength;i++ ){
        if( y > i*this.boxSize && y < (i+1)*this.boxSize ){
            y = i
            break;
        }
    }

    return {x,y}
}
run.prototype.toggleClick = function(o,draw){
    let has = {}
        has.is = true

    this.clickedArr.forEach(function(item,index){

        if( item.x === o.x && item.y === o.y ){
            has.is = false
            has.index = index
        }
    })

    if(has.is){
        this.clickedArr.push(o)
        this.drawBgBox(o.x*this.boxSize,o.y*this.boxSize,true)
    }
    if(!has.is && !draw){
        this.clickedArr.splice(has.index,1)
        this.drawBgBox( o.x*this.boxSize,o.y*this.boxSize )
    }

}
run.prototype.Random = function(length){

    for(let i=0;i<length;i++ ){
        let o = {}
            o.x = parseInt( Math.random() * this.bgWidthLength )
            o.y = parseInt( Math.random() * this.bgHeightLength )
        this.toggleClick(o)
    }
}
run.prototype.clean = function(){

    this.clickedArr.forEach(function(o,index){
        this.drawBgBox( o.x*this.boxSize , o.y*this.boxSize )
    }.bind(this))

    this.clickedArr = []
}
run.prototype.drawBg = function(){

    for(let i=0;i<this.bgHeightLength;i++){
        for(let j=0;j<this.bgWidthLength;j++ ){
            this.drawBgBox(j*this.boxSize,i*this.boxSize)
        }
    }
}
run.prototype.drawBgBox = function(x,y,z) {

    this.cvs.beginPath()
    this.cvs.fillStyle = z ? this.clickedColor : this.bgColor;
    this.cvs.fillRect(x+1, y+1, this.boxSize-1,this.boxSize-1 );
    this.cvs.fill()
    this.cvs.stroke()
    this.cvs.closePath()
}
```
`使用`
```
let canvas = document.querySelector(".main canvas")
let cvs = canvas.getContext("2d")
let a = new run(canvas)

let clean = document.querySelector(".clean");
let random = document.querySelector(".random");
let down = document.querySelector(".down");

    clean.onclick = function(){
        a.clean()
    };

    random.onclick = function(){
        a.Random(100)
    };

    down.onclick = function(){
        download(canvas.toDataURL(),'test.png','image/png')
    }

```