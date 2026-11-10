const path = require('path');
const fs = require('fs');

const { polyfill } = require('spritejs/lib/platform/node-canvas');
const { Scene, Sprite, ENV } = require('spritejs/lib');
polyfill({ ENV });
const { Converter } = require("ffmpeg-stream");
const Utils = require('./Utils');

// const ffmpegInstaller = require('@ffmpeg-installer/ffmpeg');
// const ffmpeg = require('fluent-ffmpeg');

// ffmpeg.setFfmpegPath(ffmpegInstaller.path);



/*
	电影播放
 */
class Move extends Utils{
    options = {
        data: {},
        width: 640,
        height: 360
    };

    constructor(options) {
    	super(options);
        Object.assign(this.options, options);
        this.width = this.options.width;
        this.height = this.options.height;
        this.currentAddress = null;

        this.scene = null; // 场景
        this.layer = null; // canvas 上下文
        this.robot = null; // 机器人
        this.map = this.options.data.map || [];

    }
    // 播放动画
    async play() {
        this.scene = new Scene({
            width: this.width,
            height: this.height,
            // contextType: '2d',
        });
        this.layer = this.scene.layer('fglayer');

        this.drawBg();
        await this.drawRobot();

        for (let i = 0; i < this.map.length; i++) {
            this.currentAddress = this.map[i];
            console.log(this.currentAddress.name);
            await this.robotMove();
            // await this.sceniCareaPlay();
        }

    }

    /**
     * 绘制背景
     */
    drawBg() {
        const { bgImage } = this.options.data;
        this.bg = new Sprite(path.join(__dirname, bgImage));
        this.bg.attr({
            width: this.width,
            height: this.height
        });

        this.layer.append(this.bg);
    }

    // 景区照片播放动画
    async sceniCareaPlay() {
        const { imgs } = this.currentAddress;
        if (!imgs || !imgs.length) return;
        await this.showMask();
        const data = imgs.map(item => Object.assign({...item}, {src: path.join(__dirname, item.src)}))
        await this.scene.preload(...data);
        for (let i = 0; i < imgs.length; i++) {
            await this.drawScenicAreaImg(imgs[i].id, imgs[i].enter, imgs[i].leave);
        }
        await this.hiddenMask();
    }
    // 遮罩显示
    async showMask() {
        const { width, height } = this.layer.canvas;
        this.mask = new Sprite({
            anchor: [0, 0],
            size: [width, height],
            bgcolor: 'black',
            zIndex: 3,
            opacity: 0
        });
        this.layer.append(this.mask);
        await this.maskAnimate();
    }
    // 遮罩动画
    async maskAnimate() {
        await this.mask.transition(0.6).attr({
            opacity: 0.7
        });
    }

    // 隐藏遮罩
    async hiddenMask() {
        await this.mask.transition(0.6).attr({
            opacity: 0
        });
        this.mask.remove();
    }

    async drawScenicAreaImg(id, enter = ['left', 'top'], leave = ['right', 'bottom']) {
        const xFn = this.directionToCoordinates.bind(this, this.layer.canvas);
        const img = new Sprite(id);
        const { width, height } = this.layer.canvas;
        const [imgWidth, imgHeight] = img.contentSize;
        const size = [this.width / 2, imgHeight / (imgWidth / (this.width / 2))]; // 统一宽度
        img.attr({
            anchor: [0.5, 0.5],
            zIndex: 4,
            pos: xFn(...enter),
            size
        });
        this.layer.append(img);

        // 入场动画
        await img.transition(1.0).attr({
            pos: [width / 2, height / 2]
        });
        // 演出动画
        await img.transition(2.0).attr({
            pos: [width / 2, height / 2]
        });
        // 离场动画
        await img.transition(1.0).attr({
            pos: xFn(...leave)
        });
        // 移除元素
        img.remove();
    }

