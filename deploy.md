# 部署指南

## GitHub Pages 部署

1. **构建项目**
   ```bash
   npm run build
   ```

2. **配置 GitHub Pages**
   - 在 GitHub 仓库设置中启用 GitHub Pages
   - 选择 `gh-pages` 分支或 `main` 分支的 `/docs` 文件夹
   - 如果使用 `gh-pages` 分支，需要先创建该分支

3. **自动部署（推荐）**
   
   安装 gh-pages 包：
   ```bash
   npm install --save-dev gh-pages
   ```

   在 `package.json` 中添加脚本：
   ```json
   {
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     }
   }
   ```

   然后运行：
   ```bash
   npm run deploy
   ```

## Vercel 部署

1. **连接 GitHub 仓库**
   - 访问 [vercel.com](https://vercel.com)
   - 使用 GitHub 账号登录
   - 导入你的仓库

2. **自动部署**
   - Vercel 会自动检测到 Vite 项目
   - 每次推送到 main 分支都会自动部署

## Netlify 部署

1. **连接 GitHub 仓库**
   - 访问 [netlify.com](https://netlify.com)
   - 使用 GitHub 账号登录
   - 选择 "New site from Git"

2. **配置构建设置**
   - Build command: `npm run build`
   - Publish directory: `dist`

## 自定义域名

部署后，你可以在各个平台配置自定义域名：

- **GitHub Pages**: 在仓库设置中添加自定义域名
- **Vercel**: 在项目设置中添加域名
- **Netlify**: 在站点设置中添加自定义域名

## 环境变量

如果需要使用环境变量，创建 `.env` 文件：

```env
VITE_SITE_TITLE=我的项目概览
VITE_SITE_DESCRIPTION=我的前端项目集合
```

然后在 `config.ts` 中使用：

```typescript
export const siteConfig = {
  title: import.meta.env.VITE_SITE_TITLE || '前端项目概览',
  subtitle: import.meta.env.VITE_SITE_DESCRIPTION || '探索我的前端项目集合',
  // ...
}
```
