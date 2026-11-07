/**
 * Linear Block Stack AST Catalog for builder.html
 * ─────────────────────────────────────────────────────────────────────────────
 * 분석 대상: home.html, module2.html, module3.html, module4.html
 * 패러다임: 수직 스택(Linear Stack) 레이아웃 엔진
 * 
 * [스키마 원칙]
 * 1. 절대 좌표(left, top, width, height, zIndex) 속성 완전 배제
 * 2. 수직 순서(order) 기반 flex/block 자동 흐름 배치
 * 3. 각 노드는 경량화된 { id, type, order, data, settings } 구조 준수
 * 4. 캔버스 위에서 contenteditable="true"를 통한 인라인 직접 편집 지원
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
      version: "3.1.0-linear",
      architecture: "Linear Block Stack (Vertical Flow)",
      description: "Google Academy 핵심 UI 수직 스택형 표준 컴포넌트 카탈로그 (JSON AST)"
    },

    /**
     * 카탈로그 내 등록된 6대 핵심 위젯 템플릿
     */
    templates: {
      // ───────────────────────────────────────────────────────────────────────
      // 1. 3D 플립 카드 (Flip Card) - 출처: home.html (.flip, .face.front, .face.back)
      // ───────────────────────────────────────────────────────────────────────
      flipCard: {
        type: "flipCard",
        name: "3D 플립 카드",
        icon: "📌",
        origin: "home.html",
        description: "클릭 시 앞뒷면이 입체적으로 회전하며 모듈 핵심 요약과 학습 목표를 전달하는 카드",
        data: {
          badge: "MODULE 01",
          frontTitle: "AI 기초 & 프롬프트 실무",
          frontDesc: "30초 만에 가이드 이미지를 생성하고 실무 프롬프트 체이닝을 익힙니다.",
          frontHint: "카드를 누르면 상세 내용 ↻",
          frontBtnText: "자세히 보기 →",
          backTitle: "실습 학습 목표",
          backDesc: "안전하고 책임감 있는 AI 사용법, PARTS 프롬프트와 Prompt Chaining을 실습합니다.",
          backTags: ["이미지 생성", "책임 있는 AI", "PARTS", "Prompt Chaining"],
          backBtnText: "모듈 1 실습 열기 →",
          accentColor: "#1967d2"
        },
        settings: {
          align: "center", // 'left' | 'center' | 'right'
          theme: "light",  // 'light' | 'paper' | 'navy' | 'dark'
          maxWidth: "460px"
        }
      },

      // ───────────────────────────────────────────────────────────────────────
      // 2. PARTS 프롬프트 칩 (PARTS Prompt) - 출처: module2.html (.bp-g, .bp-chips)
      // ───────────────────────────────────────────────────────────────────────
      partsPrompt: {
        type: "partsPrompt",
        name: "PARTS 프롬프트 조립기",
        icon: "🧩",
        origin: "module2.html",
        description: "P(역할), A(목표), R(형식), T(어조), S(제약) 칩을 선택하여 실시간으로 프롬프트를 조립하는 위젯",
        data: {
          title: "Gemini 실무 프롬프트 조립기",
          desc: "역할, 목표, 형식 옵션 칩을 선택하면 최적화된 프롬프트가 실시간으로 조합됩니다.",
          categories: [
            {
              key: "role",
              name: "P (Role / 역할)",
              chips: ["구글 시니어 TPM", "친근한 학생회 MT 총괄", "엄격한 안전 점검관"],
              selected: "구글 시니어 TPM"
            },
            {
              key: "objective",
              name: "A (Objective / 목표)",
              chips: ["2026 MT 기획안 수립", "실시간 예산안 산출", "비상연락망 체계 수립"],
              selected: "2026 MT 기획안 수립"
            },
            {
              key: "format",
              name: "R (Result / 결과 형식)",
              chips: ["마크다운 표", "실행 불릿 리스트", "JSON 스키마"],
              selected: "마크다운 표"
            },
            {
              key: "tone",
              name: "T (Tone / 어조)",
              chips: ["간결하고 전문적", "친절하고 상세함"],
              selected: "간결하고 전문적"
            }
          ],
          assembledPrompt: "당신은 구글 시니어 TPM입니다. 2026 MT 기획안을 수립해 주세요. 결과는 마크다운 표 형식으로 정리하고, 간결하고 전문적인 어조를 유지하세요.",
          copyBtnText: "📋 프롬프트 복사"
        },
        settings: {
          align: "center",
          theme: "blue", // 'light' | 'blue' | 'navy'
          maxWidth: "840px"
        }
      },

      // ───────────────────────────────────────────────────────────────────────
      // 3. GAS 아코디언 (GAS Accordion) - 출처: module3.html (.gasfold, details)
      // ───────────────────────────────────────────────────────────────────────
      gasAccordion: {
        type: "gasAccordion",
        name: "GAS 접이식 아코디언",
        icon: "📑",
        origin: "module3.html",
        description: "Google Apps Script 엠블럼과 헤더, 그리고 클릭 시 펼쳐지는 소스 코드 박스",
        data: {
          title: "Google Apps Script 핵심 웹앱 배포 코드",
          subtitle: "스프레드시트 응답 데이터를 JSON API로 외부에 노출하는 doGet() 함수 전문입니다.",
          logoSrc: "apps-script-logo.png",
          badgeText: "코드 보기 ▾",
          isOpen: false,
          language: "javascript",
          code: `function doGet(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var rows = sheet.getDataRange().getValues();
  var headers = rows[0];
  var data = [];
  for (var i = 1; i < rows.length; i++) {
    var item = {};
    for (var j = 0; j < headers.length; j++) item[headers[j]] = rows[i][j];
    data.push(item);
  }
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}`
        },
        settings: {
          align: "center",
          theme: "light",
          maxWidth: "880px"
        }
      },

      // ───────────────────────────────────────────────────────────────────────
      // 4. 엽서 발송 시뮬레이터 (Postcard Simulator) - 출처: module4.html (#autofx)
      // ───────────────────────────────────────────────────────────────────────
      postcardSimulator: {
        type: "postcardSimulator",
        name: "엽서 발송 자동화 시뮬레이터",
        icon: "✉️",
        origin: "module4.html",
        description: "설문 제출부터 PDF 엽서 생성, Gmail 자동 발송까지의 과정을 모의 실행하는 인터랙티브 카드",
        data: {
          title: "✉️ 무인 엽서 발송 자동화 시뮬레이터",
          desc: "참가자가 폼을 제출하면 PDF 엽서가 자동 생성되어 메일로 발송되는 파이프라인을 시뮬레이션합니다.",
          beforeImg: "postcard-before.jpg",
          afterImg: "postcard-after.jpg",
          runBtnText: "⚡ 자동화 실행하기",
          resetBtnText: "↺ 초기화",
          badgeText: "생성 완료! ✓",
          sentText: "Gmail 발송 완료!"
        },
        settings: {
          align: "center",
          theme: "navy",
          maxWidth: "820px"
        }
      },

      // ───────────────────────────────────────────────────────────────────────
      // 5. 안내 노트 (Info Note) - 출처: module2.html, module3.html (.note, .tip, .warn)
      // ───────────────────────────────────────────────────────────────────────
      infoNote: {
        type: "infoNote",
        name: "안내 / 팁 / 주의 노트",
        icon: "💡",
        origin: "module2.html, module3.html",
        description: "중요한 주의사항, 실습 팁, 참고 노트를 좌측 액센트 바와 함께 전달하는 강조 상자",
        data: {
          variant: "tip", // 'tip' | 'note' | 'warn' | 'path'
          icon: "💡",
          title: "실습 꿀팁 (Tip)",
          content: "Gemini 웹 또는 API 호출 시 시스템 프롬프트(System Instruction)에 JSON Schema를 지정하면 100% 신뢰성 있는 정형 데이터를 얻을 수 있습니다."
        },
        settings: {
          align: "center",
          theme: "light", // 'light' | 'paper' | 'navy'
          maxWidth: "840px"
        }
      },

      // ───────────────────────────────────────────────────────────────────────
      // 6. 텍스트/버튼 블록 (Text & Button Block) - 출처: home.html (.hero, .btnrow)
      // ───────────────────────────────────────────────────────────────────────
      textButtonBlock: {
        type: "textButtonBlock",
        name: "텍스트 & 액션 버튼 블록",
        icon: "🎯",
        origin: "home.html, module2.html",
        description: "상단 아이브로우, 타이틀, 본문 설명 및 1개 이상의 콜투액션(CTA) 버튼을 배치하는 범용 블록",
        data: {
          eyebrow: "NEXT ACTION",
          title: "오늘의 워크플로우를 직접 실행해보세요",
          description: "설계된 단계에 따라 Gemini와 Apps Script를 연결하고, 사내 자동화 리포트를 완성하세요.",
          buttons: [
            {
              label: "🚀 실습 가이드 시작하기",
              url: "#step-1",
              variant: "primary", // 'primary' | 'secondary' | 'ghost'
              target: "_self"
            },
            {
              label: "📥 템플릿 사본 만들기",
              url: "https://docs.google.com/spreadsheets/",
              variant: "secondary",
              target: "_blank"
            }
          ]
        },
        settings: {
          align: "center",
          theme: "gradient", // 'light' | 'navy' | 'gradient' | 'paper'
          maxWidth: "880px"
        }
      }
    },

    /**
     * 노드 인스턴스 생성 헬퍼 함수
     * @param {string} type 위젯 식별자 ('flipCard' | 'partsPrompt' | 'gasAccordion' | 'postcardSimulator' | 'infoNote' | 'textButtonBlock')
     * @param {object} [customData] 위젯 고유 데이터 오버라이드
     * @param {object} [customSettings] 정렬/테마/최대너비 설정 오버라이드
     * @param {number} [order] 수직 스택 배치 순서 (0부터 시작)
     * @returns {object} 경량화된 AST 노드 객체
     */
    createNode: function (type, customData, customSettings, order) {
      const template = this.templates[type];
      if (!template) {
        throw new Error(`[STUDIO_CATALOG] 등록되지 않은 블록 타입입니다: "${type}"`);
      }
      return {
        id: `${type}_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
        type: template.type,
        order: typeof order === 'number' ? order : 0,
        data: Object.assign({}, JSON.parse(JSON.stringify(template.data)), customData || {}),
        settings: Object.assign({}, JSON.parse(JSON.stringify(template.settings)), customSettings || {})
      };
    },

    /**
     * 선형 스택 노드를 HTML로 컴파일 렌더링
     * @param {object} node { id, type, order, data, settings }
     * @param {boolean} [isEditable=false] true일 경우 contenteditable="true" 적용
     * @returns {string} 렌더링된 HTML 문자열
     */
    renderBlockHtml: function (node, isEditable) {
      if (!node || !node.type) return '';
      const d = node.data || {};
      const s = node.settings || {};
      const editAttr = (field) => isEditable ? ` contenteditable="true" spellcheck="false" data-field="${field}" oninput="onContentEdited(this, '${node.id}', '${field}')" title="클릭하여 직접 텍스트 수정"` : '';

      const maxW = s.maxWidth || '880px';
      const marginH = s.align === 'left' ? '0 auto 0 0' : s.align === 'right' ? '0 0 0 auto' : '0 auto';
      const textAlign = s.align || 'center';

      switch (node.type) {
        // 1. 3D 플립 카드
        case 'flipCard': {
          const accent = d.accentColor || '#1967d2';
          return `
<div class="stack-block stack-flipcard" data-block-id="${node.id}" style="max-width:${maxW};margin:${marginH};padding:10px 0;">
  <div style="perspective:1400px;width:100%;min-height:360px;">
    <div class="fcard" style="position:relative;width:100%;min-height:360px;transform-style:preserve-3d;transition:transform .6s cubic-bezier(.2,.85,.32,1.2);border-radius:20px;box-shadow:0 8px 24px rgba(36,53,81,.08);cursor:pointer;" onclick="if(!event.target.isContentEditable) this.classList.toggle('flipped')">
      <!-- FRONT -->
      <div class="face front" style="position:absolute;inset:0;backface-visibility:hidden;background:#ffffff;border:1px solid #dadce0;border-radius:20px;padding:24px;display:flex;flex-direction:column;justify-content:space-between;text-align:${textAlign};">
        <div>
          <span style="display:inline-block;font-size:11px;font-weight:700;color:${accent};background:${accent}15;padding:4px 10px;border-radius:999px;"${editAttr('badge')}>${d.badge || 'MODULE'}</span>
          <h3 style="margin:12px 0 6px;font-size:1.25rem;font-weight:800;color:#0b1a2c;"${editAttr('frontTitle')}>${d.frontTitle || ''}</h3>
          <p style="margin:0;font-size:.9rem;color:#5f6368;line-height:1.5;"${editAttr('frontDesc')}>${d.frontDesc || ''}</p>
        </div>
        <div>
          <button type="button" style="width:100%;background:${accent};color:#fff;border:none;border-radius:12px;padding:12px;font-size:.92rem;font-weight:700;cursor:pointer;"${editAttr('frontBtnText')}>${d.frontBtnText || '자세히 보기 →'}</button>
          <span style="display:block;text-align:center;font-size:.76rem;color:#80868b;margin-top:8px;"${editAttr('frontHint')}>${d.frontHint || ''}</span>
        </div>
      </div>
      <!-- BACK -->
      <div class="face back" style="position:absolute;inset:0;backface-visibility:hidden;transform:rotateY(180deg);background:#ffffff;border:1px solid ${accent}40;border-radius:20px;padding:24px;display:flex;flex-direction:column;justify-content:space-between;text-align:${textAlign};">
        <div>
          <span style="display:inline-block;font-size:11px;font-weight:700;color:${accent};background:${accent}15;padding:4px 10px;border-radius:999px;"${editAttr('badge')}>${d.badge || 'DETAIL'}</span>
          <h4 style="margin:10px 0 6px;font-size:1.1rem;font-weight:800;color:#0b1a2c;"${editAttr('backTitle')}>${d.backTitle || ''}</h4>
          <p style="margin:0 0 12px;font-size:.88rem;color:#243551;line-height:1.6;"${editAttr('backDesc')}>${d.backDesc || ''}</p>
          <div style="display:flex;flex-wrap:wrap;gap:6px;justify-content:${s.align === 'center' ? 'center' : 'flex-start'};">
            ${(d.backTags || []).map((t, idx) => `<span style="font-size:.74rem;background:#f1f3f4;color:#243551;padding:3px 8px;border-radius:6px;font-weight:600;"${editAttr('backTags.' + idx)}>#${t}</span>`).join('')}
          </div>
        </div>
        <div>
          <button type="button" style="width:100%;background:${accent};color:#fff;border:none;border-radius:12px;padding:12px;font-size:.92rem;font-weight:700;cursor:pointer;"${editAttr('backBtnText')}>${d.backBtnText || '확인 →'}</button>
        </div>
      </div>
    </div>
  </div>
</div>`.trim();
        }

        // 2. PARTS 프롬프트 칩
        case 'partsPrompt': {
          const bg = s.theme === 'navy' ? '#0b1a2c' : s.theme === 'blue' ? '#f4f8fe' : '#ffffff';
          const textCol = s.theme === 'navy' ? '#ffffff' : '#0b1a2c';
          return `
<div class="stack-block stack-partsprompt" data-block-id="${node.id}" style="max-width:${maxW};margin:${marginH};padding:22px 24px;background:${bg};border:1px solid #d4e2ff;border-radius:18px;box-shadow:0 6px 20px rgba(66,133,244,.08);text-align:${textAlign};">
  <h4 style="margin:0 0 4px;font-size:1.15rem;font-weight:800;color:${textCol};"${editAttr('title')}>${d.title || ''}</h4>
  <p style="margin:0 0 16px;font-size:.88rem;color:#5f6368;"${editAttr('desc')}>${d.desc || ''}</p>
  
  ${(d.categories || []).map((cat, catIdx) => `
    <div style="margin-bottom:12px;text-align:${textAlign};">
      <div style="font-size:.82rem;font-weight:700;color:#1967d2;margin-bottom:6px;">${cat.name}</div>
      <div style="display:flex;flex-wrap:wrap;gap:6px;justify-content:${s.align === 'center' ? 'center' : 'flex-start'};">
        ${(cat.chips || []).map(c => `
          <button type="button" onclick="selectPartsChip('${node.id}', '${cat.key}', '${c}')" style="background:${c === cat.selected ? '#1967d2' : '#ffffff'};color:${c === cat.selected ? '#ffffff' : '#243551'};border:1px solid ${c === cat.selected ? '#1967d2' : '#dadce0'};padding:5px 12px;border-radius:999px;font-size:.80rem;font-weight:600;cursor:pointer;display:inline-block;transition:.12s;">${c}</button>
        `).join('')}
      </div>
    </div>
  `).join('')}

  <div style="margin-top:16px;text-align:left;">
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
      <span style="font-size:.80rem;font-weight:700;color:#5f6368;">조립된 프롬프트 결과</span>
      <button type="button" onclick="navigator.clipboard.writeText(this.parentElement.nextElementSibling.innerText);this.innerText='✓ 복사됨!';setTimeout(()=>this.innerText='${d.copyBtnText || '복사'}',2000);" style="background:#1967d2;color:#fff;border:none;border-radius:6px;padding:4px 10px;font-size:.76rem;font-weight:700;cursor:pointer;">${d.copyBtnText || '복사'}</button>
    </div>
    <pre style="background:#1f2d44;color:#e6edf3;border-radius:10px;padding:14px;font-size:.84rem;line-height:1.6;margin:0;white-space:pre-wrap;word-break:break-word;font-family:monospace;"${editAttr('assembledPrompt')}>${d.assembledPrompt || ''}</pre>
  </div>
</div>`.trim();
        }

        // 3. GAS 아코디언
        case 'gasAccordion': {
          return `
<div class="stack-block stack-accordion" data-block-id="${node.id}" style="max-width:${maxW};margin:${marginH};padding:6px 0;">
  <details class="gasfold" ${d.isOpen ? 'open' : ''} style="background:#ffffff;border:1px solid #dadce0;border-left:4px solid #1967d2;border-radius:0 18px 18px 0;box-shadow:0 4px 16px rgba(36,53,81,.06);overflow:hidden;">
    <summary style="cursor:pointer;list-style:none;padding:18px 22px;display:flex;align-items:center;gap:16px;flex-wrap:wrap;">
      ${d.logoSrc ? `<div style="flex:none;width:140px;max-width:35vw;"><img src="${d.logoSrc}" alt="GAS Logo" style="width:100%;display:block;" onerror="this.parentElement.style.display='none';"></div>` : ''}
      <div style="flex:1;min-width:200px;text-align:left;">
        <h4 style="margin:0 0 4px;font-size:1.15rem;font-weight:800;color:#0b1a2c;"${editAttr('title')}>${d.title || ''}</h4>
        <p style="margin:0;font-size:.86rem;color:#5f6368;line-height:1.5;"${editAttr('subtitle')}>${d.subtitle || ''}</p>
        <span style="display:inline-flex;align-items:center;gap:4px;margin-top:8px;background:#1967d2;color:#fff;border-radius:999px;padding:4px 12px;font-size:.76rem;font-weight:700;"${editAttr('badgeText')}>${d.badgeText || '코드 보기 ▾'}</span>
      </div>
    </summary>
    <div style="padding:0 22px 20px;border-top:1px solid #dadce0;">
      <pre style="background:#1f2d44;color:#e6edf3;border-radius:10px;padding:14px;overflow:auto;font-family:monospace;font-size:.80rem;line-height:1.6;margin-top:12px;"${editAttr('code')}>${d.code || ''}</pre>
    </div>
  </details>
</div>`.trim();
        }

        // 4. 엽서 발송 시뮬레이터
        case 'postcardSimulator': {
          return `
<div class="stack-block stack-simulator" data-block-id="${node.id}" style="max-width:${maxW};margin:${marginH};padding:24px;background:#ffffff;border:1px solid #dadce0;border-radius:20px;box-shadow:0 8px 24px rgba(36,53,81,.06);text-align:${textAlign};">
  <h3 style="margin:0 0 6px;font-size:1.25rem;font-weight:800;color:#0b1a2c;"${editAttr('title')}>${d.title || ''}</h3>
  <p style="margin:0 0 16px;font-size:.88rem;color:#5f6368;line-height:1.5;"${editAttr('desc')}>${d.desc || ''}</p>
  
  <div style="position:relative;width:100%;aspect-ratio:1630/924;border-radius:12px;overflow:hidden;background:#243551;box-shadow:0 8px 20px rgba(36,53,81,.15);">
    <img src="${d.beforeImg || 'postcard-before.jpg'}" alt="Simulator Stage" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;" onerror="this.style.display='none';">
    <div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;background:rgba(11,26,44,.6);color:#fff;font-weight:700;font-size:1.05rem;padding:16px;">
      <span>[무인 시뮬레이터 준비 완료] 아래 실행 버튼을 눌러보세요</span>
    </div>
  </div>

  <div style="margin-top:16px;display:flex;gap:10px;justify-content:${s.align === 'center' ? 'center' : 'flex-start'};flex-wrap:wrap;">
    <button type="button" style="background:#1967d2;color:#fff;border:none;border-radius:10px;padding:10px 20px;font-size:.92rem;font-weight:700;cursor:pointer;box-shadow:0 4px 12px rgba(25,103,210,.3);"${editAttr('runBtnText')}>${d.runBtnText || '⚡ 자동화 실행하기'}</button>
    <button type="button" style="background:#f1f3f4;color:#243551;border:1px solid #dadce0;border-radius:10px;padding:10px 16px;font-size:.92rem;font-weight:700;cursor:pointer;"${editAttr('resetBtnText')}>${d.resetBtnText || '↺ 초기화'}</button>
  </div>
</div>`.trim();
        }

        // 5. 안내 노트
        case 'infoNote': {
          const variant = d.variant || 'tip';
          let borderCol = '#1967d2';
          let bgCol = '#f0f6ff';
          let titleCol = '#1967d2';

          if (variant === 'warn') {
            borderCol = '#ea4335';
            bgCol = '#fef2f2';
            titleCol = '#c5221f';
          } else if (variant === 'note') {
            borderCol = '#137333';
            bgCol = '#f0fdf4';
            titleCol = '#137333';
          }

          return `
<div class="stack-block stack-infonote" data-block-id="${node.id}" style="max-width:${maxW};margin:${marginH};padding:14px 18px;background:${bgCol};border-left:4px solid ${borderCol};border-radius:0 12px 12px 0;box-shadow:0 2px 8px rgba(0,0,0,.03);text-align:left;">
  <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px;">
    <span style="font-size:1.1rem;line-height:1;">${d.icon || '💡'}</span>
    <b style="font-size:.92rem;color:${titleCol};"${editAttr('title')}>${d.title || ''}</b>
  </div>
  <p style="margin:0;font-size:.88rem;color:#243551;line-height:1.6;"${editAttr('content')}>${d.content || ''}</p>
</div>`.trim();
        }

        // 6. 텍스트/버튼 블록
        case 'textButtonBlock': {
          let bg = '#ffffff';
          let textCol = '#0b1a2c';
          let subCol = '#5f6368';

          if (s.theme === 'gradient') {
            bg = 'linear-gradient(135deg, #f8fafd, #eef4fe)';
          } else if (s.theme === 'navy') {
            bg = '#0b1a2c';
            textCol = '#ffffff';
            subCol = '#d9e0ec';
          }

          return `
<div class="stack-block stack-cta" data-block-id="${node.id}" style="max-width:${maxW};margin:${marginH};padding:36px 24px;background:${bg};border-radius:20px;border:1px solid #dadce0;box-shadow:0 6px 20px rgba(36,53,81,.05);text-align:${textAlign};">
  ${d.eyebrow ? `<span style="font-size:11px;font-weight:800;letter-spacing:.08em;color:#1967d2;text-transform:uppercase;"${editAttr('eyebrow')}>${d.eyebrow}</span>` : ''}
  <h2 style="margin:6px 0 10px;font-size:1.45rem;font-weight:900;color:${textCol};line-height:1.3;"${editAttr('title')}>${d.title || ''}</h2>
  <p style="max-width:620px;margin:${s.align === 'center' ? '0 auto 20px' : '0 0 20px'};font-size:.95rem;color:${subCol};line-height:1.6;"${editAttr('description')}>${d.description || ''}</p>
  
  <div style="display:flex;gap:10px;justify-content:${s.align === 'center' ? 'center' : 'flex-start'};flex-wrap:wrap;">
    ${(d.buttons || []).map((b, bIdx) => {
      const isPrimary = b.variant === 'primary';
      const btnBg = isPrimary ? '#1967d2' : '#ffffff';
      const btnCol = isPrimary ? '#ffffff' : '#1967d2';
      const btnBorder = isPrimary ? 'none' : '1px solid #c6dafc';
      return `<a href="${b.url || '#'}" target="${b.target || '_self'}" style="display:inline-flex;align-items:center;gap:6px;background:${btnBg};color:${btnCol};border:${btnBorder};padding:11px 22px;border-radius:12px;font-size:.92rem;font-weight:700;text-decoration:none;box-shadow:0 3px 10px rgba(25,103,210,.18);transition:.15s;"${editAttr('buttons.' + bIdx + '.label')}>${b.label || '확인'}</a>`;
    }).join('')}
  </div>
</div>`.trim();
        }

        default:
          return `<div class="stack-block" data-block-id="${node.id}" style="max-width:${maxW};margin:${marginH};padding:14px;background:#f8f9fa;border-radius:10px;"><b>[${node.type}]</b></div>`;
      }
    }
  };

  return STUDIO_CATALOG;
});
