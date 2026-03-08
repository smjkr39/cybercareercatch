// URL에서 id 가져오기 (예: notice-detail.html?id=notice1)
function getQueryValue(key) {
  const url = new URL(location.href);
  return url.searchParams.get(key);
}

// 공지 더미 데이터(나중에 DB/API로 바꾸면 됨)
const notices = [
  {
    id: 'notice1',
    title: '공지사항/게시판 규정 꼭!!!읽!!!',
    writer: '관리자',
    date: '260308',
    views: 3,
    content:
      '커뮤니티 글을 작성할 때는 욕설/비방/홍보/도배를 금지합니다.\n\n' +
      '위반 시 게시글 삭제 및 이용 제한이 있을 수 있습니다.\n\n' +
      '문의가 있으면 관리자에게 연락해주세요.'
  }
];

const noticeId = getQueryValue('id');

// id에 맞는 공지 찾기
let target = null;

for (let i = 0; i < notices.length; i++) {
  if (notices[i].id === noticeId) {
    target = notices[i];
    break;
  }
}

// 화면에 뿌리기
if (target === null) {
  document.getElementById('noticeTitle').innerText = '공지사항을 찾을 수 없습니다.';
  document.getElementById('noticeContent').innerText = '잘못된 접근입니다.';
} else {
  document.getElementById('noticeTitle').innerText = target.title;
  document.getElementById('noticeWriter').innerText = '작성자: ' + target.writer;
  document.getElementById('noticeDate').innerText = '| 작성일: ' + target.date;
  document.getElementById('noticeViews').innerText = '| 조회수: ' + target.views;

  // 줄바꿈 \n 적용하려고 textContent 사용
  document.getElementById('noticeContent').textContent = target.content;
}