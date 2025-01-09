const total = 100;
let current = 0;

const interval = setInterval(() => {
    current += 10;
    if (current > total) {
        clearInterval(interval);
        console.log('\nComplete!');
        return;
    }

    const percentage = Math.floor((current / total) * 100);
    const barLength = Math.floor((current / total) * 20); // 进度条长度
    const progressBar = '[' + '='.repeat(barLength) + ' '.repeat(20 - barLength) + ']';

    process.stdout.write(`Progress: ${progressBar} ${percentage}%\r`);
}, 500);
