# Cloudflare Pages 배포 가이드 (Gemini Academy 웹교안)

이 프로젝트는 **Cloudflare Pages**에 최적화되어 즉시 무중단 글로벌 CDN 배포가 가능하도록 리버스 엔지니어링 및 구성되었습니다.

---

## 🚀 배포 방법 (3가지 옵션 중 선택)

### 방법 1: Cloudflare Wrangler CLI로 직접 배포 (가장 빠름)

1. 터미널에서 워크스페이스 디렉토리로 이동:
   ```bash
   cd "c:\Users\wblud\Desktop\2026\가이드 웹사이트 rea"
   ```
2. Cloudflare 로그인 (최초 1회):
   ```bash
   npx wrangler login
   ```
3. Pages 프로젝트 배포:
   ```bash
   npx wrangler pages deploy . --project-name=gemini-academy
   ```
   > 배포가 완료되면 즉시 `https://gemini-academy.pages.dev` 형태의 고유 글로벌 URL이 발급됩니다.

---

### 방법 2: GitHub 연동 자동 배포 (권장)

1. 현재 폴더의 모든 파일을 본인의 GitHub 저장소(예: `username/gemini-academy-cf`)에 푸시합니다:
   ```bash
   git init
   git add .
   git commit -m "feat: initial commit for cloudflare pages"
   git remote add origin https://github.com/<your-username>/<your-repo>.git
   git push -u origin main
   ```
2. [Cloudflare Dashboard](https://dash.cloudflare.com/)에 로그인합니다.
3. **Workers & Pages** → **Create application** → **Pages** → **Connect to Git**을 선택합니다.
4. 방금 생성한 GitHub 리포지토리를 선택합니다.
5. 빌드 설정:
   - **Framework preset**: `None`
   - **Build command**: (비워둠)
   - **Build output directory**: `.` (루트 디렉토리)
6. **Save and Deploy**를 누르면 자동으로 글로벌 CDN에 배포됩니다.

---

### 방법 3: Cloudflare 대시보드 직접 업로드 (드래그 앤 드롭)

1. [Cloudflare Dashboard](https://dash.cloudflare.com/) → **Workers & Pages** → **Create** → **Pages** → **Upload assets**를 클릭합니다.
2. 프로젝트 이름을 지정합니다 (예: `gemini-academy`).
3. 현재 폴더(`c:\Users\wblud\Desktop\2026\가이드 웹사이트 rea`) 안의 모든 파일을 드래그하여 업로드합니다.
4. **Deploy site**를 클릭하면 즉시 배포가 완료됩니다.

---

## 🛠️ 로컬 개발 및 미리보기

- Node.js 내장 serve 실행:
  ```bash
  npm start
  ```
  브라우저에서 `http://localhost:8788` 접속

- Wrangler Pages 개발 환경:
  ```bash
  npm run dev
  ```

---

## 📁 파일 및 캐시 최적화 구성

- `_headers`:
  - 폰트(`.woff2`), 이미지(`.jpg`, `.png`)는 1년간 브라우저 및 엣지 캐시 유지 (`Cache-Control: public, max-age=31536000, immutable`).
  - HTML 문서는 실시간 최신성 유지를 위해 `Cache-Control: public, max-age=0, must-revalidate` 적용.
  - 상단 탭 통합 뷰어(`index.html`)에서 내부 모듈 iframe을 불러올 수 있도록 `X-Frame-Options: SAMEORIGIN` 명시.
- `_routes.json`: 불필요한 Worker 라우팅을 차단하고 순수 정적 고속 서빙 설정.
- `wrangler.jsonc`: Cloudflare Pages 프로젝트 메타데이터 정의.
