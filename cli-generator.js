#!/usr/bin/env node

/**
 * Google Gemini Academy Style Report & Workflow Generator
 * Converts JSON configurations into responsive, interactive, Google-styled HTML reports.
 */

const fs = require('fs');
const path = require('path');

function generateHtml(config) {
  const title = config.title || '워크플로우 보고서';
  const badge = config.badge || '✨ WORKFLOW & REPORT';
  const description = config.description || '';
  const meta = config.meta || [];
  const flowmap = config.flowmap || [];
  const cards = config.cards || [];
  const steps = config.steps || [];
  const checklist = config.checklist || [];

  return `<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${escapeHtml(title)}</title>
<link rel="stylesheet" href="fonts/pretendard.css">
<link rel="preconnect" href="https://cdn.jsdelivr.net" crossorigin>
<link rel="stylesheet" as="style" crossorigin
  href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.css">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;700;900&display=swap">
<style>
  :root {
    --cream: #ffffff; --cream-2: #f8f9fa; --paper: #ffffff;
    --navy: #243551; --navy-2: #34496b;
    --teal: #1e8e3e; --terra: #1967d2; --gold: #4a90e8;
    --ink: #202124; --muted: #7a7064; --line: #e8eaed;
    --shadow: 0 14px 40px rgba(36,53,81,.10);
    --blue: #1a73e8; --blue-s: #e8f0fe;
    --green: #1e8e3e; --green-s: #e6f4ea;
    --red: #d93025; --red-s: #fce8e6;
  }
  * { box-sizing: border-box; }
  html { -webkit-text-size-adjust: 100%; font-size: 17px; }
  body {
    margin: 0; background: #ffffff; color: var(--ink);
    font-family: "Pretendard Variable", "Pretendard", "Noto Sans KR", -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
    -webkit-font-smoothing: antialiased; line-height: 1.72;
  }
  .wrap { max-width: 1080px; margin: 0 auto; padding: 0 20px 80px; }

  /* ── 상단 히어로 헤더 ── */
  .hero { position: relative; text-align: center; padding: 56px 0 28px; }
  .hero::before {
    content: ""; position: absolute; inset: -40px 0 -10px; z-index: 0; pointer-events: none;
    background: radial-gradient(620px 360px at 20% 30%, rgba(233,242,255,.95) 0%, rgba(233,242,255,0) 70%),
                radial-gradient(560px 340px at 70% 20%, rgba(238,226,248,.85) 0%, rgba(238,226,248,0) 70%),
                radial-gradient(600px 360px at 80% 60%, rgba(224,236,252,.80) 0%, rgba(224,236,252,0) 70%);
  }
  .hero > * { position: relative; z-index: 1; }
  .stamp-badge {
    display: inline-flex; align-items: center; gap: 8px; color: #5f6368;
    padding: 7px 16px; border-radius: 999px; font-weight: 600; font-size: .84rem;
    letter-spacing: .08em; text-transform: uppercase; background: rgba(255,255,255,.82);
    box-shadow: 0 1px 3px rgba(60,64,67,.09); border: 1px solid rgba(60,64,67,.08);
  }
  .hero h1 {
    font-size: clamp(2.1rem, 4vw, 3rem); line-height: 1.22; margin: 20px 0 14px;
    color: var(--navy); font-weight: 700; letter-spacing: -.03em;
  }
  .hero h1 .hl {
    background: linear-gradient(100deg, #4a90e8 0%, #4aa8f5 38%, #ac87eb 70%, #ee4d5d 100%);
    -webkit-background-clip: text; background-clip: text; color: transparent;
  }
  .hero p { font-size: 1.08rem; color: var(--navy-2); max-width: 740px; margin: 0 auto; line-height: 1.7; }
  .meta-chips { display: flex; gap: 9px; justify-content: center; flex-wrap: wrap; margin-top: 22px; }
  .meta-chip {
    background: #fff; border: 1px solid var(--line); border-radius: 999px;
    padding: 7px 16px; font-size: .86rem; font-weight: 600; color: var(--navy-2);
    box-shadow: 0 1px 2px rgba(60,64,67,.06);
  }
  .meta-chip b { color: var(--terra); }

  /* ── 섹션 공통 ── */
  section { padding: 32px 0 20px; }
  .eyebrow {
    display: inline-flex; align-items: center; gap: 8px; font-size: .80rem;
    font-weight: 700; letter-spacing: .12em; text-transform: uppercase; color: #80868b; margin-bottom: 6px;
  }
  h2.sec { font-size: 1.52rem; margin: 0 0 6px; color: var(--navy); font-weight: 700; letter-spacing: -.02em; }
  .lead { font-size: 1rem; color: var(--muted); margin: 0 0 22px; }

  /* ── 1줄 흐름 지도 (Flow Map) ── */
  .flowmap { display: flex; align-items: stretch; flex-wrap: wrap; gap: 12px; margin-bottom: 36px; }
  .fstep {
    flex: 1 1 180px; min-width: 150px; display: flex; align-items: center; gap: 12px;
    background: linear-gradient(180deg, #ffffff, #f8f9fa); border: 1px solid rgba(33,123,254,.35);
    border-left: 4px solid var(--accent, #1967d2); border-radius: 16px; padding: 12px 14px;
    box-shadow: 0 4px 14px rgba(36,53,81,.06);
  }
  .fnum {
    flex: none; width: 30px; height: 30px; border-radius: 50%; display: grid; place-items: center;
    font-size: .86rem; font-weight: 700; color: #fff; background: var(--accent, #1967d2);
    box-shadow: 0 2px 6px rgba(36,53,81,.18);
  }
  .fmeta b { display: block; font-size: .95rem; color: var(--navy); line-height: 1.25; font-weight: 700; }
  .fmeta .ft { display: block; font-size: .78rem; color: var(--muted); margin-top: 2px; }
  .farrow { align-self: center; color: var(--terra); font-weight: 700; font-size: 1.2rem; }

  /* ── 3D 플립 카드 (Flip Cards) ── */
  .modgrid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 20px; }
  .flip { perspective: 1400px; cursor: pointer; }
  .flip-inner {
    position: relative; width: 100%; height: 280px;
    transition: transform .6s cubic-bezier(.2,.7,.2,1); transform-style: preserve-3d;
  }
  .flip.flipped .flip-inner { transform: rotateY(180deg); }
  .face {
    position: absolute; inset: 0; backface-visibility: hidden; -webkit-backface-visibility: hidden;
    display: flex; flex-direction: column; justify-content: space-between; border-radius: 20px; padding: 22px;
    background: radial-gradient(135% 95% at 50% -25%, rgba(255,255,255,.96), rgba(255,255,255,0) 60%),
                linear-gradient(157deg, #ffffff 0%, #f8f9fa 55%, #e8eaed 100%);
    box-shadow: 0 10px 28px rgba(36,53,81,.10), inset 0 0 0 1px rgba(33,123,254,.30);
    transition: box-shadow .3s ease, transform .3s ease;
  }
  .face::before {
    content: ""; position: absolute; left: 0; top: 0; bottom: 0; width: 6px; z-index: 2;
    background: linear-gradient(180deg, var(--accent, #1967d2), #4a90e8);
  }
  .face::after {
    content: ""; position: absolute; top: -60%; left: -85%; width: 55%; height: 220%;
    pointer-events: none; z-index: 3;
    background: linear-gradient(115deg, transparent 0%, rgba(255,255,255,.7) 50%, transparent 100%);
    transform: rotate(9deg); opacity: 0;
  }
  .flip:hover .face::after { animation: sheen 1.1s ease; }
  @keyframes sheen { 0%{left:-85%;opacity:0;} 15%{opacity:.95;} 100%{left:140%;opacity:0;} }
  .flip:hover .face { box-shadow: 0 20px 48px rgba(36,53,81,.18), inset 0 0 0 1px rgba(33,123,254,.6); }
  .back { transform: rotateY(180deg); }
  .flip.flipped .front { pointer-events: none; }
  .flip:not(.flipped) .back { pointer-events: none; }
  .card-badge {
    font-size: .74rem; font-weight: 700; letter-spacing: .15em;
    color: var(--accent, #1967d2); text-transform: uppercase;
  }
  .front h3 { margin: 12px 0 0; font-size: 1.36rem; color: var(--navy); font-weight: 700; line-height: 1.32; }
  .back .backbody { overflow: auto; }
  .back p { margin: 8px 0 12px; font-size: .90rem; color: var(--navy-2); line-height: 1.65; }
  .tags { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 8px; }
  .tag {
    font-size: .72rem; font-weight: 600; padding: 4px 10px; border-radius: 999px;
    color: var(--navy-2); background: #ffffff; border: 1px solid rgba(33,123,254,.35);
  }
  .flip-hint { text-align: center; font-size: .76rem; font-weight: 600; color: var(--muted); }

  /* ── 상세 실행 단계 (Step Cards) ── */
  .step-list { display: flex; flex-direction: column; gap: 18px; margin-top: 14px; }
  .step-card {
    background: #ffffff; border: 1px solid var(--line); border-radius: 22px;
    padding: 24px 26px; box-shadow: 0 2px 6px rgba(60,64,67,.06);
    transition: border-color .2s, box-shadow .2s;
  }
  .step-card:hover { border-color: #c6dafc; box-shadow: 0 8px 24px rgba(36,53,81,.08); }
  .step-card.done { border-color: #a8dab5; background: #fafdfb; }
  .step-top {
    display: flex; align-items: center; justify-content: space-between; gap: 14px;
    cursor: pointer; user-select: none;
  }
  .step-title-group { display: flex; align-items: center; gap: 14px; flex-wrap: wrap; }
  .step-num {
    width: 34px; height: 34px; border-radius: 50%; background: #1967d2; color: #fff;
    display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: .95rem;
  }
  .step-card.done .step-num { background: var(--green); }
  .step-title { margin: 0; font-size: 1.18rem; font-weight: 700; color: var(--navy); }
  .tool-tag {
    font-size: .74rem; font-weight: 700; padding: 4px 11px; border-radius: 999px;
    background: var(--blue-s); color: var(--terra);
  }
  .tool-tag.gemini { background: #e8f0fe; color: #1967d2; }
  .tool-tag.gas { background: #e6f4ea; color: #137333; }
  .tool-tag.slack { background: #fce8e6; color: #c5221f; }
  .done-btn {
    font-family: inherit; font-size: .82rem; font-weight: 700; padding: 6px 14px;
    border-radius: 999px; border: 1px solid var(--line); background: #fff; color: var(--navy-2);
    cursor: pointer; transition: .16s;
  }
  .done-btn:hover { background: var(--cream-2); }
  .step-card.done .done-btn { background: var(--green); color: #fff; border-color: var(--green); }
  .step-body { margin-top: 18px; padding-top: 16px; border-top: 1px solid var(--line); }
  .step-goal { font-size: .92rem; font-weight: 700; color: var(--terra); margin-bottom: 10px; }
  .step-desc { font-size: .95rem; color: var(--navy-2); margin-bottom: 14px; }
  .prompt-box {
    position: relative; background: #f8f9fa; border: 1px solid #dadce0;
    border-radius: 14px; padding: 18px; margin: 12px 0;
  }
  .prompt-box pre {
    margin: 0; font-family: ui-monospace, SFMono-Regular, "Pretendard Variable", monospace;
    font-size: .88rem; line-height: 1.68; white-space: pre-wrap; word-break: break-all; color: #202124;
  }
  .copy-btn {
    position: absolute; top: 12px; right: 12px;
    font-family: inherit; font-size: .78rem; font-weight: 700; padding: 6px 12px;
    border-radius: 8px; border: 1px solid #dadce0; background: #fff; color: var(--navy-2);
    cursor: pointer; transition: .16s; box-shadow: 0 1px 2px rgba(60,64,67,.06);
  }
  .copy-btn:hover { background: var(--blue-s); border-color: #c6dafc; color: var(--terra); }
  .tip-box {
    background: var(--blue-s); border-radius: 12px; padding: 12px 16px;
    font-size: .88rem; color: #174ea6; margin-top: 12px; line-height: 1.6;
  }

  /* ── 체크리스트 ── */
  .checklist-card {
    background: #fff; border: 1px solid var(--line); border-radius: 20px;
    padding: 24px; box-shadow: 0 2px 6px rgba(60,64,67,.06);
  }
  .check-item {
    display: flex; align-items: center; gap: 12px; padding: 10px 0;
    border-bottom: 1px solid #f1f3f4; font-size: .95rem; color: var(--navy-2); cursor: pointer;
  }
  .check-item:last-child { border-bottom: none; }
  .check-item input[type="checkbox"] {
    width: 20px; height: 20px; accent-color: var(--terra); cursor: pointer;
  }

  /* ── 푸터 ── */
  footer {
    text-align: center; color: var(--muted); font-size: .85rem;
    padding: 40px 0 20px; border-top: 1px solid var(--line); margin-top: 50px;
  }

  /* ── 하단 시그니처 구글 컬러 바 ── */
  body::after {
    content: ""; position: fixed; left: 0; right: 0; bottom: 0; height: 3px; z-index: 9999; pointer-events: none;
    background: linear-gradient(90deg, #3186ff 0%, #3186ff 24%, #2b8ee7 33%, #1fa1ad 41%, #12b572 50%, #91c52b 58%, #ffae0e 66%, #ff6c2e 75%, #c85774 84%, #4380ee 93%, #3186ff 100%);
  }
  @media (max-width: 640px) {
    .fstep { flex: 1 1 100%; }
    .farrow { width: 100%; text-align: center; transform: rotate(90deg); }
  }
</style>
</head>
<body>

<div class="wrap">

  <header class="hero">
    <span class="stamp-badge">${escapeHtml(badge)}</span>
    <h1>${formatTitle(title)}</h1>
    <p>${escapeHtml(description)}</p>
    ${meta.length ? `
    <div class="meta-chips">
      ${meta.map(m => `<span class="meta-chip"><b>${escapeHtml(m.label)}:</b> ${escapeHtml(m.value)}</span>`).join('')}
    </div>` : ''}
  </header>

  ${flowmap.length ? `
  <!-- 1줄 흐름 지도 -->
  <section>
    <div class="eyebrow">PROCESS FLOW</div>
    <h2 class="sec">🗺️ 전체 진행 흐름</h2>
    <p class="lead">단계별 핵심 목표와 산출물입니다.</p>
    <div class="flowmap">
      ${flowmap.map((f, i) => `
      <div class="fstep" style="--accent: ${escapeHtml(f.color || '#1967d2')}">
        <span class="fnum">${escapeHtml(f.num || String(i + 1))}</span>
        <div class="fmeta">
          <b>${escapeHtml(f.title)}</b>
          <span class="ft">${escapeHtml(f.desc)}</span>
        </div>
      </div>
      ${i < flowmap.length - 1 ? '<span class="farrow">→</span>' : ''}
      `).join('')}
    </div>
  </section>` : ''}

  ${cards.length ? `
  <!-- 3D 플립 카드 그리드 -->
  <section>
    <div class="eyebrow">OVERVIEW CARDS</div>
    <h2 class="sec">📌 핵심 모듈 &amp; 테마</h2>
    <p class="lead">카드를 클릭하면 상세한 세부 계획과 R&amp;R을 볼 수 있습니다.</p>
    <div class="modgrid">
      ${cards.map(c => `
      <div class="flip" style="--accent: ${escapeHtml(c.color || '#1967d2')}">
        <div class="flip-inner">
          <div class="face front">
            <div>
              <span class="card-badge">✦ ${escapeHtml(c.badge || 'MODULE')}</span>
              <h3>${escapeHtml(c.frontTitle)}</h3>
            </div>
            <div class="tags">
              ${(c.tags || []).map(t => `<span class="tag">${escapeHtml(t)}</span>`).join('')}
            </div>
            <div class="flip-hint">카드를 누르면 상세 내용 ↻</div>
          </div>
          <div class="face back">
            <div class="backbody">
              <span class="card-badge">✦ ${escapeHtml(c.badge || 'MODULE')}</span>
              <p>${escapeHtml(c.backDesc)}</p>
            </div>
            <div class="flip-hint">카드를 누르면 앞면으로 ↻</div>
          </div>
        </div>
      </div>
      `).join('')}
    </div>
  </section>` : ''}

  ${steps.length ? `
  <!-- 상세 실행 가이드 (스텝별 프롬프트 및 코드) -->
  <section>
    <div class="eyebrow">STEP-BY-STEP WORKFLOW</div>
    <h2 class="sec">🛠️ 단계별 실행 및 프롬프트</h2>
    <p class="lead">각 단계의 프롬프트와 스크립트를 복사하여 바로 실행하세요.</p>
    <div class="step-list">
      ${steps.map((s, idx) => `
      <div class="step-card" id="stepCard_${idx}">
        <div class="step-top" onclick="toggleStep(${idx})">
          <div class="step-title-group">
            <div class="step-num">${escapeHtml(s.num || String(idx + 1))}</div>
            <h3 class="step-title">${escapeHtml(s.title)}</h3>
            ${s.tool ? `<span class="tool-tag ${escapeHtml(s.toolClass || 'gemini')}">${escapeHtml(s.tool)}</span>` : ''}
          </div>
          <button class="done-btn" onclick="event.stopPropagation(); toggleDone(${idx})">완료 체크</button>
        </div>
        <div class="step-body" id="stepBody_${idx}">
          ${s.goal ? `<div class="step-goal">${escapeHtml(s.goal)}</div>` : ''}
          ${s.desc ? `<div class="step-desc">${escapeHtml(s.desc)}</div>` : ''}
          ${s.prompt ? `
          <div class="prompt-box">
            <button class="copy-btn" onclick="copySnippet(this)">복사</button>
            <pre>${escapeHtml(s.prompt)}</pre>
          </div>` : ''}
          ${s.tip ? `<div class="tip-box">${escapeHtml(s.tip)}</div>` : ''}
        </div>
      </div>
      `).join('')}
    </div>
  </section>` : ''}

  ${checklist.length ? `
  <!-- 최종 점검 체크리스트 -->
  <section>
    <div class="eyebrow">FINAL CHECKLIST</div>
    <h2 class="sec">✅ 최종 점검 항목</h2>
    <div class="checklist-card">
      ${checklist.map((item, i) => `
      <label class="check-item">
        <input type="checkbox" onchange="saveChecklist(${i}, this.checked)" id="check_${i}">
        <span>${escapeHtml(item)}</span>
      </label>
      `).join('')}
    </div>
  </section>` : ''}

  <footer>
    ${escapeHtml(title)} · Generated with Gemini Style Workflow Studio
  </footer>

</div>

<script>
  // ── 3D 플립 카드 인터랙션 ──
  document.querySelectorAll('.flip').forEach(function(card){
    card.addEventListener('click', function(){ card.classList.toggle('flipped'); });
  });

  // ── 스텝 접기/펴기 ──
  function toggleStep(idx){
    var body = document.getElementById('stepBody_' + idx);
    if(body){ body.style.display = (body.style.display === 'none') ? 'block' : 'none'; }
  }

  // ── 스텝 완료 토글 및 로컬 스토리지 저장 ──
  var STORAGE_KEY = 'wf_' + location.pathname + '_done';
  var doneState = {};
  try { doneState = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}'); } catch(e){}

  function applyDoneState(){
    for(var k in doneState){
      var el = document.getElementById('stepCard_' + k);
      if(el && doneState[k]){
        el.classList.add('done');
        var btn = el.querySelector('.done-btn');
        if(btn) btn.textContent = '✓ 완료됨';
      }
    }
  }
  applyDoneState();

  function toggleDone(idx){
    var el = document.getElementById('stepCard_' + idx);
    if(!el) return;
    doneState[idx] = !doneState[idx];
    el.classList.toggle('done', doneState[idx]);
    var btn = el.querySelector('.done-btn');
    if(btn) btn.textContent = doneState[idx] ? '✓ 완료됨' : '완료 체크';
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(doneState)); } catch(e){}
  }

  // ── 프롬프트 복사 기능 ──
  function copySnippet(btn){
    var pre = btn.parentElement.querySelector('pre');
    if(!pre) return;
    navigator.clipboard.writeText(pre.innerText).then(function(){
      var orig = btn.textContent;
      btn.textContent = '✅ 복사 완료';
      setTimeout(function(){ btn.textContent = orig; }, 1800);
    }).catch(function(){
      btn.textContent = '⚠️ 복사 실패';
    });
  }

  // ── 체크리스트 상태 저장 ──
  var CHECK_KEY = 'wf_' + location.pathname + '_checks';
  var checkState = {};
  try { checkState = JSON.parse(localStorage.getItem(CHECK_KEY) || '{}'); } catch(e){}
  for(var c in checkState){
    var cb = document.getElementById('check_' + c);
    if(cb) cb.checked = !!checkState[c];
  }
  function saveChecklist(idx, checked){
    checkState[idx] = checked;
    try { localStorage.setItem(CHECK_KEY, JSON.stringify(checkState)); } catch(e){}
  }
</script>

</body>
</html>`;
}

function escapeHtml(str) {
  if (typeof str !== 'string') return '';
  return str.replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
}

function formatTitle(title) {
  // If title has a dot or dash or colon, make the second part highlighted
  const parts = title.split(/[·:]/);
  if (parts.length > 1) {
    return `${escapeHtml(parts[0].trim())} <span class="hl">${escapeHtml(parts.slice(1).join(' · ').trim())}</span>`;
  }
  return escapeHtml(title);
}

// ── CLI Execution ──
if (require.main === module) {
  const args = process.argv.slice(2);
  const inputFile = args[0] || 'sample-workflow.json';
  const outputFile = args[1] || 'workflow-report.html';

  if (!fs.existsSync(inputFile)) {
    console.error(`❌ Input file not found: ${inputFile}`);
    process.exit(1);
  }

  const jsonContent = JSON.parse(fs.readFileSync(inputFile, 'utf-8'));
  const htmlResult = generateHtml(jsonContent);
  fs.writeFileSync(outputFile, htmlResult, 'utf-8');
  console.log(`✅ Successfully generated report: ${outputFile} (Size: ${htmlResult.length} bytes)`);
}

module.exports = { generateHtml };
