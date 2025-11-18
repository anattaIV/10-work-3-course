//Посты
const posts = [
    { id: 1, title: "Hello world", content: "Первый пост" }, //"База данных" постов
    { id: 2, title: "TypeScript DOM", content: "Работа с элементами" },
    { id: 3, title: "Debounce пример", content: "Поиск с задержкой" }
];
//СВязываемся с HTML
const input = document.querySelector("#search"); //Поиск в HTML по ID. Типизация заключается в том что мы указываем <HTMLInputElement>. Каждый интерактивный элемент нужно указывать по разному
const button = document.querySelector("#submitBtn"); //Чтобы работало корректно, то после этой типизации нужно проверить наличие элемента, т.к TS не связан с HTML(что и делается в след функции благодаря ?)
const list = document.querySelector("#results");
//Переменная снизу нужна для механизма debounce(пока пользователь вводит текст эта функция задерживает выполнение)
let timer; //Переменная,которая хранит в себе текущее значение таймера. number - текущее число таймера, undefined - когда таймер еще не создан или очищен. Нужен для debounce-поиска(происходит поиск через 300мс после последнего ввода, для того, чтобы не вызывать поиск на каждый символ.).
//Функция реализующая debounce поиск. Пользователь печатает, функция контролирует задержку и вызывает doSearch
input === null || input === void 0 ? void 0 : input.addEventListener("input", (event) => {
    clearTimeout(timer); //Очистка таймера(чтобы поиск выполнялся после паузы).
    timer = window.setTimeout(() => {
        const target = event.target; //Код который сработает после паузы. Здесь происходит сам поиск. event.target - элемент в котором произошло событие наше поле ввода. as нужен чтобы TS понял, что а, target — именно input, значит у него точно есть .value
        doSearch(target.value); //Передаем значение из input в функцию. Запускает поиск.
    }, 300);
});
//Добавление нового поста и проверка на корректность данных
button === null || button === void 0 ? void 0 : button.addEventListener("click", (event) => {
    var _a;
    event.preventDefault(); //Отмена дефолтного действия. В данном случае при нажатии на кнопку страница обновилась бы и вся инфомрмация из полей исчезла бы. При помощи этого свойства страница не обновляется и JS спокойно обрабатывает информацию.
    const form = document.querySelector("#searchForm"); //Поиск формы в HTML
    if (!form)
        return; //Проверка, что такая форма есть. !form без формы - код не продолжается
    const data = new FormData(form); //Создается объект, содержащий данные всех полей из формы
    const title = (_a = data.get("title")) === null || _a === void 0 ? void 0 : _a.trim(); //Получаем поле со значением title. as string - приводим к строке чтобы избежать ошибок(говорим, что точно знаем, что это строка). trim() - убираем пробелы в начале и конце, ?. - пробелы убираются если поле не пустое. Если пустое то действие не выполняется.
    if (!title || title.length <= 3) { //!title  - если строка "", null, undef или длинна строки меньше или равно 3 символам, то...
        alert("Введите минимум 4 символа"); //...то выводится уведомление 
        return;
    }
    simulateFetch({ id: Date.now(), title, content: "Новый пост" }) //Создается объект. id: Date.now() - уникальный объект по времени, title - который ввел пользователь, content: "Новый пост" - фиксированная строка у всех постов.
        .then(res => {
        alert("Пост успешно добавлен"); // уведомление
    })
        .catch(err => {
        if (err instanceof Error)
            alert(err.message); //Проверяем, что пришла настоящая ошибка и выводим уведомление
    });
});
//Главная функция для очистки поля поиска и отображение результата
function doSearch(query) {
    if (!list)
        return; // list - элемент из DOM. Если его нет, то код выполняет нет смысла
    list.innerHTML = ""; //Очистка прошлых результатов. Удаляем все li из прошлых списков. Если это не сделать, то результаты будут накладываться друг на друга
    const filtered = posts.filter(p => //filter - создает новый массив с очищенными данными. 
     p.title.toLowerCase().includes(query.toLowerCase()) //includes проверяет наличие строки в строке(т.е приводит title и query(запрос) в нижний регистр, и проверяет, есть ли в title частичка запроса(как при ctrl+f))
    ); // в итоге filtered — это массив только тех постов, которые подходят под поисковый запрос.
    filtered.forEach(p => {
        const li = document.createElement("li"); //Создаем li элемент
        li.innerText = `${p.id}. ${p.title}`; //Заполняем содержимое li(id и title)
        list.appendChild(li); //Добавляем li в ul(т.е выводим на экран)
    });
}
//Имитирует работу сервера и показывает асинхронность добавление поста
function simulateFetch(post) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (post.title)
                resolve(post); //Если у поста есть title, то вызывает resolve(успешное завершение)
            else
                reject(new Error("Ошибка при добавлении поста")); //Если заголовок пустой, то вызываем ошибку.
        }, 500);
    });
}
export {};
//# sourceMappingURL=indexx.js.map