
const goPrev = document.querySelector(".go-prev");
const goNext = document.querySelector(".go-next");

const calendar = document.querySelector('.dates');
const yearMonth  = document.querySelector('.year-month');

let currentYear;
let currentMonth;
let currentDate;

let thisMonth;
let today;


function calendarInit() {
    // 날짜 정보 가져오기
    const date = new Date(); // 사용자 PC에 설정된 시간대 기준으로 시간을 표

    const utc = date.getTime() + (date.getTimezoneOffset() * 60 * 1000); // uct 표준시 도출
    // getTimezoneOffset() 함수는 현재 사용자 PC 설정 시간대로부터 UTC 시간까지의 차이를 '분'단위로 리턴

    const kstGap = 9 * 60 * 60 * 1000; // 한국 kst 기준시간 더하기
    today = new Date(utc + kstGap); // 한국 시간으로 date 객체 만들기(오늘)

    // 달력에서 표기하는 날짜 객체
    thisMonth = new Date(today.getFullYear(), today.getMonth(), today.getDate());
}

calendarInit();
console.log("정상 연결 되었습니다.");

function renderCalender(thisMonth) {
    // alert("renderCalender");
    // 렌더링을 위한 데이터 정리
    // getMonth() 현재 date 객체의 월을 0~11 사이의 숫자로 반환한다.
    // getDate() 현재 date객체의 날짜를 1~31 사이의 숫자로 반환
    currentYear = thisMonth.getFullYear();
    currentMonth = thisMonth.getMonth();
    currentDate = thisMonth.getDate();

    // 이전 달의 마지막 날 날짜와 요일 구하기
    // date객체를 만들 때 날짜를 0으로 지정하면 저번 달의 마지막 날짜를 가진 date 객체가 반환
    let startDay = new Date(currentYear, currentMonth, 0);
    let prevDate = startDay.getDate();
    let prevDay = startDay.getDay();

    // 이번 달의 마지막날 날짜와 요일 구하기
    let endDay = new Date(currentYear, currentMonth + 1, 0);
    let nextDate = endDay.getDate();
    let nextDay = endDay.getDay();

    // 렌더링 html 요소 생성
    const calendar = document.querySelector('.dates')
    calendar.innerHTML = '';
    yearMonth.innerText = `${currentYear}.${currentMonth + 1}`;
    
    // 지난달
    for (let i = prevDate - prevDay; i <= (prevDay === 6 ? 0 : prevDay); i++) {
        calendar.innerHTML = calendar.innerHTML + '<div class="day prev disable">' + i + '</div>'
    }
    // 이번달
    for (let i = 1; i <= nextDate; i++) {
        calendar.innerHTML = calendar.innerHTML + '<div class="day current">' + `<a href="/users/calenderAddForm/${currentYear}&${currentMonth + 1}&${i}"> ${i}</a>` + '</div>'
    }
    // 다음달
    for (let i = 1; i < (7 - nextDay == 7 ? 0 : 7 - nextDay); i++) {
        calendar.innerHTML = calendar.innerHTML + '<div class="day next disable">' + i + '</div>'
    }

    // 오늘 날짜 표기
    if (today.getMonth() == currentMonth) {
        const todayDate = today.getDate();
        const currentMonthDate = document.querySelectorAll('.dates .current');
        console.log(currentMonthDate);
        currentMonthDate[todayDate -1].classList.add('today');
    }  
}

renderCalender(thisMonth);


goPrev.addEventListener("click", function() {
    thisMonth = new Date(currentYear, currentMonth - 1, 1);
    renderCalender(thisMonth);
});
goNext.addEventListener("click", function() {
    thisMonth = new Date(currentYear, currentMonth + 1, 1);
    renderCalender(thisMonth); 
});


const kilnBtn = document.querySelector(".kilnBtn");
const studioBtn = document.querySelector(".studioBtn");
const personalBtn = document.querySelector(".personalBtn");


