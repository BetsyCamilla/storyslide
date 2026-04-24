---
name: storyslide
description: 从纯文本内容一键生成交互式视觉叙事 HTML 演示。预设3套风格（墨金典藏/赛博光晕/象牙简约），支持翻页、hover布灵、粒子拖尾、波点光晕、中英切换、打字动画、页码指示器、交互提示条等全部交互模式。适合路演、解决方案演示、品牌故事、个人故事、教学课件等场景。
---

# storyslide

将用户的纯文本内容转化为一套完整的交互式 HTML 演示，**无需任何前端知识**。所有交互开箱即用，微信兼容，零外链零依赖。

## 工作流

```
用户提供文本内容
  → AI 生成 3 套风格预览（单标题页）
     → 用户选择风格
        → AI 询问过场动画偏好 + 是否需要真实图片
           → 用户确认后 AI 按参考文件生成完整 HTML
              → 打包 .zip 交付
```

**⚠️ 重要：未经用户确认风格和过场/图片需求，禁止跳过阶段 2/3 直接输出完整 HTML。**

---

## 阶段 1：收集内容

向用户收集以下信息（可一次性提问或逐个询问）：

1. **标题**：演示的主标题
2. **副标题/简介**：一句话概述
3. **页数**：需要几页？（建议 6-10 页）
4. **每页内容**：按页提供标题 + 要点（纯文本或 Markdown）
5. **是否需要中英切换**：是/否
6. **交付方式**：zip 打包

### 色彩与表情

每页可以配一个 **emoji 视觉符号**（在标题左上角或卡片图标中），AI 根据内容自动匹配。

例子：
- 创新/好奇心 → 🔍
- AI/技术 → 🤖
- 打包/封装 → 📦
- 开源/社区 → 🌐
- 能力/功能 → ✨
- 时间/历程 → 📖
- 结论/总结 → 💡
- 问题/思考 → ❓

### 内容格式示例

用户可以自由输入文本，AI 自动按布局类型分页。推荐结构化输入：

```
--- 第1页 title ---
主标题：storyslide
副标题：从文本到交互式视觉叙事
标签：产品 / 路演 / 2026

--- 第2页 timeline ---
标题：我的故事节点
01 起点 | 标题 | 描述 | 点击展开详情
02 迭代 | 标题 | 描述 | 点击展开详情

--- 第3页 cards ---
标题：核心能力
🔍 能力1 | 一句话说明 | 展开详情
🤖 能力2 | 一句话说明 | 展开详情

--- 第4页 evidence ---
标题：功能清单
📖 翻页系统 | 按钮/键盘/滚轮/触摸 | 展开：xxx
✨ Hover布灵 | 放大+光晕扫过 | 展开：xxx

--- 第5页 split ---
标题：两种视角
左标签 | 条目1 / 条目2 / 条目3
右标签 | 条目1 / 条目2 / 条目3

--- 第6页 conclusion ---
标题：我的结论
① 标题 | 说明
② 标题 | 说明

--- 第7页 grid3 ---
标题：技术方案
👁️ visibility翻页 | 微信最稳
🎨 CSS变量换肤 | 3套风格一套交互

--- 第8页 closing ---
结尾语：如果问我做了什么
问题：我就只是好奇了一件事
署名：然后做了很多版本 · 提交了路演
彩蛋：🤫 这个页面也是 storyslide 生成的
```

### 布局类型

所有布局**自由组合、任意顺序、任意数量**。

| 类型 | HTML 类 | 说明 | 适用场景 |
|------|---------|------|---------|
| `title` | 无特殊类 | 标题页，大标题 + 副标题 + 标签 | 首页 |
| `timeline` | `.timeline-mini` | 4个节点点击展开详情 | 事件脉络 / 个人故事 |
| `cards` | `.card-grid` | 2列卡片网格，点击展开详情 | 架构 / 分类 |
| `evidence` | `.evidence-list` | 列表条目，点击展开详情 | 能力清单 / 功能列表 |
| `split` | `.view-switcher` | 双视图切换 | 对比 / 两种视角 |
| `conclusion` | `.conclusion-list` | 结论条目列表 | 总结 |
| `grid3` | `.tech-grid` | 3列网格卡片（不可展开） | 技术方案 |
| `closing` | 自定义 | 结尾页 + 打字动画 + 彩蛋 | 收尾 |

