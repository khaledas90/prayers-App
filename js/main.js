

const searchBtn = document.querySelector(".search-btn");

const countryInput = document.querySelector(".city-input");
const cityInput = document.querySelector(".city-input");
const YearInput = document.querySelector(".Year-input");
const MonthInput = document.querySelector(".Month-input");
const SelectBox = document.querySelector(".SelectBox");
const currentPrayDiv = document.querySelector(".current-weather .details");
const PrayCardDiv = document.querySelector(".weather-cards");



let GetInputVal = () => {
    let CountryVal = countryInput.value.trim();
    let CityVal = cityInput.value.trim();
    let YearVal = YearInput.value.trim();
    let MonthVal = MonthInput.value.trim();
    let SelectVal = SelectBox.value;
    const API_URL = `http://api.aladhan.com/v1/calendarByCity/${YearVal}/${MonthVal}?city=${CityVal}&country=${CountryVal}&method=2`;

    if (CountryVal === "" || CityVal === "" || YearVal === "" || MonthVal === "") {
      return  alert("No input provided, please fill your Data!!");
    }

    fetch(API_URL)
    .then(response => response.json())
    .then((data) => {
         PrayCardDiv.innerHTML = "";
         currentPrayDiv.innerHTML = ''; 
        console.log(data.data[SelectVal].date.gregorian.date )
        let prayersData =  data.data[SelectVal]
        console.log(prayersData)
        let contentPrayTimes = `
            <li class="card">
              <h3>الفجر</h3>
              <h6>${(prayersData.timings.Fajr).slice(0 , 5)} PM</h6>
            </li>
            <li class="card">
              <h3>الظهر</h3>
              <h6>${(prayersData.timings.Dhuhr).slice(0 , 5)} PM</h6>
            </li>
            <li class="card">
              <h3>العصر</h3>
              <h6>${(prayersData.timings.Asr).slice(0 , 5)} PM</h6>
            </li>
            <li class="card">
              <h3>المغرب</h3>
              <h6>${(prayersData.timings.Maghrib).slice(0 , 5)} PM</h6>
            </li>
            <li class="card">
              <h3>العشاء</h3>
              <h6>${(prayersData.timings.Isha).slice(0 , 5)} PM</h6>
            </li>
        `;

        let contentHedPray = `
            <div class="details">
                <h2>${prayersData.date.hijri.weekday.ar} (${prayersData.date.hijri.month.ar})</h2>
                <h6>milady date: ${prayersData.date.gregorian.date}</h6>
                <h6>Hijri date: ${prayersData.date.hijri.date}</h6>
                <h6>Gregorian date: ${CountryVal} - ${CityVal}</h6>
            </div>
        `;

        console.log((prayersData.timings.Fajr).slice(0 , 5));
     
        currentPrayDiv.insertAdjacentHTML("beforeend" , contentHedPray);
        PrayCardDiv.insertAdjacentHTML("beforeend" , contentPrayTimes);
    })
    .catch(() => {
        alert("An error occurred while fetching the data!");
    });
}

searchBtn.addEventListener("click", GetInputVal);




// clock

function TimeClock(){

    let Time = new Date()
    let h = Time.getHours()
    let m = Time.getMinutes();
    let s = Time.getSeconds();

    m = checkTime(m);
    s = checkTime(s);

    let hou = document.querySelector(".Hou");
    let Min = document.querySelector(".Min");
    let Sec = document.querySelector(".Sec");
    hou.innerHTML = h -12;
    Min.innerHTML = m;
    Sec.innerHTML = s ;
    setTimeout(TimeClock , 1000); 
}
TimeClock()
function checkTime(i) {
    if (i < 10) {
        i = "0" + i
    }; 
    return i;
  }