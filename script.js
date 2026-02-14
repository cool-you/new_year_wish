// 新年祝福语数组
const greetings =['成绩硬控', '解题丝滑', '考神附体', '卷王开机', '大脑升级', '蒙题全对', '错题碎渣', '知识爆改', '拿捏竞赛', '纯爱学习', '泼天富贵', '降维打击', '爷青回场', '泰酷辣翻', '遥遥领先'];

// 获取DOM元素
const greetingBtn = document.getElementById('greeting-btn');
const greetingWindows = document.getElementById('greeting-windows');

// 配置参数
const config = {
    windowCount: 150, // 窗口数量
    maxWindowCount: 200, // 最大窗口数量
    autoCloseTime: 20000, // 自动关闭时间（毫秒）
    windowDuration: 20000 // 窗口持续时间（毫秒）
};

// 生成随机数
function getRandom(min, max) {
    return Math.random() * (max - min) + min;
}

// 生成随机整数
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// 生成基于网格的随机位置
function getRandomPosition() {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    
    // 计算网格数量，减小网格尺寸使窗口分布更密集
    const gridSize = 80;
    const gridCols = Math.ceil(windowWidth / gridSize);
    const gridRows = Math.ceil(windowHeight / gridSize);
    
    // 随机选择一个网格
    const col = getRandomInt(0, gridCols - 1);
    const row = getRandomInt(0, gridRows - 1);
    
    // 在选定的网格内生成随机位置，确保覆盖整个页面
    const x = Math.max(10, Math.min(col * gridSize + getRandom(0, gridSize - 40), windowWidth - 200));
    const y = Math.max(10, Math.min(row * gridSize + getRandom(0, gridSize - 40), windowHeight - 150));
    
    return { x, y };
}

// 生成随机祝福语
function getRandomGreeting() {
    const index = getRandomInt(0, greetings.length - 1);
    return greetings[index];
}

// 生成随机颜色
function getRandomColor() {
    const colors = ['#ff4d4f', '#ff7a45', '#ffa940', '#ffec3d', '#73d13d', '#40a9ff', '#597ef7', '#9254de'];
    return colors[getRandomInt(0, colors.length - 1)];
}

// 创建祝福窗口
function createGreetingWindow() {
    // 检查窗口数量限制
    if (greetingWindows.children.length >= config.maxWindowCount) {
        return;
    }

    // 创建窗口元素
    const window = document.createElement('div');
    window.className = 'greeting-window';

    // 设置随机位置
    const position = getRandomPosition();
    window.style.left = `${position.x}px`;
    window.style.top = `${position.y}px`;

    // 设置随机祝福语
    const greeting = getRandomGreeting();
    window.innerHTML = `
        <div class="window-header">
            <div class="window-controls">
                <button class="control-btn close"></button>
                <button class="control-btn minimize"></button>
                <button class="control-btn maximize"></button>
            </div>
        </div>
        <div class="window-content">
            <p>${greeting}</p>
        </div>
    `;

    // 设置随机颜色
    const color = getRandomColor();
    window.style.borderTop = `3px solid ${color}`;

    // 设置随机动画延迟
    window.style.animationDelay = `${getRandom(0, 0.5)}s`;

    // 添加控制按钮点击事件
    const closeBtn = window.querySelector('.control-btn.close');
    closeBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        const windowElement = this.closest('.greeting-window');
        windowElement.style.animation = 'fadeOut 0.3s ease-out forwards';
        setTimeout(() => {
            windowElement.remove();
        }, 300);
    });

    // 添加窗口点击事件
    window.addEventListener('click', function() {
        this.style.animation = 'fadeOut 0.3s ease-out forwards';
        setTimeout(() => {
            this.remove();
        }, 300);
    });

    // 添加到容器
    greetingWindows.appendChild(window);

    // 设置自动关闭
    setTimeout(() => {
        if (window.parentNode) {
            window.style.animation = 'fadeOut 0.3s ease-out forwards';
            setTimeout(() => {
                if (window.parentNode) {
                    window.remove();
                }
            }, 300);
        }
    }, config.windowDuration);
}

// 生成多个祝福窗口
function generateGreetingWindows() {
    // 清空现有窗口
    greetingWindows.innerHTML = '';

    // 批量创建窗口
    for (let i = 0; i < config.windowCount; i++) {
        setTimeout(createGreetingWindow, i * 80);
    }

    // 设置全部窗口自动清理
    setTimeout(() => {
        const windows = greetingWindows.children;
        for (let i = windows.length - 1; i >= 0; i--) {
            const window = windows[i];
            window.style.animation = 'fadeOut 0.3s ease-out forwards';
            setTimeout(() => {
                if (window.parentNode) {
                    window.remove();
                }
            }, 300);
        }
    }, config.autoCloseTime);
}

// 添加按钮点击事件
function addButtonEvent() {
    greetingBtn.addEventListener('click', function() {
        // 按钮动画效果
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 150);

        // 生成祝福窗口
        generateGreetingWindows();
    });
}

