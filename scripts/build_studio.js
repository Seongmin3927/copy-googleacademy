const fs = require('fs');
const path = require('path');
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
          backDesc: "수백 건의 고객 문의 및 설문 텍스트에서 불만 요인(Pain Points)과 긍정 키워드를 클러스터링하여 시각화 차트 데이터로 가공합니다."
        },
        {
          badge: "PHASE 03",
          frontTitle: "구글 시트 연동 자동 지표 산출",
          tags: ["Google Sheets", "Apps Script", "대시보드"],
          color: "#137333",
          backDesc: "Gemini API를 Apps Script와 바인딩하여 시트에 입력되는 신규 로우(Row)마다 카테고리 태깅과 요약문을 실시간으로 채워넣습니다."
        }
      ],
      steps: [
        {
          num: "1",
          title: "회의 음성 스크립트 전처리 및 표준 JSON 변환",
          tool: "Gemini 2.5 Pro",
          goal: "구조화되지 않은 음성 텍스트를 구조적 데이터 스키마로 정리",
          desc: "아래 프롬프트를 복사하여 Gemini에 전달하고 정형화된 JSON 회의록 데이터를 생성합니다.",
          prompt: "당신은 구글 테크니컬 프로그램 매니저(TPM)입니다. 아래 회의 스크립트를 분석하여 다음 JSON 스키마로 출력하세요:\n{\n  \"meeting_title\": \"...\",\n  \"key_decisions\": [\"...\"],\n  \"action_items\": [{ \"owner\": \"...\", \"task\": \"...\", \"due\": \"...\" }]\n}",
          tip: "Gemini 웹 또는 API 호출 시 시스템 프롬프트(System Instruction)에 JSON Schema를 지정하면 100% 신뢰성 있는 결과를 얻을 수 있습니다.",
          note: "이 단계의 산출물은 다음 스프레드시트 자동화 단계의 직접적인 입력 데이터로 사용됩니다.",
          warn: "공개된 회의록에 사내 기밀 정보가 포함되지 않도록 마스킹 처리를 권장합니다.",
          url: "https://ai.google.dev/"
        },
        {
          num: "2",
          title: "Google Apps Script 기반 스프레드시트 실시간 동기화",
          tool: "Apps Script",
          goal: "추출된 액션 아이템을 팀 대시보드 시트에 1초 만에 자동 기입",
          desc: "스프레드시트의 확장 프로그램 ➔ Apps Script 편집기에서 트리거 함수를 배포합니다.",
          prompt: "function onNewMeetingNote(jsonData) {\n  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('액션아이템');\n  jsonData.action_items.forEach(item => {\n    sheet.appendRow([new Date(), item.owner, item.task, item.due, '진행중']);\n  });\n}",
          tip: "트리거 실행 주기나 Webhook URL을 설정하여 실시간성을 보장할 수 있습니다.",
          note: "API 토큰은 Script Properties(스크립트 속성)에 안전하게 보관하세요.",
          warn: "시트 이름이 '액션아이템'과 정확히 일치하는지 사전에 점검하세요.",
          url: "https://script.google.com/"
        },
        {
          num: "3",
          title: "주간 성과 대시보드 시각화 및 관계자 슬랙 공유",
          tool: "Google Sheets & Slack",
          goal: "매주 금요일 오후 5시 경영진 및 팀원에게 정량 지표 자동 리포팅",
          desc: "피벗 테이블과 슬랙 웹훅 봇을 결합하여 완성된 주간 지표를 채널에 게시합니다.",
          prompt: "curl -X POST -H 'Content-type: application/json' \\\n--data '{\"text\":\"📊 *주간 업무 자동화 요약*: 이번 주 액션아이템 18건 중 16건 완수 (달성률 88.8%)\"}' \\\nhttps://hooks.slack.com/services/YOUR/WEBHOOK/URL",
          tip: "조건부 서식을 시트에 적용해두면 지연된 태스크가 빨간색으로 자동 강조됩니다.",
          note: "슬랙 알림 외에도 Gmail을 통한 PDF 첨부 발송으로 쉽게 확장할 수 있습니다."
        }
      ],
      checklist: [
        "Gemini API 키 환경변수 세팅 완료",
        "Google Sheets 내 '액션아이템' 시트 탭 생성 완료",
        "Apps Script 테스트 실행 시 콘솔 200 OK 확인",
        "슬랙 웹훅 URL 보안 점검 완료"
      ]
    },
    meeting: {
      title: "원클릭 스마트 회의록 & 액션 플래너",
      badge: "⚡ 3분 완성 회의록",
      description: "회의 중 메모한 두서없는 단어들을 명료한 핵심 요약과 담당자별 액션 아이템으로 즉시 변환하는 실전 템플릿입니다.",
      toolbar: {
        enabled: true,
        showSearch: true,
        searchPlaceholder: "회의록 키워드 검색...",
        showSuggestChips: true,
        suggestChips: ["결정사항", "차주 계획", "담당자", "마감일"],
        showCategoryTabs: true,
        categoryTabs: ["전체", "안건", "결정사항", "액션플랜"],
        showPrint: true,
        showProgress: true,
        showThemeToggle: true
      },
      whyBox: {
        enabled: true,
        title: "💡 회의록 정리 시간 90% 감축",
        desc: "회의가 끝난 직후 3분 안에 완성도 높은 공식 회의록을 배포하여 참석자들의 실행력을 극대화합니다."
      },
      kpiStats: [
        { num: "3분", label: "회의록 완성 소요시간", color: "#1967d2" },
        { num: "0건", label: "누락된 업무 지시", color: "#137333" }
      ],
      meta: [
        { label: "작성 주기", value: "수시 (미팅 직후)" },
        { label: "권장 참석자", value: "프로젝트 전원" }
      ],
      flowmap: [
        { num: "1", title: "메모 입력", desc: "키워드 중심 거친 메모", color: "#1967d2" },
        { num: "2", title: "AI 구조화", desc: "결정/보류/액션 분류", color: "#4a90e8" },
        { num: "3", title: "배포", desc: "원클릭 복사 및 전송", color: "#34a853" }
      ],
      cards: [
        { badge: "STEP 1", frontTitle: "회의 전 아젠다 공유", tags: ["사전 준비"], color: "#1967d2", backDesc: "목적이 불분명한 회의를 방지하기 위해 안건 3가지를 사전 정의합니다." },
        { badge: "STEP 2", frontTitle: "실시간 논의 포인트 기록", tags: ["키워드 메모"], color: "#4a90e8", backDesc: "완벽한 문장이 아닌 단어와 수치 중심으로 빠르게 받아적습니다." }
      ],
      steps: [
        {
          num: "1",
          title: "거친 미팅 메모를 정제된 비즈니스 회의록으로 구조화",
          tool: "Gemini 2.5 Flash",
          goal: "참석자, 안건, 결정사항, 미결 과제를 일목요연한 포맷으로 출력",
          desc: "아래 프롬프트에 오늘의 미팅 메모를 입력하세요.",
          prompt: "아래 메모를 기반으로 프로페셔널한 비즈니스 회의록을 작성해주세요.\n\n[회의 메모]:\n- 참석자: 김팀장, 이매니저, 박프로\n- 주요 내용: 신규 기능 론칭 일정을 2주 연기하기로 합의함. QA 기간 확보 목적. 마케팅팀에는 오늘 18시 전까지 사전 공지 필요.",
          tip: "발언자별 견해 차이가 있었던 항목은 [주요 쟁점] 섹션으로 분리하면 팀 내 얼라인먼트에 큰 도움이 됩니다."
        }
      ],
      checklist: ["참석자 명단 확인", "결정 사항에 대한 이견 유무 확인", "액션 아이템별 마감일자 확정"]
    },
    onboarding: {
      title: "신규 입사자를 위한 AI 업무 툴킷 마스터 가이드",
      badge: "🌱 신규 입사자 온보딩",
      description: "사내에서 사용하는 Gemini, Workspace, 자동화 매크로를 3일 만에 능숙하게 다룰 수 있도록 돕는 단계별 실습 로드맵입니다.",
      toolbar: {
        enabled: true,
        showSearch: true,
        searchPlaceholder: "온보딩 가이드 검색...",
        showSuggestChips: true,
        suggestChips: ["PARTS 프롬프트", "사내 보안", "단축키", "템플릿"],
        showCategoryTabs: true,
        categoryTabs: ["전체", "1일차: 세팅", "2일차: 실습", "3일차: 실전"],
        showPrint: true,
        showProgress: true,
        showThemeToggle: true
      },
      whyBox: {
        enabled: true,
        title: "💡 첫 주부터 100% 실전 투입",
        desc: "업무 툴 사용법을 묻느라 소모되는 시간을 줄이고 첫 주부터 자신감 있게 실무를 리드하도록 지원합니다."
      },
      kpiStats: [
        { num: "3일", label: "실무 툴 적응 완료", color: "#1967d2" },
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
  // [Decision Matrix 판별 알고리즘]
  // 조건 1: 컨테이너 지배권 (다른 요소를 Wrapper로 감싸고 자식 배치 방향 Flex/Grid/Stack 및 간격 Gap을 직접 결정하는가?)
  // 조건 2: 글로벌 파급력 (단일 블록을 넘어 섹션 전체 또는 폼 전체의 레이아웃 흐름/스타일에 영향을 주는가?)
  // 조건 3: 독립적 데이터 존재 여부 (자체 텍스트, 아이콘, 토글 상태 등 독립된 콘텐츠 속성을 가지는 단말 노드 Leaf Node인가?)
  //
  // 판정 규칙:
  // - 조건 1 또는 2가 True -> [구조 & 레이아웃 (Structure & Layout)] -> 툴바&도구모음에 노출
  // - 조건 3이 True이고 조건 1·2가 False -> [컴포넌트 & 블록 (Components & Blocks)] -> 각 권역 구조 도구의 하위에 귀속
  var TOOL_REGISTRY = {
    // ══════════════════════════════════════════════════════════
    // 1. [구조 & 레이아웃 (Structure & Layout)] (조건 1 또는 2 True)
    // ══════════════════════════════════════════════════════════
    header: {
      category: "layout",
      categoryLabel: "구조 & 레이아웃 (LAYOUT)",
      decisionCondition1: true,
      decisionCondition2: false,
      decisionCondition3: false,
      decisionReason: "조건 1 만족: Hero 래퍼 컨테이너로서 자식 요소(제목, 뱃지, 설명, 칩)의 정렬/여백/배치를 직접 지배",
      icon: "🏛️",
      name: "기본 정보 (헤더 섹션)",
      desc: "보고서의 최상단 Hero 컨테이너 프레임입니다. 전체 문서를 대표하는 타이틀, 상단 뱃지 문구, 요약 설명, 그리고 하위 블록(Why 인트로, 프로세스 플로우 바, 태그 칩)의 배치를 중앙 정렬 및 패딩으로 직접 지배합니다.",
      scenario: "모든 보고서와 워크플로우의 최상단 정체성과 목적을 정의하는 필수적인 구조 프레임입니다.",
      previewHtml: '<div style="text-align:center;padding:16px;background:#f8fafd;border:1px dashed #c6dafc;border-radius:12px;"><span style="background:#fff;border:1px solid #dadce0;padding:3px 10px;border-radius:999px;font-size:10px;font-weight:700;color:#5f6368;">✦ STAMP BADGE</span><h4 style="margin:8px 0 4px;color:#0b1a2c;">보고서 타이틀 (Hero Title)</h4><p style="margin:0;font-size:11px;color:#5f6368;">워크플로우 요약 설명이 배치되는 메인 컨테이너입니다.</p></div>',
      actionText: "헤더 영역으로 이동 & 포커스",
      actionType: "focus",
      actionKey: "header"
    },
    toolbar: {
      category: "layout",
      categoryLabel: "구조 & 레이아웃 (LAYOUT)",
      decisionCondition1: true,
      decisionCondition2: true,
      decisionCondition3: false,
      decisionReason: "조건 1 및 조건 2 만족: 상단 고정 바 래퍼 컨테이너이며, 실시간 검색/진행률/인쇄/다크모드 등 전역 레이아웃 및 테마에 글로벌 파급력을 가짐",
      icon: "🧭",
      name: "상단 시스템 툴바 (System Toolbar)",
      desc: "화면 상단에 고정(sticky)되는 시스템 네비게이션 컨테이너입니다. 실시간 검색창, 추천 검색어 칩, 카테고리 탭, 인쇄/PDF 호출, 스크롤 진행률 표시줄, 다크모드 토글 스위치를 수용합니다.",
      scenario: "독자가 긴 가이드 문서를 탐색하고 인쇄하거나 다크모드로 전환할 수 있도록 상단 컨트롤러를 제공합니다.",
      previewHtml: '<div style="background:#fff;border:1px solid #dadce0;border-radius:8px;padding:8px 12px;display:flex;justify-content:space-between;align-items:center;"><span style="font-weight:700;font-size:11px;color:#0b1a2c;">● 보고서 툴바</span><span style="font-size:10px;color:#1967d2;background:#e8f0fe;padding:2px 8px;border-radius:6px;">검색 · 인쇄 · 진행률 · 테마</span></div>',
      actionText: "시스템 툴바 접기/펼치기",
      actionType: "toggle",
      actionKey: "toolbar"
    },
    kpiStats: {
      category: "layout",
      categoryLabel: "구조 & 레이아웃 (LAYOUT)",
      decisionCondition1: true,
      decisionCondition2: false,
      decisionCondition3: false,
      decisionReason: "조건 1 만족: 4열 반응형 그리드(Grid) 컨테이너로서 자식 KPI 카드 요소들의 다열 배치와 간격을 직접 지배",
      icon: "📊",
      name: "KPI 지표 스코어보드 (KPI Grid)",
      desc: "핵심 성과 수치와 지표를 다열 반응형 그리드로 묶어 시각화하는 권역 구조입니다. 85% 절감, 1/5 단축 등 주요 정량적 성과를 강조하는 KPI 지표 카드 블록들을 내부에 배치합니다.",
      scenario: "'85% 절감', '1/5 단축', '100% 무결성' 등 정량적 성과 데이터를 경영진이나 팀원에게 즉각 전달할 때 사용합니다.",
      previewHtml: '<div style="display:flex;gap:8px;"><div style="flex:1;background:#fff;border:1px solid #dadce0;border-radius:10px;padding:10px;text-align:center;"><div style="font-size:18px;font-weight:800;color:#1967d2;">85%</div><div style="font-size:10px;color:#5f6368;">수작업 절감</div></div><div style="flex:1;background:#fff;border:1px solid #dadce0;border-radius:10px;padding:10px;text-align:center;"><div style="font-size:18px;font-weight:800;color:#137333;">1/5</div><div style="font-size:10px;color:#5f6368;">소요 시간</div></div></div>',
      actionText: "KPI 스코어보드 섹션 토글/추가",
      actionType: "toggleSection",
      actionKey: "kpiStats"
    },
    flowmap: {
      category: "layout",
      categoryLabel: "구조 & 레이아웃 (LAYOUT)",
      decisionCondition1: true,
      decisionCondition2: false,
      decisionCondition3: false,
      decisionReason: "조건 1 만족: 가로 스크롤 Flexbox 컨테이너로서 자식 단계 노드들과 연결 화살표(→)의 배치 방향 및 흐름을 직접 지배",
      icon: "🗺️",
      name: "1줄 흐름 지도 (Flow Map)",
      desc: "전체 워크플로우 진행 단계를 가로 일렬 파이프라인으로 일목요연하게 조망할 수 있는 Flexbox 권역 구조입니다. 각 단계 번호, 명칭, 핵심 요약을 담은 진행 단계 노드 블록들을 수용합니다.",
      scenario: "본격적인 단계별 실행에 앞서 독자에게 전체 프로세스 지도를 직관적으로 인지시키고자 할 때 사용합니다.",
      previewHtml: '<div style="display:flex;align-items:center;gap:6px;background:#f8fafd;padding:10px;border-radius:10px;border:1px solid #dadce0;"><span style="background:#1967d2;color:#fff;padding:2px 8px;border-radius:6px;font-size:11px;font-weight:700;">1</span><span style="font-size:11px;font-weight:600;">데이터 수집</span><span style="color:#5f6368;">→</span><span style="background:#137333;color:#fff;padding:2px 8px;border-radius:6px;font-size:11px;font-weight:700;">2</span><span style="font-size:11px;font-weight:600;">AI 요약</span></div>',
      actionText: "1줄 흐름 지도 섹션 토글/추가",
      actionType: "toggleSection",
      actionKey: "flowmap"
    },
    cards: {
      category: "layout",
      categoryLabel: "구조 & 레이아웃 (LAYOUT)",
      decisionCondition1: true,
      decisionCondition2: false,
      decisionCondition3: false,
      decisionReason: "조건 1 만족: 3열 반응형 그리드 및 3D 원근(Perspective) 래퍼로서 모듈 카드들의 다열 그리드 레이아웃을 직접 지배",
      icon: "📌",
      name: "3D 플립 카드 (핵심 모듈 그리드)",
      desc: "보고서의 핵심 모듈과 테마를 3열 카드 그리드로 정렬하고, 클릭 시 앞/뒷면이 3차원으로 회전하는 인터랙티브 권역 구조입니다. 3D 플립 모듈 카드 블록들을 수용합니다.",
      scenario: "프로젝트를 구성하는 주요 모듈별 핵심 전략과 세부 요강을 감각적인 3차원 플립 카드로 독자에게 전달할 때 사용합니다.",
      previewHtml: '<div style="background:#fff;border:1px solid #c6dafc;border-radius:10px;padding:12px;box-shadow:0 2px 6px rgba(0,0,0,.06);"><span style="font-size:10px;background:#e8f0fe;color:#1967d2;padding:2px 6px;border-radius:4px;font-weight:700;">✦ PHASE 01</span><div style="font-size:12px;font-weight:800;color:#0b1a2c;margin-top:4px;">음성 회의록 구조화</div><div style="font-size:10px;color:#5f6368;margin-top:4px;">카드를 누르면 상세 내용 ↻</div></div>',
      actionText: "3D 플립 카드 섹션 토글/추가",
      actionType: "toggleSection",
      actionKey: "cards"
    },
    steps: {
      category: "layout",
      categoryLabel: "구조 & 레이아웃 (LAYOUT)",
      decisionCondition1: true,
      decisionCondition2: false,
      decisionCondition3: false,
      decisionReason: "조건 1 만족: 수직 스택(Vertical Flex) 리스트 컨테이너로서 단계별 실행 카드들의 순서와 수직 흐름을 직접 지배",
      icon: "🛠️",
      name: "상세 실행 단계 (Steps Workflow)",
      desc: "실습과 실행의 핵심 본문이 전개되는 수직 워크플로우 컨테이너 구조입니다. 실행 단계 카드와 그 내부의 프롬프트, 실습 꿀팁, 핵심 노트, 주의 경고, URL 리소스 등 다양한 서브 블록들을 수용합니다.",
      scenario: "워크플로우의 가장 본질적인 실행 지침과 프롬프트를 단계별(Step 1, Step 2...)로 독자에게 가이드할 때 필수적으로 사용합니다.",
      previewHtml: '<div style="background:#fff;border:1px solid #dadce0;border-radius:10px;padding:12px;"><div style="display:flex;align-items:center;gap:6px;"><span style="background:#1967d2;color:#fff;width:20px;height:20px;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;">1</span><b style="font-size:12px;color:#0b1a2c;">Gemini 프롬프트 실행 단계</b></div><div style="font-size:11px;color:#5f6368;margin-top:4px;padding-left:26px;">프롬프트 복사 박스, 실습 팁, 참고 노트를 수용하는 워크플로우 컨테이너</div></div>',
      actionText: "새 실행 단계 추가",
      actionType: "addStep",
      actionKey: "steps"
    },
    checklist: {
      category: "layout",
      categoryLabel: "구조 & 레이아웃 (LAYOUT)",
      decisionCondition1: true,
      decisionCondition2: false,
      decisionCondition3: false,
      decisionReason: "조건 1 만족: 점검 항목 그룹 래퍼 카드 컨테이너로서 체크박스 리스트의 묶음 레이아웃 직접 지배",
      icon: "✅",
      name: "최종 점검 체크리스트",
      desc: "워크플로우 실행 후 누락된 요소가 없는지 확인하는 점검 그룹 카드 컨테이너 구조입니다. 인터랙티브 체크박스와 점검 텍스트를 가진 체크 항목 블록들을 수용합니다.",
      scenario: "모든 프로세스를 마친 사용자가 필수 점검 사항(보안 점검, 권한 부여, 2단계 인증 등)을 하나씩 체크하며 완료할 수 있도록 합니다.",
      previewHtml: '<div style="background:#fff;border:1px solid #dadce0;border-radius:10px;padding:10px;"><label style="display:flex;align-items:center;gap:6px;font-size:12px;"><input type="checkbox" checked><span>API 키 환경변수 세팅 완료</span></label><label style="display:flex;align-items:center;gap:6px;font-size:12px;margin-top:4px;"><input type="checkbox"><span>Google Sheets 연동 확인</span></label></div>',
      actionText: "체크리스트 섹션 토글/추가",
      actionType: "toggleSection",
      actionKey: "checklist"
    },

    // ── 서브 툴바 컨트롤러 (구조 & 레이아웃 세부 기능) ──
    search: {
      category: "layout",
      categoryLabel: "구조 & 레이아웃 (LAYOUT)",
      decisionCondition1: true,
      decisionCondition2: true,
      decisionCondition3: false,
      decisionReason: "조건 1, 2 만족: 상단 툴바 내 검색 컨테이너이며 문서 전체 인덱싱 및 앵커 점프 전역 파급력 보유",
      icon: "🔍",
      name: "실시간 검색창",
      desc: "보고서 내부의 모든 단계, 프롬프트, 지표를 실시간 자동 인덱싱하고, 검색 시 해당 위치로 스무스 스크롤 점프 및 하이라이트를 실행합니다.",
      scenario: "방대한 양의 가이드에서 원하는 특정 키워드를 즉시 찾고자 할 때 사용합니다.",
      previewHtml: '<div style="background:#fff;border:1px solid #dadce0;border-radius:20px;padding:6px 14px;display:flex;align-items:center;gap:8px;"><span style="color:#5f6368;">🔍</span><span style="color:#80868b;font-size:12px;">키워드 검색...</span></div>',
      actionText: "검색창 켜기/끄기",
      actionType: "toggle",
      actionKey: "showSearch"
    },
    suggestChips: {
      category: "layout",
      categoryLabel: "구조 & 레이아웃 (LAYOUT)",
      decisionCondition1: false,
      decisionCondition2: true,
      decisionCondition3: false,
      decisionReason: "조건 2 만족: 상단 빠른 탐색 칩으로서 보고서 필터링 전역 흐름에 영향",
      icon: "⚡",
      name: "추천 검색어 칩 (Suggest Chips)",
      desc: "홈(index.html) 스타일의 빠른 탐색 태그 칩입니다. 주요 키워드를 원클릭으로 필터링할 수 있는 추천 태그 모음을 상단에 제공합니다.",
      scenario: "보고서의 가장 핵심이 되는 키워드 3~5개를 태그로 노출하여 빠른 필터링을 지원합니다.",
      previewHtml: '<div style="display:flex;gap:6px;"><span style="font-size:11px;background:#e8f0fe;color:#1967d2;padding:3px 8px;border-radius:999px;">⚡ #마스코트</span><span style="font-size:11px;background:#e8f0fe;color:#1967d2;padding:3px 8px;border-radius:999px;">⚡ #Apps Script</span></div>',
      actionText: "추천 검색어 칩 켜기/끄기",
      actionType: "toggle",
      actionKey: "showSuggestChips"
    },
    categoryTabs: {
      category: "layout",
      categoryLabel: "구조 & 레이아웃 (LAYOUT)",
      decisionCondition1: false,
      decisionCondition2: true,
      decisionCondition3: false,
      decisionReason: "조건 2 만족: 상단 알약형 탭으로서 단계별/주제별 본문 노출 필터링 전역 흐름 지배",
      icon: "🗂️",
      name: "카테고리 네비게이션 탭",
      desc: "홈(index.html)에서 사용하는 알약(Pill)형 카테고리 전환 탭입니다. 단계별 또는 주제별로 보고서 본문을 구분하여 필터링합니다.",
      scenario: "보고서의 분량이 많아 단계별(기획, 실습, 검증)로 독자의 시선을 구분하여 집중시키고 싶을 때 적용합니다.",
      previewHtml: '<div style="display:flex;gap:6px;"><span style="font-size:12px;background:#0b1a2c;color:#fff;padding:4px 10px;border-radius:999px;">전체</span><span style="font-size:12px;background:#f1f3f4;color:#243551;padding:4px 10px;border-radius:999px;">1단계: 기획</span></div>',
      actionText: "카테고리 탭 켜기/끄기",
      actionType: "toggle",
      actionKey: "showCategoryTabs"
    },
    print: {
      category: "layout",
      categoryLabel: "구조 & 레이아웃 (LAYOUT)",
      decisionCondition1: false,
      decisionCondition2: true,
      decisionCondition3: false,
      decisionReason: "조건 2 만족: 인쇄용 CSS 미디어 쿼리 트리거로 문서 전체 레이아웃을 A4 출력용으로 변환",
      icon: "🖨️",
      name: "인쇄 및 PDF 내보내기",
      desc: "브라우저 네이티브 인쇄 대화상자(window.print)를 즉각 호출하는 액션 버튼을 상단에 배치합니다. 인쇄용 CSS가 적용되어 깔끔한 PDF로 추출됩니다.",
      scenario: "사내 보고용 PDF로 출력하거나 종이 문서로 보관할 때 사용합니다.",
      previewHtml: '<button style="background:#fff;border:1px solid #dadce0;border-radius:8px;padding:5px 10px;font-size:11px;font-weight:700;">🖨️ 인쇄 / PDF 저장</button>',
      actionText: "인쇄 버튼 켜기/끄기",
      actionType: "toggle",
      actionKey: "showPrint"
    },
    progress: {
      category: "layout",
      categoryLabel: "구조 & 레이아웃 (LAYOUT)",
      decisionCondition1: true,
      decisionCondition2: false,
      decisionCondition3: false,
      decisionReason: "조건 1 만족: 페이지 최상단 고정 진행률 바 컨테이너",
      icon: "📊",
      name: "스크롤 진행률 표시줄",
      desc: "브라우저 스크롤 위치를 0~100%로 계산하여 구글 시그니처 그라디언트로 부드럽게 채워지는 진행률 바를 생성합니다.",
      scenario: "긴 분량의 가이드 문서를 읽을 때 현재 전체 내용 중 어디까지 도달했는지 시각적인 피드백을 제공합니다.",
      previewHtml: '<div style="width:100%;height:6px;background:#eee;border-radius:3px;overflow:hidden;"><div style="width:65%;height:100%;background:linear-gradient(90deg,#4a90e8,#34a853,#ea4335);"></div></div>',
      actionText: "진행률 바 켜기/끄기",
      actionType: "toggle",
      actionKey: "showProgress"
    },
    theme: {
      category: "layout",
      categoryLabel: "구조 & 레이아웃 (LAYOUT)",
      decisionCondition1: false,
      decisionCondition2: true,
      decisionCondition3: false,
      decisionReason: "조건 2 만족: Google Workspace 다크 테마와 라이트 테마 변수를 전역적으로 전환",
      icon: "🌓",
      name: "다크모드 / 라이트모드 전역 스타일러",
      desc: "다크 테마 팔레트(--navy:#e8eaed, --paper:#202124, --bg:#121212)와 라이트 테마를 원클릭으로 토글할 수 있는 스위치를 배치합니다.",
      scenario: "야간 작업 환경이나 어두운 화면을 선호하는 실무자에게 눈의 피로도를 낮추는 시각 환경을 제공합니다.",
      previewHtml: '<button style="background:#202124;color:#e8eaed;border:1px solid #3c4043;border-radius:8px;padding:5px 10px;font-size:11px;font-weight:700;">🌓 테마 전환</button>',
      actionText: "다크모드 스위치 켜기/끄기",
      actionType: "toggle",
      actionKey: "showThemeToggle"
    },

    // ══════════════════════════════════════════════════════════
    // 2. [컴포넌트 & 블록 (Components & Blocks)] (조건 3 True, 조건 1·2 False)
    // ══════════════════════════════════════════════════════════
    whyBox: {
      category: "blocks",
      categoryLabel: "컴포넌트 & 블록 (BLOCK)",
      parentLayout: "header",
      parentLayoutName: "기본 정보 (헤더 섹션)",
      decisionCondition1: false,
      decisionCondition2: false,
      decisionCondition3: true,
      decisionReason: "조건 3 만족: 자체 제목, 설명 텍스트와 다크 네이비 그라데이션 스타일을 가진 독립 단말 노드(Leaf Node)",
      icon: "🌌",
      name: "Why 인트로 박스 (Why-Box)",
      desc: "모듈 2, 3, 4에서 핵심 도입 배경을 설명할 때 사용하는 다크 네이비 그라데이션 박스입니다. 프로젝트의 근본적인 목적(Why)을 강력하게 전달합니다.",
      scenario: "보고서 서두에 '기존 수작업 대비 왜 이 AI 자동화가 필수적인가?'에 대한 핵심 명분을 강조할 때 사용합니다.",
      previewHtml: '<div style="background:linear-gradient(135deg,#0b1a2c,#243551);color:#fff;border-radius:12px;padding:14px;"><span style="font-size:10px;color:#8ab4f8;font-weight:700;">✦ WHY WE NEED THIS</span><h4 style="margin:4px 0 6px;font-size:13px;color:#fff;">왜 이 자동화가 필요한가?</h4><p style="margin:0;font-size:11px;color:#e8eaed;line-height:1.5;">매주 6시간의 수작업을 10분으로 단축합니다.</p></div>',
      actionText: "헤더 하위에 Why 인트로 박스 추가",
      actionType: "insertBlock",
      actionKey: "whyBox"
    },
    procBox: {
      category: "blocks",
      categoryLabel: "컴포넌트 & 블록 (BLOCK)",
      parentLayout: "header",
      parentLayoutName: "기본 정보 (헤더 섹션)",
      decisionCondition1: false,
      decisionCondition2: false,
      decisionCondition3: true,
      decisionReason: "조건 3 만족: 캡슐 뱃지와 파이프라인 텍스트를 가지는 단말 노드(Leaf Node)",
      icon: "🔄",
      name: "프로세스 플로우 바 (Procbox)",
      desc: "모듈 3, 4 스타일에 적용된 네이비 캡슐형 프로세스 흐름 바입니다. 시스템 간 데이터 이동 경로(입력 ➔ 처리 ➔ 저장 ➔ 발송)를 한 줄 파이프라인으로 시각화합니다.",
      scenario: "전체 아키텍처나 단계별 실행 과정의 핵심 흐름을 한눈에 명쾌하게 보여줄 때 배치합니다.",
      previewHtml: '<div style="background:rgba(36,53,81,.9);color:#fff;border-radius:8px;padding:8px 12px;display:flex;align-items:center;gap:8px;font-size:11px;"><span style="background:#1967d2;padding:2px 6px;border-radius:999px;font-size:9px;font-weight:700;">PIPELINE</span><span>음성 수집 ➔ Gemini 요약 ➔ 구글 시트 저장</span></div>',
      actionText: "헤더 하위에 프로세스 플로우 바 추가",
      actionType: "insertBlock",
      actionKey: "procBox"
    },
    stampBadge: {
      category: "blocks",
      categoryLabel: "컴포넌트 & 블록 (BLOCK)",
      parentLayout: "header",
      parentLayoutName: "기본 정보 (헤더 섹션)",
      decisionCondition1: false,
      decisionCondition2: false,
      decisionCondition3: true,
      decisionReason: "조건 3 만족: 독립된 뱃지 텍스트와 원형 캡슐 스타일을 가지는 단말 노드(Leaf Node)",
      icon: "🏷️",
      name: "상단 뱃지 문구 (Stamp Badge)",
      desc: "보고서 제목 위에 작고 세련되게 떠 있는 원형 알약 뱃지입니다. 프로젝트의 버전, 슬로건, 공식 인증 표식을 나타냅니다.",
      scenario: "'🚀 2026 스마트 워크 플레이북', '⚡ 사내 공식 가이드' 등의 타이틀 뱃지를 설정할 때 사용합니다.",
      previewHtml: '<div style="display:inline-block;border:1px solid #dadce0;color:#5f6368;padding:4px 12px;border-radius:999px;font-weight:700;font-size:11px;background:#fff;">🚀 2026 스마트 워크 플레이북</div>',
      actionText: "상단 뱃지 입력란으로 이동",
      actionType: "focusItem",
      actionKey: "hero-badge"
    },
    kpiCard: {
      category: "blocks",
      categoryLabel: "컴포넌트 & 블록 (BLOCK)",
      parentLayout: "kpiStats",
      parentLayoutName: "KPI 지표 스코어보드",
      decisionCondition1: false,
      decisionCondition2: false,
      decisionCondition3: true,
      decisionReason: "조건 3 만족: 수치, 라벨, 액센트 색상을 가지는 독립 KPI 단말 노드(Leaf Node)",
      icon: "📊",
      name: "KPI 지표 카드 (Stat Card)",
      desc: "숫자 폰트와 감각적인 색상 액센트(블루, 그린, 레드)를 통해 업무 성과 지표나 단축 시간, 절감율을 강력하게 부각하는 단말 카드입니다.",
      scenario: "'85% 절감', '1/5 단축', '100% 무결성' 등 정량적 성과 데이터를 추가할 때 사용합니다.",
      previewHtml: '<div style="background:#fff;border:1px solid #dadce0;border-radius:8px;padding:8px 14px;text-align:center;"><div style="font-size:20px;font-weight:800;color:#1967d2;">85%</div><div style="font-size:10px;color:#5f6368;">수작업 절감율</div></div>',
      actionText: "KPI 지표 카드 추가",
      actionType: "insertBlock",
      actionKey: "kpiCard"
    },
    flowStep: {
      category: "blocks",
      categoryLabel: "컴포넌트 & 블록 (BLOCK)",
      parentLayout: "flowmap",
      parentLayoutName: "1줄 흐름 지도",
      decisionCondition1: false,
      decisionCondition2: false,
      decisionCondition3: true,
      decisionReason: "조건 3 만족: 단계 번호, 단계명, 요약 설명 및 색상을 가지는 흐름도 단말 노드(Leaf Node)",
      icon: "🗺️",
      name: "진행 단계 노드 (Flow Step)",
      desc: "1줄 흐름 지도 컨테이너 내부에서 가로 화살표로 연결되는 단일 진행 단계 노드 블록입니다.",
      scenario: "전체 파이프라인 중 하나의 특정 단계(기획, 데이터 전처리, API 연동 등)를 추가할 때 사용합니다.",
      previewHtml: '<div style="display:inline-flex;align-items:center;gap:6px;background:#f8fafd;border:1px solid #dadce0;border-radius:8px;padding:6px 10px;"><span style="background:#1967d2;color:#fff;padding:2px 6px;border-radius:4px;font-size:10px;font-weight:700;">3</span><span style="font-size:11px;font-weight:700;">자동 보고서 생성</span></div>',
      actionText: "진행 단계 노드 추가",
      actionType: "insertBlock",
      actionKey: "flowStep"
    },
    flipCard: {
      category: "blocks",
      categoryLabel: "컴포넌트 & 블록 (BLOCK)",
      parentLayout: "cards",
      parentLayoutName: "3D 플립 카드",
      decisionCondition1: false,
      decisionCondition2: false,
      decisionCondition3: true,
      decisionReason: "조건 3 만족: 앞면 타이틀, 배지, 태그 및 뒷면 상세 설명을 가지는 3D 카드 단말 노드(Leaf Node)",
      icon: "📌",
      name: "3D 플립 모듈 카드 (Flip Card)",
      desc: "앞면에는 핵심 타이틀과 태그 칩이 보이고, 클릭 시 부드럽게 180도 회전하여 뒷면의 세부 실행 계획이 나타나는 단말 카드입니다.",
      scenario: "각 모듈별 핵심 지침을 압축적으로 보여주고 상호작용 재미를 부여할 때 사용합니다.",
      previewHtml: '<div style="background:#fff;border:1px solid #dadce0;border-radius:8px;padding:10px;"><span style="font-size:9px;color:#1967d2;font-weight:700;">✦ MODULE</span><div style="font-size:12px;font-weight:700;margin:3px 0;">회의록 3초 구조화</div><div style="font-size:10px;color:#70757a;">카드를 누르면 상세 내용 ↻</div></div>',
      actionText: "3D 플립 카드 추가",
      actionType: "insertBlock",
      actionKey: "flipCard"
    },
    stepCard: {
      category: "blocks",
      categoryLabel: "컴포넌트 & 블록 (BLOCK)",
      parentLayout: "steps",
      parentLayoutName: "상세 실행 단계",
      decisionCondition1: false,
      decisionCondition2: false,
      decisionCondition3: true,
      decisionReason: "조건 3 만족: 번호, 제목, 도구 태그, 목표 및 설명 텍스트를 가지는 단계 단말 노드(Leaf Node)",
      icon: "🛠️",
      name: "새 실행 단계 카드 (Step Card)",
      desc: "상세 실행 단계 컨테이너 내부에 추가되는 독립적인 하나의 스텝 카드입니다. 내부 서브 블록(프롬프트, 팁, 노트, 경고, URL)을 담을 수 있습니다.",
      scenario: "워크플로우에 새로운 세부 단계(Step)를 추가할 때 사용합니다.",
      previewHtml: '<div style="background:#fff;border:1px solid #dadce0;border-radius:8px;padding:10px;"><b style="font-size:12px;color:#0b1a2c;">Step 4: 신규 자동화 파이프라인 배포</b><p style="margin:2px 0 0;font-size:11px;color:#5f6368;">실행 목표와 도구를 포함하는 새 단계 카드</p></div>',
      actionText: "새 실행 단계 카드 추가",
      actionType: "insertBlock",
      actionKey: "stepCard"
    },
    prompt: {
      category: "blocks",
      categoryLabel: "컴포넌트 & 블록 (BLOCK)",
      parentLayout: "steps",
      parentLayoutName: "상세 실행 단계 (스텝 내부)",
      decisionCondition1: false,
      decisionCondition2: false,
      decisionCondition3: true,
      decisionReason: "조건 3 만족: 프롬프트 내용과 원클릭 복사 이벤트를 가진 시그니처 단말 노드(Leaf Node)",
      icon: "📋",
      name: "Gemini 프롬프트 카드 (Prompt Box)",
      desc: "모듈 2, 4에서 실습 프롬프트를 배포할 때 사용하는 시그니처 카드입니다. 파스텔 톤 그라데이션과 '✅ 복사됨' 피드백을 주는 원클릭 복사 버튼이 포함되어 있습니다.",
      scenario: "사용자가 복사해서 바로 Gemini 웹 또는 API에 붙여넣을 수 있는 고품질 프롬프트를 제공할 때 필수적으로 사용합니다.",
      previewHtml: '<div style="background:linear-gradient(135deg,#e9f2ff,#e6f8ef);border:2px dashed #4a90e8;border-radius:8px;padding:8px;"><div style="display:flex;justify-content:space-between;margin-bottom:4px;"><span style="font-size:10px;font-weight:700;color:#1967d2;">✨ Gemini Prompt</span><span style="font-size:9px;background:#fff;border:1px solid #1967d2;color:#1967d2;padding:1px 5px;border-radius:4px;font-weight:700;">복사</span></div><div style="font-size:10px;color:#202124;font-family:monospace;">당신은 전문 수석 비서입니다...</div></div>',
      actionText: "스텝에 Gemini 프롬프트 박스 추가",
      actionType: "insertBlock",
      actionKey: "prompt"
    },
    tip: {
      category: "blocks",
      categoryLabel: "컴포넌트 & 블록 (BLOCK)",
      parentLayout: "steps",
      parentLayoutName: "상세 실행 단계 (스텝 내부)",
      decisionCondition1: false,
      decisionCondition2: false,
      decisionCondition3: true,
      decisionReason: "조건 3 만족: 토글 접힘 상태와 팁 텍스트를 가진 아코디언 단말 노드(Leaf Node)",
      icon: "💡",
      name: "접이식 팁 아코디언 (Tip Accordion)",
      desc: "모듈 3, 4 스타일에 적용된 details/summary 기반 아코디언 카드입니다. 본문 흐름을 방해하지 않으면서도 필요한 사람만 눌러서 심화 노하우를 확인할 수 있습니다.",
      scenario: "필수적인 내용은 아니지만 알아두면 매우 유용한 고급 설정 방법, 주의할 점, 단축 팁을 제공할 때 사용합니다.",
      previewHtml: '<div style="background:#f8f9fa;border:1px solid #c6dafc;border-radius:6px;padding:6px 10px;font-size:11px;font-weight:600;color:#0b1a2c;">💡 실습 꿀팁 및 권장 가이드 (펼치기 ▸)</div>',
      actionText: "스텝에 접이식 팁 아코디언 추가",
      actionType: "insertBlock",
      actionKey: "tip"
    },
    note: {
      category: "blocks",
      categoryLabel: "컴포넌트 & 블록 (BLOCK)",
      parentLayout: "steps",
      parentLayoutName: "상세 실행 단계 (스텝 내부)",
      decisionCondition1: false,
      decisionCondition2: false,
      decisionCondition3: true,
      decisionReason: "조건 3 만족: 블루 액센트 보더와 안내 문구를 가진 콜아웃 단말 노드(Leaf Node)",
      icon: "ℹ️",
      name: "핵심 안내 노트 (Note Callout)",
      desc: "모듈 2, 3, 4에서 공통으로 쓰이는 왼쪽 파란색 액센트 보더(border-left: 4px solid #4a90e8) 카드입니다. 중요한 참고 데이터 규격이나 권장 전제 조건을 명료하게 안내합니다.",
      scenario: "API 호출 시 필수 파라미터 규칙이나 데이터 정합성 주의점을 환기시킬 때 사용합니다.",
      previewHtml: '<div style="background:#f8fafd;border-left:4px solid #4a90e8;border-radius:0 6px 6px 0;padding:6px 10px;font-size:11px;color:#243551;"><b>ℹ️ 핵심 참고:</b> JSON 응답의 타임스탬프는 ISO-8601 규격을 권장합니다.</div>',
      actionText: "스텝에 핵심 안내 노트 추가",
      actionType: "insertBlock",
      actionKey: "note"
    },
    warn: {
      category: "blocks",
      categoryLabel: "컴포넌트 & 블록 (BLOCK)",
      parentLayout: "steps",
      parentLayoutName: "상세 실행 단계 (스텝 내부)",
      decisionCondition1: false,
      decisionCondition2: false,
      decisionCondition3: true,
      decisionReason: "조건 3 만족: 레드 액센트 보더와 위험 경고 문구를 가진 콜아웃 단말 노드(Leaf Node)",
      icon: "⚠️",
      name: "주의 경고 박스 (Warning Box)",
      desc: "모듈 3, 4에 적용된 레드/테라코타 왼쪽 액센트 보더(border-left: 4px solid #e05555) 경고 박스입니다. 치명적인 오류나 보안 사고를 방지할 수 있도록 강력한 시각적 주의를 환기합니다.",
      scenario: "API 시크릿 키 유출 주의, 예산/결제 수치 수기 검증, 보안 권한 설정 등 위험 요소를 경고할 때 사용합니다.",
      previewHtml: '<div style="background:#fff5f3;border-left:4px solid #e05555;border-radius:0 6px 6px 0;padding:6px 10px;font-size:11px;color:#7a2020;"><b>⚠️ 주의사항:</b> 공용 저장소에 API 키를 절대 커밋하지 마세요.</div>',
      actionText: "스텝에 주의 경고 박스 추가",
      actionType: "insertBlock",
      actionKey: "warn"
    },
    urlbox: {
      category: "blocks",
      categoryLabel: "컴포넌트 & 블록 (BLOCK)",
      parentLayout: "steps",
      parentLayoutName: "상세 실행 단계 (스텝 내부)",
      decisionCondition1: false,
      decisionCondition2: false,
      decisionCondition3: true,
      decisionReason: "조건 3 만족: 외부 URL 및 새창 이동 버튼을 가진 리소스 단말 노드(Leaf Node)",
      icon: "🌐",
      name: "URL 리소스 상자 (Resource Box)",
      desc: "모듈 2, 3에서 구글 시트 템플릿, Apps Script 콘솔, 대시보드 링크를 제공할 때 사용하는 전용 상자입니다. 원클릭 '열기 ↗' 새창 이동 버튼이 탑재되어 있습니다.",
      scenario: "사용자가 바로 복사하거나 열어볼 수 있는 외부 공식 문서, 깃허브 코드, 스프레드시트 사본 링크를 제공할 때 사용합니다.",
      previewHtml: '<div style="background:linear-gradient(135deg,#e6f8ef,#f1f3f4);border:1px solid #dadce0;border-radius:8px;padding:6px 10px;display:flex;justify-content:space-between;align-items:center;"><div style="font-size:11px;"><b style="color:#137333;">🔗 관련 리소스</b><div style="font-size:9px;color:#5f6368;">https://docs.google.com/...</div></div><span style="background:#fff;border:1px solid #c6dafc;padding:2px 6px;border-radius:4px;font-size:10px;color:#1967d2;font-weight:700;">열기 ↗</span></div>',
      actionText: "스텝에 URL 리소스 상자 추가",
      actionType: "insertBlock",
      actionKey: "urlbox"
    },
    goal: {
      category: "blocks",
      categoryLabel: "컴포넌트 & 블록 (BLOCK)",
      parentLayout: "steps",
      parentLayoutName: "상세 실행 단계 (스텝 내부)",
      decisionCondition1: false,
      decisionCondition2: false,
      decisionCondition3: true,
      decisionReason: "조건 3 만족: 단계별 목표 텍스트를 가진 단말 노드(Leaf Node)",
      icon: "🎯",
      name: "실행 목표 (Goal Callout)",
      desc: "각 단계의 최상단에 배치되어 해당 단계를 거쳤을 때 달성해야 하는 핵심 산출물이나 마일스톤을 명료하게 정의합니다.",
      scenario: "단계별 핵심 지향점을 한 줄로 명확히 인지시키고자 할 때 사용합니다.",
      previewHtml: '<div style="background:rgba(25,103,210,.06);border:1px solid rgba(25,103,210,.18);border-radius:6px;padding:6px 10px;font-size:11px;color:#1967d2;font-weight:600;">🎯 목표: 정형화된 JSON 데이터 스키마 즉시 추출</div>',
      actionText: "스텝에 실행 목표 추가",
      actionType: "insertBlock",
      actionKey: "goal"
    },
    checkItem: {
      category: "blocks",
      categoryLabel: "컴포넌트 & 블록 (BLOCK)",
      parentLayout: "checklist",
      parentLayoutName: "최종 점검 체크리스트",
      decisionCondition1: false,
      decisionCondition2: false,
      decisionCondition3: true,
      decisionReason: "조건 3 만족: 체크박스 체크 여부와 텍스트를 가진 체크리스트 단말 노드(Leaf Node)",
      icon: "✅",
      name: "체크리스트 점검 항목 (Check Item)",
      desc: "최종 점검 체크리스트 컨테이너 내부에 추가되는 개별 점검 항목 블록입니다.",
      scenario: "프로세스 완료 후 검수해야 할 세부 점검 사항을 하나 더 추가할 때 사용합니다.",
      previewHtml: '<label style="display:flex;align-items:center;gap:6px;font-size:11px;"><input type="checkbox" checked><span>사내 보안 가이드라인 준수 확인</span></label>',
      actionText: "체크리스트 점검 항목 추가",
      actionType: "insertBlock",
      actionKey: "checkItem"
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
      savedGroup.label = '💾 내가 저장한 작업 (' + savedKeys.length + '개)';
      savedKeys.forEach(function(k) {
        var opt = document.createElement('option');
        opt.value = 'saved:' + k;
        opt.textContent = '📂 ' + (saved[k].name || k);
        savedGroup.appendChild(opt);
      });
      select.appendChild(savedGroup);
    }

    var presetGroup = document.createElement('optgroup');
    presetGroup.label = '🌟 기본 표준 템플릿';
    presetGroup.innerHTML = 
      '<option value="preset:weekly">🚀 주간 업무 자동화 보고서 (기본)</option>' +
      '<option value="preset:meeting">⚡ 스마트 회의록 &amp; 액션 플래너</option>' +
      '<option value="preset:onboarding">🌱 신규 입사자 AI 툴킷 온보딩</option>';
    select.appendChild(presetGroup);

    if (selectedKey) {
      select.value = selectedKey;
    } else if (currentLoadedWorkKey) {
      select.value = 'saved:' + currentLoadedWorkKey;
    } else {
      select.value = 'preset:weekly';
    }

    var delBtn = document.getElementById('deleteWorkBtn');
    if (select.value.startsWith('saved:')) {
      delBtn.style.display = 'inline-flex';
    } else {
      delBtn.style.display = 'none';
    }
  }

  // ── 툴바 접기/펼치기 ──
  window.toggleToolbarSection = function(){
    var card = document.getElementById('toolbarSectionCard');
    card.classList.toggle('collapsed');
    var hint = document.getElementById('tbToggleHint');
    if(hint){
      hint.textContent = card.classList.contains('collapsed') ? '펼치기' : '접기';
    }
  };

  // ── 툴바 피처 토글 ──
  window.toggleToolbarFeature = function(key){
    currentData.toolbar = currentData.toolbar || {};
    currentData.toolbar[key] = !currentData.toolbar[key];
    syncToolbarButtons();
    updateLivePreview();
    document.getElementById('jsonEditor').value = JSON.stringify(currentData, null, 2);
  };

  function syncToolbarButtons(){
    var tb = currentData.toolbar || {};
    var count = 0;
    var features = [
      { key: 'showSearch', btnId: 'btnToolSearch', pillId: 'pillToolSearch', chipId: 'chipToolSearch' },
      { key: 'showSuggestChips', btnId: 'btnToolChips', pillId: 'pillToolChips', chipId: 'chipToolChips' },
      { key: 'showCategoryTabs', btnId: 'btnToolTabs', pillId: 'pillToolTabs', chipId: 'chipToolTabs' },
      { key: 'showPrint', btnId: 'btnToolPrint', pillId: 'pillToolPrint', chipId: 'chipToolPrint' },
      { key: 'showProgress', btnId: 'btnToolProgress', pillId: 'pillToolProgress', chipId: 'chipToolProgress' },
      { key: 'showThemeToggle', btnId: 'btnToolTheme', pillId: 'pillToolTheme', chipId: 'chipToolTheme' }
    ];

    features.forEach(function(f){
      var on = !!tb[f.key];
      if(on) count++;
      var btn = document.getElementById(f.btnId);
      var pill = document.getElementById(f.pillId);
      var chip = document.getElementById(f.chipId);
      if(btn){
        btn.classList.toggle('active', on);
      }
      if(pill){
        pill.textContent = on ? 'ON' : 'OFF';
      }
      if(chip){
        chip.classList.toggle('active', on);
        chip.textContent = (f.key === 'showSearch' ? '🔍 검색창' : f.key === 'showSuggestChips' ? '⚡ 추천 칩' : f.key === 'showCategoryTabs' ? '🗂️ 탭 바' : f.key === 'showPrint' ? '🖨️ 인쇄' : f.key === 'showProgress' ? '📊 진행률' : '🌓 다크모드') + ' (' + (on ? 'ON' : 'OFF') + ')';
      }
    });

    var badge = document.getElementById('tbActiveCountBadge');
    if(badge) badge.textContent = count + '개 활성';

    var chipsBox = document.getElementById('boxSuggestChipsInput');
    if(chipsBox) chipsBox.style.display = tb.showSuggestChips ? 'block' : 'none';
    var tabsBox = document.getElementById('boxCategoryTabsInput');
    if(tabsBox) tabsBox.style.display = tb.showCategoryTabs ? 'block' : 'none';
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

  // ── 구조&레이아웃 도구 포커스 / 토글 ──
  window.focusLayoutSection = function(key){
    if(key === 'header'){
      var el = document.querySelector('[data-editor-id="header"]');
      if(el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      var inp = document.getElementById('fTitle');
      if(inp) inp.focus();
    } else if(key === 'toolbar'){
      var sc = document.getElementById('toolbarSectionCard');
      if(sc && sc.classList.contains('collapsed')){
        toggleToolbarSection();
      }
      var sub = document.getElementById('subToolbarSettings');
      if(sub) sub.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else if(key === 'kpiStats'){
      if(!currentData.kpiStats || !currentData.kpiStats.length){
        currentData.kpiStats = [
          { num: "85%", label: "수작업 절감", color: "#1967d2" },
          { num: "1/5", label: "소요 시간 단축", color: "#137333" }
        ];
        syncFormFromData();
        showToast('✨ [KPI 지표 스코어보드] 섹션이 활성화되었습니다!');
      }
      var el = document.getElementById('kpiStatsEditorContainer');
      if(el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else if(key === 'flowmap'){
      if(!currentData.flowmap || !currentData.flowmap.length){
        currentData.flowmap = [
          { num: "1", title: "준비", desc: "도구 세팅", color: "#1967d2" },
          { num: "2", title: "실행", desc: "자동화 실행", color: "#137333" }
        ];
        syncFormFromData();
        showToast('✨ [1줄 흐름 지도] 섹션이 활성화되었습니다!');
      }
      var el = document.getElementById('flowItemsContainer');
      if(el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else if(key === 'cards'){
      if(!currentData.cards || !currentData.cards.length){
        currentData.cards = [
          { badge: "MODULE", frontTitle: "핵심 모듈 1", tags: ["기획"], color: "#1967d2", backDesc: "상세 계획입니다." }
        ];
        syncFormFromData();
        showToast('✨ [3D 플립 카드] 섹션이 활성화되었습니다!');
      }
      var el = document.getElementById('cardItemsContainer');
      if(el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else if(key === 'steps'){
      var el = document.getElementById('stepItemsContainer');
      if(el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else if(key === 'checklist'){
      if(!currentData.checklist || !currentData.checklist.length){
        currentData.checklist = ["첫 번째 점검 항목", "두 번째 점검 항목"];
        syncFormFromData();
        showToast('✨ [체크리스트] 섹션이 활성화되었습니다!');
      }
      var el = document.getElementById('checkItemsContainer');
      if(el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  // ── 도구 설명 & 적용 예시 모달 (요구사항 2 + Decision Matrix 판정 표시) ──
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

    // Decision Matrix 판정 정보 바인딩
    var decisionHtml = 
      '<div style="display:grid;grid-template-columns:repeat(3, 1fr);gap:6px;margin-bottom:8px;text-align:center;">' +
        '<div style="background:#fff;padding:6px;border-radius:6px;border:1px solid #e1ecfa;">' +
          '<div style="font-size:10px;color:#5f6368;font-weight:700;">조건 1. 컨테이너 지배권</div>' +
          '<div style="font-size:12px;font-weight:800;color:' + (tool.decisionCondition1 ? '#1967d2' : '#70757a') + ';">' + (tool.decisionCondition1 ? '✅ True (충족)' : '❌ False') + '</div>' +
        '</div>' +
        '<div style="background:#fff;padding:6px;border-radius:6px;border:1px solid #e1ecfa;">' +
          '<div style="font-size:10px;color:#5f6368;font-weight:700;">조건 2. 글로벌 파급력</div>' +
          '<div style="font-size:12px;font-weight:800;color:' + (tool.decisionCondition2 ? '#1967d2' : '#70757a') + ';">' + (tool.decisionCondition2 ? '✅ True (충족)' : '❌ False') + '</div>' +
        '</div>' +
        '<div style="background:#fff;padding:6px;border-radius:6px;border:1px solid #e1ecfa;">' +
          '<div style="font-size:10px;color:#5f6368;font-weight:700;">조건 3. 독립 단말 데이터</div>' +
          '<div style="font-size:12px;font-weight:800;color:' + (tool.decisionCondition3 ? '#7627bb' : '#70757a') + ';">' + (tool.decisionCondition3 ? '✅ True (Leaf Node)' : '❌ False') + '</div>' +
        '</div>' +
      '</div>' +
      '<div style="font-size:.82rem;color:#4a5056;line-height:1.5;">' +
        '<b>판정 사유:</b> ' + (tool.decisionReason || '') +
        (tool.parentLayoutName ? '<br><b>소속 권역:</b> ' + tool.parentLayoutName + ' 하위' : '') +
      '</div>';
    document.getElementById('toolHelpDecisionDetails').innerHTML = decisionHtml;

    document.getElementById('toolHelpDesc').textContent = tool.desc;
    document.getElementById('toolHelpScenario').textContent = tool.scenario;
    document.getElementById('toolHelpPreviewWrap').innerHTML = tool.previewHtml || '<p style="color:#5f6368;">예시 미리보기 준비 중</p>';

    var actionBtn = document.getElementById('toolHelpActionBtn');
    actionBtn.textContent = tool.actionText;
    actionBtn.onclick = function(){
      closeToolHelpModal();
      if(tool.actionType === 'toggle'){
        toggleToolbarFeature(tool.actionKey);
      } else if(tool.actionType === 'focus'){
        focusLayoutSection(tool.actionKey);
      } else if(tool.actionType === 'toggleSection'){
        focusLayoutSection(tool.actionKey);
      } else if(tool.actionType === 'addStep'){
        addStepItem();
      } else if(tool.actionType === 'insertBlock'){
        insertBlockToLayout(tool.parentLayout, tool.actionKey);
      } else if(tool.actionType === 'focusItem'){
        var target = document.querySelector('[data-editor-id="' + tool.actionKey + '"]');
        if(target){ target.scrollIntoView({ behavior:'smooth', block:'center' }); }
      }
    };

    document.getElementById('toolHelpModal').style.display = 'flex';
  };

  window.closeToolHelpModal = function(){
    document.getElementById('toolHelpModal').style.display = 'none';
  };

  // ── 컴포넌트 & 블록 선택 팝오버 열기 (요구사항 2: + 버튼 신설) ──
  window.openBlockPicker = function(e, layoutKey, stepIdx){
    if(e){
      e.stopPropagation();
      e.preventDefault();
    }
    var pop = document.getElementById('blockPickerPopover');
    if(!pop) return;

    // 이미 열려있는 경우 토글 닫기
    if(pop.style.display === 'flex' && pop.getAttribute('data-active-layout') === layoutKey && pop.getAttribute('data-active-step') === String(stepIdx)){
      pop.style.display = 'none';
      return;
    }

    var blocks = [];
    var layoutTitle = '';
    if(layoutKey === 'header'){
      layoutTitle = '🏛️ 기본 정보 (헤더 섹션)';
      blocks = ['whyBox', 'procBox', 'suggestChips', 'stampBadge'];
    } else if(layoutKey === 'kpiStats'){
      layoutTitle = '📊 KPI 지표 스코어보드';
      blocks = ['kpiCard'];
    } else if(layoutKey === 'flowmap'){
      layoutTitle = '🗺️ 1줄 흐름 지도 (Flow Map)';
      blocks = ['flowStep'];
    } else if(layoutKey === 'cards'){
      layoutTitle = '📌 3D 플립 카드 (핵심 모듈)';
      blocks = ['flipCard'];
    } else if(layoutKey === 'steps'){
      layoutTitle = '🛠️ 상세 실행 단계 (Steps)';
      blocks = ['stepCard'];
    } else if(layoutKey === 'step-sub'){
      layoutTitle = '🛠️ Step #' + (Number(stepIdx)+1) + ' 내부 서브 블록';
      blocks = ['prompt', 'tip', 'note', 'warn', 'urlbox', 'goal'];
    } else if(layoutKey === 'checklist'){
      layoutTitle = '✅ 최종 점검 체크리스트';
      blocks = ['checkItem'];
    }

    var html = '<div class="picker-header">' +
      '<div class="picker-title">' + layoutTitle + '</div>' +
      '<div class="picker-desc">추가할 [컴포넌트 &amp; 블록]을 선택하세요.</div>' +
      '</div>' +
      '<div style="display:flex;flex-direction:column;gap:5px;max-height:300px;overflow-y:auto;">';

    blocks.forEach(function(bKey){
      var tool = TOOL_REGISTRY[bKey];
      if(!tool) return;
      html += '<div class="picker-item" onclick="insertBlockToLayout(\\'' + layoutKey + '\\', \\'' + bKey + '\\', ' + (stepIdx !== undefined ? stepIdx : 'null') + ')">' +
        '<div class="picker-item-left">' +
          '<span class="picker-item-icon">' + tool.icon + '</span>' +
          '<div class="picker-item-text">' +
            '<span class="picker-item-name">' + tool.name + '</span>' +
            '<span class="picker-item-sub">' + tool.desc.substring(0, 36) + '...</span>' +
          '</div>' +
        '</div>' +
        '<button class="picker-help-btn" onclick="openToolHelpModal(event, \\'' + bKey + '\\')" title="도구 설명 및 적용 예시 보기">?</button>' +
      '</div>';
    });
    html += '</div>';

    pop.innerHTML = html;
    pop.setAttribute('data-active-layout', layoutKey);
    pop.setAttribute('data-active-step', stepIdx !== undefined ? String(stepIdx) : '');

    var btn = e.currentTarget || e.target;
    var rect = btn.getBoundingClientRect();
    pop.style.display = 'flex';
    
    var top = rect.bottom + window.scrollY + 6;
    var left = rect.left + window.scrollX;
    
    if(left + 340 > window.innerWidth){
      left = Math.max(10, window.innerWidth - 350);
    }
    pop.style.top = top + 'px';
    pop.style.left = left + 'px';
  };

  // ── 블록을 권역 구조에 추가 실행 ──
  window.insertBlockToLayout = function(layoutKey, blockType, stepIdx){
    var pop = document.getElementById('blockPickerPopover');
    if(pop) pop.style.display = 'none';

    if(blockType === 'whyBox'){
      currentData.whyBox = currentData.whyBox || {
        enabled: true,
        title: "💡 왜 이 워크플로우를 도입해야 하는가?",
        desc: "기존 수작업 대비 업무 소요 시간을 80% 단축하고 휴먼 에러를 원천 차단하는 Google 워크스페이스 기반 실전 자동화 아키텍처입니다."
      };
      currentData.whyBox.enabled = true;
      syncFormFromData();
      showToast('✨ [Why 인트로 박스]가 헤더 하위에 추가되었습니다!');
      var target = document.querySelector('[data-editor-id="whyBox"]');
      if(target) target.scrollIntoView({ behavior:'smooth', block:'center' });
    } else if(blockType === 'procBox'){
      currentData.procBox = currentData.procBox || {
        enabled: true,
        badge: "AUTOMATION PIPELINE",
        title: "데이터 수집 ➔ Gemini 프롬프트 처리 ➔ 스프레드시트 기록 ➔ 자동 발송"
      };
      currentData.procBox.enabled = true;
      syncFormFromData();
      showToast('✨ [프로세스 플로우 바]가 헤더 하위에 추가되었습니다!');
      var target = document.querySelector('[data-editor-id="procBox"]');
      if(target) target.scrollIntoView({ behavior:'smooth', block:'center' });
    } else if(blockType === 'suggestChips'){
      toggleToolbarFeature('showSuggestChips');
      showToast('✨ [추천 검색어 칩] 설정이 활성화되었습니다!');
      var inp = document.getElementById('tbSuggestChips');
      if(inp){ inp.focus(); inp.scrollIntoView({ behavior:'smooth', block:'center' }); }
    } else if(blockType === 'stampBadge'){
      var inp = document.getElementById('fBadge');
      if(inp){ inp.focus(); inp.scrollIntoView({ behavior:'smooth', block:'center' }); }
      showToast('✨ [상단 뱃지 문구] 입력란으로 포커스되었습니다!');
    } else if(blockType === 'kpiCard'){
      currentData.kpiStats = currentData.kpiStats || [];
      currentData.kpiStats.push({ "num": "99%", "label": "신규 성과 지표", "color": "#1967d2" });
      syncFormFromData();
      showToast('✨ [KPI 지표 카드]가 추가되었습니다!');
      var target = document.querySelector('[data-editor-id="kpi-' + (currentData.kpiStats.length - 1) + '"]');
      if(target) target.scrollIntoView({ behavior:'smooth', block:'center' });
    } else if(blockType === 'flowStep'){
      currentData.flowmap = currentData.flowmap || [];
      currentData.flowmap.push({
        num: String(currentData.flowmap.length + 1),
        title: "새 진행 단계",
        desc: "단계 설명 및 산출물",
        color: "#1967d2"
      });
      syncFormFromData();
      showToast('✨ [1줄 흐름 지도 단계 노드]가 추가되었습니다!');
      var target = document.querySelector('[data-editor-id="flow-' + (currentData.flowmap.length - 1) + '"]');
      if(target) target.scrollIntoView({ behavior:'smooth', block:'center' });
    } else if(blockType === 'flipCard'){
      currentData.cards = currentData.cards || [];
      currentData.cards.push({
        badge: "MODULE",
        frontTitle: "신규 모듈 카드",
        tags: ["태그1", "태그2"],
        color: "#1967d2",
        backDesc: "카드를 뒤집었을 때 표시되는 상세 계획 및 지침입니다."
      });
      syncFormFromData();
      showToast('✨ [3D 플립 모듈 카드]가 추가되었습니다!');
      var target = document.querySelector('[data-editor-id="card-' + (currentData.cards.length - 1) + '"]');
      if(target) target.scrollIntoView({ behavior:'smooth', block:'center' });
    } else if(blockType === 'stepCard'){
      currentData.steps = currentData.steps || [];
      currentData.steps.push({
        num: String(currentData.steps.length + 1),
        title: "새로운 실행 단계",
        tool: "Gemini",
        goal: "실행 목표를 입력하세요",
        desc: "단계별 세부 실행 가이드라인입니다."
      });
      syncFormFromData();
      showToast('✨ [새 실행 단계 카드]가 워크플로우에 추가되었습니다!');
      var target = document.querySelector('[data-editor-id="step-' + (currentData.steps.length - 1) + '"]');
      if(target) target.scrollIntoView({ behavior:'smooth', block:'center' });
    } else if(blockType === 'prompt' && stepIdx !== null && stepIdx !== undefined){
      currentData.steps[stepIdx].prompt = currentData.steps[stepIdx].prompt || "당신은 AI 업무 자동화 전문가입니다. 아래 과제를 단계별로 해결하는 마스터플랜을 작성해주세요.";
      syncFormFromData();
      showToast('✨ Step #' + (Number(stepIdx)+1) + '에 [Gemini 프롬프트 박스]가 추가되었습니다!');
      var target = document.querySelector('[data-editor-id="step-' + stepIdx + '-prompt"]');
      if(target) target.scrollIntoView({ behavior:'smooth', block:'center' });
    } else if(blockType === 'tip' && stepIdx !== null && stepIdx !== undefined){
      currentData.steps[stepIdx].tip = currentData.steps[stepIdx].tip || "실무 팁: 트리거 시간 간격을 5분 이상으로 설정하면 할당량 초과(Quota Error)를 방지할 수 있습니다.";
      syncFormFromData();
      showToast('✨ Step #' + (Number(stepIdx)+1) + '에 [접이식 팁 아코디언]이 추가되었습니다!');
      var target = document.querySelector('[data-editor-id="step-' + stepIdx + '-tip"]');
      if(target) target.scrollIntoView({ behavior:'smooth', block:'center' });
    } else if(blockType === 'note' && stepIdx !== null && stepIdx !== undefined){
      currentData.steps[stepIdx].note = currentData.steps[stepIdx].note || "핵심 참고: API 호출 시 JSON 응답의 타임스탬프 필드는 UTC 기준 ISO-8601 형식을 준수해야 합니다.";
      syncFormFromData();
      showToast('✨ Step #' + (Number(stepIdx)+1) + '에 [핵심 안내 노트]가 추가되었습니다!');
      var target = document.querySelector('[data-editor-id="step-' + stepIdx + '-note"]');
      if(target) target.scrollIntoView({ behavior:'smooth', block:'center' });
    } else if(blockType === 'warn' && stepIdx !== null && stepIdx !== undefined){
      currentData.steps[stepIdx].warn = currentData.steps[stepIdx].warn || "주의사항: 공용 저장소(GitHub Public)에 API 시크릿 키를 절대 커밋하지 마세요.";
      syncFormFromData();
      showToast('✨ Step #' + (Number(stepIdx)+1) + '에 [주의 경고 박스]가 추가되었습니다!');
      var target = document.querySelector('[data-editor-id="step-' + stepIdx + '-warn"]');
      if(target) target.scrollIntoView({ behavior:'smooth', block:'center' });
    } else if(blockType === 'urlbox' && stepIdx !== null && stepIdx !== undefined){
      currentData.steps[stepIdx].url = currentData.steps[stepIdx].url || "https://docs.google.com/spreadsheets/";
      syncFormFromData();
      showToast('✨ Step #' + (Number(stepIdx)+1) + '에 [URL 리소스 상자]가 추가되었습니다!');
      var target = document.querySelector('[data-editor-id="step-' + stepIdx + '-url"]');
      if(target) target.scrollIntoView({ behavior:'smooth', block:'center' });
    } else if(blockType === 'goal' && stepIdx !== null && stepIdx !== undefined){
      currentData.steps[stepIdx].goal = currentData.steps[stepIdx].goal || "목표: 신속하고 정확한 업무 자동화 구현";
      syncFormFromData();
      showToast('✨ Step #' + (Number(stepIdx)+1) + '에 [실행 목표]가 설정되었습니다!');
      var target = document.querySelector('[data-editor-id="step-' + stepIdx + '-goal"]');
      if(target) target.scrollIntoView({ behavior:'smooth', block:'center' });
    } else if(blockType === 'checkItem'){
      currentData.checklist = currentData.checklist || [];
      currentData.checklist.push("새 점검 항목 내용 확인");
      syncFormFromData();
      showToast('✨ [체크리스트 점검 항목]이 추가되었습니다!');
      var target = document.querySelector('[data-editor-id="check-' + (currentData.checklist.length - 1) + '"]');
      if(target) target.scrollIntoView({ behavior:'smooth', block:'center' });
    }
  };

  // 팝오버 외부 클릭 시 닫기
  document.addEventListener('click', function(e){
    var pop = document.getElementById('blockPickerPopover');
    if(pop && !pop.contains(e.target) && !e.target.closest('.add-block-btn') && !e.target.closest('.dock-add-btn') && !e.target.closest('.add-subblock-btn')){
      pop.style.display = 'none';
    }
  });

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
  // isExport === true: 내려받기/복사용 순수 시맨틱 HTML (하이라이트 및 인스펙터 스크립트 100% 제거)
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
    buf.push('.tb-search-item { padding:10px 14px; border-bottom:1px solid var(--line); cursor:pointer; font-size:.84rem; display:flex; align-items:center; justify-content:space-between; }\\n');
    buf.push('.tb-search-item:hover { background:rgba(25,103,210,.08); }\\n');
    buf.push('.tb-search-badge { font-size:.70rem; padding:2px 6px; border-radius:4px; font-weight:700; background:#e8f0fe; color:#1967d2; }\\n');
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
    buf.push('.why-box { background:linear-gradient(135deg,#0b1a2c,#243551); color:#fff; border-radius:18px; padding:28px 32px; margin:32px 0; box-shadow:0 12px 36px rgba(11,26,44,.18); border:1px solid rgba(255,255,255,.1); }\\n');
    buf.push('.why-box .wbadge { display:inline-block; font-size:.72rem; font-weight:800; letter-spacing:.14em; color:#8ab4f8; text-transform:uppercase; margin-bottom:8px; }\\n');
    buf.push('.why-box h3 { font-size:1.45rem; font-weight:800; margin:0 0 10px; color:#fff; }\\n');
    buf.push('.why-box p { font-size:1rem; color:#e8eaed; line-height:1.7; margin:0; }\\n');
    buf.push('.procbox { background:rgba(36,53,81,.85); backdrop-filter:blur(6px); border:1px solid rgba(255,255,255,.15); color:#fff; border-radius:12px; padding:12px 20px; margin:20px 0 32px; display:flex; align-items:center; gap:12px; font-size:.9rem; }\\n');
    buf.push('.procbox .badge { background:#1967d2; color:#fff; padding:3px 10px; border-radius:999px; font-size:.72rem; font-weight:800; letter-spacing:.08em; }\\n');
    buf.push('.kpi-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(180px,1fr)); gap:14px; margin:28px 0; }\\n');
    buf.push('.kpi-card { background:var(--paper); border:1px solid var(--line); border-radius:14px; padding:20px; text-align:center; box-shadow:var(--shadow); }\\n');
    buf.push('.kpi-num { font-size:2.2rem; font-weight:800; line-height:1.1; margin-bottom:6px; }\\n');
    buf.push('.kpi-label { font-size:.85rem; color:var(--muted); font-weight:600; }\\n');
    buf.push('.eyebrow { font-size:.78rem; font-weight:800; letter-spacing:.14em; text-transform:uppercase; color:var(--blue); margin-bottom:6px; }\\n');
    buf.push('h2.sec { font-size:1.75rem; font-weight:800; color:var(--navy); margin:0 0 10px; letter-spacing:-.01em; }\\n');
    buf.push('section { margin:56px 0; }\\n');
    buf.push('.flowmap { display:flex; gap:12px; align-items:center; overflow-x:auto; padding:16px 4px; margin-top:16px; }\\n');
    buf.push('.fstep { flex:1; min-width:180px; background:var(--paper); border:1px solid var(--line); border-left:4px solid var(--accent,#1967d2); border-radius:12px; padding:14px; box-shadow:var(--shadow); display:flex; gap:10px; align-items:center; }\\n');
    buf.push('.fnum { font-size:1.2rem; font-weight:800; color:var(--blue); min-width:24px; }\\n');
    buf.push('.fmeta b { display:block; font-size:.9rem; color:var(--navy); margin-bottom:2px; }\\n');
    buf.push('.fmeta .ft { font-size:.78rem; color:var(--muted); }\\n');
    buf.push('.farrow { color:var(--muted); font-size:1.1rem; font-weight:700; flex-shrink:0; }\\n');
    buf.push('.modgrid { display:grid; grid-template-columns:repeat(auto-fit,minmax(280px,1fr)); gap:20px; margin-top:20px; }\\n');
    buf.push('.flip { perspective:1000px; height:240px; cursor:pointer; }\\n');
    buf.push('.flip-inner { position:relative; width:100%; height:100%; text-align:left; transition:transform .6s cubic-bezier(.4,0,.2,1); transform-style:preserve-3d; border-radius:16px; box-shadow:var(--shadow); }\\n');
    buf.push('.flip.is-flipped .flip-inner { transform:rotateY(180deg); }\\n');
    buf.push('.face { position:absolute; width:100%; height:100%; -webkit-backface-visibility:hidden; backface-visibility:hidden; border-radius:16px; padding:24px; box-sizing:border-box; border:1px solid var(--line); background:var(--paper); display:flex; flex-direction:column; justify-content:space-between; }\\n');
    buf.push('.face.back { transform:rotateY(180deg); background:linear-gradient(135deg,var(--navy),var(--navy-2)); color:#fff; border-color:var(--navy); }\\n');
    buf.push('.face.front { border-top:4px solid var(--accent,#1967d2); }\\n');
    buf.push('.card-badge { display:inline-block; font-size:.7rem; font-weight:800; letter-spacing:.1em; text-transform:uppercase; color:var(--blue); margin-bottom:6px; }\\n');
    buf.push('.face.back .card-badge { color:#8ab4f8; }\\n');
    buf.push('.face.front h3 { font-size:1.15rem; font-weight:800; color:var(--navy); margin:0 0 8px; line-height:1.35; }\\n');
    buf.push('.face.front .tags { display:flex; gap:6px; flex-wrap:wrap; margin-top:8px; }\\n');
    buf.push('.face.front .tag { font-size:.72rem; padding:3px 8px; background:rgba(0,0,0,.04); border-radius:6px; color:var(--muted); font-weight:600; }\\n');
    buf.push('.face.back p { font-size:.9rem; line-height:1.6; color:#e8eaed; margin:0; }\\n');
    buf.push('.flip-hint { font-size:.72rem; color:var(--muted); text-align:right; margin-top:8px; }\\n');
    buf.push('.face.back .flip-hint { color:#9aa0a6; }\\n');
    buf.push('.step-list { display:flex; flex-direction:column; gap:18px; margin-top:20px; }\\n');
    buf.push('.step-card { background:var(--paper); border:1px solid var(--line); border-radius:16px; padding:24px; box-shadow:var(--shadow); transition:transform .18s, border-color .18s; }\\n');
    buf.push('.step-top { display:flex; justify-content:space-between; align-items:center; cursor:pointer; user-select:none; }\\n');
    buf.push('.step-title-group { display:flex; align-items:center; gap:12px; }\\n');
    buf.push('.step-num { width:32px; height:32px; border-radius:50%; background:rgba(25,103,210,.12); color:var(--blue); font-weight:800; font-size:1rem; display:flex; align-items:center; justify-content:center; flex-shrink:0; }\\n');
    buf.push('.step-title { font-size:1.15rem; font-weight:800; color:var(--navy); margin:0; }\\n');
    buf.push('.tool-tag { font-size:.72rem; background:rgba(25,103,210,.08); color:var(--blue); padding:3px 8px; border-radius:6px; font-weight:700; }\\n');
    buf.push('.done-btn { font-size:.78rem; font-family:inherit; padding:5px 12px; border-radius:999px; border:1px solid var(--line); background:var(--paper); color:var(--muted); cursor:pointer; font-weight:600; transition:.14s; }\\n');
    buf.push('.step-card.completed .done-btn { background:#e6f4ea; color:#137333; border-color:#a8dab5; }\\n');
    buf.push('.step-body { margin-top:16px; padding-top:16px; border-top:1px solid var(--line); }\\n');
    buf.push('.step-goal { font-size:.92rem; font-weight:700; color:var(--navy); margin-bottom:8px; }\\n');
    buf.push('.step-desc { font-size:.92rem; color:var(--muted); margin-bottom:14px; line-height:1.6; }\\n');
    buf.push('.prompt-box { background:linear-gradient(135deg,#e9f2ff,#e6f8ef); border:2px dashed #4a90e8; border-radius:12px; padding:14px 16px; margin:12px 0; }\\n');
    buf.push('body.dark-theme .prompt-box { background:linear-gradient(135deg,rgba(74,144,232,.15),rgba(52,168,83,.15)); border-color:#8ab4f8; }\\n');
    buf.push('.prompt-header { display:flex; justify-content:space-between; align-items:center; margin-bottom:8px; }\\n');
    buf.push('.prompt-badge { font-size:.74rem; font-weight:800; color:var(--blue); letter-spacing:.06em; }\\n');
    buf.push('.copy-btn { font-size:.74rem; font-family:inherit; font-weight:700; padding:4px 10px; border-radius:6px; border:1px solid var(--blue); background:#fff; color:var(--blue); cursor:pointer; transition:.14s; }\\n');
    buf.push('.copy-btn:hover { background:var(--blue); color:#fff; }\\n');
    buf.push('.prompt-box pre { margin:0; font-family:"Pretendard",monospace; font-size:.88rem; color:var(--text); white-space:pre-wrap; word-break:break-word; line-height:1.55; }\\n');
    buf.push('.tip-box-collapsible { background:rgba(0,0,0,.02); border:1px solid var(--line); border-radius:10px; padding:10px 14px; margin:10px 0; }\\n');
    buf.push('.tip-box-collapsible summary { font-size:.84rem; font-weight:700; color:var(--navy); cursor:pointer; user-select:none; }\\n');
    buf.push('.tip-body { margin-top:8px; font-size:.84rem; color:var(--muted); line-height:1.6; }\\n');
    buf.push('.note-box { background:rgba(25,103,210,.04); border-left:4px solid var(--blue); padding:10px 14px; border-radius:0 10px 10px 0; margin:10px 0; font-size:.85rem; color:var(--navy-2); }\\n');
    buf.push('.warn-box { background:rgba(197,34,31,.05); border-left:4px solid var(--terra); padding:10px 14px; border-radius:0 10px 10px 0; margin:10px 0; font-size:.85rem; color:#8c1d18; }\\n');
    buf.push('.urlbox-wrap { background:linear-gradient(135deg,#e6f8ef,#f1f3f4); border:1px solid var(--line); border-radius:12px; padding:10px 14px; display:flex; justify-content:space-between; align-items:center; margin:10px 0; }\\n');
    buf.push('.urlbox-meta b { display:block; font-size:.82rem; color:var(--teal); }\\n');
    buf.push('.urlbox-meta span { font-size:.76rem; color:var(--muted); word-break:break-all; }\\n');
    buf.push('.urlbox-btn { font-size:.78rem; font-weight:700; padding:6px 12px; border-radius:8px; background:#fff; border:1px solid var(--line); color:var(--blue); text-decoration:none; transition:.14s; }\\n');
    buf.push('.urlbox-btn:hover { background:var(--blue); color:#fff; border-color:var(--blue); }\\n');
    buf.push('.checklist-card { background:var(--paper); border:1px solid var(--line); border-radius:16px; padding:24px; box-shadow:var(--shadow); }\\n');
    buf.push('.check-item { display:flex; align-items:center; gap:10px; padding:10px 0; border-bottom:1px solid var(--line); font-size:.92rem; }\\n');
    buf.push('.check-item:last-child { border-bottom:none; }\\n');
    buf.push('.check-item input[type="checkbox"] { width:18px; height:18px; cursor:pointer; accent-color:var(--blue); }\\n');
    buf.push('.check-item.done span { text-decoration:line-through; color:var(--muted); }\\n');
    buf.push('footer { text-align:center; padding:48px 0 24px; font-size:.82rem; color:var(--muted); border-top:1px solid var(--line); margin-top:60px; }\\n');

    // ── Chrome DevTools 스타일 요소 검사 하이라이트 CSS (내보내기 모드에서는 완전 제외!) ──
    if (!isExport) {
      buf.push('/* 1) 상위 컨테이너 검사 하이라이트 (Blue) */\\n');
      buf.push('.devtools-inspect-container-active { outline:2px solid #1a73e8 !important; outline-offset:3px !important; box-shadow:0 0 0 4px rgba(26,115,232,0.2) !important; position:relative !important; transition:outline .1s ease, box-shadow .1s ease !important; }\\n');
      buf.push('.devtools-inspect-badge-container { position:absolute; background:#1a73e8; color:#fff; font-size:11px; font-family:"Pretendard",system-ui,sans-serif; font-weight:700; padding:3px 8px; border-radius:4px; z-index:999999; pointer-events:none; box-shadow:0 4px 10px rgba(0,0,0,0.25); white-space:nowrap; }\\n');
      
      buf.push('/* 2) 하위 세부 항목 검사 하이라이트 (Vivid Orange / Coral) (요구사항 1) */\\n');
      buf.push('.devtools-inspect-subitem-active { outline:2px dashed #ea580c !important; outline-offset:2px !important; box-shadow:0 0 0 3px rgba(234,88,12,0.25) !important; position:relative !important; transition:outline .1s ease, box-shadow .1s ease !important; }\\n');
      buf.push('.devtools-inspect-badge-subitem { position:absolute; background:#ea580c; color:#fff; font-size:11px; font-family:"Pretendard",system-ui,sans-serif; font-weight:700; padding:3px 8px; border-radius:4px; z-index:999999; pointer-events:none; box-shadow:0 4px 10px rgba(0,0,0,0.25); white-space:nowrap; }\\n');
    }

    buf.push('</style>\\n</head>\\n<body>\\n');

    // 스크롤 진행률 표시바
    if (tb.showProgress) {
      buf.push('<div class="tb-progress-bar" id="reportProgressBar"></div>\\n');
    }

    // 시스템 툴바
    if (tb.enabled) {
      buf.push('<header class="report-toolbar"' + inspectAttr('toolbar', '상단 시스템 툴바', 'container') + '>\\n');
      buf.push('  <div class="tb-left"><span style="width:10px;height:10px;border-radius:50%;background:#1967d2;display:inline-block;"></span>' + esc(title) + '</div>\\n');
      if (tb.showSearch) {
        buf.push('  <div class="tb-search-wrap"' + inspectAttr('tb-search-box', '실시간 검색창', 'item') + '>\\n');
        buf.push('    <span class="tb-search-icon">🔍</span>\\n');
        buf.push('    <input type="text" class="tb-search-input" id="reportSearchInput" placeholder="' + esc(tb.searchPlaceholder || '보고서 키워드 검색...') + '">\\n');
        buf.push('    <div class="tb-search-dropdown" id="reportSearchDropdown"></div>\\n');
        buf.push('  </div>\\n');
      }
      buf.push('  <div class="tb-actions">\\n');
      if (tb.showPrint) {
        buf.push('    <button class="tb-btn" onclick="window.print()">🖨️ 인쇄 / PDF</button>\\n');
      }
      if (tb.showThemeToggle) {
        buf.push('    <button class="tb-btn" onclick="document.body.classList.toggle(\\'dark-theme\\')">🌓 테마</button>\\n');
      }
      buf.push('  </div>\\n');
      buf.push('</header>\\n');
    }

    buf.push('<div class="wrap">\\n');

    // 헤더 영역
    buf.push('<header class="hero"' + inspectAttr('header', '기본 정보 (헤더)', 'container') + '>\\n');
    buf.push('  <div class="stamp-badge"' + inspectAttr('hero-badge', '상단 뱃지 문구 (' + badge + ')', 'item') + '>' + esc(badge) + '</div>\\n');
    buf.push('  <h1' + inspectAttr('hero-title', '보고서 제목 (' + title + ')', 'item') + '>' + fmtTitle(title) + '</h1>\\n');
    if (description) {
      buf.push('  <p class="lead"' + inspectAttr('hero-desc', '요약 설명', 'item') + '>' + esc(description) + '</p>\\n');
    }
    if (meta.length) {
      buf.push('  <div class="meta-chips"' + inspectAttr('meta-chips', '핵심 메타 정보 칩', 'container') + '>\\n');
      meta.forEach(function(m, i){
        buf.push('    <div class="meta-chip"' + inspectAttr('meta-' + i, '메타 칩: ' + m.label, 'item') + '><b>' + esc(m.label) + ':</b> ' + esc(m.value) + '</div>\\n');
      });
      buf.push('  </div>\\n');
    }
    buf.push('</header>\\n');

    // Why 인트로 박스
    if (whyBox && whyBox.enabled) {
      buf.push('<div class="why-box"' + inspectAttr('whyBox', 'Why 인트로 박스', 'container') + '>\\n');
      buf.push('  <span class="wbadge">✦ WHY WE NEED THIS</span>\\n');
      buf.push('  <h3' + inspectAttr('why-title', 'Why 박스 제목: ' + (whyBox.title||''), 'item') + '>' + esc(whyBox.title || '왜 이 워크플로우를 도입해야 하는가?') + '</h3>\\n');
      buf.push('  <p' + inspectAttr('why-desc', 'Why 박스 설명 문구', 'item') + '>' + esc(whyBox.desc || '') + '</p>\\n');
      buf.push('</div>\\n');
    }

    // 프로세스 플로우 바
    if (procBox && procBox.enabled) {
      buf.push('<div class="procbox"' + inspectAttr('procBox', '프로세스 플로우 바', 'container') + '>\\n');
      buf.push('  <span class="badge"' + inspectAttr('proc-badge', '플로우 뱃지: ' + (procBox.badge||''), 'item') + '>' + esc(procBox.badge || 'PIPELINE') + '</span>\\n');
      buf.push('  <span' + inspectAttr('proc-title', '파이프라인 흐름 문구', 'item') + '>' + esc(procBox.title || '') + '</span>\\n');
      buf.push('</div>\\n');
    }

    // KPI 대시보드
    if (kpiStats.length) {
      buf.push('<div class="kpi-grid"' + inspectAttr('kpiStats', 'KPI 지표 스코어보드', 'container') + '>\\n');
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
      buf.push('<section' + inspectAttr('flowmap', '1줄 진행 흐름 지도', 'container') + '><div class="eyebrow">PROCESS FLOW</div><h2 class="sec">🗺️ 전체 진행 흐름</h2><p class="lead" style="font-size:.95rem;">단계별 핵심 목표와 산출물입니다.</p><div class="flowmap">');
      buf.push(flowmap.map(function(f, i){
        return '<div class="fstep" id="flowStep_' + i + '"' + inspectAttr('flow-' + i, '흐름 단계 #' + (i+1), 'container') + ' style="--accent:' + esc(f.color||'#1967d2') + '"><span class="fnum">' + esc(f.num||(i+1)) + '</span><div class="fmeta"><b' + inspectAttr('flow-' + i + '-title', '단계명 (' + f.title + ')', 'item') + '>' + esc(f.title) + '</b><span class="ft"' + inspectAttr('flow-' + i + '-desc', '단계 설명 (' + f.desc + ')', 'item') + '>' + esc(f.desc) + '</span></div></div>' +
          (i < flowmap.length - 1 ? '<span class="farrow">→</span>' : '');
      }).join(''));
      buf.push('</div></section>\\n');
    }

    // 3D 플립 카드
    if (cards.length) {
      buf.push('<section' + inspectAttr('cards', '3D 플립 핵심 모듈 카드', 'container') + '><div class="eyebrow">OVERVIEW CARDS</div><h2 class="sec">📌 핵심 모듈 &amp; 테마</h2><p class="lead" style="font-size:.95rem;">카드를 클릭하면 상세 세부 계획을 볼 수 있습니다.</p><div class="modgrid">');
      buf.push(cards.map(function(c, i){
        return '<div class="flip" id="cardFlip_' + i + '"' + inspectAttr('card-' + i, '모듈 카드 #' + (i+1) + ' ' + esc(c.frontTitle), 'container') + ' style="--accent:' + esc(c.color||'#1967d2') + '"><div class="flip-inner"><div class="face front"><div><span class="card-badge">✦ ' + esc(c.badge||'MODULE') + '</span><h3' + inspectAttr('card-' + i + '-title', '카드 제목 (' + c.frontTitle + ')', 'item') + '>' + esc(c.frontTitle) + '</h3></div><div class="tags">' +
          (c.tags||[]).map(function(t){ return '<span class="tag">' + esc(t) + '</span>'; }).join('') +
          '</div><div class="flip-hint">카드를 누르면 상세 내용 ↻</div></div><div class="face back"><div class="backbody"><span class="card-badge">✦ ' + esc(c.badge||'MODULE') + '</span><p' + inspectAttr('card-' + i + '-desc', '카드 뒷면 상세설명', 'item') + '>' + esc(c.backDesc) + '</p></div><div class="flip-hint">카드를 누르면 앞면으로 ↻</div></div></div></div>';
      }).join(''));
      buf.push('</div></section>\\n');
    }

    // 상세 실행 단계
    if (steps.length) {
      buf.push('<section' + inspectAttr('steps', '상세 실행 단계 (Steps)', 'container') + '><div class="eyebrow">STEP-BY-STEP WORKFLOW</div><h2 class="sec">🛠️ 단계별 실행 및 프롬프트</h2><p class="lead" style="font-size:.95rem;">프롬프트와 가이드를 복사하여 즉시 실행하세요.</p><div class="step-list">');
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

    // 선형 블록 스택 (Studio Catalog AST)
    if (config.stackBlocks && config.stackBlocks.length > 0 && typeof STUDIO_CATALOG !== 'undefined') {
      buf.push('<section class="stack-blocks-section" style="margin:40px 0;"><div class="eyebrow">CUSTOM BLOCK STACK</div><h2 class="sec">🧩 수직 스택 컴포넌트</h2><div style="display:flex;flex-direction:column;gap:20px;">');
      config.stackBlocks.forEach(function(blk){
        buf.push(STUDIO_CATALOG.renderBlockHtml(blk, false));
      });
      buf.push('</div></section>\\n');
    }

    buf.push('<footer>' + esc(title) + ' · Google Tone Workflow Architecture</footer></div>\\n');

    // ── 클라이언트 스크립트 (카드 플립, 복사, 체크, 검색) ──
    buf.push('<script>\\n');
    buf.push('function toggleStep(idx){ var b = document.getElementById("stepBody_" + idx); if(b) b.style.display = b.style.display === "none" ? "block" : "none"; }\\n');
    buf.push('function toggleDone(idx){ var c = document.getElementById("stepCard_" + idx); if(c) c.classList.toggle("completed"); }\\n');
    buf.push('function copySnippet(btn){\\n');
    buf.push('  var pre = btn.closest(".prompt-box").querySelector("pre");\\n');
    buf.push('  if(!pre) return;\\n');
    buf.push('  navigator.clipboard.writeText(pre.innerText).then(function(){\\n');
    buf.push('    var old = btn.textContent;\\n');
    buf.push('    btn.textContent = "✅ 복사됨!";\\n');
    buf.push('    setTimeout(function(){ btn.textContent = old; }, 1800);\\n');
    buf.push('  });\\n');
    buf.push('}\\n');
    buf.push('document.querySelectorAll(".flip").forEach(function(el){\\n');
    buf.push('  el.addEventListener("click", function(){ el.classList.toggle("is-flipped"); });\\n');
    buf.push('});\\n');
    buf.push('function saveChecklist(i, checked){\\n');
    buf.push('  var item = document.getElementById("checkItem_" + i);\\n');
    buf.push('  if(item) item.classList.toggle("done", checked);\\n');
    buf.push('}\\n');

    // 진행률 표시줄 스크립트
    if (tb.showProgress) {
      buf.push('window.addEventListener("scroll", function(){\\n');
      buf.push('  var bar = document.getElementById("reportProgressBar");\\n');
      buf.push('  if(!bar) return;\\n');
      buf.push('  var total = document.documentElement.scrollHeight - window.innerHeight;\\n');
      buf.push('  var pct = total > 0 ? (window.scrollY / total) * 100 : 0;\\n');
      buf.push('  bar.style.width = Math.min(100, Math.max(0, pct)) + "%";\\n');
      buf.push('});\\n');
    }

    // 실시간 검색엔진 스크립트
    if (tb.showSearch) {
      buf.push('(function(){\\n');
      buf.push('  var inp = document.getElementById("reportSearchInput");\\n');
      buf.push('  var drop = document.getElementById("reportSearchDropdown");\\n');
      buf.push('  if(!inp || !drop) return;\\n');
      buf.push('  inp.addEventListener("input", function(){\\n');
      buf.push('    var q = inp.value.trim().toLowerCase();\\n');
      buf.push('    if(!q){ drop.style.display = "none"; drop.innerHTML = ""; return; }\\n');
      buf.push('    var matches = [];\\n');
      buf.push('    document.querySelectorAll(".step-card, .fstep, .flip, .kpi-card, .check-item").forEach(function(el){\\n');
      buf.push('      var txt = el.innerText || "";\\n');
      buf.push('      if(txt.toLowerCase().indexOf(q) !== -1){\\n');
      buf.push('        var title = (el.querySelector("h3, b, .kpi-num, span") || {}).innerText || "항목";\\n');
      buf.push('        var type = el.classList.contains("step-card") ? "실행 단계" : el.classList.contains("fstep") ? "흐름 단계" : el.classList.contains("flip") ? "핵심 모듈" : el.classList.contains("kpi-card") ? "KPI 지표" : "체크 항목";\\n');
      buf.push('        matches.push({ el: el, title: title.substring(0, 32), type: type });\\n');
      buf.push('      }\\n');
      buf.push('    });\\n');
      buf.push('    if(matches.length === 0){\\n');
      buf.push('      drop.innerHTML = "<div style=\\"padding:12px;color:#70757a;text-align:center;font-size:.82rem;\\">일치하는 항목이 없습니다.</div>";\\n');
      buf.push('    } else {\\n');
      buf.push('      drop.innerHTML = matches.slice(0, 8).map(function(m, idx){\\n');
      buf.push('        return "<div class=\\"tb-search-item\\" data-match-idx=\\"" + idx + "\\"><span>" + m.title + "</span><span class=\\"tb-search-badge\\">" + m.type + "</span></div>";\\n');
      buf.push('      }).join("");\\n');
      buf.push('      drop.querySelectorAll(".tb-search-item").forEach(function(item, idx){\\n');
      buf.push('        item.addEventListener("click", function(){\\n');
      buf.push('          drop.style.display = "none";\\n');
      buf.push('          var target = matches[idx].el;\\n');
      buf.push('          target.scrollIntoView({ behavior: "smooth", block: "center" });\\n');
      buf.push('          target.style.outline = "3px solid #1967d2";\\n');
      buf.push('          setTimeout(function(){ target.style.outline = ""; }, 2000);\\n');
      buf.push('        });\\n');
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

    // 툴바 도구 도크 상태 배지 갱신
    var pillHeader = document.getElementById('pillTool_header');
    if(pillHeader) pillHeader.textContent = '필수';

    var pillToolbar = document.getElementById('pillTool_toolbar');
    if(pillToolbar){
      var tbActive = currentData.toolbar && (currentData.toolbar.showSearch || currentData.toolbar.showProgress || currentData.toolbar.showPrint || currentData.toolbar.showThemeToggle);
      pillToolbar.textContent = tbActive ? 'ON' : 'OFF';
      var btn = document.getElementById('dockTool_toolbar');
      if(btn) btn.classList.toggle('active', !!tbActive);
    }

    var pillKpi = document.getElementById('pillTool_kpiStats');
    if(pillKpi){
      var hasKpi = currentData.kpiStats && currentData.kpiStats.length > 0;
      pillKpi.textContent = hasKpi ? currentData.kpiStats.length + '개' : 'OFF';
      var btn = document.getElementById('dockTool_kpiStats');
      if(btn) btn.classList.toggle('active', hasKpi);
    }

    var pillFlow = document.getElementById('pillTool_flowmap');
    if(pillFlow){
      var hasFlow = currentData.flowmap && currentData.flowmap.length > 0;
      pillFlow.textContent = hasFlow ? currentData.flowmap.length + '단계' : 'OFF';
      var btn = document.getElementById('dockTool_flowmap');
      if(btn) btn.classList.toggle('active', hasFlow);
    }

    var pillCards = document.getElementById('pillTool_cards');
    if(pillCards){
      var hasCards = currentData.cards && currentData.cards.length > 0;
      pillCards.textContent = hasCards ? currentData.cards.length + '장' : 'OFF';
      var btn = document.getElementById('dockTool_cards');
      if(btn) btn.classList.toggle('active', hasCards);
    }

    var pillSteps = document.getElementById('pillTool_steps');
    if(pillSteps){
      var count = (currentData.steps || []).length;
      pillSteps.textContent = count + '단계';
      var btn = document.getElementById('dockTool_steps');
      if(btn) btn.classList.add('active');
    }

    var pillCheck = document.getElementById('pillTool_checklist');
    if(pillCheck){
      var hasCheck = currentData.checklist && currentData.checklist.length > 0;
      pillCheck.textContent = hasCheck ? currentData.checklist.length + '개' : 'OFF';
      var btn = document.getElementById('dockTool_checklist');
      if(btn) btn.classList.toggle('active', hasCheck);
    }

    // 기본 정보 인풋
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
      var kpiHtml = '<div style="font-weight:700;font-size:.85rem;color:var(--navy);margin-bottom:8px;">📊 KPI 지표 항목 리스트</div>';
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
        '<div class="form-group" style="margin-bottom:8px;" data-editor-id="step-' + idx + '-url" data-editor-level="item"><label>🔗 외부 리소스 URL 링크</label><input type="text" value="' + (s.url||'') + '" placeholder="예: https://docs.google.com/..." oninput="updateStepItem(' + idx + ', \\'url\\', this.value)"></div>' +
        '<button class="add-subblock-btn" onclick="openBlockPicker(event, \\'step-sub\\', ' + idx + ')">+ 서브 블록 추가 (프롬프트/팁/노트/경고/URL) ▾</button>';
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

    if (currentData.stackBlocks && Array.isArray(currentData.stackBlocks)) {
      canvasBlocks = currentData.stackBlocks;
      reindexBlockOrders();
      renderStackCanvas();
    }

    document.getElementById('jsonEditor').value = JSON.stringify(currentData, null, 2);
    updateLivePreview();
    bindEditorInspectEvents();
  }

  function updateLivePreview() {
    currentData.stackBlocks = canvasBlocks;
    var html = renderReportHtml(currentData, false);
    var frame = document.getElementById('previewFrame');
    if (frame) {
      try {
        var doc = frame.contentDocument || frame.contentWindow.document;
        doc.open();
        doc.write(html);
        doc.close();
      } catch(e) {}
    }
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

  // ── Chrome DevTools 스타일 2단계 요소 검사 연동 (컨테이너 Blue / 세부 항목 Orange) ──
  var currentHighlightedContainer = null;
  var currentHighlightedSubitem = null;

  window.onPreviewInspectHover = function(inspectId, level){
    clearEditorHighlights();
    var target = document.querySelector('[data-editor-id="' + inspectId + '"]');
    if(target){
      if(level === 'item'){
        currentHighlightedSubitem = target;
        target.classList.add('editor-inspect-subitem-active');
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
    currentData.cards.push({ badge: "MODULE", frontTitle: "신규 모듈 카드", tags: ["태그1", "태그2"], color: "#1967d2", backDesc: "카드 뒷면 상세 설명" });
    syncFormFromData();
  };
  window.updateCardItem = function(i, k, v){ currentData.cards[i][k] = v; updateLivePreview(); document.getElementById('jsonEditor').value = JSON.stringify(currentData, null, 2); };
  window.updateCardTags = function(i, val){ currentData.cards[i].tags = val.split(',').map(function(s){ return s.trim(); }).filter(Boolean); updateLivePreview(); document.getElementById('jsonEditor').value = JSON.stringify(currentData, null, 2); };
  window.removeCardItem = function(i){ currentData.cards.splice(i, 1); syncFormFromData(); };

  // Steps 조작
  window.addStepItem = function(){
    currentData.steps = currentData.steps || [];
    currentData.steps.push({ num: String(currentData.steps.length+1), title: "새로운 실행 단계", tool: "도구", goal: "실행 목표", desc: "상세 안내" });
    syncFormFromData();
  };
  window.updateStepItem = function(i, k, v){ currentData.steps[i][k] = v; updateLivePreview(); document.getElementById('jsonEditor').value = JSON.stringify(currentData, null, 2); };
  window.removeStepItem = function(i){ currentData.steps.splice(i, 1); syncFormFromData(); };

  // Checklist 조작
  window.addCheckItem = function(){
    currentData.checklist = currentData.checklist || [];
    currentData.checklist.push("새 점검 항목 내용");
    syncFormFromData();
  };
  window.updateCheckItem = function(i, v){ currentData.checklist[i] = v; updateLivePreview(); document.getElementById('jsonEditor').value = JSON.stringify(currentData, null, 2); };
  window.removeCheckItem = function(i){ currentData.checklist.splice(i, 1); syncFormFromData(); };

  // ── 좌측 패널 탭 스위처 (블록 라이브러리 / 폼 편집 / JSON) ──
  window.switchEditorTab = function(tab) {
    var tabBlocks = document.getElementById('tabBlocks');
    var tabForm = document.getElementById('tabForm');
    var tabJson = document.getElementById('tabJson');
    var blocksView = document.getElementById('blocksView');
    var formView = document.getElementById('formView');
    var jsonView = document.getElementById('jsonView');

    if (tabBlocks) tabBlocks.classList.toggle('active', tab === 'blocks');
    if (tabForm) tabForm.classList.toggle('active', tab === 'form');
    if (tabJson) tabJson.classList.toggle('active', tab === 'json');

    if (blocksView) blocksView.style.display = (tab === 'blocks') ? 'block' : 'none';
    if (formView) formView.style.display = (tab === 'form') ? 'block' : 'none';
    if (jsonView) {
      jsonView.style.display = (tab === 'json') ? 'block' : 'none';
      if (tab === 'json') {
        currentData.stackBlocks = canvasBlocks;
        document.getElementById('jsonEditor').value = JSON.stringify(currentData, null, 2);
      }
    }
  };

  if (document.getElementById('tabBlocks')) {
    document.getElementById('tabBlocks').addEventListener('click', function(){ switchEditorTab('blocks'); });
  }
  if (document.getElementById('tabForm')) {
    document.getElementById('tabForm').addEventListener('click', function(){ switchEditorTab('form'); });
  }
  if (document.getElementById('tabJson')) {
    document.getElementById('tabJson').addEventListener('click', function(){ switchEditorTab('json'); });
  }

  document.getElementById('jsonEditor').addEventListener('input', function(){
    try {
      var parsed = JSON.parse(document.getElementById('jsonEditor').value);
      currentData = parsed;
      if (parsed.stackBlocks && Array.isArray(parsed.stackBlocks)) {
        canvasBlocks = parsed.stackBlocks;
        reindexBlockOrders();
        renderStackCanvas();
      }
      syncToolbarButtons();
      updateLivePreview();
    } catch(e) {
      // JSON 파싱 중에는 조용히 대기
    }
  });

  // ── 템플릿/작업 불러오기 셀렉트 이벤트 ──
  document.getElementById('presetSelect').addEventListener('change', function(e){
    var val = e.target.value;
    if (val.startsWith('preset:')) {
      var pKey = val.split(':')[1];
      if (PRESETS[pKey]) {
        currentData = JSON.parse(JSON.stringify(PRESETS[pKey]));
        currentLoadedWorkKey = null;
        syncFormFromData();
        updatePresetDropdown(val);
        showToast('🌟 ' + (pKey === 'weekly' ? '주간 업무 자동화' : pKey === 'meeting' ? '스마트 회의록' : '온보딩 가이드') + ' 템플릿이 로드되었습니다.');
      }
    } else if (val.startsWith('saved:')) {
      var sKey = val.substring(6);
      var saved = getSavedWorks();
      if (saved[sKey]) {
        currentData = JSON.parse(JSON.stringify(saved[sKey].data));
        currentLoadedWorkKey = sKey;
        syncFormFromData();
        updatePresetDropdown(val);
        showToast('📂 저장된 작업 [' + (saved[sKey].name || sKey) + ']을 불러왔습니다.');
      }
    }
  });

  // ── 작업 저장 모달 열기/닫기 ──
  document.getElementById('openSaveBtn').addEventListener('click', function(){
    var nameInp = document.getElementById('saveWorkName');
    nameInp.value = currentLoadedWorkKey || currentData.title || '';
    document.getElementById('saveModal').style.display = 'flex';
    nameInp.focus();
  });

  window.closeSaveModal = function(){
    document.getElementById('saveModal').style.display = 'none';
  };

  // ── 작업 저장 실행 ──
  document.getElementById('confirmSaveBtn').addEventListener('click', function(){
    var name = document.getElementById('saveWorkName').value.trim();
    if (!name) {
      alert('작업 이름을 입력해주세요.');
      return;
    }
    currentData.stackBlocks = canvasBlocks;
    var saved = getSavedWorks();
    var key = name;
    saved[key] = {
      name: name,
      updatedAt: new Date().toISOString(),
      data: currentData
    };
    setSavedWorks(saved);
    currentLoadedWorkKey = key;
    closeSaveModal();
    updatePresetDropdown('saved:' + key);
    showToast('💾 [' + name + '] 작업이 브라우저에 안전하게 저장되었습니다!');
  });

  // ── 현재 저장 작업 삭제 ──
  document.getElementById('deleteWorkBtn').addEventListener('click', function(){
    if (!currentLoadedWorkKey) return;
    if (confirm('[' + currentLoadedWorkKey + '] 작업을 영구 삭제하시겠습니까?')) {
      var saved = getSavedWorks();
      delete saved[currentLoadedWorkKey];
      setSavedWorks(saved);
      showToast('🗑️ 저장된 작업이 삭제되었습니다.');
      currentLoadedWorkKey = null;
      currentData = JSON.parse(JSON.stringify(PRESETS.weekly));
      updatePresetDropdown('preset:weekly');
      syncFormFromData();
    }
  });

  function escapeFormVal(s) {
    return String(s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  // ── 반응형 시맨틱 HTML 컴파일러 (Semantic Responsive HTML Compiler) ──
  function compileSemanticHtml(blocks, pageTitle) {
    var title = pageTitle || (typeof currentData !== 'undefined' && currentData.title) || 'Workflow Studio Export';
    var blocksHtml = [];

    if (!blocks || blocks.length === 0) {
      blocksHtml.push('    <div style="text-align:center;padding:60px 20px;background:#ffffff;border:2px dashed #dadce0;border-radius:16px;color:#5f6368;">');
      blocksHtml.push('      <div style="font-size:2rem;margin-bottom:8px;">📝</div>');
      blocksHtml.push('      <b>구성된 블록이 없습니다.</b>');
      blocksHtml.push('    </div>');
    } else {
      blocks.forEach(function(blk){
        var rawHtml = (typeof STUDIO_CATALOG !== 'undefined') ? STUDIO_CATALOG.renderBlockHtml(blk, false) : '';
        // 완전한 에디터 아티팩트 제거 (contenteditable, data-field, oninput, title 툴팁 등)
        var clean = rawHtml
          .replace(/\\s*contenteditable="[^"]*"/gi, '')
          .replace(/\\s*spellcheck="[^"]*"/gi, '')
          .replace(/\\s*data-field="[^"]*"/gi, '')
          .replace(/\\s*oninput="onContentEdited\\([^)]*\\)"/gi, '')
          .replace(/\\s*title="클릭하여 직접 텍스트 수정"/gi, '');

        blocksHtml.push('    <!-- Semantic Block: ' + blk.type + ' (' + blk.id + ') -->');
        blocksHtml.push('    <div class="builder-block" data-type="' + blk.type + '" id="' + blk.id + '">');
        blocksHtml.push('      ' + clean);
        blocksHtml.push('    </div>');
      });
    }

    var doc = [
      '<!DOCTYPE html>',
      '<html lang="ko">',
      '<head>',
      '<meta charset="UTF-8">',
      '<meta name="viewport" content="width=device-width, initial-scale=1.0">',
      '<title>' + escapeFormVal(title) + '</title>',
      '<link rel="preconnect" href="https://cdn.jsdelivr.net">',
      '<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css">',
      '<style>',
      '  :root {',
      '    --primary: #1a73e8;',
      '    --primary-hover: #174ea6;',
      '    --navy: #0b1a2c;',
      '    --navy-2: #243551;',
      '    --bg: #f8fafd;',
      '    --paper: #ffffff;',
      '    --text: #202124;',
      '    --muted: #5f6368;',
      '    --line: #dadce0;',
      '    --accent: #1967d2;',
      '    --radius-lg: 20px;',
      '    --radius-md: 14px;',
      '    --radius-sm: 8px;',
      '    --shadow-sm: 0 2px 8px rgba(36,53,81,0.06);',
      '    --shadow-md: 0 8px 24px rgba(36,53,81,0.08);',
      '    --shadow-lg: 0 16px 40px rgba(36,53,81,0.14);',
      '  }',
      '',
      '  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }',
      '  body {',
      '    font-family: "Pretendard", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;',
      '    background: var(--bg);',
      '    color: var(--text);',
      '    line-height: 1.6;',
      '    -webkit-font-smoothing: antialiased;',
      '    min-height: 100vh;',
      '  }',
      '',
      '  /* 상단 헤더 바 */',
      '  .builder-header {',
      '    background: rgba(255, 255, 255, 0.94);',
      '    backdrop-filter: blur(10px);',
      '    border-bottom: 1px solid var(--line);',
      '    padding: 14px 24px;',
      '    display: flex;',
      '    align-items: center;',
      '    justify-content: space-between;',
      '    position: sticky;',
      '    top: 0;',
      '    z-index: 1000;',
      '  }',
      '  .builder-header-brand {',
      '    display: flex;',
      '    align-items: center;',
      '    gap: 8px;',
      '    font-weight: 800;',
      '    font-size: .94rem;',
      '    color: var(--navy);',
      '  }',
      '  .builder-header-dot {',
      '    width: 9px;',
      '    height: 9px;',
      '    border-radius: 50%;',
      '    background: var(--primary);',
      '  }',
      '  .builder-header-badge {',
      '    font-size: .74rem;',
      '    font-weight: 700;',
      '    background: #e8f0fe;',
      '    color: #1967d2;',
      '    padding: 3px 10px;',
      '    border-radius: 999px;',
      '  }',
      '',
      '  /* 반응형 페이지 래퍼 */',
      '  .builder-page-wrap {',
      '    max-width: 960px;',
      '    margin: 0 auto;',
      '    padding: 40px 20px 80px;',
      '    display: flex;',
      '    flex-direction: column;',
      '    gap: 24px;',
      '  }',
      '',
      '  /* 시맨틱 블록 컨테이너 */',
      '  .builder-block {',
      '    position: relative;',
      '    width: 100%;',
      '    transition: transform .2s ease;',
      '  }',
      '',
      '  /* 3D 플립 카드 스타일 */',
      '  .fcard {',
      '    position: relative;',
      '    width: 100%;',
      '    min-height: 360px;',
      '    transform-style: preserve-3d;',
      '    transition: transform .6s cubic-bezier(.2, .85, .32, 1.2);',
      '    border-radius: var(--radius-lg);',
      '    box-shadow: var(--shadow-md);',
      '    cursor: pointer;',
      '  }',
      '  .fcard.flipped {',
      '    transform: rotateY(180deg);',
      '  }',
      '  .fcard:hover {',
      '    box-shadow: var(--shadow-lg);',
      '  }',
      '  .face {',
      '    position: absolute;',
      '    inset: 0;',
      '    backface-visibility: hidden;',
      '    -webkit-backface-visibility: hidden;',
      '    border-radius: var(--radius-lg);',
      '  }',
      '  .face.front {',
      '    background: #ffffff;',
      '    border: 1px solid var(--line);',
      '  }',
      '  .face.back {',
      '    background: #ffffff;',
      '    border: 1px solid rgba(25, 103, 210, 0.3);',
      '    transform: rotateY(180deg);',
      '  }',
      '',
      '  /* GAS 접이식 아코디언 */',
      '  .gasfold {',
      '    background: #ffffff;',
      '    border: 1px solid var(--line);',
      '    border-left: 5px solid var(--primary);',
      '    border-radius: 0 var(--radius-lg) var(--radius-lg) 0;',
      '    box-shadow: var(--shadow-sm);',
      '    overflow: hidden;',
      '    transition: all .2s ease;',
      '  }',
      '  .gasfold summary {',
      '    cursor: pointer;',
      '    list-style: none;',
      '    user-select: none;',
      '  }',
      '  .gasfold summary::-webkit-details-marker {',
      '    display: none;',
      '  }',
      '  .gasfold[open] summary {',
      '    border-bottom: 1px solid #f1f3f4;',
      '  }',
      '',
      '  /* PARTS 프롬프트 칩 호버/활성 스타일 */',
      '  .stack-partsprompt button {',
      '    transition: all .14s ease;',
      '  }',
      '  .stack-partsprompt button:hover {',
      '    opacity: .9;',
      '    transform: translateY(-1px);',
      '  }',
      '  .stack-partsprompt button:active {',
      '    transform: translateY(0);',
      '  }',
      '',
      '  /* 모바일 및 데스크톱 반응형 미디어 쿼리 */',
      '  @media (max-width: 768px) {',
      '    .builder-header { padding: 10px 16px; }',
      '    .builder-page-wrap { padding: 20px 12px 60px; gap: 16px; }',
      '    .fcard { min-height: 380px; }',
      '    .face.front, .face.back { padding: 20px 16px !important; }',
      '    .stack-partsprompt { padding: 18px 14px !important; }',
      '    .stack-cta { padding: 26px 16px !important; }',
      '    .gasfold summary { padding: 14px 16px !important; }',
      '  }',
      '',
      '  @media (max-width: 480px) {',
      '    .builder-page-wrap { padding: 16px 8px 48px; gap: 14px; }',
      '    .fcard { min-height: 420px; }',
      '  }',
      '',
      '  @media print {',
      '    .builder-header { display: none; }',
      '    .builder-page-wrap { padding: 0; max-width: 100%; }',
      '    .fcard { page-break-inside: avoid; }',
      '    .builder-block { page-break-inside: avoid; }',
      '  }',
      '</style>',
      '</head>',
      '<body>',
      '  <header class="builder-header">',
      '    <div class="builder-header-brand">',
      '      <span class="builder-header-dot"></span> ' + escapeFormVal(title),
      '    </div>',
      '    <span class="builder-header-badge">✨ Standalone Responsive Export</span>',
      '  </header>',
      '',
      '  <main class="builder-page-wrap">',
      blocksHtml.join('\\n'),
      '  </main>',
      '',
      '  <footer style="text-align:center;padding:24px;color:#70757a;font-size:.80rem;border-top:1px solid #dadce0;margin-top:40px;">',
      '    ' + escapeFormVal(title) + ' · Generated by Gemini Style Workflow Studio Engine',
      '  </footer>',
      '',
      '  <!-- 번들링된 독립 실행형 인터랙션 스크립트 -->',
      '  <script>',
      '    // 1. 3D 플립 카드 회전 및 모듈 이동 제어 (mt-goto 지원)',
      '    var MT_FILES = { 1: "module1.html", 2: "module2.html", 3: "module3.html", 4: "module4.html" };',
      '    function goModule(n) {',
      '      if (window.parent && window.parent !== window) {',
      '        try { window.parent.postMessage({ type: "mt-goto", module: n }, "*"); return; } catch(e){}',
      '      }',
      '      if (MT_FILES[n]) { location.href = MT_FILES[n]; }',
      '      else { location.href = "module" + n + ".html"; }',
      '    }',
      '',
      '    document.querySelectorAll(".fcard").forEach(function(card){',
      '      card.addEventListener("click", function(e){',
      '        var btn = e.target.closest("[data-noflip]");',
      '        if (btn) {',
      '          e.stopPropagation();',
      '          var mod = btn.getAttribute("data-module") || "1";',
      '          goModule(mod);',
      '          return;',
      '        }',
      '        card.classList.toggle("flipped");',
      '      });',
      '    });',
      '',
      '    // 2. 범용 원클릭 클립보드 복사 함수',
      '    function copyTextToClipboard(text, btnEl) {',
      '      if (navigator.clipboard && navigator.clipboard.writeText) {',
      '        navigator.clipboard.writeText(text).then(function(){',
      '          showCopyFeedback(btnEl);',
      '        }).catch(function(){ fallbackCopy(text, btnEl); });',
      '      } else {',
      '        fallbackCopy(text, btnEl);',
      '      }',
      '    }',
      '    function fallbackCopy(text, btnEl) {',
      '      var ta = document.createElement("textarea");',
      '      ta.value = text;',
      '      ta.style.position = "fixed"; ta.style.opacity = "0";',
      '      document.body.appendChild(ta);',
      '      ta.select();',
      '      try { document.execCommand("copy"); showCopyFeedback(btnEl); } catch(e){}',
      '      document.body.removeChild(ta);',
      '    }',
      '    function showCopyFeedback(btnEl) {',
      '      if (!btnEl) return;',
      '      var orig = btnEl.innerText;',
      '      btnEl.innerText = "✓ 복사 완료!";',
      '      btnEl.style.transform = "scale(1.05)";',
      '      setTimeout(function(){ btnEl.innerText = orig; btnEl.style.transform = ""; }, 1800);',
      '    }',
      '',
      '    // 3. PARTS 프롬프트 칩 동적 인터랙션 및 프롬프트 재조합',
      '    window.selectPartsChip = function(blockId, catKey, chipValue) {',
      '      if (window.event && window.event.target && window.event.target.parentElement) {',
      '        var p = window.event.target.parentElement;',
      '        p.querySelectorAll("button").forEach(function(b){',
      '          b.style.background = "#ffffff"; b.style.color = "#243551"; b.style.borderColor = "#dadce0";',
      '          b.classList.remove("active");',
      '        });',
      '        window.event.target.style.background = "#1967d2";',
      '        window.event.target.style.color = "#ffffff";',
      '        window.event.target.style.borderColor = "#1967d2";',
      '        window.event.target.classList.add("active");',
      '      }',
      '    };',
      '',
      '    // 4. 엽서 시뮬레이터 인터랙션',
      '    document.querySelectorAll(".stack-simulator button").forEach(function(btn){',
      '      if (btn.innerText.indexOf("자동화 실행") !== -1) {',
      '        btn.addEventListener("click", function(){',
      '          var self = this; var orig = self.innerText;',
      '          self.disabled = true; self.innerText = "⚡ 파이프라인 가동 중...";',
      '          setTimeout(function(){',
      '            self.disabled = false; self.innerText = orig;',
      '            alert("✨ 모의 엽서 자동 발송 시뮬레이션(PDF 렌더링 ➔ Gmail 자동 발송)이 완료되었습니다!");',
      '          }, 1200);',
      '        });',
      '      }',
      '    });',
      '  <' + '/script>',
      '</body>',
      '</html>'
    ];

    return doc.join('\\n');
  }

  // ── export.html 자동 다운로드 트리거 엔진 ──
  window.exportStackToHtml = function(customFileName) {
    var fileName = customFileName || 'export.html';
    var htmlContent = compileSemanticHtml(canvasBlocks);
    var blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast('🎉 반응형 시맨틱 ' + fileName + ' 파일이 성공적으로 다운로드되었습니다!');
  };

  // ── 배포용 순수 HTML 복사 및 다운로드 이벤트 바인딩 (null-safe) ──
  var copyBtn = document.getElementById('copyHtmlBtn');
  if (copyBtn) {
    copyBtn.addEventListener('click', function(){
      currentData.stackBlocks = canvasBlocks;
      var html = (currentStackView === 'canvas') ? compileSemanticHtml(canvasBlocks) : renderReportHtml(currentData, true);
      navigator.clipboard.writeText(html).then(function(){
        showToast('📋 순수 배포용 반응형 HTML이 클립보드에 복사되었습니다.');
      });
    });
  }

  var dlBtn = document.getElementById('downloadHtmlBtn');
  if (dlBtn) {
    dlBtn.addEventListener('click', function(){
      if (currentStackView === 'canvas') {
        exportStackToHtml('export.html');
      } else {
        currentData.stackBlocks = canvasBlocks;
        var html = renderReportHtml(currentData, true);
        var blob = new Blob([html], { type: 'text/html;charset=utf-8' });
        var url = URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = (currentData.title || 'workflow-report').replace(/\\s+/g, '_') + '.html';
        a.click();
        URL.revokeObjectURL(url);
        showToast('💾 순수 배포용 HTML 파일이 다운로드되었습니다. (하이라이트 스크립트 제거됨)');
      }
    });
  }

  // ── 수직 스택(Linear Stack) 노션/구글 설문지형 캔버스 조작 엔진 ──
  var canvasBlocks = [];
  var selectedBlockId = null;
  var currentStackView = 'canvas';

  // ── 실행 취소 / 다시 실행 (Undo / Redo) 엔진 ──
  var historyStack = [];
  var redoHistory = [];
  var maxHistory = 40;
  var editDebounceTimer = null;

  function pushHistoryState() {
    var snapshot = JSON.stringify(canvasBlocks);
    if (historyStack.length > 0 && historyStack[historyStack.length - 1] === snapshot) {
      return;
    }
    historyStack.push(snapshot);
    if (historyStack.length > maxHistory) historyStack.shift();
    redoHistory = [];
    updateUndoRedoButtons();
    updateHeaderBadge();
  }

  window.undoStack = function() {
    if (historyStack.length <= 1) return;
    var current = historyStack.pop();
    redoHistory.push(current);
    var prev = historyStack[historyStack.length - 1];
    canvasBlocks = JSON.parse(prev);
    reindexBlockOrders();
    renderStackCanvas();
    updateLivePreview();
    updateUndoRedoButtons();
    updateHeaderBadge();
    showToast('↩️ 실행 취소되었습니다.');
  };

  window.redoStack = function() {
    if (redoHistory.length === 0) return;
    var next = redoHistory.pop();
    historyStack.push(next);
    canvasBlocks = JSON.parse(next);
    reindexBlockOrders();
    renderStackCanvas();
    updateLivePreview();
    updateUndoRedoButtons();
    updateHeaderBadge();
    showToast('↪️ 다시 실행되었습니다.');
  };

  function updateUndoRedoButtons() {
    var undoBtn = document.getElementById('undoBtn');
    var redoBtn = document.getElementById('redoBtn');
    if (undoBtn) {
      undoBtn.disabled = historyStack.length <= 1;
      undoBtn.style.opacity = (historyStack.length <= 1) ? '0.45' : '1';
      undoBtn.style.cursor = (historyStack.length <= 1) ? 'not-allowed' : 'pointer';
    }
    if (redoBtn) {
      redoBtn.disabled = redoHistory.length === 0;
      redoBtn.style.opacity = (redoHistory.length === 0) ? '0.45' : '1';
      redoBtn.style.cursor = (redoHistory.length === 0) ? 'not-allowed' : 'pointer';
    }
  }

  function updateHeaderBadge() {
    var count = canvasBlocks.length;
    var headerBadge = document.getElementById('headerBlockCountBadge');
    if (headerBadge) headerBadge.innerText = count + '개 블록 구성';
    var canvasBadge = document.getElementById('canvasBlockCountBadge');
    if (canvasBadge) canvasBadge.innerText = count + '개 블록 구성 중';
  }

  // 글로벌 키보드 단축키 (Ctrl+Z, Ctrl+Y, Ctrl+Shift+Z)
  window.addEventListener('keydown', function(e) {
    var tag = (e.target && e.target.tagName) || '';
    if (tag === 'INPUT' || tag === 'TEXTAREA' || (e.target && e.target.isContentEditable)) return;

    if ((e.ctrlKey || e.metaKey) && (e.key === 'z' || e.key === 'Z')) {
      e.preventDefault();
      if (e.shiftKey) {
        window.redoStack();
      } else {
        window.undoStack();
      }
    } else if ((e.ctrlKey || e.metaKey) && (e.key === 'y' || e.key === 'Y')) {
      e.preventDefault();
      window.redoStack();
    }
  });

  function reindexBlockOrders() {
    canvasBlocks.forEach(function(blk, idx) {
      blk.order = idx;
    });
    if (typeof currentData !== 'undefined') {
      currentData.stackBlocks = canvasBlocks;
    }
    updateHeaderBadge();
  }

  window.addBlockToStack = function(type, targetBlockId) {
    if (typeof STUDIO_CATALOG === 'undefined' || !STUDIO_CATALOG.templates[type]) {
      showToast('⚠️ 지원되지 않는 블록 타입입니다: ' + type);
      return;
    }

    var insertIdx = canvasBlocks.length;
    if (targetBlockId) {
      var foundIdx = canvasBlocks.findIndex(function(b){ return b.id === targetBlockId; });
      if (foundIdx !== -1) insertIdx = foundIdx + 1;
    } else if (selectedBlockId) {
      var foundIdx = canvasBlocks.findIndex(function(b){ return b.id === selectedBlockId; });
      if (foundIdx !== -1) insertIdx = foundIdx + 1;
    }

    var newNode = STUDIO_CATALOG.createNode(type, null, null, insertIdx);
    canvasBlocks.splice(insertIdx, 0, newNode);
    reindexBlockOrders();
    selectedBlockId = newNode.id;

    renderStackCanvas();
    pushHistoryState();

    setTimeout(function(){
      var el = document.getElementById('blockItem_' + newNode.id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 60);

    var blockName = (STUDIO_CATALOG.templates[type] && STUDIO_CATALOG.templates[type].name) || type;
    showToast('✨ [' + blockName + '] 블록이 추가되었습니다!');
    updateLivePreview();
  };

  window.moveBlockUp = function(e, blockId) {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    var idx = canvasBlocks.findIndex(function(b){ return b.id === blockId; });
    if (idx > 0) {
      var item = canvasBlocks.splice(idx, 1)[0];
      canvasBlocks.splice(idx - 1, 0, item);
      reindexBlockOrders();
      selectedBlockId = blockId;
      renderStackCanvas();
      pushHistoryState();
      showToast('🔼 블록이 한 칸 위로 이동했습니다.');
      updateLivePreview();
    }
  };

  window.moveBlockDown = function(e, blockId) {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    var idx = canvasBlocks.findIndex(function(b){ return b.id === blockId; });
    if (idx !== -1 && idx < canvasBlocks.length - 1) {
      var item = canvasBlocks.splice(idx, 1)[0];
      canvasBlocks.splice(idx + 1, 0, item);
      reindexBlockOrders();
      selectedBlockId = blockId;
      renderStackCanvas();
      pushHistoryState();
      showToast('🔽 블록이 한 칸 아래로 이동했습니다.');
      updateLivePreview();
    }
  };

  window.duplicateBlock = function(e, blockId) {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    var idx = canvasBlocks.findIndex(function(b){ return b.id === blockId; });
    if (idx !== -1) {
      var original = canvasBlocks[idx];
      var clone = JSON.parse(JSON.stringify(original));
      clone.id = original.type + '_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5);
      canvasBlocks.splice(idx + 1, 0, clone);
      reindexBlockOrders();
      selectedBlockId = clone.id;
      renderStackCanvas();
      pushHistoryState();
      setTimeout(function(){
        var el = document.getElementById('blockItem_' + clone.id);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 60);
      showToast('📋 블록이 복제되었습니다.');
      updateLivePreview();
    }
  };

  window.deleteBlockFromStack = function(e, blockId) {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    var idx = canvasBlocks.findIndex(function(b){ return b.id === blockId; });
    if (idx !== -1) {
      var removed = canvasBlocks.splice(idx, 1)[0];
      reindexBlockOrders();
      if (selectedBlockId === blockId) {
        selectedBlockId = (canvasBlocks[Math.min(idx, canvasBlocks.length - 1)]) ? canvasBlocks[Math.min(idx, canvasBlocks.length - 1)].id : null;
      }
      renderStackCanvas();
      pushHistoryState();
      showToast('🗑️ 블록이 삭제되었습니다.');
      updateLivePreview();
    }
  };

  window.selectStackBlock = function(blockId, e) {
    selectedBlockId = blockId;
    var items = document.querySelectorAll('.stack-block-item');
    items.forEach(function(it){
      if (it.getAttribute('data-id') === blockId) {
        it.classList.add('selected');
      } else {
        it.classList.remove('selected');
      }
    });
  };

  window.onCanvasBackgroundClick = function(e) {
    if (e.target.classList.contains('stack-canvas-scroll') || e.target.id === 'stackCanvasContainer') {
      selectedBlockId = null;
      var items = document.querySelectorAll('.stack-block-item');
      items.forEach(function(it){ it.classList.remove('selected'); });
    }
  };

  window.onContentEdited = function(el, blockId, fieldPath) {
    var blk = canvasBlocks.find(function(b){ return b.id === blockId; });
    if (!blk || !blk.data) return;
    var val = el.innerText;

    var parts = fieldPath.split('.');
    var curr = blk.data;
    for (var i = 0; i < parts.length - 1; i++) {
      var p = parts[i];
      if (curr[p] === undefined || curr[p] === null) {
        curr[p] = /^\\d+$/.test(parts[i + 1]) ? [] : {};
      }
      curr = curr[p];
    }
    var last = parts[parts.length - 1];
    if (Array.isArray(curr) && /^\\d+$/.test(last)) {
      curr[Number(last)] = val;
    } else {
      curr[last] = val;
    }

    if (typeof currentData !== 'undefined') {
      currentData.stackBlocks = canvasBlocks;
      var jsonArea = document.getElementById('jsonEditor');
      if (jsonArea && document.getElementById('jsonView').style.display !== 'none') {
        jsonArea.value = JSON.stringify(currentData, null, 2);
      }
    }

    clearTimeout(editDebounceTimer);
    editDebounceTimer = setTimeout(function(){
      pushHistoryState();
    }, 600);
  };

  window.selectPartsChip = function(blockId, catKey, chipValue) {
    var blk = canvasBlocks.find(function(b){ return b.id === blockId; });
    if (!blk || !blk.data || !blk.data.categories) return;
    var cat = blk.data.categories.find(function(c){ return c.key === catKey; });
    if (cat) {
      cat.selected = chipValue;
      var role = ((blk.data.categories.find(function(c){ return c.key === 'role'; }) || {}).selected) || '';
      var obj = ((blk.data.categories.find(function(c){ return c.key === 'objective'; }) || {}).selected) || '';
      var fmt = ((blk.data.categories.find(function(c){ return c.key === 'format'; }) || {}).selected) || '';
      var tone = ((blk.data.categories.find(function(c){ return c.key === 'tone'; }) || {}).selected) || '';
      var style = ((blk.data.categories.find(function(c){ return c.key === 'style'; }) || {}).selected) || '';

      var prompt = '당신은 ' + role + '입니다. ' + obj + '을(를) 완수하세요. 결과는 ' + fmt + ' 형식으로 작성하고, ' + tone + ' 어조를 유지하세요.';
      if (style) {
        prompt += ' [제약조건: ' + style + ']';
      }
      blk.data.assembledPrompt = prompt;
      renderStackCanvas();
      updateLivePreview();
    }
  };

  // ── 위젯 세부 설정 모달 (Widget Configuration Modal) 조작 엔진 ──
  var activeConfigBlockId = null;

  function escapeFormVal(s) {
    return String(s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function getFormVal(id) {
    var el = document.getElementById(id);
    return el ? el.value : '';
  }

  window.openWidgetConfigModal = function(e, blockId) {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    var blk = canvasBlocks.find(function(b){ return b.id === blockId; });
    if (!blk) return;

    activeConfigBlockId = blockId;
    var template = (typeof STUDIO_CATALOG !== 'undefined' && STUDIO_CATALOG.templates[blk.type]) || {};
    var icon = template.icon || '⚙️';
    var name = template.name || blk.type;

    var iconEl = document.getElementById('widgetConfigModalIcon');
    if (iconEl) iconEl.innerText = icon;
    var titleEl = document.getElementById('widgetConfigModalTitle');
    if (titleEl) titleEl.innerText = name + ' 세부 설정';
    var tagEl = document.getElementById('widgetConfigModalTypeTag');
    if (tagEl) tagEl.innerText = blk.type;

    var body = document.getElementById('widgetConfigModalBody');
    if (body) body.innerHTML = renderWidgetConfigFormHtml(blk);

    var modal = document.getElementById('widgetConfigModal');
    if (modal) modal.style.display = 'flex';
  };

  window.closeWidgetConfigModal = function() {
    var modal = document.getElementById('widgetConfigModal');
    if (modal) modal.style.display = 'none';
    activeConfigBlockId = null;
  };

  function renderWidgetConfigFormHtml(blk) {
    var d = blk.data || {};
    var s = blk.settings || {};

    if (blk.type === 'sectionContainer') {
      return '<div class="widget-form-section">' +
        '<div class="widget-section-title">📦 섹션 컨테이너 설정</div>' +
        '<div class="form-group">' +
          '<label>섹션 제목</label>' +
          '<input type="text" id="cfg_container_title" value="' + escapeFormVal(d.title || '') + '" placeholder="예: 주요 기획 및 전략 그룹">' +
        '</div>' +
        '<div class="form-group">' +
          '<label>섹션 요약 / 부제목</label>' +
          '<textarea id="cfg_container_subtitle" rows="2" placeholder="이 섹션의 목적과 포함된 내용을 설명하세요.">' + escapeFormVal(d.subtitle || '') + '</textarea>' +
        '</div>' +
      '</div>';
    }

    if (blk.type === 'divider') {
      return '<div class="widget-form-section">' +
        '<div class="widget-section-title">➖ 구분선 설정</div>' +
        '<div class="form-group">' +
          '<label>구분선 라벨 문구 (선택 사항)</label>' +
          '<input type="text" id="cfg_divider_label" value="' + escapeFormVal(d.label || '') + '" placeholder="예: SECTION DIVIDER 또는 비워두기">' +
        '</div>' +
      '</div>';
    }

    if (blk.type === 'spacer') {
      return '<div class="widget-form-section">' +
        '<div class="widget-section-title">↕️ 여백 (스페이서) 설정</div>' +
        '<div class="form-group">' +
          '<label>여백 높이 (픽셀, px)</label>' +
          '<input type="number" id="cfg_spacer_height" value="' + escapeFormVal(d.height || 36) + '" min="8" max="160" step="4">' +
        '</div>' +
      '</div>';
    }

    if (blk.type === 'flipCard') {
      return '<div class="widget-form-section">' +
        '<div class="widget-section-title">🎴 3D 플립 카드 - 앞면 (Front) 설정</div>' +
        '<div class="form-row">' +
          '<div class="form-group" style="flex:1;">' +
            '<label>앞면 상단 뱃지</label>' +
            '<input type="text" id="cfg_flip_badge" value="' + escapeFormVal(d.badge || '') + '" placeholder="예: MODULE 01">' +
          '</div>' +
          '<div class="form-group" style="width:120px;">' +
            '<label>액센트 색상</label>' +
            '<input type="color" id="cfg_flip_accentColor" value="' + escapeFormVal(d.accentColor || '#1967d2') + '" style="height:38px;padding:2px;">' +
          '</div>' +
        '</div>' +
        '<div class="form-group">' +
          '<label>앞면 제목</label>' +
          '<input type="text" id="cfg_flip_frontTitle" value="' + escapeFormVal(d.frontTitle || '') + '" placeholder="카드 앞면 제목">' +
        '</div>' +
        '<div class="form-group">' +
          '<label>앞면 요약 설명</label>' +
          '<textarea id="cfg_flip_frontDesc" rows="2" placeholder="카드 앞면 요약 설명">' + escapeFormVal(d.frontDesc || '') + '</textarea>' +
        '</div>' +
        '<div class="form-row">' +
          '<div class="form-group" style="flex:1;">' +
            '<label>앞면 버튼 문구</label>' +
            '<input type="text" id="cfg_flip_frontBtnText" value="' + escapeFormVal(d.frontBtnText || '자세히 보기 →') + '">' +
          '</div>' +
          '<div class="form-group" style="flex:1;">' +
            '<label>회전 안내 힌트</label>' +
            '<input type="text" id="cfg_flip_frontHint" value="' + escapeFormVal(d.frontHint || '카드를 누르면 상세 내용 ↻') + '">' +
          '</div>' +
        '</div>' +
      '</div>' +
      '<div class="widget-form-section">' +
        '<div class="widget-section-title">🔄 3D 플립 카드 - 뒷면 (Back) 및 이동 설정</div>' +
        '<div class="form-group">' +
          '<label>뒷면 상세 제목</label>' +
          '<input type="text" id="cfg_flip_backTitle" value="' + escapeFormVal(d.backTitle || '') + '" placeholder="카드 뒷면 상세 학습 목표">' +
        '</div>' +
        '<div class="form-group">' +
          '<label>뒷면 상세 설명</label>' +
          '<textarea id="cfg_flip_backDesc" rows="3" placeholder="카드 뒷면 상세 내용">' + escapeFormVal(d.backDesc || '') + '</textarea>' +
        '</div>' +
        '<div class="form-group">' +
          '<label>뒷면 태그 목록 (쉼표로 구분)</label>' +
          '<input type="text" id="cfg_flip_backTags" value="' + escapeFormVal((d.backTags || []).join(', ')) + '" placeholder="예: 이미지 생성, 책임 있는 AI, PARTS, Prompt Chaining">' +
          '<small style="color:#5f6368;font-size:.74rem;">※ 쉼표(,)로 구분하여 입력하면 개별 해시태그 칩(#)으로 생성됩니다.</small>' +
        '</div>' +
        '<div class="form-row">' +
          '<div class="form-group" style="flex:1;">' +
            '<label>뒷면 액션 버튼 문구</label>' +
            '<input type="text" id="cfg_flip_backBtnText" value="' + escapeFormVal(d.backBtnText || '모듈 실습 열기 →') + '">' +
          '</div>' +
          '<div class="form-group" style="flex:1;">' +
            '<label>클릭 이동 모듈 번호 (mt-goto)</label>' +
            '<input type="text" id="cfg_flip_mtGoto" value="' + escapeFormVal(d.mtGoto || '1') + '" placeholder="예: 1 또는 2, 3, 4">' +
          '</div>' +
        '</div>' +
        '<div class="widget-tip-box">' +
          '💡 <b>mt-goto 연동:</b> 뒷면 버튼 클릭 시 <code>postMessage({ type: "mt-goto", module: N })</code> 이벤트를 전송하여 해당 모듈(moduleN.html)로 즉시 전환하거나 부모 프레임과 연동합니다.' +
        '</div>' +
      '</div>';
    }

    if (blk.type === 'partsPrompt') {
      var cats = d.categories || [];
      function getCatChips(key, fallback) {
        var c = cats.find(function(it){ return it.key === key; });
        return c ? (c.chips || []).join(', ') : (fallback || '');
      }
      return '<div class="widget-form-section">' +
        '<div class="widget-section-title">🧩 PARTS 프롬프트 칩 기본 정보</div>' +
        '<div class="form-group">' +
          '<label>조립기 타이틀</label>' +
          '<input type="text" id="cfg_parts_title" value="' + escapeFormVal(d.title || '') + '" placeholder="예: Gemini 실무 프롬프트 조립기">' +
        '</div>' +
        '<div class="form-group">' +
          '<label>조립기 설명 문구</label>' +
          '<textarea id="cfg_parts_desc" rows="2" placeholder="조립기 사용 안내">' + escapeFormVal(d.desc || '') + '</textarea>' +
        '</div>' +
      '</div>' +
      '<div class="widget-form-section">' +
        '<div class="widget-section-title">🏷️ 각 태그(P, A, R, T, S) 칩 텍스트 (쉼표로 구분)</div>' +
        '<div class="form-group">' +
          '<label><b style="color:#1967d2;">P (Role / 역할):</b> AI 모델에게 부여할 전문 페르소나</label>' +
          '<input type="text" id="cfg_parts_p" value="' + escapeFormVal(getCatChips('role', '구글 시니어 TPM, 친근한 학생회 MT 총괄, 엄격한 안전 점검관')) + '">' +
        '</div>' +
        '<div class="form-group">' +
          '<label><b style="color:#1967d2;">A (Objective / 목표):</b> 완수해야 할 핵심 작업</label>' +
          '<input type="text" id="cfg_parts_a" value="' + escapeFormVal(getCatChips('objective', '2026 MT 기획안 수립, 실시간 예산안 산출, 비상연락망 체계 수립')) + '">' +
        '</div>' +
        '<div class="form-group">' +
          '<label><b style="color:#1967d2;">R (Result / 결과 형식):</b> 결과물 문서 구조/포맷</label>' +
          '<input type="text" id="cfg_parts_r" value="' + escapeFormVal(getCatChips('format', '마크다운 표, 실행 불릿 리스트, JSON 스키마')) + '">' +
        '</div>' +
        '<div class="form-group">' +
          '<label><b style="color:#1967d2;">T (Tone / 어조):</b> 문체 및 분위기</label>' +
          '<input type="text" id="cfg_parts_t" value="' + escapeFormVal(getCatChips('tone', '간결하고 전문적, 친절하고 상세함')) + '">' +
        '</div>' +
        '<div class="form-group">' +
          '<label><b style="color:#1967d2;">S (Style &amp; Constraint / 제약조건):</b> 길이, 마스킹, 가이드라인</label>' +
          '<input type="text" id="cfg_parts_s" value="' + escapeFormVal(getCatChips('style', '200자 이내 요약, 사내 기밀 마스킹 준수, 실행 체크리스트 포함')) + '">' +
        '</div>' +
      '</div>' +
      '<div class="widget-form-section">' +
        '<div class="widget-section-title">📋 원클릭 복사 본문 &amp; 버튼 설정</div>' +
        '<div class="form-group">' +
          '<label>원클릭 복사 프롬프트 본문</label>' +
          '<textarea id="cfg_parts_assembledPrompt" rows="3" style="font-family:monospace;font-size:.82rem;">' + escapeFormVal(d.assembledPrompt || '') + '</textarea>' +
        '</div>' +
        '<div class="form-group">' +
          '<label>복사 버튼 문구</label>' +
          '<input type="text" id="cfg_parts_copyBtnText" value="' + escapeFormVal(d.copyBtnText || '📋 프롬프트 복사') + '">' +
        '</div>' +
      '</div>';
    }

    if (blk.type === 'gasAccordion') {
      return '<div class="widget-form-section">' +
        '<div class="widget-section-title">📑 GAS 접이식 아코디언 기본 정보</div>' +
        '<div class="form-group">' +
          '<label>아코디언 타이틀</label>' +
          '<input type="text" id="cfg_gas_title" value="' + escapeFormVal(d.title || '') + '" placeholder="예: Google Apps Script 핵심 배포 코드">' +
        '</div>' +
        '<div class="form-group">' +
          '<label>서브 타이틀 / 부가 설명</label>' +
          '<textarea id="cfg_gas_subtitle" rows="2" placeholder="코드 요약 설명">' + escapeFormVal(d.subtitle || '') + '</textarea>' +
        '</div>' +
        '<div class="form-row">' +
          '<div class="form-group" style="flex:1;">' +
            '<label>로고 이미지 URL / 파일명</label>' +
            '<input type="text" id="cfg_gas_logoSrc" value="' + escapeFormVal(d.logoSrc || 'apps-script-logo.png') + '">' +
          '</div>' +
          '<div class="form-group" style="flex:1;">' +
            '<label>버튼/뱃지 문구</label>' +
            '<input type="text" id="cfg_gas_badgeText" value="' + escapeFormVal(d.badgeText || '코드 보기 ▾') + '">' +
          '</div>' +
        '</div>' +
      '</div>' +
      '<div class="widget-form-section">' +
        '<div class="widget-section-title">💻 펼쳐질 소스 코드 / 본문 내용</div>' +
        '<div class="form-row">' +
          '<div class="form-group" style="width:140px;">' +
            '<label>문법 언어</label>' +
            '<input type="text" id="cfg_gas_language" value="' + escapeFormVal(d.language || 'javascript') + '">' +
          '</div>' +
          '<div class="form-group" style="flex:1;display:flex;align-items:flex-end;padding-bottom:10px;">' +
            '<label style="display:flex;align-items:center;gap:8px;cursor:pointer;font-weight:700;color:var(--navy);margin:0;">' +
              '<input type="checkbox" id="cfg_gas_isOpen" ' + (d.isOpen ? 'checked' : '') + ' style="width:18px;height:18px;cursor:pointer;">' +
              '<span>최초 로드 시 펼침 (open 상태로 표시)</span>' +
            '</label>' +
          '</div>' +
        '</div>' +
        '<div class="form-group">' +
          '<label>펼쳐질 코드 / 본문 내용 전문</label>' +
          '<textarea id="cfg_gas_code" rows="9" class="widget-code-editor">' + escapeFormVal(d.code || '') + '</textarea>' +
        '</div>' +
      '</div>';
    }

    if (blk.type === 'postcardSimulator') {
      return '<div class="widget-form-section">' +
        '<div class="widget-section-title">✉️ 엽서 시뮬레이터 설정</div>' +
        '<div class="form-group">' +
          '<label>시뮬레이터 제목</label>' +
          '<input type="text" id="cfg_post_title" value="' + escapeFormVal(d.title || '') + '">' +
        '</div>' +
        '<div class="form-group">' +
          '<label>설명 문구</label>' +
          '<textarea id="cfg_post_desc" rows="2">' + escapeFormVal(d.desc || '') + '</textarea>' +
        '</div>' +
        '<div class="form-row">' +
          '<div class="form-group" style="flex:1;">' +
            '<label>실행 버튼 문구</label>' +
            '<input type="text" id="cfg_post_runBtnText" value="' + escapeFormVal(d.runBtnText || '⚡ 자동화 실행하기') + '">' +
          '</div>' +
          '<div class="form-group" style="flex:1;">' +
            '<label>초기화 버튼 문구</label>' +
            '<input type="text" id="cfg_post_resetBtnText" value="' + escapeFormVal(d.resetBtnText || '↺ 초기화') + '">' +
          '</div>' +
        '</div>' +
      '</div>';
    }

    if (blk.type === 'infoNote') {
      return '<div class="widget-form-section">' +
        '<div class="widget-section-title">💡 안내 노트 설정</div>' +
        '<div class="form-row">' +
          '<div class="form-group" style="flex:1;">' +
            '<label>노트 유형</label>' +
            '<select id="cfg_note_variant" style="height:38px;">' +
              '<option value="tip"' + (d.variant === 'tip' ? ' selected' : '') + '>팁 (Tip - 파랑)</option>' +
              '<option value="note"' + (d.variant === 'note' ? ' selected' : '') + '>참고 (Note - 초록)</option>' +
              '<option value="warn"' + (d.variant === 'warn' ? ' selected' : '') + '>주의 (Warn - 빨강)</option>' +
            '</select>' +
          '</div>' +
          '<div class="form-group" style="width:100px;">' +
            '<label>아이콘</label>' +
            '<input type="text" id="cfg_note_icon" value="' + escapeFormVal(d.icon || '💡') + '">' +
          '</div>' +
        '</div>' +
        '<div class="form-group">' +
          '<label>제목</label>' +
          '<input type="text" id="cfg_note_title" value="' + escapeFormVal(d.title || '') + '">' +
        '</div>' +
        '<div class="form-group">' +
          '<label>본문 내용</label>' +
          '<textarea id="cfg_note_content" rows="3">' + escapeFormVal(d.content || '') + '</textarea>' +
        '</div>' +
      '</div>';
    }

    // textButtonBlock fallback
    return '<div class="widget-form-section">' +
      '<div class="widget-section-title">🎯 텍스트 &amp; 액션 버튼 설정</div>' +
      '<div class="form-group">' +
        '<label>상단 아이브로우</label>' +
        '<input type="text" id="cfg_cta_eyebrow" value="' + escapeFormVal(d.eyebrow || '') + '">' +
      '</div>' +
      '<div class="form-group">' +
        '<label>타이틀</label>' +
        '<input type="text" id="cfg_cta_title" value="' + escapeFormVal(d.title || '') + '">' +
      '</div>' +
      '<div class="form-group">' +
        '<label>본문 설명</label>' +
        '<textarea id="cfg_cta_desc" rows="3">' + escapeFormVal(d.description || '') + '</textarea>' +
      '</div>' +
    '</div>';
  }

  window.applyWidgetConfig = function() {
    var blk = canvasBlocks.find(function(b){ return b.id === activeConfigBlockId; });
    if (!blk) return;

    var d = blk.data;
    if (blk.type === 'sectionContainer') {
      d.title = getFormVal('cfg_container_title');
      d.subtitle = getFormVal('cfg_container_subtitle');
    } else if (blk.type === 'divider') {
      d.label = getFormVal('cfg_divider_label');
    } else if (blk.type === 'spacer') {
      d.height = parseInt(getFormVal('cfg_spacer_height'), 10) || 36;
    } else if (blk.type === 'flipCard') {
      d.badge = getFormVal('cfg_flip_badge');
      d.accentColor = getFormVal('cfg_flip_accentColor');
      d.frontTitle = getFormVal('cfg_flip_frontTitle');
      d.frontDesc = getFormVal('cfg_flip_frontDesc');
      d.frontBtnText = getFormVal('cfg_flip_frontBtnText');
      d.frontHint = getFormVal('cfg_flip_frontHint');
      d.backTitle = getFormVal('cfg_flip_backTitle');
      d.backDesc = getFormVal('cfg_flip_backDesc');
      d.backTags = getFormVal('cfg_flip_backTags').split(',').map(function(s){ return s.trim(); }).filter(Boolean);
      d.backBtnText = getFormVal('cfg_flip_backBtnText');
      d.mtGoto = getFormVal('cfg_flip_mtGoto') || '1';
    } else if (blk.type === 'partsPrompt') {
      d.title = getFormVal('cfg_parts_title');
      d.desc = getFormVal('cfg_parts_desc');

      function parseChips(valStr, defArr) {
        var arr = valStr.split(',').map(function(s){ return s.trim(); }).filter(Boolean);
        return arr.length > 0 ? arr : defArr;
      }

      var roleChips = parseChips(getFormVal('cfg_parts_p'), ['구글 시니어 TPM', '친근한 학생회 MT 총괄', '엄격한 안전 점검관']);
      var objChips = parseChips(getFormVal('cfg_parts_a'), ['2026 MT 기획안 수립', '실시간 예산안 산출', '비상연락망 체계 수립']);
      var fmtChips = parseChips(getFormVal('cfg_parts_r'), ['마크다운 표', '실행 불릿 리스트', 'JSON 스키마']);
      var toneChips = parseChips(getFormVal('cfg_parts_t'), ['간결하고 전문적', '친절하고 상세함']);
      var styleChips = parseChips(getFormVal('cfg_parts_s'), ['200자 이내 요약', '사내 기밀 마스킹 준수', '실행 체크리스트 포함']);

      d.categories = [
        { key: 'role', name: 'P (Role / 역할)', chips: roleChips, selected: roleChips[0] },
        { key: 'objective', name: 'A (Objective / 목표)', chips: objChips, selected: objChips[0] },
        { key: 'format', name: 'R (Result / 결과 형식)', chips: fmtChips, selected: fmtChips[0] },
        { key: 'tone', name: 'T (Tone / 어조)', chips: toneChips, selected: toneChips[0] },
        { key: 'style', name: 'S (Style / 제약조건)', chips: styleChips, selected: styleChips[0] }
      ];

      d.assembledPrompt = getFormVal('cfg_parts_assembledPrompt');
      d.copyBtnText = getFormVal('cfg_parts_copyBtnText');
    } else if (blk.type === 'gasAccordion') {
      d.title = getFormVal('cfg_gas_title');
      d.subtitle = getFormVal('cfg_gas_subtitle');
      d.logoSrc = getFormVal('cfg_gas_logoSrc');
      d.badgeText = getFormVal('cfg_gas_badgeText');
      d.language = getFormVal('cfg_gas_language');
      var openCheck = document.getElementById('cfg_gas_isOpen');
      d.isOpen = openCheck ? openCheck.checked : false;
      d.code = getFormVal('cfg_gas_code');
    } else if (blk.type === 'postcardSimulator') {
      d.title = getFormVal('cfg_post_title');
      d.desc = getFormVal('cfg_post_desc');
      d.runBtnText = getFormVal('cfg_post_runBtnText');
      d.resetBtnText = getFormVal('cfg_post_resetBtnText');
    } else if (blk.type === 'infoNote') {
      d.variant = getFormVal('cfg_note_variant');
      d.icon = getFormVal('cfg_note_icon');
      d.title = getFormVal('cfg_note_title');
      d.content = getFormVal('cfg_note_content');
    } else if (blk.type === 'textButtonBlock') {
      d.eyebrow = getFormVal('cfg_cta_eyebrow');
      d.title = getFormVal('cfg_cta_title');
      d.description = getFormVal('cfg_cta_desc');
    }

    reindexBlockOrders();
    renderStackCanvas();
    pushHistoryState();
    updateLivePreview();
    closeWidgetConfigModal();

    var name = (typeof STUDIO_CATALOG !== 'undefined' && STUDIO_CATALOG.templates[blk.type] && STUDIO_CATALOG.templates[blk.type].name) || blk.type;
    showToast('✨ [' + name + '] 위젯 설정이 즉시 반영되었습니다!');
  };

  window.renderStackCanvas = function() {
    var container = document.getElementById('stackCanvasContainer');
    var badge = document.getElementById('canvasBlockCountBadge');
    if (badge) {
      badge.innerText = canvasBlocks.length + '개 블록 구성 중';
    }
    if (!container) return;

    if (canvasBlocks.length === 0) {
      container.innerHTML = '<div class="empty-canvas-state">' +
        '<div style="font-size:2.4rem;margin-bottom:8px;">📝</div>' +
        '<h3 style="margin:0 0 6px;color:var(--navy);font-size:1.15rem;font-weight:800;">캔버스가 비어 있습니다</h3>' +
        '<p style="margin:0 0 16px;color:var(--muted);font-size:.88rem;">좌측 블록 팔레트에서 원하는 구조나 컴포넌트를 추가하세요.</p>' +
        '<button class="btn primary" onclick="addBlockToStack(\\'textButtonBlock\\')">+ 첫 블록 추가하기</button>' +
        '</div>';
      return;
    }

    var html = '';
    canvasBlocks.forEach(function(blk, idx) {
      var isSelected = blk.id === selectedBlockId;
      var template = (typeof STUDIO_CATALOG !== 'undefined' && STUDIO_CATALOG.templates[blk.type]) || {};
      var blockName = template.name || blk.type;

      html += '<div class="stack-block-item' + (isSelected ? ' selected' : '') + '" id="blockItem_' + blk.id + '" data-id="' + blk.id + '" onclick="selectStackBlock(\\'' + blk.id + '\\', event)">' +
        '<!-- Floating Action Bar -->' +
        '<div class="block-floating-bar" onclick="event.stopPropagation()">' +
          '<div class="block-info-tag">' +
            '<span class="block-order-badge">№ ' + (idx + 1) + '</span>' +
            '<span class="block-name-tag">' + blockName + '</span>' +
          '</div>' +
          '<div class="block-actions-group">' +
            '<button class="fab-btn" onclick="openWidgetConfigModal(event, \\'' + blk.id + '\\')" title="블록 세부 설정 (인터랙션 전용)">⚙️ 설정</button>' +
            '<button class="fab-btn" onclick="moveBlockUp(event, \\'' + blk.id + '\\')" title="위로 이동"' + (idx === 0 ? ' disabled style="opacity:0.35;cursor:not-allowed;"' : '') + '>▲</button>' +
            '<button class="fab-btn" onclick="moveBlockDown(event, \\'' + blk.id + '\\')" title="아래로 이동"' + (idx === canvasBlocks.length - 1 ? ' disabled style="opacity:0.35;cursor:not-allowed;"' : '') + '>▼</button>' +
            '<button class="fab-btn" onclick="duplicateBlock(event, \\'' + blk.id + '\\')" title="블록 복제 (바로 아래 복사)">📋 복제</button>' +
            '<button class="fab-btn danger" onclick="deleteBlockFromStack(event, \\'' + blk.id + '\\')" title="블록 삭제">🗑️ 삭제</button>' +
          '</div>' +
        '</div>' +
        '<!-- Block Inner Content -->' +
        '<div class="block-inner-content">' +
          (typeof STUDIO_CATALOG !== 'undefined' ? STUDIO_CATALOG.renderBlockHtml(blk, true) : '<div style="padding:20px;">' + blk.type + '</div>') +
        '</div>' +
      '</div>';
    });

    container.innerHTML = html;
  };

  window.switchStackView = function(view) {
    currentStackView = view;
    var canvasView = document.getElementById('stackCanvasView');
    var previewView = document.getElementById('previewFrameView');
    var btnCanvas = document.getElementById('viewBtnCanvas');
    var btnPreview = document.getElementById('viewBtnPreview');
    var toggleBtn = document.getElementById('togglePreviewBtn');
    var icon = document.getElementById('previewBtnIcon');
    var label = document.getElementById('previewBtnLabel');

    if (view === 'preview') {
      if (canvasView) canvasView.style.display = 'none';
      if (previewView) previewView.style.display = 'flex';
      if (btnCanvas) btnCanvas.classList.remove('active');
      if (btnPreview) btnPreview.classList.add('active');
      if (icon) icon.innerText = '📝';
      if (label) label.innerText = '캔버스 편집';
      if (toggleBtn) toggleBtn.classList.add('primary');
      updateLivePreview();
    } else {
      if (canvasView) canvasView.style.display = 'flex';
      if (previewView) previewView.style.display = 'none';
      if (btnCanvas) btnCanvas.classList.add('active');
      if (btnPreview) btnPreview.classList.remove('active');
      if (icon) icon.innerText = '👁️';
      if (label) label.innerText = '미리보기 모드';
      if (toggleBtn) toggleBtn.classList.remove('primary');
      renderStackCanvas();
    }
  };

  window.togglePreviewMode = function() {
    if (currentStackView === 'canvas') {
      window.switchStackView('preview');
    } else {
      window.switchStackView('canvas');
    }
  };

  function initCanvasBlocks() {
    if (currentData && currentData.stackBlocks && Array.isArray(currentData.stackBlocks) && currentData.stackBlocks.length > 0) {
      canvasBlocks = currentData.stackBlocks;
    } else if (typeof STUDIO_CATALOG !== 'undefined') {
      canvasBlocks = [
        STUDIO_CATALOG.createNode('textButtonBlock', {
          eyebrow: "2026 AI AUTOMATION",
          title: "스마트 워크플로우 제작 스튜디오",
          description: "원하는 블록을 순차적으로 쌓고, 실시간으로 텍스트를 인라인 직접 편집하며 최적의 자동화 페이지를 구성하세요."
        }, { align: "center", theme: "gradient" }, 0),
        STUDIO_CATALOG.createNode('partsPrompt', null, { align: "center", theme: "blue" }, 1),
        STUDIO_CATALOG.createNode('flipCard', null, { align: "center", theme: "light" }, 2)
      ];
      if (currentData) currentData.stackBlocks = canvasBlocks;
    }
    reindexBlockOrders();
    renderStackCanvas();
    pushHistoryState();
  }

  // ── 초기화: 드롭다운 채우기 및 폼 렌더링 ──
  updatePresetDropdown();
  syncFormFromData();
  initCanvasBlocks();
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
<title>Gemini Studio - 비주얼 폼 워크플로우 제작 엔진</title>
<link rel="preload" href="./assets/subset-Pretendard-Regular.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="./assets/subset-Pretendard-Bold.woff2" as="font" type="font/woff2" crossorigin>
<style>
  @font-face { font-family: "Pretendard"; font-weight: 400; font-display: swap; src: url("./assets/subset-Pretendard-Regular.woff2") format("woff2"); }
  @font-face { font-family: "Pretendard"; font-weight: 600; font-display: swap; src: url("./assets/subset-Pretendard-SemiBold.woff2") format("woff2"); }
  @font-face { font-family: "Pretendard"; font-weight: 700; font-display: swap; src: url("./assets/subset-Pretendard-Bold.woff2") format("woff2"); }
  @font-face { font-family: "Pretendard"; font-weight: 800; font-display: swap; src: url("./assets/subset-Pretendard-ExtraBold.woff2") format("woff2"); }

  :root {
    --primary: #1a73e8;
    --navy: #0b1a2c;
    --navy-2: #243551;
    --bg: #f8fafd;
    --paper: #ffffff;
    --text: #202124;
    --muted: #5f6368;
    --line: #dadce0;
    --orange: #ea580c;
  }

  * { box-sizing: border-box; }
  body {
    margin: 0; padding: 0; font-family: "Pretendard", system-ui, sans-serif;
    background: #f1f3f4; color: var(--text); height: 100vh; display: flex; flex-direction: column; overflow: hidden;
  }

  /* 상단 헤더 */
  .studio-header {
    background: #ffffff; border-bottom: 1px solid var(--line);
    padding: 10px 20px; display: flex; align-items: center; justify-content: space-between;
    height: 56px; flex-shrink: 0; box-shadow: 0 1px 3px rgba(60,64,67,.08); z-index: 10;
  }
  .brand { display: flex; align-items: center; gap: 10px; font-weight: 800; font-size: 1.05rem; color: var(--navy); }
  .brand .dot { width: 10px; height: 10px; border-radius: 50%; background: #1a73e8; display: inline-block; }
  .actions { display: flex; align-items: center; gap: 8px; }
  .btn {
    font-family: inherit; font-size: .84rem; font-weight: 600; padding: 7px 14px;
    border-radius: 8px; border: 1px solid var(--line); background: #ffffff;
    color: var(--text); cursor: pointer; transition: all .15s ease;
    display: inline-flex; align-items: center; gap: 6px;
  }
  .btn:hover { background: #f8f9fa; border-color: #c6dafc; }
  .btn.primary { background: #1a73e8; color: #ffffff; border-color: #1a73e8; }
  .btn.primary:hover { background: #174ea6; }

  /* 템플릿 셀렉트 */
  .preset-select {
    font-family: inherit; font-size: .84rem; font-weight: 600; padding: 7px 12px;
    border-radius: 8px; border: 1px solid #c6dafc; background: #f8faff; color: #1a73e8;
    outline: none; cursor: pointer; transition: border-color .15s;
  }
  .preset-select:focus { border-color: #1a73e8; box-shadow: 0 0 0 2px rgba(26,115,232,.15); }

  /* 워크스페이스 분할 */
  .workspace { display: flex; flex: 1; height: calc(100vh - 56px); overflow: hidden; }

  /* 좌측 에디터 */
  .editor-pane {
    width: 480px; flex-shrink: 0; background: #ffffff; border-right: 1px solid var(--line);
    display: flex; flex-direction: column; height: 100%;
  }
  .editor-tabs {
    display: flex; border-bottom: 1px solid var(--line); background: #f8f9fa; padding: 4px 8px 0;
  }
  .tab-btn {
    padding: 9px 18px; border: none; background: transparent; font-family: inherit;
    font-size: .86rem; font-weight: 600; color: var(--muted); cursor: pointer;
    border-bottom: 2px solid transparent; transition: all .15s;
  }
  .tab-btn.active { color: var(--primary); border-bottom-color: var(--primary); font-weight: 700; background: #ffffff; }

  .editor-scroll { flex: 1; overflow-y: auto; padding: 18px 20px; }
  
  /* 폼 요소 공통 */
  .form-group { margin-bottom: 14px; position: relative; }
  .form-group label {
    display: block; font-size: .80rem; font-weight: 700; color: var(--muted);
    margin-bottom: 6px; text-transform: uppercase; letter-spacing: .04em;
  }
  .form-group input, .form-group textarea, .form-group select {
    width: 100%; font-family: inherit; font-size: .88rem; padding: 9px 12px;
    border-radius: 8px; border: 1px solid var(--line); background: #ffffff;
    color: var(--text); box-sizing: border-box; transition: border-color .15s, box-shadow .15s;
  }
  .form-group input:focus, .form-group textarea:focus, .form-group select:focus {
    outline: none; border-color: var(--orange); box-shadow: 0 0 0 3px rgba(234,88,12,.18);
  }
  .form-group textarea { resize: vertical; min-height: 70px; }

  /* ── 권역 구분 헤더 바 (섹션 타이틀 + [+ 컴포넌트 추가 ▾] 신설) ── */
  .section-divider-bar {
    display: flex; align-items: center; justify-content: space-between;
    padding: 10px 14px; margin-top: 18px; margin-bottom: 8px;
    background: #f1f3f4; border-radius: 10px; border-left: 4px solid var(--primary);
  }
  .section-divider-bar:first-of-type { margin-top: 0; }
  .section-divider-left { display: flex; align-items: center; gap: 8px; }
  .sec-icon { font-size: 1.15rem; line-height: 1; }
  .sec-title { font-size: .88rem; font-weight: 800; color: var(--navy); }
  .sec-type-badge { font-size: .66rem; font-weight: 800; padding: 2px 6px; border-radius: 4px; }
  .sec-type-badge.layout { background: #e8f0fe; color: #1967d2; }
  .sec-type-badge.blocks { background: #f3e8fd; color: #7627bb; }

  .add-block-btn {
    display: inline-flex; align-items: center; gap: 4px; font-family: inherit;
    font-size: .78rem; font-weight: 700; color: #ffffff; background: #1967d2;
    border: 1px solid #1967d2; padding: 5px 12px; border-radius: 7px; cursor: pointer;
    transition: all .15s ease; box-shadow: 0 1px 3px rgba(25,103,210,.2);
  }
  .add-block-btn:hover {
    background: #185abc; border-color: #185abc; transform: translateY(-1px);
    box-shadow: 0 3px 8px rgba(25,103,210,.3);
  }

  .add-subblock-btn {
    display: inline-flex; align-items: center; gap: 5px; font-family: inherit;
    font-size: .75rem; font-weight: 700; color: #1967d2; background: #eef5fe;
    border: 1px dashed #8ab4f8; padding: 6px 12px; border-radius: 8px; cursor: pointer;
    transition: all .15s ease; width: 100%; justify-content: center; margin-top: 8px;
  }
  .add-subblock-btn:hover {
    background: #d2e3fc; border-color: #1967d2; color: #174ea6;
  }

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

  /* ── 🛠️ 툴바 & 도구 모음 섹션 (Collapsible Card) ── */
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
  .dock-tool-btn {
    position: relative; display: flex; align-items: center; gap: 8px; padding: 9px 11px;
    background: #f8f9fa; border: 1px solid var(--line); border-radius: 10px;
    cursor: pointer; font-family: inherit; color: var(--navy-2);
    transition: all .16s ease; text-align: left;
  }
  .dock-tool-btn:hover {
    background: #ffffff; border-color: #c6dafc;
    box-shadow: 0 2px 8px rgba(25,103,210,.08); transform: translateY(-1px);
  }
  .dock-tool-btn.active {
    background: #eef5fe; border-color: #8ab4f8; color: #1967d2;
    box-shadow: 0 0 0 2px rgba(25,103,210,.14);
  }
  .dock-tool-btn .dock-icon { font-size: 1.15rem; line-height: 1; flex-shrink: 0; }
  .dock-tool-btn .dock-label-group { display: flex; flex-direction: column; flex: 1; min-width: 0; }
  .dock-tool-btn .dock-name { font-size: .82rem; font-weight: 700; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .dock-tool-btn .dock-sub { font-size: .70rem; color: #70757a; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .dock-tool-btn.active .dock-sub { color: #1a73e8; font-weight: 600; }
  .dock-tool-btn .dock-pill {
    font-size: .66rem; font-weight: 800; padding: 2px 6px; border-radius: 5px;
    background: #dadce0; color: #5f6368; flex-shrink: 0; margin-left: auto;
  }
  .dock-tool-btn.active .dock-pill { background: #1967d2; color: #ffffff; }

  /* 툴 우측 '?' 도움말 아이콘 (조화로운 플렉스 인라인 배치) */
  .tool-help-btn {
    width: 20px; height: 20px; border-radius: 50%;
    border: 1px solid #dadce0; background: #ffffff; color: #5f6368; font-size: 11px; font-weight: 800;
    display: inline-flex; align-items: center; justify-content: center; cursor: pointer; line-height: 1;
    transition: all .14s ease; flex-shrink: 0; padding: 0; margin-left: 4px;
  }
  .tool-help-btn:hover {
    background: #1967d2; color: #fff; border-color: #1967d2; transform: scale(1.12);
    box-shadow: 0 2px 6px rgba(25,103,210,.25);
  }

  .tb-sub-chip {
    font-family: inherit; font-size: .75rem; font-weight: 600; padding: 5px 10px;
    border-radius: 999px; border: 1px solid var(--line); background: #ffffff; color: #5f6368;
    cursor: pointer; transition: all .14s;
  }
  .tb-sub-chip.active { background: #e8f0fe; color: #1967d2; border-color: #c6dafc; font-weight: 700; }
  .tb-sub-chip:hover { border-color: #1967d2; }

  /* ── 2단계 하이라이트 스타일 (Chrome DevTools Elements 스타일) ── */
  .editor-inspect-active {
    border-color: #1a73e8 !important;
    box-shadow: 0 0 0 3px rgba(26,115,232,0.28), 0 8px 24px rgba(26,115,232,0.12) !important;
    background: #f4f8ff !important;
    transform: translateY(-1px);
    transition: all .15s ease-out !important;
  }
  .editor-inspect-subitem-active {
    border-color: #ea580c !important;
    box-shadow: 0 0 0 3px rgba(234,88,12,0.28), 0 4px 14px rgba(234,88,12,0.15) !important;
    background: #fff8f5 !important;
    border-radius: 8px !important;
    transition: all .15s ease-out !important;
  }

  /* 우측 미리보기 */
  .preview-pane { flex: 1; display: flex; flex-direction: column; height: 100%; background: #ffffff; overflow: hidden; }
  .preview-bar {
    padding: 10px 18px; border-bottom: 1px solid var(--line); background: #ffffff;
    display: flex; align-items: center; justify-content: space-between; font-size: .84rem;
    font-weight: 600; color: var(--navy); flex-shrink: 0; gap: 12px;
  }
  .preview-dots { display: flex; gap: 6px; }
  .pdot { width: 10px; height: 10px; border-radius: 50%; }
  .pdot.red { background: #ea4335; }
  .pdot.yellow { background: #fbbc04; }
  .pdot.green { background: #34a853; }
  .preview-iframe { width: 100%; height: 100%; border: none; background: #f8fafd; }

  /* 뷰 모드 전환 버튼 */
  .view-tab-group {
    display: inline-flex;
    background: #f1f3f4;
    border-radius: 8px;
    padding: 3px;
    gap: 3px;
  }
  .view-tab-btn {
    border: none;
    background: transparent;
    padding: 5px 12px;
    font-size: .78rem;
    font-weight: 700;
    color: #5f6368;
    border-radius: 6px;
    cursor: pointer;
    transition: all .15s ease;
  }
  .view-tab-btn:hover {
    color: var(--navy);
  }
  .view-tab-btn.active {
    background: #ffffff;
    color: #1a73e8;
    box-shadow: 0 1px 4px rgba(0,0,0,0.12);
  }

  /* 스택 캔버스 빠른 추가 툴바 */
  .canvas-stack-toolbar {
    padding: 8px 16px;
    background: #ffffff;
    border-bottom: 1px solid var(--line);
    display: flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
    flex-shrink: 0;
  }
  .canvas-tool-chip {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    padding: 5px 11px;
    background: #f8fafd;
    border: 1px solid #d4e2ff;
    border-radius: 8px;
    font-size: .76rem;
    font-weight: 700;
    color: #1967d2;
    cursor: pointer;
    transition: all .12s ease;
  }
  .canvas-tool-chip:hover {
    background: #e8f0fe;
    border-color: #1a73e8;
    transform: translateY(-1px);
    box-shadow: 0 2px 6px rgba(26,115,232,0.15);
  }
  .canvas-tool-chip:active {
    transform: translateY(0);
  }

  /* 스택 캔버스 스크롤 및 컨테이너 */
  .stack-canvas-scroll {
    flex: 1;
    overflow-y: auto;
    overscroll-behavior: contain;
    -webkit-overflow-scrolling: touch;
    background: #f4f6fa;
    padding: 24px 20px 80px;
    position: relative;
  }
  .stack-canvas-container {
    max-width: 920px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 16px;
    min-height: 200px;
  }
  .empty-canvas-state {
    text-align: center;
    padding: 60px 20px;
    background: #ffffff;
    border: 2px dashed #dadce0;
    border-radius: 16px;
    margin: 20px 0;
  }

  /* 노션 / 구글 설문지형 블록 아이템 */
  .stack-block-item {
    position: relative;
    background: #ffffff;
    border: 1.5px solid #e1e4e8;
    border-radius: 16px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.03);
    transition: border-color .15s ease, box-shadow .15s ease;
    cursor: default;
  }
  .stack-block-item:hover {
    border-color: #c6dafc;
    box-shadow: 0 6px 18px rgba(26,115,232,0.08);
  }
  .stack-block-item.selected {
    border-color: #1a73e8;
    box-shadow: 0 0 0 3px rgba(26,115,232,0.18), 0 8px 24px rgba(26,115,232,0.12);
  }

  /* 블록 우측 상단 플로팅 액션 바 (Notion / Google Forms 스타일) */
  .block-floating-bar {
    position: absolute;
    top: -14px;
    right: 14px;
    z-index: 50;
    background: #ffffff;
    border: 1px solid #dadce0;
    border-radius: 999px;
    padding: 3px 6px;
    box-shadow: 0 4px 14px rgba(0,0,0,0.12);
    display: flex;
    align-items: center;
    gap: 5px;
    opacity: 0;
    transform: translateY(4px);
    transition: opacity .15s ease, transform .15s ease;
    pointer-events: none;
  }
  .stack-block-item:hover .block-floating-bar,
  .stack-block-item.selected .block-floating-bar {
    opacity: 1;
    transform: translateY(0);
    pointer-events: auto;
  }
  .block-info-tag {
    display: flex;
    align-items: center;
    gap: 4px;
    padding-right: 4px;
    border-right: 1px solid #eee;
  }
  .block-order-badge {
    font-size: 10px;
    font-weight: 800;
    background: #f1f3f4;
    color: #5f6368;
    padding: 2px 6px;
    border-radius: 999px;
  }
  .block-name-tag {
    font-size: 11px;
    font-weight: 700;
    color: #1967d2;
    background: #e8f0fe;
    padding: 2px 7px;
    border-radius: 999px;
    white-space: nowrap;
  }
  .block-actions-group {
    display: flex;
    align-items: center;
    gap: 2px;
  }
  .fab-btn {
    border: none;
    background: transparent;
    color: #5f6368;
    font-size: 11px;
    font-weight: 700;
    padding: 3px 6px;
    border-radius: 6px;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 2px;
    transition: all .1s ease;
  }
  .fab-btn:hover {
    background: #f1f3f4;
    color: var(--navy);
  }
  .fab-btn.danger:hover {
    background: #fce8e6;
    color: #d93025;
  }

  /* 블록 내부 렌더 컨테이너 */
  .block-inner-content {
    padding: 8px 12px;
  }

  /* contenteditable 인라인 직접 편집 포커스 스타일 */
  [contenteditable="true"] {
    outline: none;
    cursor: text;
    border-radius: 4px;
    transition: background .12s ease, box-shadow .12s ease;
  }
  [contenteditable="true"]:hover {
    background: rgba(26, 115, 232, 0.06);
  }
  [contenteditable="true"]:focus {
    background: #ffffff;
    box-shadow: 0 0 0 2px #1a73e8;
    border-radius: 4px;
  }

  /* 하단 빠른 블록 추가 셸프 */
  .canvas-bottom-shelf {
    max-width: 920px;
    margin: 28px auto 0;
  }
  .shelf-line-wrap {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 14px;
  }
  .shelf-line {
    flex: 1;
    height: 1px;
    background: #dadce0;
  }
  .shelf-label {
    font-size: .80rem;
    font-weight: 800;
    color: var(--muted);
    white-space: nowrap;
  }
  .shelf-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    gap: 10px;
  }
  .shelf-card-btn {
    display: flex;
    align-items: center;
    gap: 10px;
    background: #ffffff;
    border: 1px solid #dadce0;
    border-radius: 12px;
    padding: 10px 14px;
    text-align: left;
    cursor: pointer;
    transition: all .15s ease;
  }
  .shelf-card-btn:hover {
    border-color: #1a73e8;
    box-shadow: 0 4px 12px rgba(26,115,232,0.12);
    transform: translateY(-1px);
    background: #f8fafd;
  }
  .shelf-icon {
    font-size: 1.35rem;
    line-height: 1;
    flex-shrink: 0;
  }
  .shelf-text {
    display: flex;
    flex-direction: column;
    min-width: 0;
  }
  .shelf-title {
    font-size: .82rem;
    font-weight: 800;
    color: var(--navy);
  }
  .shelf-sub {
    font-size: .70rem;
    color: var(--muted);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  /* 위젯 세부 설정 모달 전용 스타일 */
  .widget-modal-card {
    width: 620px;
    max-width: 92vw;
    max-height: 88vh;
    display: flex;
    flex-direction: column;
  }
  .widget-modal-body {
    padding: 20px;
    overflow-y: auto;
    font-size: .88rem;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  .widget-modal-tag {
    font-size: .70rem;
    font-weight: 700;
    color: #1967d2;
    background: #e8f0fe;
    border: 1px solid #c6dafc;
    padding: 2px 8px;
    border-radius: 999px;
    margin-left: 6px;
  }
  .widget-form-section {
    background: #f8fafd;
    border: 1px solid #e1ecfa;
    border-radius: 12px;
    padding: 14px 16px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .widget-section-title {
    font-size: .85rem;
    font-weight: 800;
    color: var(--navy);
    display: flex;
    align-items: center;
    gap: 6px;
    padding-bottom: 6px;
    border-bottom: 1px solid #e3e8ee;
  }
  .widget-tip-box {
    background: #fef7e0;
    border: 1px solid #f9ab00;
    border-radius: 8px;
    padding: 9px 12px;
    font-size: .80rem;
    color: #5c3800;
    line-height: 1.5;
  }
  .form-row {
    display: flex;
    gap: 10px;
    align-items: flex-start;
  }
  .widget-code-editor {
    font-family: Consolas, monospace;
    font-size: .82rem;
    white-space: pre;
    line-height: 1.5;
    background: #1f2d44;
    color: #f8fafd;
    border-radius: 8px;
    border: 1px solid #3c4d69;
    padding: 10px;
  }

  /* JSON 모드 */
  #jsonEditor {
    width: 100%; height: 100%; font-family: "Consolas", monospace; font-size: .82rem;
    padding: 16px; border: none; background: #1e1e1e; color: #d4d4d4; resize: none; outline: none;
    box-sizing: border-box; line-height: 1.5;
  }

  /* 토스트 */
  .toast-notification {
    position: fixed; bottom: 24px; right: 24px; background: #202124; color: #fff;
    padding: 12px 20px; border-radius: 10px; font-size: .86rem; font-weight: 600;
    box-shadow: 0 8px 24px rgba(0,0,0,.25); z-index: 99999; animation: toastIn .2s ease;
  }
  @keyframes toastIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

  /* 팝오버 (블록 선택 메뉴) (요구사항 2) */
  .block-picker-popover {
    position: absolute; z-index: 10000; background: #ffffff;
    border: 1px solid #dadce0; border-radius: 12px; padding: 8px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.18), 0 2px 8px rgba(0,0,0,0.08);
    min-width: 320px; max-width: 380px; display: none; flex-direction: column; gap: 4px;
    font-family: inherit; animation: popoverFadeIn .15s ease-out;
  }
  @keyframes popoverFadeIn {
    from { opacity: 0; transform: translateY(-6px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .picker-header {
    padding: 6px 8px 8px; border-bottom: 1px solid #f1f3f4; margin-bottom: 4px;
  }
  .picker-title { font-size: .82rem; font-weight: 800; color: var(--navy); display: flex; align-items: center; gap: 6px; }
  .picker-desc { font-size: .70rem; color: #5f6368; margin-top: 2px; }
  .picker-item {
    display: flex; align-items: center; justify-content: space-between; gap: 8px;
    padding: 8px 10px; border-radius: 8px; cursor: pointer; transition: all .12s ease;
    border: 1px solid transparent; background: #f8f9fa;
  }
  .picker-item:hover {
    background: #eef5fe; border-color: #c6dafc;
  }
  .picker-item-left {
    display: flex; align-items: center; gap: 8px; min-width: 0; flex: 1;
  }
  .picker-item-icon { font-size: 1.15rem; line-height: 1; flex-shrink: 0; }
  .picker-item-text { display: flex; flex-direction: column; min-width: 0; }
  .picker-item-name { font-size: .80rem; font-weight: 700; color: #202124; }
  .picker-item-sub { font-size: .68rem; color: #70757a; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .picker-help-btn {
    width: 20px; height: 20px; border-radius: 50%; border: 1px solid #dadce0;
    background: #fff; color: #5f6368; font-size: 11px; font-weight: 800;
    display: flex; align-items: center; justify-content: center; cursor: pointer;
    flex-shrink: 0; transition: .14s;
  }
  .picker-help-btn:hover {
    background: #1967d2; color: #fff; border-color: #1967d2; transform: scale(1.1);
  }

  /* 모달 오버레이 */
  .modal-overlay {
    position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
    background: rgba(0,0,0,.45); backdrop-filter: blur(4px);
    display: flex; align-items: center; justify-content: center; z-index: 100000;
  }
  .modal-card {
    background: #ffffff; border-radius: 16px; width: 440px; max-width: 90vw;
    box-shadow: 0 16px 48px rgba(0,0,0,.22); overflow: hidden; animation: popoverFadeIn .18s ease-out;
  }
  .modal-card.wide { width: 560px; max-height: 85vh; display: flex; flex-direction: column; }
  .modal-header {
    padding: 16px 20px; border-bottom: 1px solid var(--line);
    display: flex; align-items: center; justify-content: space-between;
  }
  .modal-header h3 { margin: 0; font-size: 1.05rem; font-weight: 800; color: var(--navy); display: flex; align-items: center; gap: 8px; }
  .modal-close-btn { background: none; border: none; font-size: 1.2rem; cursor: pointer; color: var(--muted); padding: 4px; }
  .modal-body { padding: 20px; overflow-y: auto; }
  .modal-footer {
    padding: 12px 20px; border-top: 1px solid var(--line); background: #f8f9fa;
    display: flex; justify-content: flex-end; gap: 8px;
  }

  /* ── 블록 라이브러리 팔레트 (좌측 패널 원클릭 추가) ── */
  .palette-category-card {
    background: #ffffff;
    border: 1px solid var(--line);
    border-radius: 14px;
    padding: 14px;
    margin-bottom: 16px;
    box-shadow: 0 2px 8px rgba(36,53,81,0.04);
  }
  .palette-cat-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 6px;
  }
  .palette-badge {
    font-size: .68rem;
    font-weight: 800;
    padding: 2px 8px;
    border-radius: 999px;
  }
  .palette-badge.layout {
    background: #e8f0fe;
    color: #1967d2;
  }
  .palette-badge.component {
    background: #e6f4ea;
    color: #137333;
  }
  .palette-grid {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .palette-btn {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 12px;
    background: #f8fafd;
    border: 1px solid #e1ecfa;
    border-radius: 10px;
    cursor: pointer;
    text-align: left;
    transition: all .14s ease;
    width: 100%;
    font-family: inherit;
  }
  .palette-btn:hover {
    background: #eef5fe;
    border-color: #1967d2;
    transform: translateY(-1px);
    box-shadow: 0 3px 8px rgba(25,103,210,0.12);
  }
  .palette-btn:active {
    transform: translateY(0);
  }
  .palette-btn .p-icon {
    font-size: 1.25rem;
    line-height: 1;
    flex-shrink: 0;
  }
  .palette-btn .p-text {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
  }
  .palette-btn .p-title {
    font-size: .84rem;
    font-weight: 700;
    color: var(--navy);
  }
  .palette-btn .p-sub {
    font-size: .72rem;
    color: var(--muted);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .palette-btn .p-plus {
    font-size: 1rem;
    font-weight: 800;
    color: #1967d2;
    background: #e8f0fe;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    transition: .15s;
  }
  .palette-btn:hover .p-plus {
    background: #1967d2;
    color: #ffffff;
  }

  /* ── 상단 시스템 바 강화 & Undo/Redo 버튼 ── */
  .brand-group {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .header-count-badge {
    font-size: .72rem;
    font-weight: 700;
    background: #e8f0fe;
    color: #1967d2;
    padding: 3px 8px;
    border-radius: 999px;
  }
  .history-btn-group {
    display: flex;
    align-items: center;
    background: #f1f3f4;
    border-radius: 8px;
    padding: 2px;
    gap: 2px;
  }
  .history-btn-group .btn {
    border: none;
    background: transparent;
    padding: 5px 10px;
    font-size: .80rem;
    border-radius: 6px;
  }
  .history-btn-group .btn:hover:not(:disabled) {
    background: #ffffff;
    box-shadow: 0 1px 3px rgba(0,0,0,0.08);
  }

  /* ── 쉘 & 모바일 호환성 미디어 쿼리 ── */
  @media (max-width: 900px) {
    .studio-header {
      height: auto;
      min-height: 52px;
      padding: 8px 12px;
      flex-wrap: wrap;
      gap: 8px;
    }
    .studio-header .actions {
      flex-wrap: wrap;
      width: 100%;
      justify-content: flex-start;
      gap: 6px;
    }
    .workspace {
      flex-direction: column;
      height: auto;
      min-height: calc(100vh - 80px);
      overflow-y: auto;
    }
    .editor-pane {
      width: 100%;
      height: auto;
      max-height: 380px;
      border-right: none;
      border-bottom: 1px solid var(--line);
    }
    .preview-pane {
      width: 100%;
      min-height: 500px;
      flex: 1;
    }
  }

  @media (max-width: 600px) {
    .btn {
      padding: 5px 9px;
      font-size: .76rem;
    }
    .btn-text {
      display: none;
    }
    .header-count-badge {
      display: none;
    }
    .canvas-stack-toolbar {
      overflow-x: auto;
      flex-wrap: nowrap;
      -webkit-overflow-scrolling: touch;
    }
    .canvas-tool-chip {
      flex-shrink: 0;
    }
  }
</style>
</head>
<body>

<!-- 상단 헤더 바 (통합 시스템 바) -->
<header class="studio-header">
  <div class="brand-group">
    <div class="brand">
      <span class="dot"></span> Gemini Style Workflow Studio
    </div>
    <span id="headerBlockCountBadge" class="header-count-badge">3개 블록 구성</span>
  </div>
  <div class="actions">
    <!-- 실행 취소 / 다시 실행 (Undo/Redo) -->
    <div class="history-btn-group">
      <button class="btn" id="undoBtn" onclick="undoStack()" title="실행 취소 (Ctrl+Z)" disabled>
        <span>↩️</span> <span class="btn-text">실행 취소</span>
      </button>
      <button class="btn" id="redoBtn" onclick="redoStack()" title="다시 실행 (Ctrl+Y / Ctrl+Shift+Z)" disabled>
        <span>↪️</span> <span class="btn-text">다시 실행</span>
      </button>
    </div>

    <!-- 미리보기 모드 토글 -->
    <button class="btn" id="togglePreviewBtn" onclick="togglePreviewMode()" title="캔버스 편집 모드와 실시간 완성본 미리보기를 토글합니다">
      <span id="previewBtnIcon">👁️</span> <span id="previewBtnLabel">미리보기 모드</span>
    </button>

    <!-- HTML 다운로드 버튼 -->
    <button class="btn primary" id="exportStackBtn" onclick="exportStackToHtml('export.html')" style="background:#0d652d; border-color:#0d652d;" title="캔버스 블록을 완전한 반응형 시맨틱 HTML(export.html)로 다운로드">
      <span>📥</span> <span class="btn-text">HTML 다운로드</span>
    </button>

    <!-- 작업 저장 및 프리셋 드롭다운 -->
    <button class="btn" id="openSaveBtn" style="background:#e8f0fe; color:#1967d2; border-color:#c6dafc;" title="현재 작성 중인 작업 내용을 브라우저에 영구 저장">💾 <span class="btn-text">저장</span></button>
    <select class="preset-select" id="presetSelect" title="작업 및 템플릿 불러오기"></select>
    <button class="btn" id="deleteWorkBtn" style="display:none; color:#d93025; border-color:#fce8e6;" title="현재 불러온 저장 작업 삭제">🗑️</button>
  </div>
</header>

<!-- 메인 스튜디오 영역 -->
<div class="workspace">
  <!-- 좌측 편집기 패널 -->
  <aside class="editor-pane">
    <nav class="editor-tabs">
      <button class="tab-btn active" id="tabBlocks" onclick="switchEditorTab('blocks')">🧩 블록 라이브러리</button>
      <button class="tab-btn" id="tabForm" onclick="switchEditorTab('form')">⚙️ 폼 속성 편집</button>
      <button class="tab-btn" id="tabJson" onclick="switchEditorTab('json')">JSON 직접 편집</button>
    </nav>

    <!-- 1. 블록 라이브러리 뷰 (구조 3종 + 컴포넌트 6종 원클릭 추가) -->
    <div class="editor-scroll" id="blocksView">
      <div style="margin-bottom:14px;">
        <h3 style="font-size:.92rem;font-weight:800;color:var(--navy);margin:0 0 3px;">⚡ 원클릭 블록 팔레트</h3>
        <p style="font-size:.76rem;color:var(--muted);margin:0;line-height:1.4;">버튼을 클릭하면 캔버스에 즉시 블록이 추가됩니다.</p>
      </div>

      <!-- 📐 [구조 & 레이아웃 (Structure & Layout)] 도구군 -->
      <div class="palette-category-card">
        <div class="palette-cat-header">
          <div style="display:flex;align-items:center;gap:6px;">
            <span style="font-size:1rem;">📐</span>
            <span style="font-size:.84rem;font-weight:800;color:var(--navy);">구조 (Structure &amp; Layout)</span>
          </div>
          <span class="palette-badge layout">3종</span>
        </div>
        <p style="font-size:.74rem;color:var(--muted);margin:0 0 10px;line-height:1.4;">
          섹션 컨테이너, 구분선, 여백으로 레이아웃의 골격과 간격을 잡습니다.
        </p>
        <div class="palette-grid">
          <!-- 1. 컨테이너 -->
          <button type="button" class="palette-btn" onclick="addBlockToStack('sectionContainer')" title="섹션 그룹 래퍼 카드 추가">
            <span class="p-icon">📦</span>
            <div class="p-text">
              <span class="p-title">컨테이너</span>
              <span class="p-sub">그룹 래퍼 카드 박스</span>
            </div>
            <span class="p-plus">+</span>
          </button>

          <!-- 2. 구분선 -->
          <button type="button" class="palette-btn" onclick="addBlockToStack('divider')" title="시각적 섹션 구분선 추가">
            <span class="p-icon">➖</span>
            <div class="p-text">
              <span class="p-title">구분선</span>
              <span class="p-sub">경계선 &amp; 라벨</span>
            </div>
            <span class="p-plus">+</span>
          </button>

          <!-- 3. 여백 -->
          <button type="button" class="palette-btn" onclick="addBlockToStack('spacer')" title="블록 간 간격 조절 스페이서 추가">
            <span class="p-icon">↕️</span>
            <div class="p-text">
              <span class="p-title">여백 (스페이서)</span>
              <span class="p-sub">높이 조절 여백</span>
            </div>
            <span class="p-plus">+</span>
          </button>
        </div>
      </div>

      <!-- ⚡ [컴포넌트 & 블록 (Components & Blocks)] 도구군 -->
      <div class="palette-category-card" style="margin-top:14px;">
        <div class="palette-cat-header">
          <div style="display:flex;align-items:center;gap:6px;">
            <span style="font-size:1rem;">⚡</span>
            <span style="font-size:.84rem;font-weight:800;color:var(--navy);">컴포넌트 (Components &amp; Blocks)</span>
          </div>
          <span class="palette-badge component">6종</span>
        </div>
        <p style="font-size:.74rem;color:var(--muted);margin:0 0 10px;line-height:1.4;">
          독립 데이터와 인터랙션을 가진 핵심 기능 블록을 추가합니다.
        </p>
        <div class="palette-grid">
          <!-- 1. 3D 플립 카드 -->
          <button type="button" class="palette-btn" onclick="addBlockToStack('flipCard')" title="3D 플립 카드 추가">
            <span class="p-icon">📌</span>
            <div class="p-text">
              <span class="p-title">3D 플립 카드</span>
              <span class="p-sub">입체 회전 핵심 모듈</span>
            </div>
            <span class="p-plus">+</span>
          </button>

          <!-- 2. PARTS 프롬프트 -->
          <button type="button" class="palette-btn" onclick="addBlockToStack('partsPrompt')" title="PARTS 프롬프트 조립기 추가">
            <span class="p-icon">🧩</span>
            <div class="p-text">
              <span class="p-title">PARTS 프롬프트</span>
              <span class="p-sub">P·A·R·T·S 칩 조립기</span>
            </div>
            <span class="p-plus">+</span>
          </button>

          <!-- 3. GAS 아코디언 -->
          <button type="button" class="palette-btn" onclick="addBlockToStack('gasAccordion')" title="GAS 아코디언 추가">
            <span class="p-icon">📑</span>
            <div class="p-text">
              <span class="p-title">GAS 아코디언</span>
              <span class="p-sub">펼쳐지는 배포 코드</span>
            </div>
            <span class="p-plus">+</span>
          </button>

          <!-- 4. 엽서 시뮬레이터 -->
          <button type="button" class="palette-btn" onclick="addBlockToStack('postcardSimulator')" title="엽서 시뮬레이터 추가">
            <span class="p-icon">✉️</span>
            <div class="p-text">
              <span class="p-title">엽서 시뮬레이터</span>
              <span class="p-sub">무인 발송 자동화</span>
            </div>
            <span class="p-plus">+</span>
          </button>

          <!-- 5. 안내 노트 -->
          <button type="button" class="palette-btn" onclick="addBlockToStack('infoNote')" title="안내 노트 추가">
            <span class="p-icon">💡</span>
            <div class="p-text">
              <span class="p-title">안내 노트</span>
              <span class="p-sub">팁 / 주의 / 참고 상자</span>
            </div>
            <span class="p-plus">+</span>
          </button>

          <!-- 6. 텍스트 / 버튼 -->
          <button type="button" class="palette-btn" onclick="addBlockToStack('textButtonBlock')" title="텍스트 & 액션 버튼 블록 추가">
            <span class="p-icon">🎯</span>
            <div class="p-text">
              <span class="p-title">텍스트 / 버튼</span>
              <span class="p-sub">헤더 타이틀 &amp; CTA</span>
            </div>
            <span class="p-plus">+</span>
          </button>
        </div>
      </div>
    </div>

    <!-- 2. 기존 폼 모드 (초기에는 숨김) -->
    <div class="editor-scroll" id="formView" style="display:none;">
      
      <!-- ── 🛠️ 툴바 & 도구 모음 팔레트 (요구사항 2: 구조&레이아웃 도구만 노출) ── -->
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
          <!-- [구조 & 레이아웃 (Structure & Layout)] 도구군 7선 -->
          <div class="dock-group-title">
            <span>📐 구조 &amp; 레이아웃 도구 (Structure &amp; Layout)</span>
            <span class="dock-group-tag layout">LAYOUT ONLY</span>
          </div>
          <div class="tool-button-rack">
            <!-- 1. 기본 정보 (헤더 섹션) -->
            <div class="dock-tool-btn active" id="dockTool_header" onclick="focusLayoutSection('header')">
              <span class="dock-icon">🏛️</span>
              <div class="dock-label-group">
                <span class="dock-name">기본 정보 (헤더)</span>
                <span class="dock-sub">Hero 컨테이너 래퍼</span>
              </div>
              <span class="dock-pill" id="pillTool_header">필수</span>
              <button class="tool-help-btn" onclick="openToolHelpModal(event, 'header')" title="설명 및 적용 예시 보기">?</button>
            </div>

            <!-- 2. 상단 시스템 툴바 -->
            <div class="dock-tool-btn active" id="dockTool_toolbar" onclick="focusLayoutSection('toolbar')">
              <span class="dock-icon">🧭</span>
              <div class="dock-label-group">
                <span class="dock-name">시스템 툴바</span>
                <span class="dock-sub">상단 고정 네비게이션</span>
              </div>
              <span class="dock-pill" id="pillTool_toolbar">ON</span>
              <button class="tool-help-btn" onclick="openToolHelpModal(event, 'toolbar')" title="설명 및 적용 예시 보기">?</button>
            </div>

            <!-- 3. KPI 지표 스코어보드 -->
            <div class="dock-tool-btn" id="dockTool_kpiStats" onclick="focusLayoutSection('kpiStats')">
              <span class="dock-icon">📊</span>
              <div class="dock-label-group">
                <span class="dock-name">KPI 스코어보드</span>
                <span class="dock-sub">4열 반응형 그리드</span>
              </div>
              <span class="dock-pill" id="pillTool_kpiStats">OFF</span>
              <button class="tool-help-btn" onclick="openToolHelpModal(event, 'kpiStats')" title="설명 및 적용 예시 보기">?</button>
            </div>

            <!-- 4. 1줄 흐름 지도 -->
            <div class="dock-tool-btn" id="dockTool_flowmap" onclick="focusLayoutSection('flowmap')">
              <span class="dock-icon">🗺️</span>
              <div class="dock-label-group">
                <span class="dock-name">1줄 흐름 지도</span>
                <span class="dock-sub">가로 Flexbox 파이프라인</span>
              </div>
              <span class="dock-pill" id="pillTool_flowmap">OFF</span>
              <button class="tool-help-btn" onclick="openToolHelpModal(event, 'flowmap')" title="설명 및 적용 예시 보기">?</button>
            </div>

            <!-- 5. 3D 플립 카드 -->
            <div class="dock-tool-btn" id="dockTool_cards" onclick="focusLayoutSection('cards')">
              <span class="dock-icon">📌</span>
              <div class="dock-label-group">
                <span class="dock-name">3D 플립 카드</span>
                <span class="dock-sub">3열 원근 모듈 그리드</span>
              </div>
              <span class="dock-pill" id="pillTool_cards">OFF</span>
              <button class="tool-help-btn" onclick="openToolHelpModal(event, 'cards')" title="설명 및 적용 예시 보기">?</button>
            </div>

            <!-- 6. 상세 실행 단계 -->
            <div class="dock-tool-btn active" id="dockTool_steps" onclick="focusLayoutSection('steps')">
              <span class="dock-icon">🛠️</span>
              <div class="dock-label-group">
                <span class="dock-name">상세 실행 단계</span>
                <span class="dock-sub">수직 워크플로우 스택</span>
              </div>
              <span class="dock-pill" id="pillTool_steps">0단계</span>
              <button class="tool-help-btn" onclick="openToolHelpModal(event, 'steps')" title="설명 및 적용 예시 보기">?</button>
            </div>

            <!-- 7. 최종 점검 체크리스트 -->
            <div class="dock-tool-btn" id="dockTool_checklist" onclick="focusLayoutSection('checklist')">
              <span class="dock-icon">✅</span>
              <div class="dock-label-group">
                <span class="dock-name">최종 점검 체크</span>
                <span class="dock-sub">점검 그룹 래퍼 카드</span>
              </div>
              <span class="dock-pill" id="pillTool_checklist">OFF</span>
              <button class="tool-help-btn" onclick="openToolHelpModal(event, 'checklist')" title="설명 및 적용 예시 보기">?</button>
            </div>
          </div>

          <!-- 시스템 툴바 서브 컨트롤러 토글 바 -->
          <div class="dock-group-title" style="margin-top:14px;">
            <span>🧭 시스템 툴바 세부 컨트롤러 토글</span>
            <span class="dock-group-tag layout">SUB CONTROLLERS</span>
          </div>
          <div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:12px;">
            <button class="tb-sub-chip active" id="chipToolSearch" onclick="toggleToolbarFeature('showSearch')">🔍 검색창 (ON)</button>
            <button class="tb-sub-chip active" id="chipToolChips" onclick="toggleToolbarFeature('showSuggestChips')">⚡ 추천 칩 (ON)</button>
            <button class="tb-sub-chip active" id="chipToolTabs" onclick="toggleToolbarFeature('showCategoryTabs')">🗂️ 탭 바 (ON)</button>
            <button class="tb-sub-chip active" id="chipToolPrint" onclick="toggleToolbarFeature('showPrint')">🖨️ 인쇄 (ON)</button>
            <button class="tb-sub-chip active" id="chipToolProgress" onclick="toggleToolbarFeature('showProgress')">📊 진행률 (ON)</button>
            <button class="tb-sub-chip active" id="chipToolTheme" onclick="toggleToolbarFeature('showThemeToggle')">🌓 다크모드 (ON)</button>
          </div>

          <!-- 확장 옵션 입력 (검색어 칩 및 카테고리 탭 설정) -->
          <div id="subToolbarSettings" style="background:#f8fafd; border:1px solid #e1ecfa; border-radius:10px; padding:12px; margin-bottom:10px;">
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
        </div>
      </div>

      <!-- 🏛️ 1. 기본 정보 (헤더 설정) -->
      <div class="section-divider-bar" data-editor-id="header" data-editor-level="container">
        <div class="section-divider-left">
          <span class="sec-icon">🏛️</span>
          <span class="sec-title">기본 정보 (헤더 설정)</span>
          <span class="sec-type-badge layout">구조 &amp; 레이아웃</span>
        </div>
        <div class="section-divider-actions">
          <button class="add-block-btn" onclick="openBlockPicker(event, 'header')">+ 컴포넌트 추가 ▾</button>
        </div>
      </div>
      <div class="item-card" data-editor-id="header" data-editor-level="container">
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

      <!-- 📊 2. KPI 지표 스코어보드 -->
      <div class="section-divider-bar" data-editor-id="kpiStats" data-editor-level="container">
        <div class="section-divider-left">
          <span class="sec-icon">📊</span>
          <span class="sec-title">KPI 지표 스코어보드</span>
          <span class="sec-type-badge layout">구조 &amp; 레이아웃</span>
        </div>
        <div class="section-divider-actions">
          <button class="add-block-btn" onclick="openBlockPicker(event, 'kpiStats')">+ 지표 카드 추가 ▾</button>
        </div>
      </div>
      <div id="kpiStatsEditorContainer"></div>

      <!-- 🗺️ 3. 1줄 흐름 지도 -->
      <div class="section-divider-bar" data-editor-id="flowmap" data-editor-level="container">
        <div class="section-divider-left">
          <span class="sec-icon">🗺️</span>
          <span class="sec-title">1줄 흐름 지도 (Flow Map)</span>
          <span class="sec-type-badge layout">구조 &amp; 레이아웃</span>
        </div>
        <div class="section-divider-actions">
          <button class="add-block-btn" onclick="openBlockPicker(event, 'flowmap')">+ 단계 노드 추가 ▾</button>
        </div>
      </div>
      <div id="flowItemsContainer"></div>

      <!-- 📌 4. 3D 플립 카드 (핵심 모듈) -->
      <div class="section-divider-bar" data-editor-id="cards" data-editor-level="container">
        <div class="section-divider-left">
          <span class="sec-icon">📌</span>
          <span class="sec-title">3D 플립 카드 (핵심 모듈)</span>
          <span class="sec-type-badge layout">구조 &amp; 레이아웃</span>
        </div>
        <div class="section-divider-actions">
          <button class="add-block-btn" onclick="openBlockPicker(event, 'cards')">+ 모듈 카드 추가 ▾</button>
        </div>
      </div>
      <div id="cardItemsContainer"></div>

      <!-- 🛠️ 5. 상세 실행 단계 (스텝 & 프롬프트) -->
      <div class="section-divider-bar" data-editor-id="steps" data-editor-level="container">
        <div class="section-divider-left">
          <span class="sec-icon">🛠️</span>
          <span class="sec-title">상세 실행 단계 (스텝 &amp; 프롬프트)</span>
          <span class="sec-type-badge layout">구조 &amp; 레이아웃</span>
        </div>
        <div class="section-divider-actions">
          <button class="add-block-btn" onclick="openBlockPicker(event, 'steps')">+ 실행 단계 추가 ▾</button>
        </div>
      </div>
      <div id="stepItemsContainer"></div>

      <!-- ✅ 6. 최종 점검 체크리스트 -->
      <div class="section-divider-bar" data-editor-id="checklist" data-editor-level="container">
        <div class="section-divider-left">
          <span class="sec-icon">✅</span>
          <span class="sec-title">최종 점검 체크리스트</span>
          <span class="sec-type-badge layout">구조 &amp; 레이아웃</span>
        </div>
        <div class="section-divider-actions">
          <button class="add-block-btn" onclick="openBlockPicker(event, 'checklist')">+ 항목 추가 ▾</button>
        </div>
      </div>
      <div id="checkItemsContainer"></div>
    </div>

    <!-- JSON 모드 -->
    <div id="jsonView" style="display: none; height: 100%;">
      <textarea id="jsonEditor" spellcheck="false"></textarea>
    </div>
  </aside>

  <!-- 우측 실시간 프리뷰 & 노션/설문지형 스택 캔버스 -->
  <main class="preview-pane">
    <div class="preview-bar">
      <div class="preview-dots">
        <span class="pdot red"></span>
        <span class="pdot yellow"></span>
        <span class="pdot green"></span>
      </div>
      
      <!-- 뷰 모드 전환 탭 (노션형 캔버스 vs 완성본 미리보기) -->
      <div class="view-tab-group">
        <button class="view-tab-btn active" id="viewBtnCanvas" onclick="switchStackView('canvas')">📝 노션/설문지형 캔버스</button>
        <button class="view-tab-btn" id="viewBtnPreview" onclick="switchStackView('preview')">📄 완성본 미리보기 (Iframe)</button>
      </div>

      <div style="display:flex;align-items:center;gap:8px;">
        <span id="canvasBlockCountBadge" style="font-size: .74rem; background:#e8f0fe; color:#1967d2; padding:2px 8px; border-radius:999px; font-weight:700;">3개 블록 구성 중</span>
      </div>
    </div>

    <!-- 1. 노션/설문지형 스택 캔버스 뷰 -->
    <div id="stackCanvasView" style="display:flex;flex-direction:column;flex:1;height:100%;overflow:hidden;">
      <!-- 상단 빠른 블록 추가 툴바 -->
      <div class="canvas-stack-toolbar">
        <span style="font-size:.78rem;font-weight:800;color:var(--navy);display:flex;align-items:center;gap:4px;">
          <span>⚡ 빠른 블록 추가:</span>
        </span>
        <button class="canvas-tool-chip" onclick="addBlockToStack('sectionContainer')"><span>📦</span> 컨테이너</button>
        <button class="canvas-tool-chip" onclick="addBlockToStack('divider')"><span>➖</span> 구분선</button>
        <button class="canvas-tool-chip" onclick="addBlockToStack('spacer')"><span>↕️</span> 여백</button>
        <span style="color:#dadce0;margin:0 2px;">|</span>
        <button class="canvas-tool-chip" onclick="addBlockToStack('flipCard')"><span>📌</span> 3D 카드</button>
        <button class="canvas-tool-chip" onclick="addBlockToStack('partsPrompt')"><span>🧩</span> PARTS 칩</button>
        <button class="canvas-tool-chip" onclick="addBlockToStack('gasAccordion')"><span>📑</span> 아코디언</button>
        <button class="canvas-tool-chip" onclick="addBlockToStack('postcardSimulator')"><span>✉️</span> 엽서 시뮬레이터</button>
        <button class="canvas-tool-chip" onclick="addBlockToStack('infoNote')"><span>💡</span> 안내 노트</button>
        <button class="canvas-tool-chip" onclick="addBlockToStack('textButtonBlock')"><span>🎯</span> 텍스트/버튼</button>
      </div>

      <!-- 중앙 캔버스 스크롤 영역 -->
      <div class="stack-canvas-scroll" onclick="onCanvasBackgroundClick(event)">
        <div id="stackCanvasContainer" class="stack-canvas-container">
          <!-- JS에서 동적으로 블록 스택 렌더링 -->
        </div>

        <!-- 하단 블록 추가 셸프 -->
        <div class="canvas-bottom-shelf">
          <div class="shelf-line-wrap">
            <div class="shelf-line"></div>
            <span class="shelf-label">➕ 새 블록 추가하기</span>
            <div class="shelf-line"></div>
          </div>
          <div class="shelf-grid">
            <button class="shelf-card-btn" onclick="addBlockToStack('sectionContainer')">
              <span class="shelf-icon">📦</span>
              <div class="shelf-text"><span class="shelf-title">컨테이너</span><span class="shelf-sub">구조 섹션 그룹 래퍼 카드</span></div>
            </button>
            <button class="shelf-card-btn" onclick="addBlockToStack('divider')">
              <span class="shelf-icon">➖</span>
              <div class="shelf-text"><span class="shelf-title">구분선</span><span class="shelf-sub">시각적 섹션 경계선 및 라벨</span></div>
            </button>
            <button class="shelf-card-btn" onclick="addBlockToStack('spacer')">
              <span class="shelf-icon">↕️</span>
              <div class="shelf-text"><span class="shelf-title">여백 (스페이서)</span><span class="shelf-sub">상하 높이 조절 간격 블록</span></div>
            </button>
            <button class="shelf-card-btn" onclick="addBlockToStack('flipCard')">
              <span class="shelf-icon">📌</span>
              <div class="shelf-text"><span class="shelf-title">3D 플립 카드</span><span class="shelf-sub">입체 회전 핵심 모듈 카드</span></div>
            </button>
            <button class="shelf-card-btn" onclick="addBlockToStack('partsPrompt')">
              <span class="shelf-icon">🧩</span>
              <div class="shelf-text"><span class="shelf-title">PARTS 프롬프트</span><span class="shelf-sub">역할·목표 칩 조립기</span></div>
            </button>
            <button class="shelf-card-btn" onclick="addBlockToStack('gasAccordion')">
              <span class="shelf-icon">📑</span>
              <div class="shelf-text"><span class="shelf-title">GAS 아코디언</span><span class="shelf-sub">접이식 스크립트 코드 상자</span></div>
            </button>
            <button class="shelf-card-btn" onclick="addBlockToStack('postcardSimulator')">
              <span class="shelf-icon">✉️</span>
              <div class="shelf-text"><span class="shelf-title">엽서 시뮬레이터</span><span class="shelf-sub">무인 발송 자동화 모의 실행</span></div>
            </button>
            <button class="shelf-card-btn" onclick="addBlockToStack('infoNote')">
              <span class="shelf-icon">💡</span>
              <div class="shelf-text"><span class="shelf-title">안내 노트</span><span class="shelf-sub">팁 / 주의 / 참고 강조 상자</span></div>
            </button>
            <button class="shelf-card-btn" onclick="addBlockToStack('textButtonBlock')">
              <span class="shelf-icon">🎯</span>
              <div class="shelf-text"><span class="shelf-title">텍스트 &amp; 버튼</span><span class="shelf-sub">타이틀, 설명, CTA 액션 버튼</span></div>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 2. 완성본 미리보기 Iframe 뷰 -->
    <div id="previewFrameView" style="display:none;flex:1;height:100%;flex-direction:column;">
      <iframe id="previewFrame" class="preview-iframe" title="미리보기 화면"></iframe>
    </div>
  </main>
</div>

<!-- ── 컴포넌트 & 블록 선택 팝오버 (요구사항 2: + 버튼 클릭 시 해당 구조에 속한 블록 추가) ── -->
<div id="blockPickerPopover" class="block-picker-popover"></div>

<!-- ── 도구 설명 및 적용 예시 모달 (요구사항 2 + Decision Matrix 판정 표시) ── -->
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
      <!-- Decision Matrix 판정 정보 영역 -->
      <div style="margin-bottom:14px;background:#fef7e0;border:1px solid #f9ab00;border-radius:10px;padding:12px 14px;">
        <b style="color:#b06000;display:block;margin-bottom:6px;font-size:.86rem;">⚖️ Decision Matrix 판정 결과 (구조 vs 블록)</b>
        <div id="toolHelpDecisionDetails"></div>
      </div>

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
        저장 후 상단의 <b>"템플릿: "</b> 드롭다운에서 언제든 다시 불러올 수 있습니다.
      </p>
      <div class="form-group" style="margin-bottom:0;">
        <label>작업 이름</label>
        <input type="text" id="saveWorkName" placeholder="예: 2026 주간 회의 자동화 보고서 (최종안)">
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn" onclick="closeSaveModal()">취소</button>
      <button class="btn primary" id="confirmSaveBtn">저장하기</button>
    </div>
  </div>
</div>

<!-- ── 위젯 세부 설정 모달 (Widget Configuration Modal) ── -->
<div id="widgetConfigModal" class="modal-overlay" style="display:none;" onclick="if(event.target === this) closeWidgetConfigModal();">
  <div class="modal-card wide widget-modal-card">
    <div class="modal-header">
      <h3>
        <span id="widgetConfigModalIcon" style="font-size:1.35rem;line-height:1;">⚙️</span>
        <span id="widgetConfigModalTitle">위젯 세부 설정</span>
        <span id="widgetConfigModalTypeTag" class="widget-modal-tag"></span>
      </h3>
      <button class="modal-close-btn" onclick="closeWidgetConfigModal()">✕</button>
    </div>
    <div class="modal-body widget-modal-body" id="widgetConfigModalBody">
      <!-- 동적 위젯별 폼 렌더링 -->
    </div>
    <div class="modal-footer">
      <button class="btn" onclick="closeWidgetConfigModal()">취소</button>
      <button class="btn primary" id="widgetConfigApplyBtn" onclick="applyWidgetConfig()">적용하기 (Apply)</button>
    </div>
  </div>
</div>
`;

  const catalogJs = fs.readFileSync(path.join(__dirname, 'studio-catalog.js'), 'utf8');
  const fullHtml = htmlHead +
    '<!-- Linear Block Stack AST Catalog Engine -->\n<script>\n' + catalogJs + '\n</script>\n' +
    '<script>\n' + clientScript + '\n</script>\n</body>\n</html>\n';
  fs.writeFileSync('builder.html', fullHtml, 'utf8');
  console.log('🎉 builder.html successfully generated! Total bytes:', fullHtml.length);
}

buildStudio();
