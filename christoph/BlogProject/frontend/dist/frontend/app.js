var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a, _b;
let postContainer = document.getElementById("postContainer");
let postsHeader = document.getElementById("postsHeader");
let commentContainer = document.getElementById("commentContainer");
let addPostButton = document.getElementById("addPostButton");
let shownPost = document.getElementById("shownPost");
let postTitle = document.getElementById("newPostTitle");
let commentBody = document.getElementById("newCommentBody");
let addCommentButton = document.getElementById("addCommentButton");
let shownPostID = 0;
postContainer.style.display = "none";
(_a = document.getElementById("postGetButton")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
    fetchPosts();
});
(_b = document.getElementById("newPostTitle")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", () => {
    fetchPosts();
});
addPostButton === null || addPostButton === void 0 ? void 0 : addPostButton.addEventListener("click", () => {
    postPost();
});
addCommentButton === null || addCommentButton === void 0 ? void 0 : addCommentButton.addEventListener("click", () => {
    postComment();
});
function postPost() {
    return __awaiter(this, void 0, void 0, function* () {
        let post = { title: postTitle.value };
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
        });
    });
}
function postComment() {
    return __awaiter(this, void 0, void 0, function* () {
        let comment = { postID: shownPostID, body: commentBody.value };
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
        });
    });
}
function fetchPosts() {
    let url = new URL("http://localhost:8080/posts");
    // liste clearen
    postContainer.innerHTML = "";
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
        // abbruch wenn keine Daten anzuzeigen sind
        if (data.length == 0) {
            alert("Keine Posts gefunden!");
            return;
        }
        // elemente anzeigen wenn Daten übertragen wurden
        postContainer.style.display = "flex";
        postContainer.style.flexDirection = "column";
        postContainer.style.width = "200px";
        postsHeader.style.display = "flex";
        data.map((postElement) => {
            let postButton = postContainer.appendChild(document.createElement("button"));
            postButton.style.backgroundColor = "#fff";
            postButton.style.textAlign = "left";
            postButton.style.border = "1px solid";
            postButton.setAttribute("id", postElement.id.toString());
            postButton.innerHTML = `id: ${postElement.id} | ${postElement.title}`;
            postButton.addEventListener("click", () => { setShownPost(postElement.id, postElement.title), fetchCommentsOfPost(shownPostID); });
        });
    })
        .catch((error) => {
        console.log(error);
    });
}
function setShownPost(id, title) {
    shownPost.innerHTML = `<h2>Post no ${id}: ${title}</h2>`;
    shownPost.setAttribute("postID", id.toString());
    shownPost.style.marginTop = "50px";
    shownPost.style.backgroundColor = "aliceblue";
    shownPostID = id;
}
function fetchCommentsOfPost(postID) {
    let url = new URL(`http://localhost:8081/comments/${postID}`);
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
        // abbruch wenn keine Daten anzuzeigen sind
        if (data.length == 0) {
            return;
        }
        // elemente anzeigen wenn Daten übertragen wurden
        commentContainer.innerHTML = "";
        commentContainer.style.display = "flex";
        commentContainer.style.flexDirection = "column";
        commentContainer.style.width = "200px";
        commentContainer.style.backgroundColor = "azure";
        data.map((commentElement) => {
            let commentButton = commentContainer.appendChild(document.createElement("button"));
            commentButton.style.backgroundColor = "#fff";
            commentButton.style.textAlign = "left";
            commentButton.style.border = "1px solid";
            commentButton.setAttribute("id", commentElement.id.toString());
            commentButton.innerHTML = `id: ${commentElement.id} | ${commentElement.body}`;
        });
    })
        .catch((error) => {
        console.log(error);
    });
}
export {};
