document.addEventListener("DOMContentLoaded", function () {

    const noticeBox = document.querySelector(".qnaMgmt-noticeBox");
    const noticeBtn = document.querySelector(".qnaMgmt-noticeEdit");
    const deleteBtn = document.querySelector(".qnaMgmt-delBtn");
    const table = document.querySelector(".qnaMgmt-table");
    const pageSpans = document.querySelectorAll(".qnaMgmt-page span");

    let editMode = false;


    const placeholderText = "공지 내용을 입력하세요...";
    if (noticeBox.textContent.trim() === "") {
        noticeBox.textContent = placeholderText;
        noticeBox.style.color = "#888";
    }

    noticeBox.addEventListener("focus", () => {
        if (!editMode) return;
        if (noticeBox.textContent === placeholderText) {
            noticeBox.textContent = "";
            noticeBox.style.color = "#000";
        }
    });

    noticeBox.addEventListener("blur", () => {
        if (!editMode) return;
        if (noticeBox.textContent.trim() === "") {
            noticeBox.textContent = placeholderText;
            noticeBox.style.color = "#888";
        }
    });


    noticeBtn.addEventListener("click", function () {
        if (!editMode) {
            editMode = true;
            noticeBox.contentEditable = true;
            noticeBox.focus();
            noticeBtn.textContent = "저장";
            if (noticeBox.textContent === placeholderText) {
                noticeBox.textContent = "";
                noticeBox.style.color = "#000";
            }
        } else {
            const content = noticeBox.textContent.trim();
            if (content === "" || content === placeholderText) {
                alert("공지 내용을 입력해주세요!");
                return;
            }
            editMode = false;
            noticeBox.contentEditable = false;
            noticeBtn.textContent = "수정";
            alert("공지사항이 저장되었습니다.");


            const firstRow = table.querySelector(".qnaMgmt-row:not(.qnaMgmt-head)");
            let existingNotice = table.querySelector(".qnaMgmt-noticeRow");

            if (existingNotice) {
                existingNotice.querySelector(".col2").textContent = content;
            } else {
                const noticeRow = document.createElement("div");
                noticeRow.className = "qnaMgmt-row qnaMgmt-noticeRow";
                noticeRow.style.background = "#fff3cd";
                noticeRow.innerHTML = `
                    <div class="col1">공지</div>
                    <div class="col2">${content}</div>
                    <div class="col3">관리자</div>
                    <div class="col4">${new Date().toISOString().slice(0, 6).replace('-', '')}</div>
                    <div class="col5"></div>
                `;
                table.insertBefore(noticeRow, firstRow);
            }
        }
    });


    deleteBtn.addEventListener("click", function () {
        const checkedBoxes = document.querySelectorAll(".qnaMgmt-row input[type='checkbox']:checked");
        if (checkedBoxes.length === 0) {
            alert("삭제할 게시글을 선택하세요.");
            return;
        }
        if (confirm("선택한 게시글을 삭제하시겠습니까?")) {
            checkedBoxes.forEach(box => box.closest(".qnaMgmt-row").remove());
        }
    });


    const rows = Array.from(table.querySelectorAll(".qnaMgmt-row:not(.qnaMgmt-head):not(.qnaMgmt-noticeRow)"));
    const rowsPerPage = 5;
    let currentPage = 1;

    function showPage(page) {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;
        rows.forEach((row, index) => {
            row.style.display = index >= start && index < end ? "flex" : "none";
        });
        pageSpans.forEach(span => span.classList.remove("active"));
        const span = Array.from(pageSpans).find(s => parseInt(s.textContent) === page);
        if (span) span.classList.add("active");
        currentPage = page;
    }

    showPage(1);

    pageSpans.forEach((span) => {
        span.addEventListener("click", () => {
            const text = span.textContent.trim();
            const totalPages = Math.ceil(rows.length / rowsPerPage);
            if (text === "<<") { showPage(1); return; }
            if (text === "<") { showPage(Math.max(1, currentPage - 1)); return; }
            if (text === ">") { showPage(Math.min(totalPages, currentPage + 1)); return; }
            if (text === ">>") { showPage(totalPages); return; }
            const pageNum = parseInt(text);
            if (!isNaN(pageNum)) { showPage(pageNum); }
        });
    });

});