---

## 阶段 2.5：过场动画 + 图片需求确认

用户在阶段 2 选择风格后，**必须询问以下两个问题**，确认后才能进入阶段 3：

### 2.5.1 过场动画选项

AI 询问用户：「翻页时你希望什么样的过渡效果？」

提供以下选项（可多选）：

| 选项 | 描述 | 实现方式 |
|------|------|---------|
| A. 直接切换（无动画） | 当前页隐藏→新页显示，瞬间切换 | visibility 切换，微信最稳 |
| B. 淡入淡出 | 当前页 0.3s 渐出 → 新页 0.4s 渐入 + 入场逐次渐入 | opacity transition |
| C. 滑动翻页 | 新页从右侧/左侧滑入 | transform: translateX 过渡 |
| D. 放大缩小 | 新页从中心放大进入 | transform: scale 过渡 |

**默认推荐：B（淡入淡出）**，兼顾视觉流畅和微信兼容。

AI 也可根据演示风格建议一个选项（如路演选 B，科技选 D）。

### 2.5.2 是否需要真实图片

AI 询问用户：「你的演示内容是否需要配上真实图片？」

流程：

```
用户说「需要」
  → AI 先识别内容中哪些页适合配图（如封面背景、时间线节点、卡片区域等）
     → AI 列出配图计划给用户确认（每页1张图+描述）
        → 用户确认后：
           ① AI 搜索可用图片 URL（通过 web_search 或 web_fetch）
           ② 或者让用户提供图片（微信发送）
           ③ AI 上传到图床（如有可用工具）获得可访问的 HTTPS URL
           ④ 插入 HTML 的合适位置（cover背景、卡片插图、装饰半透明层等）
           → 交付最终版
```

**如果用户不需要图片，直接跳过此步骤。**

配图插入规则：
- 封面页：可做全屏背景图（低透明度叠加深色遮罩）
- 时间线/卡片页：在标题上方或卡片内插入小图
- 技术方案页：每个 tech-card 可加小图标或示意截图
- 所有图片需要降采样到合适大小，不超过 500KB
- 图片需 HTTPS 协议，微信 WebView 可加载

**⚠️ 重要：未经用户确认配图计划，不能自行搜索或插入图片。**

### 风格 A：墨金典藏

```
配色：墨绿 #1a2e2a | 象牙白 #f2f0eb | 金色 #e8cb7a
字体：'ZCOOL QingKe HuangYou', KaiTi, serif（标题）
      -apple-system, BlinkMacSystemFont, Arial, sans-serif（正文）
氛围：优雅暗调、杂志感、沉稳
交互：金色布灵扫光、暖色粒子（rgba(232,203,122,0.5)）、金色光晕
波点颜色：rgba(232,203,122,0.04) 圆点背景

颜色层次（5层）：
  标题色 → #f2f0eb（纯白）
  强调色 → #e8cb7a（金色，可交互元素、时间线标题、页码）
  次级强调 → #c4a35a（暗金色，次要标题）
  正文色 → #9aaa9e（灰绿，主要内容）
  细节色 → #7a8c88（深灰绿，展开详情/注释）
```

### 风格 B：赛博光晕

```
配色：深蓝 #0a0e27 | 青紫 #a78bfa | 霓虹青 #06b6d4
字体：Georgia, serif（标题）| Helvetica Neue（正文）
氛围：科技感、未来感、炫酷
交互：紫色扫光、冷色粒子（rgba(167,139,250,0.5)）、紫色光晕
波点颜色：rgba(167,139,250,0.04) 圆点背景

颜色层次（5层）：
  标题色 → #ffffff（纯白）
  强调色 → #a78bfa（紫色，可交互元素、页码、结论编号）
  次级强调 → #06b6d4（青色，时间线标题、技术名称）
  正文色 → #94a3b8（灰蓝，主要内容）
  细节色 → #64748b（深灰蓝，展开详情/注释）
```

### 风格 C：象牙简约

```
配色：暖白 #faf8f5 | 暖灰 #8c8a86 | 赭石 #8b6914
字体：Georgia, serif（标题）| Helvetica Neue（正文）
氛围：干净、内容优先、阅读友好
交互：柔和光晕、极简粒子、赭石色波点

颜色层次（5层）：
  标题色 → #1a1a18（深褐）
  强调色 → #8b6914（赭石，可交互元素）
  次级强调 → #a38234（暗金，次要标题）
  正文色 → #5c5a56（暖灰，主要内容）
  细节色 → #8c8a86（浅暖灰，展开详情/注释）
```

