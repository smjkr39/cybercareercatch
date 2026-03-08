// qna-detail : URL 쿼리스트링 ?id= 로 게시글 ID 받아서 렌더링
// 실제 서비스에서는 API 호출로 교체

// 샘플 게시글 데이터 (qna-list.js와 동일한 구조)
const posts = [
  { id: 'notice', num: '공지', title: '공지사항', company: '관리자', date: '700202', views: 1235, badge: null, notice: true },
  { id: 1, num: 1, title: '꼬으으응 뭘적지', company: '디노기', date: '260302', views: 191, badge: 'wait' },
  { id: 2, num: 2, title: '꼬으으응 뭘적지', company: '디노기', date: '260303', views: 192, badge: 'done' },
  { id: 3, num: 3, title: '꼬으으응 뭘적지', company: '디노기', date: '260304', views: 193, badge: 'wait' },
  { id: 4, num: 4, title: '꼬으으응 뭘적지', company: '디노기', date: '260305', views: 194, badge: 'wait' },
  { id: 5, num: 5, title: '야홍', company: '디노기', date: '260306', views: 195, badge: 'wait' },
];

// 댓글 목록 (실제는 API)
const comments = [
  { author: '코리아 IT', date: '2026.03.02 14:20', body: '안알라줌' }
];

// URL에서 id 파싱
const urlId = new URLSearchParams(location.search).get('id');
const post = posts.find(p => String(p.id) === String(urlId)) || posts[1];

// qna-detail-post 렌더링
document.getElementById('detailTitle').textContent   = post.title;
document.getElementById('detailCompany').textContent = post.company;
document.getElementById('detailAuthor').textContent  = post.author || '유저';
document.getElementById('detailViews').textContent   = post.views;
document.getElementById('detailDate').textContent    = '2026.02.28 14:00';
document.getElementById('detailBody').textContent    = post.body || '';
document.getElementById('detailTag').textContent     = post.tag || '소식';