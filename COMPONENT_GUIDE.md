# 🎨 Google Gemini 스타일 컴포넌트 & 디자인 시스템 가이드

이 문서는 본 프로젝트의 **Google/Gemini 톤 앤 매너(디자인 시스템)**를 활용하여, 새로운 보고서나 워크플로우 페이지를 직접 손쉽게 제작하거나 커스텀할 수 있도록 정리한 개발자/작성자 가이드입니다.

---

## 1. 디자인 시스템 토큰 (CSS Variables)

모든 페이지의 기본 컬러 및 테마 팔레트는 CSS 변수로 관리됩니다:

```css
:root {
  /* 구글 시그니처 컬러 */
  --blue: #1a73e8;       /* Primary Blue */
  --blue-d: #174ea6;     /* Dark Blue */
  --blue-s: #e8f0fe;     /* Soft Blue Tint */
  --red: #d93025;        /* Red */
  --red-s: #fce8e6;      /* Soft Red Tint */
  --yellow: #fbbc04;     /* Yellow */
  --green: #1e8e3e;      /* Green */
  --green-s: #e6f4ea;    /* Soft Green Tint */
  --purple: #9334e6;     /* Purple */

  /* 텍스트 & 배경 */
  --ink: #202124;        /* Headings & Main Text */
  --ink-2: #3c4043;      /* Secondary Text */
  --gray: #5f6368;       /* Subtitles & Meta */
  --line: #e8eaed;       /* Borders */
  --surface: #f8f9fa;    /* Card & Section BG */
  --white: #ffffff;

  /* 테마 그라디언트 */
  --gradient-gemini: linear-gradient(100deg, #4a90e8 0%, #4aa8f5 38%, #ac87eb 70%, #ee4d5d 100%);
}
```

### 하단 시그니처 컬러 스트라이프
모든 페이지 하단에 구글의 멀티컬러 스트라이프를 고정 렌더링합니다:
```css
body::after {
  content: "";
  position: fixed;
  left: 0; right: 0; bottom: 0;
  height: 3px;
  z-index: 9999;
  pointer-events: none;
  background: linear-gradient(90deg, #3186ff 0%, #3186ff 24%, #2b8ee7 33%, #1fa1ad 41%, #12b572 50%, #91c52b 58%, #ffae0e 66%, #ff6c2e 75%, #c85774 84%, #4380ee 93%, #3186ff 100%);
}
```

---

## 2. 주요 UI 컴포넌트 스니펫

### ① 히어로 헤더 (그라디언트 텍스트 & 메쉬 배경)
```html
<header class="hero">
  <span class="stamp-badge">🚀 2026 워크플로우</span>
  <h1>나만의 프로젝트 <span class="hl">보고서 &amp; 가이드</span></h1>
  <p>프로젝트의 목적과 핵심 달성 목표를 2~3줄로 요약합니다.</p>
  <div class="meta-chips">
    <span class="meta-chip"><b>작성일:</b> 2026. 11. 07</span>
    <span class="meta-chip"><b>담당자:</b> 전략기획팀</span>
  </div>
</header>
```

---

### ② 1줄 흐름 지도 (Flow Map)
전체 진행 단계를 한눈에 보여주는 화살표 연결형 블록:
```html
<div class="flowmap">
  <div class="fstep" style="--accent: #174ea6;">
    <span class="fnum">1</span>
    <div class="fmeta">
      <b>데이터 수집</b>
      <span class="ft">회의 음성 및 VOC</span>
    </div>
  </div>
  <span class="farrow">→</span>
  <div class="fstep" style="--accent: #1967d2;">
    <span class="fnum">2</span>
    <div class="fmeta">
      <b>AI 구조화</b>
      <span class="ft">핵심 아젠다 도출</span>
    </div>
  </div>
</div>
```

---

### ③ 3D 플립 카드 (Perspective 1400px + 광택 스윕)
클릭하면 180도 회전하여 세부 기획 내용을 보여주는 인터랙티브 카드:
```html
<div class="flip" style="--accent: #1967d2;">
  <div class="flip-inner">
    <!-- 앞면 -->
    <div class="face front">
      <div>
        <span class="card-badge">✦ PHASE 01</span>
        <h3>회의록 3초 구조화</h3>
      </div>
      <div class="tags">
        <span class="tag">Gemini</span>
        <span class="tag">자동화</span>
      </div>
      <div class="flip-hint">카드를 누르면 상세 내용 ↻</div>
    </div>
    <!-- 뒷면 -->
    <div class="face back">
      <div class="backbody">
        <span class="card-badge">✦ PHASE 01</span>
        <p>회의 녹음 텍스트를 입력하면 발언자별 핵심 결론과 액션 아이템을 표로 자동 추출합니다.</p>
      </div>
      <div class="flip-hint">카드를 누르면 앞면으로 ↻</div>
    </div>
  </div>
</div>
```

