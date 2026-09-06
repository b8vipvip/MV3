# CN2 网站架构 / CN2 Website Architecture

## 中文

CN2 仓库第一阶段采用 Next.js App Router + TypeScript，目标是先建立可部署、可扩展的社区与产品门户，不在前端伪造尚未完成的论坛持久化或统一账号能力。

### 信息架构

- `/`：CN2 社区首页
- `/products`：产品中心
- `/products/:slug`：产品独立站点。页面标题和品牌只使用产品名，不使用“官网”措辞。
- `/forum`：CN2 论坛信息架构与讨论入口
- `/account`：CN2 Identity 接入壳层
- `/docs`：统一文档入口
- `/labs`：研究/实验项目
- `/status`：服务状态中心
- `/trust`：安全与信任中心

### 产品数据边界

产品描述集中在 `lib/products.ts`。公共网站故意不保存或展示产品 GitHub 来源地址。后续下载、版本、文档和状态数据通过产品服务 API 或 CN2 聚合服务提供，而不是把源码仓库当作前台产品入口。

### 国际化

第一阶段提供 `zh-CN`、`en`、`ja` 三种语言，简体中文为默认语言。语言偏好保存在浏览器 localStorage。后续进入服务端账号体系后可同步到用户 Profile。

### 图片与视觉资产

第一阶段视觉资产全部使用仓库内原创 SVG：CN2 品牌标记、网络主视觉、产品图标。避免依赖第三方图库、外部 CDN 或有不确定授权的图片。

### 下一阶段

1. PostgreSQL 持久化论坛（版块、帖子、回复、收藏、举报、审核）；
2. CN2 Identity 服务；
3. 产品 OAuth/OIDC client 接入；
4. 产品下载/版本/状态聚合；
5. 管理后台与内容管理；
6. 搜索、通知、私信与社区信誉体系。

---

## English

The first CN2 website foundation uses Next.js App Router and TypeScript. The goal is a deployable, extensible community and product portal without pretending that persistent forum data or shared identity already exists.

### Information architecture

- `/` — CN2 community home
- `/products` — product catalog
- `/products/:slug` — independent product sites; product branding uses the product name directly, never an “official website” label
- `/forum` — forum structure and discussion entry point
- `/account` — CN2 Identity integration shell
- `/docs` — documentation hub
- `/labs` — research and experiments
- `/status` — service status
- `/trust` — security and trust center

Product metadata lives in `lib/products.ts`. Public pages intentionally do not store or show GitHub source repository addresses. Downloads, versions, docs and service health should later come from product APIs or a CN2 aggregation layer.

The public UI supports Simplified Chinese, English and Japanese, with Simplified Chinese as the default. Visual assets are original repository-local SVG files to avoid external image dependencies and uncertain licensing.

Next stages are persistent PostgreSQL forum data, CN2 Identity, OAuth/OIDC product clients, release/status aggregation, admin CMS, search, notifications, messaging and community reputation.
