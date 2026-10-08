/* Local-first: no framework, build step, network API, or external assets. */
'use strict';
const $ = selector => document.querySelector(selector);
const $$ = selector => [...document.querySelectorAll(selector)];
let language = 'en';
let currentVideo = 'static';
let currentBenchmark = 'SynthDynamic';
const videos = {
  static: {file:'01_static_comparison', en:['Static lighting comparisons','JointLight responds to target lighting while preserving scene content. Compare the dancer and cat examples with DiffusionRenderer and UniRelight.'], zh:['静态光照对比','JointLight 在响应目标光照的同时保留场景内容。舞者与猫的案例与 DiffusionRenderer、UniRelight 并排展示。']},
  dynamic: {file:'02_dynamic_comparison', en:['Motion and changing illumination','The target environment map rotates while the subject moves. The comparison tests whether light direction and local shading follow the changing environment.'], zh:['人物运动与动态照明','人物运动的同时，目标环境光持续旋转。通过并排对比，观察光照方向与局部明暗能否跟随目标环境变化。']},
  shading: {file:'04_shading', en:['RGB and irradiance, generated together','The refined irradiance video exposes the lighting structure behind the relit result. Both outputs are generated jointly from the input video and target illumination.'], zh:['同时生成 RGB 与辐照度','精细化辐照度展示重光照画面背后的受光结构。两种输出根据输入视频与目标照明联合生成。']},
  more: {file:'03_more_results', en:['More scenes. More lighting conditions.','Real-world examples span different motions, clothing, and backgrounds. Multiple target environment maps produce different lighting while retaining the input scene.'], zh:['更多场景与目标照明','真实视频案例覆盖不同人物动作、服装与背景。同一输入在不同目标环境光下生成不同光影，并尽量保留原有场景内容。']}
};
const benchmarks = {
  SynthDynamic:{rows:[['DiffusionRenderer (Cosmos)',13.48,.589,.345],['UniRelight',14.90,.602,.303],['JointLight',16.39,.631,.263]],best:[2,2,2],en:['Synthetic videos with rotating target lighting. Both scene motion and illumination change over time.','JointLight achieves the best PSNR, SSIM, and LPIPS among all methods evaluated in the paper.'],zh:['合成视频中的目标环境光随时间旋转，场景运动与照明变化同时发生。','JointLight 的 PSNR、SSIM 与 LPIPS 均为论文参与比较的方法中的最佳。']},
  SynthStatic:{rows:[['DiffusionRenderer (Cosmos)',15.27,.615,.306],['UniRelight',15.83,.661,.288],['JointLight',16.62,.656,.251]],best:[2,1,2],en:['Synthetic videos with fixed target lighting. The scene and subject remain dynamic.','JointLight has the best PSNR and LPIPS among evaluated methods. UniRelight has slightly higher SSIM (0.661 vs. 0.656).'],zh:['目标环境光保持固定的合成视频；场景与人物仍然包含运动。','JointLight 的 PSNR 与 LPIPS 最优；UniRelight 的 SSIM 略高（0.661 vs. 0.656）。']},
  HumanOLAT:{rows:[['DiffusionRenderer',22.32,.912,.114],['UniRelight',19.54,.871,.136],['JointLight',23.89,.928,.078]],best:[2,2,2],en:['Cross-dataset evaluation on real captured static images. HumanOLAT is not used for training.','Evaluation uses foreground masks and no per-channel rescaling. JointLight is best on all three metrics among evaluated methods; this is a static-image benchmark.'],zh:['真实采集静态图像上的跨数据集评估，HumanOLAT 未用于训练。','评估采用前景掩膜，不进行逐颜色通道缩放。JointLight 三项指标均最优；该实验为静态图像基准。']}
};
function renderVideoText(){const v=videos[currentVideo][language];$('#video-title').textContent=v[0];$('#video-description').textContent=v[1];}
function renderMetrics(){
 const b=benchmarks[currentBenchmark];
 $('#benchmark-description').textContent=b[language][0];
 $('#benchmark-note').textContent=b[language][1];
 $('#benchmark-caption').textContent=currentBenchmark+(language==='zh'?' 重光照评估':' relighting evaluation');
 $('#metric-rows').replaceChildren(...b.rows.map((row,i)=>{
  const tr=document.createElement('tr');if(i===2)tr.className='ours';
  const th=document.createElement('th');th.scope='row';th.textContent=row[0];tr.append(th);
  row.slice(1).forEach((n,j)=>{const td=document.createElement('td');const value=n.toFixed(j===0?2:3);if(b.best[j]===i){const strong=document.createElement('strong');strong.textContent=value;td.append(strong);}else td.textContent=value;tr.append(td);});return tr;
 }));
}
function setLanguage(lang){
 language=lang==='zh'?'zh':'en';document.documentElement.lang=language==='zh'?'zh-CN':'en';
 $('#language').innerHTML=language==='en'?'中文 <span aria-hidden="true">↗</span>':'EN <span aria-hidden="true">↗</span>';
 $('#language').setAttribute('aria-label',language==='en'?'切换至中文':'Switch to English');
 try{localStorage.setItem('jointlight-language',language);}catch{}
 renderVideoText();renderMetrics();$('#copy-status').textContent='';
}
try{language=localStorage.getItem('jointlight-language')||'en';}catch{}
setLanguage(language);
$('#language').addEventListener('click',()=>setLanguage(language==='en'?'zh':'en'));
function setTab(group,button){$$(group+' [role="tab"]').forEach(b=>{const active=b===button;b.setAttribute('aria-selected',String(active));b.tabIndex=active?0:-1;});}
$$('[data-video]').forEach(button=>button.addEventListener('click',()=>{
 const player=$('#showcase');const wasPlaying=!player.paused;
 player.pause();currentVideo=button.dataset.video;setTab('.video-tabs',button);
 $('#video-panel').setAttribute('aria-labelledby',button.id);
 const path=videos[currentVideo].file;
 player.poster=`assets/images/${path}.jpg`;player.querySelector('source').src=`assets/videos/${path}.mp4`;player.load();
 $('#video-download').href=`assets/videos/${path}.mp4`;renderVideoText();
 if(wasPlaying)player.play().catch(()=>{});
}));
$$('[data-benchmark]').forEach(button=>button.addEventListener('click',()=>{currentBenchmark=button.dataset.benchmark;setTab('.benchmark-tabs',button);$('#metric-panel').setAttribute('aria-labelledby',button.id);renderMetrics();}));
$$('[role="tablist"]').forEach(list=>list.addEventListener('keydown',event=>{
 if(!['ArrowLeft','ArrowRight','Home','End'].includes(event.key))return;
 const tabs=[...list.querySelectorAll('[role="tab"]')];let i=tabs.indexOf(document.activeElement);if(i<0)return;
 event.preventDefault();i=event.key==='Home'?0:event.key==='End'?tabs.length-1:(i+(event.key==='ArrowRight'?1:-1)+tabs.length)%tabs.length;
 tabs[i].focus();tabs[i].click();
}));
$('#showcase').addEventListener('error',()=>{$('#video-description').textContent=language==='zh'?'视频暂时无法播放，请尝试下方下载链接。':'The video could not be loaded. Try the download link below.';});
let previousFocus=null;
$$('[data-zoom]').forEach(button=>button.addEventListener('click',()=>{
 previousFocus=button;$('#full-figure').src=button.dataset.zoom;$('#full-figure').alt=button.querySelector('img').alt;
 $('#figure-dialog').showModal();document.body.style.overflow='hidden';
}));
$('#close-figure').addEventListener('click',()=>$('#figure-dialog').close());
$('#figure-dialog').addEventListener('click',event=>{if(event.target===$('#figure-dialog'))$('#figure-dialog').close();});
$('#figure-dialog').addEventListener('close',()=>{document.body.style.overflow='';previousFocus?.focus({preventScroll:true});});
$('#copy-citation').addEventListener('click',async()=>{
 const value=$('#bibtex').textContent;let copied=false;
 try{await navigator.clipboard.writeText(value);copied=true;}catch{
  const area=document.createElement('textarea');area.value=value;area.style.cssText='position:fixed;left:-9999px;top:0';document.body.append(area);area.select();
  try{copied=document.execCommand('copy');}catch{}area.remove();$('#copy-citation').focus({preventScroll:true});
 }
 $('#copy-status').textContent=copied?(language==='zh'?'已复制引用信息。':'Citation copied.'):(language==='zh'?'请选中上方引用文字复制，或下载 BibTeX 文件。':'Select the citation to copy it, or download the BibTeX file.');
});
if('IntersectionObserver' in window){
 const links=$$('nav a');const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){links.forEach(link=>link.classList.toggle('active',link.hash==='#'+entry.target.id));}});},{rootMargin:'-15% 0px -60% 0px'});
 ['overview','results','method','data','evaluation'].forEach(id=>observer.observe(document.getElementById(id)));
}
