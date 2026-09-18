/* ===================================================
   명지국제오션룸 - 메인 스크립트
   =================================================== */

// 1) 푸터 연도 자동 갱신
document.getElementById('year').textContent = new Date().getFullYear();

// 2) 스크롤 시 헤더 배경 전환
const header = document.getElementById('header');
const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 40);
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

// 3) 섹션 등장 애니메이션
const targets = document.querySelectorAll(
  '.feature, .room-card, .menu-col, .location-info, .map, .section-title'
);
targets.forEach(el => el.classList.add('reveal'));

const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('on');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

targets.forEach(el => io.observe(el));

// 4) 헤더 높이만큼 앵커 위치 보정
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const id = link.getAttribute('href');
    if (id === '#') return;
    const target = document.querySelector(id);
    if (!target) return;
    e.preventDefault();
    const top = target.getBoundingClientRect().top + window.scrollY - 68;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

/* ===================================================
   지도 관련 JS는 없습니다.
   구글맵을 index.html에 iframe으로 직접 넣었고,
   이 방식은 API 키도 스크립트도 필요 없습니다.

   (참고) 카카오맵으로 바꾸고 싶다면 그때는 JS 키가 필요합니다.
   README "지도" 항목을 보세요.
   =================================================== */