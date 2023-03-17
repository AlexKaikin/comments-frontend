const commentsForm = document.querySelector(".comments__form");

commentsForm.addEventListener("submit", (e) => {
  e.preventDefault();
  createComment()
});

function createComment() {
  const nameValue = document.querySelector(".form__name");
  const commentValue = document.querySelector(".form__text");
  const dateDay = document.querySelector(".form__day");
  const dateMonth = document.querySelector(".form__month");
  const dateYear = document.querySelector(".form__year");

  let valueError = null;

  if (nameValue.value.length < 3) {
    const nameErrorFind = document.querySelector(".name-error");
    if (nameErrorFind) return;

    const nameError = nameValue.closest(".form__field");
    const errorMessage = document.createElement("div");
    errorMessage.classList.add("error", "name-error");
    errorMessage.innerText = "Имя должно быть более 3 букв";
    nameError.after(errorMessage);
    valueError = true;
  }

  if (commentValue.value.length < 3) {
    const textErrorFind = document.querySelector(".text-error");
    if (textErrorFind) return;

    const commentError = commentValue.closest(".form__field");
    const errorMessage = document.createElement("div");
    errorMessage.classList.add("error", "text-error");
    errorMessage.innerText = "Комментарий должнен быть более 3 букв";
    commentError.after(errorMessage);
    valueError = true;
  }

  if (valueError) return;

  // создание комментария
  const commentsItem = document.querySelector(".comments__items");

  const newComment = document.createElement("div");
  newComment.classList = "comment__item";

  // автор комментария
  const commentName = document.createElement("div");
  commentName.classList.add("comment__name");
  commentName.innerText = nameValue.value;

  // время комментария
  const commentTime = document.createElement("div");
  commentTime.classList = "comment__time";
  commentTime.innerText = getDate({
    year: dateYear.value,
    month: dateMonth.value,
    day: dateDay.value,
  });

  const commentTopBlock = document.createElement("div");
  commentTopBlock.classList = "comment__top";
  commentTopBlock.append(commentName, commentTime)

  // текст комментария
  const commentText = document.createElement("div");
  commentText.classList = "comment__text";
  commentText.innerText = commentValue.value;

  // лайк к комментарию
  const commentLike = document.createElement("button");
  commentLike.classList = "comment__like";
  commentLike.innerHTML = "&#10084;";

  // удалить комментарий
  const commentDelete = document.createElement("button");
  commentDelete.classList = "comment__delete";
  commentDelete.innerHTML = "Удалить";

  const commentBottoBlock = document.createElement("div");
  commentBottoBlock.classList = "comment__bottom";
  commentBottoBlock.append(commentLike, commentDelete)

  newComment.append(commentTopBlock, commentText, commentBottoBlock)

  commentsItem.prepend(newComment)

  nameValue.value = "";
  commentValue.value = "";
  resetDate();

  commentsItem.scrollIntoView({
    block: "start",
    behavior: "smooth",
  });
}

inputName.oninput = function () {
  const nameError = document.querySelector(".name-error");
  nameError && nameError.remove();
};

textareaText.oninput = function () {
  const textError = document.querySelector(".text-error");
  textError && textError.remove();
};

// лайк и удаление комментария
const commentsItems = document.querySelector(".comments__items");

commentsItems.addEventListener("click", (e) => {
  if (e.target.className === "comment__delete") {
    e.target.closest(".comment__item").remove();
  }

  if (
    e.target.className === "comment__like" ||
    e.target.className === "comment__like active"
  ) {
    e.target.classList.toggle("active");
  }
});

