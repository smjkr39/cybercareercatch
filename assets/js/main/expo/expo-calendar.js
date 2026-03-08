// ── 데이터: 박람회 참가 기업 (실제 서비스에서는 API로 교체)
const expoData = {
    section1: [
        { company: 'Google', location: '서울시 강남구', job: '공격, 방어' },
        { company: 'Google', location: '서울시 강남구', job: '공격, 방어' },
        { company: 'Google', location: '서울시 강남구', job: '공격, 방어' },
        { company: 'Google', location: '서울시 강남구', job: '공격, 방어' },
        { company: 'Google', location: '서울시 강남구', job: '공격, 방어' },
        { company: 'Google', location: '서울시 강남구', job: '공격, 방어' },
        { company: 'Google', location: '서울시 강남구', job: '공격, 방어' },
        { company: 'Google', location: '서울시 강남구', job: '공격, 방어' },
    ]
};

// ── 박람회 이벤트 날짜 (캘린더 점 표시용)
const expoDates = {
    '2026-03-07': true,
};

// ── 캘린더 상태
let calYear = 2026;
let calMonth = 2; // 0-indexed (2 = March)

const MONTH_NAMES = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

// 임시 캘린더(추후 api 사용 예정)
function renderCalendar(year, month) {
  const today = new Date();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  document.getElementById('calMonthNum').textContent = month + 1;
  document.getElementById('calMonthText').textContent = MONTH_NAMES[month];
  // 연도 표시를 쓰고 있다면
  const yearEl = document.getElementById('calYearText');
  if (yearEl) yearEl.textContent = year;

  let rows = '';
  let day = 1;

  // 최대 6주(6행)까지만 렌더
  for (let week = 0; week < 6 && day <= daysInMonth; week++) {
    rows += '<tr>';
    for (let dow = 0; dow < 7; dow++) {
      const cellIndex = week * 7 + dow;

      let cellHtml = '';
      let cls = '';

      if (cellIndex >= firstDay && day <= daysInMonth) {
        const num = day++;
        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(num).padStart(2, '0')}`;
        const isToday =
          year === today.getFullYear() &&
          month === today.getMonth() &&
          num === today.getDate();
        const hasexpo = expoDates[dateStr];

        if (dow === 0) cls += ' expo-cal-tbl-day-sun';
        if (dow === 6) cls += ' expo-cal-tbl-day-sat';
        if (isToday) cls += ' expo-cal-tbl-day-today';

        cellHtml = `
          <span class="expo-cal-date-num">${num}</span>
          ${hasexpo ? '<span class="expo-cal-event-dot"></span>' : ''}
        `;
      }

      rows += `<td class="${cls.trim()}">${cellHtml}</td>`;
    }
    rows += '</tr>';
  }

  document.getElementById('calBody').innerHTML = rows;
}

// ── 박람회 테이블 렌더링
function renderexpoTable(tabKey) {
    const rows = (expoData[tabKey] || []).map(item => `
    <tr>
      <td>${item.company}</td>
      <td>${item.location}</td>
      <td class="job">${item.job}</td>
    </tr>
  `).join('');
    document.getElementById('expoBody').innerHTML = rows;
}

// ── 월 이동
document.getElementById('prevMonth').addEventListener('click', () => {
    if (calMonth === 0) { calMonth = 11; calYear--; }
    else calMonth--;
    renderCalendar(calYear, calMonth);
});
document.getElementById('nextMonth').addEventListener('click', () => {
    if (calMonth === 11) { calMonth = 0; calYear++; }
    else calMonth++;
    renderCalendar(calYear, calMonth);
});

// ── 초기 렌더
renderCalendar(calYear, calMonth);
renderexpoTable('section1');