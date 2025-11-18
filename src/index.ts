interface Post {
  id: number;
  title: string;
  content: string;
}

const posts: Post[] = [
  { id: 1, title: "Hello world", content: "Первый пост" },
  { id: 2, title: "TypeScript DOM", content: "Работа с элементами" },
  { id: 3, title: "Debounce пример", content: "Поиск с задержкой" }
];

const input = document.querySelector<HTMLInputElement>("#search");
const button = document.querySelector<HTMLButtonElement>("#submitBtn");
const list = document.querySelector<HTMLUListElement>("#results");

let timer: number | undefined;

// ИСПРАВИЛ: заменил InputEvent на Event для совместимости
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
      // ДОБАВИЛ: добавляем пост в массив и показываем все посты
      posts.push(res);
      displayAllPosts();
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

// ДОБАВИЛ: функция для отображения всех постов
function displayAllPosts() {
  const allPostsContainer = document.querySelector<HTMLUListElement>("#allPosts");
  if (!allPostsContainer) return;
  
  allPostsContainer.innerHTML = "";
  posts.forEach(post => {
    const li = document.createElement("li");
    li.innerHTML = `<strong>${post.title}</strong>: ${post.content}`;
    allPostsContainer.appendChild(li);
  });
}

// ДОБАВИЛ: показываем посты при загрузке страницы
document.addEventListener('DOMContentLoaded', displayAllPosts);