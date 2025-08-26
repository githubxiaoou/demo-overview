// 项目配置文件
export interface Project {
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

// 重新导出环境配置
export { API_CONFIG } from "./config/environment";

// 页面配置
export const siteConfig = {
  title: "前端项目概览",
  subtitle: "探索我的前端项目集合，发现有趣的技术实现",
  description: "我的前端项目集合，展示各种有趣的前端demo",
  author: "Your Name",
  github: "https://github.com/your-username",
};
