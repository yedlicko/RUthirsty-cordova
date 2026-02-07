// 应用初始化
document.addEventListener('deviceready', function() {
    console.log('Cordova设备准备就绪');
    initApp();
}, false);

// 如果在浏览器中运行（非Cordova环境）
if (typeof cordova === 'undefined') {
    document.addEventListener('DOMContentLoaded', function() {
        console.log('浏览器模式运行');
        initApp();
    });
}

// 初始化应用
function initApp() {
    loadTodayData();
    updateUI();

    // 绑定事件
    document.getElementById('checkInBtn').addEventListener('click', handleCheckIn);
    document.getElementById('clearBtn').addEventListener('click', handleClearToday);
}

// 获取今日日期字符串
function getTodayString() {
    const now = new Date();
    return now.toISOString().split('T')[0];
}

// 从本地存储加载数据
function loadTodayData() {
    const todayStr = getTodayString();
    const savedData = localStorage.getItem('ruthirsty_data_' + todayStr);
    if (savedData) {
        return JSON.parse(savedData);
    }
    return { count: 0, records: [] };
}

// 保存数据到本地存储
function saveTodayData(data) {
    const todayStr = getTodayString();
    localStorage.setItem('ruthirsty_data_' + todayStr, JSON.stringify(data));
}

// 更新UI显示
function updateUI() {
    const data = loadTodayData();

    // 更新今日打卡次数
    document.getElementById('todayCount').textContent = data.count;

    // 更新记录列表
    const historyList = document.getElementById('historyList');

    if (data.records.length === 0) {
        historyList.innerHTML = '<p class="empty-message">暂无记录，快去喝水吧！</p>';
    } else {
        historyList.innerHTML = data.records.map((record, index) => `
            <div class="history-item">
                <span class="time">${record.time}</span>
                <span class="label">喝水打卡</span>
                <button class="delete-btn" onclick="deleteRecord(${index})">×</button>
            </div>
        `).join('');
    }
}

// 处理打卡
function handleCheckIn() {
    const data = loadTodayData();

    // 获取当前时间
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const timeStr = `${hours}:${minutes}`;

    // 添加新记录
    data.count++;
    data.records.unshift({
        time: timeStr,
        timestamp: now.getTime()
    });

    // 保存数据
    saveTodayData(data);

    // 更新UI
    updateUI();

    // 按钮动画反馈
    const btn = document.getElementById('checkInBtn');
    btn.style.transform = 'scale(0.95)';
    setTimeout(() => {
        btn.style.transform = '';
    }, 150);

    // 显示反馈（如果有Cordova插件，可以使用震动）
    if (navigator.vibrate) {
        navigator.vibrate(50);
    }
}

// 删除单条记录
function deleteRecord(index) {
    const data = loadTodayData();
    data.records.splice(index, 1);
    data.count = data.records.length;
    saveTodayData(data);
    updateUI();
}

// 清除今日记录
function handleClearToday() {
    if (confirm('确定要清除今日的所有喝水记录吗？')) {
        const data = { count: 0, records: [] };
        saveTodayData(data);
        updateUI();
    }
}
