document.addEventListener("DOMContentLoaded", function(){

  const expoRows = Array.from(document.querySelectorAll(".expoSchedule-table .expoSchedule-row:not(.expoSchedule-head)"));
  const companyBox = document.querySelector(".expoSchedule-company");
  const deleteBtn = document.querySelector(".expoSchedule-company-delBtn");
  const pageSpans = document.querySelectorAll(".expoSchedule-page span");

  const expoCompanies = {
    10:["사랑기업","행복기업","미래기업"],
    9:["삼상","엘주","네버"],
    8:["카오","라이너"],
    7:["쿠핑","배몬","토시"],
    6:["현디","아기"],
    5:["아플","마이크레트"],
    4:["구긍","아마진"],
    3:["안비아"],
    2:["테살라"],
    1:["성민교회","성민치과"]
  };


  function renderCompanies(expoNum){
    const companies = expoCompanies[expoNum] || [];
    let html = "<h3>참가기업 목록</h3>";
    companies.forEach((name,i)=>{
      html += `
      <div class="expoSchedule-company-row">
        <span>${i+1}</span>
        <span>${name}</span>
        <input type="checkbox">
      </div>`;
    });
    companyBox.innerHTML = html;
  }

  expoRows.forEach(row=>{
    row.addEventListener("click",function(){
      const expoNum = this.children[0].textContent;
      renderCompanies(expoNum);
    });
  });


  deleteBtn.addEventListener("click",function(){
    const checked = document.querySelectorAll(".expoSchedule-company-row input:checked");
    if(checked.length===0){ alert("삭제할 기업을 선택하세요"); return; }
    if(confirm("선택한 기업을 삭제하시겠습니까?")){
      checked.forEach(box => box.closest(".expoSchedule-company-row").remove());
    }
  });

  const rowsPerPage = 5;
  let currentPage = 1;
  const totalPages = Math.ceil(expoRows.length / rowsPerPage);

  function showPage(page){
    const start = (page-1)*rowsPerPage;
    const end = start + rowsPerPage;
    expoRows.forEach((row,i)=>{
      row.style.display = (i >= start && i < end) ? "flex" : "none";
    });


    pageSpans.forEach(span => span.classList.remove("expoSchedule-page-active"));
    const span = Array.from(pageSpans).find(s => parseInt(s.textContent) === page);
    if(span) span.classList.add("expoSchedule-page-active");

    currentPage = page;
  }

  showPage(1);

  pageSpans.forEach(span=>{
    span.addEventListener("click", ()=>{
      const text = span.textContent.trim();
      if(text === "<<"){ showPage(1); return; }
      if(text === "<"){ showPage(Math.max(1,currentPage-1)); return; }
      if(text === ">"){ showPage(Math.min(totalPages,currentPage+1)); return; }
      if(text === ">>"){ showPage(totalPages); return; }

      const pageNum = parseInt(text);
      if(!isNaN(pageNum)) showPage(pageNum);
    });
  });

});