const ua = window.navigator.userAgent;

export const isIOS = /(ipad|iphone|ipod)/i.test(ua);
export const isAndroid = /android/i.test(ua);
export const isWinPhone = /windows phone/i.test(ua);
export const isMobile = isIOS || isAndroid || isWinPhone;

/**
 * 创建绘图
 *  - 移动端保持高清：https://www.html5rocks.com/en/tutorials/canvas/hidpi/
 */
export function setupCanvas(canvas: HTMLCanvasElement): CanvasRenderingContext2D {
  if (!canvas) {
    throw new Error('not valid canvas element');
  }

  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();

  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  ctx?.scale(dpr, dpr);

  return <CanvasRenderingContext2D>ctx;
}

export function random(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min) * 100) / 100 + min;
}

export function randomRgba(): string {
  return `rgb(${random(0, 255)}, ${random(0, 255)}, ${random(0, 255)})`;
}

export const resizeEvent = 'orientationchange' in window ? 'orientationchange' : 'resize';
