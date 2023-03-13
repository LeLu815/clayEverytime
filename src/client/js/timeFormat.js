const contentCreatedAt = document.getElementById("contentCreatedAt");
const testClass = document.querySelectorAll(".contentCreatedAt");


const timeFunc = (contentTime) => {
    const present = Date.now();
    const timeGap = present - Number(contentTime);
    const timeList = [
        [1000, 59], 
        [60, 59], 
        [60, 23], 
        [24, 30],
    ];
    let result = timeGap;
    let idx = 0;
    for (let standardTime of timeList) {
        if (result/standardTime[0] > standardTime[1]) {
            result = Math.round(result/standardTime[0]);
            ++idx
        } else {
            result = Math.round(result/standardTime[0]);
            if (idx === 0) {
                return "방금";
            } else if (idx === 1) {
                return `${Math.round(result)}분`;
            } else if (idx === 2) {
                return `${Math.round(result)}시간`;
            } else {
                return `${Math.round(result)}일`; 
            }
        }
    }
    const standardTimeObj = new Date(contentTime);
    if (standardTimeObj.getFullYear() === present.getFullYear()) {
        return `${standardTimeObj.getMonth()+1}.${standardTimeObj.getDate()}`
    }
    return `${standardTimeObj.getFullYear()}.${standardTimeObj.getMonth()+1}.${standardTimeObj.getDate()}`;
}




if (testClass.length === 0) {
    if (!contentCreatedAt) {
    } else {
        contentCreatedAt.innerText = timeFunc(contentCreatedAt.innerText); 
    }
} else {
    for (let tag of testClass) {
        tag.innerText = timeFunc(tag.innerText);
    } 
}