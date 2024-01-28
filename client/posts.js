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
                <button onclick="deletePost(${post.id})">Löschen</button>`;
            postsContainer.appendChild(postElement);
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
