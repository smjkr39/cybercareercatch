const posts = [
  { id: 1, title: "채용 절차에 대해 질문이 있습니다", company: "김철수", date: "260302", views: 191 },
  { id: 2, title: "꼬으으응 뭘적지", company: "디노기", date: "260303", views: 192 },
  { id: 3, title: "꼬으으응 뭘적지", company: "디노기", date: "260304", views: 193 },
  { id: 4, title: "꼬으으응 뭘적지", company: "디노기", date: "260305", views: 194 },
  { id: 5, title: "꼬으으응 뭘적지", company: "디노기", date: "260305", views: 198 },
  { id: 6, title: "꼬으으응 뭘적지", company: "디노기", date: "260305", views: 178 },
  { id: 7, title: "꼬으으응 뭘적지", company: "디노기", date: "260305", views: 190 },
  { id: 8, title: "꼬으으응 뭘적지", company: "디노기", date: "260305", views: 128 },
  { id: 9, title: "꼬으으응 뭘적지", company: "디노기", date: "260305", views: 137 },
  { id: 10, title: "꼬으으응 뭘적지", company: "디노기", date: "260305", views: 164 },
  { id: 11, title: "꼬으으응 뭘적지", company: "디노기", date: "260305", views: 118 },
];

const ITEMS_PER_PAGE = 10;
let currentPage = 1;

function getNormal() {
  return posts.filter(p => !p.notice);
}

// qna-list-tbl-body : div 행 렌더링
function renderTable(page) {
  const start = (page - 1) * ITEMS_PER_PAGE;
  const normal = getNormal().slice(start, start + ITEMS_PER_PAGE);
  const items = normal;

  document.getElementById('qna-tbl-body').innerHTML = items.map(item => `
  <div class="qna-list-tbl-row" onclick="openPost(${item.id})">
    <div class="qna-list-tbl-num">${item.id}</div>
    <div class="qna-list-tbl-title">${item.title}</div>
    <div class="qna-list-tbl-company">${item.company}</div>
    <div class="qna-list-tbl-date">${item.date}</div>
    <div class="qna-list-tbl-views">${item.views}</div>
  </div>
`).join('');
}

// qna-list-pg 페이지네이션 렌더링
function renderPagination(page) {
  const total = Math.max(1, Math.ceil(getNormal().length / ITEMS_PER_PAGE));
  let html = `<button ${page === 1 ? 'disabled' : ''} onclick="goToPage(${page - 1})">&lt;</button>`;
  for (let i = 1; i <= total; i++) {
    html += `<button class="${i === page ? 'active' : ''}" onclick="goToPage(${i})">${i}</button>`;
  }
  html += `<button ${page === total ? 'disabled' : ''} onclick="goToPage(${page + 1})">&gt;</button>`;
  document.getElementById('qnaPagination').innerHTML = html;
}

function goToPage(page) {
  const total = Math.max(1, Math.ceil(getNormal().length / ITEMS_PER_PAGE));
  if (page < 1 || page > total) return;
  currentPage = page;
  renderTable(currentPage);
  renderPagination(currentPage);
}

function openPost(id) {
  location.href = 'qna-detail.html?id=' + id;
}

renderTable(currentPage);
renderPagination(currentPage);
