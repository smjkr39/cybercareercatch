document.addEventListener('DOMContentLoaded', () => {


    const tabs = document.querySelectorAll('.rm-tabmenu a');
    tabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            e.preventDefault();
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            alert(tab.textContent + "  클릭");
        });
    });


    const uploadBtn = document.querySelector('.rm-upload-btn');
    uploadBtn.addEventListener('click', () => {
        const input = uploadBtn.previousElementSibling;
        alert("이미지 업로드: " + input.value);
    });

  
    const btnCheck = document.querySelector('.rm-btn1');
    const btnEdit = document.querySelector('.rm-btn2');
    const btnReset = document.querySelector('.rm-btn3');

    btnCheck.addEventListener('click', (e) => {
        e.preventDefault();
        alert("데이터 확인 완료");
    });

    btnEdit.addEventListener('click', (e) => {
        e.preventDefault();
        alert("데이터 수정 완료");
    });

    btnReset.addEventListener('click', (e) => {
        alert("입력 내용 초기화됨");
    });

});