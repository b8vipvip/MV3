BEGIN;

CREATE TABLE IF NOT EXISTS cn2_users (
  id UUID PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  display_name VARCHAR(64) NOT NULL,
  locale VARCHAR(10) NOT NULL DEFAULT 'zh-CN',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS cn2_sessions (
  id UUID PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES cn2_users(id) ON DELETE CASCADE,
  token_hash CHAR(64) NOT NULL UNIQUE,
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  last_seen_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  user_agent VARCHAR(300)
);
CREATE INDEX IF NOT EXISTS idx_cn2_sessions_user ON cn2_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_cn2_sessions_expiry ON cn2_sessions(expires_at);

CREATE TABLE IF NOT EXISTS forum_categories (
  slug VARCHAR(48) PRIMARY KEY,
  name_zh VARCHAR(80) NOT NULL,
  name_en VARCHAR(80) NOT NULL,
  name_ja VARCHAR(80) NOT NULL,
  description_zh VARCHAR(240) NOT NULL,
  description_en VARCHAR(240) NOT NULL,
  description_ja VARCHAR(240) NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS forum_threads (
  id BIGSERIAL PRIMARY KEY,
  category_slug VARCHAR(48) NOT NULL REFERENCES forum_categories(slug),
  author_id UUID NOT NULL REFERENCES cn2_users(id) ON DELETE RESTRICT,
  title VARCHAR(180) NOT NULL,
  body TEXT NOT NULL,
  pinned BOOLEAN NOT NULL DEFAULT FALSE,
  locked BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_forum_threads_category_time ON forum_threads(category_slug, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_forum_threads_time ON forum_threads(created_at DESC);

CREATE TABLE IF NOT EXISTS forum_replies (
  id BIGSERIAL PRIMARY KEY,
  thread_id BIGINT NOT NULL REFERENCES forum_threads(id) ON DELETE CASCADE,
  author_id UUID NOT NULL REFERENCES cn2_users(id) ON DELETE RESTRICT,
  body TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_forum_replies_thread_time ON forum_replies(thread_id, created_at ASC);

INSERT INTO forum_categories(slug,name_zh,name_en,name_ja,description_zh,description_en,description_ja,sort_order) VALUES
('ai-agents','AI 与 Agents','AI & Agents','AI & Agents','模型、Agent、RAG、推理、工具调用与 AI 工程','Models, agents, RAG, reasoning, tool use and AI engineering','モデル、Agent、RAG、推論、ツール利用、AI エンジニアリング',10),
('programming','编程开发','Programming','プログラミング','前端、后端、移动端、桌面、API 与代码实践','Frontend, backend, mobile, desktop, APIs and coding practice','フロントエンド、バックエンド、モバイル、デスクトップ、API、実装',20),
('servers-cloud','服务器与云','Servers & Cloud','サーバー & クラウド','Linux、Docker、云服务器、部署与可观测性','Linux, Docker, cloud servers, deployment and observability','Linux、Docker、クラウドサーバー、デプロイ、可観測性',30),
('network','网络','Network','ネットワーク','网络、代理、DNS、CDN、链路与性能','Networking, proxies, DNS, CDN, connectivity and performance','ネットワーク、プロキシ、DNS、CDN、接続、性能',40),
('automation','自动化','Automation','自動化','浏览器、桌面、RPA、Worker 与自动化系统','Browser, desktop, RPA, workers and automation systems','ブラウザ、デスクトップ、RPA、Worker、自動化システム',50),
('security','安全','Security','セキュリティ','账号安全、应用安全、权限边界与隐私','Account security, application security, authorization and privacy','アカウント安全、アプリ安全、権限境界、プライバシー',60),
('cn2-products','CN2 产品','CN2 Products','CN2 製品','GPTWork、chat2api、QNBot、FDEX、Aipany 使用与交流','GPTWork, chat2api, QNBot, FDEX and Aipany discussion','GPTWork、chat2api、QNBot、FDEX、Aipany の利用・交流',70),
('off-topic','茶水间','Off-topic','雑談','硬件、效率工具、产品设计与轻松技术讨论','Hardware, productivity, product design and relaxed technology discussion','ハードウェア、効率化、製品設計、気軽な技術交流',80)
ON CONFLICT (slug) DO UPDATE SET
  name_zh=EXCLUDED.name_zh,name_en=EXCLUDED.name_en,name_ja=EXCLUDED.name_ja,
  description_zh=EXCLUDED.description_zh,description_en=EXCLUDED.description_en,description_ja=EXCLUDED.description_ja,
  sort_order=EXCLUDED.sort_order;

COMMIT;
