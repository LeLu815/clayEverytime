
const goPrev = document.querySelector(".go-prev");
const goNext = document.querySelector(".go-next");

const calendar = document.querySelector('.dates');
const yearMonth  = document.querySelector('.year-month');

let currentYear;
let currentMonth;
let currentDate;

let thisMonth;
let today;

const slicingDateFormat = function (dateTag) {
   return String(dateTag.value).split(" ")[0].split(".");
}

const get_calender_nav_date = function() {
    const year_month = document.getElementById("year-month");
    let [year_this_calender, month_this_calender] = year_month.innerText.split(".");
    return [year_this_calender, month_this_calender];
}

const calculate_date = function (year, month) {
    // 입력받은 달 중에 현재 날짜 이후의 날 중 월, 수, 금에 해당하는 날을 날짜 포멧에 맞춰 리턴해주는 함수
    const date = new Date();
    if (date.getFullYear() > year) {
        // 이미 지나간 과거.
        return ["예약 가능 날짜가 없습니다."];
    } else if (String(date.getFullYear()) === String(year)) {
        if (Number(date.getMonth())+1 > Number(month)) {
            // 이미 지나간 과거.
            return ["예약 가능 날짜가 없습니다."];
        } else if (Number(date.getMonth())+1 === Number(month)) {
            // 이번 달.
            let start_day_info;
            const last_date = new Date(year, month, 0);
            const result_list = [];
            const calculate_tool = [
                [2, "월요일"],
                [2, "수요일"],
                [3, "금요일"],
            ];
            
            if (date.getDay() === 0) {
                start_day_info = ["월요일", Number(date.getDate())+1, 0];
            } else if (date.getDay() === 5) {
                start_day_info = ["월요일", Number(date.getDate())+3, 0];
            } else if (date.getDay() === 6) {
                start_day_info = ["월요일", Number(date.getDate())+2, 0];
            } else if (date.getDay() === 1) {
                start_day_info = ["수요일", Number(date.getDate())+2, 1];
            } else if (date.getDay() === 2) {
                start_day_info = ["수요일", Number(date.getDate())+1, 1];
            } else if (date.getDay() === 3) {
                start_day_info = ["금요일", Number(date.getDate())+2, 2];
            } else if (date.getDay() === 4) {
                start_day_info = ["금요일", Number(date.getDate())+1, 2];
            }

            let count = start_day_info[2];
            let start_date = start_day_info[1];
            while(start_date <= last_date.getDate()) {
                count = count%3;
                result_list.push(`${Number(date.getMonth())+1}.${start_date} ${calculate_tool[count][1]}`);
                start_date += calculate_tool[count][0];
                count++;
            }

            return result_list;
        } else {
            // 미래의 일로 모든 날짜가 가능하다.
            const result_list = [];
            const future_date_start = new Date(year, Number(month)-1);
            const future_date_end = new Date(year, month, 0);
            const calculate_tool = [
                [2, "월요일"],
                [2, "수요일"],
                [3, "금요일"],
            ];

            let start_day_info;

            if (future_date_start.getDay() === 0) { // 일
                start_day_info = ["월요일", Number(future_date_start.getDate())+1, 0];
            } else if (future_date_start.getDay() === 5) { // 금
                start_day_info = ["월요일", Number(future_date_start.getDate()), 0];
            } else if (future_date_start.getDay() === 6) { // 토
                start_day_info = ["월요일", Number(future_date_start.getDate())+2, 0];
            } else if (future_date_start.getDay() === 1) { // 월
                start_day_info = ["수요일", Number(future_date_start.getDate()), 1];
            } else if (future_date_start.getDay() === 2) { //화
                start_day_info = ["수요일", Number(future_date_start.getDate())+1, 1];
            } else if (future_date_start.getDay() === 3) { // 수
                start_day_info = ["금요일", Number(future_date_start.getDate()), 2];
            } else if (future_date_start.getDay() === 4) { // 목
                start_day_info = ["금요일", Number(future_date_start.getDate())+1, 2];
            }

            let criteria_date = start_day_info[1];

            let count = start_day_info[2];

            while(criteria_date <= future_date_end.getDate()) {
                result_list.push(`${month}.${criteria_date} ${calculate_tool[count%3][1]}`);
                criteria_date += calculate_tool[count%3][0];
                count += 1;
            }
            return result_list;
        }
    } else {
        // 미래의 일로 모든 날짜가 가능하다.
        const result_list = [];
        const future_date_start = new Date(year, Number(month)-1);
        const future_date_end = new Date(year, month, 0);
        const calculate_tool = [
            [2, "월요일"],
            [2, "수요일"],
            [3, "금요일"],
        ];

        let start_day_info;

        if (future_date_start.getDay() === 0) { // 일
            start_day_info = ["월요일", Number(future_date_start.getDate())+1, 0];
        } else if (future_date_start.getDay() === 5) { // 금
            start_day_info = ["월요일", Number(future_date_start.getDate()), 0];
        } else if (future_date_start.getDay() === 6) { // 토
            start_day_info = ["월요일", Number(future_date_start.getDate())+2, 0];
        } else if (future_date_start.getDay() === 1) { // 월
            start_day_info = ["수요일", Number(future_date_start.getDate()), 1];
        } else if (future_date_start.getDay() === 2) { //화
            start_day_info = ["수요일", Number(future_date_start.getDate())+1, 1];
        } else if (future_date_start.getDay() === 3) { // 수
            start_day_info = ["금요일", Number(future_date_start.getDate()), 2];
        } else if (future_date_start.getDay() === 4) { // 목
            start_day_info = ["금요일", Number(future_date_start.getDate())+1, 2];
        }

        let criteria_date = start_day_info[1];
        let count = start_day_info[2];
        while(criteria_date <= future_date_end.getDate()) {
            result_list.push(`${month}.${criteria_date} ${calculate_tool[count%3][1]}`);
            criteria_date += calculate_tool[count%3][0];
            count += 1;
        }
        return result_list;
    }
}


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

