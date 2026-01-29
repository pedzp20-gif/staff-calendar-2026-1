const staff = ["Petro", "Mina", "Samir"];
const calendarEl = document.getElementById("calendar");
const yearSelect = document.getElementById("yearSelect");
const staffSelect = document.getElementById("staffSelect");

const today = new Date().getFullYear();

for (let y = today - 2; y <= today + 5; y++) {
  yearSelect.innerHTML += `<option value="${y}">${y}</option>`;
}
yearSelect.value = today;

yearSelect.addEventListener("change", () => buildCalendar(yearSelect.value));

function buildCalendar(year) {
  calendarEl.innerHTML = "";

  for (let month = 0; month < 12; month++) {
    const monthEl = document.createElement("div");
    monthEl.className = "month";
    monthEl.innerHTML = `<h2>${new Date(year, month).toLocaleString('default', { month: 'long' })}</h2>`;

    const weekdays = document.createElement("div");
    weekdays.className = "weekdays";
    ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].forEach(d => {
      weekdays.innerHTML += `<div>${d}</div>`;
    });
    monthEl.appendChild(weekdays);

    const days = document.createElement("div");
    days.className = "days";

    let firstDay = new Date(year, month, 1).getDay();
    firstDay = firstDay === 0 ? 6 : firstDay - 1;

    for (let i = 0; i < firstDay; i++) {
      days.innerHTML += `<div></div>`;
    }

    const totalDays = new Date(year, month + 1, 0).getDate();
    for (let d = 1; d <= totalDays; d++) {
      const dayEl = document.createElement("div");
      dayEl.className = "day";
      dayEl.innerHTML = `<strong>${d}</strong>`;

      dayEl.addEventListener("click", () => addStaff(dayEl));
      days.appendChild(dayEl);
    }

    monthEl.appendChild(days);
    calendarEl.appendChild(monthEl);
  }
}

function addStaff(dayEl) {
  const name = staffSelect.value;

  if ([...dayEl.querySelectorAll(".staff-tag")].some(t => t.dataset.name === name)) {
    return;
  }

  const tag = document.createElement("div");
  tag.className = `staff-tag staff-${name}`;
  tag.textContent = name;
  tag.dataset.name = name;

  tag.addEventListener("click", e => {
    e.stopPropagation();
    tag.remove();
  });

  dayEl.appendChild(tag);
}

function exportPDF() {
  html2pdf().from(calendarEl).save(`Calendar-${yearSelect.value}.pdf`);
}

buildCalendar(today);