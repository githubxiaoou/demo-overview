// 环境配置
export const ENV = {
  development: {
    API_BASE_URL: "http://localhost:3000",
    API_PROJECTS_ENDPOINT: "/api/project/projects",
  },
  production: {
    API_BASE_URL:
      import.meta.env.VITE_API_BASE_URL ||
      "https://json-server-render-s9kv.onrender.com",
    API_PROJECTS_ENDPOINT: "/api/project/projects",
  },
};

// 根据当前环境获取配置
const currentEnv = import.meta.env.MODE || "development";
export const API_CONFIG = ENV[currentEnv as keyof typeof ENV];

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
