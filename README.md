# 전국 대학생 Gemini 연수 — 웹교안 (Cloudflare & GitHub 겸용)

고려대 최종 웹교안(구글 컬러·자체 폰트)을 그대로 가져와, **전국(일반) 대학생 연수**용으로
모듈 2의 이미지 만들기 부분만 바꾼 버전입니다.

## 구성
- HTML 7: `index`(시작·통합 탭) · `intro` · `home` · `module2` · `module3` · `module4` · `prep`
- `fonts/` — 제미나이/구글 톤 자체 폰트 (Pretendard Variable woff2 서브셋)
- 이미지: 교안에서 쓰는 png/jpg (캡처화면, 다이어그램, 갤러리 샘플)
- Cloudflare Pages 최적화: `_headers`, `_routes.json`, `wrangler.jsonc`, `package.json`

## 전국구 전환 내용 (고려대판 대비)
- **모듈 2 STEP 1** — "Gemini Academy MT 캐릭터 컷(with 미미미누)" → **"나만의 MT 마스코트 만들기"**
  - 입력: **본인 사진** 또는 **구글에서 찾은 동물 사진** (미미미누 사진 받기·투샷 섹션 제거)
  - 스타일·소품·배경 **버튼 빌더**는 그대로. 마스코트 문구는 **'Gemini Academy'** 유지(미미미누 제거)
- **인트로 STEP 01** 문구도 마스코트로 교체
- 패들렛 전국구 주소로, prep의 미미미누 브랜딩 제거

## ⚠️ 나중에 교체할 예시 이미지 (미미미누 → 전국구)
아래는 지금 **미미미누 예시**가 임시로 들어가 있어요. 전국구 마스코트 예시가 생기면 같은 이름으로 교체하면 됩니다.
- `sample1.jpg` — 인트로 STEP 01 미리보기
- `solo-ex1.jpg` ~ `solo-ex4.jpg` — 모듈 2 "이렇게 만들 수 있어요" 갤러리

## ⚡ Cloudflare Pages 배포
이 프로젝트는 Cloudflare Pages에서 단 1개의 명령어로 즉시 전 세계 배포가 가능합니다:
```bash
npm run deploy
# 또는
npx wrangler pages deploy .
```
자세한 3가지 배포 방식(Wrangler CLI, GitHub 연동, 대시보드 업로드)은 [CLOUDFLARE_DEPLOY.md](CLOUDFLARE_DEPLOY.md) 문서를 참고하세요.

## 깃허브 업로드
GitHub Pages를 이용할 경우 저장소 최상단에 올리고, Settings → Pages → main /(root)를 지정합니다. `index.html`이 첫 화면입니다.
