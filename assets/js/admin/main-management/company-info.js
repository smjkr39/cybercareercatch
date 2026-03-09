document.addEventListener("DOMContentLoaded", function () {

    const deleteBtn = document.querySelector(".companyInfo-del button");
    const allRows = Array.from(document.querySelectorAll(".companyInfo-row"));
    const pageSpans = document.querySelectorAll(".companyInfo-page span");

    const rowsPerPage = 10;
    let currentPage = 1;
    const totalPages = Math.ceil(allRows.length / rowsPerPage);

    function showPage(page) {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        allRows.forEach((row, i) => {
            row.style.display = (i >= start && i < end) ? "flex" : "none";
        });

        pageSpans.forEach(span => span.classList.remove("active"));
        const span = Array.from(pageSpans).find(s => parseInt(s.textContent) === page);
        if (span) span.classList.add("active");

        currentPage = page;
    }

    showPage(1);

    pageSpans.forEach(span => {
        span.addEventListener("click", () => {
            const text = span.textContent.trim();

            if (text === "<") {
                showPage(Math.max(1, currentPage - 1));
                return;
            }
            if (text === ">") {
                showPage(Math.min(totalPages, currentPage + 1));
                return;
            }

            const pageNum = parseInt(text);
            if (!isNaN(pageNum)) {
                showPage(pageNum);
            }
        });
    });

    deleteBtn.addEventListener("click", function () {

        const visibleRows = allRows.filter(row => row.style.display !== "none");
        const checkedBoxes = visibleRows
            .map(row => row.querySelector("input[type='checkbox']"))
            .filter(box => box.checked);

        if (checkedBoxes.length === 0) {
            alert("삭제할 항목을 선택하세요.");
            return;
        }

        if (confirm("선택한 항목을 삭제하시겠습니까?")) {
            checkedBoxes.forEach(box => {
                const index = allRows.indexOf(box.closest(".companyInfo-row"));
                if (index > -1) allRows.splice(index, 1);
                box.closest(".companyInfo-row").remove();
            });
            showPage(currentPage);
        }
    });

});