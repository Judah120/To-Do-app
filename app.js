const dateDisplay = document.querySelector("#date");
const prevArrow = document.querySelector("#prev");
const nextArrow = document.querySelector("#next");
const imageContainer = document.querySelector("#time-based-image");
const dateBoxes = document.querySelectorAll(".date-box");

const currentDate = new Date();
const options = {
  day: "numeric",
  month: "short",
  year: "numeric"
};
dateDisplay.textContent = currentDate.toLocaleDateString("en-US", options);

const currentTime = currentDate.getHours();
if (currentTime >= 0 && currentTime < 12) {
  imageContainer.innerHTML = '<img src="morning.jpg" loading="lazy">';
} else if (currentTime >= 12 && currentTime < 16) {
  imageContainer.innerHTML = '<img src="afternoon.jpg" loading="lazy">';
} else {
  imageContainer.innerHTML = '<img src="evening.jpg" loading="lazy">';
}

prevArrow.addEventListener("click", function() {
  currentDate.setDate(currentDate.getDate() - 1);
  updateDateBoxes();
});

nextArrow.addEventListener("click", function() {
  currentDate.setDate(currentDate.getDate() + 1);
  updateDateBoxes();
});

function updateDateBoxes() {
  dateDisplay.textContent = currentDate.toLocaleDateString("en-US", options);

  for (let i = 0; i < dateBoxes.length; i++) {
    dateBoxes[i].textContent = new Date(
      currentDate.getTime() + (i - Math.floor(dateBoxes.length / 2)) * 24 * 60 * 60 * 1000
    ).toLocaleDateString("en-US", options);
    if (i === Math.floor(dateBoxes.length / 2)) {
      dateBoxes[i].classList.add("focused");
    } else {
      dateBoxes[i].classList.remove("focused");
    }
  }
}

const toDoForm = document.querySelector('.to-do-form');
const toDoTaskList = document.querySelector('.to-do-task-list');

toDoForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const toDoTime = toDoForm.querySelector('input[name="to-do-time"]').value;
  const toDoDate = toDoForm.querySelector('input[name="to-do-date"]').value;
  const toDoTask = toDoForm.querySelector('input[name="to-do-task"]').value;

  if (!toDoTime || !toDoDate || !toDoTask) return;

  const toDoTaskItem = document.createElement('li');
  toDoTaskItem.classList.add('to-do-task-item');
  toDoTaskItem.innerHTML = `
    <span class="to-do-task-time">${toDoTime}</span>
    <span class="to-do-task-date">${toDoDate}</span>
    <span class="to-do-task-description">${toDoTask}</span>
    <button class="to-do-task-delete-button">X</button>
  `;
  toDoTaskItem.style.setProperty('--hue', Math.floor(Math.random() * 360));
  
  toDoTaskList.appendChild(toDoTaskItem);

  toDoTaskItem.querySelector('.to-do-task-delete-button').addEventListener('click', () => {
    toDoTaskItem.remove();
  });

  toDoForm.reset();
});

function sortTasks() {
  const toDoTaskItems = [...toDoTaskList.querySelectorAll('.to-do-task-item')];

  toDoTaskItems.sort((a, b) => {
    const aTime = a.querySelector('.to-do-task-time').innerText;
    const bTime = b.querySelector('.to-do-task-time').innerText;
    const aDate = a.querySelector('.to-do-task-date').innerText;
    const bDate = b.querySelector('.to-do-task-date').innerText;

    if (aDate === bDate) {
      return aTime > bTime ? 1 : -1;
    }
    return aDate > bDate ? 1 : -1;
  });

  toDoTaskItems.forEach((task) => {
    toDoTaskList.appendChild(task);
  });
}