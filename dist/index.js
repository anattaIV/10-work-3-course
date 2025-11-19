const posts = [
    { id: 1, title: "Test1", content: "Lorem" },
    { id: 2, title: "Test2", content: "ipum" },
    { id: 3, title: "Testt", content: "Lorem" },
    { id: 4, title: "Tect", content: "ispum" },
    { id: 5, title: "other", content: "Lorem" }
];
const input = document.querySelector("#search");
const button = document.querySelector("#submitBtn");
const list = document.querySelector("#results");
let timer;
input === null || input === void 0 ? void 0 : input.addEventListener("input", (event) => {
    clearTimeout(timer);
    timer = window.setTimeout(() => {
        const target = event.target;
        doSearch(target.value);
    }, 300);
});
button === null || button === void 0 ? void 0 : button.addEventListener("click", (event) => {
    var _a;
    event.preventDefault();
    const form = document.querySelector("#searchForm");
    if (!form)
        return;
    const data = new FormData(form);
    const title = (_a = data.get("title")) === null || _a === void 0 ? void 0 : _a.trim();
    if (!title || title.length <= 3) {
        alert("Введите минимум 4 символа");
        return;
    }
    simulateFetch({ id: Date.now(), title, content: "Новый пост" })
        .then(res => {
        posts.push(res); //Пушу в массив posts res(пост который добавляет пользователь)
        displayAllPosts(); //Функция, которая выводит все посты(в будущем)
        alert("Пост успешно добавлен");
    })
        .catch(err => {
        if (err instanceof Error)
            alert(err.message);
    });
});
function doSearch(query) {
    if (!list)
        return;
    list.innerHTML = "";
    const filtered = posts.filter(p => p.title.toLowerCase().includes(query.toLowerCase()));
    filtered.forEach(p => {
        const li = document.createElement("li");
        li.innerText = `${p.id}. ${p.title}`;
        list.appendChild(li);
    });
}
function simulateFetch(post) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (post.title)
                resolve(post);
            else
                reject(new Error("Ошибка. У поста нет заголовка.")); // ИСПРАВИЛ: опечатку
        }, 500);
    });
}
// ДОБАВИЛ: функция 
function displayAllPosts() {
    const allPostsContainer = document.querySelector("#allPosts"); //Находит список
    if (!allPostsContainer)
        return; //Если allPostsContainer - возврат
    allPostsContainer.innerHTML = ""; //Очищает список, убирает старые элементы
    posts.forEach(post => {
        const li = document.createElement("li"); //Создаю li
        li.innerHTML = `<strong>${post.title}</strong>: ${post.content}`; //текст поста в элемент
        allPostsContainer.appendChild(li); //Добавление в ul, вывод на страницу
    });
}
// ДОБАВИЛ: показываем посты при загрузке страницы
displayAllPosts();
