
const goPrev = document.querySelector(".go-prev");
const goNext = document.querySelector(".go-next");

const calendar = document.querySelector('.dates');
const yearMonth  = document.querySelector('.year-month');


const kilnStudio = document.querySelector(".kilnStudio");

const filterCalendar = function() {
    if (kilnStudio.innerText === "가마") {
        kilnStudio.innerText = "스튜디오";
    } else {
        kilnStudio.innerText = "가마";
    }
}

kilnStudio.addEventListener("click", filterCalendar);


let currentYear;
let currentMonth;
let currentDate;

let thisMonth;
let today;


function calendarInit() {
    // 날짜 정보 가져오기
    const date = new Date(); // 현재 날짜(로컬 기준) 가져오기
    const utc = date.getTime() + (date.getTimezoneOffset() * 60 * 1000); // uct 표준시 도출
    const kstGap = 9 * 60 * 60 * 1000; // 한국 kst 기준시간 더하기
    today = new Date(utc + kstGap); // 한국 시간으로 date 객체 만들기(오늘)

    // 달력에서 표기하는 날짜 객체
    thisMonth = new Date(today.getFullYear(), today.getMonth(), today.getDate());

    // return [thisMonth, today];
    // var currentYear = thisMonth.getFullYear(); // 달력에서 표기하는 연
    // var currentMonth = thisMonth.getMonth(); // 달력에서 표기하는 월
    // var currentDate = thisMonth.getDate(); // 달력에서 표기하는 일    
}

calendarInit();
console.log(thisMonth, today);

function renderCalender(thisMonth) {
    // alert("renderCalender");
    // 렌더링을 위한 데이터 정리
    currentYear = thisMonth.getFullYear();
    currentMonth = thisMonth.getMonth();
    currentDate = thisMonth.getDate();

    // 이전 달의 마지막 날 날짜와 요일 구하기
    // 
    let startDay = new Date(currentYear, currentMonth, 0);
    let prevDate = startDay.getDate();
    let prevDay = startDay.getDay();

    // 이번 달의 마지막날 날짜와 요일 구하기
    let endDay = new Date(currentYear, currentMonth + 1, 0);
    let nextDate = endDay.getDate();
    let nextDay = endDay.getDay();

    // console.log(prevDate, prevDay, nextDate, nextDay);

    // 현재 월 표기
    // $('.year-month').text(currentYear + '.' + (currentMonth + 1));

    // 렌더링 html 요소 생성
    const calendar = document.querySelector('.dates')
    calendar.innerHTML = '';
    yearMonth.innerText = `${currentYear}.${currentMonth + 1}`;
    
    // 지난달
    for (let i = prevDate - prevDay + 1; i <= prevDate; i++) {
        calendar.innerHTML = calendar.innerHTML + '<div class="day prev disable">' + i + '</div>'
    }
    // 이번달
    for (let i = 1; i <= nextDate; i++) {
        calendar.innerHTML = calendar.innerHTML + '<div class="day current">' + i + '</div>'
    }
    // 다음달
    for (let i = 1; i <= (7 - nextDay == 7 ? 0 : 7 - nextDay); i++) {
        calendar.innerHTML = calendar.innerHTML + '<div class="day next disable">' + i + '</div>'
    }

    // 오늘 날짜 표기
    if (today.getMonth() == currentMonth) {
        const todayDate = today.getDate();
        const currentMonthDate = document.querySelectorAll('.dates .current');
        currentMonthDate[todayDate -1].classList.add('today');
    }  
}

renderCalender(thisMonth);

console.log(
    'currentYear :', currentYear,
'currentMonth :', currentMonth,
'currentDate :', currentDate
);

goPrev.addEventListener("click", function() {
    // alert("goPrev");
    console.log('thisMonth1 :', thisMonth);
    console.log(currentYear, currentMonth);
    thisMonth = new Date(currentYear, currentMonth - 1, 1);
    console.log('thisMonth2 :', thisMonth);
    console.log('today :', today);
    renderCalender(thisMonth);
});
goNext.addEventListener("click", function() {
    // alert("goNext");
    thisMonth = new Date(currentYear, currentMonth + 1, 1);

    console.log(currentYear, currentMonth);
    console.log('thisMonth :', thisMonth);
    console.log('today :', today);
    renderCalender(thisMonth); 
});


// function calendarInit() {

//     // 날짜 정보 가져오기
//     var date = new Date(); // 현재 날짜(로컬 기준) 가져오기
//     var utc = date.getTime() + (date.getTimezoneOffset() * 60 * 1000); // uct 표준시 도출
//     var kstGap = 9 * 60 * 60 * 1000; // 한국 kst 기준시간 더하기
//     var today = new Date(utc + kstGap); // 한국 시간으로 date 객체 만들기(오늘)
  
//     var thisMonth = new Date(today.getFullYear(), today.getMonth(), today.getDate());
//     // 달력에서 표기하는 날짜 객체
  
    
//     var currentYear = thisMonth.getFullYear(); // 달력에서 표기하는 연
//     var currentMonth = thisMonth.getMonth(); // 달력에서 표기하는 월
//     var currentDate = thisMonth.getDate(); // 달력에서 표기하는 일

//     // kst 기준 현재시간
//     // console.log(thisMonth);

//     renderCalender = function (thisMonth) {

//         alert("renderCalender");
//         // 렌더링을 위한 데이터 정리
//         currentYear = thisMonth.getFullYear();
//         currentMonth = thisMonth.getMonth();
//         currentDate = thisMonth.getDate();

//         // 이전 달의 마지막 날 날짜와 요일 구하기
//         // 
//         let startDay = new Date(currentYear, currentMonth, 0);
//         let prevDate = startDay.getDate();
//         let prevDay = startDay.getDay();

//         // 이번 달의 마지막날 날짜와 요일 구하기
//         let endDay = new Date(currentYear, currentMonth + 1, 0);
//         let nextDate = endDay.getDate();
//         let nextDay = endDay.getDay();

//         // console.log(prevDate, prevDay, nextDate, nextDay);

//         // 현재 월 표기
//         // $('.year-month').text(currentYear + '.' + (currentMonth + 1));

//         // 렌더링 html 요소 생성
//         const calendar = document.querySelector('.dates')
//         calendar.innerHTML = '';
        
//         // 지난달
//         for (let i = prevDate - prevDay + 1; i <= prevDate; i++) {
//             calendar.innerHTML = calendar.innerHTML + '<div class="day prev disable">' + i + '</div>'
//         }
//         // 이번달
//         for (let i = 1; i <= nextDate; i++) {
//             calendar.innerHTML = calendar.innerHTML + '<div class="day current">' + i + '</div>'
//         }
//         // 다음달
//         for (let i = 1; i <= (7 - nextDay == 7 ? 0 : 7 - nextDay); i++) {
//             calendar.innerHTML = calendar.innerHTML + '<div class="day next disable">' + i + '</div>'
//         }

//         // 오늘 날짜 표기
//         if (today.getMonth() == currentMonth) {
//             const todayDate = today.getDate();
//             const currentMonthDate = document.querySelectorAll('.dates .current');
//             currentMonthDate[todayDate -1].classList.add('today');
//         }
//     }
//     // 캘린더 렌더링
//     renderCalender(thisMonth);
// }