用户选择后，**截图/复制该预览的完整 CSS + 配色变量**，进入阶段 3。

---

## 阶段 3：生成完整 HTML

### 文件结构

单文件 `presentation.html`，零依赖零外链。

### 必须包含的模块（严格按此顺序）

参考 `reference/` 目录下的具体实现，但**不要用 @import 引用**，全部内联在 `<style>` 标签中。

1. **HTML 骨架** — DOCTYPE, head (meta, viewport, style), body (slide 容器、固定元素), script
2. **翻页系统** — 左右导航按钮、键盘左右/空格/下键、滚轮（800ms防抖）、**触摸滑动（>50px）**，使用 visibility+z-index 瞬间切换（不要 opacity 过渡）
3. **页码指示器** — 底部 `.page-indicator`，显示 `01 / 08`，翻页时 JS updatePage() 更新
4. **交互提示条** — 底部 `.interaction-hint`，显示「翻页 ◀ ▶ · 点击展开详情 · 右上角中EN切换」，5秒后淡出消失
5. **storyslide 杂志衬线 logo** — 首屏 `.demo-logo` 使用 Georgia 衬线字体，字体放大到 `clamp(3rem,7vw,5rem)`
6. **颜色层次** — 每种风格必须定义 5 层颜色：标题色、强调色、次级强调色、正文色、细节色
7. **入场动画** — 翻页后带 `.anim-fade-up` / `.anim-scale` 的子元素逐次渐入
8. **Hover 特效** — `scale(1.02)` + 布灵光晕扫过（伪元素、随风格变色）
9. **鼠标特效** — `.cursor-glow`（300px 径向渐变）+ `.cursor-core`（8px 小圆点）+ Canvas 实时粒子拖尾（3个/帧，35粒上限）
10. **点击水波纹** — 点击页面任意位置，从点击点扩散圆环波纹（0.6s 过渡自动清除）
11. **过场动画（用户选择）** — 见下方「过场动画选项」章节
12. **内容交互** — `.clickable` + toggleCard/toggleTimeline/togglePillar 展开详情、switchView 双视图切换
13. **打字动画** — @keyframes max-width 渐显，无光标闪烁
14. **中英切换** — 右上角「中」「EN」按钮 + `data-i18n` + `window.i18nData` 对照表 + `switchLang()` 函数
15. **防闪屏** — 不用 `body { display: none }`，直接用 CSS 控制 `.slide.active { visibility: visible; z-index: 1; }`
16. **零外链字体** — 全部系统后备字体，不引用 Google Fonts 或其他 CDN
17. **波点装饰(可选)** — 背景可用重复 radial-gradient 生成半透明波点纹理，增强风格质感

### 字号规范（大字体版，微信友好）

所有字号比常规大 0.3-0.5rem。**最小字号不低于 0.65rem。**

