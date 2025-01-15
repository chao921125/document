let startTime;

function checkDebugger() {
    startTime = new Date().getTime();
    debugger; // 设置断点
    const endTime = new Date().getTime();
    const elapsedTime = endTime - startTime;

    // 设置一个阈值，例如 100 毫秒，如果执行时间小于这个值，则认为用户跳过了 debugger
    if (elapsedTime < 100) {
        hidePage();
    }
}

function hidePage() {
    // 隐藏整个网页
    document.body.style.display = 'none';
    // 或者显示一个提示信息
    // document.body.innerHTML = '<h1>请不要调试本页面！</h1>';

    // 可选：添加其他反调试措施，例如循环 debugger
    // setInterval(() => { debugger; }, 50);

    // 也可以重定向页面
    // window.location.href = "https://www.example.com";
}

const isDevToolsOpen = () => {
    // 检测窗口大小异常
    const threshold = 160;
    const widthDiff = window.outerWidth - window.innerWidth;
    const heightDiff = window.outerHeight - window.innerHeight;

    if (widthDiff > threshold || heightDiff > threshold) return true;

    // 检测 debugger 执行延迟
    const start = performance.now();
    debugger;
    const end = performance.now();

    if (end - start > 100) return true;

    return false;
};

// test
(function() {
    setInterval(() => {
        if (isDevToolsOpen()) {
            debugger;
            document.body.innerHTML = "<h1>请不要调试本页面！</h1>";
            console.log("检测到开发者模式已开启");

            // 周期性检查是否跳过 debugger
            setInterval(checkDebugger, 500); // 每 500 毫秒检查一次

            // 初始检查
            checkDebugger();
        }
    }, 500);
})();