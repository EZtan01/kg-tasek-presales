# 🚀 KG Bukit Indah Pre-Sales — 操作指南

> 这是给你的 step-by-step 启动文件。10 分钟内你就能在浏览器看到 page。

---

## 你今天要做的事 (15-20 分钟)

### 第 1 步：打开 Terminal 准备 project (1 分钟)

打开 Mac Terminal，复制下面 3 行贴进去（一行一行 enter）：

```bash
cd ~/Documents
mkdir kg-presales
cd kg-presales
```

### 第 2 步：把 PROJECT.md 放进 project (30 秒)

下载我刚给你的 `PROJECT.md`，把它放到 `~/Documents/kg-presales/` 文件夹里。

或者用 Terminal：
```bash
# 假设 PROJECT.md 在 Downloads
mv ~/Downloads/PROJECT.md .
```

### 第 3 步：启动 Claude Code (10 秒)

在 Terminal 里跑：
```bash
claude
```

### 第 4 步：让 Claude Code 读 PROJECT.md 然后开始 build (10 分钟)

把下面这一整段复制贴进 Claude Code：

```
Read the PROJECT.md file in this directory first. That's the complete spec for the Kampung Gym Bukit Indah Pre-Sales landing page.

After reading it, build the entire project from scratch:

1. Set up Vite + React + TypeScript + Tailwind CSS v3 in this directory
2. Install lucide-react and react-router-dom
3. Configure Google Fonts (Anton, Public Sans, Montserrat) in index.html
4. Configure Tailwind with the brand colors and fonts from PROJECT.md
5. Create the folder structure:
   - src/components/
   - src/sections/
   - src/config/translations.ts (with ALL content from PROJECT.md sections 7)
   - src/hooks/useTranslation.ts
   - src/hooks/useTracking.ts
   - src/utils/appendUTMs.ts
6. Build all 12 sections from PROJECT.md section 5 (navbar, hero, value band, why grid, how-to steps, timeline, faq, gallery, final CTA, footer, floating sticky desktop CTA, mobile sticky bottom bar)
7. Make sure ALL display text comes from translations.ts — no hardcoded strings in components
8. Implement the 3-language toggle (EN/中文/BM) with localStorage persistence and <html lang> update
9. Add Meta Pixel + TikTok Pixel placeholder comments in index.html head (TODO comments only, no real IDs)
10. Add SEO meta tags from PROJECT.md section 9
11. Use placeholder images for /public/photos/ — paths should reference hero.jpg, gallery-1.jpg through gallery-4.jpg, og-image.jpg. If files don't exist, show diagonal-striped placeholder boxes.
12. Initialize git, add a .gitignore (node_modules, dist, .env, .DS_Store), make first commit "Initial KG Bukit Indah pre-sales page"
13. Run `npm install` then `npm run dev` and tell me the local URL

When done, give me:
- The dev server URL (usually http://localhost:5173)
- A summary of what got built
- The exact path to translations.ts (so I know where to edit text)
- The next 3 things I should do (the TODOs from PROJECT.md section 12)

If you have to make any decisions not specified in PROJECT.md, choose the reasonable default and tell me at the end what you assumed.
```

Claude Code 接下来会自己工作 5-10 分钟。它会问你"yes/no" 之类的小问题，看到就回 `yes` 或 enter。

### 第 5 步：在浏览器看 page (1 分钟)

Claude Code 跑完后会给你一个 URL，通常是 `http://localhost:5173`。复制到浏览器打开 → 你的 page 在那里。

切换语言、滚动、点 button — 都试一下。

### 第 6 步：截图回来跟我说 (1 分钟)

打开新一轮跟我的对话，发 page 的截图过来，我帮你 review 有没有什么要调整。

---

## 之后改东西的标准流程

每次要改任何东西，5 步骤：

### 1. 进 project 文件夹
```bash
cd ~/Documents/kg-presales
```

### 2. 启动 Claude Code
```bash
claude
```

### 3. 用中文/英文告诉它要改什么
例子：
- "Change the hero subhead to '...'"
- "Add a new FAQ: Q: 'Can I use other branches?' A: 'During pre-sales period, you can only use Bukit Indah branch.'"
- "Update WhatsApp number from 60XXXXXXXXX to 60123456789"
- "Replace gallery placeholders with /photos/austin-1.jpg through /photos/austin-4.jpg"

### 4. 看效果
Claude Code 改完后，dev server 自动 reload。回去浏览器 refresh 看看。

