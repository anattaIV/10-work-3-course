console.log("Script loaded successfully!");
const posts = [
    { id: 1, title: "Hello world", content: "Первый пост" },
    { id: 2, title: "TypeScript DOM", content: "Работа с элементами" },
    { id: 3, title: "Debounce пример", content: "Поиск с задержкой" }
];
const input = document.querySelector("#search");
const button = document.querySelector("#submitBtn");
const list = document.querySelector("#results");
// ДОБАВИЛ: проверка элементов в консоли
console.log("Input:", input);
console.log("Button:", button);
console.log("List:", list);
let timer;
// Функция для отображения всех постов на странице
function displayAllPosts() {
    const allPostsContainer = document.querySelector("#allPosts");
    console.log("All posts container:", allPostsContainer); // ДОБАВИЛ: отладка
    if (!allPostsContainer)
        return;
    allPostsContainer.innerHTML = "";
    posts.forEach(post => {
        const li = document.createElement("li");
        li.innerHTML = `<strong>${post.title}</strong>: ${post.content}`;
        allPostsContainer.appendChild(li);
    });
    console.log("Displayed", posts.length, "posts"); // ДОБАВИЛ: отладка
}
// ИСПРАВИЛ: заменил InputEvent на Event
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
    console.log("Button clicked!"); // ДОБАВИЛ: отладка
    const form = document.querySelector("#searchForm");
    if (!form) {
        console.log("Form not found!"); // ДОБАВИЛ: отладка
        return;
    }
    const formData = new FormData(form);
    const title = (_a = formData.get("title")) === null || _a === void 0 ? void 0 : _a.trim();
    console.log("Title:", title); // ДОБАВИЛ: отладка
    if (!title || title.length <= 3) {
        alert("Введите минимум 4 символа");
        return;
    }
    simulateFetch({ id: Date.now(), title, content: "Новый пост" })
        .then(res => {
        posts.push(res); // добавление нового поста в массив posts
        form.reset(); // очистка формы после успешного добавления
        displayAllPosts(); // обновление списка всех постов
        alert("Пост успешно добавлен");
    })
        .catch(err => {
        if (err instanceof Error)
            alert(err.message);
    });
});
function doSearch(query) {
    console.log("Searching for:", query); // ДОБАВИЛ: отладка
    if (!list)
        return;
    list.innerHTML = "";
    const filtered = posts.filter(p => p.title.toLowerCase().includes(query.toLowerCase()));
    console.log("Found", filtered.length, "posts"); // ДОБАВИЛ: отладка
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
                reject(new Error("Ошибка. У поста нет заголовка."));
        }, 500);
    });
}
// Запуск отображения постов при полной загрузке DOM
document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM loaded, displaying posts..."); // ДОБАВИЛ: отладка
    displayAllPosts();
});
// ДОБАВИЛ: Вызов displayAllPosts на случай если DOM уже загружен
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', displayAllPosts);
}
else {
    displayAllPosts();
}
