// qna-list-tbl : 행 클릭 → 상세 페이지 이동
document.querySelectorAll('.qna-list-tbl tbody tr').forEach(row => {
  row.addEventListener('click', function () {
    location.href = 'qna-detail.html?id=' + this.dataset.id;
  });
});

// qna-list-pg : 페이지네이션 버튼 클릭
document.querySelectorAll('.qna-list-pg button').forEach(btn => {
  btn.addEventListener('click', function () {
    if (!this.disabled) location.href = '?page=' + this.dataset.page;
  });
});