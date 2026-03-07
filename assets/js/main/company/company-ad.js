const ITEMS_PER_PAGE = 9;
const MAX_VISIBLE_PAGES = 5;

// 전체 카드 데이터 (실제 서비스에서는 API 응답으로 교체)
const allCards = Array.from({ length: 45 }, (_, i) => ({
  id: i + 1,
  label: `기업 ${i + 1}`,
  popularity: Math.floor(Math.random() * 10000),
  createdAt: new Date(2024, 0, 1).getTime() + i * 86400000,
}));

let currentPage = 1;
let filteredCards = [...allCards];

function sortCards(order) {
  const sorted = [...allCards];
  if (order === '이름순') {
    sorted.sort((a, b) => a.label.localeCompare(b.label, 'ko'));
  } else if (order === '인기순') {
    sorted.sort((a, b) => b.popularity - a.popularity);
  } else {
    sorted.sort((a, b) => b.createdAt - a.createdAt);
  }
  return sorted;
}

// ad-grid-card : 카드 HTML 생성 (ad-grid-card-num, ad-grid-card-meta 포함)
function renderCards(page) {
  const grid = document.getElementById('cardGrid');
  const start = (page - 1) * ITEMS_PER_PAGE;
  const items = filteredCards.slice(start, start + ITEMS_PER_PAGE);
  grid.innerHTML = items.map(item => `
    <div class="ad-grid-card">
      <span class="ad-grid-card-num">${item.id}</span>
      <span>${item.label}</span>
    </div>
  `).join('');
}

// ad-pg-active : 현재 페이지 버튼 활성 클래스
function renderPagination(page) {
  const totalPages = Math.ceil(filteredCards.length / ITEMS_PER_PAGE);
  const container = document.getElementById('pagination');
  let startPage = Math.max(1, page - Math.floor(MAX_VISIBLE_PAGES / 2));
  let endPage = Math.min(totalPages, startPage + MAX_VISIBLE_PAGES - 1);
  if (endPage - startPage < MAX_VISIBLE_PAGES - 1) {
    startPage = Math.max(1, endPage - MAX_VISIBLE_PAGES + 1);
  }
  let html = '';
  html += `<button ${page === 1 ? 'disabled' : ''} onclick="goToPage(${page - 1})">&lt;</button>`;
  for (let i = startPage; i <= endPage; i++) {
    html += `<button class="${i === page ? 'ad-pg-active' : ''}" onclick="goToPage(${i})">${i}</button>`;
  }
  html += `<button ${page === totalPages ? 'disabled' : ''} onclick="goToPage(${page + 1})">&gt;</button>`;
  container.innerHTML = html;
}

function goToPage(page) {
  const totalPages = Math.ceil(filteredCards.length / ITEMS_PER_PAGE);
  if (page < 1 || page > totalPages) return;
  currentPage = page;
  renderCards(currentPage);
  renderPagination(currentPage);
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

document.getElementById('sortSelect').addEventListener('change', function () {
  filteredCards = sortCards(this.value);
  currentPage = 1;
  renderCards(currentPage);
  renderPagination(currentPage);
});

filteredCards = sortCards('최신순');
renderCards(currentPage);
renderPagination(currentPage);