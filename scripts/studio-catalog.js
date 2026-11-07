/**
 * Web Studio Builder Engine: Standard Block Catalog (JSON AST Definition)
 * ─────────────────────────────────────────────────────────────────────────────
 * 분석 대상: home.html, module2.html, module3.html, module4.html
 * 기준: Role & Architecture Guidelines (Decision Matrix)
 * 
 * [분류 기준 (Decision Matrix)]
 * 조건 1 (컨테이너 지배권): 자식 요소를 Wrapper로 감싸고 정렬(Flex/Grid)과 간격(Gap)을 직접 지배하는가?
 * 조건 2 (글로벌 파급력): 단일 블록을 넘어 섹션 전체 또는 폼 전체의 레이아웃 흐름/스타일에 영향을 주는가?
 * 조건 3 (독립적 데이터): 자체 텍스트, 아이콘, 토글 상태 등 독립된 콘텐츠 속성을 가지는 단말 노드(Leaf Node)인가?
 * 
 * - 조건 1 또는 2 True  ➔ category: 'structure' (구조 & 레이아웃)
 * - 조건 3 True & 1·2 False ➔ category: 'component' (컴포넌트 & 블록)
 * ─────────────────────────────────────────────────────────────────────────────
 */

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.STUDIO_CATALOG = factory();
  }
})(typeof self !== 'undefined' ? self : this, function () {

  const STUDIO_CATALOG = {
    meta: {
      version: "2.0.0",
      targetEngine: "Antigravity Web Studio Builder",
      generatedAt: "2026-11-07T22:52:00+09:00",
      description: "Google Academy 기존 UI 모듈 역공학 기반 표준 블록 카탈로그 (JSON AST Schema)"
    },

    // ─────────────────────────────────────────────────────────────────────────
    // 1. HOME (home.html)
    // ─────────────────────────────────────────────────────────────────────────

    /**
     * 1-1. 3D 플립 카드 (Flip Card 3D)
     * 출처: home.html (.flip, .face.front, .face.back, .cardbtn)
     * 분류: 단말 노드이자 자체 카드 데이터를 지님 ➔ [컴포넌트 & 블록]
     */
    flipCard3D: {
      type: "flipCard3D",
      name: "3D 인터랙티브 플립 카드",
      category: "component",
      origin: "home.html",
      icon: "📌",
      tag: "div",
      semanticClass: "flip-card-component",
      decisionMatrix: {
        condition1_containerDominance: false,
        condition2_globalImpact: false,
        condition3_leafNodeData: true,
        verdict: "component",
        reason: "조건 3 만족: 앞/뒤 카드 텍스트, 뱃지, 태그 및 회전 애니메이션 상태를 자체 보유한 독립 단말 노드"
      },
      style: {
        width: "100%",
        maxWidth: "360px",
        height: "380px",
        perspective: "1400px",
        position: "relative",
        margin: "0 auto",
        zIndex: "1",
        background: "transparent",
        padding: "0px",
        borderRadius: "22px",
        boxShadow: "none",
        cursor: "pointer"
      },
      props: {
        cardId: "card_mod_01",
        accentColor: "#1967d2",
        rotationSpeed: 600, // ms
        flipTrigger: "click", // 'click' | 'hover'
        isFlipped: false,
        front: {
          badge: "MODULE 01",
          title: "AI 기초 & 프롬프트 실무",
          description: "30초 만에 가이드 이미지를 생성하고 실무 프롬프트 체이닝을 익힙니다.",
          icon: "🎓",
          hint: "카드를 누르면 상세 내용 ↻",
          buttonText: "자세히 보기 →",
          buttonColor: "#174ea6",
          buttonAction: "flip" // 'flip' | 'navigate'
        },
        back: {
          badge: "CURRICULUM DETAIL",
          title: "실습 학습 목표",
          description: "본격 프로젝트에 앞서 다지는 토대입니다. 안전하고 책임감 있는 AI 사용법, PARTS 프롬프트와 Prompt Chaining을 실습합니다.",
          tags: ["이미지 생성", "책임 있는 AI", "PARTS", "Prompt Chaining"],
          buttonText: "모듈 1 실습 열기 →",
          buttonColor: "#1967d2",
          buttonAction: "navigate",
          targetModule: 1,
          targetUrl: "module1.html"
        }
      },
      renderHtml: function (props, style) {
        const p = props || this.props;
        const s = style || this.style;
        return `
<div class="fcard-wrap" style="perspective:${s.perspective};width:${s.width};max-width:${s.maxWidth};height:${s.height};margin:${s.margin};">
  <div class="fcard ${p.isFlipped ? 'flipped' : ''}" style="position:relative;width:100%;height:100%;transform-style:preserve-3d;transition:transform ${p.rotationSpeed}ms cubic-bezier(.2,.85,.32,1.2);border-radius:${s.borderRadius};" data-card-id="${p.cardId}">
    <!-- FRONT FACE -->
    <div class="fcard-face fcard-front" style="position:absolute;inset:0;backface-visibility:hidden;background:#ffffff;border:1px solid #dadce0;border-radius:${s.borderRadius};padding:24px;display:flex;flex-direction:column;justify-content:space-between;box-shadow:0 8px 24px rgba(36,53,81,.08);">
      <div class="fcard-top">
        <span style="display:inline-block;font-size:11px;font-weight:700;color:${p.accentColor};background:${p.accentColor}18;padding:4px 10px;border-radius:999px;">${p.front.badge}</span>
        <h3 style="margin:12px 0 6px;font-size:1.25rem;font-weight:800;color:#0b1a2c;line-height:1.3;">${p.front.title}</h3>
        <p style="margin:0;font-size:.9rem;color:#5f6368;line-height:1.5;">${p.front.description}</p>
      </div>
      <div class="fcard-bottom">
        <button type="button" class="fcard-btn" style="width:100%;background:${p.front.buttonColor};color:#fff;border:none;border-radius:12px;padding:12px;font-size:.92rem;font-weight:700;cursor:pointer;box-shadow:0 4px 12px ${p.accentColor}40;">${p.front.buttonText}</button>
        <span style="display:block;text-align:center;font-size:.76rem;color:#80868b;margin-top:8px;">${p.front.hint}</span>
      </div>
    </div>
    <!-- BACK FACE -->
    <div class="fcard-face fcard-back" style="position:absolute;inset:0;backface-visibility:hidden;transform:rotateY(180deg);background:#ffffff;border:1px solid ${p.accentColor}40;border-radius:${s.borderRadius};padding:24px;display:flex;flex-direction:column;justify-content:space-between;box-shadow:0 12px 30px ${p.accentColor}20;">
      <div class="fcard-top">
        <span style="display:inline-block;font-size:11px;font-weight:700;color:${p.accentColor};background:${p.accentColor}18;padding:4px 10px;border-radius:999px;">${p.back.badge}</span>
        <h4 style="margin:10px 0 6px;font-size:1.1rem;font-weight:800;color:#0b1a2c;">${p.back.title}</h4>
        <p style="margin:0 0 12px;font-size:.88rem;color:#243551;line-height:1.6;">${p.back.description}</p>
        <div style="display:flex;flex-wrap:wrap;gap:6px;">
          ${(p.back.tags || []).map(t => `<span style="font-size:.74rem;background:#f1f3f4;color:#243551;padding:3px 8px;border-radius:6px;font-weight:600;">#${t}</span>`).join('')}
        </div>
      </div>
      <div class="fcard-bottom">
        <button type="button" class="fcard-btn" style="width:100%;background:${p.back.buttonColor};color:#fff;border:none;border-radius:12px;padding:12px;font-size:.92rem;font-weight:700;cursor:pointer;box-shadow:0 4px 14px ${p.accentColor}50;">${p.back.buttonText}</button>
      </div>
    </div>
  </div>
</div>`.trim();
      }
    },

    /**
     * 1-2. 오리엔테이션 인트로 (Orientation Intro Hero)
     * 출처: home.html (.hero, .stamp-badge, h1, .btnrow .intro-btn)
     * 분류: 최상단 소개 영역 전체를 아우르고 자식을 배치하는 래퍼 ➔ [구조 & 레이아웃]
     */
    orientationIntro: {
      type: "orientationIntro",
      name: "오리엔테이션 인트로 히어로",
      category: "structure",
      origin: "home.html",
      icon: "🎓",
      tag: "header",
      semanticClass: "orientation-hero-layout",
      decisionMatrix: {
        condition1_containerDominance: true,
        condition2_globalImpact: true,
        condition3_leafNodeData: false,
        verdict: "structure",
        reason: "조건 1 및 조건 2 만족: 상단 Hero 래퍼 컨테이너로서 뱃지, 제목, 리드 설명, CTA 버튼의 중앙 정렬/패딩을 직접 지배하며 문서 전체 서두 스타일을 결정"
      },
      style: {
        width: "100%",
        height: "auto",
        position: "relative",
        padding: "54px 24px 44px",
        margin: "0 0 32px 0",
        zIndex: "1",
        background: "radial-gradient(620px 360px at 22% 30%, rgba(233,242,255,.95) 0%, rgba(233,242,255,0) 70%), radial-gradient(560px 340px at 68% 22%, rgba(238,226,248,.85) 0%, rgba(238,226,248,0) 70%)",
        borderRadius: "0px",
        boxShadow: "none",
        textAlign: "center"
      },
      props: {
        stampBadge: "🎓 Gemini Academy · 구글 대학생 연수",
        titlePrefix: "제미나이 아카데미",
        titleHighlight: "MT 프로젝트",
        titleSuffix: "강의 교안",
        leadDescription: "AI로 MT를 기획부터 자동화까지 직접 만드는 실습 연수입니다. 4개 모듈 카드를 눌러 바로 실습으로 이동하세요.",
        ctaButtons: [
          {
            label: "▶ 오늘의 흐름 보기",
            url: "intro.html",
            target: "_top",
            theme: "gradient", // 'gradient' | 'solid' | 'ghost'
            styleCustom: "background:linear-gradient(100deg,#4a90e8,#4aa8f5 40%,#ac87eb 72%,#ee4d5d);"
          }
        ],
        showAccentBar: true,
        accentBarHeight: "3px"
      },
      renderHtml: function (props, style) {
        const p = props || this.props;
        const s = style || this.style;
        return `
<header class="orientation-hero" style="position:${s.position};padding:${s.padding};background:${s.background};text-align:${s.textAlign};">
  <div style="max-width:880px;margin:0 auto;">
    <span style="display:inline-block;padding:5px 14px;border-radius:999px;font-size:11px;font-weight:700;color:#5f6368;background:#ffffff;border:1px solid #dadce0;box-shadow:0 2px 6px rgba(0,0,0,.04);margin-bottom:14px;">${p.stampBadge}</span>
    <h1 style="margin:0 0 16px;font-size:clamp(1.8rem,4vw,2.6rem);font-weight:900;color:#0b1a2c;line-height:1.25;letter-spacing:-.02em;">
      ${p.titlePrefix}<br><span style="background:linear-gradient(90deg,#1967d2,#12b572);-webkit-background-clip:text;-webkit-text-fill-color:transparent;">${p.titleHighlight}</span> ${p.titleSuffix}
    </h1>
    <p style="max-width:640px;margin:0 auto 24px;font-size:1.05rem;line-height:1.65;color:#495057;">${p.leadDescription}</p>
    <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap;">
      ${(p.ctaButtons || []).map(b => `<a href="${b.url}" target="${b.target || '_self'}" style="display:inline-flex;align-items:center;gap:8px;color:#fff;text-decoration:none;font-weight:700;font-size:.95rem;padding:12px 24px;border-radius:12px;box-shadow:0 4px 14px rgba(36,53,81,.18);${b.styleCustom}">${b.label}</a>`).join('')}
    </div>
  </div>
  ${p.showAccentBar ? `<div style="position:absolute;left:0;right:0;bottom:0;height:${p.accentBarHeight};background:linear-gradient(90deg,#3186ff 0%,#12b572 50%,#ffae0e 75%,#3186ff 100%);"></div>` : ''}
</header>`.trim();
      }
    },

    /**
     * 1-3. 패들렛 반응형 컨테이너 (Padlet Responsive Container)
     * 출처: home.html (.padbox, iframe, .cta-btn.pad)
     * 분류: 단일 iframe 임베드와 버튼을 수용하는 단말 노드 ➔ [컴포넌트 & 블록]
     */
    padletEmbed: {
      type: "padletEmbed",
      name: "패들렛 반응형 커뮤니티 컨테이너",
      category: "component",
      origin: "home.html",
      icon: "💙",
      tag: "div",
      semanticClass: "padlet-embed-block",
      decisionMatrix: {
        condition1_containerDominance: false,
        condition2_globalImpact: false,
        condition3_leafNodeData: true,
        verdict: "component",
        reason: "조건 3 만족: 특정 외부 Padlet URL과 반응형 높이 속성을 가진 단일 Leaf 컴포넌트"
      },
      style: {
        width: "100%",
        maxWidth: "960px",
        height: "auto",
        position: "relative",
        margin: "32px auto",
        zIndex: "1",
        background: "#ffffff",
        padding: "24px",
        borderRadius: "22px",
        boxShadow: "0 6px 20px rgba(36,53,81,.06)",
        border: "1px solid #dadce0"
      },
      props: {
        eyebrow: "Community",
        title: "우리 아카데미 패들렛",
        description: "질문·자료·결과물을 여기에 함께 모아요. 화면이 안 보이면 아래 버튼으로 새 창에서 열 수 있습니다.",
        embedUrl: "https://padlet.com/embed/b764lse6h0ho7u3g",
        openUrl: "https://padlet.com/JA_Korea/2026-gemini-academy-b764lse6h0ho7u3g",
        buttonText: "💙 패들렛 새 창 열기",
        iframeHeight: "600px",
        allowPermissions: "camera;microphone;geolocation;clipboard-write;encrypted-media;fullscreen"
      },
      renderHtml: function (props, style) {
        const p = props || this.props;
        const s = style || this.style;
        return `
<section class="padlet-section" style="max-width:${s.maxWidth};margin:${s.margin};padding:${s.padding};background:${s.background};border-radius:${s.borderRadius};box-shadow:${s.boxShadow};border:${s.border};">
  <div style="margin-bottom:16px;">
    <span style="font-size:11px;font-weight:700;color:#1967d2;letter-spacing:.08em;text-transform:uppercase;">${p.eyebrow}</span>
    <h3 style="margin:4px 0 6px;font-size:1.35rem;font-weight:800;color:#0b1a2c;">${p.title}</h3>
    <p style="margin:0 0 14px;font-size:.92rem;color:#5f6368;line-height:1.5;">${p.description}</p>
    <a href="${p.openUrl}" target="_blank" rel="noopener" style="display:inline-flex;align-items:center;gap:6px;background:#ffffff;color:#1967d2;border:1px solid #c6dafc;padding:9px 16px;border-radius:10px;font-size:.88rem;font-weight:700;text-decoration:none;box-shadow:0 1px 3px rgba(60,64,67,.08);">${p.buttonText}</a>
  </div>
  <div style="border-radius:16px;overflow:hidden;background:#f4f4f4;border:1px solid #e0e0e0;">
    <iframe src="${p.embedUrl}" allow="${p.allowPermissions}" style="width:100%;height:${p.iframeHeight};border:none;display:block;" title="${p.title}"></iframe>
  </div>
</section>`.trim();
      }
    },

    // ─────────────────────────────────────────────────────────────────────────
    // 2. MODULE 2 (module2.html)
    // ─────────────────────────────────────────────────────────────────────────

    /**
     * 2-1. PARTS 프롬프트 생성 칩 (PARTS Prompt Builder Chips)
     * 출처: module2.html (.bp-g, .bp-chips, .bp-chip, .bp-free, textarea)
     * 분류: 대화형 입력과 태그 칩을 가진 독립 기능 노드 ➔ [컴포넌트 & 블록]
     */
    partsPrompt: {
      type: "partsPrompt",
      name: "PARTS 프롬프트 조립 칩",
      category: "component",
      origin: "module2.html",
      icon: "🧩",
      tag: "div",
      semanticClass: "parts-prompt-component",
      decisionMatrix: {
        condition1_containerDominance: false,
        condition2_globalImpact: false,
        condition3_leafNodeData: true,
        verdict: "component",
        reason: "조건 3 만족: P(역할), A(목표), R(결과), T(어조), S(제약) 칩 선택 데이터와 조립된 텍스트를 자체 보유한 단말 노드"
      },
      style: {
        width: "100%",
        maxWidth: "880px",
        height: "auto",
        position: "relative",
        margin: "20px 0",
        zIndex: "1",
        background: "#ffffff",
        padding: "22px 24px",
        borderRadius: "18px",
        border: "1.5px solid #d4e2ff",
        boxShadow: "0 6px 20px rgba(66,133,244,.08)"
      },
      props: {
        title: "🎨 PARTS 프롬프트 조립기 (Gemini 전용)",
        subtitle: "원하는 옵션 칩을 누르면 하단 프롬프트가 실시간으로 조합됩니다.",
        categories: [
          {
            key: "role",
            name: "P (Persona / 역할)",
            multi: false,
            chips: [
              { id: "p1", text: "구글 시니어 기획자", tip: "전문성 강화", selected: true },
              { id: "p2", text: "친근한 학생회 MT 총괄", tip: "공감형", selected: false },
              { id: "p3", text: "엄격한 안전 점검관", tip: "규정 중심", selected: false }
            ]
          },
          {
            key: "format",
            name: "R (Result / 결과 형식)",
            multi: false,
            chips: [
              { id: "r1", text: "마크다운 테이블", tip: "표 정리", selected: true },
              { id: "r2", text: "실행 불릿 리스트", tip: "체크리스트", selected: false },
              { id: "r3", text: "JSON 스키마", tip: "개발 연동", selected: false }
            ]
          },
          {
            key: "tone",
            name: "T (Tone / 어조)",
            multi: false,
            chips: [
              { id: "t1", text: "간결하고 명확한 문체", tip: "신속 전달", selected: true },
              { id: "t2", text: "열정적이고 흥미진진한 어조", tip: "동기부여", selected: false }
            ]
          }
        ],
        basePromptTemplate: "당신은 [ROLE]입니다. 2026 대학생 MT 기획안을 수립해 주세요.\n\n[요구사항]\n- 형식: [FORMAT]\n- 어조: [TONE]\n- 필수 항목: 예산 산출, 비상연락망, 세부 타임테이블",
        showTextareaPreview: true
      },
      renderHtml: function (props, style) {
        const p = props || this.props;
        const s = style || this.style;
        return `
<div class="parts-builder" style="max-width:${s.maxWidth};padding:${s.padding};background:${s.background};border-radius:${s.borderRadius};border:${s.border};box-shadow:${s.boxShadow};">
  <h4 style="margin:0 0 4px;font-size:1.15rem;font-weight:800;color:#0b1a2c;">${p.title}</h4>
  <p style="margin:0 0 16px;font-size:.88rem;color:#5f6368;">${p.subtitle}</p>
  
  ${(p.categories || []).map(cat => `
    <div style="margin-bottom:14px;">
      <div style="font-size:.84rem;font-weight:700;color:#1967d2;margin-bottom:6px;">${cat.name}</div>
      <div style="display:flex;flex-wrap:wrap;gap:8px;">
        ${cat.chips.map(c => `
          <button type="button" class="parts-chip ${c.selected ? 'active' : ''}" style="background:${c.selected ? '#1967d2' : '#ffffff'};color:${c.selected ? '#ffffff' : '#243551'};border:1px solid ${c.selected ? '#1967d2' : '#dadce0'};padding:6px 14px;border-radius:999px;font-size:.82rem;font-weight:600;cursor:pointer;display:inline-flex;align-items:center;gap:6px;">
            <span>${c.text}</span>
            ${c.tip ? `<span style="font-size:.7rem;opacity:.75;">(${c.tip})</span>` : ''}
          </button>
        `).join('')}
      </div>
    </div>
  `).join('')}

  ${p.showTextareaPreview ? `
    <div style="margin-top:16px;">
      <label style="display:block;font-size:.82rem;font-weight:700;color:#5f6368;margin-bottom:6px;">조립된 프롬프트 결과</label>
      <textarea readonly style="width:100%;height:100px;box-sizing:border-box;border-radius:10px;border:1px solid #c6dafc;background:#f8fafd;padding:10px 12px;font-family:inherit;font-size:.86rem;color:#0b1a2c;resize:vertical;">${p.basePromptTemplate}</textarea>
    </div>
  ` : ''}
</div>`.trim();
      }
    },

    /**
     * 2-2. 원클릭 클립보드 복사 블록 (Clipboard Copy Block)
     * 출처: module2.html (.prompt-box, .codewrap, .copy, pre)
     * 분류: 독립된 코드 본문과 원클릭 복사 트리거를 가진 단말 노드 ➔ [컴포넌트 & 블록]
     */
    clipboardCopy: {
      type: "clipboardCopy",
      name: "원클릭 클립보드 복사 블록",
      category: "component",
      origin: "module2.html",
      icon: "📋",
      tag: "div",
      semanticClass: "copy-prompt-block",
      decisionMatrix: {
        condition1_containerDominance: false,
        condition2_globalImpact: false,
        condition3_leafNodeData: true,
        verdict: "component",
        reason: "조건 3 만족: 자체 프롬프트 텍스트, 설명 및 클립보드 복사 이벤트를 수반하는 단말 노드"
      },
      style: {
        width: "100%",
        maxWidth: "880px",
        height: "auto",
        position: "relative",
        margin: "18px 0",
        zIndex: "1",
        background: "linear-gradient(135deg, #e9f2ff, #f3f8fd)",
        padding: "20px 22px",
        borderRadius: "18px",
        border: "2px dashed #4a90e8",
        boxShadow: "0 6px 20px rgba(66,133,244,.1)"
      },
      props: {
        badgeIcon: "✨",
        title: "Gemini 실무 프롬프트 템플릿",
        description: "우측 상단의 복사 버튼을 눌러 Gemini에 전달하세요.",
        copyButtonText: "📋 프롬프트 복사",
        copiedToastText: "✓ 복사 완료!",
        language: "text",
        codeContent: `당신은 구글 테크니컬 프로그램 매니저(TPM)입니다.
다음 회의 스크립트를 분석하여 액션 아이템 목록을 JSON으로 추출하세요:
{
  "meeting_title": "2026 MT 운영위원회",
  "decisions": ["일정 확정", "숙소 계약"],
  "action_items": [{ "owner": "홍길동", "task": "답사 진행", "due": "2026-04-10" }]
}`
      },
      renderHtml: function (props, style) {
        const p = props || this.props;
        const s = style || this.style;
        return `
<div class="prompt-copy-block" style="max-width:${s.maxWidth};padding:${s.padding};background:${s.background};border-radius:${s.borderRadius};border:${s.border};box-shadow:${s.boxShadow};margin:${s.margin};">
  <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px;gap:12px;">
    <div style="display:flex;align-items:center;gap:10px;">
      <span style="width:36px;height:36px;border-radius:10px;background:#1967d2;color:#fff;display:inline-flex;align-items:center;justify-content:center;font-size:1.15rem;box-shadow:0 4px 10px rgba(25,103,210,.3);">${p.badgeIcon}</span>
      <div>
        <h4 style="margin:0;font-size:1.05rem;font-weight:800;color:#0b1a2c;">${p.title}</h4>
        <p style="margin:2px 0 0;font-size:.84rem;color:#5f6368;">${p.description}</p>
      </div>
    </div>
    <button type="button" class="copy-action-btn" onclick="navigator.clipboard.writeText(this.closest('.prompt-copy-block').querySelector('pre').innerText).then(()=>{this.innerText='${p.copiedToastText}';setTimeout(()=>this.innerText='${p.copyButtonText}',2000);})" style="background:#0b1a2c;color:#fff;border:none;border-radius:8px;padding:8px 14px;font-size:.8rem;font-weight:700;cursor:pointer;white-space:nowrap;box-shadow:0 2px 8px rgba(0,0,0,.15);">${p.copyButtonText}</button>
  </div>
  <pre style="background:#1f2d44;color:#e6edf3;border-radius:12px;padding:16px 18px;overflow:auto;font-family:'SFMono-Regular',Consolas,Menlo,monospace;font-size:.82rem;line-height:1.6;margin:0;white-space:pre-wrap;word-break:break-word;">${p.codeContent}</pre>
</div>`.trim();
      }
    },

    /**
     * 2-3. 스크롤 스파이 앵커 (Scroll Spy Sticky Navigation)
     * 출처: module2.html, index.html (.nav-links, step-chip, mt-navalign)
     * 분류: 상단 고정, 스크롤 위치 감지 및 섹션 전체 이동을 제어 ➔ [구조 & 레이아웃]
     */
    scrollSpyNav: {
      type: "scrollSpyNav",
      name: "스크롤 스파이 스텝 내비게이션 바",
      category: "structure",
      origin: "module2.html",
      icon: "🧭",
      tag: "nav",
      semanticClass: "scrollspy-navbar-layout",
      decisionMatrix: {
        condition1_containerDominance: true,
        condition2_globalImpact: true,
        condition3_leafNodeData: false,
        verdict: "structure",
        reason: "조건 1 및 조건 2 만족: 화면 상단에 Sticky 고정되어 내부 스텝 칩들을 Flex로 지배하고 브라우저 뷰포트 스크롤과 전체 이동을 제어"
      },
      style: {
        width: "100%",
        height: "56px",
        position: "sticky",
        top: "0px",
        left: "0px",
        zIndex: "100",
        background: "rgba(255, 255, 255, 0.94)",
        backdropFilter: "blur(8px)",
        padding: "8px 16px",
        margin: "0 0 24px 0",
        borderBottom: "1px solid #dadce0",
        boxShadow: "0 4px 14px rgba(36, 53, 81, 0.04)"
      },
      props: {
        alignParentShell: true, // mt-navalign 연동
        smoothScroll: true,
        activeStepIndex: 0,
        steps: [
          { id: "step-01", label: "Step 1. 준비 & 폼", accent: "#174ea6" },
          { id: "step-02", label: "Step 2. Canvas 기획", accent: "#1967d2" },
          { id: "step-03", label: "Step 3. Notebook 정리", accent: "#4a90e8" },
          { id: "step-04", label: "Step 4. 최종 검증", accent: "#137333" }
        ]
      },
      renderHtml: function (props, style) {
        const p = props || this.props;
        const s = style || this.style;
        return `
<nav class="scrollspy-nav" style="position:${s.position};top:${s.top};width:${s.width};height:${s.height};background:${s.background};backdrop-filter:${s.backdropFilter};border-bottom:${s.borderBottom};padding:${s.padding};box-shadow:${s.boxShadow};z-index:${s.zIndex};display:flex;align-items:center;overflow-x:auto;">
  <div style="max-width:960px;margin:0 auto;display:flex;align-items:center;gap:10px;width:100%;">
    <span style="font-size:.78rem;font-weight:800;color:#5f6368;text-transform:uppercase;margin-right:4px;">실습 단계</span>
    ${(p.steps || []).map((step, idx) => `
      <a href="#${step.id}" class="spy-chip ${idx === p.activeStepIndex ? 'active' : ''}" style="text-decoration:none;font-size:.84rem;font-weight:700;padding:6px 14px;border-radius:999px;white-space:nowrap;background:${idx === p.activeStepIndex ? step.accent : '#f1f3f4'};color:${idx === p.activeStepIndex ? '#ffffff' : '#243551'};box-shadow:${idx === p.activeStepIndex ? '0 2px 6px rgba(0,0,0,.15)' : 'none'};transition:.15s;">${step.label}</a>
    `).join('')}
  </div>
</nav>`.trim();
      }
    },

    // ─────────────────────────────────────────────────────────────────────────
    // 3. MODULE 3 (module3.html)
    // ─────────────────────────────────────────────────────────────────────────

    /**
     * 3-1. GAS 접이식 아코디언 (GAS Folding Accordion)
     * 출처: module3.html (.gasfold, details, summary, .ttl)
     * 분류: 개별 아코디언 단위 콘텐츠와 로고를 포함하는 단말 노드 ➔ [컴포넌트 & 블록]
     */
    gasAccordion: {
      type: "gasAccordion",
      name: "GAS 접이식 아코디언",
      category: "component",
      origin: "module3.html",
      icon: "📑",
      tag: "details",
      semanticClass: "gasfold-component",
      decisionMatrix: {
        condition1_containerDominance: false,
        condition2_globalImpact: false,
        condition3_leafNodeData: true,
        verdict: "component",
        reason: "조건 3 만족: 자체 펼침/접힘 상태, 엠블럼 이미지, 요약문 및 상세 코드를 품은 단말 노드"
      },
      style: {
        width: "100%",
        maxWidth: "880px",
        height: "auto",
        position: "relative",
        margin: "24px 0",
        zIndex: "1",
        background: "#ffffff",
        padding: "0px",
        borderRadius: "0 18px 18px 0",
        border: "1px solid #dadce0",
        borderLeft: "4px solid #1967d2",
        boxShadow: "0 6px 20px rgba(36,53,81,.05)",
        overflow: "hidden"
      },
      props: {
        isOpen: false,
        logoSrc: "apps-script-logo.png",
        logoWidth: "160px",
        title: "Google Apps Script 핵심 웹앱 배포 코드",
        subtitle: "스프레드시트 응답 데이터를 JSON API로 외부에 노출하는 doGet() 함수 전문입니다.",
        badgeText: "코드 전문 열기 ▾",
        codeSnippet: `function doGet(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var rows = sheet.getDataRange().getValues();
  var headers = rows[0];
  var data = [];
  for (var i = 1; i < rows.length; i++) {
    var item = {};
    for (var j = 0; j < headers.length; j++) {
      item[headers[j]] = rows[i][j];
    }
    data.push(item);
  }
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}`
      },
      renderHtml: function (props, style) {
        const p = props || this.props;
        const s = style || this.style;
        return `
<details class="gasfold" ${p.isOpen ? 'open' : ''} style="max-width:${s.maxWidth};border:${s.border};border-left:${s.borderLeft};border-radius:${s.borderRadius};box-shadow:${s.boxShadow};background:${s.background};margin:${s.margin};overflow:${s.overflow};">
  <summary style="cursor:pointer;list-style:none;padding:20px 24px;display:flex;align-items:center;gap:18px;flex-wrap:wrap;transition:background .15s;">
    ${p.logoSrc ? `<div style="flex:none;width:${p.logoWidth};max-width:40vw;"><img src="${p.logoSrc}" alt="GAS Logo" style="width:100%;display:block;" onerror="this.parentElement.style.display='none';"></div>` : ''}
    <div style="flex:1;min-width:200px;">
      <h4 style="margin:0 0 4px;font-size:1.15rem;font-weight:800;color:#0b1a2c;">${p.title}</h4>
      <p style="margin:0;font-size:.88rem;color:#5f6368;line-height:1.5;">${p.subtitle}</p>
      <span style="display:inline-flex;align-items:center;gap:6px;margin-top:8px;background:#1967d2;color:#fff;border-radius:999px;padding:4px 12px;font-size:.78rem;font-weight:700;">${p.badgeText}</span>
    </div>
  </summary>
  <div style="padding:0 24px 24px;border-top:1px solid #dadce0;">
    <pre style="background:#1f2d44;color:#e6edf3;border-radius:12px;padding:16px 18px;overflow:auto;font-family:monospace;font-size:.82rem;line-height:1.6;margin-top:14px;">${p.codeSnippet}</pre>
  </div>
</details>`.trim();
      }
    },

    /**
     * 3-2. 파이프라인 흐름도 캡슐 (Pipeline Flow Capsule)
     * 출처: module3.html, module4.html (.procbox, .flowmap, .flowkey)
     * 분류: 단계별 화살표와 Flexbox 방향/정렬을 결정하는 컨테이너 ➔ [구조 & 레이아웃]
     */
    pipelineFlow: {
      type: "pipelineFlow",
      name: "파이프라인 흐름도 캡슐 레이아웃",
      category: "structure",
      origin: "module3.html",
      icon: "🔄",
      tag: "div",
      semanticClass: "pipeline-flow-layout",
      decisionMatrix: {
        condition1_containerDominance: true,
        condition2_globalImpact: false,
        condition3_leafNodeData: false,
        verdict: "structure",
        reason: "조건 1 만족: 가로 또는 세로 Flexbox 컨테이너로서 하위 데이터 파이프라인 단계들과 연결 화살표(➔)의 정렬/간격을 직접 지배"
      },
      style: {
        width: "100%",
        maxWidth: "920px",
        height: "auto",
        position: "relative",
        margin: "24px 0",
        zIndex: "1",
        background: "#f8fafd",
        padding: "16px 20px",
        borderRadius: "16px",
        border: "1px solid #dadce0",
        boxShadow: "0 4px 12px rgba(36,53,81,.04)"
      },
      props: {
        pipelineBadge: "DATA FLOW PIPELINE",
        direction: "horizontal", // 'horizontal' | 'vertical'
        stages: [
          { num: "01", name: "설문 데이터 수집", tool: "Google Forms", color: "#174ea6" },
          { num: "02", name: "실시간 행 기록", tool: "Google Sheets", color: "#137333" },
          { num: "03", name: "JSON API 변환", tool: "Apps Script", color: "#1967d2" },
          { num: "04", name: "의사결정 시각화", tool: "Canvas Dashboard", color: "#8e44c4" }
        ]
      },
      renderHtml: function (props, style) {
        const p = props || this.props;
        const s = style || this.style;
        return `
<div class="pipeline-container" style="max-width:${s.maxWidth};padding:${s.padding};background:${s.background};border-radius:${s.borderRadius};border:${s.border};box-shadow:${s.boxShadow};margin:${s.margin};">
  <div style="font-size:10px;font-weight:800;color:#1967d2;letter-spacing:.1em;margin-bottom:12px;">✦ ${p.pipelineBadge}</div>
  <div style="display:flex;align-items:center;flex-wrap:wrap;gap:10px;">
    ${(p.stages || []).map((st, i) => `
      <div style="flex:1 1 160px;min-width:140px;background:#ffffff;border:1px solid #dadce0;border-left:4px solid ${st.color};border-radius:12px;padding:10px 12px;box-shadow:0 2px 6px rgba(0,0,0,.04);">
        <div style="display:flex;align-items:center;gap:6px;margin-bottom:4px;">
          <span style="font-size:10px;font-weight:800;color:#ffffff;background:${st.color};padding:1px 6px;border-radius:4px;">${st.num}</span>
          <span style="font-size:10px;color:#5f6368;font-weight:600;">${st.tool}</span>
        </div>
        <div style="font-size:.88rem;font-weight:700;color:#0b1a2c;">${st.name}</div>
      </div>
      ${i < p.stages.length - 1 ? `<span style="color:#1967d2;font-size:1.1rem;font-weight:700;">➔</span>` : ''}
    `).join('')}
  </div>
</div>`.trim();
      }
    },

    /**
     * 3-3. 이미지 라이트박스 모달 (Image Lightbox Modal)
     * 출처: module3.html (.gasfx, .imgwrap, .gallery, .demo-shot)
     * 분류: 특정 이미지와 확대 팝업 상호작용을 가진 단말 노드 ➔ [컴포넌트 & 블록]
     */
    imageLightbox: {
      type: "imageLightbox",
      name: "이미지 라이트박스 뷰어",
      category: "component",
      origin: "module3.html",
      icon: "🖼️",
      tag: "figure",
      semanticClass: "lightbox-component",
      decisionMatrix: {
        condition1_containerDominance: false,
        condition2_globalImpact: false,
        condition3_leafNodeData: true,
        verdict: "component",
        reason: "조건 3 만족: 자체 이미지 URL, 캡션 텍스트 및 전체화면 모달 팝업 상태를 보유한 단말 노드"
      },
      style: {
        width: "100%",
        maxWidth: "820px",
        height: "auto",
        position: "relative",
        margin: "20px auto",
        zIndex: "1",
        background: "#243551",
        padding: "0px",
        borderRadius: "16px",
        border: "1px solid #dadce0",
        boxShadow: "0 10px 28px rgba(36,53,81,.14)",
        overflow: "hidden"
      },
      props: {
        imgSrc: "dashboard-screen.jpg",
        altText: "대시보드 실습 화면",
        aspectRatio: "1630 / 924",
        captionTitle: "Google Apps Script ➔ Canvas 연동 대시보드",
        captionDesc: "클릭 시 고해상도 전체 화면으로 확대 검토할 수 있습니다.",
        zoomEnabled: true
      },
      renderHtml: function (props, style) {
        const p = props || this.props;
        const s = style || this.style;
        return `
<figure class="lightbox-figure" style="max-width:${s.maxWidth};margin:${s.margin};border-radius:${s.borderRadius};box-shadow:${s.boxShadow};border:${s.border};background:${s.background};overflow:${s.overflow};">
  <div style="position:relative;width:100%;aspect-ratio:${p.aspectRatio};cursor:${p.zoomEnabled ? 'zoom-in' : 'default'};">
    <img src="${p.imgSrc}" alt="${p.altText}" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block;" onerror="this.parentElement.innerHTML='<div style=\\'display:flex;align-items:center;justify-content:center;height:100%;color:#fff;font-weight:600;\\'>[${p.captionTitle}] 이미지를 로드할 수 없습니다</div>';">
    ${p.zoomEnabled ? `<span style="position:absolute;bottom:12px;right:12px;background:rgba(11,26,44,.75);color:#fff;padding:4px 10px;border-radius:999px;font-size:11px;font-weight:600;backdrop-filter:blur(4px);">🔍 클릭하여 확대</span>` : ''}
  </div>
  <figcaption style="padding:12px 18px;background:#ffffff;border-top:1px solid #dadce0;">
    <b style="font-size:.92rem;color:#0b1a2c;display:block;">${p.captionTitle}</b>
    <span style="font-size:.82rem;color:#5f6368;">${p.captionDesc}</span>
  </figcaption>
</figure>`.trim();
      }
    },

    // ─────────────────────────────────────────────────────────────────────────
    // 4. MODULE 4 (module4.html)
    // ─────────────────────────────────────────────────────────────────────────

    /**
     * 4-1. 인터랙티브 발송 시뮬레이터 카드 (Interactive Automation Simulator)
     * 출처: module4.html (#autofx, .postcard-demo, .imgwrap.sending, .fxenv)
     * 분류: 시뮬레이션 상태(발송 애니메이션, 전/후 전환)를 가진 단말 인터랙션 ➔ [컴포넌트 & 블록]
     */
    interactiveSimulator: {
      type: "interactiveSimulator",
      name: "인터랙티브 발송 시뮬레이터 카드",
      category: "component",
      origin: "module4.html",
      icon: "⚡",
      tag: "div",
      semanticClass: "simulator-component",
      decisionMatrix: {
        condition1_containerDominance: false,
        condition2_globalImpact: false,
        condition3_leafNodeData: true,
        verdict: "component",
        reason: "조건 3 만족: 전/후 이미지, 프로그레스 바, 발송 트리거 버튼 및 봉투 비행 CSS 애니메이션을 독립적으로 수행하는 단말 노드"
      },
      style: {
        width: "100%",
        maxWidth: "800px",
        height: "auto",
        position: "relative",
        margin: "28px auto",
        zIndex: "1",
        background: "#ffffff",
        padding: "24px",
        borderRadius: "22px",
        border: "1px solid #dadce0",
        boxShadow: "0 8px 24px rgba(36,53,81,.08)"
      },
      props: {
        title: "✉️ 무인 엽서 발송 자동화 시뮬레이터",
        description: "사용자가 폼을 제출하면 PDF 엽서가 자동 생성되어 메일로 전송되는 과정을 시뮬레이션합니다.",
        beforeImg: "postcard-before.jpg",
        afterImg: "postcard-after.jpg",
        simulationDuration: 1800, // ms
        runButtonText: "⚡ 자동화 실행하기",
        resetButtonText: "↺ 초기화",
        successBadgeText: "생성 완료! ✓",
        sentNoticeText: "Gmail 발송 완료!"
      },
      renderHtml: function (props, style) {
        const p = props || this.props;
        const s = style || this.style;
        return `
<div class="sim-wrapper" style="max-width:${s.maxWidth};margin:${s.margin};padding:${s.padding};background:${s.background};border-radius:${s.borderRadius};box-shadow:${s.boxShadow};border:${s.border};">
  <div style="text-align:center;margin-bottom:16px;">
    <h3 style="margin:0 0 6px;font-size:1.25rem;font-weight:800;color:#0b1a2c;">${p.title}</h3>
    <p style="margin:0;font-size:.88rem;color:#5f6368;">${p.description}</p>
  </div>
  
  <div class="sim-stage" style="position:relative;width:100%;aspect-ratio:1630/924;border-radius:14px;overflow:hidden;background:#243551;box-shadow:0 10px 24px rgba(36,53,81,.16);">
    <img src="${p.beforeImg}" alt="Before" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;" onerror="this.style.display='none';">
    <div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;background:rgba(11,26,44,.6);color:#fff;font-weight:700;font-size:1.1rem;">
      <span>[시뮬레이터 준비 완료] 아래 실행 버튼을 눌러보세요</span>
    </div>
  </div>

  <div style="margin-top:16px;display:flex;gap:10px;justify-content:center;align-items:center;">
    <button type="button" class="sim-run-btn" style="background:#1967d2;color:#fff;border:none;border-radius:12px;padding:12px 24px;font-size:.95rem;font-weight:700;cursor:pointer;box-shadow:0 4px 12px rgba(25,103,210,.35);">${p.runButtonText}</button>
    <button type="button" class="sim-reset-btn" style="background:#f1f3f4;color:#243551;border:1px solid #dadce0;border-radius:12px;padding:12px 18px;font-size:.95rem;font-weight:700;cursor:pointer;">${p.resetButtonText}</button>
  </div>
</div>`.trim();
      }
    },

    /**
     * 4-2. 코드 하이라이터 블록 (Code Highlighter Block)
     * 출처: module4.html (.codewrap, pre, .copy)
     * 분류: 독립된 코드 텍스트와 문법 하이라이팅을 가진 단말 노드 ➔ [컴포넌트 & 블록]
     */
    codeHighlighter: {
      type: "codeHighlighter",
      name: "다크 콘솔 코드 하이라이터",
      category: "component",
      origin: "module4.html",
      icon: "💻",
      tag: "div",
      semanticClass: "code-highlighter-block",
      decisionMatrix: {
        condition1_containerDominance: false,
        condition2_globalImpact: false,
        condition3_leafNodeData: true,
        verdict: "component",
        reason: "조건 3 만족: 특정 언어(JavaScript/GAS/Bash) 코드 문자열과 콘솔 UI를 가진 독립 Leaf 노드"
      },
      style: {
        width: "100%",
        maxWidth: "880px",
        height: "auto",
        position: "relative",
        margin: "18px 0",
        zIndex: "1",
        background: "#1f2d44",
        padding: "0px",
        borderRadius: "14px",
        border: "1px solid #324765",
        boxShadow: "0 8px 24px rgba(0,0,0,.15)",
        overflow: "hidden"
      },
      props: {
        language: "javascript",
        title: "Google Apps Script 시간 기반 트리거 핸들러",
        showLineNumbers: true,
        copyable: true,
        codeContent: `/**
 * 스프레드시트 제출 이벤트 발생 시 자동 실행되는 트리거
 */
function onFormSubmitTrigger(e) {
  var values = e.values;
  var timestamp = values[0];
  var userEmail = values[1];
  var userName = values[2];
  
  Logger.log("신규 응답 수신: " + userName + " (" + userEmail + ")");
  createAndSendPostcard(userEmail, userName);
}`
      },
      renderHtml: function (props, style) {
        const p = props || this.props;
        const s = style || this.style;
        return `
<div class="code-box-wrapper" style="max-width:${s.maxWidth};margin:${s.margin};border-radius:${s.borderRadius};border:${s.border};box-shadow:${s.boxShadow};background:${s.background};overflow:${s.overflow};">
  <div style="background:#162234;padding:8px 16px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid #293a52;">
    <div style="display:flex;align-items:center;gap:8px;">
      <span style="display:flex;gap:4px;">
        <i style="width:10px;height:10px;border-radius:50%;background:#ff5f56;display:inline-block;"></i>
        <i style="width:10px;height:10px;border-radius:50%;background:#ffbd2e;display:inline-block;"></i>
        <i style="width:10px;height:10px;border-radius:50%;background:#27c93f;display:inline-block;"></i>
      </span>
      <span style="font-size:.78rem;font-weight:700;color:#8ab4f8;font-family:monospace;margin-left:6px;">${p.language.toUpperCase()} · ${p.title}</span>
    </div>
    ${p.copyable ? `<button type="button" onclick="navigator.clipboard.writeText(this.closest('.code-box-wrapper').querySelector('pre').innerText);this.innerText='복사됨!';setTimeout(()=>this.innerText='복사',2000);" style="background:rgba(255,255,255,.1);color:#e8eaed;border:1px solid rgba(255,255,255,.2);border-radius:6px;padding:3px 10px;font-size:.74rem;font-weight:600;cursor:pointer;">복사</button>` : ''}
  </div>
  <pre style="margin:0;padding:18px 20px;color:#e6edf3;font-family:'SFMono-Regular',Consolas,Menlo,monospace;font-size:.82rem;line-height:1.65;overflow-x:auto;"><code>${p.codeContent}</code></pre>
</div>`.trim();
      }
    }
  };

  /**
   * ─────────────────────────────────────────────────────────────────────────────
   * 헬퍼 유틸리티: 카탈로그 질의 및 AST 검증 함수
   * ─────────────────────────────────────────────────────────────────────────────
   */
  STUDIO_CATALOG.getStructureTools = function () {
    return Object.values(this).filter(item => item && item.category === 'structure');
  };

  STUDIO_CATALOG.getComponentBlocks = function () {
    return Object.values(this).filter(item => item && item.category === 'component');
  };

  STUDIO_CATALOG.instantiateAST = function (type, customProps, customStyle) {
    const template = this[type];
    if (!template) {
      throw new Error(`[STUDIO_CATALOG] 알 수 없는 블록 타입입니다: "${type}"`);
    }
    return {
      id: `${type}_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
      type: template.type,
      category: template.category,
      origin: template.origin,
      tag: template.tag,
      style: Object.assign({}, template.style, customStyle || {}),
      props: JSON.parse(JSON.stringify(Object.assign({}, template.props, customProps || {})))
    };
  };

  return STUDIO_CATALOG;
});
