async function loadPosts() {
    try {
        const response = await fetch('/api/posts');
        if (!response.ok) {
            throw new Error('Fehler beim Laden der Posts');
        }
        const posts = await response.json();
        console.log("Geladene Posts:", posts);

        const postsContainer = document.querySelector('.posts');
        postsContainer.innerHTML = '';

        posts.forEach(post => {
            const postElement = document.createElement('div');
            postElement.className = 'post';
            postElement.innerHTML = `
                <p>${post.content}</p>
                <small>Erstellt von Benutzer ${post.username}</small>
                <button onclick="editPost(${post.id})">Bearbeiten</button>
                <button onclick="deletePost(${post.id})">Löschen</button>
                <div id="comments-container-${post.id}" class="comments-container"></div>`;
            postsContainer.appendChild(postElement);
            loadComments(post.id);
        });
    } catch (error) {
        console.error('Fehler:', error);
    }
}

document.addEventListener("DOMContentLoaded", loadPosts);

document.addEventListener("DOMContentLoaded", function () {
    loadPosts();

    const submitPostButton = document.getElementById("submitPost");
    submitPostButton.addEventListener("click", async function () {
        const newPostContent = document.getElementById("newPostContent").value;
        const userId = 1;

        if (!newPostContent) {
            alert('Bitte geben Sie einen Inhalt für den Post ein.');
            return;
        }

        try {
            const response = await fetch('/api/posts/post', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId, content: newPostContent }),
            });

            if (response.ok) {
                alert('Beitrag erfolgreich erstellt.');
                document.getElementById("newPostContent").value = '';
                loadPosts();
            } else {
                const errorData = await response.json();
                alert('Fehler beim Erstellen des Beitrags: ' + errorData.message);
            }
        } catch (error) {
            console.error('Fehler:', error);
            alert('Fehler beim Senden der Anfrage.');
        }
    });
});

async function editPost(postId) {
    const newContent = prompt('Geben Sie den neuen Inhalt für den Post ein:');
    if (newContent) {
        try {
            const response = await fetch(`/api/posts/post/${postId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ content: newContent }),
            });

            if (response.ok) {
                alert('Beitrag erfolgreich aktualisiert.');
                loadPosts();
            } else {
                alert('Fehler beim Aktualisieren des Beitrags.');
            }
        } catch (error) {
            console.error('Fehler:', error);
            alert('Fehler beim Senden der Anfrage.');
        }
    }
}

async function deletePost(postId) {
    try {
        const response = await fetch(`/api/posts/post/${postId}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            alert('Beitrag erfolgreich gelöscht.');
            loadPosts();
        } else {
            alert('Fehler beim Löschen des Beitrags.');
        }
    } catch (error) {
        console.error('Fehler:', error);
        alert('Fehler beim Senden der Anfrage.');
    }
}

async function loadComments(postId) {
    try {
        console.log(`Loading comments for postId: ${postId}`);
        const response = await fetch(`/api/comments/${postId}`);
        if (!response.ok) {
            throw new Error('Fehler beim Laden der Kommentare');
        }
        const comments = await response.json();
        console.log(`Comments for postId ${postId}:`, comments);

        const commentsContainer = document.getElementById(`comments-container-${postId}`);
        commentsContainer.innerHTML = '';

        comments.forEach(comment => {
            const commentElement = document.createElement('div');
            commentElement.className = 'comment';
            commentElement.innerHTML = `
                <p>${comment.content}</p>
                <small>Kommentiert von Benutzer ${comment.userId}</small>`;
            commentsContainer.appendChild(commentElement);
        });
    } catch (error) {
        console.error(`Fehler beim Laden der Kommentare für postId ${postId}:`, error);
    }
}

async function addComment(postId) {
    const content = document.getElementById(`new-comment-${postId}`).value;
    const userId = 1;

    if (!content) {
        alert('Bitte geben Sie einen Kommentar ein.');
        return;
    }

    try {
        const response = await fetch('/api/comment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId, tweetId: postId, content }),
        });

        if (response.ok) {
            alert('Kommentar erfolgreich erstellt.');
            loadComments(postId);
        } else {
            alert('Fehler beim Erstellen des Kommentars.');
        }
    } catch (error) {
        console.error('Fehler:', error);
    }
}

async function editComment(commentId) {
    const commentContent = document.getElementById(`comment-content-${commentId}`);
    const newContent = prompt('Geben Sie den neuen Inhalt für den Kommentar ein:', commentContent.textContent);

    if (newContent !== null) {
        try {
            const response = await fetch(`/api/comment/${commentId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ content: newContent }),
            });

            if (response.ok) {
                alert('Kommentar erfolgreich aktualisiert.');
                commentContent.textContent = newContent;
            } else {
                alert('Fehler beim Aktualisieren des Kommentars.');
            }
        } catch (error) {
            console.error('Fehler:', error);
            alert('Fehler beim Senden der Anfrage.');
        }
    }
}

