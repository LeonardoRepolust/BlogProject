import Post from "../interfaces/Post"
import Comment from "../interfaces/Comment"

let postContainer: HTMLElement | null = document.getElementById("postContainer");
let postsHeader: HTMLElement | null = document.getElementById("postsHeader");
let commentContainer: HTMLElement | null = document.getElementById("commentContainer");
let addPostButton: HTMLElement | null = document.getElementById("addPostButton");
let shownPost: HTMLElement | null = document.getElementById("shownPost");
let postTitle = document.getElementById("newPostTitle") as HTMLInputElement;
let commentBody = document.getElementById("newCommentBody") as HTMLInputElement;
let addCommentButton: HTMLElement | null = document.getElementById("addCommentButton");

let shownPostID: Number = 0;

postContainer!.style.display = "none";

document.getElementById("postGetButton")?.addEventListener("click", () => {
  fetchPosts();
});

document.getElementById("newPostTitle")?.addEventListener("click", () => {
  fetchPosts();
});

addPostButton?.addEventListener("click", () => {
  postPost();
});

addCommentButton?.addEventListener("click", () => {
  postComment();
});

async function postPost() {

  let post: Post = { title: postTitle.value };

  fetch("http://localhost:8080/posts/", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Headers': '*'
    },
    body: JSON.stringify(post)
  })
    .then(() => fetchPosts())
    .catch((error) => {
      console.log(error);
    })
}

async function postComment() {

  let comment: Comment = { postID: shownPostID, body: commentBody.value };

  fetch("http://localhost:8081/comments/", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Headers': '*'
    },
    body: JSON.stringify(comment)
  })
    .then(() => fetchCommentsOfPost(shownPostID))
    .catch((error) => {
      console.log(error);
    })
}

function fetchPosts() {
  let url = new URL("http://localhost:8080/posts");

  // liste clearen
  postContainer!.innerHTML = "";

  fetch(url)
    .then((response) => response.json())
    .then((data: Post[]) => {
      // abbruch wenn keine Daten anzuzeigen sind
      if (data.length == 0) {
        alert("Keine Posts gefunden!");
        return;
      }
      // elemente anzeigen wenn Daten übertragen wurden
      postContainer!.style.display = "flex";
      postContainer!.style.flexDirection = "column";
      postContainer!.style.width = "200px";
      postsHeader!.style.display = "flex";

      data.map((postElement: Post) => {
        let postButton: HTMLButtonElement = postContainer!.appendChild(
          document.createElement("button")
        );
        postButton.style.backgroundColor = "#fff";
        postButton.style.textAlign = "left";
        postButton.style.border = "1px solid";
        postButton.setAttribute("id", postElement.id!.toString());
        postButton.innerHTML = `id: ${postElement.id} | ${postElement.title}`;
        postButton.addEventListener(
          "click",
          () => { setShownPost(postElement.id!, postElement.title!), fetchCommentsOfPost(shownPostID) })
      });
    })
    .catch((error) => {
      console.log(error);
    });
}

function setShownPost(id: Number, title: String) {

  shownPost!.innerHTML = `<h2>Post no ${id}: ${title}</h2>`;
  shownPost!.setAttribute("postID", id.toString());
  shownPost!.style.marginTop = "50px";
  shownPost!.style.backgroundColor = "aliceblue";

  shownPostID = id;
}

function fetchCommentsOfPost(postID: Number) {
  let url = new URL(`http://localhost:8081/comments/${postID}`);

  fetch(url)
    .then((response) => response.json())
    .then((data: Comment[]) => {
      // abbruch wenn keine Daten anzuzeigen sind
      if (data.length == 0) {
        return;
      }
      // elemente anzeigen wenn Daten übertragen wurden
      commentContainer!.innerHTML = "";
      commentContainer!.style.display = "flex";
      commentContainer!.style.flexDirection = "column";
      commentContainer!.style.width = "200px";
      commentContainer!.style.backgroundColor = "azure"

      data.map((commentElement: Comment) => {
        let commentButton = commentContainer!.appendChild(
          document.createElement("button")
        );
        commentButton.style.backgroundColor = "#fff";
        commentButton.style.textAlign = "left";
        commentButton.style.border = "1px solid";
        commentButton.setAttribute("id", commentElement.id!.toString());
        commentButton.innerHTML = `id: ${commentElement.id} | ${commentElement.body}`;
      });
    })
    .catch((error) => {
      console.log(error);
    });
}
