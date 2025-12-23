# Newtrain（新训）外贸培训站点 — 保姆级落地指南

适配中国大陆市场的站点与 App（后续可做 PWA/打包），前端采用 Next.js App Router，课程与支付暂由 WordPress 承载，自动化对接 n8n。

## 1. 本地运行

- 安装依赖：`npm install`
- 启动开发服务：`npm run dev`
- 预览地址：`http://localhost:3000`

若首次启动卡住或报 SWC/Turbopack 相关错误，重试 `npm run dev` 即可；本项目已安装 `@next/swc-wasm-nodejs` 以减少网络下载依赖。

## 2. 环境变量配置（.env.local）

- `SITE_URL`：站点地址（本地为 `http://localhost:3000`，上线后改为 `https://newtraining.cn`）
- `WORDPRESS_CHECKOUT_URL`：WordPress 商品或收银台链接（示例：`http://82.156.101.107/product/newtrain-membership`）
- `N8N_BASE_URL`：n8n 地址（本地为 `http://localhost:5678`）
- `N8N_WEBHOOK_URL`：n8n Webhook 完整地址（在 n8n 创建后粘贴，启用直连）

示例已在 `.env.local.example` 给出；修改 `.env.local` 后需重启 `npm run dev`。

## 3. 页面结构与 SEO

- 主要页面：`/`、`/program`、`/tracks`、`/resources`、`/blog`、`/pricing`、`/contact`
- 中文 Metadata、`robots.txt` 与 `sitemap` 已接入 `SITE_URL` 环境变量，部署后自动输出正确域名
- 已注入百度链接自动推送脚本；站长平台验证文件可放在 `public/` 目录

## 4. 联系表单对接 n8n（零基础）

1) 打开 n8n：`http://localhost:5678`
2) 新建 Workflow，添加一个 `Webhook` 节点（方法选择 POST），复制生成的 Webhook URL
3) 将该 URL 填入 `.env.local` 的 `N8N_WEBHOOK_URL`
4) 重启 `npm run dev`
5) 访问 `http://localhost:3000/contact`，填写并提交表单；数据会通过 `/api/n8n` 代理转发到 n8n 的 Webhook

如果尚未创建 Webhook，也会尝试把请求发送到 `N8N_BASE_URL/webhook`（建议创建正式 Webhook 来收数）。

## 5. WordPress 支付与课程

- 后台地址：`http://82.156.101.107/wp-admin`
- 建议安装：WooCommerce（商品/订单）+ 支付宝/微信支付插件，LMS 插件（如 Tutor LMS/LearnDash）
- 创建商品后，复制商品页或结算页链接，填写到 `.env.local` 的 `WORDPRESS_CHECKOUT_URL`
- 前端 `价格与收款` 页面会显示“前往支付（WordPress）”按钮并跳转至该链接

## 6. 部署与合规（大陆）

- 服务器与域名：使用腾讯云，域名解析到服务器，申请并配置 HTTPS 证书
- 备案：完成 ICP 备案与公安备案（按当地要求）
- 存储与加速：视频建议放腾讯云 COS + CDN，加速国内访问
- 搜索收录：在百度/字节/阿里等站长平台提交 `sitemap` 与收录申请

## 7. 目录结构速览

- `src/app/layout.tsx`：全局布局与百度推送脚本
- `src/app/**/page.tsx`：各页面
- `src/app/api/n8n/route.ts`：服务端代理转发到 n8n Webhook
- `src/app/robots.txt/route.ts`、`src/app/sitemap.ts`：SEO 配置
- `public/`：静态资源（可以放验证文件/图标）

## 8. 常见问题

- 启动慢/卡住：首次会下载/加载编译组件，耐心等待；或重启命令
- 表单提交失败：检查 `N8N_WEBHOOK_URL` 是否已填且可访问；查看 n8n Workflow 是否已激活
- 支付按钮不显示：确认 `.env.local` 已填 `WORDPRESS_CHECKOUT_URL`，并重启开发服务

如需进一步自动化（报名通知、邮件发送、数据入库），在 n8n 的 Webhook 后串联相应节点即可。
