document.addEventListener("DOMContentLoaded", function () {

    const expoTable = document.querySelector(".expoDetail-table");
    const companyList = document.querySelector(".expoDetail-company-list");

    const companyInput = document.querySelector(".expoDetail-company-text");
    const addCompanyBtn = document.querySelector(".expoDetail-company-add");

    const saveBtn = document.querySelector(".expoDetail-save");
    const resetBtn = document.querySelector(".expoDetail-reset");

    const titleInput = document.querySelectorAll(".expoDetail-form-row input")[0];
    const startInput = document.querySelectorAll(".expoDetail-form-row input")[1];
    const endInput = document.querySelectorAll(".expoDetail-form-row input")[2];
    const placeInput = document.querySelectorAll(".expoDetail-form-row input")[3];



    addCompanyBtn.addEventListener("click", function () {

        const name = companyInput.value.trim();

        if (name === "") {
            alert("회사명을 입력하세요");
            return;
        }

        const p = document.createElement("p");
        p.textContent = name;

        p.addEventListener("click", function () {
            if (confirm("삭제하시겠습니까?")) {
                p.remove();
            }
        });

        companyList.appendChild(p);
        companyInput.value = "";

    });



    saveBtn.addEventListener("click", function () {

        const title = titleInput.value.trim();
        const start = startInput.value;
        const end = endInput.value;
        const place = placeInput.value;

        const companies = document.querySelectorAll(".expoDetail-company-list p");

        if (title === "" || start === "" || end === "" || place === "") {
            alert("모든 정보를 입력하세요");
            return;
        }

        const companyCount = companies.length;



        const rows = document.querySelectorAll(".expoDetail-row:not(.expoDetail-head)");
        const newNum = rows.length + 1;



        function formatDate(date) {
            const d = new Date(date);
            const y = d.getFullYear();
            const m = String(d.getMonth() + 1).padStart(2, "0");
            const da = String(d.getDate()).padStart(2, "0");
            return `${y}년${m}월${da}일`;
        }




        const row = document.createElement("div");
        row.className = "expoDetail-row";

        row.innerHTML = `
<div>${newNum}</div>
<div>${title}</div>
<div>${formatDate(start)}</div>
<div>${formatDate(end)}</div>
<div>${place}</div>
<div>${companyCount}</div>
<div>수정 삭제</div>
`;




        row.addEventListener("click", function () {

            companyList.innerHTML = "";

            companies.forEach(function (c) {

                const p = document.createElement("p");
                p.textContent = c.textContent;

                p.addEventListener("click", function () {
                    if (confirm("삭제하시겠습니까?")) {
                        p.remove();
                    }
                });

                companyList.appendChild(p);

            });

        });


        expoTable.appendChild(row);

        alert("박람회가 추가되었습니다");

    });



    resetBtn.addEventListener("click", function () {

        titleInput.value = "";
        startInput.value = "";
        endInput.value = "";
        placeInput.value = "";
        companyList.innerHTML = "";

    });

});