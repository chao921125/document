/*
 * @Desc: Ball
 * @Author: Eleven
 * @Date: 2020-07-24 15:12:45
 * @Last Modified by: Eleven
 * @Last Modified time: 2021-04-21 10:09:17
 */

import type { BallConfig } from './typings';

class Ball {
  private img?: HTMLImageElement;
  private imgSrc?: string;
  private bgColor?: string;
  private x: number;
  private y: number;
  private r: number;
  private velX: number;
  private velY: number;
  private isLoading: boolean; // 控制图片加载，防止图片绑定过多 onload

  private readonly ctx: CanvasRenderingContext2D;
  private readonly speedMin: number;
  private readonly speedMax: number;

  /**
   * @param ctx canvas 绘图 context
   * @param img 小球对应图片（Image）
   * @param imgSrc 小球对应图片的 src（BASE64或 http 链接）
   * @param bgColor 小球背景色
   * @param x 圆心 x 坐标
   * @param y 圆心 y 坐标
   * @param r 小球半径
   * @param velX 水平位移速度
   * @param velY 垂直位移速度
   * @param speedMin 最小位移速度
   * @param speedMax 最大位移速度
   */
  constructor({ ctx, img, imgSrc, bgColor, x, y, r, velX, velY, speedMin, speedMax }: BallConfig) {
    this.ctx = ctx; // 画板
    this.img = img;
    this.imgSrc = imgSrc;
    this.bgColor = bgColor;
    this.x = x;
    this.y = y;
    this.r = r;
    this.velX = velX;
    this.velY = velY;
    this.speedMin = speedMin;
    this.speedMax = speedMax;
    this.isLoading = false;
  }

  /**
   * 绘制小球
   *  - 即使图片非圆形也可以
   */
  draw(): void {
    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);

    if (!!this.bgColor && typeof this.bgColor === 'string') {
      this.ctx.fillStyle = this.bgColor;
      this.ctx.fill();
    }

    this.ctx.clip();

    if (!this.img && !!this.imgSrc && typeof this.imgSrc === 'string') {
      const img = new Image();

      if (/^data:/.test(this.imgSrc)) {
        // 使用 base64 编码
        img.src = this.imgSrc;
        this.img = img;
      } else if (!this.isLoading) {
        this.isLoading = true;
        // 使用 http 链接加载
        img.onload = () => {
          this.img = img;
          this.isLoading = false;
        };
        img.src = this.imgSrc;
      }
    }

    if(this?.img instanceof Image) {
      this.ctx.drawImage(this.img, this.x - this.r, this.y - this.r, 2 * this.r, 2 * this.r);
    }

    this.ctx.restore();
  }

  /**
   * 检测撞击
   * @param balls 画布上所有小球
   */
  detect(balls: Ball[]): Ball[] {
    return balls.map(ball => {
      if (this !== ball) {
        // 判断与其它小球的碰撞距离（排除自身）
        const dxv = this.x + this.velX - (ball.x + ball.velX);
        const dyv = this.y + this.velY - (ball.y + ball.velY);
        const distance = Math.sqrt(dxv * dxv + dyv * dyv);

        if (distance <= this.r + ball.r) {
          // 距离小于两个小球的圆心距离，反弹
          const dvx = this.velX - ball.velX;
          const dvy = this.velY - ball.velY;
          const dx = this.x - ball.x;
          const dy = this.y - ball.y;
          const xx_yy = dx * dx + dy * dy;
          const v_dvx = (dvx * dx * dx + dvy * dx * dy) / xx_yy;
          const v_dvy = (dvy * dy * dy + dvx * dx * dy) / xx_yy;

          this.velX = this._checkSpeed(this.velX - v_dvx);
          this.velY = this._checkSpeed(this.velY - v_dvy);
          ball.velX = this._checkSpeed(ball.velX + v_dvx);
          ball.velY = this._checkSpeed(ball.velY + v_dvy);
        }
      }
      return ball;
    });
  }

  /**
   * 更新位移
   */
  update(): void {
    const canvas = this.ctx.canvas;
    const rect = canvas.getBoundingClientRect();

    if (this.x + this.r >= rect.width) {
      this.velX = -this.velX;
    }
    if (this.x - this.r <= 0) {
      this.velX = -this.velX;
    }

    if (this.y + this.r >= rect.height) {
      this.velY = -this.velY;
    }
    if (this.y - this.r <= 0) {
      this.velY = -this.velY;
    }

    this.x += this.velX;
    this.y += this.velY;
  }

  /**
   * 控制运动速度
   * @param speed 位移速度
   */
  private _checkSpeed(speed: number): number {
    if (speed > this.speedMax) {
      speed = this.speedMax;
    } else if (speed < this.speedMin) {
      speed = this.speedMin;
    }
    return speed;
  }
}

export default Ball;