| 元素 | 字号 clamp | 说明 |
|------|-----------|------|
| `.demo-logo` | `clamp(3.5rem, 8vw, 5.5rem)` | 杂志衬线大标题 |
| `.headline` | `clamp(2.2rem, 6vw, 3.5rem)` | 主标题 |
| `h2` | `clamp(1.7rem, 4.5vw, 2.5rem)` | 次级标题 |
| `.subhead` | `clamp(0.85rem, 1.6vw, 1.1rem)` | 副标题 |
| `.tl-title` | `clamp(0.9rem, 1.6vw, 1.1rem)` | 时间线标题 |
| `.tl-text` | `clamp(0.8rem, 1.4vw, 0.95rem)` | 时间线正文 |
| `.tl-detail` | `clamp(0.75rem, 1.3vw, 0.9rem)` | 展开详情 |
| `.gc-label` | `clamp(0.9rem, 1.6vw, 1.1rem)` | 卡片标题 |
| `.gc-desc` | `clamp(0.8rem, 1.4vw, 0.95rem)` | 卡片说明 |
| `.ev-title` | `clamp(0.85rem, 1.5vw, 1rem)` | 证据标题 |
| `.ev-text` | `clamp(0.8rem, 1.4vw, 0.95rem)` | 证据摘要 |
| `.ev-detail` | `clamp(0.75rem, 1.3vw, 0.9rem)` | 展开详情 |
| `.conclusion-title` | `clamp(0.9rem, 1.6vw, 1.1rem)` | 结论标题 |
| `.conclusion-text` | `clamp(0.8rem, 1.4vw, 0.95rem)` | 结论正文 |
| `.tech-name` | `clamp(0.8rem, 1.4vw, 0.95rem)` | 技术名称 |
| `.tech-desc` | `clamp(0.7rem, 1.2vw, 0.85rem)` | 技术说明 |
| `.closing-question span` | `clamp(1.8rem, 4.5vw, 2.5rem)` | 结尾问题 |
| `.folio` | `clamp(0.75rem, 1.3vw, 0.9rem)` | 标签 |
| `.closing-line` | `clamp(0.9rem, 1.6vw, 1.1rem)` | 结尾语 |
| `.closing-meta` | `clamp(0.8rem, 1.4vw, 0.95rem)` | 结尾署名 |
| `.page-num` | `clamp(0.65rem, 1.1vw, 0.75rem)` | 页码 |
| `.interaction-hint` | `clamp(0.65rem, 1.1vw, 0.75rem)` | 交互提示 |
| `.lang-btn` | `clamp(0.75rem, 1.2vw, 0.85rem)` | 语言按钮 |
| `.nav-btn` | `clamp(1.1rem, 2vw, 1.3rem)` | 导航按钮 |

### 内容对齐规范

| 布局 | 对齐方式 | 说明 |
|------|---------|------|
| title | 居中 | 标题页，全部居中 |
| timeline | **左对齐** | `.slide-content .timeline-mini` 左对齐，标题居中 |
| cards | 居中（1张卡片时）+ 左对齐（多张时） | 卡片内容文字左对齐 |
| evidence | **左对齐** | 列表条目全部左对齐 |
| split | **左对齐** | 列表条目全部左对齐 |
| conclusion | **左对齐** | 结论条目左对齐 |
| grid3 | 居中 | 网格居中 |
| closing | 居中 | 结尾内容居中 |

**注意**：非标题页的 `.slide-content` 添加 `.text-left` 类：
- `.slide-content.text-left { align-items: flex-start; }`
- `.slide-content.text-left h2 { align-self: center; width: 100%; }`

### 各布局 HTML 模板

参考以下结构，**所有文本节点可加 `data-i18n`** 属性。

#### title 布局

```html
<div class="slide active" id="s1">
  <div class="slide-content">
    <span class="folio">{标签(可选)}</span>
    <div class="demo-logo">{LOGO}</div>
    <div class="headline">{主标题}</div>
    <div class="subhead">{副标题}</div>
    <div style="font-size:0.7rem;color:{颜色}">{署名}</div>
  </div>
</div>
```

#### timeline 布局

```html
<div class="slide" id="sN">
  <div class="slide-content text-left">
    <h2>{标题}</h2>
    <div class="timeline-mini">
      <div class="tl-item clickable" onclick="toggleTimeline(this)">
        <div class="tl-row">
          <span class="tl-num">0{N}</span>
          <span class="tl-label">{节点名}</span>
          <div class="tl-content">
            <div class="tl-title">{标题}</div>
            <div class="tl-text">{描述}</div>
          </div>
          <span class="tl-arrow">▶</span>
        </div>
        <div class="tl-detail">{展开详情}</div>
      </div>
      <!-- 更多节点... -->
    </div>
  </div>
</div>
```

#### cards 布局

```html
<div class="slide" id="sN">
  <div class="slide-content">
    <h2>{标题}</h2>
    <div class="card-grid">
      <div class="grid-card clickable" onclick="togglePillar(this)">
        <span class="gc-icon">{图标}</span>
        <span class="gc-label">{标题}</span>
        <span class="gc-desc">{说明}</span>
        <div class="pillar-detail">{展开详情}</div>
      </div>
      <!-- 更多卡片... -->
    </div>
  </div>
</div>
```

**注意**：当 cards 布局只有 1 张卡片时，使用 `max-width: 320px` + `margin: 0 auto` 居中显示。2 张及以上使用 2 列 grid 正常排列。grid-card 内部文字 `.gc-label` 和 `.gc-desc` 使用 `text-align: left`。

#### evidence 布局

