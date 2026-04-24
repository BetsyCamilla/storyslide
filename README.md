# storyslide

> **从纯文本到交互式视觉叙事 · 一键生成**

---

## 简介

`storyslide` 是一个 OpenClaw Skill，将用户的纯文本内容转化为一套完整的交互式 HTML 演示，**无需任何前端知识**。

输入你的故事 → 选一个喜欢的风格 → 一键得到带翻页、粒子、中英切换、打字动画的 HTML 文件。

## 效果演示

[📺 观看演示视频](demo/demo.mp4)

或直接打开 `poster.html` 查看路演海报。

## 3 套预设风格

| 风格 | 氛围 | 配色 |
|------|------|------|
| **墨金典藏** 🏛️ | 优雅暗调、杂志感 | 墨绿 + 象牙白 + 金色 |
| **赛博光晕** 💜 | 科技未来、炫酷 | 深蓝 + 青紫 + 霓虹青 |
| **象牙简约** 📄 | 干净、阅读友好 | 暖白 + 暖灰 + 赭石 |

## 交互能力

- 📖 翻页系统 — 按钮 / 键盘 / 滚轮 / 触摸滑动
- ✨ Hover 布灵 — 放大 + 光晕扫过
- 🌊 粒子拖尾 — Canvas 实时绘制
- 🔤 中英切换 — data-i18n 一键换
- 🎬 入场动画 — 逐次渐入 + 打字动画
- 📱 微信兼容 — visibility+z-index 方案
- 📦 零依赖 — 单 HTML，离线可用
- 🖱️ 鼠标特效 — 光晕跟随 + 核心亮点 + 点击水波纹
- 🎭 页面布局 — 8种布局自由组合

## 快速使用

1. **提供内容** — 标题、副标题、每页内容（文本或 Markdown）
2. **选风格** — 从 3 套风格预览中选一个
3. **过场确认** — 选过渡效果 + 确认是否需要图片
4. **收货** — 得到完整的 `presentation.html`（zip 打包）

详见 `SKILL.md` 中的完整工作流。

## 项目结构

```
storyslide/
├── SKILL.md                # 工作流 + 规范（核心文档）
├── README.md               # 本文件
├── _meta.json              # skill 元数据
├── poster.html             # 路演提交海报
├── REVIEW.md               # 评审记录
├── demo/
│   └── demo.mp4            # 演示视频
├── templates/
│   └── example-input.txt   # 用户输入示例
└── reference/
    ├── viewport-and-base.css
    ├── js/presentation.js  # 翻页/过场/交互/特效/i18n
    └── effects/
        ├── flip-system.css
        ├── hover-effects.css
        ├── cursor-effects.css
        ├── animations.css
        └── i18n-switcher.css
```

## 技术栈

纯前端：**HTML + CSS + JavaScript**，零框架零依赖零外链。

翻页使用 `visibility` + `z-index` 瞬间切换（微信兼容），过场支持淡入淡出/滑动/缩放/直接切换。

## Credits

本 skill 的架构设计和风格预设体系参考了 [frontend-slides](https://clawhub.ai/skills/frontend-slides) skill。

核心交互系统和特效经过多轮微信 WebView 兼容性验证，基于 SBTI 视觉叙事演示项目的真实开发过程提炼而成。

---

**作者**：娜孜凯·朱马别克 (Betsy Camilla) · April 2026
**Built with** OpenClaw AI
