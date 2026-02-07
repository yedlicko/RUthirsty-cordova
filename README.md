# RUthirsty - 喝水打卡Cordova应用

一个简单实用的喝水打卡应用，使用Cordova框架开发，支持Android设备。

## 功能特点

- 🥤 一键打卡喝水
- 📊 显示今日打卡次数
- 📝 记录每次喝水的时间
- 🗑️ 支持删除单条记录或清除今日记录
- 💾 使用本地存储持久化数据
- 📱 适配移动端界面

## 开发和部署

### 前置要求

- Node.js 和 npm
- Cordova CLI
- Android Studio 和 SDK

### 安装依赖

```bash
# 安装Cordova（如果尚未安装）
npm install -g cordova

# 安装项目依赖
npm install
```

### 添加Android平台

```bash
cordova platform add android
```

### 在浏览器中测试

```bash
cordova serve
```

然后在浏览器中访问显示的地址进行测试。

### 构建APK文件

```bash
# Debug版本
cordova build android

# Release版本（需要配置签名）
cordova build android --release
```

### 在Android设备上运行

```bash
# 连接Android设备后
cordova run android
```

## 应用说明

- 数据按日期存储，每日数据独立
- 使用localStorage本地存储，无需服务器
- 点击"打卡"按钮记录喝水时间
- 记录列表显示今日所有打卡记录
- 可以删除单条记录或清除今日所有记录

## 目录结构

```
RUthirsty-cordova/
├── config.xml          # Cordova配置文件
├── package.json         # npm包配置
├── www/                 # Web资源目录
│   ├── index.html      # 主页面
│   ├── css/
│   │   └── style.css   # 样式文件
│   └── js/
│       └── app.js      # 应用逻辑
└── README.md           # 说明文档
```

## License

Apache 2.0
