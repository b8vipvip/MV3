# CN2 Community / CN2 社区

CN2 是面向开发者、AI 工程师、运维人员与技术爱好者的技术社区，也是 CN2 系列软件与服务的统一入口。

> 默认语言：简体中文。网站支持简体中文、English、日本語。

## 产品定位

CN2 不只是产品展示页，而是由以下部分组成的长期社区平台：

- **社区首页**：聚合产品、技术内容、社区动态与公告；
- **CN2 论坛**：讨论 AI、开发、服务器、网络、自动化、开源生态与其他 IT 主题；
- **产品中心**：GPTWork、chat2api、QNBot、FDEX、Aipany 等 CN2 推出的软件与服务；
- **独立产品站点**：每个产品拥有独立介绍、功能、文档与下载入口，产品站标题直接使用产品名，不再使用“官网”命名；
- **CN2 Identity**：规划中的统一账号与 SSO，各产品最终使用同一个 CN2 账号登录；
- **文档中心**：用户教程、部署说明、故障排查与产品更新；
- **实验室**：用于展示 CN2 的实验性项目、协议研究与技术探索；
- **状态中心**：面向用户展示各产品/服务的运行与发布状态；
- **安全与信任中心**：账号安全、隐私、数据边界、服务条款与安全公告。

## 产品

当前产品中心计划包含：

- **GPTWork** — ChatGPT 官方网页聊天的模型与推理偏好管理工具；
- **chat2api** — 浏览器/Worker 与 AI 能力编排相关服务；
- **QNBot** — 面向 Windows 千牛接待台的 AI 客服与人工接管系统；
- **FDEX** — 面向个人与团队的 AI 工作平台、智体与 Coding Agent；
- **Aipany** — 面向 App、智能硬件和实时语音产品的 Social Voice / Audio Intelligence 平台。

网站产品页面暂不展示项目或软件的 GitHub 来源地址。

## 统一账号路线

CN2 Identity 作为统一身份提供方，各产品作为独立应用接入。推荐采用 OAuth 2.1 / OpenID Connect 兼容模型，统一处理：

- 注册、登录、邮箱验证与密码重置；
- Access Token / Refresh Token；
- 设备、会话与安全审计；
- 产品授权与权益；
- 单点登录与单点退出；
- 账号注销与数据导出；
- 产品侧账号映射和分阶段迁移。

第一阶段不会直接破坏现有 GPTWork / FDEX 等产品的账号体系，而是通过账号映射和迁移适配逐步统一。

## Repository language / 仓库文档语言

仓库文档采用中英双语，中文为默认内容，英文紧随其后。面向用户的网站同时提供简体中文、英语和日语。

---

# English

CN2 is a technology community for developers, AI engineers, operators and technology enthusiasts, and the unified public entry point for CN2 software and services.

The long-term platform includes a community home page, CN2 Forum, product center, independent product sites, CN2 Identity SSO, documentation, Labs, service status, and a security & trust center.

Planned products include GPTWork, chat2api, QNBot, FDEX and Aipany. Public product pages intentionally do not expose GitHub source repository URLs at this stage.

CN2 Identity is planned as the shared identity provider. Products will be integrated gradually through standards-compatible SSO and account mapping so existing product accounts are not broken during migration.

Repository documentation is bilingual Chinese/English, with Simplified Chinese as the default. The public website supports Simplified Chinese, English and Japanese.