// создание даты для комментария
function getDate(dateObj) {
  const monthWord = [
    "января",
    "февраля",
    "марта",
    "апреля",
    "мая",
    "июня",
    "июля",
    "августа",
    "сентября",
    "октября",
    "ноября",
    "декабря",
  ];

  const nowDate = new Date();

  const date = {
    year: dateObj.year == "null" ? nowDate.getFullYear() : +dateObj.year,
    month: dateObj.month == "null" ? nowDate.getMonth() : +dateObj.month,
    day: dateObj.day == "null" ? nowDate.getDate() : +dateObj.day,
  };

  const formDate = new Date(date.year, date.month, date.day);

  const today = new Date(nowDate);
  today.setHours(0, 0, 0, 0);

  const yesterday = new Date(nowDate);
  yesterday.setDate(yesterday.getDate() - 1);
  yesterday.setHours(0, 0, 0, 0);

  let day;

  if (yesterday.getTime() == formDate.getTime()) {
    day = `вчера`;
  } else if (today.getTime() == formDate.getTime()) {
    day = `сегодня`;
  } else {
    day = `${formDate.getDate()} ${
      monthWord[formDate.getMonth()]
    } ${formDate.getFullYear()}`;
  }

  return `${day}, ${nowDate.getHours()}:${
    nowDate.getMinutes() < 10
      ? "0" + nowDate.getMinutes()
      : nowDate.getMinutes()
  }`;
}

// создание календаря
const calendar = document.querySelector(".form__field.date");

Date.prototype.daysInMonth = function () {
  return 33 - new Date(this.getFullYear(), this.getMonth(), 33).getDate();
};

// select дней
const selectDay = document.createElement("select");
selectDay.classList.add("form__day");
const dateDay = new Date();

let countDay = dateDay.daysInMonth();

for (let i = 1; i < countDay + 1; i++) {
  const selectDayOption = document.createElement("option");
  selectDayOption.value = i;
  selectDayOption.innerText = i;
  if (dateDay.getDate() == i) selectDayOption.selected = true;
  selectDay.append(selectDayOption);
}
calendar.append(selectDay);

// select месяцев
const selectMonth = document.createElement("select");
const monthWord = [
  "января",
  "февраля",
  "марта",
  "апреля",
  "мая",
  "июня",
  "июля",
  "августа",
  "сентября",
  "октября",
  "ноября",
  "декабря",
];

selectMonth.classList.add("form__month");
const dateMonth = new Date().getMonth();

for (let i = 0; i < 12; i++) {
  const selectMonthOption = document.createElement("option");
  selectMonthOption.value = i;
  selectMonthOption.innerText = monthWord[i];
  if (dateMonth == i) selectMonthOption.selected = true;
  selectMonth.append(selectMonthOption);
}
calendar.append(selectMonth);

selectMonth.addEventListener("change", changeDate);

// select годов
const selectYear = document.createElement("select");
selectYear.classList.add("form__year");
const dateYear = new Date().getFullYear();

for (let i = -2; i < 3; i++) {
  const selectYearOption = document.createElement("option");
  selectYearOption.value = dateYear + i;
  selectYearOption.innerText = dateYear + i;
  if (dateYear == dateYear + i) selectYearOption.selected = true;
  selectYear.append(selectYearOption);
}
calendar.append(selectYear);
selectYear.addEventListener("change", changeDate);

// изменение даты
function changeDate() {
  const selectDay = document.querySelector(".form__day");

  const dayActive = document.querySelector(".form__day").value;

  const dateMonth = document.querySelector(".form__month");
  const dateYear = document.querySelector(".form__year");

  const date = new Date(dateYear.value, dateMonth.value, 1);
  selectDay.innerHTML = "";

  let countDay = date.daysInMonth();
  
  for (let i = 1; i < countDay + 1; i++) {
    const selectDayOption = document.createElement("option");
    selectDayOption.value = i;
    selectDayOption.innerText = i;
    
    if (i == dayActive) selectDayOption.selected = true;
    selectDay.append(selectDayOption);
  }
}

// сброс даты
function resetDate() {
  const date = new Date();

  const selectDay = document.querySelector(".form__day");
  selectDay.innerHTML = "";

  let countDay = date.daysInMonth();

  for (let i = 1; i < countDay + 1; i++) {
    const selectDayOption = document.createElement("option");
    selectDayOption.value = i;
    selectDayOption.innerText = i;
    if (dateDay.getDate() == i) selectDayOption.selected = true;
    selectDay.append(selectDayOption);
  }

  const dateMonth = document.querySelector(".form__month");
  const monthArr = dateMonth.querySelectorAll("option");
  for (month of monthArr) {
    if (month.value == date.getMonth()) month.selected = true;
  }

  const dateYear = document.querySelector(".form__year");
  const yearArr = dateYear.querySelectorAll("option");
  for (year of yearArr) {
    if (year.value == date.getFullYear()) year.selected = true;
  }
}
