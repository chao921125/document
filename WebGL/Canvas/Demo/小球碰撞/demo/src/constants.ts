import { BallSetting } from '../../src/index';
import A from './images/a.png';
import B from './images/b.png';
import C from './images/c.png';
import D from './images/d.png';
import E from './images/e.png';
import F from './images/f.png';
import G from './images/g.png';
import H from './images/h.png';
import I from './images/i.png';
import J from './images/j.png';
import K from './images/k.png';
import L from './images/l.png';
import M from './images/m.png';

/**
 * 图片的尺寸是相对于 375 设计稿，单位 px。
 *  = imgSrc: 小球图片（BASE64、http 链接都支持）
 *  - r: 小球半径
 *  - x: 小球圆心 x 坐标
 *  - y: 小球圆心 y 坐标
 */
export const balls: BallSetting[] = [
  // 唯品会
  {
    imgSrc: M,
    r: 222 / 3 / 2,
    x: 22 + 40,
    y: 55,
  },
  // 爱奇艺
  {
    imgSrc: D,
    r: 222 / 3 / 2,
    x: 109 + 37,
    y: 55,
  },
  // 腾讯
  {
    imgSrc: C,
    r: 228 / 3 / 2,
    x: 193 + 38,
    y: 55,
  },
  // 京东
  {
    imgSrc: G,
    r: 222 / 3 / 2,
    x: 276 + 37,
    y: 55,
  },
  // 网易云
  {
    imgSrc: I,
    r: 222 / 3 / 2,
    x: 35 + 37,
    y: 138,
  },
  // 喜马拉雅
  {
    imgSrc: A,
    r: 240 / 3 / 2,
    x: 116 + 37,
    y: 138,
  },
  // 喜马儿童
  {
    imgSrc: B,
    r: 222 / 3 / 2,
    x: 200 + 37,
    y: 138,
  },
  // 西贝
  {
    imgSrc: J,
    r: 222 / 3 / 2,
    x: 10 + 37,
    y: 220,
  },
  // 必胜客
  {
    imgSrc: K,
    r: 222 / 3 / 2,
    x: 279 + 37,
    y: 138,
  },

  // 奇迹文学
  {
    imgSrc: H,
    r: 222 / 3 / 2,
    x: 89 + 37,
    y: 220,
  },
  // 肯德基
  {
    imgSrc: L,
    r: 198 / 3 / 2,
    x: 169 + 33,
    y: 220,
  },
  // 芒果tv
  {
    imgSrc: E,
    r: 180 / 3 / 2,
    x: 240 + 30,
    y: 220,
  },
  // 屈臣氏
  {
    imgSrc: F,
    r: 180 / 3 / 2,
    x: 305 + 30,
    y: 220,
  },
];
