# JointLight 项目网页

独立静态网页，默认英文，右上角可切换中文。无需安装前端依赖，无需构建，图片、视频、论文均为本地文件。

## 预览

- 最简单：用浏览器打开 `index.html`，可以查看正文、切换视频和实验结果。
- 推荐：Mac 双击 `start_preview.command`。它会启动仅本机可访问的预览服务，并自动打开浏览器。终端按 Ctrl+C 关闭。
- 或者进入本目录运行：`python3 preview.py`。需要 Python 3；自动选择可用端口，默认为 8765。
- 使用本地服务时，视频支持进度拖动与按需读取。直接打开 HTML 时，浏览器的剪贴板策略可能不同；可下载 `citation.bib`。

## 目录

- `index.html`：页面结构、中英文正文、作者信息。
- `styles.css`：桌面与移动端样式。
- `app.js`：语言、视频、实验基准切换，图片放大，BibTeX 复制。
- `assets/images/`：概览图、方法图、数据图与视频封面。
- `assets/videos/`：四个完整展示片段，已优化 MP4 元数据位置以便网页加载。
- `assets/paper/JointLight.pdf`：论文原文。
- `citation.bib`：BibTeX 引用。
- `preview.py` / `start_preview.command`：本地预览工具。
- `SOURCE_NOTES.md`：素材与数值来源、待补充项目。

## 常用修改

- 中英文内容：编辑 `index.html` 中成对的 `data-lang="en"` 与 `data-lang="zh"`。
- 视频标题、说明、文件名：编辑 `app.js` 的 `videos` 对象。
- 指标数据与基准说明：编辑 `app.js` 的 `benchmarks` 对象。
- 视频文件替换后，保持原文件名即可；封面在 `assets/images/` 下对应同名 JPG。
- 数据集链接目前是禁用占位，确定链接后把首页对应按钮改成 `<a>` 链接。
- GitHub 使用最新宣传稿中的 `https://github.com/IGLICT/JointLight`，未预设仓库内容已发布。

## 发布

整个目录可放到 GitHub Pages 或其他静态站点服务，入口为 `index.html`。不需要上传开发过程中任何上级目录。部署到确定域名后，可在 HTML 中补充 canonical URL 和绝对地址的 Open Graph 图片链接。当前版本没有在线推理接口。
