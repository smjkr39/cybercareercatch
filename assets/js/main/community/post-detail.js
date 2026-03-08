var currentUser = sessionStorage.getItem('loginUser');
if (currentUser === null || currentUser === '') currentUser = '회원';

function getPostId() {
  var url = new URL(location.href);
  return url.searchParams.get('id');
}

var basePosts = [
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
  }
];

var savedPosts = JSON.parse(sessionStorage.getItem('newPosts') || '[]');

var allPosts = basePosts.slice();
for (var i = 0; i < savedPosts.length; i++) allPosts.push(savedPosts[i]);

var postId = getPostId();
var post = null;

for (var j = 0; j < allPosts.length; j++) {
  if (String(allPosts[j].id) === String(postId)) {
    post = allPosts[j];
    break;
  }
}

function isMyPost() {
  if (post === null) return false;
  if (post.notice === true) return false;
  return post.writer === currentUser;
}

function renderPost() {
  if (post === null) {
    document.getElementById('postTitleView').innerText = '글을 찾을 수 없습니다.';
    document.getElementById('postWriter').innerText = 'ID : -';
    document.getElementById('postViews').innerText = '| 조회수 : -';
    document.getElementById('postDate').innerText = '| 작성일 : -';
    document.getElementById('postContentView').innerText = '잘못된 접근입니다.';
    document.getElementById('postActions').style.display = 'none';
    document.getElementById('editArea').style.display = 'none';
    return;
  }

  document.getElementById('postTitleView').innerText = post.title;
  document.getElementById('postWriter').innerText = 'ID : ' + post.writer;
  document.getElementById('postViews').innerText = '| 조회수 : ' + post.views;
  document.getElementById('postDate').innerText = '| 작성일 : ' + post.date;
  document.getElementById('postContentView').innerText = post.content;

  if (!isMyPost()) {
    document.getElementById('btnEdit').style.display = 'none';
    document.getElementById('btnDelete').style.display = 'none';
  }
}

function enterEditMode() {
  if (!isMyPost()) return;

  document.getElementById('editArea').style.display = 'block';
  document.getElementById('postTitleView').style.display = 'none';
  document.getElementById('postContentView').style.display = 'none';

  document.getElementById('btnEdit').style.display = 'none';
  document.getElementById('btnDelete').style.display = 'none';
  document.getElementById('btnSave').style.display = 'inline-block';
  document.getElementById('btnCancel').style.display = 'inline-block';

  document.getElementById('editTitle').value = post.title;
  document.getElementById('editContent').value = post.content;
}

function exitEditMode() {
  document.getElementById('editArea').style.display = 'none';
  document.getElementById('postTitleView').style.display = 'block';
  document.getElementById('postContentView').style.display = 'block';

  document.getElementById('btnSave').style.display = 'none';
  document.getElementById('btnCancel').style.display = 'none';

  if (isMyPost()) {
    document.getElementById('btnEdit').style.display = 'inline-block';
    document.getElementById('btnDelete').style.display = 'inline-block';
  }
}

function saveEdit() {
  if (!isMyPost()) return;

  var newTitle = document.getElementById('editTitle').value.trim();
  var newContent = document.getElementById('editContent').value.trim();

  if (newTitle === '') {
    alert('제목을 입력해주세요.');
    return;
  }
  if (newContent === '') {
    alert('내용을 입력해주세요.');
    return;
  }

  post.title = newTitle;
  post.content = newContent;

  var newPosts = JSON.parse(sessionStorage.getItem('newPosts') || '[]');
  for (var i = 0; i < newPosts.length; i++) {
    if (String(newPosts[i].id) === String(post.id)) {
      newPosts[i].title = newTitle;
      newPosts[i].content = newContent;
      break;
    }
  }
  sessionStorage.setItem('newPosts', JSON.stringify(newPosts));

  renderPost();
  exitEditMode();
  alert('수정되었습니다.');
}

function deletePost() {
  if (!isMyPost()) return;

  var ok = confirm('삭제하시겠습니까?');
  if (!ok) return;

  var newPosts = JSON.parse(sessionStorage.getItem('newPosts') || '[]');
  var next = [];

  for (var i = 0; i < newPosts.length; i++) {
    if (String(newPosts[i].id) !== String(post.id)) next.push(newPosts[i]);
  }

  sessionStorage.setItem('newPosts', JSON.stringify(next));
  alert('삭제되었습니다.');
  location.href = 'post-list.html';
}

function commentKey() {
  return 'comments_' + String(postId);
}

function loadComments() {
  return JSON.parse(sessionStorage.getItem(commentKey()) || '[]');
}

function saveComments(list) {
  sessionStorage.setItem(commentKey(), JSON.stringify(list));
}

function renderComments() {
  var listBox = document.getElementById('commentList');
  listBox.innerHTML = '';

  var comments = loadComments();

  for (var i = 0; i < comments.length; i++) {
    var c = comments[i];

    var delBtn = '';
    if (c.writer === currentUser) {
      delBtn = '<button type="button" class="fd-comment-del" data-id="' + c.id + '">×</button>';
    }

    listBox.innerHTML +=
      '<div class="fd-comment-row">' +
        '<div class="fd-comment-left">' +
          '<div class="fd-comment-meta">' + c.writer + '   ' + c.datetime + '</div>' +
          '<div class="fd-comment-text">' + c.text + '</div>' +
        '</div>' +
        delBtn +
      '</div>';
  }

  var delButtons = document.querySelectorAll('.fd-comment-del');
  for (var j = 0; j < delButtons.length; j++) {
    delButtons[j].addEventListener('click', function () {
      var id = this.getAttribute('data-id');
      deleteComment(id);
    });
  }
}

function addComment() {
  if (post === null) return;

  var input = document.getElementById('commentInput');
  var text = input.value.trim();
  if (text === '') {
    alert('댓글을 입력해주세요.');
    return;
  }

  var now = new Date();
  var yy = String(now.getFullYear()).slice(2);
  var mm = String(now.getMonth() + 1).padStart(2, '0');
  var dd = String(now.getDate()).padStart(2, '0');
  var hh = String(now.getHours()).padStart(2, '0');
  var mi = String(now.getMinutes()).padStart(2, '0');

  var comments = loadComments();

  comments.unshift({
    id: String(Date.now()),
    writer: currentUser,
    datetime: yy + '.' + mm + '.' + dd + '  ' + hh + ':' + mi,
    text: text
  });

  saveComments(comments);
  input.value = '';
  renderComments();
}

function deleteComment(commentId) {
  var comments = loadComments();
  var next = [];

  for (var i = 0; i < comments.length; i++) {
    if (String(comments[i].id) !== String(commentId)) next.push(comments[i]);
  }

  saveComments(next);
  renderComments();
}

document.getElementById('btnEdit').addEventListener('click', enterEditMode);
document.getElementById('btnCancel').addEventListener('click', exitEditMode);
document.getElementById('btnSave').addEventListener('click', saveEdit);
document.getElementById('btnDelete').addEventListener('click', deletePost);

document.getElementById('btnComment').addEventListener('click', addComment);
document.getElementById('commentInput').addEventListener('keydown', function (e) {
  if (e.key === 'Enter') addComment();
});

renderPost();
renderComments();