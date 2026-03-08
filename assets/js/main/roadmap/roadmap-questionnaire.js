const showMoreBtn = document.getElementById("showmore");
const stepList = document.querySelector(".rmq-steplist");

showMoreBtn.addEventListener("click", function () {
    stepList.classList.toggle("active");

    if (stepList.classList.contains("active")) {
        showMoreBtn.textContent = "접기 -";
    } else {
        showMoreBtn.textContent = "더보기 +";
    }
});