### 5. Push 上线
满意了就：
```bash
git add -A
git commit -m "改了什么"
git push
```
Vercel 自动 deploy（你之后会设定 Vercel — 见下面）。

---

## 部署到 Vercel（page build 好之后再做这步）

### 1. Push 到 GitHub

去 github.com/new 开一个新 repo 叫 `kg-bukit-indah-presales`（不要勾 README）。

然后在 Terminal：
```bash
git remote add origin https://github.com/[你的 GitHub username]/kg-bukit-indah-presales.git
git branch -M main
git push -u origin main
```

### 2. Connect Vercel

1. 去 vercel.com → Login with GitHub
2. New Project → Import 你刚刚 push 的 repo
3. Framework Preset: **Vite** (auto-detected)
4. Build Command: `npm run build`
5. Output Directory: `dist`
6. Click Deploy
7. 1 分钟后拿到 URL: `kg-bukit-indah-presales.vercel.app`

之后每次 `git push`，Vercel 自动重新 deploy。

---

## 常用 Terminal 命令速查

| 想做的事 | 命令 |
|---|---|
| 进 project | `cd ~/Documents/kg-presales` |
| 启动 Claude Code | `claude` |
| 启动 dev server (看 page) | `npm run dev` |
| 停止 dev server | `Ctrl + C` |
| Push 上线 | `git add -A && git commit -m "..." && git push` |
| 看现在哪个文件改了 | `git status` |

---

## 卡住怎么办

**Claude Code 给我 error / 看不懂**
→ 复制 error 贴回去 Claude Code，说 "fix this"。它通常自己能修。

**dev server 没反应**
→ 关掉 Terminal，重新开，再跑 `npm run dev`

**改完没看到变化**
→ 浏览器 hard refresh (Cmd + Shift + R)

**我搞坏了想退回去**
→ 在 Terminal 跑 `git status` 看改了什么，然后 `git checkout .` 退回最后一次 commit
→ 或者跟 Claude Code 说 "undo the last change"

**完全乱了**
→ 回来这个 chat 跟我说，发截图 + error message

---

## 文件管理

你的 project 在 `~/Documents/kg-presales/`，长这样：

```
kg-presales/
├── PROJECT.md              ← 项目说明书 (永远 reference)
├── src/
│   ├── config/
│   │   └── translations.ts ← 90% 的内容编辑在这个档
│   ├── components/         ← UI 组件
│   ├── sections/           ← 各 section
│   └── ...
├── public/
│   └── photos/             ← 放你的照片
├── package.json
└── ...
```

**你最常碰的档：** `src/config/translations.ts` — 改文字、改 FAQ、改翻译都在这里。

**最不要乱碰的档：** `package.json`, `vite.config.ts`, `tsconfig.json` — 这些是设定档。

---

## 当你要 deploy 之前的最后 checklist

照着 PROJECT.md section 12 的 TODO 来检查：

- [ ] WhatsApp 号码替换 (`60XXXXXXXXX` → 真实号码)
- [ ] App store smart link 替换
- [ ] Meta Pixel ID 加进 index.html
- [ ] TikTok Pixel ID 加进 index.html
- [ ] 5 张照片放进 `/public/photos/`
- [ ] IG/FB/TikTok 真实 handle
- [ ] 测试 3 种语言切换
- [ ] 手机看一遍 (sticky bottom bar 有没有 ok)
- [ ] UTM 测试（在 URL 后面加 `?utm_source=test`，点 CTA，看 link 有没有带过去）

---

## 跟我合作的方式

**问技术问题问 Claude Code** (在 Terminal 里):
- "怎么改 X"
- "这个 error 怎么修"
- "加一个 X section"

**问策略问题问我** (回来这个 chat):
- "Ad copy 怎么写"
- "下一步要做什么"
- "竞争对手在做 X，要不要学"
- "数据出来了，怎么调"

我有 memory 记得我们的对话，你回来直接跟我说"KG 的 page" 我就懂 context。

---

## 现在 action

1. ✅ 下载 `PROJECT.md`，放到 `~/Documents/kg-presales/`
2. ✅ 在 Terminal 跑 `cd ~/Documents/kg-presales && claude`
3. ✅ 把上面"第 4 步"那一整段大 prompt 贴进 Claude Code
4. ✅ 等它跑完
5. ✅ 看 page，截图回来给我看

去吧 🚀
