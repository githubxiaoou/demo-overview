// 环境配置 — 统一使用 Vite 的 import.meta.env.VITE_API_BASE_URL
// 删除原来的 ENV 结构，直接从环境变量构建配置对象

const MODE = import.meta.env.MODE || "development";

// 端点常量
export const API_PROJECTS_ENDPOINT = "/api/project/projects";

// API_BASE_URL：在开发时默认指向本地，生产时优先使用 VITE_API_BASE_URL
const DEFAULT_DEV_BASE = "http://localhost:3000";
const DEFAULT_PROD_BASE = "https://json-server-render.vercel.app";

export const API_BASE_URL =
  MODE === "development"
    ? (import.meta.env.VITE_API_BASE_URL as string) || DEFAULT_DEV_BASE
    : (import.meta.env.VITE_API_BASE_URL as string) || DEFAULT_PROD_BASE;

// 兼容旧导出：保持 API_CONFIG 名称不变以最小化改动
export const API_CONFIG = {
  API_BASE_URL,
  API_PROJECTS_ENDPOINT,
};

// 开发环境下的备用配置
export const DEV_CONFIG = {
  // 如果API服务器未运行，是否显示错误信息
  SHOW_API_ERROR: true,
  // 是否启用API请求重试
  ENABLE_RETRY: true,
  // 重试次数
  MAX_RETRIES: 3,
  // 重试延迟（毫秒）
  RETRY_DELAY: 1000,
};
