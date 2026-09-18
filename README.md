# 명지국제오션룸 홍보 사이트 — 제작 · 배포 가이드

VS Code + GitHub Pages로 정적 사이트를 만들고 배포하는 전체 절차입니다.
빌드 도구 없이 순수 HTML/CSS/JS 구성이라 GitHub Pages에 그대로 올라갑니다.

---

## 폴더 구조

```
ocean-room-site/
├── index.html              메인 페이지 (모든 섹션)
├── assets/
│   ├── css/style.css       스타일 (색상은 :root 변수만 수정)
│   ├── js/main.js          스크롤 효과 · 카카오맵
│   └── img/                사진 넣는 곳 (hero.jpg, room1.jpg ...)
├── robots.txt              검색엔진 수집 허용
├── sitemap.xml             사이트맵 (도메인 확정 후 수정)
├── .nojekyll               GitHub Pages Jekyll 처리 끄기
└── .github/workflows/
    └── deploy.yml          push하면 자동 배포
```

---

## 1단계 — 로컬 환경 준비

1. **VS Code 설치** — https://code.visualstudio.com
2. **Git 설치** — https://git-scm.com/download/win (Windows 기준, 기본값 그대로 설치)
3. VS Code 확장 2개 설치 (좌측 네모 아이콘 → 검색)
   - `Live Server` — 저장하면 브라우저 자동 새로고침
   - `Korean Language Pack` (선택)
4. 이 폴더를 VS Code로 열기 → **File > Open Folder**
5. `index.html` 우클릭 → **Open with Live Server** → 브라우저에서 확인

Git 최초 1회 설정 (VS Code 터미널 `Ctrl + \``):

```bash
git config --global user.name "본인이름"
git config --global user.email "roehdlfcjs@gmail.com"
```

---

## 2단계 — 내용 채우기

`index.html`에서 아래 항목을 실제 정보로 교체하세요.
전화번호는 **3곳 이상**에 들어 있으니 `Ctrl + H`로 일괄 치환하는 게 편합니다.

| 찾을 내용 | 바꿀 내용 |
|---|---|
| `000-0000-0000` | 실제 예약 전화번호 |
| `tel:00000000000` | `tel:` + 하이픈 없는 번호 |
| `18:00 ~ 05:00` | 실제 영업시간 |
| `000,000원` 등 | 실제 메뉴 가격 |
| `0개 룸` | 실제 룸 개수 |
| `사업자등록번호 000-00-00000` | 실제 사업자 정보 |

사진은 `assets/img/`에 넣고 파일명을 맞춰주세요.

- `hero.jpg` — 상단 배경 (가로 1920px 권장) → `style.css`의 `.hero-bg`에서 주석 참고
- `room1.jpg` ~ `room3.jpg` — 룸 사진 (가로 800px 권장)
- `og.jpg` — 카톡/밴드 공유 시 썸네일 (1200×630px)

용량은 장당 300KB 이하로 줄이세요 (https://squoosh.app 사용).

---

## 3단계 — GitHub 저장소 만들고 올리기

1. https://github.com 에서 **New repository**
   - 이름: `ocean-room` (아무거나)
   - **Public** 선택 (무료 계정은 Public이어야 Pages가 동작)
   - README 체크 해제
2. VS Code 터미널에서:

```bash
git init
git add .
git commit -m "init: 사이트 초기 구성"
git branch -M main
git remote add origin https://github.com/본인계정/ocean-room.git
git push -u origin main
```

3. GitHub 저장소 → **Settings > Pages**
   - Source: **GitHub Actions** 선택
4. 1~2분 뒤 `https://본인계정.github.io/ocean-room/` 로 접속

이후 수정할 때는 이 3줄만 반복하면 자동 재배포됩니다.

```bash
git add .
git commit -m "수정 내용"
git push
```

---

## 4단계 — 카카오맵 붙이기 (선택)

1. https://developers.kakao.com → 로그인 → **내 애플리케이션 > 애플리케이션 추가**
2. 앱 선택 → **앱 키 > JavaScript 키** 복사
3. **플랫폼 > Web > 사이트 도메인 등록**
   - `https://본인계정.github.io`
   - (도메인 연결 후) `https://실제도메인.com`
4. `index.html`의 `</body>` 바로 앞에 추가:

```html
<script src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=복사한키"></script>
```

5. `assets/js/main.js` 맨 아래 `/* */` 주석 블록을 해제

> JavaScript 키는 도메인 제한이 걸려 있어 공개돼도 안전합니다. REST API 키는 절대 넣지 마세요.

---

## 5단계 — 도메인 연결 (나중에)

도메인을 구매한 뒤:

1. 프로젝트 루트에 `CNAME` 파일 생성, 내용은 도메인 한 줄

```
oceanroom.co.kr
```

2. 도메인 등록업체 DNS 설정에서:

| 타입 | 호스트 | 값 |
|---|---|---|
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |
| CNAME | www | 본인계정.github.io |

3. GitHub **Settings > Pages > Custom domain**에 도메인 입력 → 저장
4. DNS 반영(최대 24시간) 후 **Enforce HTTPS** 체크
5. `sitemap.xml`, `index.html`의 `og:url`, 구조화 데이터 `url`을 실제 도메인으로 수정

---

## 6단계 — 검색 노출

- **네이버**: https://searchadvisor.naver.com → 사이트 등록 → HTML 태그 방식으로 소유확인 → `sitemap.xml` 제출
- **구글**: https://search.google.com/search-console → 동일 절차
- 네이버 지도(스마트플레이스)에 업체 등록 시 홈페이지 주소를 넣으면 유입에 가장 효과적입니다

---

## 참고

- 홍보물에는 청소년 출입 제한 문구가 들어가 있어야 합니다 (푸터에 포함됨)
- 가격은 부가세 포함 여부를 명시하세요 (표시광고법)
- 사진은 직접 촬영한 것만 사용하세요. 타 업소 사진·문구 복제는 저작권 문제가 됩니다
