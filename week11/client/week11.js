import { makeRequest } from "./authHelpers.js";
import Auth from "./auth.js";

const auth = new Auth();
const submitBtn = document.getElementById("submitBtn");
const postsEl = document.getElementById("posts");
const titleEl = document.getElementById("title");
const contentEl = document.getElementById("content");
const postSubmitBtn = document.getElementById("postSubmitBtn");
submitBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  auth.login(renderAllPosts);
});
postSubmitBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  const result = await createPost();
  if (result) {
    const li = document.createElement("li");
    li.innerHTML = `<li id="${result.id}">
          <h4>${result.title}</h4>
          <p>${result.content}</p>
        </li>`;
    postsEl.appendChild(li);
  }
});

// Fetches all posts
async function renderAllPosts() {
  try {
    const posts = await makeRequest("posts", "GET", null, auth.token);

    if (posts) {
      postsEl.innerHTML = "";
      posts.forEach(({ title, content, createdAt, id }) => {
        const li = document.createElement("li");
        li.innerHTML = `<li id="${id}">
          <h4>${title}</h4>
          <p>${content}</p>
        </li>`;
        postsEl.appendChild(li);
      });
    }
  } catch (error) {
    console.log(error);
  }
}

// Function to create post
async function createPost() {
  try {
    const title = titleEl.value;
    const content = contentEl.value;
    const createdAt = Date.now();
    const id = Math.floor(Math.random() * 100);
    const userId = auth.user.id;
    const postData = {
      title,
      content,
      createdAt,
      id,
      userId,
    };

    if (!title || !content) {
      throw new Error("No title or content provided");
    }
    const response = await makeRequest("posts", "POST", postData, auth.token);
    auth.errors.hideError();
    return response;
  } catch (error) {
    console.log(error);
    auth.errors.displayError(error);
  }
}
