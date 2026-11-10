/**
 * Collision 初始化配置【docEl、designWidth 是自动处理页面尺寸适配的关键参数】
 */
export interface CollisionConfig {
  /** 画板 HTMLElement */
  canvas: HTMLCanvasElement | any;
  /** 指定的小球集合，允许单独指定配置 */
  balls: BallSetting[];
  /** 最小位移速度，单位：px，默认：-2 */
  speedMin?: number;
  /** 最大位移速度，单位：px，默认：2 */
  speedMax?: number;
  /** canvas 画布背景颜色，默认：'transparent' 透明（合法的颜色值或 'random'） */
  bgColor?: string;
  /** 页面节点（或可以视作页面实际承载容器的节点），默认：document.documentElement */
  docEl?: HTMLElement | any;
  /** 设计稿的宽度，默认：375（balls 中配置的小球尺寸，应当与此处的设计稿宽度匹配） */
  designWidth?: number;
  /** PC端是否动缩放，默认：true，即在移动端和 PC 端都会自动缩放，如果 PC 端不需要缩放可以配置为 false 关闭 */
  scaleInPC?: boolean;
  /** 浏览器 resize 或移动端 orientationchange 事件触发时，是否重置画布，默认：true */
  resetOnResize?: boolean;
  /** 浏览器 resize 或移动端 orientationchange 事件触发时，仅宽度有变化时，才会 reset，默认：true */
  resetOnlyWidth?: boolean;
}

/**
 * 小球初始配置
 */
export interface BallSetting {
  /** 圆心 x 坐标 */
  x: number;
  /** 圆心 y 坐标 */
  y: number;
  /** 小球半径 */
  r: number;
  /** 小球对应图片（Image） */
  img?: HTMLImageElement;
  /** 小球对应图片的 src（BASE64或 http 链接） */
  imgSrc?: string;
  /** 小球背景色（合法的颜色值或 'random'） */
  bgColor?: string;
  /** 水平位移速度 */
  velX?: number;
  /** 垂直位移速度 */
  velY?: number;
  /** 最小位移速度 */
  speedMin?: number;
  /** 最大位移速度 */
  speedMax?: number;
}

/**
 * 小球
 */
export interface BallConfig {
  /** canvas 绘图 context */
  ctx: CanvasRenderingContext2D;
  /** 圆心 x 坐标 */
  x: number;
  /** 圆心 y 坐标 */
  y: number;
  /** 小球半径 */
  r: number;
  /** 水平位移速度 */
  velX: number;
  /** 垂直位移速度 */
  velY: number;
  /** 最小位移速度 */
  speedMin: number;
  /** 最大位移速度 */
  speedMax: number;
  /** 小球对应图片（Image） */
  img?: HTMLImageElement;
  /** 小球对应图片的 src（BASE64或 http 链接） */
  imgSrc?: string;
  /** 小球背景色（合法的颜色值或 'random'） */
  bgColor?: string;
}