```html
<div class="slide" id="sN">
  <div class="slide-content text-left">
    <h2>{标题}</h2>
    <div class="evidence-list">
      <div class="ev-card clickable" onclick="toggleCard(this)">
        <div class="ev-row">
          <span class="ev-icon">{图标}</span>
          <span class="ev-title">{标题}</span>
          <span class="ev-text">{摘要}</span>
          <span class="ev-arrow">▶</span>
        </div>
        <div class="ev-detail">{展开详情}</div>
      </div>
      <!-- 更多条目... -->
    </div>
  </div>
</div>
```

#### split 布局

```html
<div class="slide" id="sN">
  <div class="slide-content text-left">
    <h2>{标题}</h2>
    <div class="view-switcher">
      <button class="view-btn active" onclick="switchView('left')">{左标签}</button>
      <button class="view-btn" onclick="switchView('right')">{右标签}</button>
    </div>
    <div class="view-content active" id="view-left">
      <ul><li>{条目1}</li><li>{条目2}</li></ul>
    </div>
    <div class="view-content" id="view-right" style="display:none">
      <ul><li>{条目1}</li><li>{条目2}</li></ul>
    </div>
  </div>
</div>
```

#### conclusion 布局

```html
<div class="slide" id="sN">
  <div class="slide-content text-left">
    <h2>{标题}</h2>
    <div class="conclusion-list">
      <div class="conclusion-item">
        <div class="conclusion-row">
          <span class="conclusion-num">①</span>
          <div>
            <div class="conclusion-title">{标题}</div>
            <div class="conclusion-text">{说明}</div>
          </div>
        </div>
      </div>
      <!-- 更多结论... -->
    </div>
  </div>
</div>
```

#### grid3 布局

```html
<div class="slide" id="sN">
  <div class="slide-content">
    <h2>{标题}</h2>
    <div class="tech-grid">
      <div class="tech-card">
        <span class="tech-icon">{图标}</span>
        <span class="tech-name">{标题}</span>
        <span class="tech-desc">{说明}</span>
      </div>
      <!-- 更多技术条目... -->
    </div>
  </div>
</div>
```

#### closing 布局

```html
<div class="slide" id="sN">
  <div class="slide-content">
    <div class="closing-line">{结尾语}</div>
    <h1 class="closing-question"><span>{问题}</span></h1>
    <div class="closing-meta" onclick="revealEasterEgg()">{署名}</div>
    <div id="easter-egg">{彩蛋}</div>
  </div>
</div>
```

---

## 样式实现

### 核心 CSS

所有特效 CSS 见 `reference/` 目录（使用前内联到 `<style>` 中，不可用 @import）：

| 文件 | 内容 |
|------|------|
| `viewport-and-base.css` | 基础布局、视口适配、全局字号 |
| `effects/flip-system.css` | 翻页按钮、页码指示器、交互提示条 |
| `effects/hover-effects.css` | hover放大 + 布灵光晕扫过 |
| `effects/cursor-effects.css` | 鼠标光晕、核心亮点、粒子Canvas、波点 |
| `effects/animations.css` | 入场动画、打字动画 |
| `effects/i18n-switcher.css` | 中英切换按钮 |

### 风格 CSS 变量

每种风格直接写死在 CSS 中，不使用变量的方式（因为不依赖 Google Fonts）：

**墨金典藏**
```css
.nav-btn { border-color: rgba(232,203,122,0.2); background: rgba(26,46,42,0.6); color: #e8cb7a; }
.nav-btn:hover { background: rgba(232,203,122,0.12); box-shadow: 0 0 20px rgba(232,203,122,0.1); }
.page-dot { background: rgba(232,203,122,0.12); }
.page-dot.active { background: #e8cb7a; }
/* ...（完整定义见 reference/ 的风格示例） */
```

**赛博光晕**
```css
.nav-btn { border-color: rgba(167,139,250,0.2); background: rgba(10,14,39,0.6); color: #a78bfa; }
/* ... */
```

**象牙简约**
```css
.nav-btn { border-color: rgba(139,105,20,0.15); background: rgba(255,255,255,0.3); color: #8b6914; }
/* ... */
```

### 展开详情样式

