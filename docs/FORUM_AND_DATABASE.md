# CN2 论坛与数据库 / CN2 Forum & Database

## 中文

CN2 论坛第一版已经具备真实的服务端持久化接口，不使用浏览器 localStorage 冒充社区数据。运行时采用 PostgreSQL。

### 启用

```bash
cp .env.example .env
# 修改 CN2_DATABASE_URL
npm install
npm run db:init
npm run build
npm start
```

核心环境变量：

```dotenv
CN2_DATABASE_URL=postgresql://cn2:password@127.0.0.1:5432/cn2
CN2_DATABASE_SSL=0
CN2_SESSION_DAYS=30
```

### 当前数据模型

- `cn2_users`：CN2 身份基础用户；
- `cn2_sessions`：服务端 Session，浏览器只保存 HttpOnly 随机 Token；数据库仅保存 Token SHA-256；
- `forum_categories`：中/英/日三语言版块；
- `forum_threads`：主题；
- `forum_replies`：回复。

密码使用 Node.js `scrypt` + 每用户随机 salt 保存，不保存明文密码。登录 Session 使用独立随机 Token、HttpOnly、SameSite=Lax Cookie，并支持数据库侧撤销。

所有写接口使用参数化 SQL，并检查同源 Origin。帖子和回复长度由服务端限制。React 默认转义用户正文，第一版不解释用户 HTML/Markdown，从而减少存储型 XSS 面。

### 下一步安全增强

正式公网开放前继续增加：邮箱验证、密码重置、登录/注册限流、验证码或风控、管理员/版主角色、举报与审核、编辑历史、Session 管理页、安全审计、内容反垃圾和备份策略。

---

## English

The first CN2 Forum implementation uses real server-side PostgreSQL persistence instead of browser localStorage pretending to be community data.

Copy `.env.example`, configure `CN2_DATABASE_URL`, run `npm install`, `npm run db:init`, build and start the service.

The first schema includes `cn2_users`, revocable `cn2_sessions`, trilingual `forum_categories`, `forum_threads` and `forum_replies`. Passwords use Node.js scrypt with per-user random salt. Browser sessions use random HttpOnly SameSite=Lax tokens while only SHA-256 token hashes are stored in the database.

Writes use parameterized SQL and same-origin checks. User content is length-limited and rendered as escaped React text; the first version deliberately does not interpret user HTML/Markdown.

Before public production launch, add email verification, password reset, rate limiting/risk controls, moderator roles, reports/moderation, edit history, session management, security audit, anti-spam and backup policy.
