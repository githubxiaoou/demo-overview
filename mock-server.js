const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

// 启用CORS
app.use(cors());
app.use(express.json());

// Mock项目数据
const mockProjects = [
  {
    id: "todo-app",
    title: "Todo 应用",
    description: "一个现代化的待办事项管理应用，支持拖拽排序、分类管理等功能",
    url: "https://your-username.github.io/todo-app",
    githubUrl: "https://github.com/your-username/todo-app",
    tags: ["React", "TypeScript", "Tailwind CSS"],
    featured: true,
    stars: 128,
    views: 2048,
  },
  {
    id: "weather-dashboard",
    title: "天气仪表板",
    description: "实时天气信息展示，支持多城市切换和未来天气预报",
    url: "https://your-username.github.io/weather-dashboard",
    githubUrl: "https://github.com/your-username/weather-dashboard",
    tags: ["Vue.js", "Chart.js", "API"],
    stars: 89,
    views: 1567,
  },
  {
    id: "music-player",
    title: "音乐播放器",
    description: "在线音乐播放器，支持播放列表管理和音频可视化",
    url: "https://your-username.github.io/music-player",
    githubUrl: "https://github.com/your-username/music-player",
    tags: ["JavaScript", "Web Audio API", "CSS3"],
    featured: true,
    stars: 256,
    views: 3421,
  },
  {
    id: "chat-app",
    title: "实时聊天应用",
    description: "基于WebSocket的实时聊天应用，支持群聊和私聊功能",
    url: "https://your-username.github.io/chat-app",
    githubUrl: "https://github.com/your-username/chat-app",
    tags: ["React", "Socket.io", "Node.js"],
    stars: 167,
    views: 2890,
  },
  {
    id: "e-commerce",
    title: "电商网站",
    description: "完整的电商网站前端，包含商品展示、购物车、支付流程",
    url: "https://your-username.github.io/e-commerce",
    githubUrl: "https://github.com/your-username/e-commerce",
    tags: ["Next.js", "Stripe", "MongoDB"],
    featured: true,
    stars: 312,
    views: 4567,
  },
  {
    id: "portfolio",
    title: "个人作品集",
    description: "响应式个人作品集网站，展示项目和技术栈",
    url: "https://your-username.github.io/portfolio",
    githubUrl: "https://github.com/your-username/portfolio",
    tags: ["HTML5", "CSS3", "JavaScript"],
    stars: 78,
    views: 1234,
  },
];

// 获取所有项目
app.get("/api/project/projects", (req, res) => {
  // 模拟网络延迟
  setTimeout(() => {
    res.json(mockProjects);
  }, 500);
});

// 根据ID获取单个项目
app.get("/api/project/projects/:id", (req, res) => {
  const { id } = req.params;
  const project = mockProjects.find((p) => p.id === id);

  setTimeout(() => {
    if (project) {
      res.json(project);
    } else {
      res.status(404).json({ message: "Project not found" });
    }
  }, 300);
});

// 健康检查
app.get("/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Mock API server running on http://localhost:${PORT}`);
  console.log(
    `Projects endpoint: http://localhost:${PORT}/api/project/projects`
  );
});
