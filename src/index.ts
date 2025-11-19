interface Post {
  id: number;
  title: string;
  content: string;
}

const posts: Post[] = [
  { id: 1, title: "Test1", content: "Lorem" },
  { id: 2, title: "Test2", content: "ipum" },
  { id: 3, title: "Testt", content: "Lorem" },
  { id: 4, title: "Tect", content: "ispum" },
  { id: 5, title: "other", content: "Lorem" }
];

const input = document.querySelector<HTMLInputElement>("#search");
const button = document.querySelector<HTMLButtonElement>("#submitBtn");
const list = document.querySelector<HTMLUListElement>("#results");

let timer: number | undefined;

input?.addEventListener("input", (event: Event) => {
  clearTimeout(timer);
  timer = window.setTimeout(() => {
    const target = event.target as HTMLInputElement;
    doSearch(target.value);
  }, 300);
});

button?.addEventListener("click", (event: MouseEvent) => {
  event.preventDefault();
  const form = document.querySelector<HTMLFormElement>("#searchForm");
  if (!form) return;

  const data = new FormData(form);
  const title = (data.get("title") as string)?.trim();

  if (!title || title.length <= 3) {
    alert("Введите минимум 4 символа");
    return;
  }

  simulateFetch({ id: Date.now(), title, content: "Новый пост" })
    .then(res => {
      posts.push(res);//Пушу в массив posts res(пост который добавляет пользователь)
      displayAllPosts();//Функция, которая выводит все посты(в будущем)
      alert("Пост успешно добавлен");
    })
    .catch(err => {
      if (err instanceof Error) alert(err.message);
    });
});

function doSearch(query: string) {
  if (!list) return;
  list.innerHTML = "";

  const filtered = posts.filter(p =>
    p.title.toLowerCase().includes(query.toLowerCase())
  );

  filtered.forEach(p => {
    const li = document.createElement("li");
    li.innerText = `${p.id}. ${p.title}`;
    list.appendChild(li);
  });
}

function simulateFetch(post: Post): Promise<Post> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (post.title) resolve(post);
      else reject(new Error("Ошибка. У поста нет заголовка.")); // ИСПРАВИЛ: опечатку
    }, 500);
  });
}

// ДОБАВИЛ: функция 
function displayAllPosts() {
  const allPostsContainer = document.querySelector<HTMLUListElement>("#allPosts");//Находит список
  if (!allPostsContainer) return;//Если allPostsContainer - возврат
  
  allPostsContainer.innerHTML = ""; //Очищает список, убирает старые элементы
  posts.forEach(post => { //Перебор массива
    const li = document.createElement("li"); //Создаю li
    li.innerHTML = `<strong>${post.title}</strong>: ${post.content}`;//текст поста в элемент
    allPostsContainer.appendChild(li);//Добавление в ul, вывод на страницу
  });
}

// ДОБАВИЛ: показываем посты при загрузке страницы
displayAllPosts();