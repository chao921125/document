const total = 100;
let current = 0;

const interval = setInterval(() => {
    current += 10;
    if (current > total) {
        clearInterval(interval);
        console.log('\nComplete!'); // 结束后换行
        return;
    }

    const percentage = Math.floor((current / total) * 100);
    process.stdout.write(`Progress: ${percentage}% \r`); // \r 将光标移到行首
}, 500);
