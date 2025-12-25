// 初始化 pdf.js
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://unpkg.com/pdfjs-dist@3.9.179/build/pdf.worker.min.js';

async function getPdfImages(url) {
    const pdf = await pdfjsLib.getDocument(url).promise;

    const numPages = pdf.numPages;
    let images = [];

    for (let i = 1; i <= numPages; i++) {
        const page = await pdf.getPage(i);
        const ops = await page.getOperatorList();

        for (let j = 0; j < ops.fnArray.length; j++) {
            if (ops.fnArray[j] === pdfjsLib.OPS.paintImageXObject) {
                const imgIndex = ops.argsArray[j][0];
                const img = await page.objs.get(imgIndex);
                // 此时 img 是一个包含图像数据的 HTMLImageElement
                images.push(img);
            }
        }
    }

    return images;
}

getPdfImages('path/to/your/pdf/file.pdf')
    .then(images => {
        images.forEach((img, index) => {
            // 你现在可以对 img 进行进一步的处理，比如添加到 DOM 等
            document.body.appendChild(img);
        });
    });