    /**
     * 绘制机器人
     * @param {number} x 绘制机器人所在的 x坐标 默认 50
     * @param {number} y 绘制机器人所在的 y 坐标 默认 50
     * @return {Promise<void>}
     */
    async drawRobot(x = 50, y = 50) {
        const { robot } = this.options.data;
        await this.scene.preload({
            id: 'robot',
            src: path.join(__dirname, robot)
        });
        this.robot = new Sprite('robot');
        const [width, height] = this.robot.contentSize
        this.robot.attr({
            anchor: [0.5, 1], // 元素运动参考点
            pos: [50, 50], // 元素参考点在舞台中的位置
            size: [width / 10, height / 10], // 元素大小
            zIndex: 2,
        });
        this.robotAnimate(50, 50);

        this.layer.append(this.robot);
    }

    /**
     * 机器人添加初始动画
     * @param {number} x 机器人运行目标地址的 x 坐标
     * @param {number} y 机器人运行到目标地址的 y 坐标
     * @param {number} time 机器人本次运动时间 默认 600 ms
     */
    robotAnimate(x, y, time = 600) {
        this.robot.animate([
            { pos: [x, y - 10] },
            { pos: [x, y + 10] },
        ], {
            duration: time,
            iterations: Infinity,
            direction: 'alternate',
        });
    }

    /**
     * 机器人移动
     * @return {Promise<void>}
     */
    async robotMove() {
        await new Promise((resolve) => {
            this.timer = setTimeout(async () => {
                const [x, y] = this.currentAddress.original;
                await this.robot.transition(1.0).attr({
                    pos: [x, y]
                });
                console.log('robot', x, y)
                this.robotAnimate(x, y);
                resolve();
            }, 1000);
        })
    }

    /**
     * 创建快照
     * @return {buffer} file
     */
    createSnapshot() {
        const canvas = this.scene.snapshot();
        return canvas.toBuffer('image/jpeg', { quality: 1.0, progressive: false, chromaSubsampling: true });
    }

    /**
     * -f 输入文件格式为 image2pipe
     * -r 设置帧率 20
     * -i 输入文件地址 pipe:3
     * -vcodec 设置输出编码器 libx264
     * -pix_fmt 设置输出流像素格式
     * out.mp4 输出文件名
     * ffmpeg -f image2pipe -r 20 -i pipe:3 -vcodec libx264 -pix_fmt yuv420p out.mp4
     * @return {[type]} [description]
     */
    async recording() {
        const converter = new Converter();
        const converterInput = converter.createInputStream({ f: "image2pipe", r: 20, discard: 'none' });
        converter.createOutputToFile("out.mp4", {
            vcodec: "libx264",
            // r: 30,
            crf: 20,
            pix_fmt: "yuv420p",
            // 'codec': 'copy',
            // 'b:v': '6400k',
            strict: 'experimental'
        });

        const convertingFinished = converter.run();

        let i = 0;
        let timer = null;
        const keyframes = () => {
            console.log(i, '------', this.robot.worldPosition);
            const canvas = this.scene.snapshot();
            const stream = canvas.createJPEGStream({ quality: 1, progressive: false, chromaSubsampling: true });
            // stream.on('end', () => {
            //     i++;
            //     if (i >= 300) {
            //         clearTimeout(timer);
            //         converterInput.end();
            //     } else {
            //         timer = setTimeout(keyframes, 1000 / 25);
            //     }
            //     console.log('end');
            // });
            // stream.pipe(converterInput, { end: false }).on('error', (err) => {
            //     if (err) console.log(err);
            // });

			
   //  		const out = fs.createWriteStream(path.join(__dirname, `./test/move${i}.jpg`));
			// stream.pipe(out);


        }
        // keyframes();


        timer = setInterval(() => {
        	i++;
			if(i>=300) {
				clearInterval(timer);
			} else {
				keyframes();
			}
        }, 1000 / 25)

        await convertingFinished
        console.log('complete !!!!');
    }

}


module.exports = Move;