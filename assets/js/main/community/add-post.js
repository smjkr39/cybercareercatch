// 등록 버튼
const saveBtn = document.getElementById('savePostBtn');

saveBtn.addEventListener('click', function () {
  // 제목/내용 가져오기
  const title = document.getElementById('postTitle').value.trim();
  const content = document.getElementById('postContent').value.trim();

  // 빈값 체크
  if (title === '') {
    alert('제목을 입력해주세요.');
    return;
  }

  if (content === '') {
    alert('내용을 입력해주세요.');
    return;
  }

  // 저장된 글 목록 가져오기
  let newPosts = sessionStorage.getItem('newPosts');
  if (newPosts === null) {
    newPosts = [];
  } else {
    newPosts = JSON.parse(newPosts);
  }

  // 날짜(YYMMDD)
  const d = new Date();
  const yy = String(d.getFullYear()).slice(2);
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');

  // 새 글 만들기
  const post = {
    id: new Date().getTime(),   // 간단하게 시간값을 id로
    title: title,
    writer: '회원',
    content: content,
    date: yy + mm + dd,
    views: 0,
    notice: false
  };

  // 최신글 맨 위로
  newPosts.unshift(post);

  // 저장
  sessionStorage.setItem('newPosts', JSON.stringify(newPosts));

  // 이동
  alert('게시글이 등록되었습니다.');
  location.href = 'post-list.html';
});