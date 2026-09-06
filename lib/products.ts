import type { Localized } from './i18n';

export type Product = {
  slug: string;
  name: string;
  eyebrow: Localized;
  summary: Localized;
  detail: Localized;
  icon: string;
  capabilities: Localized[];
};

export const products: Product[] = [
  {
    slug: 'gptwork', name: 'GPTWork', icon: '/products/gptwork.svg',
    eyebrow: { 'zh-CN': 'ChatGPT 工作增强', en: 'ChatGPT workflow companion', ja: 'ChatGPT ワークフロー支援' },
    summary: { 'zh-CN': '管理 ChatGPT 官方网页聊天中的模型与推理偏好，并提供验证、诊断和设备管理。', en: 'Manage model and reasoning preferences for official ChatGPT web chats with verification, diagnostics and device controls.', ja: 'ChatGPT 公式Webチャットのモデル・推論設定を管理し、検証・診断・デバイス管理を提供します。' },
    detail: { 'zh-CN': '面向 Windows 与 Linux 浏览器使用场景，强调可观察状态、自动验证、诊断与稳定更新。', en: 'Built for Windows and Linux browser workflows with observable state, automated verification, diagnostics and reliable updates.', ja: 'Windows / Linux のブラウザ利用向けに、状態可視化、自動検証、診断、安定更新を重視しています。' },
    capabilities: [
      { 'zh-CN': '模型与推理偏好管理', en: 'Model & reasoning preferences', ja: 'モデル・推論設定' },
      { 'zh-CN': '自动验证与诊断', en: 'Automated verification & diagnostics', ja: '自動検証・診断' },
      { 'zh-CN': '账户、设备与会话', en: 'Account, devices & sessions', ja: 'アカウント・端末・セッション' },
    ],
  },
  {
    slug: 'chat2api', name: 'chat2api', icon: '/products/chat2api.svg',
    eyebrow: { 'zh-CN': 'AI 能力连接层', en: 'AI capability bridge', ja: 'AI ケイパビリティ・ブリッジ' },
    summary: { 'zh-CN': '连接浏览器、Worker 与多种 AI 能力，为自动化场景提供统一的运行与管理入口。', en: 'Connect browsers, workers and AI capabilities behind one operational and management surface.', ja: 'ブラウザ、Worker、AI 機能を統合し、自動化向けの一元的な運用・管理入口を提供します。' },
    detail: { 'zh-CN': '面向需要浏览器运行态、Worker 编排、模型能力与控制面的服务场景。', en: 'For services that need browser runtime state, worker orchestration, model capabilities and a control plane.', ja: 'ブラウザ実行状態、Worker オーケストレーション、モデル機能、コントロールプレーンを必要とする用途向けです。' },
    capabilities: [
      { 'zh-CN': 'Worker 与浏览器连接', en: 'Worker & browser connectivity', ja: 'Worker・ブラウザ接続' },
      { 'zh-CN': '能力与版本契约', en: 'Capability & version contracts', ja: '機能・バージョン契約' },
      { 'zh-CN': '运行控制台', en: 'Operational console', ja: '運用コンソール' },
    ],
  },
  {
    slug: 'qnbot', name: 'QNBot', icon: '/products/qnbot.svg',
    eyebrow: { 'zh-CN': '电商 AI 客服', en: 'AI customer service', ja: 'EC向けAIカスタマーサービス' },
    summary: { 'zh-CN': '面向 Windows 千牛接待台的 AI 客服、知识中心与人工接管系统。', en: 'AI customer service, knowledge center and human handoff system for the Windows Qianniu console.', ja: 'Windows 千牛コンソール向けのAIカスタマーサービス、ナレッジセンター、人手引き継ぎシステムです。' },
    detail: { 'zh-CN': '覆盖消息聚合、知识检索、AI 回复、安全发送确认以及企业微信人工接管。', en: 'Covers message coalescing, knowledge retrieval, AI replies, safe delivery confirmation and WeCom handoff.', ja: 'メッセージ統合、知識検索、AI返信、安全な送信確認、WeComへの有人引き継ぎをカバーします。' },
    capabilities: [
      { 'zh-CN': 'Knowledge Center V2', en: 'Knowledge Center V2', ja: 'Knowledge Center V2' },
      { 'zh-CN': 'AI 自动回复与人工接管', en: 'AI replies & human handoff', ja: 'AI自動返信・有人引き継ぎ' },
      { 'zh-CN': '发送前稳定检查', en: 'Pre-send safety checks', ja: '送信前安全チェック' },
    ],
  },
  {
    slug: 'fdex', name: 'FDEX', icon: '/products/fdex.svg',
    eyebrow: { 'zh-CN': 'AI 工作平台', en: 'AI work platform', ja: 'AI ワークプラットフォーム' },
    summary: { 'zh-CN': '围绕智体、知识、协作与 Coding Agent 构建的个人与团队 AI 工作空间。', en: 'An AI workspace for individuals and teams built around agents, knowledge, collaboration and Coding Agent.', ja: 'エージェント、知識、協業、Coding Agent を中心に構築された個人・チーム向けAIワークスペースです。' },
    detail: { 'zh-CN': '提供 Web 与 Android 入口、统一 AI Provider、GitHub App、长期记忆和任务沙箱。', en: 'Provides Web and Android clients, unified AI providers, GitHub App integration, long-term memory and task sandboxes.', ja: 'Web / Android、統合AI Provider、GitHub App、長期記憶、タスクサンドボックスを提供します。' },
    capabilities: [
      { 'zh-CN': '智体与工作群', en: 'Agents & work groups', ja: 'エージェント・ワークグループ' },
      { 'zh-CN': 'Coding Agent', en: 'Coding Agent', ja: 'Coding Agent' },
      { 'zh-CN': '知识与长期记忆', en: 'Knowledge & long-term memory', ja: '知識・長期記憶' },
    ],
  },
  {
    slug: 'aipany', name: 'Aipany', icon: '/products/aipany.svg',
    eyebrow: { 'zh-CN': '实时语音智能', en: 'Realtime audio intelligence', ja: 'リアルタイム音声インテリジェンス' },
    summary: { 'zh-CN': '面向 App、智能硬件和实时语音产品的 Social Voice / Audio Intelligence 平台。', en: 'A Social Voice / Audio Intelligence platform for apps, smart hardware and realtime voice products.', ja: 'アプリ、スマートハードウェア、リアルタイム音声製品向けの Social Voice / Audio Intelligence プラットフォームです。' },
    detail: { 'zh-CN': '组合实时语音、本地声纹、云端音频理解与可选远程 GPU，保持客户端协议稳定。', en: 'Combines realtime voice, local speaker identity, cloud audio intelligence and optional remote GPU while keeping client protocols stable.', ja: 'リアルタイム音声、ローカル話者識別、クラウド音声理解、任意のリモートGPUを組み合わせ、クライアントプロトコルを安定させます。' },
    capabilities: [
      { 'zh-CN': 'Realtime ASR / LLM / TTS', en: 'Realtime ASR / LLM / TTS', ja: 'Realtime ASR / LLM / TTS' },
      { 'zh-CN': '声纹与说话人跟踪', en: 'Speaker identity & tracking', ja: '話者識別・追跡' },
      { 'zh-CN': '混合云 / GPU 音频智能', en: 'Hybrid cloud / GPU audio intelligence', ja: 'ハイブリッド Cloud / GPU 音声知能' },
    ],
  },
];

export const productBySlug = Object.fromEntries(products.map((item) => [item.slug, item])) as Record<string, Product>;