```css
.tl-detail, .pillar-detail, .ev-detail {
  max-height: 0; overflow: hidden;
  transition: max-height 0.4s ease, opacity 0.3s ease;
  opacity: 0;
}
.tl-detail.open, .pillar-detail.open, .ev-detail.open {
  max-height: 300px; opacity: 1;
}
```

### 卡片展开箭头旋转

```css
.tl-arrow, .ev-arrow {
  transition: transform 0.3s ease;
  display: inline-block;
}
.tl-item.expanded .tl-arrow,
.ev-card.expanded .ev-arrow {
  transform: rotate(90deg);
}
```

---

## 阶段 4：生成完整 HTML

### 过场动画实现

根据用户选择的过场动画选项，修改翻页逻辑：

#### 选项 A：直接切换（visibility 瞬间切换）
```javascript
function go(i) {
  // 直接 visibility 切换
  slides[cur].style.visibility = 'hidden';
  slides[cur].style.zIndex = '0';
  slides[i].style.visibility = 'visible';
  slides[i].style.zIndex = '1';
  cur = i;
  triggerAnim(slides[i]);
  updatePage();
}
```

#### 选项 B：淡入淡出（默认）
```javascript
function go(i) {
  if (busy || i < 0 || i >= total || i === cur) return;
  busy = true;
  var outEl = slides[cur];
  outEl.style.transition = 'opacity 0.3s ease';
  outEl.style.opacity = '0';
  setTimeout(function() {
    outEl.style.visibility = 'hidden';
    outEl.style.zIndex = '0';
    slides[i].style.opacity = '0';
    slides[i].style.transition = 'opacity 0.4s ease';
    slides[i].style.visibility = 'visible';
    slides[i].style.zIndex = '1';
    void slides[i].offsetHeight;
    slides[i].style.opacity = '1';
    cur = i; busy = false;
    triggerAnim(slides[i]);
    updatePage();
  }, 300);
}
```

#### 选项 C：滑动翻页
```javascript
function go(i) {
  if (busy || i < 0 || i >= total || i === cur) return;
  busy = true;
  var dir = i > cur ? 1 : -1;
  slides[i].style.transform = 'translateX(' + (dir * 100) + 'vw)';
  slides[i].style.transition = 'none';
  slides[i].style.visibility = 'visible';
  slides[i].style.zIndex = '2';
  void slides[i].offsetHeight;
  slides[i].style.transition = 'transform 0.4s ease';
  slides[i].style.transform = 'translateX(0)';
  slides[cur].style.transition = 'transform 0.4s ease';
  slides[cur].style.transform = 'translateX(' + (-dir * 100) + 'vw)';
  setTimeout(function() {
    slides[cur].style.visibility = 'hidden';
    slides[cur].style.zIndex = '0';
    slides[cur].style.transform = '';
    slides[i].style.zIndex = '1';
    cur = i; busy = false;
    triggerAnim(slides[i]);
    updatePage();
  }, 450);
}
```

#### 选项 D：放大进入
```javascript
function go(i) {
  // 当前页淡出 + 新页从 scale(0.8) 放大到 scale(1)
  ...
}
```

**注意**：选项 B/C/D 需在幻灯片初始样式中加 `opacity: 0` 或 `transform: none`，且 visibility 切换逻辑需与过渡兼容。

### 图片插入

根据用户确认的图片计划，在对应位置插入 `<img>` 标签：

```html
<!-- 封面全屏背景 -->
<div class="slide" id="s1" style="background-image:url(https://...);background-size:cover;background-position:center;">
  <div class="slide-overlay" style="position:absolute;top:0;left:0;width:100%;height:100%;background:rgba(10,14,39,0.6);z-index:0;"></div>
  <div class="slide-content" style="position:relative;z-index:1;">
    ...
  </div>
</div>

<!-- 卡片内嵌图 -->
<div class="grid-card">
  <img src="https://..." style="width:100%;border-radius:8px;margin-bottom:0.4rem;">
  <span class="gc-label">...</span>
</div>
```

**图片要求**：
- 必须 HTTPS
- 压缩到 200KB 以下
- 使用 loading="lazy" 延迟加载
- 移动端响应式（max-width: 100%）

---

## 阶段 5：交付

