document.addEventListener("DOMContentLoaded", function () {

    const questions = document.querySelectorAll(".qnaMgmt-qItem");

    questions.forEach(function (question) {

        const input = question.querySelector("input");

        const checkBtn = question.querySelector(".qnaMgmt-check");
        const editBtn = question.querySelector(".qnaMgmt-edit");
        const cancelBtn = question.querySelector(".qnaMgmt-cancel");

        let savedValue = "";


        checkBtn.addEventListener("click", function () {

            if (input.value.trim() === "") {
                alert("내용을 입력하세요.");
                return;
            }

            savedValue = input.value;

            input.disabled = true;

            alert("저장되었습니다.");

        });

        editBtn.addEventListener("click", function () {

            input.disabled = false;

            input.focus();

        });

        cancelBtn.addEventListener("click", function () {

            input.value = savedValue;

        });

    });

});