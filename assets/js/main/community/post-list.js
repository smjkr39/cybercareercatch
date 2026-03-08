var posts = [
  { id: 1, title: '자유게시판 이용 안내', writer: '관리자', date: '260308' },
  { id: 2, title: '취업 가능?', writer: '이해준', date: '260302' },
  { id: 3, title: '오늘의 취업시장?', writer: '신짱구', date: '260303' },
  { id: 4, title: '프로젝트 질문 있습니다', writer: '현주', date: '260304' },
  { id: 5, title: '자바스크립트 너무 어렵네요', writer: '민진', date: '260305' },
  { id: 6, title: '다들 담배는 피셨나요?', writer: '성민', date: '260306' },
  { id: 8, title: '포트폴리오 질문', writer: '유리', date: '260307' },
  { id: 9, title: '국비 과정 후기', writer: '맹구', date: '260307' },
  { id: 10, title: 'SQL 어렵네요', writer: '훈이', date: '260307' },
  { id: 11, title: '자격증 추천 부탁드려요', writer: '짱아', date: '260308' },
  { id: 12, title: '팀플 깃허브 질문', writer: '봉미선', date: '260308' }
];

var postsPerPage = 10;
var currentPage = 1;

function renderPosts() {
  var listBody = document.getElementById('postList');
  listBody.innerHTML = '';

  var start = (currentPage - 1) * postsPerPage;
  var end = start + postsPerPage;
  var pagePosts = posts.slice(start, end);

  for (var i = 0; i < pagePosts.length; i++) {
    var post = pagePosts[i];

    listBody.innerHTML += `
      <div class="qna-list-row">
        <div class="qna-list-col-num">${post.id}</div>
        <div class="qna-list-col-title">
          <a href="qna-view.html?id=${post.id}">${post.title}</a>
        </div>
        <div class="qna-list-col-writer">${post.writer}</div>
        <div class="qna-list-col-date">${post.date}</div>
      </div>
    `;
  }
}

function renderPagination() {
  var pageBox = document.getElementById('pagination');
  pageBox.innerHTML = '';

  var totalPages = Math.ceil(posts.length / postsPerPage);

  for (var i = 1; i <= totalPages; i++) {
    pageBox.innerHTML += `
      <button type="button" onclick="goPage(${i})">${i}</button>
    `;
  }
}

function goPage(page) {
  currentPage = page;
  renderPosts();
}

renderPosts();
renderPagination();