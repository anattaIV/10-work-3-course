interface Post {//
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

input?.addEventListener("input", (event: InputEvent) => {
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
      alert("Пост успешно добавлен: " + res.title);
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
      else reject(new Error("Ошибка при добавлении поста"));
    }, 500);
  });
}
