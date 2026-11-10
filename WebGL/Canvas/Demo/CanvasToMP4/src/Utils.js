class Utils {
    // 获取两点坐标距离
    lineDistance(x1, y1, x2, y2) {
        const r = Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2);
        return Math.sqrt(r);
    }

    // 获取两点角度
    getAngle(x1, y1, x2, y2) {
        const x = Math.abs(x1 - x2);
        const y = Math.abs(y1 - y2);
        return Math.atan2(y, x) * (180 / Math.PI);
    }

    // 方位转坐标
    directionToCoordinates(canvas, a, b) {
        const { width, height } = canvas;

        const coordinatesX = {
            left: -width / 2,
            center: -width / 2,
            right: 1.5 * width
        }
        const coordinatesY = {
            top: -height / 2,
            center: height / 2,
            bottom: 1.5 * height
        }
        return [coordinatesX[a], coordinatesY[b]]
    }
    // blob转换为buffer
    blobToArrayBuffer(blob) {
        if (!blob) blob = new Blob();
        const fileReader = new FileReader();
        fileReader.readAsArrayBuffer(blob);
        return new Promise((resolve, reject) => {
            fileReader.onload = () => {
                resolve(fileReader.result);
            };
        })
    }

    print(text) {
        console.log('log:', text)
    };
}

module.exports = Utils