# MV3 Identity 与统一账户路线 / MV3 Identity & Shared Account Roadmap

## 中文

目标：最终让一个码位3账户登录社区以及 GPTWork、chat2api、QNBot、FDEX、Aipany 等码位3产品，同时保持各产品业务数据、设备、权益和权限边界清晰。

### 原则

1. **MV3 Identity 是身份源，不是所有产品数据库的合并数据库。**
2. 各产品使用稳定的内部身份映射键。现有 `cn2_user_id` 为兼容既有数据暂不改名，同时保留各产品自己的业务主键。
3. 使用 OAuth 2.1 / OpenID Connect 兼容的 Authorization Code + PKCE 流程；桌面、移动和 Web client 分开注册。
4. Access Token 短期有效，Refresh Token 轮换；服务端记录设备、Session、安全事件和撤销状态。
5. 产品授权、套餐权益和业务角色不直接塞进全局身份 Token，避免权限扩散。
6. 账号注销采用编排式删除：身份层负责发起，各产品确认各自数据生命周期结果。

### 迁移阶段

**Phase I — Foundation**

- 建立 MV3 Identity 数据模型和 OIDC endpoints；
- 社区首先使用 MV3 Identity；
- 建立 `product_account_links` 映射表；
- 不修改已有产品登录。

**Phase II — Link existing accounts**

- 用户登录已有 GPTWork / FDEX 等账号后主动绑定码位3账户；
- 绑定需要重新验证现有产品凭据或当前有效 Session；
- 禁止仅按同邮箱自动合并账号。

**Phase III — Shared sign-in**

- 产品增加“使用码位3账户登录”；
- 老用户仍可使用旧登录直至迁移完成；
- 新用户优先创建 MV3 Identity。

**Phase IV — Consolidation**

- 在迁移率、回滚和安全审计满足条件后，逐步关闭产品自有密码登录；
- 产品继续维护自己的业务授权、数据与审计。

### 安全要求

- 不跨产品共享明文密码；
- 不把一个产品的 Refresh Token 复用于另一个产品；
- 绑定账号前要求显式确认；
- 关键操作支持重新认证；
- 全局注销可撤销 MV3 Session，但产品侧高风险长会话仍需自己的撤销/过期策略；
- 任何迁移都必须有可回滚映射与审计记录。

---

## English

Goal: one MV3 account should eventually sign into the community and MV3 products such as GPTWork, chat2api, QNBot, FDEX and Aipany, while product business data, devices, entitlements and authorization remain clearly separated.

MV3 Identity is the source of identity, not a merged database for every product. Existing `cn2_user_id` mapping keys remain unchanged for backward compatibility with persisted data; products continue to map that stable internal key to their own business user keys. Use standards-compatible OAuth 2.1 / OpenID Connect Authorization Code + PKCE flows, rotating refresh tokens, device/session records and explicit revocation.

Migration should proceed in four stages: foundation, explicit linking of existing accounts, shared sign-in alongside legacy sign-in, and only then consolidation. Existing accounts must never be merged only because email addresses match. Linking requires explicit user confirmation and re-verification of the existing product account/session.

Do not share plaintext passwords across products, do not reuse product refresh tokens, require re-authentication for sensitive actions, and keep auditable rollback mappings for every migration step.
