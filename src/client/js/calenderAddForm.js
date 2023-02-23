
const end_year = document.getElementById("end_year");
const end_month = document.getElementById("end_month");
const end_date = document.getElementById("end_date");

const date = new Date();
const now_year = date.getFullYear();

for (let i=now_year; i>=(now_year-80); i-- ) {
    const option_year = document.createElement("option");
    option_year.value = i;
    option_year.innerText = `${i} 년`
    option_year.selected = (now_year === i) ? true : false 
    end_year.appendChild(option_year);
}

for (let i= 1; i<=12; i++) {
    const option_month = document.createElement("option");
    option_month.value = i;
    option_month.innerText = `${i} 월`;
    option_month.selected = (i === 1) ? true : false
    end_month.appendChild(option_month);
}

const last_date = new Date(end_year.value, end_month.value, 0);
console.log(last_date.getDate());
for (let i=1; i<=last_date.getDate(); i++) {
    const option_date = document.createElement("option");
    option_date.value = i;
    option_date.innerText = `${i} 일`;
    end_date.appendChild(option_date);
}

let year_value;
let month_value;

end_year.addEventListener("click", function() {
    year_value = end_year.value;
})

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
})