---

### ④ 단계별 실행 가이드 카드 (접기/펴기 + 프롬프트 복사)
```html
<div class="step-card" id="stepCard_0">
  <div class="step-top" onclick="toggleStep(0)">
    <div class="step-title-group">
      <div class="step-num">1</div>
      <h3 class="step-title">회의록 요약 프롬프트 실행</h3>
      <span class="tool-tag">Gemini 2.5 Pro</span>
    </div>
    <button class="done-btn" onclick="event.stopPropagation(); toggleDone(0)">완료 체크</button>
  </div>
  <div class="step-body" id="stepBody_0">
    <div class="step-goal">🎯 결과물: 액션 아이템 표</div>
    <div class="step-desc">아래 프롬프트를 복사하여 Gemini에 붙여넣으세요.</div>
    <div class="prompt-box">
      <button class="copy-btn" onclick="copySnippet(this)">복사</button>
      <pre>회의 내용을 다음 표 형식으로 요약해줘: [작업명 | 담당자 | 마감일]</pre>
    </div>
    <div class="tip-box">💡 팁: 담당자가 미정인 항목은 '추후 지정'으로 표시됩니다.</div>
  </div>
</div>
```

---

### ⑤ 상단 툴바 & 검색엔진 도구 (Toolbar Tools)
비주얼 폼 편집에서 토글 스위치 하나로 켜고 끌 수 있는 기능 도구 모음:
- **🔍 실시간 검색엔진**: 보고서 내부의 흐름도, 모듈 카드, 실행 단계, 프롬프트를 자동 인덱싱하고 앵커 점프 및 펄스 하이라이트 제공.
- **🖨️ 인쇄 / PDF 저장 버튼**: `window.print()` 원클릭 호출.
- **📊 상단 스크롤 진행률 바**: 스크롤 위치에 따라 상단 3px 그라디언트 바 실시간 연동.
- **🌓 다크 / 라이트 모드**: 구글 다크 테마 토글 스위치.

---

## 3. 도구화 활용법 (2가지 방식)

### 방식 A: 웹 비주얼 스튜디오 (`builder.html` - /vo)
1. 로컬에서 `npm start` 실행 후 브라우저에서 `http://localhost:8788/builder.html` 접속 (또는 상단 탭에서 **🛠️ 제작 스튜디오** 클릭).
2. 좌측 **비주얼 폼 편집(/vo)**에서 [🛠️ 툴바 & 도구 모음]의 스위치를 켜면 검색엔진, 인쇄 버튼, 진행률 바, 다크모드가 실시간 미리보기에 즉시 반영됩니다.
3. 상단의 **💾 HTML 다운로드** 버튼을 누르면 검색엔진 툴바가 포함된 단일 파일 형태의 완성본 웹페이지 즉시 생성.

### 방식 B: CLI 자동 빌더 (`cli-generator.js`)
JSON 설정 파일만 작성해두면 커맨드라인 한 줄로 보고서 HTML을 컴파일할 수 있습니다:
```bash
# 기본 샘플로 보고서 생성
node cli-generator.js sample-workflow.json my-report.html

# 생성된 my-report.html을 브라우저나 Cloudflare Pages로 바로 서빙
```

---

## 4. JSON 스키마 명세 (`workflow.json`)

```json
{
  "title": "보고서 제목",
  "badge": "배지 텍스트",
  "description": "설명 문구",
  "toolbar": {
    "enabled": true,
    "showSearch": true,
    "searchPlaceholder": "보고서 내 키워드 검색...",
    "showPrint": true,
    "showProgress": true,
    "showThemeToggle": true
  },
  "meta": [{ "label": "항목", "value": "값" }],
  "flowmap": [{ "num": "1", "title": "단계명", "desc": "요약", "color": "#1967d2" }],
  "cards": [{ "badge": "TAG", "frontTitle": "앞면제목", "tags": ["태그"], "color": "#1967d2", "backDesc": "뒷면설명" }],
  "steps": [{ "num": "1", "title": "스텝명", "tool": "도구", "goal": "목표", "desc": "설명", "prompt": "복사할내용", "tip": "팁" }],
  "checklist": ["체크리스트1", "체크리스트2"]
}
```