1. **打包为 zip**：命名 `{演示名}-{页码}p-{风格}.zip`
2. **通过消息工具发送**（微信渠道用 filePath / mediaUrl）
3. **告知用户**：
   - 文件名 / 页数 / 风格名称 / 过场动画类型
   - 交互方式：左右按钮 / 键盘 / 滚轮 / 触摸滑动翻页
   - 点击卡片展开详情 / 双视图切换 / 打字动画
   - 右上角中英切换
   - 底部页码指示器
   - 底部交互提示（5秒后消失）
   - 鼠标特效：鼠标跟随光晕 + 核心亮点 + 粒子拖尾 + 点击水波纹
   - 是否含图片及图片数量

---

## 参考实现（reference/）

- `reference/viewport-and-base.css`
- `reference/effects/flip-system.css`
- `reference/effects/hover-effects.css`
- `reference/effects/cursor-effects.css`
- `reference/effects/animations.css`
- `reference/effects/i18n-switcher.css`
- `reference/js/presentation.js`

**所有 reference 文件是完整可用的实现模板**，生成 HTML 时内联使用，不加修改。

---

## 重要注意事项（必须遵守）

1. **不要用 `body{display:none}` 防闪屏** — 微信打开本地文件 JS 可能不执行，导致全页空白。改用 CSS 控制 `.slide.active { visibility: visible; z-index: 1; }`。
2. **不要用 `@import` / `url()` 外链** — 微信会拦截外链加载。全部使用系统后备字体，所有样式内联在 `<style>` 中。
3. **所有布局可自由组合** — 不限页数、不限顺序、不限数量、布局类型可重复使用。
4. **必须有中英切换** — 如果用户要求中英版，每个文本节点加 `data-i18n`，并注入完整的 `window.i18nData` 对照表和 `window.switchLang` 函数。
5. **交互提示条放置在底部** — 显示交互指引，5秒后自动淡出消失。
6. **页码指示器在底部** — 格式 `01 / 08`，翻页时 JS 更新。
7. **颜色层次必须定义完整** — 每套风格必须定义标题色、强调色、次级强调色、正文色、细节色五位一体。
8. **支持翻页方式** — 左右按钮、键盘左右/空格/下键、鼠标滚轮（800ms防抖）、触摸滑动（>50px 阈值）。
9. **字号必须放大一级** — 所有核心字号比常规大 0.3-0.5rem，微信移动端显示友好。**最小字号不得低于 0.65rem**。
10. **非标题页内容左对齐** — 时间线、证据列表、结论条目全部左对齐。卡片网格居中显示，卡片内部文字左对齐。
11. **单卡片居中** — cards 布局如果只有 1 张卡片，使用 `max-width: 320px; margin: 0 auto` 居中。
12. **触摸滑动翻页** — 必须使用 start + end 坐标差 >50px 阈值触发翻页。
13. **鼠标特效完整** — 光晕跟随（300px） + 核心亮点（8px） + Canvas 粒子拖尾（35粒上限，3粒/帧） + 点击水波纹 四点缺一不可。移动端隐藏。
14. **hover 布灵完整** — scale 放大 + 伪元素光晕扫过两点缺一不可。
15. **中英按钮绑定** — 右上角按钮需要有 `onclick="switchLang('zh')"` 和 `onclick="switchLang('en')"`，且 `switchLang` 函数在 presentation.js 中定义。
16. **翻页完整** — 翻页时必须有 fade out（0.3s）+ fade in（0.4s）+ 入场逐次渐入（120ms/个）的三段式动画。
17. **i18n 完整性校验** — 生成 HTML 后必须检查：`html_keys == js_keys`，确保每个 data-i18n 节点在 i18nData 中有对应英文。
18. **过场动画必须先问用户** — 未经用户选择过场类型，不能默认使用任何过渡效果。如果用户说「随你」，默认 B（淡入淡出）。
19. **图片必须用户确认后才搜索/插入** — 不能自行决定配图。AI 先列出配图计划，用户确认后再搜索/上传/插入。
20. **生成后在微信真机测试** — 所有特效需要在微信 WebView 中可正常渲染。Canvas 粒子、水波纹需要确认兼容。

---

## Credits

本 skill 的架构设计和风格预设体系参考了 [frontend-slides](https://clawhub.ai/skills/frontend-slides) skill。

核心交互系统和特效经过 OpenClaw AI 助手的多轮迭代开发与微信 WebView 兼容性验证，基于 SBTI 视觉叙事演示项目的真实开发过程提炼而成。

项目地址：https://github.com/BetsyCamilla/storyslide
