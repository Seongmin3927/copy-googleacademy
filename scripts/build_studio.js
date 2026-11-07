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

    // 1. 내 저장된 작업 그룹
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

    // 2. 기본 템플릿 그룹
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

  // ── 내보내기 & 복사 ──
  document.getElementById('copyHtmlBtn').addEventListener('click', function(){
    var html = renderReportHtml(currentData);
    navigator.clipboard.writeText(html).then(function(){
      showToast('📋 생성된 HTML 코드가 클립보드에 복사되었습니다!');
    });
  });

  document.getElementById('downloadHtmlBtn').addEventListener('click', function(){
    var html = renderReportHtml(currentData);
    var blob = new Blob([html], { type: 'text/html;charset=utf-8' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = (currentData.title || 'workflow-report').replace(/\\s+/g, '_') + '.html';
    a.click();
    URL.revokeObjectURL(url);
    showToast('💾 HTML 파일이 다운로드되었습니다.');
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

  // Read the HTML shell up to <script>
  let existingHtml = fs.readFileSync('builder.html', 'utf8');
  const splitIdx = existingHtml.indexOf('<script>');
  if (splitIdx === -1) {
    console.error('Could not find <script> tag in builder.html');
    process.exit(1);
  }
  const htmlHeadAndBody = existingHtml.substring(0, splitIdx);

  const fullHtml = htmlHeadAndBody + '<script>' + clientScript + '</script>\n</body>\n</html>\n';
  fs.writeFileSync('builder.html', fullHtml, 'utf8');
  console.log('🎉 builder.html successfully generated! Total bytes:', fullHtml.length);
}

buildStudio();
