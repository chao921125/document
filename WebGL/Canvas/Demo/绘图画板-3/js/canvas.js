;inirCanvas= function(doc){
    var canvasDraw = doc.getElementsByClassName('canvas')[0],
        wrap = doc.getElementsByClassName('wrap')[0],
        ctx = canvasDraw.getContext('2d'),
        cWidth = canvasDraw.width,
        cHight = canvasDraw.height,
        partWrap = doc.getElementsByClassName('partWrap')[0],
        picker = doc.getElementsByClassName('picker')[0],
        zoom = doc.getElementById('zoom'),
        zoomctx = zoom.getContext('2d'),
        sawtooch = doc.getElementById('sawtooch'),
        //读取进度
        readProgressBar =  doc.getElementsByClassName('readProgressBar')[0],
        pause = doc.getElementsByClassName('pause')[0],
        cancel = doc.getElementsByClassName('cancel')[0],
        //保存功能
        fileInput = doc.getElementById('fileInput'),
        savaButton = doc.getElementById('savaButton'),
        saveImg = doc.getElementById('save_img'),
        saveHref = doc.getElementById('saveHref'),
        mouseleft,
        mousetop,
        readProgressOk = 0,
        startByteFromPause = 0;
        clickTime= 1;
        color = 'black',


        width = '1';

    var init = function(){
        bindEvent();
    };

    var bindEvent = function(){
        canvasDraw.addEventListener('mousedown',function(){
            _startDraw();
           doc.addEventListener('mousemove',_Drawing,false);
           doc.addEventListener('mouseup',_moveDraw,false);
        },false);
        partWrap.addEventListener('click',_changeFunction,false);
        canvasDraw.addEventListener('mousemove',_pinkColor,false);
        sawtooch.addEventListener('change',smoothing,false);
        //flieInput.addEventListener('change',_fileInputChange,false);
        fileInput.addEventListener('change',readBlob,false);
        /*
        fileInput.addEventListener('change',function(){
            console.log('xiecaad');

        },false);*/
        savaButton.addEventListener('click',_savaCanvasToImg,false);
        pause.addEventListener('click',_pause,false);
    };

    var _pause =  function(e){
        var _self = this;
        if(2 == clickTime){
            clickTime = 1;
            _self.innerHTML = '暂停';
			reader.onprogress = _progressBar.bind(reader,reader);
            console.log('startByteFromPause' +startByteFromPause);
            if(readProgressOk == 0){
                readBlob(startByteFromPause);
            }
            
            
        }else{
            clickTime = 2;
            _self.innerHTML = '继续';
			
			reader.onprogress =  null;
           
        }
    };
    var _savaCanvasToImg = function(){
        var tempSrc = canvasDraw.toDataURL('image/png');/** 保存成image图片/png格式*/
            saveImg.src = tempSrc;
            saveHref.href = tempSrc; 
            saveImg.style.display = 'none';
    };

    //文件输入的处理函数，直接用reader.readAsDataURL读取this.files[0]
    _fileInputChange = function(){
        var reader = new FileReader(),
            img = new Image();
            reader.readAsDataURL(this.files[0]);
            //while(readFinishFlag)
        //文件开始上传时
        reader.onloadstart = function(e){
            console.log(e);
            console.log('start');
        }
        //文件正在上传时
        reader.onprogress = _progressBar;
          //文件上传完成时
        reader.onload = function(e){
            readProgressBar.style.width = '100%';
            readProgressBar.innerHTML =  '100%';
            img.src = reader.result;
            readProgressOk = 1;
            img.onload = function(){
                var imgWidth = img.width,
                imgHight = img.height;
                ctx.clearRect(0,0,cWidth,cHight);
                ctx.drawImage(img,0,0,imgWidth,imgHight,0,0,800,600);
                //doc.body.appendChild(img);
            }
          
        };
        //reader.readAsDataURL(this.files[0]);不能放在这，防止下载太快导致img还未全部读取完成
        console.log(this.files);
    };

    readBlob = function(startByte,endByte){
        var _self = this,
            files = fileInput.files;
            if(!files.length){
                alert('请输入文件');
                return;
            }
        var file = files[0],
            img = new Image(),
            starBytes = parseInt(startByte) || 0,
            
            endBytes =  parseInt(endByte) || file.size ,
            
            reader = new FileReader(),
            blob = file.slice(starBytes,endBytes);
            console.log('starBytes');
            console.log(starBytes);
            console.log(endBytes);
            console.log('file.size'+file.size);
            reader.onprogress = function(e){
                console.log(e);
                
            }
            reader.readAsBinaryString(blob);
        
         //文件开始上传时
         reader.onloadstart = function(e){
          
        }
        //文件正在上传时
        reader.onprogress = _progressBar.bind(reader,reader);
          //文件上传完成时
        reader.onload = function(e){
            readProgressBar.style.width = '100%';
            readProgressBar.innerHTML =  '100%';
            img.src = reader.result;
            img.onload = function(){
                var imgWidth = img.width,
                imgHight = img.height;
                ctx.clearRect(0,0,cWidth,cHight);
                ctx.drawImage(img,0,0,imgWidth,imgHight,0,0,800,600);
                //doc.body.appendChild(img);
            }
          
        };
            
    };

    

    _progressBar = function(reader,e){
        var progressBar = (e.loaded/e.total) *100;
       
        readProgressBar.style.width = progressBar + '%';
        readProgressBar.innerHTML = progressBar +'%';
        if(2 == clickTime)
        {
            startByteFromPause = e.loaded;
            reader.abort();//暂停
            return;
        }
        
       
       
    };

    smoothing = function(){
        zoomctx.imageSmoothingEnabled = this.checked;
        zoomctx.mozImageSmoothingEnabled = this.checked;
        zoomctx.webkitImageSmoothingEnabled = this.checked;
        zoomctx.msImageSmoothingEnabled = this.checked;
    };
    _pinkColor = function(e){
        var e = e || window.event,
            x = e.layerX,
            y = e.layerY,
            pixel = ctx.getImageData(x,y,1,1),
            data = pixel.data,
            rgba = 'rgba('
            +data[0]+','+data[1]+','+data[2]+','+data[3]+')';
            picker.innerHTML = rgba;
            picker.style.background = rgba; 
            _drawToZoom(x,y);
    };

    _drawToZoom = function(x,y){
        /**要画的横纵坐标，大小。然后是画的地址和大小 */
        zoomctx.drawImage(canvasDraw,x,y,10,10,0,0,300,150);

    };
    _startDraw = function(e){
        _getXY(e);
        ctx.beginPath(); 
        ctx.strokeStyle = color;
        ctx.lineWidth = width;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';   
        ctx.moveTo(mouseleft,mousetop);
       // ctx.moveTo(0,0);
    };

    _Drawing = function(e){
        _getXY(e);
        //ctx.lineTo(120,140);
        ctx.lineTo(mouseleft,mousetop);
      //ctx.lineTo(120,140);
       ctx.stroke();
        //ctx.stroke();
    }

    _getXY = function(e){
        var e = e || window.event;
           // mouseleft = e.pageX - canvasDraw.offsetLeft;
           // mousetop = e.pageY - canvasDraw.offsetTop;
            mouseleft = e.pageX  - wrap.offsetLeft;
            mousetop = e.pageY  - wrap.offsetTop -27;
    }
    _moveDraw = function(){
        doc.removeEventListener('mousemove',_Drawing,false);
        doc.removeEventListener('mouseup',_moveDraw,false);
    }

    _changeFunction = (e)=>{
        var e = e || window.event,
            tar = e.target || e.srcElement;
            dataConfig = tar.getAttribute('data-config');
            switch(dataConfig)
            {
                case 'red':
                    color =  '#ff0000';
                    break;
                case 'blue':
                    color = '#0000ff';
                    break;
                case 'green':
                    color = '#00ff00';
                    break;
                case 'font-4':
                    width = 4;
                    break;
                case 'font-8':
                    width = 8;
                    break;
                case 'font-16':
                    width = 16;
                    break;
                case 'reverse':
                    _reverse();
                    break;
                case 'grayscale':
                    _grayScale();
                    break;
                case 'blank':
                    color = '#000000';
                    width = 1;
                    ctx.clearRect(0,0,cWidth,cHight);
                    break;
            }
    }
    _reverse = (elem)=>{
       // var image = converCanvasToImage();
           // ctx.drawImage(image,0,0);
        var imageData = ctx.getImageData(0,0,cWidth,cHight),
            data = imageData.data;
          for(var i = 0; i < data.length;)
          {
              data[i] = 255 - data[i];
              data[i+1] = 255 - data[i+1];
              data[i+2] = 255 - data[i+2];
              i += 4;
          }
          ctx.putImageData(imageData,0,0);

    };
    _grayScale = ()=>{
        var imageData = ctx.getImageData(0,0,cWidth,cHight),
            data = imageData.data,
            dataAverage ;
            for(var i = 0; i < data.length;)
            {
                dataAverage = (data[i]+ data[i+1] + data[i+2])/3;
                data[i] = dataAverage;
                data[i+1] = dataAverage;
                data[i+2] = dataAverage;
                i+=4;
            }
            ctx.putImageData(imageData,0,0);
    }

    /** 将canvas变成png图片*/
    function converCanvasToImage(){
        var img = new Image();
        img.src = canvasDraw.toDataURL('img/png');
        return img;
    }

    init();

}(document);