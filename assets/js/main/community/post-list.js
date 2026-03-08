// ====== 기본 글 ======
const posts = [
  {
    id: 'notice',
    title: '자유게시판 이용 안내',
    writer: '관리자',
    content: '자유롭게 이용해 주세요.',
    date: '260308',
    views: 1235,
    notice: true
  },
  {
    id: 1,
    title: '취업 가능?',
    writer: '이해준',
    content: '안녕하세요. 자유게시판 첫 글입니다.',
    date: '260302',
    views: 191,
    notice: false
  },
  {
    id: 2,
    title: '오늘의 취업시장?',
    writer: '신짱구',
    content: '다들 공부 진도 공유해요.',
    date: '260303',
    views: 92,
    notice: false
  },
  {
    id: 3,
    title: '프로젝트 질문 있습니다',
    writer: '현주',
    content: '게시판 구조 관련 질문입니다.',
    date: '260304',
    views: 193,
    notice: false
  },
  {
    id: 4,
    title: '자바스크립트 너무 어렵네요 진짜루',
    writer: '민진',
    content: 'DOM이 아직 헷갈립니다.',
    date: '260305',
    views: 54,
    notice: false
  },
  {
    id: 5,
    title: '다들 담배는 피셨나요?',
    writer: '성민',
    content: '저는 아직 못 먹었습니다.',
    date: '260306',
    views: 195,
    notice: false
  }
];

// ====== 글쓰기에서 저장한 글 합치기 ======
const savedPosts = JSON.parse(sessionStorage.getItem('newPosts') || '[]');

for (let i = 0; i < savedPosts.length; i++) {
  posts.push(savedPosts[i]);
}

// ====== 공지/일반 분리 ======
function splitPosts(list) {
  const notice = [];
  const normal = [];

  for (let i = 0; i < list.length; i++) {
    if (list[i].notice) notice.push(list[i]);
    else normal.push(list[i]);
  }

  return { notice, normal };
}

// ====== 일반글 최신순 정렬 ======
function sortNormalNewestFirst(normalList) {
  // id가 숫자(또는 timestamp)라고 가정하고 큰 게 최신
  normalList.sort(function (a, b) {
    return Number(b.id) - Number(a.id);
  });
}

// ====== 페이지에서 보여줄 글 만들기 ======
function getPagePosts(page, list) {
  const data = splitPosts(list);
  const notice = data.notice;
  const normal = data.normal;

  sortNormalNewestFirst(normal);

  const pageSize = 10;

  // 1페이지에 공지가 있으면 공지 1개 + 일반 9개
  if (page === 1 && notice.length > 0) {
    const normalPart = normal.slice(0, pageSize - 1);
    return notice.slice(0, 1).concat(normalPart);
  }

  // 공지가 있으면 2페이지부터는 일반글만 10개씩
  if (notice.length > 0) {
    const start = (page - 2) * pageSize + (pageSize - 1); // 1페이지에서 9개 이미 뺐으니까
    const end = start + pageSize;
    return normal.slice(start, end);
  }

  // 공지 없으면 그냥 10개씩
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  return normal.slice(start, end);
}

// ====== 총 페이지 수 ======
function getTotalPages(list) {
  const data = splitPosts(list);
  const noticeCount = data.notice.length;
  const normalCount = data.normal.length;

  const pageSize = 10;

  // 공지 없으면 일반글만 기준
  if (noticeCount === 0) {
    return Math.max(1, Math.ceil(normalCount / pageSize));
  }

  // 공지 있으면 1페이지에서 일반 9개, 나머지는 10개씩
  if (normalCount <= 9) return 1;

  return 1 + Math.ceil((normalCount - 9) / pageSize);
}

// ====== 화면에 뿌리기 ======
let currentPage = 1;
let filteredPosts = posts;

function render() {
  renderTable(currentPage);
  renderPagination(currentPage);
}

function renderTable(page) {
  const tableBody = document.getElementById('qnaTableBody');
  tableBody.innerHTML = '';

  const pagePosts = getPagePosts(page, filteredPosts);

  for (let i = 0; i < pagePosts.length; i++) {
    const p = pagePosts[i];

    tableBody.innerHTML += `
      <tr class="${p.notice ? 'qna-list-tbl-notice' : ''}" onclick="location.href='qna-detail.html?id=${p.id}'">
        <td class="qna-list-tbl-num">${p.notice ? '공지' : p.id}</td>
        <td>${p.title}</td>
        <td>${p.writer}</td>
        <td>${p.date}</td>
        <td>${p.views}</td>
        <td></td>
      </tr>
    `;
  }
}

function renderPagination(page) {
  const total = getTotalPages(filteredPosts);
  const box = document.getElementById('qnaPagination');

  let html = '';
  html += `<button ${page === 1 ? 'disabled' : ''} onclick="goToPage(${page - 1})">&lt;</button>`;

  for (let i = 1; i <= total; i++) {
    html += `<button class="${i === page ? 'qna-list-pg-active' : ''}" onclick="goToPage(${i})">${i}</button>`;
  }

  html += `<button ${page === total ? 'disabled' : ''} onclick="goToPage(${page + 1})">&gt;</button>`;
  box.innerHTML = html;
}

function goToPage(page) {
  const total = getTotalPages(filteredPosts);
  if (page < 1 || page > total) return;

  currentPage = page;
  render();
}

// ====== 검색 ======
function search() {
  const keyword = document.getElementById('searchInput').value.trim().toLowerCase();
  const type = document.getElementById('searchType').value;

  if (keyword === '') {
    filteredPosts = posts;
    currentPage = 1;
    render();
    return;
  }

  const result = [];

  for (let i = 0; i < posts.length; i++) {
    const p = posts[i];

    if (p.notice) {
      result.push(p);
      continue;
    }

    if (type === 'title' && p.title.toLowerCase().includes(keyword)) result.push(p);
    if (type === 'writer' && p.writer.toLowerCase().includes(keyword)) result.push(p);
    if (type === 'content' && p.content.toLowerCase().includes(keyword)) result.push(p);
  }

  filteredPosts = result;
  currentPage = 1;
  render();
}

document.getElementById('btnSearch').addEventListener('click', search);

document.getElementById('searchInput').addEventListener('keydown', function (e) {
  if (e.key === 'Enter') search();
});

// 처음 실행
render();