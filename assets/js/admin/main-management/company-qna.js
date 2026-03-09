document.addEventListener("DOMContentLoaded", function () {
    const rowsPerPage = 10;
    let currentPage = 1;

    const qnaTable = document.querySelector(".qna-table");
    const pageSpans = document.querySelectorAll(".qna-page span");
    const deleteBtn = document.getElementById("delete-btn");
    const companySelect = document.querySelector(".qna-filter select");
    const noticeBox = document.getElementById("notice-box");
    const noticeBtn = document.getElementById("notice-btn");

    let noticeRow = null;
    let qnaRows = Array.from(qnaTable.querySelectorAll(".qna-row:not(.qna-head)"));


    noticeBtn.addEventListener("click", () => {
        if (!noticeBox.dataset.editing) {
            noticeBox.dataset.editing = "true";
            noticeBox.focus();
            noticeBtn.textContent = "저장";
        } else {
            const content = noticeBox.value.trim();
            if (!content) { alert("공지 내용을 입력해주세요!"); return; }
            noticeBox.dataset.editing = "";
            noticeBtn.textContent = "수정";
            alert("공지 내용이 저장되었습니다!");

            if (!noticeRow) {
                noticeRow = document.createElement("div");
                noticeRow.className = "qna-row";
                noticeRow.style.background = "#fff3cd";
                qnaTable.insertBefore(noticeRow, qnaRows[0]);
            }
            noticeRow.innerHTML = `
                <div class="col1">공지</div>
                <div class="col2">${content}</div>
                <div class="col3">관리자</div>
                <div class="col4">${new Date().toISOString().slice(2, 10).replace(/-/g, "")}</div>
                <div class="col5">-</div>
                <div class="col6"></div>
            `;
        }
    });


    function showPage(page) {
        currentPage = page;
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        qnaRows.forEach((row, i) => {
            row.style.display = (i >= start && i < end) ? "flex" : "none";
        });
        if (noticeRow) noticeRow.style.display = "flex";

        pageSpans.forEach(s => s.classList.remove("active"));
        const span = Array.from(pageSpans).find(s => parseInt(s.textContent) === page);
        if (span) span.classList.add("active");
    }
    showPage(1);

    pageSpans.forEach(span => {
        span.addEventListener("click", () => {
            const text = span.textContent.trim();
            const totalPages = Math.ceil(qnaRows.length / rowsPerPage);
            if (text === "<<") showPage(1);
            else if (text === ">>") showPage(totalPages);
            else if (text === "<") showPage(Math.max(1, currentPage - 1));
            else if (text == ">") showPage(Math.min(totalPages, currentPage + 1));
            else if (!isNaN(parseInt(text))) showPage(parseInt(text));
        });
    });


    deleteBtn.addEventListener("click", () => {
        const visibleRows = qnaRows.filter(r => r.style.display !== "none");
        const checkedBoxes = visibleRows.map(r => r.querySelector('input[type="checkbox"]')).filter(b => b.checked);
        if (checkedBoxes.length === 0) { alert("삭제할 항목을 선택하세요."); return; }
        if (confirm("선택한 항목을 삭제하시겠습니까?")) {
            checkedBoxes.forEach(box => {
                const row = box.closest(".qna-row");
                const idx = qnaRows.indexOf(row);
                if (idx > -1) qnaRows.splice(idx, 1);
                row.remove();
            });
            showPage(currentPage);
        }
    });


    companySelect.addEventListener("change", () => {
        const selected = companySelect.value;
        qnaRows.forEach(row => {
            const companyName = row.querySelector(".col3").textContent;
            row.style.display = (selected === "기업선택" || companyName === selected) ? "flex" : "none";
        });
        showPage(1);
    });
});