// 添加CSS动画（淡入淡出）
function addCssAnimations() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeOut {
            from {
                opacity: 1;
                transform: scale(1);
            }
            to {
                opacity: 0;
                transform: scale(0.5);
            }
        }
    `;
    document.head.appendChild(style);
}

// 响应式调整
function handleResponsive() {
    const windowWidth = window.innerWidth;
    
    // 根据屏幕宽度调整窗口数量
    if (windowWidth < 768) {
        config.windowCount = 100;
        config.maxWindowCount = 200;
    } else {
        config.windowCount = 200;
        config.maxWindowCount = 400;
    }
}

// 开场文字内容
const introTexts = [
    "没人告诉你陌生链接不要随便点吗？？",
    "来都来了，那就祝你...",
    "万事如意！",
    "心想事成！",
    "身体健康！"
];

// 幽默对白内容
const dialogs = [
    {
        text: "准备好接收新年祝福了吗？",
        yes: "当然啦！",
        no: "等等..."
    },
    {
        text: "确定要接收这份充满诚意的新年祝福吗？",
        yes: "必须的！",
        no: "让我想想..."
    },
    {
        text: "最后确认一下，你真的准备好了吗？",
        yes: "我已经迫不及待了！",
        no: "别废话，快上！"
    },
    {
        text: "好吧，既然你这么期待，那就...",
        yes: "快说！",
        no: "我等不及了！"
    },
    {
        text: "祝你新年快乐！",
        yes: "谢谢！",
        no: "谢谢！"
    }
];

// 索引
let introIndex = 0;
let dialogIndex = 0;

// 获取相关元素
const introContainer = document.getElementById('intro-container');
const introText = document.getElementById('intro-text');
const dialogContainer = document.getElementById('dialog-container');
const dialogContent = document.getElementById('dialog-content');
const dialogBtnYes = document.getElementById('dialog-btn-yes');
const dialogBtnNo = document.getElementById('dialog-btn-no');
const mainContainer = document.getElementById('main-container');

// 显示下一个开场文字
function showNextIntro() {
    if (introIndex < introTexts.length) {
        // 添加淡出效果
        introText.style.opacity = '0';
        introText.style.transform = 'scale(0.8)';
        
        setTimeout(() => {
            // 更新文字内容
            introText.textContent = introTexts[introIndex];
            // 添加淡入效果
            introText.style.opacity = '1';
            introText.style.transform = 'scale(1)';
            introIndex++;
            
            // 1.5秒后显示下一句
            setTimeout(showNextIntro, 1500);
        }, 500);
    } else {
        // 开场文字结束，添加淡出效果
        introContainer.style.opacity = '0';
        introContainer.style.transform = 'scale(0.8)';
        
        setTimeout(() => {
            // 隐藏开场界面，显示对白界面
            introContainer.style.display = 'none';
            dialogContainer.style.display = 'flex';
            // 添加淡入效果
            dialogContainer.style.opacity = '0';
            dialogContainer.style.transform = 'scale(0.8)';
            setTimeout(() => {
                dialogContainer.style.opacity = '1';
                dialogContainer.style.transform = 'scale(1)';
                showNextDialog();
            }, 100);
        }, 500);
    }
}

// 显示下一个对白
function showNextDialog() {
    if (dialogIndex < dialogs.length) {
        // 添加淡出效果
        dialogContent.style.opacity = '0';
        dialogContent.style.transform = 'translateY(20px)';
        dialogBtnYes.style.opacity = '0';
        dialogBtnYes.style.transform = 'translateY(20px)';
        dialogBtnNo.style.opacity = '0';
        dialogBtnNo.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            // 更新对白内容
            const dialog = dialogs[dialogIndex];
            dialogContent.innerHTML = `<p>${dialog.text}</p>`;
            dialogBtnYes.textContent = dialog.yes;
            dialogBtnNo.textContent = dialog.no;
            dialogIndex++;
            
            // 添加淡入效果
            dialogContent.style.opacity = '1';
            dialogContent.style.transform = 'translateY(0)';
            dialogBtnYes.style.opacity = '1';
            dialogBtnYes.style.transform = 'translateY(0)';
            dialogBtnNo.style.opacity = '1';
            dialogBtnNo.style.transform = 'translateY(0)';
        }, 300);
    } else {
        // 对白结束，添加淡出效果
        dialogContainer.style.opacity = '0';
        dialogContainer.style.transform = 'scale(0.8)';
        
        setTimeout(() => {
            // 隐藏对白界面，显示主界面
            dialogContainer.style.display = 'none';
            mainContainer.style.display = 'block';
            // 添加淡入效果
            mainContainer.style.opacity = '0';
            mainContainer.style.transform = 'scale(0.8)';
            setTimeout(() => {
                mainContainer.style.opacity = '1';
                mainContainer.style.transform = 'scale(1)';
            }, 100);
        }, 500);
    }
}

// 添加对白按钮事件
function addDialogEvents() {
    dialogBtnYes.addEventListener('click', showNextDialog);
    dialogBtnNo.addEventListener('click', showNextDialog);
}

// 初始化
function init() {
    addCssAnimations();
    addButtonEvent();
    addDialogEvents();
    handleResponsive();
    
    // 开始显示开场文字
    showNextIntro();
    
    // 监听窗口大小变化
    window.addEventListener('resize', handleResponsive);
}

// 启动应用
init();

