function ProgressBar(total, description = 'Progress') {
    this.total = total;
    this.current = 0;
    this.description = description;
}

ProgressBar.prototype.update = function(current) {
    this.current = current;
    const percent = Math.floor((this.current / this.total) * 100);
    const progressBar = '='.repeat(percent) + ' '.repeat(100 - percent);
    process.stdout.clearLine(); // 清除当前行
    process.stdout.cursorTo(0); // 将光标移动到行首
    process.stdout.write(`${this.description}: [${progressBar}] ${percent}% (${this.current}/${this.total})`);
    if (this.current === this.total) {
        process.stdout.write('\n'); // 任务完成时换行
    }
};

async function run() {
    // 使用示例
    const progressBar = new ProgressBar(100, 'Downloading');
    for (let i = 0; i <= 100; i++) {
        progressBar.update(i);
        // 模拟耗时操作
        // const start = Date.now();
        // while (Date.now() - start < 50) {}
        const delay = ms => new Promise(res => setTimeout(res, ms));
        await delay(50)
    }
}
run();