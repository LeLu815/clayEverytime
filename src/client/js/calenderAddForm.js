
const start_time = document.getElementById("start_time");
const end_year = document.getElementById("end_year");
const end_month = document.getElementById("end_month");
const end_date = document.getElementById("end_date");
const isAllDay = document.getElementById("isAllDay");
const end_time = document.getElementById("end_time");
const start_year_month_date = document.getElementById("start_year_month_date");

const date = new Date();
const now_year = date.getFullYear();
const now_hours = date.getHours();
const now_minutes = date.getMinutes();

let now_hours_minutes;
if (date.getMinutes() <= 30) {
    now_hours_minutes = `${date.getHours() < 12 ? "오전 "+ (date.getHours()<10?`0${date.getHours()}` : date.getHours()) + ":" + 30 : "오후 " + (date.getHours()-12<10?`0${date.getHours()-12}` : date.getHours()-12) + ":" + 30}`;
} else {
    (date.getHours()-12<10?`0${date.getHours()-12}` : date.getHours()-12)
    if (date.getHours() === 12) {
        now_hours_minutes = "오후 01:00";
    } else if (date.getHours() === 23) {
        now_hours_minutes = "오전 12:30";
    } else {
        now_hours_minutes = `${date.getHours() < 12 ? "오전 "+ (date.getHours()+1<10?`0${date.getHours()+1}` : date.getHours()+1)+ ":" + "00" : "오후 " + ((date.getHours())-11<10?`0${(date.getHours())-11}` : (date.getHours())-11) + ":" + "00"}`;
    }
}

for (let node of start_time.children) {
    console.log(node.innerText, now_hours_minutes);
    if (node.innerText === now_hours_minutes) {
        node.selected = true;
    }
}
for (let node of end_time.children) {
    if (node.innerText === now_hours_minutes) {
        node.selected = true;
    }
}


const [setting_year, setting_month, setting_date] = start_year_month_date.innerText.split(" ");
console.log(setting_month.slice(0, -1), setting_date.slice(0, -1));

isAllDay.addEventListener("click", function() {
    if (isAllDay.checked) {
        start_time.disabled = true;
        end_year.disabled = true;
        end_month.disabled = true;
        end_date.disabled = true;
        end_time.disabled = true;
    } else {
        start_time.disabled = false;
        end_year.disabled = false;
        end_month.disabled = false;
        end_date.disabled = false;
        end_time.disabled = false;
    }
});

for (let i=now_year; i<=(now_year+5); i++ ) {
    const option_year = document.createElement("option");
    option_year.value = i;
    option_year.innerText = `${i} 년`
    option_year.selected = (setting_year.slice(0, -1) === i) ? true : false 
    end_year.appendChild(option_year);

}

for (let i= 1; i<=12; i++) {
    const option_month = document.createElement("option");
    option_month.value = i;
    option_month.innerText = `${i} 월`;
    option_month.selected = (i === Number(setting_month.slice(0, -1))) ? true : false;
    end_month.appendChild(option_month);
}

const last_date = new Date(end_year.value, end_month.value, 0);
console.log(last_date.getDate());
for (let i=1; i<=last_date.getDate(); i++) {
    const option_date = document.createElement("option");
    option_date.value = i;
    option_date.innerText = `${i} 일`;
    option_date.selected = (i === Number(setting_date.slice(0, -1))) ? true : false;
    end_date.appendChild(option_date);
}

let year_value;
let month_value;

end_year.addEventListener("click", function() {
    year_value = end_year.value;
});

end_month.addEventListener("click", function() {
    month_value = end_month.value;

    const last_date = new Date(year_value, month_value, 0);
    for (let i=1; i<=last_date; i++) {
        end_date.innerHTML = "";
        const option_date = document.createElement("option");
        option_date.value = i;
        option_date.innerText = `${i} 일`;
        end_date.appendChild(option_date);
    }
});

