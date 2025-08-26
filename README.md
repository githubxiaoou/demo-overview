# 前端项目概览

一个现代化的前端项目集合展示页面，用于展示你的所有GitHub demo项目。

## ✨ 特性

- 🎨 现代化设计，符合大众审美
- 📱 完全响应式，支持移动端
- 🔍 搜索和筛选功能
- ⭐ 精选项目展示
- 🎭 流畅的动画效果
- 🌈 渐变色彩设计
- ⚡ 基于Vite的快速开发体验

## 🚀 快速开始

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

### 启动Mock API服务器（用于测试）

```bash
npm run mock-server
```

这将启动一个模拟API服务器在 `http://localhost:3000`，提供测试数据。

### 构建生产版本

```bash
npm run build
```

### 预览生产版本

```bash
npm run preview
```

## 📝 自定义项目

### API 数据源

项目数据现在从API接口获取，默认地址为：`http://localhost:3000/api/project/projects`

#### 环境配置

项目支持不同环境的API配置：

1. **开发环境**：默认使用 `http://localhost:3000`
2. **生产环境**：通过环境变量 `VITE_API_BASE_URL` 配置

你可以在 `src/config/environment.ts` 文件中修改配置：

```typescript
export const ENV = {
  development: {
    API_BASE_URL: 'http://localhost:3000',
    API_PROJECTS_ENDPOINT: '/api/project/projects'
  },
  production: {
    API_BASE_URL: 'https://your-api-domain.com',
    API_PROJECTS_ENDPOINT: '/api/project/projects'
  }
};
```

#### 环境变量

创建 `.env` 文件来配置环境变量：

```bash
# API配置
VITE_API_BASE_URL=http://localhost:3000

# 站点配置
VITE_SITE_TITLE=前端项目概览
VITE_SITE_DESCRIPTION=我的前端项目集合
```

### API 响应格式

API应该返回以下格式的数据：

```typescript
// 直接返回数组
[
  {
    id: 'your-project-id',
    title: '项目标题',
    description: '项目描述',
    url: 'https://your-username.github.io/your-project',
    githubUrl: 'https://github.com/your-username/your-project',
    tags: ['React', 'TypeScript', 'Tailwind CSS'],
    featured: true, // 设为精选项目
    stars: 128, // GitHub星数
    views: 2048 // 访问量
  }
]

// 或者包装格式
{
  data: [...],
  success: true,
  message: 'success'
}
```

### 项目数据结构

```typescript
interface Project {
  id: string;
  title: string;
  description: string;
  url: string;
  githubUrl?: string;
  tags: string[];
  featured?: boolean;
  stars?: number;
  views?: number;
}
```

## 🎨 技术栈

- **React 18** - 用户界面库
- **TypeScript** - 类型安全
- **Vite** - 构建工具
- **Framer Motion** - 动画库
- **Lucide React** - 图标库

## 📱 响应式设计

- 桌面端：完整功能展示
- 平板端：适配中等屏幕
- 移动端：优化触摸体验

## 🌟 设计亮点

- 毛玻璃效果（backdrop-filter）
- 渐变色彩搭配
- 悬停动画效果
- 流畅的页面过渡
- 现代化的卡片设计

## 📄 许可证

MIT License
