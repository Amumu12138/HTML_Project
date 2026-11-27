// 实现全屏代码雨效果
// 编译：tsc 20261126.ts --target es2020 --lib es2020,dom --strict
// 预览：直接双击 全屏代码雨.html（也可用本地静态服务器打开）

(() => {
    // 非浏览器环境（如 node 直接运行）不做任何事
    if (typeof document === 'undefined') return;

    const canvas = document.querySelector('#matrix') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d')!;

    const FONT_SIZE = 16; // 每个字符的宽度，也就是一列
    const CHARS = 'アイウエオカキクケコサシスセソタチツテトナニヌネノ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const HEAD_COLOR = '#d6ffd6'; // 雨滴头部亮色
    const TAIL_COLOR = '#00ff41'; // 雨滴尾部绿色

    let columns = 0; // 总列数
    let drops: number[] = []; // 每一列雨滴当前所在的行

    /** 按窗口尺寸重设画布，并重新计算列数 */
    function resize(): void {
        const dpr = window.devicePixelRatio || 1;
        const width = window.innerWidth;
        const height = window.innerHeight;

        canvas.width = Math.floor(width * dpr);
        canvas.height = Math.floor(height * dpr);
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
        // 按设备像素比缩放，保证高分屏不模糊
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

        columns = Math.ceil(width / FONT_SIZE);
        // 起始行用负的随机值，让各列雨滴错开时间落下
        drops = Array.from({ length: columns }, () => -Math.floor(Math.random() * 40));
    }

    /** 绘制一帧 */
    function draw(): void {
        const width = window.innerWidth;
        const height = window.innerHeight;

        // 半透明黑覆盖上一帧，形成拖尾残影
        ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
        ctx.fillRect(0, 0, width, height);

        ctx.font = `${FONT_SIZE}px monospace`;
        ctx.textBaseline = 'top';

        for (let i = 0; i < columns; i++) {
            const char = CHARS[Math.floor(Math.random() * CHARS.length)];
            const x = i * FONT_SIZE;
            const y = drops[i] * FONT_SIZE;

            // 偶尔用亮色，模拟雨滴头部的闪烁
            ctx.fillStyle = Math.random() > 0.9 ? HEAD_COLOR : TAIL_COLOR;
            ctx.fillText(char, x, y);

            // 落出屏幕底部后按概率回到顶部，形成随机间隔
            if (y > height && Math.random() > 0.975) {
                drops[i] = 0;
            } else {
                drops[i] += 1;
            }
        }

        requestAnimationFrame(draw);
    }

    window.addEventListener('resize', resize);
    resize();
    requestAnimationFrame(draw);
})();
