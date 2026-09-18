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