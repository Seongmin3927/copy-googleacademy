const fs = require('fs');
const vm = require('vm');

function buildStudio() {
  const PRESETS = {
    weekly: {
      title: "AI 기반 주간 업무 자동화 워크플로우 보고서",
      badge: "🚀 2026 스마트 워크 플레이북",
      description: "반복적인 주간 회의록 정리, 데이터 수집, 고객 피드백 분석을 AI와 자동화 스크립트로 10분 안에 완료하는 워크플로우입니다.",
      toolbar: {
        enabled: true,
        showSearch: true,
        searchPlaceholder: "보고서 키워드 검색 (회의록, 대시보드, 스프레드시트...)",
        showSuggestChips: true,
        suggestChips: ["마스코트", "대시보드", "Apps Script", "PARTS 프롬프트"],
        showCategoryTabs: true,
        categoryTabs: ["전체 워크플로우", "1단계: 기획", "2단계: 실습", "3단계: 검증"],
        showPrint: true,
        showProgress: true,
        showThemeToggle: true
      },
      whyBox: {
        enabled: true,
        title: "💡 왜 이 워크플로우를 도입해야 하는가?",
        desc: "매주 반복되는 데이터 취합과 수작업 보고서 작성에 소요되던 6시간을 10분으로 압축하고, 휴먼 에러 없는 일관된 정량 지표를 도출합니다."
      },
      procBox: {
        enabled: true,
        badge: "AUTOMATION PIPELINE",
        title: "음성/설문 데이터 수집 ➔ Gemini 프롬프트 구조화 ➔ 스프레드시트 반영 ➔ 슬랙 자동 발송"
      },
      kpiStats: [
        { num: "85%", label: "반복 수작업 절감율", color: "#1967d2" },
        { num: "1/5", label: "보고서 작성 소요시간", color: "#137333" },
        { num: "100%", label: "실시간 데이터 동기화", color: "#c5221f" }
      ],
      meta: [
        { label: "적용 조직", value: "전략기획 / 운영팀" },
        { label: "소요 시간 단축", value: "주당 6시간 → 10분" },
        { label: "핵심 도구", value: "Gemini 2.5, Google Sheets, Apps Script" }
      ],
      flowmap: [
        { num: "1", title: "데이터 수집", desc: "설문 & 회의 음성 녹음", color: "#174ea6" },
        { num: "2", title: "구조화 요약", desc: "AI 핵심 안건·액션아이템", color: "#1967d2" },
        { num: "3", title: "자동 보고서", desc: "스프레드시트 & 슬라이드 생성", color: "#4a90e8" },
        { num: "4", title: "슬랙/메일 공유", desc: "관계자 자동 알림", color: "#34a853" }
      ],
      cards: [
        {
          badge: "PHASE 01",
          frontTitle: "음성 회의록 3초 구조화",
          tags: ["음성 인식", "Gemini", "회의록"],
          color: "#174ea6",
          backDesc: "회의 음성 파일 또는 텍스트 스크립트를 입력하면 발언자별 핵심 의견, 합의된 결정 사항, 차주 R&R을 불릿 포인트로 즉시 추출합니다."
        },
        {
          badge: "PHASE 02",
          frontTitle: "고객 피드백 감성 & 패턴 분석",
          tags: ["정량 분석", "VOC", "클러스터링"],
          color: "#1967d2",
          backDesc: "주간 접수된 수백 건의 VOC 데이터를 5가지 핵심 카테고리(버그, 기능 제안, UX 불만 등)로 분류하고 긴급 대응 우선순위를 산출합니다."
        },
        {
          badge: "PHASE 03",
          frontTitle: "KPI 대시보드 실시간 반영",
          tags: ["Apps Script", "Sheets", "자동화"],
          color: "#137333",
          backDesc: "정리된 구조화 JSON 데이터를 Apps Script API로 호출하여 팀 공유 구글 시트와 Looker 대시보드에 즉각 반영합니다."
        }
      ],
      steps: [
        {
          num: "1",
          title: "회의 음성 텍스트를 구조화 요약 프롬프트에 입력",
          tool: "Gemini 2.5 Pro",
          goal: "회의록 원문에서 결정 사항과 차주 실행 과제(Action Items)만 100% 누락 없이 추출",
          desc: "구글 밋(Google Meet) 녹음본 또는 클로바노트 텍스트를 복사하여 아래 프롬프트에 붙여넣습니다.",
          prompt: "당신은 전략기획팀 전문 수석 비서입니다. 아래 주간 회의 원문을 분석하여 다음 JSON 스키마 규격으로만 응답하세요:\n{\n  \"meeting_title\": \"주간 운영 회의\",\n  \"key_decisions\": [\"결정사항 1\", \"결정사항 2\"],\n  \"action_items\": [{\"task\": \"과제명\", \"owner\": \"담당자\", \"due\": \"마감일\"}]\n}\n\n회의 원문:\n[여기에 텍스트 입력]",
          tip: "Gemini의 JSON 모드를 활용하면 출력 포맷이 고정되어 Apps Script에서 바로 파싱할 수 있습니다.",
          note: "민감한 고객 개인정보나 결제 정보는 회의록 전송 전 반드시 마스킹 처리하세요.",
          warn: "정산 및 예산 관련 수치는 생성 후 반드시 담당 부서의 수기 확인을 거쳐야 합니다.",
          url: "https://script.google.com",
          urlLabel: "구글 앱스 스크립트(Apps Script) 콘솔 바로가기"
        },
        {
          num: "2",
          title: "구글 시트 연동 Apps Script 웹훅 실행",
          tool: "Google Apps Script",
          goal: "추출된 JSON 데이터를 공유 시트에 자동 행 추가",
          desc: "스프레드시트의 확장 프로그램 > Apps Script 메뉴에서 API 엔드포인트 코드를 배포합니다.",
          prompt: "function doPost(e) {\n  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('WeeklyReport');\n  var data = JSON.parse(e.postData.contents);\n  sheet.appendRow([new Date(), data.meeting_title, JSON.stringify(data.key_decisions), JSON.stringify(data.action_items)]);\n  return ContentService.createTextOutput(JSON.stringify({result: 'success'})).setMimeType(ContentService.MimeType.JSON);\n}",
          tip: "웹 앱 배포 시 '액세스 권한: 모든 사용자'로 설정해야 외부 웹훅 호출이 가능합니다.",
          note: "프로덕션 환경에서는 X-API-KEY 헤더 검증 로직을 추가하는 것을 권장합니다."
        }
      ],
      checklist: [
        "Gemini API 키 환경 변수 등록 완료",
        "Apps Script 웹 앱 최신 버전 배포 완료",
        "구글 시트 대상 탭 권한 확인",
        "슬랙 수신 채널 웹훅 URL 테스트 통과"
      ]
    },
    project: {
      title: "2026 신규 AI 서비스 런칭 로드맵",
      badge: "🚀 PRODUCT LAUNCH BLUEPRINT",
      description: "시장 조사, 프롬프트 엔지니어링, Cloudflare 인프라 배포까지 엔드투엔드로 진행하는 신규 프로덕트 런칭 플랜입니다.",
      toolbar: {
        enabled: true,
        showSearch: true,
        searchPlaceholder: "런칭 로드맵 키워드 검색...",
        showSuggestChips: true,
        suggestChips: ["시장조사", "MVP기획", "Cloudflare", "프롬프트"],
        showCategoryTabs: true,
        categoryTabs: ["전체", "기획", "개발", "배포"],
        showPrint: true,
        showProgress: true,
        showThemeToggle: true
      },
      whyBox: {
        enabled: true,
        title: "🎯 린(Lean) AI 프로덕트 런칭의 핵심 가치",
        desc: "인프라 구축에 수 주를 소모하지 않고 서버리스 Cloudflare 스택과 사전 검증된 프롬프트 아키텍처로 3일 안에 프로토타입을 실서빙합니다."
      },
      procBox: {
        enabled: true,
        badge: "LAUNCH TIMELINE",
        title: "아이디어 검증 ➔ 인터랙티브 프로토타이핑 ➔ Cloudflare 배포 ➔ 피드백 루프"
      },
      kpiStats: [
        { num: "D-14", label: "목표 런칭 일정", color: "#1967d2" },
        { num: "99.9%", label: "글로벌 엣지 가용성", color: "#137333" },
        { num: "0원", label: "초기 서버 인프라 비용", color: "#f9ab00" }
      ],
      meta: [
        { label: "목표 기간", value: "4주 완성 (D-28)" },
        { label: "배포 인프라", value: "Cloudflare Pages & Workers" },
        { label: "타깃 고객", value: "B2B AI 도입 실무자" }
      ],
      flowmap: [
        { num: "1", title: "시장 검증", desc: "경쟁사 & 니즈 조사", color: "#174ea6" },
        { num: "2", title: "MVP 기획", desc: "핵심 인터랙션 정의", color: "#1967d2" },
        { num: "3", title: "프롬프트 고도화", desc: "안정적 응답 튜닝", color: "#4a90e8" },
        { num: "4", title: "엣지 배포", desc: "Cloudflare 프로덕션 서빙", color: "#34a853" }
      ],
      cards: [
        { badge: "STEP 1", frontTitle: "타깃 니즈 수렴", tags: ["FGI", "설문", "Persona"], color: "#174ea6", backDesc: "잠재 사용자 인터뷰를 통해 가장 고통받는 3대 반복 작업을 정의합니다." },
        { badge: "STEP 2", frontTitle: "Cloudflare 배포", tags: ["Pages", "Workers", "Edge"], color: "#137333", backDesc: "글로벌 CDN 엣지 네트워크를 통해 50ms 미만의 지연 시간으로 웹을 서빙합니다." }
      ],
      steps: [
        {
          num: "1",
          title: "Cloudflare Pages 프로젝트 생성 및 깃 연동",
          tool: "Wrangler CLI",
          goal: "Git Push 시 1분 내 자동 빌드 및 글로벌 배포 파이프라인 구성",
          desc: "wrangler.jsonc 설정과 함께 메인 브랜치를 연결합니다.",
          prompt: "npm install -g wrangler\nwrangler pages project create my-ai-service\ngit push origin main",
          tip: "_headers 파일에 Font 및 Image 정적 캐시 규칙을 적용하세요."
        }
      ],
      checklist: ["도메인 DNS 레코드 연결", "SSL/TLS 암호화 활성화", "SEO 메타 태그 검증"]
    },
    onboarding: {
      title: "신규 팀원을 위한 생성형 AI 실무 온보딩 가이드",
      badge: "🔰 ONBOARDING PLAYBOOK",
      description: "입사 첫 주에 마스터하는 프롬프트 작성 원칙, 사내 업무 도구 연동, 보안 가이드라인입니다.",
      toolbar: {
        enabled: true,
        showSearch: true,
        searchPlaceholder: "온보딩 가이드 검색...",
        showSuggestChips: true,
        suggestChips: ["프롬프트 원칙", "사내 보안", "Gemini 사용법"],
        showCategoryTabs: true,
        categoryTabs: ["전체", "1일차", "2일차", "3일차"],
        showPrint: true,
        showProgress: true,
        showThemeToggle: true
      },
      whyBox: {
        enabled: true,
        title: "💡 AI 온보딩의 필요성",
        desc: "팀 전체가 검증된 프롬프트 프레임워크(PARTS)를 통일하여 사용하여 커뮤니케이션 오버헤드를 줄입니다."
      },
      procBox: {
        enabled: true,
        badge: "CURRICULUM",
        title: "계정 설정 ➔ PARTS 프롬프트 실습 ➔ 업무 자동화 적용 ➔ 보안 수칙 서약"
      },
      kpiStats: [
        { num: "3일", label: "기초 온보딩 완료", color: "#1967d2" },
        { num: "100%", label: "보안 수칙 준수율", color: "#137333" },
        { num: "2배", label: "문서 작성 속도 향상", color: "#f9ab00" }
      ],
      meta: [
        { label: "대상자", value: "신규 입사자 전체" },
        { label: "소요 시간", value: "첫 주 3일 (일 1시간)" }
      ],
      flowmap: [
        { num: "1", title: "도구 셋업", desc: "Gemini & Workspace 연동", color: "#174ea6" },
        { num: "2", title: "프롬프트 실습", desc: "PARTS 원칙 체화", color: "#1967d2" },
        { num: "3", title: "보안 수칙", desc: "사내 데이터 보호", color: "#c5221f" }
      ],
      cards: [
        { badge: "DAY 1", frontTitle: "PARTS 원칙이란?", tags: ["페르소나", "목표", "제약조건"], color: "#174ea6", backDesc: "Persona, Action, Result, Tone, Constraint 5요소를 결합한 고효율 프롬프트 기법입니다." }
      ],
      steps: [
        {
          num: "1",
          title: "PARTS 프레임워크를 적용한 첫 실무 보고서 작성",
          tool: "Gemini 2.5",
          goal: "모호한 답변을 방지하고 구체적인 초안 즉시 생성",
          desc: "아래 템플릿의 각 항목에 업무 맥락을 채워넣어 요청합니다.",
          prompt: "[Persona] 10년차 IT 전략 컨설턴트\n[Action] 신규 프로젝트 위험요소 5가지 도출\n[Result] 표 형식 (위험요소, 영향도, 대응책)\n[Tone] 객관적이고 간결한 어조\n[Constraint] 300자 이내 요약",
          tip: "제약조건(Constraint)을 명확히 할수록 환각(Hallucination)이 억제됩니다."
        }
      ],
      checklist: ["사내 보안 교육 수료", "업무 계정 2단계 인증", "사내 프롬프트 저장소 즐겨찾기"]
    }
  };

  // Build the script content using clean JS string assembly
  const clientScript = `
  var PRESETS = ${JSON.stringify(PRESETS, null, 2)};

  // ── 도구 및 컴포넌트 레지스트리 (Role & Architecture Guidelines 기반) ──
  // [Decision Matrix]
  // 1) 조건 1 또는 2가 True -> [구조 & 레이아웃 (Structure & Layout)]
  // 2) 조건 3이 True이고 조건 1·2가 False -> [컴포넌트 & 블록 (Components & Blocks)]
  var TOOL_REGISTRY = {
    search: {
      category: "layout",
      categoryLabel: "구조 & 레이아웃",
      icon: "🔍",
      name: "실시간 검색엔진 도구",
      desc: "보고서 내부의 모든 섹션, 단계, 프롬프트, 체크리스트를 브라우저 단에서 실시간 자동 인덱싱하고, 검색어 입력 시 드롭다운 결과 목록 표시 및 해당 요소로 스무스 스크롤 점프와 펄스(Pulse) 하이라이트를 실행합니다.",
      scenario: "단계가 10개 이상이거나 긴 워크플로우 문서에서 독자가 원하는 특정 키워드(예: 'Apps Script', '프롬프트')를 1초 만에 찾을 수 있도록 할 때 필수적입니다.",
      previewHtml: '<div style="background:#fff;border:1px solid #dadce0;border-radius:20px;padding:6px 14px;display:flex;align-items:center;gap:8px;"><span style="color:#5f6368;">🔍</span><span style="color:#80868b;font-size:13px;">키워드 검색 (회의록, 대시보드...)...</span></div>',
      actionText: "상단 검색창 켜기/끄기",
      actionType: "toggle",
      actionKey: "showSearch"
    },
    suggestChips: {
      category: "layout",
      categoryLabel: "구조 & 레이아웃",
      icon: "⚡",
      name: "추천 검색어 칩 (Suggest Chips)",
      desc: "홈(index.html) 스타일의 빠른 탐색 칩입니다. 사용자가 검색창에 직접 타이핑하지 않고도 빈번히 찾는 주요 키워드를 원클릭으로 필터링할 수 있는 추천 태그 모음을 상단에 제공합니다.",
      scenario: "보고서의 가장 핵심이 되는 키워드 3~5개를 태그로 노출하여 방문자의 빠른 탐색을 유도할 때 적용합니다.",
      previewHtml: '<div style="display:flex;gap:6px;flex-wrap:wrap;"><span style="font-size:11px;background:#e8f0fe;color:#1967d2;padding:4px 10px;border-radius:999px;font-weight:600;">⚡ #마스코트</span><span style="font-size:11px;background:#e8f0fe;color:#1967d2;padding:4px 10px;border-radius:999px;font-weight:600;">⚡ #Apps Script</span><span style="font-size:11px;background:#e8f0fe;color:#1967d2;padding:4px 10px;border-radius:999px;font-weight:600;">⚡ #PARTS</span></div>',
      actionText: "추천 검색어 칩 켜기/끄기",
      actionType: "toggle",
      actionKey: "showSuggestChips"
    },
    categoryTabs: {
      category: "layout",
      categoryLabel: "구조 & 레이아웃",
      icon: "🗂️",
      name: "카테고리 네비게이션 탭",
      desc: "홈(index.html)에서 사용하는 알약(Pill)형 카테고리 전환 탭입니다. 단계별(1단계: 기획, 2단계: 실습 등) 또는 주제별로 보고서 본문을 구분하여 필터링할 수 있는 탭 바를 상단에 배치합니다.",
      scenario: "보고서의 분량이 많아 단계별/주제별로 독자의 시선을 구분하여 집중시키고 싶을 때 적용합니다.",
      previewHtml: '<div style="display:flex;gap:6px;"><span style="font-size:12px;background:#0b1a2c;color:#fff;padding:5px 12px;border-radius:999px;font-weight:600;">전체</span><span style="font-size:12px;background:#f1f3f4;color:#243551;padding:5px 12px;border-radius:999px;font-weight:600;">1단계: 기획</span><span style="font-size:12px;background:#f1f3f4;color:#243551;padding:5px 12px;border-radius:999px;font-weight:600;">2단계: 실습</span></div>',
      actionText: "카테고리 탭 켜기/끄기",
      actionType: "toggle",
      actionKey: "showCategoryTabs"
    },
    print: {
      category: "layout",
      categoryLabel: "구조 & 레이아웃",
      icon: "🖨️",
      name: "인쇄 및 PDF 내보내기 도구",
      desc: "상단 툴바에 브라우저 네이티브 인쇄 대화상자(window.print)를 즉각 호출하는 액션 버튼을 배치합니다. 인쇄용 CSS 미디어 쿼리가 적용되어 A4 출력 및 PDF 저장 시 깔끔한 문서 레이아웃으로 변환됩니다.",
      scenario: "작성된 AI 업무 가이드나 로드맵을 사내 보고용 PDF로 출력하거나 종이 문서로 보관할 때 유용합니다.",
      previewHtml: '<button style="background:#fff;border:1px solid #dadce0;border-radius:8px;padding:6px 12px;font-size:12px;font-weight:600;display:inline-flex;align-items:center;gap:4px;">🖨️ 인쇄 / PDF 저장</button>',
      actionText: "인쇄/PDF 버튼 켜기/끄기",
      actionType: "toggle",
      actionKey: "showPrint"
    },
    progress: {
      category: "layout",
      categoryLabel: "구조 & 레이아웃",
      icon: "📊",
      name: "스크롤 진행률 표시줄 (Progress Bar)",
      desc: "페이지 최상단에 브라우저 스크롤 위치를 0~100%로 계산하여 구글 시그니처 그라디언트(#4a90e8 → #34a853 → #ea4335)로 부드럽게 채워지는 진행률 바를 생성합니다.",
      scenario: "긴 분량의 가이드 문서를 읽을 때 사용자가 현재 전체 내용 중 어디까지 읽었는지 시각적인 피드백을 제공합니다.",
      previewHtml: '<div style="width:100%;height:6px;background:#eee;border-radius:3px;overflow:hidden;"><div style="width:65%;height:100%;background:linear-gradient(90deg,#4a90e8,#34a853,#ea4335);"></div></div>',
      actionText: "진행률 바 켜기/끄기",
      actionType: "toggle",
      actionKey: "showProgress"
    },
    theme: {
      category: "layout",
      categoryLabel: "구조 & 레이아웃",
      icon: "🌓",
      name: "다크모드 / 라이트모드 전역 스타일러",
      desc: "Google Workspace 다크 테마 팔레트(--navy:#e8eaed, --paper:#202124, --bg:#121212)와 라이트 테마를 원클릭으로 토글할 수 있는 스위치를 상단 툴바에 배치합니다.",
      scenario: "야간 작업 환경이나 어두운 화면을 선호하는 실무자에게 눈의 피로도를 낮추는 시각 환경을 제공합니다.",
      previewHtml: '<button style="background:#202124;color:#e8eaed;border:1px solid #3c4043;border-radius:8px;padding:6px 12px;font-size:12px;font-weight:600;">🌓 테마 전환 (다크/라이트)</button>',
      actionText: "다크모드 스위치 켜기/끄기",
      actionType: "toggle",
      actionKey: "showThemeToggle"
    },
    whyBox: {
      category: "blocks",
      categoryLabel: "컴포넌트 & 블록",
      icon: "🌌",
      name: "Why 인트로 박스 (Why-Box)",
      desc: "모듈 2, 3, 4에서 핵심 도입 배경을 설명할 때 사용하는 다크 네이비 그라데이션 박스입니다. 묵직하고 신뢰감 있는 비주얼로 독자의 주목을 이끌어내고 프로젝트의 근본적인 목적(Why)을 전달합니다.",
      scenario: "보고서 서두에 '기존 수작업 대비 왜 이 AI 자동화가 필수적인가?'에 대한 핵심 명분을 강조할 때 사용합니다.",
      previewHtml: '<div style="background:linear-gradient(135deg,#0b1a2c,#243551);color:#fff;border-radius:12px;padding:16px;"><span style="font-size:10px;color:#8ab4f8;font-weight:700;letter-spacing:1px;">✦ WHY WE NEED THIS</span><h4 style="margin:4px 0 6px;font-size:14px;color:#fff;">왜 이 자동화가 필요한가?</h4><p style="margin:0;font-size:12px;color:#e8eaed;line-height:1.5;">매주 6시간의 수작업을 10분으로 단축합니다.</p></div>',
      actionText: "Why 인트로 박스 추가",
      actionType: "insert",
      actionKey: "whyBox"
    },
    procBox: {
      category: "blocks",
      categoryLabel: "컴포넌트 & 블록",
      icon: "🔄",
      name: "프로세스 플로우 바 (Procbox)",
      desc: "모듈 3, 4 스타일에 적용된 네이비 캡슐형 프로세스 흐름 바입니다. 여러 시스템 간의 데이터 이동 경로(입력 ➔ AI 처리 ➔ DB 저장 ➔ 알림)를 한 줄 파이프라인으로 일목요연하게 시각화합니다.",
      scenario: "전체 아키텍처나 단계별 실행 과정의 핵심 흐름을 한눈에 명쾌하게 보여줄 때 배치합니다.",
      previewHtml: '<div style="background:rgba(36,53,81,.9);color:#fff;border-radius:10px;padding:8px 12px;display:flex;align-items:center;gap:8px;font-size:12px;"><span style="background:#1967d2;padding:2px 6px;border-radius:999px;font-size:10px;font-weight:700;">PIPELINE</span><span>음성 수집 ➔ Gemini 요약 ➔ 구글 시트 저장</span></div>',
      actionText: "프로세스 플로우 바 추가",
      actionType: "insert",
      actionKey: "procBox"
    },
    kpiStats: {
      category: "blocks",
      categoryLabel: "컴포넌트 & 블록",
      icon: "📊",
      name: "KPI 지표 스코어보드 (KPI Grid)",
      desc: "모듈 3에 적용된 3분할 통계 수치 스코어보드입니다. 거대한 숫자 폰트와 감각적인 색상 액센트(블루, 그린, 레드)를 통해 업무 성과 지표나 단축 시간, 절감율을 강력하게 부각합니다.",
      scenario: "'85% 절감', '1/5 단축', '100% 무결성' 등 정량적 성과 데이터를 경영진이나 팀원에게 즉각 전달할 때 사용합니다.",
      previewHtml: '<div style="display:flex;gap:8px;"><div style="flex:1;background:#fff;border:1px solid #dadce0;border-radius:10px;padding:10px;text-align:center;"><div style="font-size:18px;font-weight:800;color:#1967d2;">85%</div><div style="font-size:10px;color:#5f6368;">수작업 절감</div></div><div style="flex:1;background:#fff;border:1px solid #dadce0;border-radius:10px;padding:10px;text-align:center;"><div style="font-size:18px;font-weight:800;color:#137333;">1/5</div><div style="font-size:10px;color:#5f6368;">소요 시간</div></div></div>',
      actionText: "KPI 지표 카드 추가",
      actionType: "insert",
      actionKey: "kpiStats"
    },
    prompt: {
      category: "blocks",
      categoryLabel: "컴포넌트 & 블록",
      icon: "📋",
      name: "Gemini 프롬프트 카드 (Prompt Box)",
      desc: "모듈 2, 4에서 실습 프롬프트를 배포할 때 사용하는 시그니처 카드입니다. 파스텔 톤 그라데이션(#e9f2ff → #e6f8ef), 점선 테두리, 그리고 누르면 '✅ 복사됨' 피드백을 주는 원클릭 복사 버튼이 포함되어 있습니다.",
      scenario: "사용자가 복사해서 바로 Gemini 웹 또는 API에 붙여넣을 수 있는 고품질 프롬프트를 제공할 때 필수적으로 사용합니다.",
      previewHtml: '<div style="background:linear-gradient(135deg,#e9f2ff,#e6f8ef);border:2px dashed #4a90e8;border-radius:10px;padding:10px;"><div style="display:flex;justify-content:space-between;margin-bottom:6px;"><span style="font-size:11px;font-weight:700;color:#1967d2;">✨ Gemini Prompt</span><span style="font-size:10px;background:#fff;border:1px solid #1967d2;color:#1967d2;padding:2px 6px;border-radius:4px;font-weight:700;">복사</span></div><div style="font-size:11px;color:#202124;font-family:monospace;">당신은 전문 수석 비서입니다...</div></div>',
      actionText: "Gemini 프롬프트 단계 추가",
      actionType: "insert",
      actionKey: "prompt"
    },
    tip: {
      category: "blocks",
      categoryLabel: "컴포넌트 & 블록",
      icon: "💡",
      name: "접이식 팁 아코디언 (Tip Accordion)",
      desc: "모듈 3, 4 스타일에 적용된 <details><summary> 기반 아코디언 카드입니다. 본문 흐름을 방해하지 않으면서도 필요한 사람만 눌러서 심화 노하우나 꿀팁을 확인할 수 있도록 컴팩트하게 접혀 있습니다.",
      scenario: "필수적인 내용은 아니지만 알아두면 매우 유용한 고급 설정 방법, 주의할 점, 단축 팁을 제공할 때 사용합니다.",
      previewHtml: '<div style="background:#f8f9fa;border:1px solid #c6dafc;border-radius:8px;padding:8px 12px;font-size:12px;font-weight:600;color:#0b1a2c;">💡 실습 꿀팁 및 권장 가이드 (펼치기 ▸)</div>',
      actionText: "접이식 팁 단계 추가",
      actionType: "insert",
      actionKey: "tip"
    },
    note: {
      category: "blocks",
      categoryLabel: "컴포넌트 & 블록",
      icon: "ℹ️",
      name: "핵심 안내 노트 (Note Callout)",
      desc: "모듈 2, 3, 4에서 공통으로 쓰이는 왼쪽 파란색 액센트 보더(border-left: 4px solid #4a90e8) 카드입니다. 중요한 참고 데이터 규격이나 권장 전제 조건을 명료하게 안내합니다.",
      scenario: "API 호출 시 필수 파라미터 규칙이나 데이터 정합성 주의점을 환기시킬 때 사용합니다.",
      previewHtml: '<div style="background:#f8fafd;border-left:4px solid #4a90e8;border-radius:0 8px 8px 0;padding:8px 12px;font-size:12px;color:#243551;"><b>ℹ️ 핵심 참고:</b> JSON 응답의 타임스탬프는 ISO-8601 규격을 권장합니다.</div>',
      actionText: "핵심 안내 노트 단계 추가",
      actionType: "insert",
      actionKey: "note"
    },
    warn: {
      category: "blocks",
      categoryLabel: "컴포넌트 & 블록",
      icon: "⚠️",
      name: "주의 경고 박스 (Warning Box)",
      desc: "모듈 3, 4에 적용된 레드/테라코타 왼쪽 액센트 보더(border-left: 4px solid #e05555) 경고 박스입니다. 치명적인 오류나 보안 사고를 방지할 수 있도록 강력한 시각적 주의를 환기합니다.",
      scenario: "API 시크릿 키 유출 주의, 예산/결제 수치 수기 검증, 보안 권한 설정 등 위험 요소를 경고할 때 사용합니다.",
      previewHtml: '<div style="background:#fff5f3;border-left:4px solid #e05555;border-radius:0 8px 8px 0;padding:8px 12px;font-size:12px;color:#7a2020;"><b>⚠️ 주의사항:</b> 공용 저장소에 API 키를 절대 커밋하지 마세요.</div>',
      actionText: "주의 경고 박스 단계 추가",
      actionType: "insert",
      actionKey: "warn"
    },
    urlbox: {
      category: "blocks",
      categoryLabel: "컴포넌트 & 블록",
      icon: "🌐",
      name: "URL 리소스 상자 (Resource Box)",
      desc: "모듈 2, 3에서 구글 시트 템플릿, Apps Script 콘솔, 대시보드 링크를 제공할 때 사용하는 전용 상자입니다. 민트-그레이 그라데이션 배경과 원클릭 '열기 ↗' 새창 이동 버튼이 탑재되어 있습니다.",
      scenario: "사용자가 바로 복사하거나 열어볼 수 있는 외부 공식 문서, 깃허브 코드, 스프레드시트 사본 링크를 제공할 때 사용합니다.",
      previewHtml: '<div style="background:linear-gradient(135deg,#e6f8ef,#f1f3f4);border:1px solid #dadce0;border-radius:10px;padding:8px 12px;display:flex;justify-content:space-between;align-items:center;"><div style="font-size:12px;"><b style="color:#137333;">🔗 관련 리소스</b><div style="font-size:10px;color:#5f6368;">https://docs.google.com/...</div></div><span style="background:#fff;border:1px solid #c6dafc;padding:3px 8px;border-radius:6px;font-size:11px;color:#1967d2;font-weight:700;">열기 ↗</span></div>',
      actionText: "URL 리소스 단계 추가",
      actionType: "insert",
      actionKey: "urlbox"
    }
  };

  var STORAGE_KEY = 'gemini_studio_saved_works';
  var currentLoadedWorkKey = null;
  var currentData = JSON.parse(JSON.stringify(PRESETS.weekly));

  // ── 저장소 헬퍼 ──
  function getSavedWorks() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch(e) {
      console.warn('localStorage read error', e);
      return {};
    }
  }

  function setSavedWorks(map) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
    } catch(e) {
      console.warn('localStorage write error', e);
    }
  }

  // ── 상단 "템플릿:" 드롭다운 옵션 렌더링 ──
  function updatePresetDropdown(selectedKey) {
    var select = document.getElementById('presetSelect');
    select.innerHTML = '';

    var saved = getSavedWorks();
    var savedKeys = Object.keys(saved);

    if (savedKeys.length > 0) {
      var savedGroup = document.createElement('optgroup');
      savedGroup.label = '✨ 내 저장된 작업 (My Saved Work)';
      savedKeys.forEach(function(k) {
        var opt = document.createElement('option');
        opt.value = 'saved:' + k;
        opt.textContent = '📑 ' + (saved[k].name || '이름 없는 작업') + ' (' + (saved[k].updatedAt || '최근') + ')';
        savedGroup.appendChild(opt);
      });
      select.appendChild(savedGroup);
    }

    var presetGroup = document.createElement('optgroup');
    presetGroup.label = '📂 기본 템플릿 (Preset Templates)';
    var p1 = document.createElement('option'); p1.value = 'weekly'; p1.textContent = 'AI 주간 업무 보고서'; presetGroup.appendChild(p1);
    var p2 = document.createElement('option'); p2.value = 'project'; p2.textContent = '신규 프로젝트 런칭 로드맵'; presetGroup.appendChild(p2);
    var p3 = document.createElement('option'); p3.value = 'onboarding'; p3.textContent = 'AI 도구 온보딩 & 가이드'; presetGroup.appendChild(p3);
    select.appendChild(presetGroup);

    if (selectedKey) {
      select.value = selectedKey;
    } else if (currentLoadedWorkKey && saved[currentLoadedWorkKey]) {
      select.value = 'saved:' + currentLoadedWorkKey;
    } else {
      select.value = 'weekly';
    }

    updateDeleteBtnVisibility();
  }

  function updateDeleteBtnVisibility() {
    var select = document.getElementById('presetSelect');
    var delBtn = document.getElementById('deleteWorkBtn');
    if(!delBtn) return;
    if(select.value && select.value.startsWith('saved:')){
      delBtn.style.display = 'inline-flex';
    } else {
      delBtn.style.display = 'none';
    }
  }

  // ── 작업 저장 모달 열기/닫기 ──
  document.getElementById('openSaveBtn').addEventListener('click', function(){
    var nameInput = document.getElementById('saveWorkName');
    nameInput.value = currentData.title || '나만의 워크플로우 보고서';
    document.getElementById('saveModal').style.display = 'flex';
    setTimeout(function(){ nameInput.focus(); nameInput.select(); }, 50);
  });

  window.closeSaveModal = function(){
    document.getElementById('saveModal').style.display = 'none';
  };

  window.confirmSaveWork = function(){
    var nameInput = document.getElementById('saveWorkName');
    var workName = (nameInput.value || '').trim();
    if(!workName){
      alert('작업 이름을 입력해 주세요.');
      nameInput.focus();
      return;
    }

    var now = new Date();
    var timeStr = (now.getMonth()+1) + '/' + now.getDate() + ' ' +
                  String(now.getHours()).padStart(2, '0') + ':' +
                  String(now.getMinutes()).padStart(2, '0');

    var saved = getSavedWorks();
    var workId = 'work_' + Date.now();

    if(currentLoadedWorkKey && saved[currentLoadedWorkKey] && saved[currentLoadedWorkKey].name === workName){
      workId = currentLoadedWorkKey;
    }

    saved[workId] = {
      id: workId,
      name: workName,
      data: JSON.parse(JSON.stringify(currentData)),
      updatedAt: timeStr
    };

    setSavedWorks(saved);
    currentLoadedWorkKey = workId;

    closeSaveModal();
    updatePresetDropdown('saved:' + workId);
    showToast('✅ "' + workName + '" 작업이 안전하게 저장되었습니다!');
  };

  // ── 저장된 작업 삭제 버튼 ──
  document.getElementById('deleteWorkBtn').addEventListener('click', function(){
    var select = document.getElementById('presetSelect');
    var val = select.value;
    if(!val || !val.startsWith('saved:')) return;

    var workId = val.replace('saved:', '');
    var saved = getSavedWorks();
    var workName = saved[workId] ? saved[workId].name : '선택된 작업';

    if(confirm('정말 "' + workName + '" 저장 작업을 삭제하시겠습니까?')){
      delete saved[workId];
      setSavedWorks(saved);
      currentLoadedWorkKey = null;
      updatePresetDropdown('weekly');
      currentData = JSON.parse(JSON.stringify(PRESETS.weekly));
      syncFormFromData();
      showToast('🗑️ "' + workName + '" 작업이 삭제되었습니다.');
    }
  });

  // ── 템플릿 & 저장 작업 선택 (불러오기) ──
  document.getElementById('presetSelect').addEventListener('change', function(e){
    var k = e.target.value;
    updateDeleteBtnVisibility();

    if(k.startsWith('saved:')){
      var workId = k.replace('saved:', '');
      var saved = getSavedWorks();
      if(saved[workId] && saved[workId].data){
        currentData = JSON.parse(JSON.stringify(saved[workId].data));
        currentLoadedWorkKey = workId;
        syncFormFromData();
        showToast('📂 "' + saved[workId].name + '" 작업을 불러왔습니다.');
      }
    } else if(PRESETS[k]){
      currentLoadedWorkKey = null;
      currentData = JSON.parse(JSON.stringify(PRESETS[k]));
      syncFormFromData();
      showToast('📂 템플릿을 불러왔습니다.');
    }
  });

  // ── 툴바 섹션 펼침/숨김 기능 (요구사항 1) ──
  window.toggleToolbarSection = function(){
    var card = document.getElementById('toolbarSectionCard');
    var isCollapsed = card.classList.toggle('collapsed');
    var hint = document.getElementById('tbToggleHint');
    if(hint) hint.textContent = isCollapsed ? '펼치기' : '접기';
  };

  // ── 툴바 기능 토글 (요구사항 3 버튼 방식) ──
  window.toggleToolbarFeature = function(key){
    currentData.toolbar = currentData.toolbar || {};
    currentData.toolbar.enabled = true;
    currentData.toolbar[key] = !currentData.toolbar[key];
    syncToolbarButtons();
    updateLivePreview();
    document.getElementById('jsonEditor').value = JSON.stringify(currentData, null, 2);
  };

  function syncToolbarButtons(){
    var tb = currentData.toolbar || {};
    var features = [
      { key: 'showSearch', btnId: 'btnToolSearch', pillId: 'pillToolSearch' },
      { key: 'showSuggestChips', btnId: 'btnToolChips', pillId: 'pillToolChips' },
      { key: 'showCategoryTabs', btnId: 'btnToolTabs', pillId: 'pillToolTabs' },
      { key: 'showPrint', btnId: 'btnToolPrint', pillId: 'pillToolPrint' },
      { key: 'showProgress', btnId: 'btnToolProgress', pillId: 'pillToolProgress' },
      { key: 'showThemeToggle', btnId: 'btnToolTheme', pillId: 'pillToolTheme' }
    ];

    var activeCount = 0;
    features.forEach(function(f){
      var active = !!tb[f.key];
      if(active) activeCount++;
      var btn = document.getElementById(f.btnId);
      var pill = document.getElementById(f.pillId);
      if(btn){
        if(active) btn.classList.add('active');
        else btn.classList.remove('active');
      }
      if(pill){
        pill.textContent = active ? 'ON' : 'OFF';
      }
    });

    var badge = document.getElementById('tbActiveCountBadge');
    if(badge) badge.textContent = activeCount + '개 활성';

    var searchInp = document.getElementById('tbSearchPlaceholder');
    if(searchInp) searchInp.value = tb.searchPlaceholder || '';

    var chipsInp = document.getElementById('tbSuggestChips');
    if(chipsInp) chipsInp.value = (tb.suggestChips || []).join(', ');

    var tabsInp = document.getElementById('tbCategoryTabs');
    if(tabsInp) tabsInp.value = (tb.categoryTabs || []).join(', ');

    var subBox = document.getElementById('subToolbarSettings');
    if(subBox){
      subBox.style.display = (tb.showSearch || tb.showSuggestChips || tb.showCategoryTabs) ? 'block' : 'none';
    }
  }

  window.updateToolbarText = function(key, val){
    currentData.toolbar = currentData.toolbar || {};
    currentData.toolbar[key] = val;
    updateLivePreview();
    document.getElementById('jsonEditor').value = JSON.stringify(currentData, null, 2);
  };

  window.updateSuggestChips = function(val){
    currentData.toolbar = currentData.toolbar || {};
    currentData.toolbar.suggestChips = val.split(',').map(function(s){ return s.trim(); }).filter(Boolean);
    updateLivePreview();
    document.getElementById('jsonEditor').value = JSON.stringify(currentData, null, 2);
  };

  window.updateCategoryTabs = function(val){
    currentData.toolbar = currentData.toolbar || {};
    currentData.toolbar.categoryTabs = val.split(',').map(function(s){ return s.trim(); }).filter(Boolean);
    updateLivePreview();
    document.getElementById('jsonEditor').value = JSON.stringify(currentData, null, 2);
  };

  // ── 도구 설명 & 적용 예시 모달 (요구사항 2) ──
  window.openToolHelpModal = function(e, toolKey){
    if(e) e.stopPropagation();
    var tool = TOOL_REGISTRY[toolKey];
    if(!tool) return;

    document.getElementById('toolHelpIcon').textContent = tool.icon;
    document.getElementById('toolHelpTitle').textContent = tool.name;
    var catBadge = document.getElementById('toolHelpCategory');
    catBadge.textContent = tool.categoryLabel;
    if(tool.category === 'layout'){
      catBadge.style.background = '#e8f0fe';
      catBadge.style.color = '#1967d2';
      catBadge.style.borderColor = '#c6dafc';
    } else {
      catBadge.style.background = '#f3e8fd';
      catBadge.style.color = '#7627bb';
      catBadge.style.borderColor = '#d7bbf5';
    }

    document.getElementById('toolHelpDesc').textContent = tool.desc;
    document.getElementById('toolHelpScenario').textContent = tool.scenario;
    document.getElementById('toolHelpPreviewWrap').innerHTML = tool.previewHtml || '<p style="color:#5f6368;">예시 미리보기 준비 중</p>';

    var actionBtn = document.getElementById('toolHelpActionBtn');
    actionBtn.textContent = tool.actionText;
    actionBtn.onclick = function(){
      closeToolHelpModal();
      if(tool.actionType === 'toggle'){
        toggleToolbarFeature(tool.actionKey);
      } else if(tool.actionType === 'insert'){
        insertWidget(tool.actionKey);
      }
    };

    document.getElementById('toolHelpModal').style.display = 'flex';
  };

  window.closeToolHelpModal = function(){
    document.getElementById('toolHelpModal').style.display = 'none';
  };

  // ── 장식 요소 & 위젯 추가 (요구사항 2 & 3: 버튼 클릭 시 기능 추가) ──
  window.insertWidget = function(type){
    if(type === 'whyBox'){
      currentData.whyBox = currentData.whyBox || {
        enabled: true,
        title: "💡 왜 이 워크플로우를 도입해야 하는가?",
        desc: "기존 수작업 대비 업무 소요 시간을 80% 단축하고 휴먼 에러를 원천 차단하는 Google 워크스페이스 기반 실전 자동화 아키텍처입니다."
      };
      currentData.whyBox.enabled = true;
      syncFormFromData();
      showToast('✨ [Why 인트로 박스]가 추가되었습니다!');
      var target = document.querySelector('[data-editor-id="whyBox"]');
      if(target) target.scrollIntoView({ behavior:'smooth', block:'center' });
    } else if(type === 'procBox'){
      currentData.procBox = currentData.procBox || {
        enabled: true,
        badge: "AUTOMATION PIPELINE",
        title: "데이터 수집 ➔ Gemini 프롬프트 처리 ➔ 스프레드시트 기록 ➔ 자동 발송"
      };
      currentData.procBox.enabled = true;
      syncFormFromData();
      showToast('✨ [프로세스 플로우 바]가 추가되었습니다!');
      var target = document.querySelector('[data-editor-id="procBox"]');
      if(target) target.scrollIntoView({ behavior:'smooth', block:'center' });
    } else if(type === 'kpiStats'){
      currentData.kpiStats = currentData.kpiStats || [];
      currentData.kpiStats.push({ "num": "99%", "label": "신규 성과 지표", "color": "#1967d2" });
      syncFormFromData();
      showToast('✨ [KPI 스코어보드 지표]가 추가되었습니다!');
      var target = document.querySelector('[data-editor-id="kpiStats"]');
      if(target) target.scrollIntoView({ behavior:'smooth', block:'center' });
    } else if(type === 'prompt'){
      currentData.steps = currentData.steps || [];
      currentData.steps.push({
        num: String(currentData.steps.length + 1),
        title: "Gemini AI 원클릭 프롬프트 실행 단계",
        tool: "Gemini 2.5 Pro",
        goal: "복사 가능한 실무 프롬프트로 결과물 즉시 추출",
        desc: "아래 프롬프트 박스의 복사 버튼을 눌러 Gemini에 전달하세요.",
        prompt: "당신은 AI 업무 자동화 전문가입니다. 아래 과제를 단계별로 해결하는 마스터플랜을 작성해주세요.",
        tip: "더 정밀한 결과를 원하면 출력 포맷을 마크다운 표로 지정하세요."
      });
      syncFormFromData();
      showToast('✨ [Gemini 프롬프트 카드] 실행 단계가 추가되었습니다!');
      var target = document.querySelector('[data-editor-id="step-' + (currentData.steps.length - 1) + '"]');
      if(target) target.scrollIntoView({ behavior:'smooth', block:'center' });
    } else if(type === 'tip'){
      currentData.steps = currentData.steps || [];
      currentData.steps.push({
        num: String(currentData.steps.length + 1),
        title: "실무 꿀팁 및 권장 가이드라인",
        tool: "Best Practice",
        goal: "오류 방지 및 성능 최적화 팁 숙지",
        desc: "상세 팁은 클릭 시 펼쳐지는 아코디언으로 제공됩니다.",
        tip: "Apps Script 트리거 시간 간격을 5분 이상으로 설정하면 할당량 초과(Quota Error)를 사전에 방지할 수 있습니다."
      });
      syncFormFromData();
      showToast('✨ [접이식 팁 아코디언] 실행 단계가 추가되었습니다!');
      var target = document.querySelector('[data-editor-id="step-' + (currentData.steps.length - 1) + '"]');
      if(target) target.scrollIntoView({ behavior:'smooth', block:'center' });
    } else if(type === 'note'){
      currentData.steps = currentData.steps || [];
      currentData.steps.push({
        num: String(currentData.steps.length + 1),
        title: "핵심 참고 사항 및 데이터 규격",
        tool: "Reference Note",
        goal: "데이터 파이프라인 무결성 유지",
        desc: "중요 포인트 안내 박스를 포함한 실행 단계입니다.",
        note: "API 호출 시 JSON 응답의 타임스탬프 필드는 UTC 기준 ISO-8601 형식을 준수해야 합니다."
      });
      syncFormFromData();
      showToast('✨ [핵심 안내 노트] 실행 단계가 추가되었습니다!');
      var target = document.querySelector('[data-editor-id="step-' + (currentData.steps.length - 1) + '"]');
      if(target) target.scrollIntoView({ behavior:'smooth', block:'center' });
    } else if(type === 'warn'){
      currentData.steps = currentData.steps || [];
      currentData.steps.push({
        num: String(currentData.steps.length + 1),
        title: "보안 점검 및 접근 제어 주의사항",
        tool: "Security Warning",
        goal: "외부 유출 방지 및 토큰 관리",
        desc: "주의/경고 박스가 포함된 단계입니다.",
        warn: "공용 저장소(GitHub Public)에 API 시크릿 키나 서비스 계정 키 파일을 절대 커밋하지 마세요."
      });
      syncFormFromData();
      showToast('✨ [주의 경고 박스] 실행 단계가 추가되었습니다!');
      var target = document.querySelector('[data-editor-id="step-' + (currentData.steps.length - 1) + '"]');
      if(target) target.scrollIntoView({ behavior:'smooth', block:'center' });
    } else if(type === 'urlbox'){
      currentData.steps = currentData.steps || [];
      currentData.steps.push({
        num: String(currentData.steps.length + 1),
        title: "외부 연동 리소스 및 스프레드시트 템플릿",
        tool: "External Resource",
        goal: "사전 제작된 구글 시트 템플릿 사본 만들기",
        desc: "아래 URL 리소스 박스에서 사본 링크를 바로 열 수 있습니다.",
        url: "https://docs.google.com/spreadsheets",
        urlLabel: "구글 스프레드시트 업무 템플릿 열기"
      });
      syncFormFromData();
      showToast('✨ [URL 리소스 상자] 실행 단계가 추가되었습니다!');
      var target = document.querySelector('[data-editor-id="step-' + (currentData.steps.length - 1) + '"]');
      if(target) target.scrollIntoView({ behavior:'smooth', block:'center' });
    }
    updateLivePreview();
    document.getElementById('jsonEditor').value = JSON.stringify(currentData, null, 2);
  };

  // Toast 알림
  function showToast(msg){
    var prev = document.querySelector('.toast-notification');
    if(prev) prev.remove();
    var toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.textContent = msg;
    document.body.appendChild(toast);
    setTimeout(function(){ toast.remove(); }, 2400);
  }

  // ── HTML 렌더러 (보고서 생성 엔진) ──
  // isExport === true: 내려받기/복사용 순수 시맨틱 HTML (하이라이트 및 인스펙터 스크립트 제거)
  // isExport === false: 에디터 실시간 미리보기용 HTML (Chrome DevTools 양방향 요소 검사기 포함)
  function renderReportHtml(config, isExport) {
    function esc(s){ return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }
    function fmtTitle(t){
      var s = esc(t);
      if(s.indexOf('AI')!==-1) s = s.replace(/AI/g, '<span class="glow">AI</span>');
      return s;
    }

    // 인스펙터 속성 주입 헬퍼 (내보내기 모드에서는 완전 제거)
    function inspectAttr(id, name, level) {
      if (isExport) return '';
      return ' data-inspect-id="' + esc(id) + '" data-inspect-name="' + esc(name) + '" data-inspect-level="' + esc(level || 'container') + '"';
    }

    var title = config.title || '워크플로우 보고서';
    var badge = config.badge || '✨ WORKFLOW & REPORT';
    var description = config.description || '';
    var meta = config.meta || [];
    var flowmap = config.flowmap || [];
    var cards = config.cards || [];
    var steps = config.steps || [];
    var checklist = config.checklist || [];
    var tb = config.toolbar || { enabled: true, showSearch: true, showPrint: true, showProgress: true, showThemeToggle: true };
    var whyBox = config.whyBox;
    var procBox = config.procBox;
    var kpiStats = config.kpiStats || [];

    var buf = [];
    buf.push('<!DOCTYPE html>\\n<html lang="ko">\\n<head>\\n');
    buf.push('<meta charset="UTF-8">\\n<meta name="viewport" content="width=device-width, initial-scale=1.0">\\n');
    buf.push('<title>' + esc(title) + '</title>\\n');
    buf.push('<link rel="preload" href="./assets/subset-Pretendard-Regular.woff2" as="font" type="font/woff2" crossorigin>\\n');
    buf.push('<link rel="preload" href="./assets/subset-Pretendard-Bold.woff2" as="font" type="font/woff2" crossorigin>\\n');
    buf.push('<style>\\n');
    buf.push('@font-face { font-family:"Pretendard"; font-weight:400; font-display:swap; src:url("./assets/subset-Pretendard-Regular.woff2") format("woff2"); }\\n');
    buf.push('@font-face { font-family:"Pretendard"; font-weight:600; font-display:swap; src:url("./assets/subset-Pretendard-SemiBold.woff2") format("woff2"); }\\n');
    buf.push('@font-face { font-family:"Pretendard"; font-weight:700; font-display:swap; src:url("./assets/subset-Pretendard-Bold.woff2") format("woff2"); }\\n');
    buf.push('@font-face { font-family:"Pretendard"; font-weight:800; font-display:swap; src:url("./assets/subset-Pretendard-ExtraBold.woff2") format("woff2"); }\\n');
    buf.push(':root { --navy:#0b1a2c; --navy-2:#243551; --white:#ffffff; --paper:#ffffff; --bg:#f8fafd; --text:#1f2328; --muted:#5f6368; --line:#dadce0; --blue:#1967d2; --teal:#137333; --terra:#c5221f; --accent:#f9ab00; --shadow:0 8px 24px rgba(36,53,81,.06); }\\n');
    buf.push('body.dark-theme { --navy:#e8eaed; --navy-2:#bdc1c6; --white:#1f2328; --paper:#202124; --bg:#121212; --text:#e8eaed; --muted:#9aa0a6; --line:#3c4043; --shadow:0 8px 24px rgba(0,0,0,.5); }\\n');
    buf.push('* { box-sizing:border-box; }\\n');
    buf.push('body { margin:0; padding:0; font-family:"Pretendard",system-ui,sans-serif; color:var(--text); background:var(--bg); line-height:1.6; transition:background .2s, color .2s; }\\n');
    buf.push('.wrap { max-width:980px; margin:0 auto; padding:40px 24px 80px; }\\n');
    buf.push('.tb-progress-bar { position:fixed; top:0; left:0; height:3px; width:0; background:linear-gradient(90deg,#4a90e8,#34a853,#ea4335); z-index:9999; transition:width .1s; }\\n');
    buf.push('.report-toolbar { position:sticky; top:0; z-index:100; background:rgba(255,255,255,.94); backdrop-filter:blur(8px); border-bottom:1px solid var(--line); display:flex; align-items:center; justify-content:space-between; padding:10px 24px; box-shadow:0 1px 4px rgba(60,64,67,.08); }\\n');
    buf.push('body.dark-theme .report-toolbar { background:rgba(26,28,30,.92); }\\n');
    buf.push('.tb-left { display:flex; align-items:center; gap:8px; font-weight:700; font-size:.92rem; color:var(--navy); }\\n');
    buf.push('.tb-search-wrap { position:relative; flex:1; max-width:380px; margin:0 16px; }\\n');
    buf.push('.tb-search-input { width:100%; font-family:inherit; font-size:.85rem; padding:7px 12px 7px 32px; border-radius:999px; border:1px solid var(--line); background:var(--bg); color:var(--text); outline:none; transition:.15s; }\\n');
    buf.push('.tb-search-input:focus { border-color:var(--blue); background:#fff; box-shadow:0 0 0 3px rgba(25,103,210,.14); }\\n');
    buf.push('.tb-search-icon { position:absolute; left:11px; top:50%; transform:translateY(-50%); font-size:.85rem; color:var(--muted); pointer-events:none; }\\n');
    buf.push('.tb-search-dropdown { position:absolute; top:calc(100% + 6px); left:0; right:0; background:var(--paper); border:1px solid var(--line); border-radius:12px; box-shadow:0 10px 30px rgba(0,0,0,.15); max-height:320px; overflow-y:auto; display:none; z-index:1000; }\\n');
    buf.push('.tb-search-item { padding:10px 14px; border-bottom:1px solid var(--line); cursor:pointer; font-size:.84rem; display:flex; align-items:center; gap:8px; }\\n');
    buf.push('.tb-search-item:hover { background:rgba(25,103,210,.08); }\\n');
    buf.push('.tb-search-badge { font-size:.72rem; font-weight:700; padding:2px 6px; border-radius:4px; background:#e8f0fe; color:var(--blue); }\\n');
    buf.push('.tb-search-title { font-weight:600; color:var(--text); flex:1; }\\n');
    buf.push('.tb-actions { display:flex; align-items:center; gap:8px; }\\n');
    buf.push('.tb-btn { display:inline-flex; align-items:center; gap:5px; font-family:inherit; font-size:.82rem; font-weight:600; padding:6px 12px; border-radius:8px; border:1px solid var(--line); background:var(--paper); color:var(--text); cursor:pointer; transition:.14s; }\\n');
    buf.push('.tb-btn:hover { background:rgba(0,0,0,.04); border-color:#c6dafc; }\\n');
    buf.push('header.hero { text-align:center; padding:40px 0 24px; position:relative; }\\n');
    buf.push('.stamp-badge { display:inline-flex; align-items:center; gap:8px; border:1px solid #dadce0; color:#5f6368; padding:6px 16px; border-radius:999px; font-weight:700; font-size:.8rem; letter-spacing:.12em; text-transform:uppercase; background:rgba(255,255,255,.8); box-shadow:0 2px 8px rgba(0,0,0,.04); }\\n');
    buf.push('body.dark-theme .stamp-badge { background:rgba(255,255,255,.08); border-color:#4a5056; color:#bdc1c6; }\\n');
    buf.push('h1 { font-size:2.4rem; font-weight:800; color:var(--navy); margin:18px 0 14px; line-height:1.25; letter-spacing:-.02em; }\\n');
    buf.push('h1 .glow { background:linear-gradient(135deg,#4a90e8,#ee4d5d); -webkit-background-clip:text; -webkit-text-fill-color:transparent; }\\n');
    buf.push('p.lead { font-size:1.1rem; color:var(--muted); max-width:760px; margin:0 auto 24px; line-height:1.65; }\\n');
    buf.push('.meta-chips { display:flex; justify-content:center; gap:10px; flex-wrap:wrap; margin-top:16px; }\\n');
    buf.push('.meta-chip { background:rgba(25,103,210,.08); border:1px solid rgba(25,103,210,.18); padding:6px 14px; border-radius:999px; font-size:.84rem; color:var(--blue); font-weight:600; }\\n');
    buf.push('.suggest-chips-bar { display:flex; align-items:center; justify-content:center; gap:8px; flex-wrap:wrap; margin:14px 0; }\\n');
    buf.push('.chip-label { font-size:.8rem; font-weight:700; color:var(--muted); }\\n');
    buf.push('.suggest-chip { font-size:.78rem; font-weight:600; background:rgba(25,103,210,.08); color:var(--blue); border:1px solid rgba(25,103,210,.18); padding:4px 10px; border-radius:999px; cursor:pointer; transition:.14s; }\\n');
    buf.push('.suggest-chip:hover { background:var(--blue); color:#fff; }\\n');
    buf.push('.category-tabs-bar { display:flex; justify-content:center; gap:8px; flex-wrap:wrap; margin:20px 0; }\\n');
    buf.push('.category-tab { border:1px solid var(--line); background:var(--paper); color:var(--navy-2); font-family:inherit; font-weight:600; font-size:.86rem; padding:7px 16px; border-radius:999px; cursor:pointer; transition:.16s; }\\n');
    buf.push('.category-tab:hover { border-color:#c6dafc; }\\n');
    buf.push('.category-tab.active { background:var(--navy); color:#fff; border-color:var(--navy); }\\n');
    buf.push('.why-box { background:linear-gradient(135deg,var(--navy),var(--navy-2)); color:#f1f3f4; border-radius:20px; padding:28px 30px; margin:28px 0; box-shadow:0 10px 30px rgba(11,26,44,0.12); position:relative; }\\n');
    buf.push('.why-eyebrow { font-size:.75rem; font-weight:700; letter-spacing:.12em; color:#8ab4f8; display:block; margin-bottom:6px; }\\n');
    buf.push('.why-box h3 { color:#fff; margin:0 0 10px; font-size:1.25rem; font-weight:700; }\\n');
    buf.push('.why-box p { color:#e8eaed; line-height:1.65; margin:0; font-size:.95rem; }\\n');
    buf.push('.procbox { background:rgba(36,53,81,.88); color:#fff; padding:13px 20px; border-radius:14px; text-align:center; margin:20px 0; display:flex; align-items:center; justify-content:center; gap:12px; flex-wrap:wrap; box-shadow:0 4px 16px rgba(0,0,0,.08); }\\n');
    buf.push('.proc-badge { background:#1967d2; font-size:.74rem; font-weight:700; padding:3px 9px; border-radius:999px; letter-spacing:.08em; }\\n');
    buf.push('.proc-text { font-weight:600; font-size:.92rem; }\\n');
    buf.push('.kpi-grid { display:grid; grid-template-columns:repeat(auto-fit, minmax(180px, 1fr)); gap:14px; margin:24px 0; }\\n');
    buf.push('.kpi-card { background:var(--paper); border:1px solid var(--line); border-radius:16px; padding:20px 16px; text-align:center; box-shadow:0 4px 14px rgba(36,53,81,.04); transition:.16s; }\\n');
    buf.push('.kpi-card:hover { transform:translateY(-2px); box-shadow:0 8px 20px rgba(36,53,81,.08); }\\n');
    buf.push('.kpi-num { font-size:1.9rem; font-weight:800; line-height:1.1; margin-bottom:6px; }\\n');
    buf.push('.kpi-label { font-size:.84rem; font-weight:600; color:var(--muted); }\\n');
    buf.push('section { margin:46px 0; }\\n');
    buf.push('.eyebrow { font-size:.78rem; font-weight:800; color:var(--blue); letter-spacing:.14em; text-transform:uppercase; margin-bottom:6px; }\\n');
    buf.push('h2.sec { font-size:1.55rem; font-weight:800; color:var(--navy); margin:0 0 8px; }\\n');
    buf.push('.flowmap { display:flex; align-items:stretch; gap:12px; margin-top:20px; overflow-x:auto; padding-bottom:12px; }\\n');
    buf.push('.fstep { flex:1; min-width:180px; background:var(--paper); border:1px solid var(--line); border-radius:14px; padding:16px; position:relative; box-shadow:var(--shadow); display:flex; flex-direction:column; gap:8px; border-top:4px solid var(--accent,#1967d2); }\\n');
    buf.push('.fnum { width:24px; height:24px; border-radius:50%; background:var(--accent,#1967d2); color:#fff; font-size:.75rem; font-weight:800; display:flex; align-items:center; justify-content:center; }\\n');
    buf.push('.fmeta b { font-size:.95rem; color:var(--navy); display:block; margin-bottom:4px; }\\n');
    buf.push('.fmeta .ft { font-size:.82rem; color:var(--muted); line-height:1.45; display:block; }\\n');
    buf.push('.farrow { align-self:center; font-size:1.2rem; color:var(--muted); }\\n');
    buf.push('.modgrid { display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:20px; margin-top:20px; }\\n');
    buf.push('.flip { perspective:1000px; height:220px; cursor:pointer; }\\n');
    buf.push('.flip-inner { position:relative; width:100%; height:100%; transition:transform .5s cubic-bezier(.16,1,.3,1); transform-style:preserve-3d; border-radius:18px; }\\n');
    buf.push('.flip.flipped .flip-inner { transform:rotateY(180deg); }\\n');
    buf.push('.face { position:absolute; inset:0; backface-visibility:hidden; border-radius:18px; padding:22px; display:flex; flex-direction:column; justify-content:space-between; border:1px solid var(--line); box-shadow:var(--shadow); }\\n');
    buf.push('.face.front { background:var(--paper); border-left:5px solid var(--accent,#1967d2); }\\n');
    buf.push('.face.back { background:linear-gradient(135deg,var(--navy),var(--navy-2)); color:#fff; transform:rotateY(180deg); border:none; }\\n');
    buf.push('.card-badge { font-size:.72rem; font-weight:700; color:var(--accent,#1967d2); text-transform:uppercase; letter-spacing:.08em; display:block; margin-bottom:6px; }\\n');
    buf.push('.face.back .card-badge { color:#8ab4f8; }\\n');
    buf.push('.face h3 { margin:0; font-size:1.15rem; font-weight:700; color:var(--navy); line-height:1.4; }\\n');
    buf.push('.tags { display:flex; gap:6px; flex-wrap:wrap; margin-top:8px; }\\n');
    buf.push('.tag { font-size:.72rem; padding:3px 8px; border-radius:6px; background:#f1f3f4; color:#3c4043; font-weight:600; }\\n');
    buf.push('.flip-hint { font-size:.72rem; color:var(--muted); align-self:flex-end; font-weight:600; }\\n');
    buf.push('.face.back .flip-hint { color:#bdc1c6; }\\n');
    buf.push('.backbody p { font-size:.88rem; line-height:1.6; margin:0; color:#e8eaed; }\\n');
    buf.push('.step-list { display:flex; flex-direction:column; gap:20px; margin-top:20px; }\\n');
    buf.push('.step-card { background:var(--paper); border:1px solid var(--line); border-radius:20px; padding:22px 24px; box-shadow:var(--shadow); transition:all .2s; }\\n');
    buf.push('.step-card.done { opacity:.68; background:#f8f9fa; border-color:#e0e0e0; }\\n');
    buf.push('.step-top { display:flex; align-items:center; justify-content:space-between; cursor:pointer; user-select:none; }\\n');
    buf.push('.step-title-group { display:flex; align-items:center; gap:12px; }\\n');
    buf.push('.step-num { width:30px; height:30px; border-radius:50%; background:var(--blue); color:#fff; font-size:.85rem; font-weight:800; display:flex; align-items:center; justify-content:center; }\\n');
    buf.push('.step-title { font-size:1.15rem; font-weight:700; color:var(--navy); margin:0; }\\n');
    buf.push('.tool-tag { font-size:.74rem; font-weight:700; color:var(--blue); background:#e8f0fe; padding:3px 10px; border-radius:999px; }\\n');
    buf.push('.done-btn { font-size:.78rem; font-weight:600; padding:6px 12px; border-radius:8px; border:1px solid var(--line); background:#fff; color:var(--muted); cursor:pointer; }\\n');
    buf.push('.step-card.done .done-btn { background:#e6f4ea; color:#137333; border-color:#ceead6; font-weight:700; }\\n');
    buf.push('.step-body { margin-top:16px; padding-top:14px; border-top:1px dashed var(--line); }\\n');
    buf.push('.step-goal { font-size:.88rem; font-weight:700; color:var(--blue); margin-bottom:8px; display:flex; align-items:center; gap:6px; }\\n');
    buf.push('.step-desc { font-size:.92rem; color:var(--text); line-height:1.6; margin-bottom:12px; }\\n');
    buf.push('.prompt-box { background:linear-gradient(135deg,#e9f2ff,#e6f8ef); border:2px dashed #4a90e8; border-radius:16px; padding:16px 18px; margin:14px 0; position:relative; }\\n');
    buf.push('.prompt-header { display:flex; align-items:center; justify-content:space-between; margin-bottom:8px; }\\n');
    buf.push('.prompt-badge { display:inline-flex; align-items:center; gap:5px; font-size:.76rem; font-weight:700; color:#1967d2; background:#fff; padding:3px 9px; border-radius:6px; box-shadow:0 1px 3px rgba(0,0,0,.08); }\\n');
    buf.push('.prompt-box pre { margin:0; font-family:"Consolas","Menlo",monospace; font-size:.84rem; color:#202124; white-space:pre-wrap; word-break:break-all; line-height:1.6; }\\n');
    buf.push('.copy-btn { font-size:.75rem; font-weight:700; padding:4px 10px; border-radius:6px; border:1px solid #1967d2; background:#fff; color:#1967d2; cursor:pointer; transition:.14s; }\\n');
    buf.push('.copy-btn:hover { background:#1967d2; color:#fff; }\\n');
    buf.push('.tip-box-collapsible { margin:12px 0; background:#f8f9fa; border:1px solid #c6dafc; border-radius:12px; padding:2px 14px; }\\n');
    buf.push('.tip-box-collapsible summary { cursor:pointer; font-weight:700; color:var(--navy); padding:10px 0; list-style:none; font-size:.90rem; display:flex; align-items:center; gap:6px; }\\n');
    buf.push('.tip-body { padding:4px 0 10px; font-size:.88rem; color:#3c4043; line-height:1.6; }\\n');
    buf.push('.note-box { background:#f8fafd; border-left:4px solid #4a90e8; border-radius:0 10px 10px 0; padding:12px 16px; margin:12px 0; font-size:.90rem; color:var(--navy-2); line-height:1.6; }\\n');
    buf.push('.warn-box { background:#fff5f3; border-left:4px solid #e05555; border-radius:0 10px 10px 0; padding:12px 16px; margin:12px 0; font-size:.90rem; color:#7a2020; line-height:1.6; }\\n');
    buf.push('.urlbox-wrap { background:linear-gradient(135deg,#e6f8ef,#f1f3f4); border:1px solid var(--line); border-radius:14px; padding:12px 16px; margin:12px 0; display:flex; align-items:center; justify-content:space-between; gap:12px; flex-wrap:wrap; }\\n');
    buf.push('.urlbox-meta { display:flex; flex-direction:column; }\\n');
    buf.push('.urlbox-meta b { font-size:.86rem; color:#137333; margin-bottom:2px; }\\n');
    buf.push('.urlbox-meta span { font-size:.78rem; color:#5f6368; word-break:break-all; }\\n');
    buf.push('.urlbox-btn { display:inline-flex; align-items:center; gap:4px; padding:6px 12px; background:#fff; border:1px solid #c6dafc; border-radius:8px; font-size:.80rem; font-weight:600; color:#1967d2; text-decoration:none; }\\n');
    buf.push('.checklist-card { background:var(--paper); border:1px solid var(--line); border-radius:18px; padding:20px; box-shadow:var(--shadow); display:flex; flex-direction:column; gap:12px; }\\n');
    buf.push('.check-item { display:flex; align-items:center; gap:10px; font-size:.92rem; font-weight:600; color:var(--navy-2); cursor:pointer; }\\n');
    buf.push('.check-item input[type="checkbox"] { width:18px; height:18px; accent-color:var(--blue); cursor:pointer; }\\n');
    buf.push('footer { text-align:center; padding:40px 0 20px; font-size:.82rem; color:var(--muted); border-top:1px solid var(--line); margin-top:50px; }\\n');

    // ── Chrome DevTools 스타일 검사 하이라이트 CSS (내보내기 모드에서는 완전 제외!) ──
    if (!isExport) {
      buf.push('/* ── 상위 컨테이너 검사 하이라이트 (Blue) ── */\\n');
      buf.push('.devtools-inspect-container-active { outline:2px solid #1a73e8 !important; outline-offset:3px !important; box-shadow:0 0 0 4px rgba(26,115,232,0.2) !important; position:relative !important; transition:outline .1s ease, box-shadow .1s ease !important; }\\n');
      buf.push('.devtools-inspect-badge-container { position:absolute; background:#1a73e8; color:#fff; font-size:11px; font-family:"Pretendard",system-ui,sans-serif; font-weight:700; padding:3px 8px; border-radius:4px; z-index:999999; pointer-events:none; box-shadow:0 4px 10px rgba(0,0,0,0.25); white-space:nowrap; }\\n');

      buf.push('/* ── 하위 세부 항목 검사 하이라이트 (Vivid Orange / Coral) (요구사항 1) ── */\\n');
      buf.push('.devtools-inspect-subitem-active { outline:2px dashed #ea580c !important; outline-offset:2px !important; box-shadow:0 0 0 4px rgba(234,88,12,0.25) !important; position:relative !important; background:rgba(234,88,12,0.04) !important; transition:outline .1s ease, box-shadow .1s ease !important; }\\n');
      buf.push('.devtools-inspect-badge-subitem { position:absolute; background:#ea580c; color:#fff; font-size:11px; font-family:"Pretendard",system-ui,sans-serif; font-weight:700; padding:3px 8px; border-radius:4px; z-index:1000000; pointer-events:none; box-shadow:0 4px 10px rgba(0,0,0,0.25); white-space:nowrap; }\\n');
    }

    buf.push('</style>\\n</head>\\n<body>\\n');

    // 상단 스크롤 진행률 바 (옵션)
    if (tb.enabled && tb.showProgress) {
      buf.push('<div class="tb-progress-bar" id="reportProgressBar"></div>\\n');
    }

    // 상단 툴바 (옵션)
    if (tb.enabled) {
      buf.push('<header class="report-toolbar"' + inspectAttr('toolbar', '상단 툴바', 'container') + '>\\n');
      buf.push('  <div class="tb-left"><span style="width:10px;height:10px;border-radius:50%;background:#1967d2;display:inline-block;"></span>' + esc(title) + '</div>\\n');
      if (tb.showSearch) {
        buf.push('  <div class="tb-search-wrap"' + inspectAttr('tb-search-box', '실시간 검색창', 'item') + '>\\n');
        buf.push('    <span class="tb-search-icon">🔍</span>\\n');
        buf.push('    <input type="text" class="tb-search-input" id="reportSearchInput" placeholder="' + esc(tb.searchPlaceholder || '보고서 키워드 검색...') + '">\\n');
        buf.push('    <div class="tb-search-dropdown" id="reportSearchDropdown"></div>\\n');
        buf.push('  </div>\\n');
      }
      buf.push('  <div class="tb-actions">\\n');
      if (tb.showPrint) buf.push('    <button class="tb-btn" onclick="window.print()"' + inspectAttr('tb-print-btn', '인쇄 버튼', 'item') + '>🖨️ 인쇄 / PDF</button>\\n');
      if (tb.showThemeToggle) buf.push('    <button class="tb-btn" onclick="document.body.classList.toggle(\\'dark-theme\\')"' + inspectAttr('tb-theme-btn', '테마 토글', 'item') + '>🌓 테마</button>\\n');
      buf.push('  </div>\\n');
      buf.push('</header>\\n');
    }

    buf.push('<div class="wrap">\\n');
    // 헤더 영역 (상위 컨테이너는 Blue, 개별 하위 항목은 Orange로 식별)
    buf.push('<header class="hero"' + inspectAttr('header', '헤더 (기본 정보)', 'container') + '>');
    buf.push('<span class="stamp-badge"' + inspectAttr('hero-badge', '상단 뱃지 문구 (Stamp Badge)', 'item') + '>' + esc(badge) + '</span>');
    buf.push('<h1' + inspectAttr('hero-title', '보고서 제목 (Title)', 'item') + '>' + fmtTitle(title) + '</h1>');
    buf.push('<p class="lead"' + inspectAttr('hero-desc', '요약 설명 (Description)', 'item') + '>' + esc(description) + '</p>');
    if (meta.length) {
      buf.push('<div class="meta-chips"' + inspectAttr('hero-meta', '메타 칩 모음', 'item') + '>' + meta.map(function(m){ return '<span class="meta-chip"><b>' + esc(m.label) + ':</b> ' + esc(m.value) + '</span>'; }).join('') + '</div>');
    }
    buf.push('</header>\\n');

    // 추천 검색 칩 (index.html 스타일)
    if (tb.showSuggestChips && tb.suggestChips && tb.suggestChips.length) {
      buf.push('<div class="suggest-chips-bar"' + inspectAttr('suggestChips', '추천 검색어 칩', 'container') + '>\\n');
      buf.push('  <span class="chip-label">⚡ 추천 키워드:</span>\\n');
      tb.suggestChips.forEach(function(c, i){
        buf.push('  <span class="suggest-chip" onclick="applySearchQuery(\\'' + esc(c) + '\\')"' + inspectAttr('chip-' + i, '키워드: #' + c, 'item') + '>' + esc(c) + '</span>\\n');
      });
      buf.push('</div>\\n');
    }

    // 카테고리 탭 (index.html 스타일)
    if (tb.showCategoryTabs && tb.categoryTabs && tb.categoryTabs.length) {
      buf.push('<div class="category-tabs-bar"' + inspectAttr('categoryTabs', '카테고리 탭', 'container') + '>\\n');
      tb.categoryTabs.forEach(function(t, idx){
        buf.push('  <button class="category-tab ' + (idx===0?'active':'') + '" onclick="filterCategory(this, \\'' + esc(t) + '\\')"' + inspectAttr('tab-' + idx, '탭: ' + t, 'item') + '>' + esc(t) + '</button>\\n');
      });
      buf.push('</div>\\n');
    }

    // Why 인트로 박스 (모듈 2, 3, 4)
    if (whyBox && whyBox.enabled) {
      buf.push('<div class="why-box"' + inspectAttr('whyBox', 'Why 인트로 박스', 'container') + '>\\n');
      buf.push('  <span class="why-eyebrow">✦ WHY WE NEED THIS</span>\\n');
      buf.push('  <h3' + inspectAttr('why-title', 'Why 박스 제목', 'item') + '>' + esc(whyBox.title || '왜 이 워크플로우를 도입해야 하는가?') + '</h3>\\n');
      buf.push('  <p' + inspectAttr('why-desc', 'Why 박스 상세 설명', 'item') + '>' + esc(whyBox.desc) + '</p>\\n');
      buf.push('</div>\\n');
    }

    // 프로세스 플로우 바 (모듈 3, 4)
    if (procBox && procBox.enabled) {
      buf.push('<div class="procbox"' + inspectAttr('procBox', '프로세스 플로우 바', 'container') + '>\\n');
      buf.push('  <span class="proc-badge"' + inspectAttr('proc-badge', '파이프라인 뱃지', 'item') + '>' + esc(procBox.badge || 'AUTOMATION PIPELINE') + '</span>\\n');
      buf.push('  <span class="proc-text"' + inspectAttr('proc-title', '파이프라인 흐름 문구', 'item') + '>' + esc(procBox.title) + '</span>\\n');
      buf.push('</div>\\n');
    }

    // KPI 지표 스코어보드 (모듈 3)
    if (kpiStats && kpiStats.length) {
      buf.push('<div class="kpi-grid"' + inspectAttr('kpiStats', 'KPI 스코어보드', 'container') + '>\\n');
      kpiStats.forEach(function(k, idx){
        buf.push('  <div class="kpi-card"' + inspectAttr('kpi-' + idx, 'KPI 지표 #' + (idx+1), 'container') + '>\\n');
        buf.push('    <div class="kpi-num" style="color:' + esc(k.color || '#1967d2') + ';"' + inspectAttr('kpi-' + idx + '-num', '지표 수치 (' + k.num + ')', 'item') + '>' + esc(k.num) + '</div>\\n');
        buf.push('    <div class="kpi-label"' + inspectAttr('kpi-' + idx + '-label', '지표 라벨 (' + k.label + ')', 'item') + '>' + esc(k.label) + '</div>\\n');
        buf.push('  </div>\\n');
      });
      buf.push('</div>\\n');
    }

    // 1줄 흐름 지도
    if (flowmap.length) {
      buf.push('<section' + inspectAttr('flowmap', '진행 흐름 지도', 'container') + '><div class="eyebrow">PROCESS FLOW</div><h2 class="sec">🗺️ 전체 진행 흐름</h2><p class="lead" style="font-size:.95rem;">단계별 핵심 목표와 산출물입니다.</p><div class="flowmap">');
      buf.push(flowmap.map(function(f, i){
        return '<div class="fstep" id="flowStep_' + i + '"' + inspectAttr('flow-' + i, '흐름 단계 #' + (i+1), 'container') + ' style="--accent:' + esc(f.color||'#1967d2') + '"><span class="fnum">' + esc(f.num||(i+1)) + '</span><div class="fmeta"><b' + inspectAttr('flow-' + i + '-title', '단계명 (' + f.title + ')', 'item') + '>' + esc(f.title) + '</b><span class="ft"' + inspectAttr('flow-' + i + '-desc', '단계 설명 (' + f.desc + ')', 'item') + '>' + esc(f.desc) + '</span></div></div>' +
          (i < flowmap.length - 1 ? '<span class="farrow">→</span>' : '');
      }).join(''));
      buf.push('</div></section>\\n');
    }

    // 3D 플립 카드
    if (cards.length) {
      buf.push('<section' + inspectAttr('cards', '핵심 모듈 카드', 'container') + '><div class="eyebrow">OVERVIEW CARDS</div><h2 class="sec">📌 핵심 모듈 &amp; 테마</h2><p class="lead" style="font-size:.95rem;">카드를 클릭하면 상세 세부 계획을 볼 수 있습니다.</p><div class="modgrid">');
      buf.push(cards.map(function(c, i){
        return '<div class="flip" id="cardFlip_' + i + '"' + inspectAttr('card-' + i, '모듈 카드 #' + (i+1) + ' ' + esc(c.frontTitle), 'container') + ' style="--accent:' + esc(c.color||'#1967d2') + '"><div class="flip-inner"><div class="face front"><div><span class="card-badge">✦ ' + esc(c.badge||'MODULE') + '</span><h3' + inspectAttr('card-' + i + '-title', '카드 제목 (' + c.frontTitle + ')', 'item') + '>' + esc(c.frontTitle) + '</h3></div><div class="tags">' +
          (c.tags||[]).map(function(t){ return '<span class="tag">' + esc(t) + '</span>'; }).join('') +
          '</div><div class="flip-hint">카드를 누르면 상세 내용 ↻</div></div><div class="face back"><div class="backbody"><span class="card-badge">✦ ' + esc(c.badge||'MODULE') + '</span><p' + inspectAttr('card-' + i + '-desc', '카드 뒷면 상세설명', 'item') + '>' + esc(c.backDesc) + '</p></div><div class="flip-hint">카드를 누르면 앞면으로 ↻</div></div></div></div>';
      }).join(''));
      buf.push('</div></section>\\n');
    }

    // 상세 실행 단계
    if (steps.length) {
      buf.push('<section' + inspectAttr('steps', '실행 단계 목록', 'container') + '><div class="eyebrow">STEP-BY-STEP WORKFLOW</div><h2 class="sec">🛠️ 단계별 실행 및 프롬프트</h2><p class="lead" style="font-size:.95rem;">프롬프트와 가이드를 복사하여 즉시 실행하세요.</p><div class="step-list">');
      buf.push(steps.map(function(s, idx){
        return '<div class="step-card" id="stepCard_' + idx + '"' + inspectAttr('step-' + idx, '실행 단계 #' + (idx+1), 'container') + '><div class="step-top" onclick="toggleStep(' + idx + ')"><div class="step-title-group"><div class="step-num">' + esc(s.num||(idx+1)) + '</div><h3 class="step-title"' + inspectAttr('step-' + idx + '-title', '단계 제목: ' + s.title, 'item') + '>' + esc(s.title) + '</h3>' +
          (s.tool ? '<span class="tool-tag"' + inspectAttr('step-' + idx + '-tool', '사용 도구: ' + s.tool, 'item') + '>' + esc(s.tool) + '</span>' : '') +
          '</div><button class="done-btn" onclick="event.stopPropagation(); toggleDone(' + idx + ')">완료 체크</button></div>' +
          '<div class="step-body" id="stepBody_' + idx + '">' +
          (s.goal ? '<div class="step-goal"' + inspectAttr('step-' + idx + '-goal', '실행 목표: ' + s.goal, 'item') + '>🎯 목표: ' + esc(s.goal) + '</div>' : '') +
          (s.desc ? '<div class="step-desc"' + inspectAttr('step-' + idx + '-desc', '단계 세부설명', 'item') + '>' + esc(s.desc) + '</div>' : '') +
          (s.prompt ? '<div class="prompt-box"' + inspectAttr('step-' + idx + '-prompt', 'Gemini 프롬프트 박스', 'item') + '><div class="prompt-header"><span class="prompt-badge">✨ Gemini Prompt</span><button class="copy-btn" onclick="copySnippet(this)">프롬프트 복사</button></div><pre>' + esc(s.prompt) + '</pre></div>' : '') +
          (s.tip ? '<details class="tip-box-collapsible"' + inspectAttr('step-' + idx + '-tip', '실습 꿀팁 아코디언', 'item') + '><summary>💡 실습 꿀팁 및 권장 가이드 (펼치기)</summary><div class="tip-body">' + esc(s.tip) + '</div></details>' : '') +
          (s.note ? '<div class="note-box"' + inspectAttr('step-' + idx + '-note', '핵심 참고 노트', 'item') + '><b>ℹ️ 핵심 참고:</b> ' + esc(s.note) + '</div>' : '') +
          (s.warn ? '<div class="warn-box"' + inspectAttr('step-' + idx + '-warn', '주의사항 경고', 'item') + '><b>⚠️ 주의사항:</b> ' + esc(s.warn) + '</div>' : '') +
          (s.url ? '<div class="urlbox-wrap"' + inspectAttr('step-' + idx + '-url', '리소스 URL 링크', 'item') + '><div class="urlbox-meta"><b>🔗 관련 리소스</b><span>' + esc(s.url) + '</span></div><a class="urlbox-btn" href="' + esc(s.url) + '" target="_blank" rel="noopener">열기 ↗</a></div>' : '') +
          '</div></div>';
      }).join(''));
      buf.push('</div></section>\\n');
    }

    // 최종 체크리스트
    if (checklist.length) {
      buf.push('<section' + inspectAttr('checklist', '최종 점검 체크리스트', 'container') + '><div class="eyebrow">FINAL CHECKLIST</div><h2 class="sec">✅ 최종 점검 항목</h2><div class="checklist-card">');
      buf.push(checklist.map(function(item, i){
        return '<label class="check-item" id="checkItem_' + i + '"' + inspectAttr('check-' + i, '체크 항목 #' + (i+1) + ': ' + item, 'item') + '><input type="checkbox" onchange="saveChecklist(' + i + ', this.checked)" id="check_' + i + '"><span>' + esc(item) + '</span></label>';
      }).join(''));
      buf.push('</div></section>\\n');
    }

    buf.push('<footer>' + esc(title) + ' · Google Tone Workflow Architecture</footer></div>\\n');

    // ── 클라이언트 스크립트 ──
    buf.push('<script>\\n');
    buf.push('document.querySelectorAll(".flip").forEach(function(c){ c.addEventListener("click", function(){ c.classList.toggle("flipped"); }); });\\n');
    buf.push('function toggleStep(i){ var b = document.getElementById("stepBody_" + i); if(b) b.style.display = (b.style.display==="none") ? "block" : "none"; }\\n');
    buf.push('function toggleDone(i){ var c = document.getElementById("stepCard_" + i); if(c) c.classList.toggle("done"); }\\n');
    buf.push('function copySnippet(btn){ var pre = btn.parentElement.parentElement.querySelector("pre"); if(!pre) return; navigator.clipboard.writeText(pre.innerText).then(function(){ var o = btn.textContent; btn.textContent="✅ 복사됨"; setTimeout(function(){ btn.textContent=o; }, 1600); }); }\\n');
    buf.push('function saveChecklist(i, c){}\\n');
    buf.push('function applySearchQuery(q){ var inp = document.getElementById("reportSearchInput"); if(inp){ inp.value = q; inp.dispatchEvent(new Event("input")); inp.focus(); } }\\n');
    buf.push('function filterCategory(btn, cat){ document.querySelectorAll(".category-tab").forEach(function(b){ b.classList.remove("active"); }); btn.classList.add("active"); }\\n');

    if (tb.enabled && tb.showProgress) {
      buf.push('window.addEventListener("scroll", function(){\\n');
      buf.push('  var h = document.documentElement;\\n');
      buf.push('  var pct = (h.scrollTop || document.body.scrollTop) / ((h.scrollHeight || document.body.scrollHeight) - h.clientHeight) * 100;\\n');
      buf.push('  var bar = document.getElementById("reportProgressBar"); if(bar) bar.style.width = Math.min(100, Math.max(0, pct)) + "%";\\n');
      buf.push('});\\n');
    }

    if (tb.enabled && tb.showSearch) {
      buf.push('(function(){\\n');
      buf.push('  var inp = document.getElementById("reportSearchInput");\\n');
      buf.push('  var drop = document.getElementById("reportSearchDropdown");\\n');
      buf.push('  if(!inp || !drop) return;\\n');
      buf.push('  var items = [];\\n');
      buf.push('  document.querySelectorAll(".fstep").forEach(function(el, i){\\n');
      buf.push('    items.push({ target:"#flowStep_" + i, badge:"흐름", title: el.querySelector("b") ? el.querySelector("b").innerText : "", desc: el.querySelector(".ft") ? el.querySelector(".ft").innerText : "" });\\n');
      buf.push('  });\\n');
      buf.push('  document.querySelectorAll(".flip").forEach(function(el, i){\\n');
      buf.push('    items.push({ target:"#cardFlip_" + i, badge:"모듈 카드", title: el.querySelector("h3") ? el.querySelector("h3").innerText : "", desc: el.querySelector(".backbody p") ? el.querySelector(".backbody p").innerText : "" });\\n');
      buf.push('  });\\n');
      buf.push('  document.querySelectorAll(".step-card").forEach(function(el, i){\\n');
      buf.push('    var t = el.querySelector(".step-title") ? el.querySelector(".step-title").innerText : "";\\n');
      buf.push('    var d = el.querySelector(".step-desc") ? el.querySelector(".step-desc").innerText : "";\\n');
      buf.push('    var p = el.querySelector("pre") ? el.querySelector("pre").innerText : "";\\n');
      buf.push('    items.push({ target:"#stepCard_" + i, stepIdx: i, badge:"실행 단계", title: t, desc: d + " " + p });\\n');
      buf.push('  });\\n');
      buf.push('  document.querySelectorAll(".check-item").forEach(function(el, i){\\n');
      buf.push('    items.push({ target:"#checkItem_" + i, badge:"체크리스트", title: el.querySelector("span") ? el.querySelector("span").innerText : "", desc:"" });\\n');
      buf.push('  });\\n');
      buf.push('  function pulse(el){\\n');
      buf.push('    if(!el) return;\\n');
      buf.push('    el.scrollIntoView({ behavior:"smooth", block:"center" });\\n');
      buf.push('    var orig = el.style.outline; el.style.transition = "outline .25s ease, box-shadow .25s ease";\\n');
      buf.push('    el.style.outline = "4px solid #1967d2"; el.style.boxShadow = "0 0 24px rgba(25,103,210,.5)";\\n');
      buf.push('    setTimeout(function(){ el.style.outline = orig; el.style.boxShadow = ""; }, 2400);\\n');
      buf.push('  }\\n');
      buf.push('  inp.addEventListener("input", function(){\\n');
      buf.push('    var q = (inp.value || "").trim().toLowerCase();\\n');
      buf.push('    if(!q){ drop.style.display = "none"; return; }\\n');
      buf.push('    var matched = items.filter(function(it){\\n');
      buf.push('      return it.title.toLowerCase().indexOf(q) !== -1 || it.desc.toLowerCase().indexOf(q) !== -1;\\n');
      buf.push('    });\\n');
      buf.push('    drop.innerHTML = "";\\n');
      buf.push('    if(matched.length === 0){\\n');
      buf.push('      drop.innerHTML = "<div style=\\\'padding:12px;text-align:center;color:#80868b;font-size:.82rem;\\\'>검색 결과 없음</div>";\\n');
      buf.push('    } else {\\n');
      buf.push('      matched.forEach(function(m){\\n');
      buf.push('        var div = document.createElement("div"); div.className = "tb-search-item";\\n');
      buf.push('        div.innerHTML = "<span class=\\\'tb-search-badge\\\'>" + m.badge + "</span><span class=\\\'tb-search-title\\\'>" + m.title + "</span>";\\n');
      buf.push('        div.addEventListener("click", function(){\\n');
      buf.push('          if(m.stepIdx !== undefined){\\n');
      buf.push('            var body = document.getElementById("stepBody_" + m.stepIdx); if(body) body.style.display = "block";\\n');
      buf.push('          }\\n');
      buf.push('          var targetEl = document.querySelector(m.target);\\n');
      buf.push('          pulse(targetEl);\\n');
      buf.push('          drop.style.display = "none";\\n');
      buf.push('        });\\n');
      buf.push('        drop.appendChild(div);\\n');
      buf.push('      });\\n');
      buf.push('    }\\n');
      buf.push('    drop.style.display = "block";\\n');
      buf.push('  });\\n');
      buf.push('  document.addEventListener("click", function(e){ if(!e.target.closest(".tb-search-wrap")) drop.style.display = "none"; });\\n');
      buf.push('})();\\n');
    }

    // ── Chrome DevTools 요소 검사기 스크립트 (요구사항 1 & 3: 내보내기 모드에서는 완전 제외!) ──
    if (!isExport) {
      buf.push('(function(){\\n');
      buf.push('  var activeInspect = null;\\n');
      buf.push('  var activeLevel = null;\\n');
      buf.push('  var badgeEl = null;\\n');
      buf.push('  function getBadge(){\\n');
      buf.push('    if(!badgeEl){\\n');
      buf.push('      badgeEl = document.createElement("div");\\n');
      buf.push('      document.body.appendChild(badgeEl);\\n');
      buf.push('    }\\n');
      buf.push('    return badgeEl;\\n');
      buf.push('  }\\n');
      buf.push('  document.addEventListener("mouseover", function(e){\\n');
      buf.push('    var target = e.target.closest("[data-inspect-id]");\\n');
      buf.push('    if(!target || target === activeInspect) return;\\n');
      buf.push('    if(activeInspect){\\n');
      buf.push('      activeInspect.classList.remove("devtools-inspect-container-active");\\n');
      buf.push('      activeInspect.classList.remove("devtools-inspect-subitem-active");\\n');
      buf.push('    }\\n');
      buf.push('    activeInspect = target;\\n');
      buf.push('    var level = target.getAttribute("data-inspect-level") || "container";\\n');
      buf.push('    activeLevel = level;\\n');
      buf.push('    var name = target.getAttribute("data-inspect-name") || target.getAttribute("data-inspect-id");\\n');
      buf.push('    var rect = target.getBoundingClientRect();\\n');
      buf.push('    var b = getBadge();\\n');
      buf.push('    if(level === "item"){\\n');
      buf.push('      target.classList.add("devtools-inspect-subitem-active");\\n');
      buf.push('      b.className = "devtools-inspect-badge-subitem";\\n');
      buf.push('      b.textContent = "🎯 " + name;\\n');
      buf.push('    } else {\\n');
      buf.push('      target.classList.add("devtools-inspect-container-active");\\n');
      buf.push('      b.className = "devtools-inspect-badge-container";\\n');
      buf.push('      b.textContent = "📁 " + name;\\n');
      buf.push('    }\\n');
      buf.push('    b.style.display = "block";\\n');
      buf.push('    b.style.top = Math.max(0, (rect.top + window.scrollY - 24)) + "px";\\n');
      buf.push('    b.style.left = Math.max(0, (rect.left + window.scrollX)) + "px";\\n');
      buf.push('    if(window.parent && window.parent.onPreviewInspectHover){\\n');
      buf.push('      window.parent.onPreviewInspectHover(target.getAttribute("data-inspect-id"), level);\\n');
      buf.push('    }\\n');
      buf.push('  });\\n');
      buf.push('  document.addEventListener("mouseout", function(e){\\n');
      buf.push('    if(!activeInspect) return;\\n');
      buf.push('    var rel = e.relatedTarget;\\n');
      buf.push('    if(rel && activeInspect.contains(rel)) return;\\n');
      buf.push('    activeInspect.classList.remove("devtools-inspect-container-active");\\n');
      buf.push('    activeInspect.classList.remove("devtools-inspect-subitem-active");\\n');
      buf.push('    activeInspect = null;\\n');
      buf.push('    if(badgeEl) badgeEl.style.display = "none";\\n');
      buf.push('    if(window.parent && window.parent.onPreviewInspectLeave){\\n');
      buf.push('      window.parent.onPreviewInspectLeave();\\n');
      buf.push('    }\\n');
      buf.push('  });\\n');
      buf.push('  document.addEventListener("click", function(e){\\n');
      buf.push('    var target = e.target.closest("[data-inspect-id]");\\n');
      buf.push('    if(target && window.parent && window.parent.onPreviewInspectClick){\\n');
      buf.push('      window.parent.onPreviewInspectClick(target.getAttribute("data-inspect-id"), target.getAttribute("data-inspect-level") || "container");\\n');
      buf.push('    }\\n');
      buf.push('  });\\n');
      buf.push('  window.highlightFromEditor = function(id, level){\\n');
      buf.push('    if(activeInspect){\\n');
      buf.push('      activeInspect.classList.remove("devtools-inspect-container-active");\\n');
      buf.push('      activeInspect.classList.remove("devtools-inspect-subitem-active");\\n');
      buf.push('    }\\n');
      buf.push('    var el = document.querySelector("[data-inspect-id=" + JSON.stringify(id) + "]");\\n');
      buf.push('    if(!el){\\n');
      buf.push('      if(badgeEl) badgeEl.style.display = "none";\\n');
      buf.push('      return;\\n');
      buf.push('    }\\n');
      buf.push('    activeInspect = el;\\n');
      buf.push('    var name = el.getAttribute("data-inspect-name") || id;\\n');
      buf.push('    var rect = el.getBoundingClientRect();\\n');
      buf.push('    var b = getBadge();\\n');
      buf.push('    if(level === "item"){\\n');
      buf.push('      el.classList.add("devtools-inspect-subitem-active");\\n');
      buf.push('      b.className = "devtools-inspect-badge-subitem";\\n');
      buf.push('      b.textContent = "🎯 " + name;\\n');
      buf.push('    } else {\\n');
      buf.push('      el.classList.add("devtools-inspect-container-active");\\n');
      buf.push('      b.className = "devtools-inspect-badge-container";\\n');
      buf.push('      b.textContent = "📁 " + name;\\n');
      buf.push('    }\\n');
      buf.push('    b.style.display = "block";\\n');
      buf.push('    b.style.top = Math.max(0, (rect.top + window.scrollY - 24)) + "px";\\n');
      buf.push('    b.style.left = Math.max(0, (rect.left + window.scrollX)) + "px";\\n');
      buf.push('    el.scrollIntoView({ behavior:"smooth", block:"nearest" });\\n');
      buf.push('  };\\n');
      buf.push('  window.clearHighlightFromEditor = function(){\\n');
      buf.push('    if(activeInspect){\\n');
      buf.push('      activeInspect.classList.remove("devtools-inspect-container-active");\\n');
      buf.push('      activeInspect.classList.remove("devtools-inspect-subitem-active");\\n');
      buf.push('      activeInspect = null;\\n');
      buf.push('    }\\n');
      buf.push('    if(badgeEl) badgeEl.style.display = "none";\\n');
      buf.push('  };\\n');
      buf.push('})();\\n');
    }

    buf.push('<' + '/script>\\n</body>\\n</html>');
    return buf.join('');
  }

  // ── UI 동기화 및 폼 렌더링 ──
  function syncFormFromData() {
    currentData.toolbar = currentData.toolbar || {
      enabled: true, showSearch: true, searchPlaceholder: '보고서 키워드 검색...',
      showSuggestChips: true, suggestChips: ["마스코트", "대시보드", "Apps Script", "PARTS 프롬프트"],
      showCategoryTabs: true, categoryTabs: ["전체", "1단계: 기획", "2단계: 실습", "3단계: 검증"],
      showPrint: true, showProgress: true, showThemeToggle: true
    };

    syncToolbarButtons();

    document.getElementById('fTitle').value = currentData.title || '';
    document.getElementById('fBadge').value = currentData.badge || '';
    document.getElementById('fDesc').value = currentData.description || '';

    // Why 인트로 박스 렌더링
    var whyWrap = document.getElementById('whyBoxEditorContainer');
    whyWrap.innerHTML = '';
    if(currentData.whyBox && currentData.whyBox.enabled){
      var div = document.createElement('div');
      div.className = 'item-card';
      div.setAttribute('data-editor-id', 'whyBox');
      div.setAttribute('data-editor-level', 'container');
      div.innerHTML = '<button class="item-delete-btn" onclick="removeWhyBox()">삭제</button>' +
        '<div style="font-weight:700;font-size:.85rem;color:var(--navy);margin-bottom:8px;">🌌 Why 인트로 박스 (모듈 2, 3, 4 스타일)</div>' +
        '<div class="form-group" style="margin-bottom:8px;" data-editor-id="why-title" data-editor-level="item"><label>박스 제목</label><input type="text" value="' + (currentData.whyBox.title||'') + '" oninput="updateWhyBox(\\'title\\', this.value)"></div>' +
        '<div class="form-group" style="margin-bottom:0;" data-editor-id="why-desc" data-editor-level="item"><label>상세 설명</label><textarea oninput="updateWhyBox(\\'desc\\', this.value)">' + (currentData.whyBox.desc||'') + '</textarea></div>';
      whyWrap.appendChild(div);
    }

    // 프로세스 플로우 바 렌더링
    var procWrap = document.getElementById('procBoxEditorContainer');
    procWrap.innerHTML = '';
    if(currentData.procBox && currentData.procBox.enabled){
      var div = document.createElement('div');
      div.className = 'item-card';
      div.setAttribute('data-editor-id', 'procBox');
      div.setAttribute('data-editor-level', 'container');
      div.innerHTML = '<button class="item-delete-btn" onclick="removeProcBox()">삭제</button>' +
        '<div style="font-weight:700;font-size:.85rem;color:var(--navy);margin-bottom:8px;">🔄 프로세스 플로우 바 (모듈 3, 4 스타일)</div>' +
        '<div class="form-group" style="margin-bottom:8px;" data-editor-id="proc-badge" data-editor-level="item"><label>뱃지 문구</label><input type="text" value="' + (currentData.procBox.badge||'AUTOMATION PIPELINE') + '" oninput="updateProcBox(\\'badge\\', this.value)"></div>' +
        '<div class="form-group" style="margin-bottom:0;" data-editor-id="proc-title" data-editor-level="item"><label>파이프라인 흐름 문구</label><input type="text" value="' + (currentData.procBox.title||'') + '" oninput="updateProcBox(\\'title\\', this.value)"></div>';
      procWrap.appendChild(div);
    }

    // KPI 스코어보드 렌더링
    var kpiWrap = document.getElementById('kpiStatsEditorContainer');
    kpiWrap.innerHTML = '';
    if(currentData.kpiStats && currentData.kpiStats.length){
      var div = document.createElement('div');
      div.className = 'item-card';
      div.setAttribute('data-editor-id', 'kpiStats');
      div.setAttribute('data-editor-level', 'container');
      var kpiHtml = '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;">' +
        '<div style="font-weight:700;font-size:.85rem;color:var(--navy);">📊 KPI 지표 스코어보드 (모듈 3 스타일)</div>' +
        '<button class="add-item-btn" onclick="insertWidget(\\'kpiStats\\')">+ 지표 추가</button>' +
        '</div>';
      currentData.kpiStats.forEach(function(k, idx){
        kpiHtml += '<div style="display:flex;gap:8px;align-items:center;margin-bottom:6px;" data-editor-id="kpi-' + idx + '" data-editor-level="container">' +
          '<input type="text" style="width:75px;font-weight:800;" value="' + (k.num||'') + '" placeholder="수치" data-editor-id="kpi-' + idx + '-num" data-editor-level="item" oninput="updateKpiStat(' + idx + ', \\'num\\', this.value)">' +
          '<input type="text" style="flex:1;" value="' + (k.label||'') + '" placeholder="설명" data-editor-id="kpi-' + idx + '-label" data-editor-level="item" oninput="updateKpiStat(' + idx + ', \\'label\\', this.value)">' +
          '<input type="color" style="width:36px;padding:2px;" value="' + (k.color||'#1967d2') + '" onchange="updateKpiStat(' + idx + ', \\'color\\', this.value)">' +
          '<button class="item-delete-btn" style="position:static;" onclick="removeKpiStat(' + idx + ')">×</button>' +
          '</div>';
      });
      div.innerHTML = kpiHtml;
      kpiWrap.appendChild(div);
    }

    // 1줄 흐름 지도 (Flow Items)
    var flowBox = document.getElementById('flowItemsContainer');
    flowBox.innerHTML = '';
    (currentData.flowmap || []).forEach(function(f, idx){
      var div = document.createElement('div');
      div.className = 'item-card';
      div.setAttribute('data-editor-id', 'flow-' + idx);
      div.setAttribute('data-editor-level', 'container');
      div.innerHTML = '<button class="item-delete-btn" onclick="removeFlowItem(' + idx + ')">삭제</button>' +
        '<div class="form-group" style="margin-bottom:8px;" data-editor-id="flow-' + idx + '-title" data-editor-level="item"><label>단계명 (Step ' + (idx+1) + ')</label><input type="text" value="' + (f.title||'') + '" oninput="updateFlowItem(' + idx + ', \\'title\\', this.value)"></div>' +
        '<div class="form-group" style="margin-bottom:8px;" data-editor-id="flow-' + idx + '-desc" data-editor-level="item"><label>요약 설명</label><input type="text" value="' + (f.desc||'') + '" oninput="updateFlowItem(' + idx + ', \\'desc\\', this.value)"></div>' +
        '<div class="form-group" style="margin-bottom:0;"><label>강조 색상 (Hex)</label><input type="color" value="' + (f.color||'#1967d2') + '" onchange="updateFlowItem(' + idx + ', \\'color\\', this.value)"></div>';
      flowBox.appendChild(div);
    });

    // 3D 플립 카드 (Cards)
    var cardBox = document.getElementById('cardItemsContainer');
    cardBox.innerHTML = '';
    (currentData.cards || []).forEach(function(c, idx){
      var div = document.createElement('div');
      div.className = 'item-card';
      div.setAttribute('data-editor-id', 'card-' + idx);
      div.setAttribute('data-editor-level', 'container');
      div.innerHTML = '<button class="item-delete-btn" onclick="removeCardItem(' + idx + ')">삭제</button>' +
        '<div class="form-group" style="margin-bottom:8px;" data-editor-id="card-' + idx + '-title" data-editor-level="item"><label>앞면 제목 (카드 #' + (idx+1) + ')</label><input type="text" value="' + (c.frontTitle||'') + '" oninput="updateCardItem(' + idx + ', \\'frontTitle\\', this.value)"></div>' +
        '<div class="form-group" style="margin-bottom:8px;"><label>배지 / 페이즈</label><input type="text" value="' + (c.badge||'') + '" oninput="updateCardItem(' + idx + ', \\'badge\\', this.value)"></div>' +
        '<div class="form-group" style="margin-bottom:8px;"><label>태그 (쉼표로 구분)</label><input type="text" value="' + (c.tags ? c.tags.join(', ') : '') + '" oninput="updateCardTags(' + idx + ', this.value)"></div>' +
        '<div class="form-group" style="margin-bottom:0;" data-editor-id="card-' + idx + '-desc" data-editor-level="item"><label>뒷면 상세 설명</label><textarea oninput="updateCardItem(' + idx + ', \\'backDesc\\', this.value)">' + (c.backDesc||'') + '</textarea></div>';
      cardBox.appendChild(div);
    });

    // 상세 실행 단계 (Steps)
    var stepBox = document.getElementById('stepItemsContainer');
    stepBox.innerHTML = '';
    (currentData.steps || []).forEach(function(s, idx){
      var div = document.createElement('div');
      div.className = 'item-card';
      div.setAttribute('data-editor-id', 'step-' + idx);
      div.setAttribute('data-editor-level', 'container');
      div.innerHTML = '<button class="item-delete-btn" onclick="removeStepItem(' + idx + ')">삭제</button>' +
        '<div class="form-group" style="margin-bottom:8px;" data-editor-id="step-' + idx + '-title" data-editor-level="item"><label>단계 제목 (Step #' + (idx+1) + ')</label><input type="text" value="' + (s.title||'') + '" oninput="updateStepItem(' + idx + ', \\'title\\', this.value)"></div>' +
        '<div class="form-group" style="margin-bottom:8px;" data-editor-id="step-' + idx + '-tool" data-editor-level="item"><label>사용 도구</label><input type="text" value="' + (s.tool||'') + '" oninput="updateStepItem(' + idx + ', \\'tool\\', this.value)"></div>' +
        '<div class="form-group" style="margin-bottom:8px;" data-editor-id="step-' + idx + '-goal" data-editor-level="item"><label>목표 (Goal)</label><input type="text" value="' + (s.goal||'') + '" oninput="updateStepItem(' + idx + ', \\'goal\\', this.value)"></div>' +
        '<div class="form-group" style="margin-bottom:8px;" data-editor-id="step-' + idx + '-desc" data-editor-level="item"><label>단계 설명</label><input type="text" value="' + (s.desc||'') + '" oninput="updateStepItem(' + idx + ', \\'desc\\', this.value)"></div>' +
        '<div class="form-group" style="margin-bottom:8px;" data-editor-id="step-' + idx + '-prompt" data-editor-level="item"><label>📋 Gemini 프롬프트 / 코드 (복사 박스)</label><textarea style="min-height:75px;" oninput="updateStepItem(' + idx + ', \\'prompt\\', this.value)">' + (s.prompt||'') + '</textarea></div>' +
        '<div class="form-group" style="margin-bottom:8px;" data-editor-id="step-' + idx + '-tip" data-editor-level="item"><label>💡 실습 꿀팁 (아코디언)</label><input type="text" value="' + (s.tip||'') + '" placeholder="선택사항" oninput="updateStepItem(' + idx + ', \\'tip\\', this.value)"></div>' +
        '<div class="form-group" style="margin-bottom:8px;" data-editor-id="step-' + idx + '-note" data-editor-level="item"><label>ℹ️ 핵심 참고 노트 (블루 콜아웃)</label><input type="text" value="' + (s.note||'') + '" placeholder="선택사항" oninput="updateStepItem(' + idx + ', \\'note\\', this.value)"></div>' +
        '<div class="form-group" style="margin-bottom:8px;" data-editor-id="step-' + idx + '-warn" data-editor-level="item"><label>⚠️ 주의사항 (레드 콜아웃)</label><input type="text" value="' + (s.warn||'') + '" placeholder="선택사항" oninput="updateStepItem(' + idx + ', \\'warn\\', this.value)"></div>' +
        '<div class="form-group" style="margin-bottom:0;" data-editor-id="step-' + idx + '-url" data-editor-level="item"><label>🔗 외부 리소스 URL 링크</label><input type="text" value="' + (s.url||'') + '" placeholder="예: https://docs.google.com/..." oninput="updateStepItem(' + idx + ', \\'url\\', this.value)"></div>';
      stepBox.appendChild(div);
    });

    // 체크리스트 (Checklist)
    var checkContainer = document.getElementById('checkItemsContainer');
    checkContainer.innerHTML = '';
    (currentData.checklist || []).forEach(function(item, idx){
      var div = document.createElement('div');
      div.className = 'item-card';
      div.setAttribute('data-editor-id', 'check-' + idx);
      div.setAttribute('data-editor-level', 'item');
      div.style.padding = '8px 12px';
      div.innerHTML = '<button class="item-delete-btn" style="top:5px;" onclick="removeCheckItem(' + idx + ')">삭제</button>' +
        '<input type="text" style="width:calc(100% - 50px);" value="' + item + '" oninput="updateCheckItem(' + idx + ', this.value)">';
      checkContainer.appendChild(div);
    });

    document.getElementById('jsonEditor').value = JSON.stringify(currentData, null, 2);
    updateLivePreview();
    bindEditorInspectEvents();
  }

  function updateLivePreview() {
    // 라이브 미리보기는 isExport = false (인스펙터 활성화)
    var html = renderReportHtml(currentData, false);
    var frame = document.getElementById('previewFrame');
    var doc = frame.contentDocument || frame.contentWindow.document;
    doc.open();
    doc.write(html);
    doc.close();
  }

  // ── WhyBox / ProcBox / KpiStats 조작 헬퍼 ──
  window.updateWhyBox = function(k, v){
    currentData.whyBox = currentData.whyBox || { enabled: true };
    currentData.whyBox[k] = v;
    updateLivePreview();
    document.getElementById('jsonEditor').value = JSON.stringify(currentData, null, 2);
  };
  window.removeWhyBox = function(){
    if(currentData.whyBox) currentData.whyBox.enabled = false;
    syncFormFromData();
    showToast('Why 인트로 박스가 제거되었습니다.');
  };

  window.updateProcBox = function(k, v){
    currentData.procBox = currentData.procBox || { enabled: true };
    currentData.procBox[k] = v;
    updateLivePreview();
    document.getElementById('jsonEditor').value = JSON.stringify(currentData, null, 2);
  };
  window.removeProcBox = function(){
    if(currentData.procBox) currentData.procBox.enabled = false;
    syncFormFromData();
    showToast('프로세스 플로우 바가 제거되었습니다.');
  };

  window.updateKpiStat = function(idx, k, v){
    if(currentData.kpiStats && currentData.kpiStats[idx]){
      currentData.kpiStats[idx][k] = v;
      updateLivePreview();
      document.getElementById('jsonEditor').value = JSON.stringify(currentData, null, 2);
    }
  };
  window.removeKpiStat = function(idx){
    if(currentData.kpiStats){
      currentData.kpiStats.splice(idx, 1);
      syncFormFromData();
      showToast('KPI 지표가 삭제되었습니다.');
    }
  };

  // ── Chrome DevTools 스타일 2단계 요소 검사 연동 (요구사항 1: 컨테이너 Blue / 세부 항목 Orange) ──
  var currentHighlightedContainer = null;
  var currentHighlightedSubitem = null;

  window.onPreviewInspectHover = function(inspectId, level){
    clearEditorHighlights();
    var target = document.querySelector('[data-editor-id="' + inspectId + '"]');
    if(target){
      if(level === 'item'){
        currentHighlightedSubitem = target;
        target.classList.add('editor-inspect-subitem-active');
        // 부모 컨테이너도 부드럽게 강조
        var parentCard = target.closest('.item-card') || target.closest('[data-editor-level="container"]');
        if(parentCard && parentCard !== target){
          currentHighlightedContainer = parentCard;
          parentCard.classList.add('editor-inspect-active');
        }
      } else {
        currentHighlightedContainer = target;
        target.classList.add('editor-inspect-active');
      }
      target.scrollIntoView({ behavior:'smooth', block:'nearest' });
    }
  };

  window.onPreviewInspectLeave = function(){
    clearEditorHighlights();
  };

  window.onPreviewInspectClick = function(inspectId, level){
    var target = document.querySelector('[data-editor-id="' + inspectId + '"]');
    if(target){
      var inp = target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' ? target : target.querySelector('input[type="text"], textarea');
      if(inp){ inp.focus(); if(inp.select) inp.select(); }
    }
  };

  function clearEditorHighlights(){
    if(currentHighlightedContainer){
      currentHighlightedContainer.classList.remove('editor-inspect-active');
      currentHighlightedContainer = null;
    }
    if(currentHighlightedSubitem){
      currentHighlightedSubitem.classList.remove('editor-inspect-subitem-active');
      currentHighlightedSubitem = null;
    }
  }

  // 에디터 카드 및 개별 인풋 요소 바인딩
  function bindEditorInspectEvents(){
    document.querySelectorAll('[data-editor-id]').forEach(function(el){
      var id = el.getAttribute('data-editor-id');
      var level = el.getAttribute('data-editor-level') || 'container';

      el.onmouseenter = function(e){
        e.stopPropagation();
        if(level === 'item'){
          el.classList.add('editor-inspect-subitem-active');
        } else {
          el.classList.add('editor-inspect-active');
        }
        var frame = document.getElementById('previewFrame');
        if(frame && frame.contentWindow && frame.contentWindow.highlightFromEditor){
          frame.contentWindow.highlightFromEditor(id, level);
        }
      };

      el.onmouseleave = function(e){
        e.stopPropagation();
        if(level === 'item'){
          el.classList.remove('editor-inspect-subitem-active');
        } else {
          el.classList.remove('editor-inspect-active');
        }
        var frame = document.getElementById('previewFrame');
        if(frame && frame.contentWindow && frame.contentWindow.clearHighlightFromEditor){
          frame.contentWindow.clearHighlightFromEditor();
        }
      };

      // 입력 중에도 실시간 하이라이트 유지
      var inp = el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' ? el : el.querySelector('input, textarea');
      if(inp){
        inp.onfocus = function(){
          el.classList.add('editor-inspect-subitem-active');
          var frame = document.getElementById('previewFrame');
          if(frame && frame.contentWindow && frame.contentWindow.highlightFromEditor){
            frame.contentWindow.highlightFromEditor(id, 'item');
          }
        };
        inp.onblur = function(){
          el.classList.remove('editor-inspect-subitem-active');
          var frame = document.getElementById('previewFrame');
          if(frame && frame.contentWindow && frame.contentWindow.clearHighlightFromEditor){
            frame.contentWindow.clearHighlightFromEditor();
          }
        };
      }
    });
  }

  // 기본 폼 입력 이벤트
  ['fTitle', 'fBadge', 'fDesc'].forEach(function(id){
    document.getElementById(id).addEventListener('input', function(){
      currentData.title = document.getElementById('fTitle').value;
      currentData.badge = document.getElementById('fBadge').value;
      currentData.description = document.getElementById('fDesc').value;
      document.getElementById('jsonEditor').value = JSON.stringify(currentData, null, 2);
      updateLivePreview();
    });
  });

  // Flow Map 조작
  window.addFlowItem = function(){
    currentData.flowmap = currentData.flowmap || [];
    currentData.flowmap.push({ num: String(currentData.flowmap.length+1), title: "새로운 단계", desc: "단계 설명", color: "#1967d2" });
    syncFormFromData();
  };
  window.updateFlowItem = function(i, k, v){ currentData.flowmap[i][k] = v; updateLivePreview(); document.getElementById('jsonEditor').value = JSON.stringify(currentData, null, 2); };
  window.removeFlowItem = function(i){ currentData.flowmap.splice(i, 1); syncFormFromData(); };

  // Cards 조작
  window.addCardItem = function(){
    currentData.cards = currentData.cards || [];
    currentData.cards.push({ badge: "MODULE", frontTitle: "신규 모듈 카드", tags: ["태그1", "태그2"], color: "#1967d2", backDesc: "카드 뒷면 세부 설명" });
    syncFormFromData();
  };
  window.updateCardItem = function(i, k, v){ currentData.cards[i][k] = v; updateLivePreview(); document.getElementById('jsonEditor').value = JSON.stringify(currentData, null, 2); };
  window.updateCardTags = function(i, v){ currentData.cards[i].tags = v.split(',').map(function(s){ return s.trim(); }).filter(Boolean); updateLivePreview(); document.getElementById('jsonEditor').value = JSON.stringify(currentData, null, 2); };
  window.removeCardItem = function(i){ currentData.cards.splice(i, 1); syncFormFromData(); };

  // Steps 조작
  window.addStepItem = function(){
    currentData.steps = currentData.steps || [];
    currentData.steps.push({ num: String(currentData.steps.length+1), title: "새로운 실행 단계", tool: "도구명", goal: "실행 목표", desc: "실행 방법 안내" });
    syncFormFromData();
  };
  window.updateStepItem = function(i, k, v){ currentData.steps[i][k] = v; updateLivePreview(); document.getElementById('jsonEditor').value = JSON.stringify(currentData, null, 2); };
  window.removeStepItem = function(i){ currentData.steps.splice(i, 1); syncFormFromData(); };

  // Checklist 조작
  window.addCheckItem = function(){
    currentData.checklist = currentData.checklist || [];
    currentData.checklist.push("점검할 세부 항목 내용");
    syncFormFromData();
  };
  window.updateCheckItem = function(i, v){ currentData.checklist[i] = v; updateLivePreview(); document.getElementById('jsonEditor').value = JSON.stringify(currentData, null, 2); };
  window.removeCheckItem = function(i){ currentData.checklist.splice(i, 1); syncFormFromData(); };

  // ── 에디터 탭 전환 ──
  document.getElementById('tabForm').addEventListener('click', function(){
    document.getElementById('tabForm').classList.add('active');
    document.getElementById('tabJson').classList.remove('active');
    document.getElementById('formView').style.display = 'block';
    document.getElementById('jsonView').style.display = 'none';
    syncFormFromData();
  });
  document.getElementById('tabJson').addEventListener('click', function(){
    document.getElementById('tabJson').classList.add('active');
    document.getElementById('tabForm').classList.remove('active');
    document.getElementById('formView').style.display = 'none';
    document.getElementById('jsonView').style.display = 'block';
    document.getElementById('jsonEditor').value = JSON.stringify(currentData, null, 2);
  });
  document.getElementById('jsonEditor').addEventListener('input', function(e){
    try {
      currentData = JSON.parse(e.target.value);
      updateLivePreview();
    } catch(err){}
  });

  // ── 내보내기 & 복사 (요구사항 3: isExport = true로 하이라이트 및 인스펙터 완전 제거) ──
  document.getElementById('copyHtmlBtn').addEventListener('click', function(){
    var html = renderReportHtml(currentData, true);
    navigator.clipboard.writeText(html).then(function(){
      showToast('📋 순수 배포용 HTML 코드가 클립보드에 복사되었습니다! (하이라이트 스크립트 제거됨)');
    });
  });

  document.getElementById('downloadHtmlBtn').addEventListener('click', function(){
    var html = renderReportHtml(currentData, true);
    var blob = new Blob([html], { type: 'text/html;charset=utf-8' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = (currentData.title || 'workflow-report').replace(/\\s+/g, '_') + '.html';
    a.click();
    URL.revokeObjectURL(url);
    showToast('💾 순수 배포용 HTML 파일이 다운로드되었습니다. (하이라이트 스크립트 제거됨)');
  });

  // ── 초기화: 드롭다운 채우기 및 폼 렌더링 ──
  updatePresetDropdown();
  syncFormFromData();
`;

  // Verify the script syntax before outputting
  try {
    new vm.Script(clientScript);
    console.log('✅ Client script passed vm.Script verification with 0 errors!');
  } catch(e) {
    console.error('❌ Syntax error in clientScript:', e);
    process.exit(1);
  }

  // Assemble full builder.html
  const htmlHead = `<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Gemini Style Workflow Studio · 비주얼 리포트 제작기</title>
<link rel="preload" href="./assets/subset-Pretendard-Regular.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="./assets/subset-Pretendard-Bold.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="./assets/subset-Pretendard-Medium.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="./assets/subset-Pretendard-SemiBold.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="./assets/subset-Pretendard-ExtraBold.woff2" as="font" type="font/woff2" crossorigin>
<style>
  @font-face { font-family:'Pretendard'; font-weight:400; font-display:swap; src:url('./assets/subset-Pretendard-Regular.woff2') format('woff2'); }
  @font-face { font-family:'Pretendard'; font-weight:500; font-display:swap; src:url('./assets/subset-Pretendard-Medium.woff2') format('woff2'); }
  @font-face { font-family:'Pretendard'; font-weight:600; font-display:swap; src:url('./assets/subset-Pretendard-SemiBold.woff2') format('woff2'); }
  @font-face { font-family:'Pretendard'; font-weight:700; font-display:swap; src:url('./assets/subset-Pretendard-Bold.woff2') format('woff2'); }
  @font-face { font-family:'Pretendard'; font-weight:800; font-display:swap; src:url('./assets/subset-Pretendard-ExtraBold.woff2') format('woff2'); }

  :root {
    --navy: #0b1a2c;
    --navy-2: #243551;
    --white: #ffffff;
    --paper: #ffffff;
    --bg: #f8fafd;
    --text: #1f2328;
    --muted: #5f6368;
    --line: #dadce0;
    --primary: #1967d2;
    --teal: #137333;
    --terra: #c5221f;
    --amber: #f9ab00;
    --orange: #ea580c;
    --sidebar-w: 490px;
  }

  * { box-sizing: border-box; }
  body {
    margin: 0; padding: 0; font-family: 'Pretendard', system-ui, -apple-system, sans-serif;
    color: var(--text); background: var(--bg); display: flex; flex-direction: column; height: 100vh; overflow: hidden;
  }

  /* ── 상단 글로벌 헤더 ── */
  header.toolbar {
    height: 58px; background: var(--white); border-bottom: 1px solid var(--line);
    display: flex; align-items: center; justify-content: space-between; padding: 0 20px;
    box-shadow: 0 1px 3px rgba(60,64,67,.08); z-index: 10;
  }
  .brand { display: flex; align-items: center; gap: 10px; font-weight: 700; font-size: 1.05rem; color: var(--navy); white-space: nowrap; }
  .brand .dot {
    width: 12px; height: 12px; border-radius: 50%;
    background: linear-gradient(135deg, #4a90e8, #ee4d5d);
    box-shadow: 0 0 0 3px rgba(25,103,210,.15);
  }
  .actions { display: flex; align-items: center; gap: 9px; flex-wrap: wrap; }
  .btn {
    display: inline-flex; align-items: center; gap: 6px; font-family: inherit;
    font-size: .86rem; font-weight: 600; padding: 8px 14px; border-radius: 8px;
    border: 1px solid var(--line); background: var(--white); color: var(--text);
    cursor: pointer; transition: .16s; white-space: nowrap;
  }
  .btn:hover { background: #f1f3f4; border-color: #c6dafc; }
  .btn.primary {
    background: var(--primary); color: #fff; border-color: var(--primary);
    box-shadow: 0 1px 3px rgba(25,103,210,.3);
  }
  .btn.primary:hover { background: #174ea6; }

  select.preset-select {
    font-family: inherit; font-size: .88rem; padding: 7px 12px; border-radius: 8px;
    border: 1px solid var(--line); background: #fff; font-weight: 600; color: var(--navy-2);
    max-width: 270px; text-overflow: ellipsis; outline: none;
  }
  select.preset-select:focus { border-color: var(--primary); box-shadow: 0 0 0 3px rgba(25,103,210,.14); }

  /* ── 메인 스플릿 뷰 ── */
  .workspace { flex: 1; display: flex; overflow: hidden; }

  /* ── 좌측 에디터 패널 ── */
  .editor-pane {
    width: var(--sidebar-w); min-width: 380px; max-width: 600px;
    background: var(--white); border-right: 1px solid var(--line);
    display: flex; flex-direction: column; overflow: hidden;
  }
  .editor-tabs {
    display: flex; border-bottom: 1px solid var(--line); background: #fafbfd;
  }
  .tab-btn {
    flex: 1; padding: 12px 14px; border: none; background: transparent; font-family: inherit;
    font-size: .88rem; font-weight: 600; color: var(--muted); cursor: pointer;
    border-bottom: 2px solid transparent; transition: .15s; text-align: center;
  }
  .tab-btn.active { color: var(--primary); border-bottom-color: var(--primary); background: #fff; }

  .editor-scroll {
    flex: 1; overflow-y: auto; padding: 18px 20px;
    scroll-behavior: smooth;
  }
  .form-group {
    margin-bottom: 16px; border-radius: 8px; transition: all .16s ease;
  }
  .form-group label { display: block; font-size: .82rem; font-weight: 700; color: var(--navy-2); margin-bottom: 6px; }
  .form-group input, .form-group textarea, .form-group select {
    width: 100%; font-family: inherit; font-size: .88rem; padding: 9px 12px;
    border: 1px solid var(--line); border-radius: 8px; background: #fff;
    color: var(--text); box-sizing: border-box; transition: border-color .15s, box-shadow .15s;
  }
  .form-group input:focus, .form-group textarea:focus, .form-group select:focus {
    outline: none; border-color: var(--orange); box-shadow: 0 0 0 3px rgba(234,88,12,.18);
  }
  .form-group textarea { resize: vertical; min-height: 70px; }

  .section-divider {
    font-size: .82rem; font-weight: 800; color: var(--navy); text-transform: uppercase;
    letter-spacing: .08em; padding: 14px 0 8px; margin-top: 14px; border-top: 1px dashed var(--line);
    display: flex; align-items: center; justify-content: space-between;
  }
  .section-divider:first-of-type { border-top: none; padding-top: 0; margin-top: 0; }
  .add-item-btn {
    font-size: .78rem; font-weight: 700; color: var(--primary); background: #e8f0fe;
    border: 1px solid #c6dafc; padding: 4px 10px; border-radius: 6px; cursor: pointer; transition: .14s;
  }
  .add-item-btn:hover { background: #d2e3fc; }

  .item-card {
    background: #f8fafd; border: 1px solid var(--line); border-radius: 12px;
    padding: 14px; margin-bottom: 12px; position: relative; transition: all .16s ease;
  }
  .item-card:hover { border-color: #c6dafc; box-shadow: 0 2px 8px rgba(36,53,81,.06); }
  .item-delete-btn {
    position: absolute; top: 10px; right: 10px; font-size: .75rem; color: #d93025;
    background: #fce8e6; border: none; padding: 3px 8px; border-radius: 4px; cursor: pointer; font-weight: 600;
  }
  .item-delete-btn:hover { background: #fad2cf; }

  /* ── 툴바 & 도구 모음 섹션 (Collapsible Card) ── */
  .tool-section-card {
    background: #ffffff; border: 1px solid #d2e3fc; border-radius: 16px;
    margin-bottom: 20px; overflow: hidden; box-shadow: 0 2px 10px rgba(25,103,210,.06);
    transition: all .2s ease;
  }
  .tool-section-card:hover { border-color: #a8c7fa; }
  .tool-section-header {
    padding: 13px 16px; background: linear-gradient(180deg, #f8faff, #edf4fe);
    display: flex; align-items: center; justify-content: space-between;
    cursor: pointer; user-select: none; border-bottom: 1px solid #e1ecfa;
    transition: background .16s;
  }
  .tool-section-header:hover { background: #e3effe; }
  .tool-section-title-wrap { display: flex; align-items: center; gap: 8px; }
  .collapse-arrow {
    display: inline-flex; align-items: center; justify-content: center;
    width: 22px; height: 22px; border-radius: 6px; background: #fff;
    color: var(--primary); font-size: .8rem; font-weight: 800;
    box-shadow: 0 1px 3px rgba(25,103,210,.12); transition: transform .2s ease;
  }
  .tool-section-card.collapsed .collapse-arrow { transform: rotate(-90deg); }
  .tool-section-card.collapsed .tool-section-header { border-bottom-color: transparent; }
  .tool-section-title { font-weight: 700; font-size: .92rem; color: var(--navy); }
  .tool-section-badges { display: flex; align-items: center; gap: 8px; }
  .tb-count-badge {
    font-size: .74rem; font-weight: 700; background: #1967d2; color: #fff;
    padding: 2px 8px; border-radius: 999px;
  }
  .tb-toggle-hint { font-size: .74rem; color: #5f6368; font-weight: 500; }
  .tool-section-body {
    padding: 16px; transition: max-height .25s ease;
  }
  .tool-section-card.collapsed .tool-section-body { display: none; }

  /* 도구 팔레트 버튼 랙 */
  .dock-group-title {
    font-size: .78rem; font-weight: 700; color: #5f6368; letter-spacing: .06em;
    margin: 14px 0 8px; text-transform: uppercase; display: flex; align-items: center; justify-content: space-between;
  }
  .dock-group-title:first-child { margin-top: 0; }
  .dock-group-tag { font-size: .68rem; font-weight: 700; padding: 2px 7px; border-radius: 4px; }
  .dock-group-tag.layout { background: #e8f0fe; color: #1967d2; }
  .dock-group-tag.blocks { background: #f3e8fd; color: #7627bb; }

  .tool-button-rack {
    display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px; margin-bottom: 12px;
  }
  .dock-tool-btn, .dock-widget-btn {
    position: relative; display: flex; align-items: center; gap: 8px; padding: 9px 11px;
    background: #f8f9fa; border: 1px solid var(--line); border-radius: 10px;
    cursor: pointer; font-family: inherit; color: var(--navy-2);
    transition: all .16s ease; text-align: left;
  }
  .dock-tool-btn:hover, .dock-widget-btn:hover {
    background: #ffffff; border-color: #c6dafc;
    box-shadow: 0 2px 8px rgba(25,103,210,.08); transform: translateY(-1px);
  }
  .dock-tool-btn.active {
    background: #eef5fe; border-color: #8ab4f8; color: #1967d2;
    box-shadow: 0 0 0 2px rgba(25,103,210,.14);
  }
  .dock-tool-btn .dock-icon, .dock-widget-btn .dock-icon { font-size: 1.15rem; line-height: 1; flex-shrink: 0; }
  .dock-tool-btn .dock-label-group, .dock-widget-btn .dock-label-group { display: flex; flex-direction: column; flex: 1; min-width: 0; padding-right: 18px; }
  .dock-tool-btn .dock-name, .dock-widget-btn .dock-name { font-size: .82rem; font-weight: 700; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .dock-tool-btn .dock-sub, .dock-widget-btn .dock-sub { font-size: .70rem; color: #70757a; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .dock-tool-btn.active .dock-sub { color: #1a73e8; font-weight: 600; }
  .dock-tool-btn .dock-pill {
    font-size: .66rem; font-weight: 800; padding: 2px 5px; border-radius: 5px;
    background: #dadce0; color: #5f6368;
  }
  .dock-tool-btn.active .dock-pill { background: #1967d2; color: #ffffff; }

  /* 툴 우측 상단 '?' 도움말 아이콘 (요구사항 2) */
  .tool-help-btn {
    position: absolute; top: 6px; right: 6px; width: 18px; height: 18px; border-radius: 50%;
    border: 1px solid #dadce0; background: #fff; color: #5f6368; font-size: 11px; font-weight: 800;
    display: flex; align-items: center; justify-content: center; cursor: pointer; line-height: 1;
    transition: all .14s ease; z-index: 2; padding: 0;
  }
  .tool-help-btn:hover {
    background: #1967d2; color: #fff; border-color: #1967d2; transform: scale(1.15);
    box-shadow: 0 2px 6px rgba(25,103,210,.25);
  }

  /* ── 2단계 하이라이트 스타일 (Chrome DevTools Elements 스타일) ── */
  /* 1) 상위 컨테이너 하이라이트 (Blue) */
  .editor-inspect-active {
    border-color: #1a73e8 !important;
    box-shadow: 0 0 0 3px rgba(26,115,232,0.28), 0 8px 24px rgba(26,115,232,0.12) !important;
    background: #f4f8ff !important;
    transform: translateY(-1px);
    transition: all .15s ease-out !important;
  }
  /* 2) 하위 세부 항목 하이라이트 (Vivid Orange / Coral) (요구사항 1) */
  .editor-inspect-subitem-active {
    border-color: #ea580c !important;
    box-shadow: 0 0 0 3px rgba(234,88,12,0.28), 0 4px 14px rgba(234,88,12,0.15) !important;
    background: #fff8f5 !important;
    border-radius: 8px !important;
    transition: all .15s ease-out !important;
  }

  /* JSON 에디터 */
  #jsonEditor {
    width: 100%; height: 100%; border: none; padding: 16px; font-family: 'Consolas', 'Menlo', monospace;
    font-size: .84rem; line-height: 1.5; color: #202124; background: #fdfdfd; resize: none; outline: none;
    box-sizing: border-box;
  }

  /* ── 우측 프리뷰 패널 ── */
  .preview-pane {
    flex: 1; display: flex; flex-direction: column; background: #e9eef6; overflow: hidden; position: relative;
  }
  .preview-bar {
    height: 42px; background: #f1f3f4; border-bottom: 1px solid var(--line);
    display: flex; align-items: center; justify-content: space-between; padding: 0 16px;
    font-size: .82rem; font-weight: 600; color: var(--navy-2);
  }
  .preview-dots { display: flex; gap: 6px; }
  .pdot { width: 10px; height: 10px; border-radius: 50%; }
  .pdot.red { background: #ea4335; }
  .pdot.yellow { background: #fbbc05; }
  .pdot.green { background: #34a853; }
  .preview-iframe { flex: 1; border: none; width: 100%; height: 100%; background: #fff; }

  /* ── 모달 공통 스타일 ── */
  .modal-overlay {
    position: fixed; inset: 0; background: rgba(0,0,0,0.48); backdrop-filter: blur(4px);
    display: flex; align-items: center; justify-content: center; z-index: 9999;
    animation: fadeIn .15s ease-out;
  }
  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
  .modal-card {
    background: #ffffff; border-radius: 18px; width: 440px; max-width: 92vw; padding: 24px;
    box-shadow: 0 20px 50px rgba(0,0,0,0.22); border: 1px solid var(--line);
    animation: slideUp .2s cubic-bezier(.16,1,.3,1);
  }
  .modal-card.wide {
    width: 540px; max-height: 90vh; overflow-y: auto;
  }
  @keyframes slideUp { from { transform: translateY(12px) scale(.98); } to { transform: translateY(0) scale(1); } }
  .modal-header {
    display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px;
  }
  .modal-header h3 { margin: 0; font-size: 1.15rem; font-weight: 700; color: var(--navy); display: flex; align-items: center; gap: 8px; }
  .modal-close-btn {
    width: 28px; height: 28px; border-radius: 50%; border: none; background: #f1f3f4;
    color: #5f6368; cursor: pointer; display: flex; align-items: center; justify-content: center;
    font-size: .85rem; font-weight: 700; transition: .15s;
  }
  .modal-close-btn:hover { background: #dadce0; color: #202124; }
  .modal-footer {
    display: flex; justify-content: flex-end; gap: 8px; margin-top: 20px;
  }

  /* Toast 알림 */
  .toast-notification {
    position: fixed; bottom: 24px; right: 24px; z-index: 10000;
    background: #202124; color: #fff; padding: 12px 20px; border-radius: 12px;
    font-size: .88rem; font-weight: 600; box-shadow: 0 8px 24px rgba(0,0,0,0.25);
    display: flex; align-items: center; gap: 8px; animation: slideUp .2s ease-out;
  }
</style>
</head>
<body>

<!-- 상단 헤더 -->
<header class="toolbar">
  <div class="brand">
    <span class="dot"></span> Gemini Style Workflow Studio
  </div>
  <div class="actions">
    <!-- 작업 & 템플릿 선택 드롭다운 -->
    <select class="preset-select" id="presetSelect" title="작업 및 템플릿 불러오기"></select>
    <button class="btn" id="deleteWorkBtn" style="display:none; color:#d93025; border-color:#fce8e6;" title="현재 불러온 저장 작업 삭제">🗑️ 삭제</button>
    <button class="btn" id="openSaveBtn" style="background:#e8f0fe; color:#1967d2; border-color:#c6dafc;" title="현재 작성 중인 작업 내용을 브라우저에 영구 저장">💾 작업 저장</button>
    <button class="btn" id="copyHtmlBtn" title="배포용 순수 HTML 복사 (하이라이트 기능 제외)">📋 HTML 복사</button>
    <button class="btn primary" id="downloadHtmlBtn" title="배포용 순수 HTML 다운로드 (하이라이트 기능 제외)">⬇️ 단일 HTML 다운로드</button>
  </div>
</header>

<!-- 메인 스튜디오 영역 -->
<div class="workspace">
  <!-- 좌측 편집기 패널 -->
  <aside class="editor-pane">
    <nav class="editor-tabs">
      <button class="tab-btn active" id="tabForm">비주얼 폼 편집 (/vo)</button>
      <button class="tab-btn" id="tabJson">JSON 직접 편집</button>
    </nav>
    
    <!-- 폼 모드 -->
    <div class="editor-scroll" id="formView">
      
      <!-- ── 🛠️ 툴바 & 도구 모음 팔레트 (펼침/숨김 지원) ── -->
      <div class="tool-section-card" id="toolbarSectionCard" data-editor-id="toolbar" data-editor-level="container">
        <div class="tool-section-header" id="toolbarSectionToggle" onclick="toggleToolbarSection()">
          <div class="tool-section-title-wrap">
            <span class="collapse-arrow" id="tbCollapseArrow">▾</span>
            <span class="tool-section-title">🛠️ 툴바 &amp; 도구 모음 (Toolbar &amp; Tools)</span>
          </div>
          <div class="tool-section-badges">
            <span class="tb-count-badge" id="tbActiveCountBadge">5개 활성</span>
            <span class="tb-toggle-hint" id="tbToggleHint">접기</span>
          </div>
        </div>

        <div class="tool-section-body" id="toolbarSectionBody">
          <!-- 1) [구조 & 레이아웃 (Structure & Layout)] 도구군 -->
          <div class="dock-group-title">
            <span>🌐 구조 &amp; 레이아웃 도구 (Structure &amp; Layout)</span>
            <span class="dock-group-tag layout">LAYOUT</span>
          </div>
          <div class="tool-button-rack">
            <div class="dock-tool-btn active" id="btnToolSearch" onclick="toggleToolbarFeature('showSearch')">
              <span class="dock-icon">🔍</span>
              <div class="dock-label-group">
                <span class="dock-name">실시간 검색창</span>
                <span class="dock-sub">인덱싱 &amp; 앵커 점프</span>
              </div>
              <span class="dock-pill" id="pillToolSearch">ON</span>
              <button class="tool-help-btn" onclick="openToolHelpModal(event, 'search')" title="설명 및 적용 예시 보기">?</button>
            </div>
            <div class="dock-tool-btn active" id="btnToolChips" onclick="toggleToolbarFeature('showSuggestChips')">
              <span class="dock-icon">⚡</span>
              <div class="dock-label-group">
                <span class="dock-name">추천 검색어 칩</span>
                <span class="dock-sub">홈(index) 키워드 태그</span>
              </div>
              <span class="dock-pill" id="pillToolChips">ON</span>
              <button class="tool-help-btn" onclick="openToolHelpModal(event, 'suggestChips')" title="설명 및 적용 예시 보기">?</button>
            </div>
            <div class="dock-tool-btn active" id="btnToolTabs" onclick="toggleToolbarFeature('showCategoryTabs')">
              <span class="dock-icon">🗂️</span>
              <div class="dock-label-group">
                <span class="dock-name">카테고리 탭</span>
                <span class="dock-sub">홈(index) 알약형 필터</span>
              </div>
              <span class="dock-pill" id="pillToolTabs">ON</span>
              <button class="tool-help-btn" onclick="openToolHelpModal(event, 'categoryTabs')" title="설명 및 적용 예시 보기">?</button>
            </div>
            <div class="dock-tool-btn active" id="btnToolPrint" onclick="toggleToolbarFeature('showPrint')">
              <span class="dock-icon">🖨️</span>
              <div class="dock-label-group">
                <span class="dock-name">인쇄 / PDF</span>
                <span class="dock-sub">원클릭 인쇄 호출</span>
              </div>
              <span class="dock-pill" id="pillToolPrint">ON</span>
              <button class="tool-help-btn" onclick="openToolHelpModal(event, 'print')" title="설명 및 적용 예시 보기">?</button>
            </div>
            <div class="dock-tool-btn active" id="btnToolProgress" onclick="toggleToolbarFeature('showProgress')">
              <span class="dock-icon">📊</span>
              <div class="dock-label-group">
                <span class="dock-name">진행률 표시줄</span>
                <span class="dock-sub">스크롤 인디케이터</span>
              </div>
              <span class="dock-pill" id="pillToolProgress">ON</span>
              <button class="tool-help-btn" onclick="openToolHelpModal(event, 'progress')" title="설명 및 적용 예시 보기">?</button>
            </div>
            <div class="dock-tool-btn active" id="btnToolTheme" onclick="toggleToolbarFeature('showThemeToggle')">
              <span class="dock-icon">🌓</span>
              <div class="dock-label-group">
                <span class="dock-name">다크모드 전환</span>
                <span class="dock-sub">구글 다크 테마</span>
              </div>
              <span class="dock-pill" id="pillToolTheme">ON</span>
              <button class="tool-help-btn" onclick="openToolHelpModal(event, 'theme')" title="설명 및 적용 예시 보기">?</button>
            </div>
          </div>

          <!-- 확장 옵션 입력 (검색어 칩 및 카테고리 탭 설정) -->
          <div id="subToolbarSettings" style="background:#f8fafd; border:1px solid #e1ecfa; border-radius:10px; padding:12px; margin-bottom:14px;">
            <div class="form-group" style="margin-bottom:8px;" data-editor-id="tb-search-box" data-editor-level="item">
              <label style="font-size:.78rem;">검색창 안내 문구 (Placeholder)</label>
              <input type="text" id="tbSearchPlaceholder" placeholder="보고서 내 키워드 검색..." oninput="updateToolbarText('searchPlaceholder', this.value)">
            </div>
            <div class="form-group" style="margin-bottom:8px;" id="boxSuggestChipsInput" data-editor-id="suggestChips" data-editor-level="item">
              <label style="font-size:.78rem;">추천 검색어 칩 (쉼표 구분)</label>
              <input type="text" id="tbSuggestChips" placeholder="마스코트, 대시보드, Apps Script, PARTS" oninput="updateSuggestChips(this.value)">
            </div>
            <div class="form-group" style="margin-bottom:0;" id="boxCategoryTabsInput" data-editor-id="categoryTabs" data-editor-level="item">
              <label style="font-size:.78rem;">카테고리 탭 목록 (쉼표 구분)</label>
              <input type="text" id="tbCategoryTabs" placeholder="전체, 1단계: 기획, 2단계: 실습, 3단계: 검증" oninput="updateCategoryTabs(this.value)">
            </div>
          </div>

          <!-- 2) [컴포넌트 & 블록 (Components & Blocks)] 위젯군 (홈, 모듈 2, 3, 4 기반) -->
          <div class="dock-group-title">
            <span>✨ 컴포넌트 &amp; 블록 라이브러리 (Components &amp; Blocks)</span>
            <span class="dock-group-tag blocks">BLOCKS</span>
          </div>
          <div class="tool-button-rack">
            <div class="dock-widget-btn" onclick="insertWidget('whyBox')" title="모듈 2, 3, 4에 적용된 네이비 그라데이션 인트로 박스를 추가합니다.">
              <span class="dock-icon">🌌</span>
              <div class="dock-label-group">
                <span class="dock-name">Why 인트로 박스</span>
                <span class="dock-sub">모듈 2/3/4 네이비 카드</span>
              </div>
              <button class="tool-help-btn" onclick="openToolHelpModal(event, 'whyBox')" title="설명 및 적용 예시 보기">?</button>
            </div>
            <div class="dock-widget-btn" onclick="insertWidget('procBox')" title="모듈 3, 4의 캡슐형 프로세스 파이프라인 흐름 바를 추가합니다.">
              <span class="dock-icon">🔄</span>
              <div class="dock-label-group">
                <span class="dock-name">프로세스 플로우 바</span>
                <span class="dock-sub">모듈 3/4 캡슐 파이프라인</span>
              </div>
              <button class="tool-help-btn" onclick="openToolHelpModal(event, 'procBox')" title="설명 및 적용 예시 보기">?</button>
            </div>
            <div class="dock-widget-btn" onclick="insertWidget('kpiStats')" title="모듈 3에 적용된 3분할 통계 수치 스코어보드를 추가합니다.">
              <span class="dock-icon">📊</span>
              <div class="dock-label-group">
                <span class="dock-name">KPI 스코어보드</span>
                <span class="dock-sub">모듈 3 3분할 통계 지표</span>
              </div>
              <button class="tool-help-btn" onclick="openToolHelpModal(event, 'kpiStats')" title="설명 및 적용 예시 보기">?</button>
            </div>
            <div class="dock-widget-btn" onclick="insertWidget('prompt')" title="원클릭 복사 버튼이 달린 Gemini 프롬프트 카드를 추가합니다.">
              <span class="dock-icon">📋</span>
              <div class="dock-label-group">
                <span class="dock-name">Gemini 프롬프트 카드</span>
                <span class="dock-sub">모듈 2/4 원클릭 복사 박스</span>
              </div>
              <button class="tool-help-btn" onclick="openToolHelpModal(event, 'prompt')" title="설명 및 적용 예시 보기">?</button>
            </div>
            <div class="dock-widget-btn" onclick="insertWidget('tip')" title="클릭 시 펼쳐지는 실습 팁 아코디언을 추가합니다.">
              <span class="dock-icon">💡</span>
              <div class="dock-label-group">
                <span class="dock-name">접이식 팁 아코디언</span>
                <span class="dock-sub">모듈 3/4 Details 팁</span>
              </div>
              <button class="tool-help-btn" onclick="openToolHelpModal(event, 'tip')" title="설명 및 적용 예시 보기">?</button>
            </div>
            <div class="dock-widget-btn" onclick="insertWidget('note')" title="왼쪽 블루 액센트 보더가 있는 핵심 안내 카드를 추가합니다.">
              <span class="dock-icon">ℹ️</span>
              <div class="dock-label-group">
                <span class="dock-name">핵심 안내 노트</span>
                <span class="dock-sub">모듈 2/3/4 블루 콜아웃</span>
              </div>
              <button class="tool-help-btn" onclick="openToolHelpModal(event, 'note')" title="설명 및 적용 예시 보기">?</button>
            </div>
            <div class="dock-widget-btn" onclick="insertWidget('warn')" title="왼쪽 레드/테라코타 보더가 있는 주의 경고 카드를 추가합니다.">
              <span class="dock-icon">⚠️</span>
              <div class="dock-label-group">
                <span class="dock-name">주의 경고 박스</span>
                <span class="dock-sub">모듈 3/4 레드 경고 콜아웃</span>
              </div>
              <button class="tool-help-btn" onclick="openToolHelpModal(event, 'warn')" title="설명 및 적용 예시 보기">?</button>
            </div>
            <div class="dock-widget-btn" onclick="insertWidget('urlbox')" title="스프레드시트나 웹 API 링크를 강조하는 전용 URL 리소스 카드를 추가합니다.">
              <span class="dock-icon">🌐</span>
              <div class="dock-label-group">
                <span class="dock-name">URL 리소스 상자</span>
                <span class="dock-sub">모듈 2/3 링크 &amp; 이동 버튼</span>
              </div>
              <button class="tool-help-btn" onclick="openToolHelpModal(event, 'urlbox')" title="설명 및 적용 예시 보기">?</button>
            </div>
          </div>
        </div>
      </div>

      <!-- 기본 정보 (헤더 설정) -->
      <div class="section-divider" data-editor-id="header" data-editor-level="container">
        <span>기본 정보 (헤더 설정)</span>
      </div>
      <div class="item-card" data-editor-id="header" data-editor-level="container">
        <!-- 개별 하위 항목: 제목, 뱃지, 요약 설명 (Orange 하이라이트 대응) -->
        <div class="form-group" data-editor-id="hero-title" data-editor-level="item">
          <label>보고서 / 워크플로우 제목</label>
          <input type="text" id="fTitle" placeholder="예: AI 기반 주간 업무 자동화 보고서">
        </div>
        <div class="form-group" data-editor-id="hero-badge" data-editor-level="item">
          <label>상단 뱃지 문구 (Stamp Badge)</label>
          <input type="text" id="fBadge" placeholder="예: 🚀 2026 스마트 워크 플레이북">
        </div>
        <div class="form-group" style="margin-bottom:0;" data-editor-id="hero-desc" data-editor-level="item">
          <label>요약 설명</label>
          <textarea id="fDesc" placeholder="워크플로우의 목적과 기대 효과를 입력하세요."></textarea>
        </div>
      </div>

      <!-- 🌌 Why 인트로 박스 설정 (선택적) -->
      <div id="whyBoxEditorContainer"></div>

      <!-- 🔄 프로세스 플로우 바 설정 (선택적) -->
      <div id="procBoxEditorContainer"></div>

      <!-- 📊 KPI 지표 스코어보드 (선택적) -->
      <div id="kpiStatsEditorContainer"></div>

      <!-- 🗺️ 1줄 흐름 지도 -->
      <div class="section-divider" data-editor-id="flowmap" data-editor-level="container">
        <span>1줄 흐름 지도 (Flow Map)</span>
        <button class="add-item-btn" onclick="addFlowItem()">+ 단계 추가</button>
      </div>
      <div id="flowItemsContainer"></div>

      <!-- 📌 3D 플립 카드 (핵심 모듈) -->
      <div class="section-divider" data-editor-id="cards" data-editor-level="container">
        <span>3D 플립 카드 (핵심 모듈)</span>
        <button class="add-item-btn" onclick="addCardItem()">+ 카드 추가</button>
      </div>
      <div id="cardItemsContainer"></div>

      <!-- 🛠️ 상세 실행 단계 (스텝 & 프롬프트) -->
      <div class="section-divider" data-editor-id="steps" data-editor-level="container">
        <span>상세 실행 단계 (스텝 &amp; 프롬프트)</span>
        <button class="add-item-btn" onclick="addStepItem()">+ 실행 단계 추가</button>
      </div>
      <div id="stepItemsContainer"></div>

      <!-- ✅ 체크리스트 -->
      <div class="section-divider" data-editor-id="checklist" data-editor-level="container">
        <span>체크리스트</span>
        <button class="add-item-btn" onclick="addCheckItem()">+ 항목 추가</button>
      </div>
      <div id="checkItemsContainer"></div>
    </div>

    <!-- JSON 모드 -->
    <div id="jsonView" style="display: none; height: 100%;">
      <textarea id="jsonEditor" spellcheck="false"></textarea>
    </div>
  </aside>

  <!-- 우측 실시간 프리뷰 -->
  <main class="preview-pane">
    <div class="preview-bar">
      <div class="preview-dots">
        <span class="pdot red"></span>
        <span class="pdot yellow"></span>
        <span class="pdot green"></span>
      </div>
      <div style="display:flex;align-items:center;gap:8px;">
        <span>실시간 미리보기 (Live Preview)</span>
        <span style="font-size: .74rem; background:#e8f0fe; color:#1967d2; padding:2px 8px; border-radius:999px; font-weight:700;">🎯 2단계 DevTools 요소 검사기 동작 중</span>
      </div>
      <span style="font-size: .75rem; color: #5f6368;">Pretendard + Google Tone Architecture</span>
    </div>
    <iframe id="previewFrame" class="preview-iframe" title="미리보기 화면"></iframe>
  </main>
</div>

<!-- ── 도구 설명 및 적용 예시 모달 (요구사항 2) ── -->
<div id="toolHelpModal" class="modal-overlay" style="display:none;">
  <div class="modal-card wide">
    <div class="modal-header">
      <h3>
        <span id="toolHelpIcon" style="font-size:1.35rem;line-height:1;"></span>
        <span id="toolHelpTitle">도구 안내</span>
        <span id="toolHelpCategory" style="font-size:.70rem;font-weight:700;padding:2px 8px;border-radius:999px;border:1px solid #dadce0;"></span>
      </h3>
      <button class="modal-close-btn" onclick="closeToolHelpModal()">✕</button>
    </div>
    <div class="modal-body" style="font-size:.90rem;color:#3c4043;line-height:1.65;">
      <div style="margin-bottom:14px;">
        <b style="color:var(--navy);display:block;margin-bottom:4px;font-size:.92rem;">📌 기능 설명</b>
        <p id="toolHelpDesc" style="margin:0;color:#4a5056;font-size:.88rem;"></p>
      </div>

      <div style="margin-bottom:14px;background:#f8fafd;border:1px solid #e1ecfa;border-radius:10px;padding:12px 14px;">
        <b style="color:#1967d2;display:block;margin-bottom:4px;font-size:.86rem;">💡 권장 적용 시나리오</b>
        <p id="toolHelpScenario" style="margin:0;color:#243551;font-size:.84rem;"></p>
      </div>

      <div>
        <b style="color:var(--navy);display:block;margin-bottom:8px;font-size:.92rem;">🖼️ 실제 적용 미리보기 (Live Example)</b>
        <div id="toolHelpPreviewWrap" style="background:#fafbfc;border:1px dashed #c6dafc;border-radius:12px;padding:16px;"></div>
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn" onclick="closeToolHelpModal()">닫기</button>
      <button class="btn primary" id="toolHelpActionBtn">이 기능 적용하기</button>
    </div>
  </div>
</div>

<!-- ── 작업 저장 모달 ── -->
<div id="saveModal" class="modal-overlay" style="display:none;">
  <div class="modal-card">
    <div class="modal-header">
      <h3>💾 작업 내용 저장하기</h3>
      <button class="modal-close-btn" onclick="closeSaveModal()">✕</button>
    </div>
    <div class="modal-body">
      <p style="font-size:.85rem;color:var(--muted);margin:0 0 14px;line-height:1.5;">
        현재 편집 중인 워크플로우/보고서의 이름을 입력하세요.<br>
        저장된 작업은 상단 <b>"템플릿:"</b> 드롭다운 목록에 즉시 등록되어 언제든지 다시 불러올 수 있습니다.
      </p>
      <div class="form-group" style="margin-bottom:0;">
        <label>작업 이름</label>
        <input type="text" id="saveWorkName" placeholder="예: 2026 3분기 마케팅 전략 보고서" onkeydown="if(event.key==='Enter') confirmSaveWork()">
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn" onclick="closeSaveModal()">취소</button>
      <button class="btn primary" onclick="confirmSaveWork()">저장하기</button>
    </div>
  </div>
</div>
`;

  const fullHtml = htmlHead + '<script>' + clientScript + '</script>\n</body>\n</html>\n';
  fs.writeFileSync('builder.html', fullHtml, 'utf8');
  console.log('🎉 builder.html successfully generated! Total bytes:', fullHtml.length);
}

buildStudio();
