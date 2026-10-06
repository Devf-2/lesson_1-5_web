const STORAGE_KEY = "drip-lesson-1-5-application"

// Основные элементы уже найдены: практика посвящена пути данных, а не верстке.
const form = document.querySelector(".application-form")
const result = document.querySelector("#result")
const clearButton = document.querySelector("#clear-draft")
const localStorageStatus = document.querySelector("#local-storage-status")
const sessionStorageStatus = document.querySelector("#session-storage-status")

const nameInput = document.querySelector("#participant-name")
const emailInput = document.querySelector("#participant-email")
const topicSelect = document.querySelector("#workshop-topic")

// БЛОК 5.1
// Получите строку из localStorage. Если она существует, вызовите JSON.parse,
// верните три значения в поля и обновите result и localStorageStatus.
localStorage.getItem(STORAGE_KEY)
if (localStorage.getItem(STORAGE_KEY)) {
  const application = JSON.parse(localStorage.getItem(STORAGE_KEY))
  nameInput.value = application.name
  emailInput.value = application.email
  result.textContent = `Черновик восстановлен`
  localStorageStatus .textContent = `Найден сохраненный черновик`
}

// БЛОКИ 1–4
// 1.2: замените событие click на submit.
form.addEventListener("submit", (event) => {
  // 1.3: первой строкой остановите стандартное действие формы.

  console.log("1.2. Получено событие", event.type)

  // 1.3: затем покажите временное сообщение в result.

  event.preventDefault()

  // 3.1: создайте FormData текущей формы.
  const formData = new FormData(form)


  // 3.2: получите name, email и topic через метод get.
  const name = formData.get("name")
  const email = formData.get("email")
  const topic = formData.get("topic")
  console.log("3.2:", name, email, topic)
  // 3.3: проверьте значения в Console и покажите подтверждение в result.
  result.textContent = `${name}, заявка на тему «${topic}» принята. Подтверждение: ${email}`

  // 4.1: объедините три значения в объект application.
  const application = {
  name,
  email,
  topic,
  }
  console.log("4.1:", application)
  // 4.2: превратите application в строку applicationJson.
  const applicationJson = JSON.stringify(application)
  console.log("4.2:", applicationJson)

  // 4.3: сохраните строку в localStorage и обновите localStorageStatus.
  localStorage.setItem(STORAGE_KEY, applicationJson)
  localStorageStatus.textContent = "Черновик сохранен"

  // 5.3: сохраните ту же строку в sessionStorage и обновите sessionStorageStatus.
  sessionStorage.setItem(STORAGE_KEY, applicationJson)
  sessionStorageStatus.textContent = "Копия существует до закрытия вкладки"
})


// БЛОК 5.2
clearButton.addEventListener("click", () => {
  // Удалите обе записи, сбросьте форму и обновите три сообщения на странице.
  localStorage.removeItem(STORAGE_KEY)
  form.reset()
  result.textContent = "Черновик удален"
  localStorageStatus.textContent = "Локального черновика нет"
})