function renderCalender(thisMonth) {
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
    const calendar = document.querySelector('.dates');
    calendar.innerHTML = '';
    yearMonth.innerText = `${currentYear}.${currentMonth + 1}`;
    
    // 지난달
    for (let i = prevDate - prevDay; i <= (prevDay === 6 ? 0 : prevDate); i++) {
        const div_tag = document.createElement("div");
        div_tag.classList.add("day", "prev", "disable");
        div_tag.innerText = i;
        calendar.append(div_tag);
        // calendar.innerHTML = calendar.innerHTML + '<div class="day next disable">' + i + '</div>'
    }
    // 이번달
    for (let i = 1; i <= nextDate; i++) {
        const div_tag = document.createElement("div");
        const a_tag = document.createElement("a");
        
        div_tag.classList.add("day", "current");
        a_tag.href = `/users/calenderAddForm/${currentYear}&${currentMonth + 1}&${i}`;
        a_tag.innerText = i;
        a_tag.style.color = "#717171";

        div_tag.append(a_tag);
        calendar.append(div_tag);
        // calendar.innerHTML = calendar.innerHTML + '<div class="day current">' + `<a href="/users/calenderAddForm/${currentYear}&${currentMonth + 1}&${i}"> ${i}</a>` + '</div>'
    }
    // 다음달
    for (let i = 1; i < (7 - nextDay == 7 ? 0 : 7 - nextDay); i++) {
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


goPrev.addEventListener("click", function() {
    thisMonth = new Date(currentYear, currentMonth - 1, 1);
    renderCalender(thisMonth);

    let [my_year_value, my_month_value] = get_calender_nav_date();
    tag_inside_valueList = calculate_date(my_year_value, my_month_value);
    get_list_append_option(tag_inside_valueList, size_1);
    get_list_append_option(tag_inside_valueList, size_03);
    get_list_append_option(tag_inside_valueList, size_05);
    get_list_append_option(tag_inside_valueList, size_08);

    const big_one = document.querySelector(".big-one-reserve-add");
    const eight = document.querySelector(".eight-reserve-add");
    const five = document.querySelector(".five-reserve-add");
    const three = document.querySelector(".three-reserve-add");

    const size__1 = document.getElementById("size-1");
    const size__8 = document.getElementById("size-0.8");
    const size__5 = document.getElementById("size-0.5");
    const size__3 = document.getElementById("size-0.3");

    if (Number(size__1.length) === 1 || Number(size__8.length) === 1 || Number(size__5.length) === 1 || Number(size__3.length) === 1) {
        big_one.style.display = "none";
        eight.style.display = "none";
        five.style.display = "none";
        three.style.display = "none";

        big_one.href = ``;
        eight.href = ``;
        five.href = ``;
        three.href = ``;
    } else {
        big_one.style.display = "block";
        eight.style.display = "block";
        five.style.display = "block";
        three.style.display = "block";

        const big_one_values = slicingDateFormat(size__1);
        const eight_values = slicingDateFormat(size__8);
        const five_values = slicingDateFormat(size__5);
        const three_values = slicingDateFormat(size__3);

        const yearMonth  = document.querySelector('.year-month').innerText.split(".")[0];

        big_one.href = `/api/kilnScheduleAdd/1.${yearMonth}.${big_one_values[0]}.${big_one_values[1]}`;
        eight.href = `/api/kilnScheduleAdd/8.${yearMonth}.${eight_values[0]}.${eight_values[1]}`;
        five.href = `/api/kilnScheduleAdd/5.${yearMonth}.${five_values[0]}.${five_values[1]}`;
        three.href = `/api/kilnScheduleAdd/3.${yearMonth}.${three_values[0]}.${three_values[1]}`;
    }
});
goNext.addEventListener("click", function() {
    thisMonth = new Date(currentYear, currentMonth + 1, 1);
    renderCalender(thisMonth); 
    [my_year_value, my_month_value] = get_calender_nav_date();
    tag_inside_valueList = calculate_date(my_year_value, my_month_value);
    get_list_append_option(tag_inside_valueList, size_1);
    get_list_append_option(tag_inside_valueList, size_03);
    get_list_append_option(tag_inside_valueList, size_05);
    get_list_append_option(tag_inside_valueList, size_08);

    const big_one = document.querySelector(".big-one-reserve-add");
    const eight = document.querySelector(".eight-reserve-add");
    const five = document.querySelector(".five-reserve-add");
    const three = document.querySelector(".three-reserve-add");

    const size__1 = document.getElementById("size-1");
    const size__8 = document.getElementById("size-0.8");
    const size__5 = document.getElementById("size-0.5");
    const size__3 = document.getElementById("size-0.3");

    if (Number(size__1.length) === 1 || Number(size__8.length) === 1 || Number(size__5.length) === 1 || Number(size__3.length) === 1) {
        big_one.style.display = "none";
        eight.style.display = "none";
        five.style.display = "none";
        three.style.display = "none";

        big_one.href = ``;
        eight.href = ``;
        five.href = ``;
        three.href = ``;
    } else {
        big_one.style.display = "block";
        eight.style.display = "block";
        five.style.display = "block";
        three.style.display = "block";

        const big_one_values = slicingDateFormat(size__1);
        const eight_values = slicingDateFormat(size__8);
        const five_values = slicingDateFormat(size__5);
        const three_values = slicingDateFormat(size__3);

        const yearMonth  = String(document.querySelector('.year-month').innerText).split(".")[0];

        big_one.href = `/api/kilnScheduleAdd/1.${yearMonth}.${big_one_values[0]}.${big_one_values[1]}`;
        eight.href = `/api/kilnScheduleAdd/8.${yearMonth}.${eight_values[0]}.${eight_values[1]}`;
        five.href = `/api/kilnScheduleAdd/5.${yearMonth}.${five_values[0]}.${five_values[1]}`;
        three.href = `/api/kilnScheduleAdd/3.${yearMonth}.${three_values[0]}.${three_values[1]}`;
    }
});


const kilnBtn = document.querySelector(".kilnBtn");
const personalBtn = document.querySelector(".personalBtn");

const kilnInfo = document.querySelector(".kilnInfo");
const personalInfo = document.querySelector(".personalInfo");

let kilnBtn_boolean = false;
let personalBtn_boolean = false;

personalInfo.style.display = "none";
kilnInfo.style.display = "none";

kilnBtn.addEventListener("click", function() {
    if (!personalBtn_boolean) {
        if (!kilnBtn_boolean) {
            kilnBtn_boolean = true;
            kilnInfo.style.display = "block";

            personalBtn.disabled = true;
            kilnBtn.disabled = false;
        } else {
            kilnBtn_boolean = false;
            kilnInfo.style.display = "none";

            personalBtn.disabled = false;

        }
    }
});
personalBtn.addEventListener("click", function() {
    if (!kilnBtn_boolean) {
        if (!personalBtn_boolean) {
            personalBtn_boolean = true;
            personalInfo.style.display = "block";

            personalBtn.disabled = false;
            kilnBtn.disabled = true;
        } else {
            personalBtn_boolean = false;
            personalInfo.style.display = "none";

            kilnBtn.disabled = false;
        }
    }
});

const get_list_append_option = function(list, tag) {
    tag.innerHTML = "";
    for (let value of list) {
        const option = document.createElement("option");
        option.innerText = value;
        tag.append(option);
    }
}

const size_1 = document.getElementById("size-1");
const size_08 = document.getElementById("size-0.8");
const size_05 = document.getElementById("size-0.5");
const size_03 = document.getElementById("size-0.3");

let [my_year_value1, my_month_value1] = get_calender_nav_date();
let tag_inside_valueList = calculate_date(my_year_value1, my_month_value1);

size_1.innerHTML = ""
size_08.innerHTML = ""
size_05.innerHTML = ""
size_03.innerHTML = ""

get_list_append_option(tag_inside_valueList, size_1);
get_list_append_option(tag_inside_valueList, size_03);
get_list_append_option(tag_inside_valueList, size_05);
get_list_append_option(tag_inside_valueList, size_08);

// 버튼
const show_my_reserve_section = document.getElementById("show-my-reserve-section");
const show_reserve_section = document.getElementById("show-reserve-section");

// 섹션
const my_kiln_reserve = document.querySelector(".my-kiln-reserve");
const kiln_reserve_section = document.querySelector(".kiln-reserve-section");

my_kiln_reserve.style.display = "none";
kiln_reserve_section.style.display = "none";

// 연산도구
let show_my_reserve_section_boolean = false;
let show_reserve_section_boolean = false;

show_my_reserve_section.addEventListener("click", function() {
    if (!show_reserve_section_boolean) {
        if (!show_my_reserve_section_boolean) {
            show_my_reserve_section_boolean = true;
            show_reserve_section.disabled = true;
            my_kiln_reserve.style.display = "block";
        } else {
            show_my_reserve_section_boolean= false;
            show_reserve_section.disabled = false;
            my_kiln_reserve.style.display = "none";
        }
    }
});

show_reserve_section.addEventListener("click", function() {
    if (!show_my_reserve_section_boolean) {
        if (!show_reserve_section_boolean) {
            show_reserve_section_boolean = true;
            show_my_reserve_section.disabled = true;
            kiln_reserve_section.style.display = "block";
        } else {
            show_reserve_section_boolean = false;
            show_my_reserve_section.disabled = false;
            kiln_reserve_section.style.display = "none";
        }
    }
});

const big_one = document.querySelector(".big-one-reserve-add");
const eight = document.querySelector(".eight-reserve-add");
const five = document.querySelector(".five-reserve-add");
const three = document.querySelector(".three-reserve-add");

big_one.href = `/api/kilnScheduleAdd/1.${yearMonth.innerText.split(".")[0]}.${size_1.value.split(" ")[0]}`;
eight.href = `/api/kilnScheduleAdd/1.${yearMonth.innerText.split(".")[0]}.${size_08.value.split(" ")[0]}`;
five.href = `/api/kilnScheduleAdd/1.${yearMonth.innerText.split(".")[0]}.${size_05.value.split(" ")[0]}`;
three.href = `/api/kilnScheduleAdd/1.${yearMonth.innerText.split(".")[0]}.${size_03.value.split(" ")[0]}`;