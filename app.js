const staff = ["Petro", "Mina", "Samir"];
const calendarEl = document.getElementById("calendar");
const yearSelect = document.getElementById("yearSelect");

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
    ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].forEach(d => weekdays.innerHTML += `<div>${d}</div>`);
    monthEl.appendChild(weekdays);

    const days = document.createElement("div");
    days.className = "days";

    let firstDay = new Date(year, month, 1).getDay();
    firstDay = firstDay === 0 ? 6 : firstDay - 1;

    for (let i = 0; i < firstDay; i++) days.innerHTML += `<div></div>`;

    const totalDays = new Date(year, month + 1, 0).getDate();
    for (let d = 1; d <= totalDays; d++) {
      const dayEl = document.createElement("div");
      dayEl.className = "day";
      dayEl.innerHTML = `<strong>${d}</strong>`;
      dayEl.onclick = () => assignStaff(dayEl);
      days.appendChild(dayEl);
    }

    monthEl.appendChild(days);
    calendarEl.appendChild(monthEl);
  }
}

function assignStaff(dayEl) {
  const selected = prompt("Enter staff names separated by comma:\nPetro, Mina, Samir");
  if (!selected) return;

  dayEl.querySelectorAll(".staff-tag").forEach(e => e.remove());
  dayEl.className = "day";

  selected.split(",").map(s => s.trim()).forEach(name => {
    if (staff.includes(name)) {
      dayEl.classList.add(`staff-${name}`);
      dayEl.innerHTML += `<div class="staff-tag">${name}</div>`;
    }
  });
}

function exportPDF() {
  html2pdf().from(calendarEl).save(`Calendar-${yearSelect.value}.pdf`);
}

buildCalendar(today);